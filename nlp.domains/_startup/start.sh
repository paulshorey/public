#!/bin/bash

####
###
#
# do this on remote only:

# ports
#iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 1080
#ufw allow 80/tcp
#iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 443 -j REDIRECT --to-port 1080
#ufw allow 443/tcp

# authenticate GIT
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/newssh


####
###
##
# pull from GIT repository
git reset HEAD --hard
#rm -rf /srv/fe/nlp.domains
git pull


####
###
##
# restart all in case server was not running
pm2 restart all
pm2 start /srv/fe/nlp.domains/index.js --node-args="--experimental-specifier-resolution=node"


####
###
##
# watch for changes:
npm install express
pm2 start /srv/fe/nlp.domains/_startup/watch.js --node-args="--experimental-specifier-resolution=node"


