#!/bin/bash

# Configuration Collection Functions
# Interactive prompts for gathering user configuration

# Collects application branding configuration
configure_branding() {
    show_section "Application Branding"
    
    # Fixed values - not customizable
    APP_NAME="AgoraUI"
    APP_DESCRIPTION="Customizable market platform"
    
    # Customizable page title
    prompt_with_default "Application title" "AgoraUI" APP_TITLE
}

# Collects project context configuration
configure_project_context() {
    show_section "Project Context"
    
    # Fixed value - AgoraUI is the engine
    PROJECT_NAME="AgoraUI"
    
    prompt_with_default "Project domain" "example.com" PROJECT_DOMAIN
    prompt_with_default "Project URL" "https://$PROJECT_DOMAIN" PROJECT_URL
}

# Collects API configuration for a specific service
# Args: $1 - service name, $2 - default host, $3 - default port, $4 - default protocol
# Sets: <SERVICE>_HOST, <SERVICE>_PORT, <SERVICE>_PROTOCOL
configure_api_service() {
    local service_name="$1"
    local default_host="$2"
    local default_port="$3"
    local default_protocol="$4"
    local service_upper
    
    service_upper=$(echo "$service_name" | tr '[:lower:]' '[:upper:]')
    
    show_subsection "$service_name Service"
    
    prompt_with_default "  Host" "$default_host" "${service_upper}_HOST"
    prompt_with_default "  Port" "$default_port" "${service_upper}_PORT"
    prompt_with_default "  Protocol" "$default_protocol" "${service_upper}_PROTOCOL"
}

# Collects API configuration for all services
configure_api() {
    show_section "API Configuration"
    
    configure_api_service "Auth" "localhost" "3001" "http"
    configure_api_service "Booking" "localhost" "3002" "http"
    configure_api_service "Messaging" "localhost" "3003" "http"
}

# Collects feature flags configuration
configure_features() {
    show_section "Feature Flags"
    
    prompt_yes_no "Enable authentication?" "y" && FEATURE_AUTH="true" || FEATURE_AUTH="false"
    prompt_yes_no "Enable booking?" "y" && FEATURE_BOOKING="true" || FEATURE_BOOKING="false"
    prompt_yes_no "Enable messaging?" "y" && FEATURE_MESSAGING="true" || FEATURE_MESSAGING="false"
    prompt_yes_no "Enable internationalization?" "y" && FEATURE_I18N="true" || FEATURE_I18N="false"
    prompt_yes_no "Enable policies?" "y" && FEATURE_POLICIES="true" || FEATURE_POLICIES="false"
}

# Collects UI configuration
configure_ui() {
    show_section "UI Configuration"
    
    prompt_with_default "Default language" "en" UI_DEFAULT_LANG
    prompt_with_default "Available languages (comma-separated)" "en,fr,es,de,zh,ar,pt,it,ja,ru" UI_AVAILABLE_LANGS
    prompt_with_default "Date format" "YYYY-MM-DD" UI_DATE_FORMAT
    prompt_with_default "Time format" "HH:mm" UI_TIME_FORMAT
}

# Collects color theme configuration
configure_styling() {
    show_section "Styling Theme"
    
    if prompt_yes_no "Customize color theme?" "n"; then
        prompt_with_default "Primary color" "#4A4A4A" THEME_PRIMARY_COLOR
        prompt_with_default "Secondary color" "#808080" THEME_SECONDARY_COLOR
        prompt_with_default "Text color" "#333" THEME_TEXT_COLOR
        CUSTOMIZE_COLORS="true"
    else
        CUSTOMIZE_COLORS="false"
    fi
    
    if prompt_yes_no "Customize background image?" "n"; then
        prompt_with_default "Background image URL" "default.jpg" THEME_BACKGROUND_IMAGE
        CUSTOMIZE_BACKGROUND="true"
    else
        CUSTOMIZE_BACKGROUND="false"
    fi
}

# Collects branding assets configuration
configure_assets() {
    show_section "Branding Assets"
    
    if prompt_yes_no "Replace favicon with custom icon?" "n"; then
        read -p "$(echo -e "${GREEN}Path to custom favicon (.ico file only):${NC} ")" FAVICON_PATH
        if [[ -f "$FAVICON_PATH" ]]; then
            local extension="${FAVICON_PATH##*.}"
            if [[ "$extension" == "ico" ]]; then
                CUSTOM_FAVICON="true"
            else
                echo -e "${RED}Only .ico files are supported. Skipping favicon replacement.${NC}"
                CUSTOM_FAVICON="false"
            fi
        else
            echo -e "${RED}File not found. Skipping favicon replacement.${NC}"
            CUSTOM_FAVICON="false"
        fi
    else
        CUSTOM_FAVICON="false"
    fi
}

# Collects production deployment configuration
configure_production() {
    show_section "Production Deployment"
    
    if prompt_yes_no "Configure production deployment?" "n"; then
        prompt_with_default "Production domain" "$PROJECT_DOMAIN" PROD_DOMAIN
        prompt_with_default "Admin email for SSL" "admin@$PROJECT_DOMAIN" PROD_EMAIL
        prompt_with_default "Docker network name" "agoraui" PROD_NETWORK_NAME
        
        # Static values (not customizable)
        PROD_CONTAINER_NAME="AgoraUI"
        PROD_PROJECT_PATH="/home/\$USER/AgoraUI"
        
        CONFIGURE_PRODUCTION="true"
    else
        CONFIGURE_PRODUCTION="false"
    fi
}

# Collects backend services configuration
configure_backends() {
    show_section "Backend Services (Nginx/Production)"
    
    if prompt_yes_no "Customize backend container names?" "n"; then
        prompt_with_default "Auth container name" "auth" BACKEND_AUTH_CONTAINER
        prompt_with_default "Booking container name" "booking" BACKEND_BOOKING_CONTAINER
        prompt_with_default "Messaging container name" "tell" BACKEND_MESSAGING_CONTAINER
        prompt_with_default "Auth internal port" "3000" BACKEND_AUTH_PORT
        prompt_with_default "Booking internal port" "3000" BACKEND_BOOKING_PORT
        prompt_with_default "Messaging internal port" "3000" BACKEND_MESSAGING_PORT
        CUSTOMIZE_BACKENDS="true"
    else
        CUSTOMIZE_BACKENDS="false"
    fi
}

# Collects cookie and session configuration
configure_cookies() {
    show_section "Cookie & Session Settings"
    
    if prompt_yes_no "Customize cookie/session settings?" "n"; then
        prompt_with_default "Cookie max age (seconds)" "604800" COOKIE_MAX_AGE
        prompt_with_default "Session timeout (minutes)" "30" SESSION_TIMEOUT
        prompt_with_default "Policy modal delay (ms)" "1000" POLICY_MODAL_DELAY
        prompt_with_default "Storage key prefix" "agora_" STORAGE_PREFIX
        CUSTOMIZE_COOKIES="true"
    else
        CUSTOMIZE_COOKIES="false"
    fi
}

# Collects animation configuration
configure_animations() {
    show_section "Animation Settings"
    
    if prompt_yes_no "Customize animation timing?" "n"; then
        prompt_with_default "Toast duration (ms)" "3000" TOAST_DURATION
        prompt_with_default "Typing speed (ms)" "50" TYPING_SPEED
        prompt_with_default "Delay between texts (ms)" "1000" DELAY_BETWEEN_TEXTS
        CUSTOMIZE_ANIMATIONS="true"
    else
        CUSTOMIZE_ANIMATIONS="false"
    fi
}

# Collects user messages configuration
configure_messages() {
    show_section "User Messages"
    
    if prompt_yes_no "Customize user-facing messages?" "n"; then
        prompt_with_default "Login success message" "Login successful!" MSG_LOGIN_SUCCESS
        prompt_with_default "Message sent confirmation" "Message sent successfully" MSG_MESSAGE_SENT
        CUSTOMIZE_MESSAGES="true"
    else
        CUSTOMIZE_MESSAGES="false"
    fi
}

# Collects license configuration
configure_license() {
    show_section "License & Legal"
    
    prompt_with_default "Project license" "CC BY-NC 4.0" PROJECT_LICENSE
}

# Configure default restoration (non-interactive)
configure_default_restoration() {
    echo -e "${BLUE}${BOLD}"
    echo "╔════════════════════════════════════════════════════════════╗"
    echo "║                                                            ║"
    echo "║           Restore AgoraUI to Default Configuration        ║"
    echo "║                                                            ║"
    echo "╚════════════════════════════════════════════════════════════╝"
    echo -e "${NC}\n"
    
    echo -e "${YELLOW}This will restore the following to defaults:${NC}"
    echo -e "  • Color theme (grayscale: #4A4A4A, #808080, #333)"
    echo -e "  • Background image (default.jpg)"
    echo -e "  • Favicon (default AgoraUI icon)"
    echo -e "  • API endpoints (localhost:3001/3002/3003)"
    echo -e "  • All feature flags (enabled)"
    echo -e "  • UI settings (languages, date/time formats)"
    echo -e "  • Cookie & session settings"
    echo -e "  • Animation settings"
    echo -e "  • User messages"
    echo -e "  • Production & backend configuration\n"
    
    if prompt_yes_no "Are you sure you want to restore all defaults?" "n"; then
        restore_default_values
        restore_default_assets
        remove_custom_theme
        return 0
    else
        echo -e "${RED}Default restoration cancelled.${NC}"
        return 1
    fi
}
