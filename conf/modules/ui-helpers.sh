#!/bin/bash

# UI Helper Functions
# Provides user interaction and display utilities

# Color codes
readonly BLUE='\033[0;34m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly RED='\033[0;31m'
readonly NC='\033[0m' # No Color

# Display banner
show_banner() {
    echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║           AgoraUI Configuration Assistant                 ║${NC}"
    echo -e "${BLUE}║  Customize all project settings for your deployment       ║${NC}"
    echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
    echo ""
}

# Prompts for input with default value
# Args: $1 - prompt text, $2 - default value, $3 - variable name to set
prompt_with_default() {
    local prompt="$1"
    local default="$2"
    local var_name="$3"
    local input
    
    read -p "$(echo -e "${GREEN}${prompt}${NC} [${YELLOW}${default}${NC}]: ")" input
    eval "$var_name='${input:-$default}'"
}

# Prompts yes/no question
# Args: $1 - prompt text, $2 - default ("y" or "n")
# Returns: 0 for yes, 1 for no
prompt_yes_no() {
    local prompt="$1"
    local default="$2"
    local response
    
    if [[ "$default" == "y" ]]; then
        read -p "$(echo -e "${GREEN}${prompt}${NC} [${YELLOW}Y/n${NC}]: ")" -n 1 -r response
        echo
        response=${response:-y}
    else
        read -p "$(echo -e "${GREEN}${prompt}${NC} [${YELLOW}y/N${NC}]: ")" -n 1 -r response
        echo
        response=${response:-n}
    fi
    
    [[ "$response" =~ ^[Yy]$ ]]
}

# Section header display
show_section() {
    echo ""
    echo -e "${BLUE}=== $1 ===${NC}"
}

# Subsection header display
show_subsection() {
    echo -e "${YELLOW}$1:${NC}"
}

# Displays configuration summary
show_summary() {
    echo ""
    echo -e "${YELLOW}════════════════════════════════════════════════════════════${NC}"
    echo -e "${YELLOW}Configuration Summary:${NC}"
    echo -e "${YELLOW}════════════════════════════════════════════════════════════${NC}"
    echo -e "App Name: ${GREEN}$APP_NAME${NC}"
    echo -e "Project: ${GREEN}$APP_TITLE${NC} ($PROJECT_DOMAIN)"
    echo -e "License: ${GREEN}$PROJECT_LICENSE${NC}"
    echo -e "APIs: Auth($AUTH_HOST:$AUTH_PORT), Booking($BOOKING_HOST:$BOOKING_PORT), Messaging($MESSAGING_HOST:$MESSAGING_PORT)"
    echo -e "Languages: ${GREEN}$UI_AVAILABLE_LANGS${NC}"
    
    [[ "$CUSTOMIZE_COLORS" == "true" ]] && \
        echo -e "Theme: ${GREEN}Custom colors configured${NC}"
    
    [[ "$CUSTOM_FAVICON" == "true" ]] && \
        echo -e "Favicon: ${GREEN}Custom favicon set${NC}"
    
    [[ "$CUSTOMIZE_BACKENDS" == "true" ]] && \
        echo -e "Backends: ${GREEN}Custom container names configured${NC}"
    
    [[ "$CUSTOMIZE_COOKIES" == "true" ]] && \
        echo -e "Cookies: ${GREEN}Custom cookie settings configured${NC}"
    
    [[ "$CUSTOMIZE_ANIMATIONS" == "true" ]] && \
        echo -e "Animations: ${GREEN}Custom animation timing configured${NC}"
    
    [[ "$CUSTOMIZE_MESSAGES" == "true" ]] && \
        echo -e "Messages: ${GREEN}Custom user messages configured${NC}"
    
    [[ "$CONFIGURE_PRODUCTION" == "true" ]] && \
        echo -e "Production: ${GREEN}Deployment configured${NC}"
    
    echo ""
}

# Lists all modified files
show_modified_files() {
    echo ""
    echo -e "${YELLOW}Files that will be modified:${NC}"
    echo -e "  - ${GREEN}$ENV_CONFIG_FILE${NC}"
    echo -e "  - ${GREEN}$PROXY_CONFIG_FILE${NC}"
    echo -e "  - ${GREEN}$INDEX_FILE${NC}"
    echo -e "  - ${GREEN}$PACKAGE_FILE${NC}"
    
    [[ "$CUSTOMIZE_COLORS" == "true" ]] && echo -e "  - ${GREEN}$STYLES_FILE${NC}"
    [[ "$CUSTOM_FAVICON" == "true" ]] && echo -e "  - ${GREEN}Favicon file in $SRC_DIR${NC}"
    [[ "$CUSTOMIZE_BACKENDS" == "true" ]] && echo -e "  - ${GREEN}$NGINX_CONFIG_FILE${NC}"
    [[ "$CONFIGURE_PRODUCTION" == "true" ]] && echo -e "  - ${GREEN}$PRODUCTION_SCRIPT${NC}"
    [[ "$CUSTOMIZE_COOKIES" == "true" ]] && echo -e "  - ${GREEN}$COOKIE_CONSTANTS_FILE${NC}" && echo -e "  - ${GREEN}$STORAGE_CONSTANTS_FILE${NC}"
    [[ "$CUSTOMIZE_ANIMATIONS" == "true" ]] && echo -e "  - ${GREEN}$ANIMATION_CONSTANTS_FILE${NC}"
    [[ "$CUSTOMIZE_MESSAGES" == "true" ]] && echo -e "  - ${GREEN}$MESSAGES_CONSTANTS_FILE${NC}"
    
    echo ""
}

# Shows next steps
show_next_steps() {
    echo ""
    echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║           Configuration Applied Successfully!             ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${YELLOW}Next Steps:${NC}"
    echo -e "  1. Review the generated configuration files"
    echo -e "  2. Test locally: ${GREEN}agora serve${NC} or ${GREEN}npm start${NC}"
    echo -e "  3. Build for production: ${GREEN}agora build${NC} or ${GREEN}npm run build${NC}"
    
    [[ "$CONFIGURE_PRODUCTION" == "true" ]] && \
        echo -e "  4. Deploy to production: ${GREEN}bash docker/production.sh${NC}"
    
    echo ""
}
