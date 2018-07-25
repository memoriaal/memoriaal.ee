#!/bin/bash

set -o errexit -o nounset

rm -rf ./build
mkdir -p ./build/assets

cp -r ./assets/* ./build/assets
cp -r ./assets/cache.appcache ./build/cache.appcache

npm run build
