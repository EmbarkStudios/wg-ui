FROM golang:1.12 AS build
WORKDIR /build
RUN go get -u github.com/go-bindata/go-bindata/... &&\
    go get github.com/elazarl/go-bindata-assetfs/...
COPY go.mod .
COPY go.sum .
RUN go mod download
COPY . .
RUN go-bindata-assetfs -prefix html html html/img &&\
    go install .

FROM gcr.io/distroless/base:latest
COPY --from=build /go/bin/wireguard-ui /
ENTRYPOINT [ "/wireguard-ui" ]
