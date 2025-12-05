#!/bin/sh

# Start Nginx in the background
nginx -g 'daemon off;' &
NGINX_PID=$!

# Wait for Nginx to start
sleep 5

if [ "$DOMAIN" != "localhost" ] && [ ! -z "$DOMAIN" ]; then
    echo "Obtaining certificate for $DOMAIN..."
    certbot certonly --webroot --webroot-path=/var/www/certbot --email "$EMAIL" --agree-tos --no-eff-email -d "$DOMAIN" --non-interactive

    if [ -d "/etc/letsencrypt/live/$DOMAIN" ]; then
        echo "Certificate obtained. Updating Nginx configuration..."
        ln -sf "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" /etc/nginx/certs/fullchain.pem
        ln -sf "/etc/letsencrypt/live/$DOMAIN/privkey.pem" /etc/nginx/certs/privkey.pem
        nginx -s reload
    else
        echo "Failed to obtain certificate. Using self-signed certificate."
    fi
    
    # Start renewal loop in background
    while :; do
        sleep 12h
        certbot renew --webroot-path=/var/www/certbot --post-hook "nginx -s reload"
    done &
fi

# Wait for Nginx process
wait $NGINX_PID
