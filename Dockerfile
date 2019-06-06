FROM node:12-alpine AS ui
WORKDIR /ui
COPY ui .
RUN npm install
RUN npm run build

FROM golang:1.12 AS build
WORKDIR /wg
RUN go get github.com/go-bindata/go-bindata/... &&\
    go get github.com/elazarl/go-bindata-assetfs/...
COPY go.mod .
COPY go.sum .
RUN go mod download
COPY . .
COPY --from=ui /ui/public ui/public
RUN go-bindata-assetfs -prefix ui/public ui/public &&\
    go install .

FROM gcr.io/distroless/base:latest
COPY --from=build /go/bin/wireguard-ui /
ENTRYPOINT [ "/wireguard-ui" ]
