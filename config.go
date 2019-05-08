package main

import (
	"encoding/json"
	"io/ioutil"
	"os"

	"github.com/mdlayher/wireguardctrl/wgtypes"
	log "github.com/sirupsen/logrus"
)

type ServerConfig struct {
	configPath string `json:"-"`
	PrivateKey string
	PublicKey  string
	Users      map[string]*UserConfig
}

type UserConfig struct {
	Name    string
	Devices map[string]*DeviceConfig
}

type DeviceConfig struct {
	Name       string
	PrivateKey string
	PublicKey  string
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
			Devices: make(map[string]*DeviceConfig),
		}
		cfg.Users[user] = c
	}
	return c
}

func NewDeviceConfig() *DeviceConfig {
	key, err := wgtypes.GeneratePrivateKey()
	if err != nil {
		log.Fatal(err)
	}

	cfg := DeviceConfig{
		Name:       "Unnamed Device",
		PrivateKey: key.String(),
		PublicKey:  key.PublicKey().String(),
	}

	return &cfg
}
