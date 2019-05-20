FROM golang:1.12 AS build_deps
WORKDIR /build
COPY go.mod .
COPY go.sum .
RUN go mod download

FROM build_deps AS build
COPY . .
RUN CGO_ENABLED=1 GOOS=linux GOARCH=amd64 go install -a -tags netgo -ldflags '-w -extldflags "-static"' .

FROM gcr.io/distroless/base:debug
COPY --from=build /build/wireguard-ui /
ENTRYPOINT [ "/wireguard-ui" ]
