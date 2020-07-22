package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
	"path"
	"regexp"
	"strconv"
	"strings"
	"sync"
	"time"

	assetfs "github.com/elazarl/go-bindata-assetfs"
	"github.com/google/nftables"
	"github.com/google/nftables/expr"
	"github.com/julienschmidt/httprouter"
	log "github.com/sirupsen/logrus"
	"github.com/skip2/go-qrcode"
	"github.com/vishvananda/netlink"
	"github.com/vishvananda/netns"
	"golang.zx2c4.com/wireguard/wgctrl"
	"golang.zx2c4.com/wireguard/wgctrl/wgtypes"
	"gopkg.in/alecthomas/kingpin.v2"
)

var (
	dataDir = kingpin.Flag("data-dir", "Directory used for storage").Default("/var/lib/wireguard-ui").String()

	listenAddr            = kingpin.Flag("listen-address", "Address to listen to").Default(":8080").String()
	natEnabled            = kingpin.Flag("nat", "Whether NAT is enabled or not").Default("true").Bool()
	natLink               = kingpin.Flag("nat-device", "Network interface to masquerade").Default("wlp2s0").String()
	clientIPRange         = kingpin.Flag("client-ip-range", "Client IP CIDR").Default("172.31.255.0/24").String()
	authUserHeader        = kingpin.Flag("auth-user-header", "Header containing username").Default("X-Forwarded-User").String()
	maxNumberClientConfig = kingpin.Flag("max-number-client-config", "Max number of configs an client can use. 0 is unlimited").Default("0").Int()

	wgLinkName   = kingpin.Flag("wg-device-name", "WireGuard network device name").Default("wg0").String()
	wgListenPort = kingpin.Flag("wg-listen-port", "WireGuard UDP port to listen to").Default("51820").Int()
	wgEndpoint   = kingpin.Flag("wg-endpoint", "WireGuard endpoint address").Default("127.0.0.1:51820").String()
	wgAllowedIPs = kingpin.Flag("wg-allowed-ips", "WireGuard client allowed ips").Default("0.0.0.0/0").Strings()
	wgDNS        = kingpin.Flag("wg-dns", "WireGuard client DNS server (optional)").Default("").String()
	wgKeepAlive  = kingpin.Flag("wg-keepalive", "WireGuard Keepalive for peers, defined in seconds (optional)").Default("").String()

	devUIServer = kingpin.Flag("dev-ui-server", "Developer mode: If specified, proxy all static assets to this endpoint").String()

	filenameRe = regexp.MustCompile("[^a-zA-Z0-9]+")
)

type contextKey string

const key = contextKey("user")

// Server is the running server
type Server struct {
	serverConfigPath string
	mutex            sync.RWMutex
	Config           *ServerConfig
	ipAddr           net.IP
	clientIPRange    *net.IPNet
	assets           http.Handler
}

type wgLink struct {
	attrs *netlink.LinkAttrs
}

func (w *wgLink) Attrs() *netlink.LinkAttrs {
	return w.attrs
}

func (w *wgLink) Type() string {
	return "wireguard"
}

func ifname(n string) []byte {
	b := make([]byte, 16)
	copy(b, []byte(n+"\x00"))
	return b
}

// NewServer returns an instance of Server which contains both the webserver and the reference to Wireguard
func NewServer() *Server {
	ipAddr, ipNet, err := net.ParseCIDR(*clientIPRange)
	if err != nil {
		log.Fatal(err)
	}
	log.Debugf("ipAddr: %s  ipNet: %s", ipAddr, ipNet)

	err = os.MkdirAll(*dataDir, 0700)
	if err != nil {
		log.WithError(err).Fatalf("Error initializing data directory: %s", *dataDir)
	}

	cfgPath := path.Join(*dataDir, "config.json")
	config := NewServerConfig(cfgPath)

	log.Debug("Configuration loaded with public key: ", config.PublicKey)
	assets := http.FileServer(&assetfs.AssetFS{Asset: Asset, AssetDir: AssetDir, AssetInfo: AssetInfo, Prefix: ""})

	s := Server{
		serverConfigPath: cfgPath,
		Config:           config,
		ipAddr:           ipAddr,
		clientIPRange:    ipNet,
		assets:           assets,
	}

	log.Debug("Server initialized: ", *dataDir)
	return &s
}

func (s *Server) enableIPForward() error {
	p := "/proc/sys/net/ipv4/ip_forward"

	content, err := ioutil.ReadFile(p)
	if err != nil {
		return err
	}

	if string(content) == "0\n" {
		log.Info("Enabling sys.net.ipv4.ip_forward")
		return ioutil.WriteFile(p, []byte("1"), 0600)
	}

	return nil
}

func (s *Server) initInterface() error {
	attrs := netlink.NewLinkAttrs()
	attrs.Name = *wgLinkName

	link := wgLink{
		attrs: &attrs,
	}

	log.Debug("Adding wireguard device: ", *wgLinkName)
	err := netlink.LinkAdd(&link)
	if os.IsExist(err) {
		log.Infof("WireGuard interface %s already exists. Reusing.", *wgLinkName)
	} else if err != nil {
		return err
	}

	log.Debug("Adding ip address to wireguard device: ", s.clientIPRange)
	addr, _ := netlink.ParseAddr(*clientIPRange)
	err = netlink.AddrAdd(&link, addr)
	if os.IsExist(err) {
		log.Infof("WireGuard interface %s already has the requested address: ", s.clientIPRange)
	} else if err != nil {
		return err
	}

	log.Debug("Bringing up wireguard device: ", *wgLinkName)
	err = netlink.LinkSetUp(&link)
	if err != nil {
		log.Error("Error bringing up device: ", *wgLinkName)
		return err
	}

	if *natEnabled {
		log.Debug("Adding NAT / IP masquerading using nftables")
		ns, err := netns.Get()
		if err != nil {
			return err
		}

		conn := nftables.Conn{NetNS: int(ns)}

		log.Debug("Flushing nftable rulesets")
		conn.FlushRuleset()

		log.Debug("Setting up nftable rules for ip masquerading")

		nat := conn.AddTable(&nftables.Table{
			Family: nftables.TableFamilyIPv4,
			Name:   "nat",
		})

		conn.AddChain(&nftables.Chain{
			Name:     "prerouting",
			Table:    nat,
			Type:     nftables.ChainTypeNAT,
			Hooknum:  nftables.ChainHookPrerouting,
			Priority: nftables.ChainPriorityFilter,
		})

		post := conn.AddChain(&nftables.Chain{
			Name:     "postrouting",
			Table:    nat,
			Type:     nftables.ChainTypeNAT,
			Hooknum:  nftables.ChainHookPostrouting,
			Priority: nftables.ChainPriorityNATSource,
		})

		conn.AddRule(&nftables.Rule{
			Table: nat,
			Chain: post,
			Exprs: []expr.Any{
				&expr.Meta{Key: expr.MetaKeyOIFNAME, Register: 1},
				&expr.Cmp{
					Op:       expr.CmpOpEq,
					Register: 1,
					Data:     ifname(*natLink),
				},
				&expr.Masq{},
			},
		})

		if err := conn.Flush(); err != nil {
			return err
		}
	}

	return nil
}

func (s *Server) allocateIP() net.IP {
	allocated := make(map[string]bool)
	allocated[s.ipAddr.String()] = true
	for _, cfg := range s.Config.Users {
		for _, dev := range cfg.Clients {
			allocated[dev.IP.String()] = true
		}
	}

	for ip := s.ipAddr.Mask(s.clientIPRange.Mask); s.clientIPRange.Contains(ip); {
		for i := len(ip) - 1; i >= 0; i-- {
			ip[i]++
			if ip[i] > 0 {
				break
			}
		}

		if !allocated[ip.String()] {
			log.Debug("Allocated IP: ", ip)
			return ip
		}
	}

	log.Fatal("Unable to allocate IP. Address range exhausted")
	return nil
}

func (s *Server) reconfigure() {
	log.Debug("Reconfiguring")

	err := s.Config.Write()
	if err != nil {
		log.Fatal(err)
	}

	err = s.configureWireGuard()
	if err != nil {
		log.Fatal(err)
	}
}

func (s *Server) configureWireGuard() error {
	log.Debugf("Reconfiguring wireguard interface %s", *wgLinkName)
	wg, err := wgctrl.New()
	if err != nil {
		return err
	}

	log.Debug("Adding wireguard private key")
	key, err := wgtypes.ParseKey(s.Config.PrivateKey)
	if err != nil {
		return err
	}

	peers := make([]wgtypes.PeerConfig, 0)
	for user, cfg := range s.Config.Users {
		for id, dev := range cfg.Clients {
			pubKey, err := wgtypes.ParseKey(dev.PublicKey)
			if err != nil {
				return err
			}

			allowedIPs := make([]net.IPNet, 1)
			allowedIPs[0] = *netlink.NewIPNet(dev.IP)
			peer := wgtypes.PeerConfig{
				PublicKey:         pubKey,
				ReplaceAllowedIPs: true,
				AllowedIPs:        allowedIPs,
			}

			log.WithFields(log.Fields{"user": user, "client": id, "key": dev.PublicKey, "allowedIPs": peer.AllowedIPs}).Debug("Adding wireguard peer")

			peers = append(peers, peer)
		}
	}

	cfg := wgtypes.Config{
		PrivateKey:   &key,
		ListenPort:   wgListenPort,
		ReplacePeers: true,
		Peers:        peers,
	}
	err = wg.ConfigureDevice(*wgLinkName, cfg)
	if err != nil {
		return err
	}

	return nil
}

// Start configures wiregard and initiates the interfaces as well as starts the webserver to accept clients
func (s *Server) Start() error {
	err := s.enableIPForward()
	if err != nil {
		return err
	}

	err = s.initInterface()
	if err != nil {
		return err
	}

	err = s.configureWireGuard()
	if err != nil {
		return err
	}

	router := httprouter.New()
	router.GET("/api/v1/whoami", s.WhoAmI)
	router.GET("/api/v1/users/:user/clients/:client", s.withAuth(s.GetClient))
	router.PUT("/api/v1/users/:user/clients/:client", s.withAuth(s.EditClient))
	router.DELETE("/api/v1/users/:user/clients/:client", s.withAuth(s.DeleteClient))
	router.GET("/api/v1/users/:user/clients", s.withAuth(s.GetClients))
	router.POST("/api/v1/users/:user/clients", s.withAuth(s.CreateClient))

	if *devUIServer != "" {
		log.Debug("Serving static assets proxying from development server: ", *devUIServer)
		devProxy := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			url, _ := url.Parse(*devUIServer)
			if strings.HasPrefix(r.URL.Path, "/client/") || r.URL.Path == "/about" {
				r.URL.Path = "/"
			}
			proxy := httputil.NewSingleHostReverseProxy(url)
			r.URL.Host = url.Host
			r.URL.Scheme = url.Scheme
			r.Header.Set("X-Forwarded-Host", r.Header.Get("Host"))
			r.Host = url.Host
			proxy.ServeHTTP(w, r)
		})
		router.NotFound = devProxy
	} else {
		log.Debug("Serving static assets embedded in binary")
		router.GET("/about", s.Index)
		router.GET("/client/:client", s.Index)
		router.NotFound = s.assets
	}

	log.WithField("listenAddr", *listenAddr).Info("Starting server")

	return http.ListenAndServe(*listenAddr, s.userFromHeader(router))
}

func (s *Server) userFromHeader(handler http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		user := r.Header.Get(*authUserHeader)
		if user == "" {
			log.Debug("Unauthenticated request")
			user = "anonymous"
		}

		if *authUserHeader == "X-Goog-Authenticated-User-Email" {
			user = strings.TrimPrefix(user, "accounts.google.com:")
		}

		cookie := http.Cookie{
			Name:  "wguser",
			Value: user,
			Path:  "/",
		}
		http.SetCookie(w, &cookie)

		ctx := context.WithValue(r.Context(), key, user)
		handler.ServeHTTP(w, r.WithContext(ctx))
	})
}

func (s *Server) withAuth(handler httprouter.Handle) httprouter.Handle {
	return func(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
		log.Debug("Auth required")

		user := r.Context().Value(key)
		if user == nil {
			log.Error("Error getting username from request context")
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		if user != ps.ByName("user") {
			log.WithField("user", user).WithField("path", r.URL.Path).Warn("Unauthorized access")
			w.WriteHeader(http.StatusUnauthorized)
			return
		}

		handler(w, r, ps)
	}
}

// WhoAmI returns the identity of the current user
func (s *Server) WhoAmI(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	user := r.Context().Value(key).(string)
	log.Debug(user)
	err := json.NewEncoder(w).Encode(struct{ User string }{user})
	if err != nil {
		log.Error(err)
		w.WriteHeader(http.StatusInternalServerError)
	}
}

// GetClients returns a list of all clients for the current user
func (s *Server) GetClients(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	user := r.Context().Value(key).(string)
	log.Debug(user)
	clients := map[string]*ClientConfig{}
	userConfig := s.Config.Users[user]
	if userConfig != nil {
		clients = userConfig.Clients
	}

	err := json.NewEncoder(w).Encode(clients)
	if err != nil {
		log.Error(err)
		w.WriteHeader(http.StatusInternalServerError)
	}
}

// Index returns the single-page app
func (s *Server) Index(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	log.Debug("Serving single-page app from URL: ", r.URL)
	r.URL.Path = "/"
	s.assets.ServeHTTP(w, r)
}

// GetClient returns a specific client for the current user
func (s *Server) GetClient(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	user := r.Context().Value(key).(string)
	usercfg := s.Config.Users[user]
	if usercfg == nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	client := usercfg.Clients[ps.ByName("client")]
	if client == nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	allowedIPs := strings.Join(*wgAllowedIPs, ",")

	dns := ""
	if *wgDNS != "" {
		dns = fmt.Sprint("DNS = ", *wgDNS)
	}

	keepAlive := ""
	if *wgKeepAlive != "" {
		keepAlive = fmt.Sprint("PersistentKeepalive = ", *wgKeepAlive)
	}

	configData := fmt.Sprintf(`[Interface]
Address = %s
PrivateKey = %s
%s

[Peer]
PublicKey = %s
AllowedIPs = %s
Endpoint = %s
%s
`, client.IP.String(), client.PrivateKey, dns, s.Config.PublicKey, allowedIPs, *wgEndpoint, keepAlive)

	format := r.URL.Query().Get("format")

	if format == "qrcode" {
		png, err := qrcode.Encode(configData, qrcode.Medium, 220)
		if err != nil {
			log.Error(err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "image/png")
		w.WriteHeader(http.StatusOK)
		_, err = w.Write(png)
		if err != nil {
			log.Error(err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		return
	}

	if format == "config" {
		filename := fmt.Sprintf("%s.conf", filenameRe.ReplaceAllString(client.Name, "_"))
		w.Header().Set("Content-Disposition", fmt.Sprintf("attachment; filename=\"%s\"", filename))
		w.Header().Set("Content-Type", "application/config")
		w.WriteHeader(http.StatusOK)
		_, err := fmt.Fprint(w, configData)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
		}
		return
	}

	err := json.NewEncoder(w).Encode(client)
	if err != nil {
		log.Error(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
}

// EditClient edits the specific client passed by the current user
func (s *Server) EditClient(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	user := r.Context().Value(key).(string)
	usercfg := s.Config.Users[user]
	if usercfg == nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	client := usercfg.Clients[ps.ByName("client")]
	if client == nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	cfg := ClientConfig{}

	if err := json.NewDecoder(r.Body).Decode(&cfg); err != nil {
		log.Warn("Error parsing request: ", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	log.Debugf("EditClient: %#v", cfg)

	if cfg.Name != "" {
		client.Name = cfg.Name
	}

	if cfg.Notes != "" {
		client.Notes = cfg.Notes
	}

	client.Modified = time.Now().Format(time.RFC3339)

	s.reconfigure()

	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(client); err != nil {
		log.Error(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
}

// DeleteClient deletes the specified client for the current user
func (s *Server) DeleteClient(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	user := r.Context().Value(key).(string)
	usercfg := s.Config.Users[user]
	if usercfg == nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	client := ps.ByName("client")
	if usercfg.Clients[client] == nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	delete(usercfg.Clients, client)
	s.reconfigure()

	log.WithField("user", user).Debug("Deleted client: ", client)

	w.WriteHeader(http.StatusOK)
}

// CreateClient creates a new client for the current user
func (s *Server) CreateClient(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	s.mutex.Lock()
	defer s.mutex.Unlock()

	user := r.Context().Value(key).(string)
	log.WithField("user", user).Debug("CreateClient")

	c := s.Config.GetUserConfig(user)
	log.Debugf("user config: %#v", c)

	if *maxNumberClientConfig > 0 {
		if len(c.Clients) >= *maxNumberClientConfig {
			log.Error(fmt.Errorf("user %q have too many configs", c.Name))

			e := struct {
				Error string
			}{
				Error: "Max number of configs: " + strconv.Itoa(*maxNumberClientConfig),
			}

			w.WriteHeader(http.StatusBadRequest)
			err := json.NewEncoder(w).Encode(e)
			if err != nil {
				log.Error(err)
				w.WriteHeader(http.StatusInternalServerError)
				return
			}
			return
		}
	}

	decoder := json.NewDecoder(r.Body)
	client := &ClientConfig{}
	err := decoder.Decode(&client)
	if err != nil {
		log.Warn("Error parsing request: ", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	if client.Name == "" {
		log.Debugf("No clientName:using default: \"Unnamed Client\"")
		client.Name = "Unnamed Client"
	}

	i := 0
	for k := range c.Clients {
		n, err := strconv.Atoi(k)
		if err != nil {
			log.Error(err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		if n > i {
			i = n
		}
	}
	i = i + 1

	ip := s.allocateIP()
	client = NewClientConfig(ip, client.Name, client.Notes)
	c.Clients[strconv.Itoa(i)] = client

	s.reconfigure()

	err = json.NewEncoder(w).Encode(client)
	if err != nil {
		log.Error(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
}
