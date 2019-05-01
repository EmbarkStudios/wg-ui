package main

import (
	"encoding/json"
	"io/ioutil"
	"os"
	"path"

	"github.com/mdlayher/wireguardctrl/wgtypes"
	log "github.com/sirupsen/logrus"
	"gopkg.in/alecthomas/kingpin.v2"
)

var (
	dataDir = kingpin.Flag("data-dir", "Directory used for storage").Default("/var/lib/wireguard-ui").String()
)

type ServerConfig struct {
	PrivateKey string
	PublicKey  string
}

type UserConfig struct {
	Name    string
	Devices []DeviceConfig
}

type DeviceConfig struct {
	PublicKey string
}

type Storage struct {
	serverConfigPath string
}

func NewStorage() *Storage {
	err := os.MkdirAll(*dataDir, 0700)
	if err != nil {
		log.WithError(err).Fatalf("Error initializing data directory: %s", *dataDir)
	}

	s := Storage{
		serverConfigPath: path.Join(*dataDir, "config.json"),
	}
	log.Debug("Storage initialized: ", *dataDir)
	return &s
}

func NewServerConfig() *ServerConfig {
	key, err := wgtypes.GeneratePrivateKey()
	if err != nil {
		log.Fatal(err)
	}

	cfg := ServerConfig{
		PrivateKey: key.String(),
		PublicKey:  key.PublicKey().String(),
	}

	return &cfg
}

func (cfg *ServerConfig) WriteServerConfig(path string) error {
	data, err := json.MarshalIndent(cfg, "", " ")
	if err != nil {
		return err
	}
	return ioutil.WriteFile(path, data, 0600)
}

func (s *Storage) GetServerConfig() *ServerConfig {
	config := NewServerConfig()

	f, err := os.Open(s.serverConfigPath)
	if err == nil {
		if err = json.NewDecoder(f).Decode(config); err != nil {
			log.Fatal(err)
		}
		log.Debug("Read server config from file: ", s.serverConfigPath)
	} else if os.IsNotExist(err) {
		log.Debug("No config found. Creating new: ", s.serverConfigPath)
		err = config.WriteServerConfig(s.serverConfigPath)
	}

	if err != nil {
		log.Fatal(err)
	}

	log.Debug("Configuration loaded with public key: ", config.PublicKey)
	return config
}
