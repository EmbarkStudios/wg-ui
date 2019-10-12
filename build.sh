#!/bin/bash
set -ex

npm=$(buildah from node:12)
npm_run="buildah run --volume=${PWD}/ui:/ui $npm"
buildah config --workingdir=/ui $npm
$npm_run npm install
$npm_run npm run build
buildah umount $npm

go=$(buildah from golang:1.13.1)
go_run="buildah run --volume=${PWD}:/wg --volume=${HOME}/.cache:/.cache ${go}"

buildah config --workingdir=/wg $go
$go_run go get github.com/go-bindata/go-bindata/...
$go_run go get github.com/elazarl/go-bindata-assetfs/...
$go_run go mod download
$go_run go-bindata-assetfs -prefix ui/dist ui/dist
$go_run go build .
buildah umount $go

dist=$(buildah from --format=docker gcr.io/distroless/base)
buildah config --entrypoint=/wireguard-ui $dist
buildah copy $dist wireguard-ui /
buildah commit $dist embarkstudios/wireguard-ui:latest
buildah umount $dist
