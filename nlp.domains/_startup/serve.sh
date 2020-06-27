#!/usr/bin/env bash

echo "serving http://$(ipconfig getifaddr en0):9000"
node index.js

