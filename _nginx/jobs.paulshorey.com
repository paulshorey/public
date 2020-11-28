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
