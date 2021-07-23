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

FROM gcr.io/distroless/base
COPY --from=build /go/bin/wireguard-ui /
ENTRYPOINT [ "/wireguard-ui" ]
