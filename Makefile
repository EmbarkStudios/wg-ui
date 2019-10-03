.PHONY: binary container ui

binary: go-binary ui

go-binary:
	go-bindata-assetfs -prefix ui/dist ui/dist
	go build .

ui:
	cd ui && npm install && npm run build

container:
	docker build -t wireguard-ui .

run-dev: go-binary
	sudo ./wireguard-ui --log-level=debug --dev-ui-server=http://localhost:5000

run-dev-ui: ui
	cd ui && npm run dev
