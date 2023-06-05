#!/bin/bash

set -o errexit -o nounset

rm -rf ./dist
mkdir ./dist

cp -r ./public/* ./dist

node ./scripts/compile-gallery.js

npm run build
