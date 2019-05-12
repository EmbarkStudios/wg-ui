package main

import (
	"context"
	"encoding/json"
	"net"
	"net/http"
	"os"
	"path"
	"strconv"
	"strings"
	"sync"

	"github.com/dgrijalva/jwt-go"
	"github.com/google/nftables"
	"github.com/google/nftables/expr"
	"github.com/julienschmidt/httprouter"
	"github.com/mdlayher/wireguardctrl"
	"github.com/mdlayher/wireguardctrl/wgtypes"
	log "github.com/sirupsen/logrus"
	"github.com/vishvananda/netlink"
	"github.com/vishvananda/netns"
	"gopkg.in/alecthomas/kingpin.v2"
)

var (
	dataDir = kingpin.Flag("data-dir", "Directory used for storage").Default("/var/lib/wireguard-ui").String()

	listenAddr    = kingpin.Flag("listen-address", "Address to listen to").Default(":8080").String()
	natLink       = kingpin.Flag("nat-device", "Network interface to masquerade").Default("wlp2s0").String()
	clientIPRange = kingpin.Flag("client-ip-range", "Client IP CIDR").Default("172.72.72.1/24").String()

	wgLinkName   = kingpin.Flag("wg-device-name", "Wireguard network device name").Default("wg0").String()
	wgListenPort = kingpin.Flag("wg-listen-port", "Wireguard UDP port to listen to").Default("51820").Int()
	wgEndpoint   = kingpin.Flag("wg-endpoint", "Wireguard endpoint address").Default("127.0.0.1").String()
)

type Server struct {
	serverConfigPath string
	mutex            sync.RWMutex
	Config           *ServerConfig
	ipAddr           net.IP
	clientIPRange    *net.IPNet
}

type WgLink struct {
	attrs *netlink.LinkAttrs
}

type jwtClaims struct {
}

func (w *WgLink) Attrs() *netlink.LinkAttrs {
	return w.attrs
}

func (w *WgLink) Type() string {
	return "wireguard"
}

func ifname(n string) []byte {
	b := make([]byte, 16)
	copy(b, []byte(n+"\x00"))
	return b
}

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

	s := Server{
		serverConfigPath: cfgPath,
		Config:           config,
		ipAddr:           ipAddr,
		clientIPRange:    ipNet,
	}

	log.Debug("Server initialized: ", *dataDir)
	return &s
}

func (s *Server) initInterface() error {
	attrs := netlink.NewLinkAttrs()
	attrs.Name = *wgLinkName

	link := WgLink{
		attrs: &attrs,
	}

	log.Debug("Adding wireguard device: ", *wgLinkName)
	err := netlink.LinkAdd(&link)
	if os.IsExist(err) {
		log.Infof("Wireguard interface %s already exists. Reusing.", *wgLinkName)
	} else if err != nil {
		return err
	}

	log.Debug("Adding ip address to wireguard device: ", s.clientIPRange)
	addr, _ := netlink.ParseAddr(*clientIPRange)
	err = netlink.AddrAdd(&link, addr)
	if os.IsExist(err) {
		log.Infof("Wireguard interface %s already has the requested address: ", s.clientIPRange)
	} else if err != nil {
		return err
	}

	log.Debug("Adding NAT / IP masquerading using nftables")

	ns, err := netns.Get()
	if err != nil {
		return err
	}

	conn := nftables.Conn{NetNS: int(ns)}

	log.Debug("Flushing nftable rulesets")
	// conn.FlushRuleset()

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

	return conn.Flush()
}

func (s *Server) allocateIP() net.IP {
	allocated := make(map[string]bool)
	allocated[s.ipAddr.String()] = true
	for _, cfg := range s.Config.Users {
		for _, dev := range cfg.Devices {
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

		if allocated[ip.String()] == false {
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

	err = s.configureWireguard()
	if err != nil {
		log.Fatal(err)
	}
}

func (s *Server) configureWireguard() error {
	log.Debugf("Reconfiguring wireguard interface %s", *wgLinkName)
	wg, err := wireguardctrl.New()
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
		for id, dev := range cfg.Devices {
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

			log.WithFields(log.Fields{"user": user, "device": id, "key": dev.PublicKey, "allowedIPs": peer.AllowedIPs}).Debug("Adding wireguard peer")

			peers = append(peers, peer)
		}
	}

	cfg := wgtypes.Config{
		PrivateKey:   &key,
		ListenPort:   wgListenPort,
		ReplacePeers: true,
		Peers:        peers,
	}
	wg.ConfigureDevice(*wgLinkName, cfg)

	return nil
}

func (s *Server) Start() error {
	err := s.initInterface()
	if err != nil {
		return err
	}

	err = s.configureWireguard()
	if err != nil {
		return err
	}

	router := httprouter.New()
	router.GET("/", s.Index)
	router.GET("/api/v1/users/:user/devices/:device", s.withAuth(s.GetDevice))
	router.DELETE("/api/v1/users/:user/devices/:device", s.withAuth(s.DeleteDevice))
	router.GET("/api/v1/users/:user/devices", s.withAuth(s.GetDevices))
	router.POST("/api/v1/users/:user/devices", s.withAuth(s.CreateDevice))

	log.WithField("listenAddr", *listenAddr).Info("Starting server")
	return http.ListenAndServe(*listenAddr, router)
}

func userFromJwtToken(r *http.Request) string {
	authHeader := r.Header.Get("authorization")
	if authHeader == "" {
		log.Debug("No Authorization header")
		return ""
	}

	if !strings.HasPrefix(authHeader, "Bearer ") {
		log.Debug("Incorrect Authorization header: ", authHeader)
		return ""
	}

	claims := jwt.MapClaims{}
	token, err := jwt.ParseWithClaims(authHeader[7:], &claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(""), nil
	})

	if token == nil {
		log.Debug("Error parsing JWT token: ", err)
		return ""
	}

	user, ok := claims["email"]
	if ok {
		return user.(string)
	}

	user, ok = claims["sub"]
	if ok {
		return user.(string)
	}

	return ""
}

func (s *Server) withAuth(handler httprouter.Handle) httprouter.Handle {
	return func(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
		log.Debug("Auth required")

		user := userFromJwtToken(r)
		if user == "" {
			user = "anonymous"
			log.Info("Unauthenticated user: ", user)
		}

		if user != ps.ByName("user") {
			log.WithField("user", user).WithField("path", r.URL.Path).Warn("Unauthorized access")
			w.WriteHeader(http.StatusUnauthorized)
			return
		}

		ctx := context.WithValue(r.Context(), "user", user)
		handler(w, r.WithContext(ctx), ps)
	}
}

func (s *Server) Index(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	log.Debug("Index")
	w.Write([]byte("Hello World"))
}

func (s *Server) GetDevices(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	user := r.Context().Value("user")
	log.Debug(user)
	err := json.NewEncoder(w).Encode(s.Config)
	if err != nil {
		log.Error(err)
		w.WriteHeader(http.StatusInternalServerError)
	}
}

func (s *Server) GetDevice(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	user := r.Context().Value("user").(string)
	usercfg := s.Config.Users[user]
	if usercfg == nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	device := ps.ByName("device")
	deviceCfg := usercfg.Devices[device]
	if deviceCfg == nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	err := json.NewEncoder(w).Encode(deviceCfg)
	if err != nil {
		log.Error(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
}

func (s *Server) DeleteDevice(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	user := r.Context().Value("user").(string)
	usercfg := s.Config.Users[user]
	if usercfg == nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	device := ps.ByName("device")
	if usercfg.Devices[device] == nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	delete(usercfg.Devices, device)
	s.reconfigure()

	log.WithField("user", user).Debug("Deleted device: ", device)

	w.WriteHeader(http.StatusOK)
}

func (s *Server) CreateDevice(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	s.mutex.Lock()
	defer s.mutex.Unlock()

	user := r.Context().Value("user").(string)
	log.WithField("user", user).Debug("CreateDevice")

	c := s.Config.GetUserConfig(user)
	log.Debugf("user config: %#v", c)

	i := 0
	for k := range c.Devices {
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
	device := NewDeviceConfig(ip)
	c.Devices[strconv.Itoa(i)] = device

	s.reconfigure()

	err := json.NewEncoder(w).Encode(device)
	if err != nil {
		log.Error(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
}
