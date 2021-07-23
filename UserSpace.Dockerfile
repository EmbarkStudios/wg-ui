FROM docker.io/node:12 AS ui
WORKDIR /ui
COPY ui/package.json ui/package-lock.json /ui/
RUN npm install
COPY ui .
RUN npm run build

FROM docker.io/golang:latest AS build
WORKDIR /wg
COPY go.mod .
COPY go.sum .
RUN go mod download
COPY . .
COPY --from=ui /ui/dist ui/dist
RUN go install .

FROM docker.io/golang:latest AS wg_go_build
WORKDIR /wg-go
RUN git init
RUN git remote add origin https://git.zx2c4.com/wireguard-go
RUN git fetch
RUN git checkout tags/0.0.20210424 -b build
RUN make

FROM alpine:latest
RUN apk add libc6-compat --no-cache
COPY ./wg-go-ui.sh /
COPY --from=build /go/bin/wireguard-ui /
COPY --from=wg_go_build /wg-go/wireguard-go /
ENTRYPOINT [ "/wg-go-ui.sh" ]
