.PHONY: binary container ui

binary: ui
	go-bindata-assetfs -prefix ui/public ui/public
	go build .

ui:
	cd ui && npm install && npm run build

container:
	docker build -t wireguard-ui .

run-dev: binary
	sudo ./wireguard-ui --log-level=debug --dev-ui-server=http://localhost:5000

run-dev-ui: binary
	cd ui && npm run dev
