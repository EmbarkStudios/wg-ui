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
	googleIAPIssuer = "https://cloud.google.com/iap"
	googleJWKUrl    = "https://www.gstatic.com/iap/verify/public_key-jwk"
	/* #nosec */
	googleIAPTokenHeader = "x-goog-iap-jwt-assertion"
)

// Claims represents the JWT claims
type Claims struct {
	Subject      string `json:"sub,omitempty"`
	Expiry       int64  `json:"exp,omitempty"`
	Issuer       string `json:"iss,omitempty"`
	HostedDomain string `json:"hd,omitempty"`
	IssuedAt     int64  `json:"iat,omitempty"`
}

// NewValidator returns an instance of the JWTValidator that is used to validate the JWT
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

// Validate validates the JWT claims according to https://cloud.google.com/iap/docs/signed-headers-howto#iap_validate_jwt-java
func (c *Claims) Validate(hostedDomain string) error {
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

	if hostedDomain != c.HostedDomain {
		return errors.New("invalid hosted domain")
	}

	return nil
}
