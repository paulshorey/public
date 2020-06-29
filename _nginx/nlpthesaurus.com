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

  # location / {
  #   proxy_pass http://localhost:9000;
  #   proxy_http_version 1.1;
  #   proxy_set_header Upgrade $http_upgrade;
  #   proxy_set_header Connection 'upgrade';
  #   proxy_set_header Host $host;
  #   proxy_cache_bypass $http_upgrade;
  # }

  location / {
   root /srv/public/nlp-fe;
   index word/index.html;
  }
}

