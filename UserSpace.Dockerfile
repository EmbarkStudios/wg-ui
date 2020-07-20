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

FROM docker.io/golang:1.14 AS wg_go_build
WORKDIR /wg-go
RUN git init && \
    git remote add origin https://git.zx2c4.com/wireguard-go && \
    git fetch && \
    git checkout tags/v0.0.20200320 -b build && \
    make

FROM alpine:3.12
RUN apk add libc6-compat --no-cache
COPY ./wg-go-ui.sh /
COPY --from=build /go/bin/wireguard-ui /
COPY --from=wg_go_build /wg-go/wireguard-go /
ENTRYPOINT [ "/wg-go-ui.sh" ]
