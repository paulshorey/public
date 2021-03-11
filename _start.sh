#!/bin/bash
# NOTE: when running this file, first "cd" into this directory, then run the script!
cd /srv/public

####
###
##
# direct incoming traffic
#iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 1080
#ufw allow 80/tcp
#iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 443 -j REDIRECT --to-port 1443
#ufw allow 443/tcp

# authenticate GIT
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/newssh

####
###
##
# install dependencies
rm package-lock.json
git reset HEAD --hard
git pull
npm install --prune


####
###
##
# serve files
# this is done by nginx


####
###
##
# watch for changes
pm2 start /srv/public/_watch.mjs --node-args="--experimental-specifier-resolution=node"
