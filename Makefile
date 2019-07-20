binary:
	go build .

container:
	docker build -t wireguard-ui .

run-dev: binary
	sudo ./wireguard-ui --log-level=debug --dev-ui-server=http://localhost:5000

run-dev-ui: binary
	cd ui && npm run dev
