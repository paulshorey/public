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
