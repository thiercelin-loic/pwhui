#!/bin/sh

# Docker Container Entrypoint
# Manages Nginx and SSL certificate automation with Let's Encrypt

set -e

# Constants
readonly CERTBOT_WEBROOT="/var/www/certbot"
readonly CERT_BASE_PATH="/etc/letsencrypt/live"
readonly NGINX_CERT_PATH="/etc/nginx/certs"
readonly RENEWAL_INTERVAL="12h"
readonly NGINX_STARTUP_DELAY=5

# Logging helpers
log_info() {
    echo "[INFO] $1"
}

log_error() {
    echo "[ERROR] $1" >&2
}

log_success() {
    echo "[SUCCESS] $1"
}

# Starts Nginx in background
# Sets NGINX_PID global variable
start_nginx() {
    log_info "Starting Nginx..."
    nginx -g 'daemon off;' &
    NGINX_PID=$!
    
    log_info "Waiting for Nginx to initialize..."
    sleep "$NGINX_STARTUP_DELAY"
    
    if kill -0 "$NGINX_PID" 2>/dev/null; then
        log_success "Nginx started successfully (PID: $NGINX_PID)"
        return 0
    else
        log_error "Nginx failed to start"
        return 1
    fi
}

# Obtains SSL certificate from Let's Encrypt
# Args: $1 - domain, $2 - email
# Returns: 0 on success, 1 on failure
obtain_certificate() {
    local domain="$1"
    local email="$2"
    
    log_info "Obtaining certificate for $domain..."
    
    if certbot certonly \
        --webroot \
        --webroot-path="$CERTBOT_WEBROOT" \
        --email "$email" \
        --agree-tos \
        --no-eff-email \
        -d "$domain" \
        --non-interactive; then
        log_success "Certificate obtained for $domain"
        return 0
    else
        log_error "Failed to obtain certificate for $domain"
        return 1
    fi
}

# Links certificate files to Nginx certificate directory
# Args: $1 - domain
# Returns: 0 on success, 1 on failure
link_certificates() {
    local domain="$1"
    local cert_dir="$CERT_BASE_PATH/$domain"
    
    if [[ ! -d "$cert_dir" ]]; then
        log_error "Certificate directory not found: $cert_dir"
        return 1
    fi
    
    log_info "Linking certificates to Nginx..."
    
    ln -sf "$cert_dir/fullchain.pem" "$NGINX_CERT_PATH/fullchain.pem"
    ln -sf "$cert_dir/privkey.pem" "$NGINX_CERT_PATH/privkey.pem"
    
    log_success "Certificates linked successfully"
    return 0
}

# Reloads Nginx configuration
reload_nginx() {
    log_info "Reloading Nginx configuration..."
    
    if nginx -s reload; then
        log_success "Nginx configuration reloaded"
        return 0
    else
        log_error "Failed to reload Nginx"
        return 1
    fi
}

# Runs certificate renewal loop
# Args: $1 - renewal interval (e.g., "12h")
run_renewal_loop() {
    local interval="$1"
    
    log_info "Starting certificate renewal loop (interval: $interval)"
    
    while true; do
        sleep "$interval"
        log_info "Running certificate renewal check..."
        
        if certbot renew --webroot-path="$CERTBOT_WEBROOT" --post-hook "nginx -s reload"; then
            log_success "Certificate renewal check completed"
        else
            log_error "Certificate renewal check failed"
        fi
    done
}

# Configures SSL certificates for production domain
# Returns: 0 if configured successfully or not needed
configure_ssl() {
    if [[ "$DOMAIN" = "localhost" ]] || [[ -z "$DOMAIN" ]]; then
        log_info "Domain is localhost or not set, skipping SSL configuration"
        return 0
    fi
    
    if [[ -z "$EMAIL" ]]; then
        log_error "EMAIL environment variable is required for SSL certificates"
        return 1
    fi
    
    if obtain_certificate "$DOMAIN" "$EMAIL"; then
        if link_certificates "$DOMAIN"; then
            reload_nginx
            log_success "SSL configured successfully for $DOMAIN"
            
            # Start renewal process in background
            run_renewal_loop "$RENEWAL_INTERVAL" &
            log_info "Certificate auto-renewal enabled"
        else
            log_error "Failed to link certificates, using self-signed certificate"
        fi
    else
        log_error "Failed to obtain certificate, using self-signed certificate"
    fi
    
    return 0
}

# Main execution
main() {
    log_info "=== Container Entrypoint Starting ==="
    
    # Start Nginx
    if ! start_nginx; then
        log_error "Failed to start Nginx, exiting"
        exit 1
    fi
    
    # Configure SSL if needed
    configure_ssl
    
    log_info "=== Initialization Complete ==="
    
    # Wait for Nginx process
    wait "$NGINX_PID"
}

main "$@"
