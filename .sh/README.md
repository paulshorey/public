## Trying to simplify the process of publishing a new server...

### Access (local):
scp ~/.ssh/newssh root@142.93.8.159:~/.ssh/newssh
scp ~/.ssh/newssh.pub root@142.93.8.159:~/.ssh/newssh.pub

scp /srv/.sh/zprofile root@142.93.8.159:~/.zprofile

### Install (remote): 
bash ~/.sh/install
source ~/.zprofile
git clone git@github.com:paulshorey/fe.git /srv/fe

### SSL Certificate (remote):
sudo openssl req -x509 -nodes -days 1825 -newkey rsa:2048 -keyout /root/.ssh/DomainName.key -out /root/.ssh/DomainName.crt
    * if using SSL + CloudFlare, make sure Cloudflare SSL is set to "Full". It will not work with anything else!!!    

### Setup file server (remote):
mv /etc/nginx/sites-available/default /etc/nginx/sites-available/example
ne /etc/nginx/sites-available/default
    * use file as reference
service nginx restart

### Renew SSL certificate (remote):
openssl req -x509 -newkey rsa:4096 -sha256 -nodes -keyout nlp.domains.key -out nlp.domains.crt -subj "/CN=nlp.domains" -days 3650