#!/bin/bash

# AgoraUI Configuration Script
# Interactive setup wizard for customizing all application settings

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
    echo "Usage: bash conf/setup.sh"
    echo "   or: agora init"
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
source "$MODULES_DIR/config-prompts.sh"
source "$MODULES_DIR/file-updaters.sh"

# Main execution
main() {
    show_banner
    
    # Show invocation method
    if [ "$AGORA_CLI" = "1" ]; then
        echo -e "\033[0;36m✨ Running via AgoraUI CLI (agora init)\033[0m\n"
    fi
    
    # Collect all configuration through prompts
    configure_branding
    configure_project_context
    configure_api
    configure_features
    configure_ui
    configure_styling
    configure_assets
    configure_production
    configure_backends
    configure_cookies
    configure_animations
    configure_messages
    configure_license
    
    # Show summary and confirm
    show_summary
    show_modified_files
    
    if ! prompt_yes_no "Apply these changes?" "y"; then
        echo -e "${RED}Configuration cancelled.${NC}"
        exit 0
    fi
    
    # Apply all configuration changes
    apply_configuration
    
    # Show next steps
    show_next_steps
}

main "$@"
