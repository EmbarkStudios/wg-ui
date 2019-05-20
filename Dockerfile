FROM golang:1.12 AS build
WORKDIR /build
COPY go.mod .
COPY go.sum .
RUN go mod download
COPY . .
RUN go install .

FROM gcr.io/distroless/base:latest
COPY --from=build /go/bin/wireguard-ui /
ENTRYPOINT [ "/wireguard-ui" ]
