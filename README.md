# Wireguard UI

[![Build Status](https://badge.buildkite.com/1e96905f9ee8e199808cd7faaf5a8600b2c1820fb30ae7903a.svg)](https://buildkite.com/embark-studios/wireguard-ui)

A basic web UI for managing Wireguard clients.

## Features

 * Self-serve
 * Supports JWT tokens for authenticated use
 * Expiration


## Developing

### Start frontend server
```
npm install --prefix=ui
npm run --prefix=ui dev
```

### Use frontend server when running the server

```
go get -u github.com/go-bindata/go-bindata/...
go get github.com/elazarl/go-bindata-assetfs/...
go-bindata-assetfs -prefix ui/public ui/public
go build .
sudo ./wireguard-ui --log-level=debug --dev-ui-server http://localhost:5000
```

