#!/bin/bash

# Backend Services Shutdown Script
# Stops all Docker Compose services for backend dependencies

set -e

# Constants
readonly BACKEND_SERVICES=("auth" "booking" "tell")
readonly BASE_DIR="/home/$USER"

# Color codes for output
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly NC='\033[0m' # No Color

# Stops a single service
# Args: $1 - service name
# Returns: 0 on success, 1 on failure
stop_service() {
    local service="$1"
    local service_dir="$BASE_DIR/$service"
    
    if [[ ! -d "$service_dir" ]]; then
        echo -e "${YELLOW}Warning: Directory not found for $service, skipping.${NC}"
        return 1
    fi
    
    echo "Stopping $service service..."
    
    if (cd "$service_dir" && docker compose down); then
        echo -e "${GREEN}✓ $service stopped successfully${NC}"
        return 0
    else
        echo -e "${RED}✗ Failed to stop $service${NC}"
        return 1
    fi
}

# Main execution
main() {
    echo "Shutting down backend services..."
    echo
    
    local failed_services=()
    local stopped_count=0
    
    for service in "${BACKEND_SERVICES[@]}"; do
        if stop_service "$service"; then
            ((stopped_count++))
        else
            failed_services+=("$service")
        fi
    done
    
    echo
    echo "================== Summary =================="
    echo "Services stopped: $stopped_count/${#BACKEND_SERVICES[@]}"
    
    if [[ ${#failed_services[@]} -gt 0 ]]; then
        echo -e "${YELLOW}Failed services: ${failed_services[*]}${NC}"
        exit 1
    else
        echo -e "${GREEN}All services stopped successfully!${NC}"
        exit 0
    fi
}

main "$@"