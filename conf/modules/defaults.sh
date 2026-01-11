#!/bin/bash

# Default Configuration Values
# These are the default values that can be restored with "agora default"

# Application defaults
readonly DEFAULT_APP_NAME="AgoraUI"
readonly DEFAULT_APP_TITLE="AgoraUI"
readonly DEFAULT_APP_DESCRIPTION="Customizable market platform"

# Project defaults
readonly DEFAULT_PROJECT_NAME="AgoraUI"
readonly DEFAULT_PROJECT_DOMAIN="example.com"
readonly DEFAULT_PROJECT_URL="https://example.com"
readonly DEFAULT_PROJECT_LICENSE="CC BY-NC 4.0"

# API defaults
readonly DEFAULT_AUTH_HOST="localhost"
readonly DEFAULT_AUTH_PORT="3001"
readonly DEFAULT_AUTH_PROTOCOL="http"

readonly DEFAULT_BOOKING_HOST="localhost"
readonly DEFAULT_BOOKING_PORT="3002"
readonly DEFAULT_BOOKING_PROTOCOL="http"

readonly DEFAULT_MESSAGING_HOST="localhost"
readonly DEFAULT_MESSAGING_PORT="3003"
readonly DEFAULT_MESSAGING_PROTOCOL="http"

# Feature defaults
readonly DEFAULT_FEATURE_AUTH="true"
readonly DEFAULT_FEATURE_BOOKING="true"
readonly DEFAULT_FEATURE_MESSAGING="true"
readonly DEFAULT_FEATURE_I18N="true"
readonly DEFAULT_FEATURE_POLICIES="true"

# UI defaults
readonly DEFAULT_UI_DEFAULT_LANG="en"
readonly DEFAULT_UI_AVAILABLE_LANGS="en,fr,es,de,zh,ar,pt,it,ja,ru"
readonly DEFAULT_UI_DATE_FORMAT="YYYY-MM-DD"
readonly DEFAULT_UI_TIME_FORMAT="HH:mm"

# Theme defaults (grayscale)
readonly DEFAULT_THEME_PRIMARY_COLOR="#4A4A4A"
readonly DEFAULT_THEME_SECONDARY_COLOR="#808080"
readonly DEFAULT_THEME_TEXT_COLOR="#333"
readonly DEFAULT_THEME_BACKGROUND_IMAGE="default.jpg"

# Production defaults
readonly DEFAULT_PROD_DOMAIN="example.com"
readonly DEFAULT_PROD_EMAIL="admin@example.com"
readonly DEFAULT_PROD_CONTAINER_NAME="AgoraUI"
readonly DEFAULT_PROD_NETWORK_NAME="agoraui"
readonly DEFAULT_PROD_PROJECT_PATH="/home/\$USER/AgoraUI"

# Backend defaults
readonly DEFAULT_BACKEND_AUTH_CONTAINER="auth"
readonly DEFAULT_BACKEND_BOOKING_CONTAINER="booking"
readonly DEFAULT_BACKEND_MESSAGING_CONTAINER="tell"
readonly DEFAULT_BACKEND_AUTH_PORT="3000"
readonly DEFAULT_BACKEND_BOOKING_PORT="3000"
readonly DEFAULT_BACKEND_MESSAGING_PORT="3000"

# Cookie & session defaults
readonly DEFAULT_COOKIE_MAX_AGE="604800"
readonly DEFAULT_SESSION_TIMEOUT="30"
readonly DEFAULT_POLICY_MODAL_DELAY="1000"
readonly DEFAULT_STORAGE_PREFIX="agora_"

# Animation defaults
readonly DEFAULT_TOAST_DURATION="3000"
readonly DEFAULT_TYPING_SPEED="50"
readonly DEFAULT_DELAY_BETWEEN_TEXTS="1000"

# Messages defaults
readonly DEFAULT_MSG_LOGIN_SUCCESS="Login successful!"
readonly DEFAULT_MSG_MESSAGE_SENT="Message sent successfully"

# Assets defaults
readonly DEFAULT_FAVICON_PATH="$PROJECT_ROOT/src/icons/favicon.ico"
readonly DEFAULT_BACKGROUND_IMAGE_PATH="$PROJECT_ROOT/src/default.jpg"

# Restore all defaults to variables
restore_default_values() {
    # Application
    APP_NAME="$DEFAULT_APP_NAME"
    APP_TITLE="$DEFAULT_APP_TITLE"
    APP_DESCRIPTION="$DEFAULT_APP_DESCRIPTION"
    
    # Project
    PROJECT_NAME="$DEFAULT_PROJECT_NAME"
    PROJECT_DOMAIN="$DEFAULT_PROJECT_DOMAIN"
    PROJECT_URL="$DEFAULT_PROJECT_URL"
    PROJECT_LICENSE="$DEFAULT_PROJECT_LICENSE"
    
    # API
    AUTH_HOST="$DEFAULT_AUTH_HOST"
    AUTH_PORT="$DEFAULT_AUTH_PORT"
    AUTH_PROTOCOL="$DEFAULT_AUTH_PROTOCOL"
    
    BOOKING_HOST="$DEFAULT_BOOKING_HOST"
    BOOKING_PORT="$DEFAULT_BOOKING_PORT"
    BOOKING_PROTOCOL="$DEFAULT_BOOKING_PROTOCOL"
    
    MESSAGING_HOST="$DEFAULT_MESSAGING_HOST"
    MESSAGING_PORT="$DEFAULT_MESSAGING_PORT"
    MESSAGING_PROTOCOL="$DEFAULT_MESSAGING_PROTOCOL"
    
    # Features
    FEATURE_AUTH="$DEFAULT_FEATURE_AUTH"
    FEATURE_BOOKING="$DEFAULT_FEATURE_BOOKING"
    FEATURE_MESSAGING="$DEFAULT_FEATURE_MESSAGING"
    FEATURE_I18N="$DEFAULT_FEATURE_I18N"
    FEATURE_POLICIES="$DEFAULT_FEATURE_POLICIES"
    
    # UI
    UI_DEFAULT_LANG="$DEFAULT_UI_DEFAULT_LANG"
    UI_AVAILABLE_LANGS="$DEFAULT_UI_AVAILABLE_LANGS"
    UI_DATE_FORMAT="$DEFAULT_UI_DATE_FORMAT"
    UI_TIME_FORMAT="$DEFAULT_UI_TIME_FORMAT"
    
    # Theme
    THEME_PRIMARY_COLOR="$DEFAULT_THEME_PRIMARY_COLOR"
    THEME_SECONDARY_COLOR="$DEFAULT_THEME_SECONDARY_COLOR"
    THEME_TEXT_COLOR="$DEFAULT_THEME_TEXT_COLOR"
    THEME_BACKGROUND_IMAGE="$DEFAULT_THEME_BACKGROUND_IMAGE"
    
    # Production
    PROD_DOMAIN="$DEFAULT_PROD_DOMAIN"
    PROD_EMAIL="$DEFAULT_PROD_EMAIL"
    PROD_CONTAINER_NAME="$DEFAULT_PROD_CONTAINER_NAME"
    PROD_NETWORK_NAME="$DEFAULT_PROD_NETWORK_NAME"
    PROD_PROJECT_PATH="$DEFAULT_PROD_PROJECT_PATH"
    
    # Backends
    BACKEND_AUTH_CONTAINER="$DEFAULT_BACKEND_AUTH_CONTAINER"
    BACKEND_BOOKING_CONTAINER="$DEFAULT_BACKEND_BOOKING_CONTAINER"
    BACKEND_MESSAGING_CONTAINER="$DEFAULT_BACKEND_MESSAGING_CONTAINER"
    BACKEND_AUTH_PORT="$DEFAULT_BACKEND_AUTH_PORT"
    BACKEND_BOOKING_PORT="$DEFAULT_BACKEND_BOOKING_PORT"
    BACKEND_MESSAGING_PORT="$DEFAULT_BACKEND_MESSAGING_PORT"
    
    # Cookies & session
    COOKIE_MAX_AGE="$DEFAULT_COOKIE_MAX_AGE"
    SESSION_TIMEOUT="$DEFAULT_SESSION_TIMEOUT"
    POLICY_MODAL_DELAY="$DEFAULT_POLICY_MODAL_DELAY"
    STORAGE_PREFIX="$DEFAULT_STORAGE_PREFIX"
    
    # Animations
    TOAST_DURATION="$DEFAULT_TOAST_DURATION"
    TYPING_SPEED="$DEFAULT_TYPING_SPEED"
    DELAY_BETWEEN_TEXTS="$DEFAULT_DELAY_BETWEEN_TEXTS"
    
    # Messages
    MSG_LOGIN_SUCCESS="$DEFAULT_MSG_LOGIN_SUCCESS"
    MSG_MESSAGE_SENT="$DEFAULT_MSG_MESSAGE_SENT"
    
    # Configuration flags for file updates
    CUSTOMIZE_COLORS="false"
    CUSTOMIZE_BACKGROUND="false"
    CUSTOM_FAVICON="false"
    CONFIGURE_PRODUCTION="true"
    CUSTOMIZE_BACKENDS="true"
    CUSTOMIZE_COOKIES="true"
    CUSTOMIZE_ANIMATIONS="true"
    CUSTOMIZE_MESSAGES="true"
}

# Restore default assets (favicon and background image)
restore_default_assets() {
    echo -e "${YELLOW}Restoring default assets...${NC}"
    
    # Restore default favicon
    if [ -f "$DEFAULT_FAVICON_PATH" ]; then
        cp "$DEFAULT_FAVICON_PATH" "$PROJECT_ROOT/src/favicon.ico"
        echo -e "${GREEN}✓ Default favicon restored${NC}"
    else
        echo -e "${RED}⚠ Default favicon not found at $DEFAULT_FAVICON_PATH${NC}"
    fi
}

# Remove custom theme from styles.css
remove_custom_theme() {
    echo -e "${YELLOW}Removing custom theme from styles.css...${NC}"
    
    # Remove custom theme section if present
    perl -i -0pe 's/\n*\/\* Custom Theme Colors - Generated by setup script \*\/.*?^}/\n/ms' "$PROJECT_ROOT/$STYLES_FILE"
    
    # Remove trailing empty lines at the end of file
    sed -i -e :a -e '/^\s*$/d;N;ba' "$PROJECT_ROOT/$STYLES_FILE"
    
    echo -e "${GREEN}✓ Custom theme removed (default grayscale restored)${NC}"
}
