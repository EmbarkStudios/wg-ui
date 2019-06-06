FROM node:8-alpine AS ui
WORKDIR /build
COPY . .
RUN npm install --prefix=ui
RUN npm run --prefix=ui build

FROM golang:1.12 AS build
WORKDIR /build
RUN go get -u github.com/go-bindata/go-bindata/... &&\
    go get github.com/elazarl/go-bindata-assetfs/...
COPY go.mod .
COPY go.sum .
RUN go mod download
COPY . .
COPY --from=ui /build/ui/public /build/ui/public
RUN go-bindata-assetfs -prefix ui/public ui/public &&\
    go install .

FROM gcr.io/distroless/base:latest
COPY --from=build /go/bin/wireguard-ui /
ENTRYPOINT [ "/wireguard-ui" ]
