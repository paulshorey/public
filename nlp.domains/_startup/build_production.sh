#!/usr/bin/env bash

npm run build:production

echo "serving http://$(ipconfig getifaddr en0):9000"
node /srv/nlp.domains/index.js

