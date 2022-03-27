package main

import (
	"strings"

	log "github.com/sirupsen/logrus"
	"golang.org/x/crypto/bcrypt"
	"gopkg.in/alecthomas/kingpin.v2"
)

var (
	logLevel = kingpin.Flag("log-level", "The level of logging").Default("info").Enum("debug", "info", "warn", "error", "panic", "fatal")
)

func main() {
	kingpin.HelpFlag.Short('h')
	kingpin.CommandLine.DefaultEnvars()
	kingpin.Command("server", "Start server.").Default()
	passwdCmd := kingpin.Command("passwd", "Generate password hash.")
	passwdCmdPassword := passwdCmd.Arg("password", "The password to hash").Required().String()
	cmd := kingpin.Parse()

	switch strings.ToLower(*logLevel) {
	case "debug":
		log.SetLevel(log.DebugLevel)
	case "warn":
		log.SetLevel(log.WarnLevel)
	case "error":
		log.SetLevel(log.ErrorLevel)
	case "panic":
		log.SetLevel(log.PanicLevel)
	default:
		log.SetLevel(log.InfoLevel)
	}

	switch cmd {
	case "passwd":
		bytes, err := bcrypt.GenerateFromPassword([]byte(*passwdCmdPassword), 14)
		if err != nil {
			log.Fatalf("generate password error: %v", err)
		}
		log.Infof("Password Hash: %s", string(bytes))
		return
	case "server":
		log.Info("Starting")
		server := NewServer()
		err := server.Start()
		if err != nil {
			log.Fatal(err)
		}
	default:
		log.Fatal("Unknown command")
	}

}
