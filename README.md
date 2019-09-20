# Wireguard UI

[![Build Status](https://badge.buildkite.com/1e96905f9ee8e199808cd7faaf5a8600b2c1820fb30ae7903a.svg)](https://buildkite.com/embark-studios/wireguard-ui)
[![Embark](https://img.shields.io/badge/embark-open%20source-blueviolet.svg)](https://github.com/EmbarkStudios)
[![Contributor Covenant](https://img.shields.io/badge/contributor%20covenant-v1.4%20adopted-ff69b4.svg)](CODE_OF_CONDUCT.md)

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

## Contributing

We welcome community contributions to this project.

Please read our [Contributor Guide](CONTRIBUTING.md) for more information on how to get started.

## License
Licensed under either of

* Apache License, Version 2.0, ([LICENSE-APACHE](LICENSE-APACHE) or http://www.apache.org/licenses/LICENSE-2.0)
* MIT license ([LICENSE-MIT](LICENSE-MIT) or http://opensource.org/licenses/MIT)

at your option.

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FEmbarkStudios%2Fwireguard-ui.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FEmbarkStudios%2Fwireguard-ui?ref=badge_large)
