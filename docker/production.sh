#!/bin/bash

# Production Deployment Configuration
# Note: Only DOMAIN and EMAIL are customizable during setup
# PROJECT_NAME, NETWORK_NAME, and PROJECT_PATH are static values
PROJECT_NAME="AgoraUI"
NETWORK_NAME="agoraui"
DOMAIN="example.com"
EMAIL="admin@example.com"
PROJECT_PATH="/home/$USER/AgoraUI"

source "$(dirname "$0")/dependencies.sh"
cd "$PROJECT_PATH";
docker build -t nginx .; 
docker run --name "$PROJECT_NAME" -d \
  --network "$NETWORK_NAME" \
  -p 80:80 -p 443:443 \
  -e DOMAIN="$DOMAIN" \
  -e EMAIL="$EMAIL" \
  -v /etc/letsencrypt:/etc/letsencrypt \
  nginx;
