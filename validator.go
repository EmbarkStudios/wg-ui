package main

import (
	"errors"
	"github.com/auth0-community/go-auth0"
	"gopkg.in/square/go-jose.v2"
	"gopkg.in/square/go-jose.v2/jwt"
	"net/http"
	"time"
)

const (
	googleIAPIssuer      = "https://accounts.google.com"
	googleJWKUrl         = "https://www.gstatic.com/iap/verify/public_key-jwk"
	googleIAPTokenHeader = "x-goog-iap-jwt-assertion"
)

type Claims struct {
	Subject  string `json:"sub,omitempty"`
	Expiry   int64  `json:"exp,omitempty"`
	Issuer   string `json:"iss,omitempty"`
	IssuedAt int64  `json:"iat,omitempty"`
}

func NewValidator(audience string) *auth0.JWTValidator {
	customHeaderExtractor := auth0.RequestTokenExtractorFunc(func(r *http.Request) (*jwt.JSONWebToken, error) {
		header := r.Header.Get(googleIAPTokenHeader)
		if header == "" {
			return nil, auth0.ErrTokenNotFound
		}

		return jwt.ParseSigned(header)
	})

	client := auth0.NewJWKClient(auth0.JWKClientOptions{URI: googleJWKUrl}, customHeaderExtractor)
	configuration := auth0.NewConfiguration(client, []string{audience}, googleJWKUrl, jose.RS256)
	validator := auth0.NewValidator(configuration, customHeaderExtractor)

	return validator
}

func (c *Claims) Validate() error {
	currentTime := time.Now().Unix()

	if c.Issuer != googleIAPIssuer {
		return errors.New("invalid jwt issuer")
	}

	if currentTime > c.Expiry {
		return errors.New("invalid expiry time")
	}

	if currentTime < c.IssuedAt {
		return errors.New("invalid issued at")
	}

	return nil
}
