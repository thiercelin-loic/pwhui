#!/usr/bin/env python3
"""
Default Configuration Values
These are the default values that can be restored with "booker default"
"""

from pathlib import Path
from typing import Dict, Any

# Get project root
PROJECT_ROOT = Path(__file__).parent.parent.parent

# Application defaults
DEFAULT_APP_NAME = "Booker"
DEFAULT_APP_TITLE = "Booker"
DEFAULT_APP_DESCRIPTION = "Customizable market platform"

# Project defaults
DEFAULT_PROJECT_NAME = "Booker"
DEFAULT_PROJECT_DOMAIN = "example.com"
DEFAULT_PROJECT_URL = "https://example.com"
DEFAULT_PROJECT_LICENSE = "CC BY-NC 4.0"

# API defaults
DEFAULT_CORE_HOST = "localhost"
DEFAULT_CORE_PORT = "3000"
DEFAULT_CORE_PROTOCOL = "http"

# Feature defaults
DEFAULT_FEATURE_CORE = "true"
DEFAULT_FEATURE_I18N = "true"
DEFAULT_FEATURE_POLICIES = "true"

# UI defaults
DEFAULT_UI_DEFAULT_LANG = "en"
DEFAULT_UI_AVAILABLE_LANGS = "en,fr,es,de,zh,ar,pt,it,ja,ru"
DEFAULT_UI_DATE_FORMAT = "YYYY-MM-DD"
DEFAULT_UI_TIME_FORMAT = "HH:mm"

# Theme defaults (grayscale)
DEFAULT_THEME_PRIMARY_COLOR = "#4A4A4A"
DEFAULT_THEME_BACKGROUND_IMAGE = "default.jpg"

# Production defaults
DEFAULT_PROD_DOMAIN = "example.com"
DEFAULT_PROD_EMAIL = "admin@example.com"
DEFAULT_PROD_CONTAINER_NAME = "Booker"
DEFAULT_PROD_NETWORK_NAME = "booker"
DEFAULT_PROD_PROJECT_PATH = "~/Booker"

# Cookie & session defaults
DEFAULT_COOKIE_MAX_AGE = "604800"
DEFAULT_SESSION_TIMEOUT = "30"
DEFAULT_POLICY_MODAL_DELAY = "1000"
DEFAULT_STORAGE_PREFIX = "booker_"

# Animation defaults
DEFAULT_TOAST_DURATION = "3000"
DEFAULT_TYPING_SPEED = "50"
DEFAULT_DELAY_BETWEEN_TEXTS = "1000"

# Maps defaults
DEFAULT_MAPS_API_KEY = ""
DEFAULT_MAPS_LOCATION = "Space+Needle,Seattle+WA"

# Messages defaults
DEFAULT_MSG_LOGIN_SUCCESS = "Login successful!"
DEFAULT_MSG_MESSAGE_SENT = "Message sent successfully"

# Assets defaults
DEFAULT_FAVICON_PATH = PROJECT_ROOT / "src" / "icons" / "favicon.ico"
DEFAULT_BACKGROUND_IMAGE_PATH = PROJECT_ROOT / "src" / "default.jpg"

# Footer defaults
DEFAULT_FOOTER_QUOTE = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis aperiam incidunt dicta, quibusdam similique accusantium saepe nihil minima quia ab doloremque quis? Cupiditate quaerat reprehenderit officia explicabo pariatur, neque sequi."
DEFAULT_FOOTER_ABOUT_URL = "https://www.linkedin.com/in/loic-thiercelin/"
DEFAULT_FOOTER_LEGAL_URL = "/policy"


def get_default_config() -> Dict[str, Any]:
    """
    Returns a dictionary with all default configuration values.

    Returns:
        Dictionary containing all default configuration
    """
    return {
        # Application
        "APP_NAME": DEFAULT_APP_NAME,
        "APP_TITLE": DEFAULT_APP_TITLE,
        "APP_DESCRIPTION": DEFAULT_APP_DESCRIPTION,
        # Project
        "PROJECT_NAME": DEFAULT_PROJECT_NAME,
        "PROJECT_DOMAIN": DEFAULT_PROJECT_DOMAIN,
        "PROJECT_URL": DEFAULT_PROJECT_URL,
        "PROJECT_LICENSE": DEFAULT_PROJECT_LICENSE,
        # API
        "CORE_HOST": DEFAULT_CORE_HOST,
        "CORE_PORT": DEFAULT_CORE_PORT,
        "CORE_PROTOCOL": DEFAULT_CORE_PROTOCOL,
        # Features
        "FEATURE_CORE": DEFAULT_FEATURE_CORE,
        "FEATURE_I18N": DEFAULT_FEATURE_I18N,
        "FEATURE_POLICIES": DEFAULT_FEATURE_POLICIES,
        # UI
        "UI_DEFAULT_LANG": DEFAULT_UI_DEFAULT_LANG,
        "UI_AVAILABLE_LANGS": DEFAULT_UI_AVAILABLE_LANGS,
        "UI_DATE_FORMAT": DEFAULT_UI_DATE_FORMAT,
        "UI_TIME_FORMAT": DEFAULT_UI_TIME_FORMAT,
        # Theme
        "THEME_PRIMARY_COLOR": DEFAULT_THEME_PRIMARY_COLOR,
        "THEME_BACKGROUND_IMAGE": DEFAULT_THEME_BACKGROUND_IMAGE,
        # Production
        "PROD_DOMAIN": DEFAULT_PROD_DOMAIN,
        "PROD_EMAIL": DEFAULT_PROD_EMAIL,
        "PROD_CONTAINER_NAME": DEFAULT_PROD_CONTAINER_NAME,
        "PROD_NETWORK_NAME": DEFAULT_PROD_NETWORK_NAME,
        "PROD_PROJECT_PATH": DEFAULT_PROD_PROJECT_PATH,
        # Cookies & session
        "COOKIE_MAX_AGE": DEFAULT_COOKIE_MAX_AGE,
        "SESSION_TIMEOUT": DEFAULT_SESSION_TIMEOUT,
        "POLICY_MODAL_DELAY": DEFAULT_POLICY_MODAL_DELAY,
        "STORAGE_PREFIX": DEFAULT_STORAGE_PREFIX,
        # Animations
        "TOAST_DURATION": DEFAULT_TOAST_DURATION,
        "TYPING_SPEED": DEFAULT_TYPING_SPEED,
        "DELAY_BETWEEN_TEXTS": DEFAULT_DELAY_BETWEEN_TEXTS,
        # Maps
        "MAPS_API_KEY": DEFAULT_MAPS_API_KEY,
        "MAPS_LOCATION": DEFAULT_MAPS_LOCATION,
        # Messages
        "MSG_LOGIN_SUCCESS": DEFAULT_MSG_LOGIN_SUCCESS,
        "MSG_MESSAGE_SENT": DEFAULT_MSG_MESSAGE_SENT,
        # Configuration flags
        "CUSTOMIZE_MAPS": True,
        "CUSTOMIZE_COLORS": False,
        "CUSTOMIZE_BACKGROUND": False,
        "CUSTOM_FAVICON": False,
        "CONFIGURE_PRODUCTION": True,
        "CUSTOMIZE_COOKIES": True,
        "CUSTOMIZE_ANIMATIONS": True,
        "CUSTOMIZE_MESSAGES": True,
        # Footer
        "FOOTER_QUOTE": DEFAULT_FOOTER_QUOTE,
        "FOOTER_ABOUT_URL": DEFAULT_FOOTER_ABOUT_URL,
        "FOOTER_LEGAL_URL": DEFAULT_FOOTER_LEGAL_URL,
    }
