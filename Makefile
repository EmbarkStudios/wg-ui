# Parameters
GOCMD=go
GOBUILD=$(GOCMD) build
GOCLEAN=$(GOCMD) clean
GOGET=$(GOCMD) get
BINARY_NAME=wireguard-ui

.PHONY: build container ui assets

all: build

clean:
	$(GOCLEAN)
	rm -rf bin
	rm -rf ui/node_modules ui/dist

ui:
	cd ui && npm install && npm run build

assets:
	$(GOGET) github.com/go-bindata/go-bindata/...
	$(GOGET) github.com/elazarl/go-bindata-assetfs/...
	go-bindata-assetfs -prefix ui/dist ui/dist

build: ui assets
	CGO_ENABLED=0 $(GOBUILD) -o bin/$(BINARY_NAME) -v

build-amd64: ui assets
        CGO_ENABLED=0 GOOS=linux GOARCH=amd64 $(GOBUILD) -o bin/$(BINARY_NAME)-amd64 -v

build-armv5: ui assets
	CGO_ENABLED=0 GOOS=linux GOARCH=arm GOARM=5 $(GOBUILD) -o bin/$(BINARY_NAME)-armv5 -v

build-armv6: ui assets
	CGO_ENABLED=0 GOOS=linux GOARCH=arm GOARM=6 $(GOBUILD) -o bin/$(BINARY_NAME)-armv6 -v

build-armv7: ui assets
	CGO_ENABLED=0 GOOS=linux GOARCH=arm GOARM=7 $(GOBUILD) -o bin/$(BINARY_NAME)-armv7 -v

container:
	docker build -t wireguard-ui .

run-dev:
	sudo ./bin/$(BINARY_NAME) --log-level=debug --dev-ui-server=http://localhost:5000

run-dev-ui:
	cd ui && npm run dev
