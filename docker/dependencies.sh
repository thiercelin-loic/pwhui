#!/bin/bash

# Backend Dependencies Manager
# Manages Docker-based backend services (auth, booking, tell)

set -e

# Constants
readonly BACKEND_SERVICES=("auth" "booking" "tell")
readonly ENV_REQUIRED_SERVICES=("auth" "booking")
readonly GITHUB_USERNAME="thiercelin-loic"
readonly BASE_DIR="/home/$USER"

# Default environment values
readonly DEFAULT_MYSQL_HOST="database"
readonly DEFAULT_MYSQL_PORT="3306"
readonly DEFAULT_MYSQL_USERNAME="root"
readonly DEFAULT_MYSQL_PASSWORD="password"
readonly DEFAULT_NODE_ENV="production"
readonly DEFAULT_PORT="3000"

# Prompts user with yes/no question
# Args: $1 - question text
# Returns: 0 if yes, 1 if no
prompt_yes_no() {
    local question="$1"
    local reply
    
    read -p "$question [y/N] " -n 1 -r reply
    echo
    [[ $reply =~ ^[Yy]$ ]]
}

# Checks if Docker is installed
# Returns: 0 if installed, 1 otherwise
is_docker_installed() {
    command -v docker &> /dev/null
}

# Installs Docker on the system
install_docker() {
    echo "Installing Docker..."
    
    if ! curl -fsSL https://get.docker.com -o get-docker.sh; then
        echo "Error: Failed to download Docker installation script."
        return 1
    fi
    
    if ! sudo sh get-docker.sh; then
        echo "Error: Docker installation failed."
        rm -f get-docker.sh
        return 1
    fi
    
    sudo usermod -aG docker "$USER"
    rm -f get-docker.sh
    
    echo "Docker installed successfully. Please log out and back in for group changes to take effect."
    return 0
}

# Checks for missing backend service directories
# Sets MISSING_DEPS array with missing services
check_missing_dependencies() {
    MISSING_DEPS=()
    
    for service in "${BACKEND_SERVICES[@]}"; do
        if [[ ! -d "$BASE_DIR/$service" ]]; then
            MISSING_DEPS+=("$service")
        fi
    done
}

# Clones missing repositories from GitHub
# Args: $@ - array of service names to clone
clone_repositories() {
    local services=("$@")
    local failed_clones=()
    
    for service in "${services[@]}"; do
        echo "Cloning $service..."
        
        if ! git clone "https://github.com/$GITHUB_USERNAME/$service.git" "$BASE_DIR/$service"; then
            echo "Warning: Failed to clone $service"
            failed_clones+=("$service")
        fi
    done
    
    if [[ ${#failed_clones[@]} -gt 0 ]]; then
        echo "Warning: Some repositories failed to clone: ${failed_clones[*]}"
        return 1
    fi
    
    echo "Dependencies cloned successfully."
    return 0
}

# Prompts for custom environment values
# Returns: associative array of environment variables via stdout
prompt_custom_env_values() {
    local mysql_host mysql_port mysql_username mysql_password node_env port
    
    read -p "MYSQL_HOST [$DEFAULT_MYSQL_HOST]: " mysql_host
    mysql_host="${mysql_host:-$DEFAULT_MYSQL_HOST}"
    
    read -p "MYSQL_PORT [$DEFAULT_MYSQL_PORT]: " mysql_port
    mysql_port="${mysql_port:-$DEFAULT_MYSQL_PORT}"
    
    read -p "MYSQL_USERNAME [$DEFAULT_MYSQL_USERNAME]: " mysql_username
    mysql_username="${mysql_username:-$DEFAULT_MYSQL_USERNAME}"
    
    read -sp "MYSQL_PASSWORD [$DEFAULT_MYSQL_PASSWORD]: " mysql_password
    echo
    mysql_password="${mysql_password:-$DEFAULT_MYSQL_PASSWORD}"
    
    read -p "NODE_ENV [$DEFAULT_NODE_ENV]: " node_env
    node_env="${node_env:-$DEFAULT_NODE_ENV}"
    
    read -p "PORT [$DEFAULT_PORT]: " port
    port="${port:-$DEFAULT_PORT}"
    
    echo "$mysql_host|$mysql_port|$mysql_username|$mysql_password|$node_env|$port"
}

# Gets default environment values
get_default_env_values() {
    echo "$DEFAULT_MYSQL_HOST|$DEFAULT_MYSQL_PORT|$DEFAULT_MYSQL_USERNAME|$DEFAULT_MYSQL_PASSWORD|$DEFAULT_NODE_ENV|$DEFAULT_PORT"
}

# Creates .env file for a service
# Args: $1 - service name, $2 - environment values (pipe-separated)
create_env_file() {
    local service="$1"
    local env_values="$2"
    local env_file="$BASE_DIR/$service/.env"
    
    IFS='|' read -r mysql_host mysql_port mysql_username mysql_password node_env port <<< "$env_values"
    
    cat > "$env_file" << EOF
MYSQL_HOST=$mysql_host
MYSQL_PORT=$mysql_port
MYSQL_USERNAME=$mysql_username
MYSQL_PASSWORD=$mysql_password
MYSQL_DATABASE=$service
NODE_ENV=$node_env
PORT=$port
EOF
    
    echo ".env file created for $service."
}

# Configures environment files for services
configure_environments() {
    for service in "${ENV_REQUIRED_SERVICES[@]}"; do
        if [[ ! -d "$BASE_DIR/$service" ]]; then
            continue
        fi
        
        if [[ -f "$BASE_DIR/$service/.env" ]]; then
            continue
        fi
        
        echo "Missing .env file for $service"
        
        if ! prompt_yes_no "Would you like to create .env file for $service?"; then
            echo "Warning: $service may not work without .env configuration."
            continue
        fi
        
        echo "Configuring $service environment..."
        
        local env_values
        if prompt_yes_no "Use default values? [Y/n] "; then
            env_values=$(get_default_env_values)
        else
            env_values=$(prompt_custom_env_values)
        fi
        
        create_env_file "$service" "$env_values"
    done
}

# Starts a backend service using Docker Compose
# Args: $1 - service name
start_service() {
    local service="$1"
    local service_dir="$BASE_DIR/$service"
    
    if [[ ! -d "$service_dir" ]]; then
        echo "Warning: Directory not found for $service, skipping."
        return 1
    fi
    
    echo "Starting $service service..."
    
    if ! (cd "$service_dir" && docker compose up -d); then
        echo "Error: Failed to start $service service."
        return 1
    fi
    
    return 0
}

# Starts all backend services
start_all_services() {
    local failed_services=()
    
    for service in "${BACKEND_SERVICES[@]}"; do
        if ! start_service "$service"; then
            failed_services+=("$service")
        fi
    done
    
    if [[ ${#failed_services[@]} -eq 0 ]]; then
        echo "All backend services started successfully."
        return 0
    else
        echo "Warning: Some services failed to start: ${failed_services[*]}"
        return 1
    fi
}

# Main execution
main() {
    if ! prompt_yes_no "Do you want to start backend dependencies? (auth, booking, tell)?"; then
        echo "Skipping backend dependencies."
        exit 0
    fi
    
    # Verify Docker installation
    if ! is_docker_installed; then
        echo "Docker is not installed."
        
        if prompt_yes_no "Would you like to install Docker?"; then
            if ! install_docker; then
                echo "Docker installation failed. Exiting."
                exit 1
            fi
            exit 0
        else
            echo "Docker is required to run backend services. Exiting."
            exit 1
        fi
    fi
    
    # Check and clone missing dependencies
    check_missing_dependencies
    
    if [[ ${#MISSING_DEPS[@]} -gt 0 ]]; then
        echo "Missing backend dependencies: ${MISSING_DEPS[*]}"
        
        if prompt_yes_no "Would you like to clone the missing repositories?"; then
            if ! clone_repositories "${MISSING_DEPS[@]}"; then
                echo "Warning: Some repositories failed to clone."
            fi
        else
            echo "Cannot start services without all dependencies. Exiting."
            exit 1
        fi
    fi
    
    # Configure environment files
    configure_environments
    
    # Start all services
    start_all_services
}

main "$@"