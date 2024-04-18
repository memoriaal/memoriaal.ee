#!/bin/bash

set -o errexit -o nounset

rm -rf ./dist
mkdir ./dist

cp -r ./netlify/functions ./public/netlify/functions
cp -r ./public/* ./dist
npm run build
