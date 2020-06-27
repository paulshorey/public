#!/usr/bin/env bash

npm install serve-handler

echo "serving http://$(ipconfig getifaddr en0):9000"
node index.js

