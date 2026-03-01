#!/usr/bin/env python3
"""
Docker Container Entrypoint
Manages Nginx and SSL certificate automation with Let's Encrypt
"""

import os
import sys
import time
import signal
import subprocess
from pathlib import Path
from typing import Optional

# Constants
CERTBOT_WEBROOT = "/var/www/certbot"
CERT_BASE_PATH = "/etc/letsencrypt/live"
NGINX_CERT_PATH = "/etc/nginx/certs"
RENEWAL_INTERVAL_HOURS = 12
NGINX_STARTUP_DELAY = 5

# Global variable for Nginx process
nginx_process: Optional[subprocess.Popen] = None


def log_info(message: str) -> None:
    """Log info message."""
    print(f"[INFO] {message}")


def log_error(message: str) -> None:
    """Log error message."""
    print(f"[ERROR] {message}", file=sys.stderr)


def log_success(message: str) -> None:
    """Log success message."""
    print(f"[SUCCESS] {message}")


def start_nginx() -> bool:
    """
    Starts Nginx in background.
    
    Returns:
        True on success, False on failure
    """
    global nginx_process
    
    log_info("Starting Nginx...")
    
    try:
        nginx_process = subprocess.Popen(
            ['nginx', '-g', 'daemon off;']
        )
        
        log_info("Waiting for Nginx to initialize...")
        time.sleep(NGINX_STARTUP_DELAY)
        
        # Check if process is still running
        if nginx_process.poll() is None:
            log_success(f"Nginx started successfully (PID: {nginx_process.pid})")
            return True
        else:
            log_error("Nginx failed to start")
            return False
            
    except Exception as e:
        log_error(f"Failed to start Nginx: {e}")
        return False


def obtain_certificate(domain: str, email: str) -> bool:
    """
    Obtains SSL certificate from Let's Encrypt.
    
    Args:
        domain: Domain name
        email: Admin email
        
    Returns:
        True on success, False on failure
    """
    log_info(f"Obtaining certificate for {domain}...")
    
    try:
        result = subprocess.run([
            'certbot', 'certonly',
            '--webroot',
            '--webroot-path', CERTBOT_WEBROOT,
            '--email', email,
            '--agree-tos',
            '--no-eff-email',
            '-d', domain,
            '--non-interactive'
        ], check=True, capture_output=True)
        
        log_success(f"Certificate obtained for {domain}")
        return True
        
    except subprocess.CalledProcessError as e:
        log_error(f"Failed to obtain certificate for {domain}: {e}")
        return False


def link_certificates(domain: str) -> bool:
    """
    Links certificate files to Nginx certificate directory.
    
    Args:
        domain: Domain name
        
    Returns:
        True on success, False on failure
    """
    cert_dir = Path(CERT_BASE_PATH) / domain
    
    if not cert_dir.is_dir():
        log_error(f"Certificate directory not found: {cert_dir}")
        return False
    
    log_info("Linking certificates to Nginx...")
    
    try:
        nginx_cert_path = Path(NGINX_CERT_PATH)
        
        # Create symbolic links
        fullchain = nginx_cert_path / "fullchain.pem"
        privkey = nginx_cert_path / "privkey.pem"
        
        # Remove existing links if they exist
        fullchain.unlink(missing_ok=True)
        privkey.unlink(missing_ok=True)
        
        # Create new links
        fullchain.symlink_to(cert_dir / "fullchain.pem")
        privkey.symlink_to(cert_dir / "privkey.pem")
        
        log_success("Certificates linked successfully")
        return True
        
    except Exception as e:
        log_error(f"Failed to link certificates: {e}")
        return False


def reload_nginx() -> bool:
    """
    Reloads Nginx configuration.
    
    Returns:
        True on success, False on failure
    """
    log_info("Reloading Nginx configuration...")
    
    try:
        subprocess.run(['nginx', '-s', 'reload'], check=True)
        log_success("Nginx configuration reloaded")
        return True
        
    except subprocess.CalledProcessError as e:
        log_error(f"Failed to reload Nginx: {e}")
        return False


def run_renewal_loop() -> None:
    """
    Runs certificate renewal loop.
    This function runs indefinitely.
    """
    log_info(f"Starting certificate renewal loop (interval: {RENEWAL_INTERVAL_HOURS}h)")
    
    while True:
        time.sleep(RENEWAL_INTERVAL_HOURS * 3600)  # Convert hours to seconds
        log_info("Running certificate renewal check...")
        
        try:
            subprocess.run([
                'certbot', 'renew',
                '--webroot-path', CERTBOT_WEBROOT,
                '--post-hook', 'nginx -s reload'
            ], check=True)
            log_success("Certificate renewal check completed")
            
        except subprocess.CalledProcessError:
            log_error("Certificate renewal check failed")


def configure_ssl() -> bool:
    """
    Configures SSL certificates for production domain.
    
    Returns:
        True if configured successfully or not needed
    """
    domain = os.environ.get('DOMAIN', '')
    email = os.environ.get('EMAIL', '')
    
    if domain in ('localhost', '') or not domain:
        log_info("Domain is localhost or not set, skipping SSL configuration")
        return True
    
    if not email:
        log_error("EMAIL environment variable is required for SSL certificates")
        return False
    
    if obtain_certificate(domain, email):
        if link_certificates(domain):
            reload_nginx()
            log_success(f"SSL configured successfully for {domain}")
            
            # Start renewal process in background thread
            import threading
            renewal_thread = threading.Thread(target=run_renewal_loop, daemon=True)
            renewal_thread.start()
            log_info("Certificate auto-renewal enabled")
        else:
            log_error("Failed to link certificates, using self-signed certificate")
    else:
        log_error("Failed to obtain certificate, using self-signed certificate")
    
    return True


def signal_handler(signum, frame):
    """Handle shutdown signals."""
    log_info("Received shutdown signal, stopping...")
    if nginx_process:
        nginx_process.terminate()
        try:
            nginx_process.wait(timeout=10)
        except subprocess.TimeoutExpired:
            nginx_process.kill()
    sys.exit(0)


def main() -> int:
    """
    Main execution function.
    
    Returns:
        Exit code
    """
    log_info("=== Container Entrypoint Starting ===")
    
    # Set up signal handlers
    signal.signal(signal.SIGTERM, signal_handler)
    signal.signal(signal.SIGINT, signal_handler)
    
    # Start Nginx
    if not start_nginx():
        log_error("Failed to start Nginx, exiting")
        return 1
    
    # Configure SSL if needed
    configure_ssl()
    
    log_info("=== Initialization Complete ===")
    
    # Wait for Nginx process
    if nginx_process:
        try:
            nginx_process.wait()
        except KeyboardInterrupt:
            log_info("Interrupted, shutting down...")
            nginx_process.terminate()
            nginx_process.wait()
    
    return 0


if __name__ == '__main__':
    sys.exit(main())
