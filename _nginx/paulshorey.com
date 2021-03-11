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
  ssl_certificate /srv/public/_certs/paulshorey.com.crt;
  ssl_certificate_key /srv/public/_certs/paulshorey.com.key;

  location / {
    root /srv/public/ps;
    index index.html;
  }
}

server {
  listen 80;
  listen [::]:80;
  server_name files.paulshorey.com;
  return 301 https://$server_name$request_uri;
}
server {
  listen 443 ssl;
  listen [::]:443;
  server_name files.paulshorey.com;

  ssl on;
  ssl_certificate /srv/public/_certs/files.paulshorey.com.crt;
  ssl_certificate_key /srv/public/_certs/files.paulshorey.com.key;

  location / {
    root /srv/public/files;
    index index.html;
  }
}

server {
  listen 80;
  listen [::]:80;
  server_name jobs.paulshorey.com;
  return 301 https://$server_name$request_uri;
}
server {
  listen 443 ssl;
  listen [::]:443;
  server_name jobs.paulshorey.com;

  ssl on;
  ssl_certificate /srv/public/_certs/jobs.paulshorey.com.crt;
  ssl_certificate_key /srv/public/_certs/jobs.paulshorey.com.key;

  location / {
    root /srv/public/ps-jobs;
    index index.html;
  }
}

server {
  listen 80;
  listen [::]:80;
  server_name spiral.paulshorey.com;
  return 301 https://$server_name$request_uri;
}
server {
  listen 443 ssl;
  listen [::]:443;
  server_name spiral.paulshorey.com;

  ssl on;
  ssl_certificate /srv/public/_certs/spiral.paulshorey.com.crt;
  ssl_certificate_key /srv/public/_certs/spiral.paulshorey.com.key;

  location / {
    root /srv/public/spiral;
    index index.html;
  }
}
