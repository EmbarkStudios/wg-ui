FROM docker.io/node:12 AS ui
WORKDIR /ui
COPY ui/package.json ui/package-lock.json /ui/
RUN npm install
COPY ui .
RUN npm run build

FROM docker.io/golang:1.14 AS build
WORKDIR /wg
RUN go get github.com/go-bindata/go-bindata/...
RUN go get github.com/elazarl/go-bindata-assetfs/...
COPY go.mod .
COPY go.sum .
RUN go mod download
COPY . .
COPY --from=ui /ui/dist ui/dist
RUN go-bindata-assetfs -prefix ui/dist ui/dist
RUN go install .

FROM gcr.io/distroless/base
COPY --from=build /go/bin/wireguard-ui /
ENTRYPOINT [ "/wireguard-ui" ]
