package main

import (
	"encoding/json"
	"io/ioutil"
	"net"
	"os"

	log "github.com/sirupsen/logrus"
	"golang.zx2c4.com/wireguard/wgctrl/wgtypes"
)

type ServerConfig struct {
	configPath string `json:"-"`
	PrivateKey string
	PublicKey  string
	Users      map[string]*UserConfig
}

type UserConfig struct {
	Name    string
	Clients map[string]*ClientConfig
}

type ClientConfig struct {
	Name       string
	PrivateKey string
	PublicKey  string
	IP         net.IP
	Notes      string
}

func NewServerConfig(cfgPath string) *ServerConfig {
	key, err := wgtypes.GeneratePrivateKey()
	if err != nil {
		log.Fatal(err)
	}

	cfg := &ServerConfig{
		configPath: cfgPath,
		PrivateKey: key.String(),
		PublicKey:  key.PublicKey().String(),
		Users:      make(map[string]*UserConfig),
	}

	f, err := os.Open(cfgPath)
	if err == nil {
		if err = json.NewDecoder(f).Decode(cfg); err != nil {
			log.Fatal(err)
		}
		log.Debug("Read server config from file: ", cfgPath)
	} else if os.IsNotExist(err) {
		log.Debug("No config found. Creating new: ", cfgPath)
		err = cfg.Write()
	}

	if err != nil {
		log.Fatal(err)
	}

	return cfg
}

func (cfg *ServerConfig) Write() error {
	data, err := json.MarshalIndent(cfg, "", " ")
	if err != nil {
		return err
	}
	return ioutil.WriteFile(cfg.configPath, data, 0600)
}

func (cfg *ServerConfig) GetUserConfig(user string) *UserConfig {
	c, ok := cfg.Users[user]
	if !ok {
		log.WithField("user", user).Info("No such user. Creating one.")
		c = &UserConfig{
			Name:    user,
			Clients: make(map[string]*ClientConfig),
		}
		cfg.Users[user] = c
	}
	return c
}

func NewClientConfig(ip net.IP) *ClientConfig {
	key, err := wgtypes.GeneratePrivateKey()
	if err != nil {
		log.Fatal(err)
	}

	cfg := ClientConfig{
		Name:       "Unnamed Client",
		PrivateKey: key.String(),
		PublicKey:  key.PublicKey().String(),
		IP:         ip,
		Notes:      "",
	}

	return &cfg
}
