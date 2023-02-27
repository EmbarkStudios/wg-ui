package main

import (
	"encoding/json"
	"io/ioutil"
	"net"
	"os"
	"path/filepath"
	"time"

	log "github.com/sirupsen/logrus"
	"golang.zx2c4.com/wireguard/wgctrl/wgtypes"
)

// ServerConfig contains the reference to users, keys and where on disk the config is stored
type ServerConfig struct {
	configPath string
	PrivateKey string
	PublicKey  string
	Users      map[string]*UserConfig
}

// UserConfig represents a user and it's clients
type UserConfig struct {
	Name    string
	Clients map[string]*ClientConfig
}

// ClientConfig represents a single client for a user
type ClientConfig struct {
	Name         string
	PrivateKey   string
	PublicKey    string
	PresharedKey string
	IP           net.IP
	AllowedIPs   []*net.IPNet
	MTU          int
	Notes        string
	Created      string
	Modified     string
}

// NewClient provides fields that should not be saved however is neccesary on creation of a new client
type NewClient struct {
	ClientConfig
	GeneratePSK bool
}

// NewServerConfig creates and returns a reference to a new ServerConfig
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

	f, err := os.Open(filepath.Clean(cfgPath))
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

	configWriteRequired := false

	// Set default MTU if MTU is not set (migration from old config)
	migrationMTU := *wgPeerMtu
	if err := verifyLinkMTU(migrationMTU); err != nil {
		log.WithError(err).Warnf("Invalid peer MTU, migration MTU is set to %d", wgDefaultMtu)
		migrationMTU = wgDefaultMtu
	}

	for _, user := range cfg.Users {
		for _, client := range user.Clients {
			if client.MTU == 0 {
				client.MTU = migrationMTU
				configWriteRequired = true
			}
		}
	}

	if configWriteRequired {
		err = cfg.Write()
		if err != nil {
			log.Fatal(err)
		}
	}

	return cfg
}

// Write writes the ServerConfig to the path specified in the config
func (cfg *ServerConfig) Write() error {
	data, err := json.MarshalIndent(cfg, "", " ")
	if err != nil {
		return err
	}
	return ioutil.WriteFile(cfg.configPath, data, 0600)
}

// GetUserConfig returns a UserConfig for a specific user
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

// NewClientConfig initiates a new client, returning a reference to the new config
func NewClientConfig(Name string, ip net.IP, mtu int, Notes string, generatePSK bool) *ClientConfig {
	key, err := wgtypes.GeneratePrivateKey()
	if err != nil {
		log.Fatal(err)
	}

	psk := ""
	if generatePSK {
		pskey, err := wgtypes.GenerateKey()
		if err != nil {
			log.Fatal(err)
		}
		psk = pskey.String()
	}

	cfg := ClientConfig{
		Name:         Name,
		PrivateKey:   key.String(),
		PublicKey:    key.PublicKey().String(),
		IP:           ip,
		MTU:          mtu,
		PresharedKey: psk,
		Notes:        Notes,
		Created:      time.Now().Format(time.RFC3339),
		Modified:     time.Now().Format(time.RFC3339),
	}

	return &cfg
}
