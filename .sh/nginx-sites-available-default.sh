server {
  listen 80 default_server;
  listen [::]:80 default_server;

  location / {
    root /srv/fe/paulshorey.com;
    index index.html;
  }
}

server {
  listen 80;
  listen [::]:80;
  server_name paulshorey.com www.paulshorey.com;
  return 301 https://$server_name$request_uri;
}
server {
  listen 443 ssl;
  listen [::]:443;
  server_name paulshorey.com www.paulshorey.com;

  ssl on;
  ssl_certificate /root/.ssh/paulshorey.com.crt;
  ssl_certificate_key /root/.ssh/paulshorey.com.key;

  location / {
    root /srv/fe/paulshorey.com;
    index index.html;
  }
}

server {
  listen 80;
  listen [::]:80;
  server_name nlp.domains www.nlp.domains;
  return 301 https://$server_name$request_uri;
}
server {
  listen 443 ssl;
  listen [::]:443;
  server_name nlp.domains www.nlp.domains;

  ssl on;
  ssl_certificate /root/.ssh/nlp.domains.crt;
  ssl_certificate_key /root/.ssh/nlp.domains.key;

  location / {
    root /srv/fe/nlp.domains;
    index index.html;
  }
}