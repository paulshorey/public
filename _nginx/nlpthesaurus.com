server {
  listen 80;
  listen [::]:80;
  server_name nlpthesaurus.com www.nlpthesaurus.com;
  return 301 https://$server_name$request_uri;
}
server {
  listen 443 ssl;
  listen [::]:443;
  server_name nlpthesaurus.com www.nlpthesaurus.com;

  ssl on;
  ssl_certificate /root/.certs/nlpthesaurus.com.crt;
  ssl_certificate_key /root/.certs/nlpthesaurus.com.key;

  location / {
    root /srv/fe/nlp.domains;
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
  ssl_certificate /root/.certs/nlp.domains.crt;
  ssl_certificate_key /root/.certs/nlp.domains.key;

  location / {
    root /srv/fe/nlp.domains;
    index index.html;
  }
}