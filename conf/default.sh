#!/bin/bash

# AgoraUI Default Configuration Restoration Script
# Restores all settings to default AgoraUI configuration

set -e

# Determine project root (support both direct execution and CLI invocation)
if [ -f "package.json" ] && [ -d "conf" ]; then
    # Running from project root
    PROJECT_ROOT="."
elif [ -f "../package.json" ] && [ -d "../src" ]; then
    # Running from conf directory
    PROJECT_ROOT=".."
else
    echo "Error: This script must be run from the project root or conf directory"
    echo "Usage: bash conf/default.sh"
    echo "   or: agora default"
    exit 1
fi

# Change to project root
cd "$PROJECT_ROOT"

# Paths (relative to project root)
readonly SRC_DIR="src"
readonly ENV_CONFIG_FILE="$SRC_DIR/environments/app.config.ts"
readonly PROXY_CONFIG_FILE="proxy.conf.json"
readonly STYLES_FILE="$SRC_DIR/styles.css"
readonly INDEX_FILE="$SRC_DIR/index.html"
readonly PACKAGE_FILE="package.json"
readonly NGINX_CONFIG_FILE="nginx.conf"
readonly ICONS_DIR="$SRC_DIR/icons"
readonly PUBLIC_DIR="public"

# Constants directories
readonly CONSTANTS_DIR="$SRC_DIR/app/shared/constants"
readonly COOKIE_CONSTANTS_FILE="$CONSTANTS_DIR/cookie.constants.ts"
readonly STORAGE_CONSTANTS_FILE="$CONSTANTS_DIR/storage.constants.ts"
readonly ANIMATION_CONSTANTS_FILE="$CONSTANTS_DIR/animation.constants.ts"
readonly MESSAGES_CONSTANTS_FILE="$CONSTANTS_DIR/messages.constants.ts"

# Script paths
readonly CONF_DIR="conf"
readonly MODULES_DIR="$CONF_DIR/modules"
readonly DOCKER_DIR="docker"
readonly PRODUCTION_SCRIPT="$DOCKER_DIR/production.sh"
readonly ENTRYPOINT_SCRIPT="$DOCKER_DIR/entrypoint.sh"

# Verify all required files exist
if [ ! -f "$PACKAGE_FILE" ]; then
    echo "Error: package.json not found. Are you in the correct directory?"
    exit 1
fi

if [ ! -d "$MODULES_DIR" ]; then
    echo "Error: conf/modules directory not found"
    exit 1
fi

# Source module files
source "$MODULES_DIR/ui-helpers.sh"
source "$MODULES_DIR/defaults.sh"
source "$MODULES_DIR/config-prompts.sh"
source "$MODULES_DIR/file-updaters.sh"

# Main execution
main() {
    show_banner
    
    # Show invocation method
    if [ "$AGORA_CLI" = "1" ]; then
        echo -e "\033[0;36m✨ Running via AgoraUI CLI (agora default)\033[0m\n"
    fi
    
    # Show restoration dialog and get confirmation
    if ! configure_default_restoration; then
        exit 0
    fi
    
    echo ""
    
    # Apply all configuration changes
    apply_configuration
    
    # Show completion message
    echo -e "\n${GREEN}${BOLD}╔════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}${BOLD}║                                                            ║${NC}"
    echo -e "${GREEN}${BOLD}║     ✓ Default Configuration Successfully Restored!        ║${NC}"
    echo -e "${GREEN}${BOLD}║                                                            ║${NC}"
    echo -e "${GREEN}${BOLD}╚════════════════════════════════════════════════════════════╝${NC}\n"
    
    echo -e "${BLUE}${BOLD}Next Steps:${NC}"
    echo -e "  ${GREEN}1.${NC} Restart development server if running: ${YELLOW}agora serve${NC}"
    echo -e "  ${GREEN}2.${NC} Backend services will use default ports (3001/3002/3003)"
    echo -e "  ${GREEN}3.${NC} All features are enabled by default\n"
}

main "$@"
