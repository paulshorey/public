server {
  server_name zawgihealth.com www.zawgihealth.com;
  rewrite ^/(.*)$ https://www.gofundme.com/f/Zanzibar-Lives-Matter-by-ZAWGI permanent;
}