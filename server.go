package main

import (
	"net/http"
	"os"

	"github.com/mdlayher/wireguardctrl"
	"github.com/mdlayher/wireguardctrl/wgtypes"
	log "github.com/sirupsen/logrus"
	"github.com/vishvananda/netlink"
	"gopkg.in/alecthomas/kingpin.v2"
)

var (
	listenAddr   = kingpin.Flag("listen-address", "Address to listen to").Default(":8080").String()
	wgLinkName   = kingpin.Flag("wg-device-name", "Wireguard network device name").Default("wg0").String()
	wgLinkAddr   = kingpin.Flag("wg-link-addr", "Wireguard interface address").Default("172.72.72.1/32").String()
	wgListenPort = kingpin.Flag("wg-listen-port", "Wireguard UDP port to listen to").Default("51820").Int()
)

type Server struct {
	mux     *http.ServeMux
	storage *Storage
	config  *ServerConfig
}

type WgLink struct {
	attrs *netlink.LinkAttrs
}

func (w *WgLink) Attrs() *netlink.LinkAttrs {
	return w.attrs
}

func (w *WgLink) Type() string {
	return "wireguard"
}

func NewServer() *Server {
	storage := NewStorage()

	server := &Server{
		mux:     http.NewServeMux(),
		storage: storage,
		config:  storage.GetServerConfig(),
	}

	server.mux.HandleFunc("/", server.Hello)

	return server
}

func (s *Server) initInterface() error {
	attrs := netlink.NewLinkAttrs()
	attrs.Name = *wgLinkName

	link := WgLink{
		attrs: &attrs,
	}

	err := netlink.LinkAdd(&link)
	if os.IsExist(err) {
		log.Infof("Wireguard interface %s already exists. Reusing.", *wgLinkName)
	} else if err != nil {
		return err
	}

	addr, _ := netlink.ParseAddr(*wgLinkAddr)
	err = netlink.AddrAdd(&link, addr)
	if os.IsExist(err) {
		log.Infof("Wireguard interface %s already has the requested address: ", *wgLinkAddr)
	} else if err != nil {
		return err
	}

	wg, err := wireguardctrl.New()
	if err != nil {
		return err
	}

	key, err := wgtypes.ParseKey(s.config.PrivateKey)
	if err != nil {
		return err
	}

	cfg := wgtypes.Config{
		PrivateKey: &key,
		ListenPort: wgListenPort,
	}
	wg.ConfigureDevice(*wgLinkName, cfg)

	return nil
}

func (s *Server) Start() error {
	err := s.initInterface()
	if err != nil {
		return err
	}

	log.WithField("listenAddr", *listenAddr).Info("Starting server")
	return http.ListenAndServe(*listenAddr, s.mux)
}

func (s *Server) Hello(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hello World"))
}
