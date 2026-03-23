#!/usr/bin/env python3
"""
File Update Functions
Applies configuration changes to project files
"""

import json
import re
import shutil
from pathlib import Path
from typing import Dict, Any
from .ui_helpers import YELLOW, GREEN, RED, NC


def update_app_config(config: Dict[str, Any], paths: Dict[str, Path]) -> None:
    """
    Updates app.config.ts with configuration.

    Args:
        config: Configuration dictionary
        paths: Paths dictionary
    """
    print(f"{YELLOW}Updating {paths['ENV_CONFIG_FILE']}...{NC}")

    available_langs = str(config.get("UI_AVAILABLE_LANGS", ""))
    langs = available_langs.replace(",", "', '")

    content = f"""/**
 * Application Configuration
 * 
 * This file contains all project-specific configuration values.
 * Modify these values to adapt the application for different contexts.
 */

export const APP_CONFIG = {{
  /**
   * Application branding and metadata
   */
  name: '{config['APP_NAME']}',
  title: '{config['APP_TITLE']}',
  description: '{config['APP_DESCRIPTION']}',
  
  /**
   * Project context and identification
   * Used for licensing, attribution, and analytics
   */
  project: {{
    name: '{config['PROJECT_NAME']}',
    displayName: '{config['APP_TITLE']}',
    domain: '{config['PROJECT_DOMAIN']}',
    url: '{config['PROJECT_URL']}',
  }},
  
  /**
   * Backend API configuration
   * Defines endpoints for each microservice
   */
  api: {{
    auth: {{
      host: '{config['AUTH_HOST']}',
      port: {config['AUTH_PORT']},
      protocol: '{config['AUTH_PROTOCOL']}',
    }},
    booking: {{
      host: '{config['BOOKING_HOST']}',
      port: {config['BOOKING_PORT']},
      protocol: '{config['BOOKING_PROTOCOL']}',
    }},
    messaging: {{
      host: '{config['MESSAGING_HOST']}',
      port: {config['MESSAGING_PORT']},
      protocol: '{config['MESSAGING_PROTOCOL']}',
    }},
  }},
  
  /**
   * Feature flags
   * Enable/disable major application features
   */
  features: {{
    auth: {config['FEATURE_AUTH']},
    booking: {config['FEATURE_BOOKING']},
    messaging: {config['FEATURE_MESSAGING']},
    i18n: {config['FEATURE_I18N']},
    policies: {config['FEATURE_POLICIES']},
  }},
  
  /**
   * UI/UX preferences
   */
  ui: {{
    defaultLanguage: '{config['UI_DEFAULT_LANG']}',
    availableLanguages: ['{langs}'],
    dateFormat: '{config['UI_DATE_FORMAT']}',
    timeFormat: '{config['UI_TIME_FORMAT']}',
  }},
  
  /**
   * License information
   */
  license: '{config['PROJECT_LICENSE']}',
}} as const;

/**
 * Helper function to construct full API URLs
 */
export function getApiUrl(service: 'auth' | 'booking' | 'messaging'): string {{
  const config = APP_CONFIG.api[service];
  return `${{config.protocol}}://${{config.host}}:${{config.port}}`;
}}

/**
 * Export computed values for easy access
 */
export const API_BASE_URLS = {{
  AUTH: getApiUrl('auth'),
  BOOKING: getApiUrl('booking'),
  MESSAGING: getApiUrl('messaging'),
}} as const;
"""

    paths["ENV_CONFIG_FILE"].write_text(content, encoding="utf-8")


def update_proxy_config(config: Dict[str, Any], paths: Dict[str, Path]) -> None:
    """
    Updates proxy.conf.json.

    Args:
        config: Configuration dictionary
        paths: Paths dictionary
    """
    print(f"{YELLOW}Updating {paths['PROXY_CONFIG_FILE']}...{NC}")

    proxy_config: Dict[str, Dict[str, Any]] = {
        "/auth": {
            "target": f"{config['AUTH_PROTOCOL']}://{config['AUTH_HOST']}:{config['AUTH_PORT']}",
            "secure": False,
            "changeOrigin": True,
            "pathRewrite": {"^/auth": "/api/auth"},
        },
        "/users": {
            "target": f"{config['AUTH_PROTOCOL']}://{config['AUTH_HOST']}:{config['AUTH_PORT']}",
            "secure": False,
            "changeOrigin": True,
            "pathRewrite": {"^/users": "/api/users"},
        },
        "/booking": {
            "target": f"{config['BOOKING_PROTOCOL']}://{config['BOOKING_HOST']}:{config['BOOKING_PORT']}",
            "secure": False,
            "changeOrigin": True,
            "pathRewrite": {"^/booking": "/api"},
        },
        "/messaging": {
            "target": f"{config['MESSAGING_PROTOCOL']}://{config['MESSAGING_HOST']}:{config['MESSAGING_PORT']}",
            "secure": False,
            "changeOrigin": True,
            "pathRewrite": {"^/messaging": "/api"},
            "ws": True,
        },
    }

    with open(paths["PROXY_CONFIG_FILE"], "w", encoding="utf-8") as f:
        json.dump(proxy_config, f, indent=2)


def update_styles(config: Dict[str, Any], paths: Dict[str, Path]) -> None:
    """
    Updates styles.css with custom colors and background image.

    Args:
        config: Configuration dictionary
        paths: Paths dictionary
    """
    if not config.get("CUSTOMIZE_COLORS") and not config.get("CUSTOMIZE_BACKGROUND"):
        return

    print(f"{YELLOW}Updating {paths['STYLES_FILE']} with custom theme...{NC}")

    styles_file = paths["STYLES_FILE"]
    content = styles_file.read_text(encoding="utf-8")

    # Remove existing custom theme section if present
    content = re.sub(
        r"\n*/\* Custom Theme Colors - Generated by setup script \*/.*?^}",
        "",
        content,
        flags=re.MULTILINE | re.DOTALL,
    )

    # Remove trailing empty lines
    content = content.rstrip() + "\n"

    # Build custom theme CSS
    custom_theme = (
        "\n\n/* Custom Theme Colors - Generated by setup script */\n:root {\n"
    )

    if config.get("CUSTOMIZE_COLORS"):
        custom_theme += f"  --primary: {config['THEME_PRIMARY_COLOR']};\n"

    if config.get("CUSTOMIZE_BACKGROUND"):
        custom_theme += (
            f"  --background-image: url('{config['THEME_BACKGROUND_IMAGE']}');\n"
        )

    custom_theme += "}\n"

    content += custom_theme
    styles_file.write_text(content, encoding="utf-8")


def update_favicon(config: Dict[str, Any], paths: Dict[str, Path]) -> None:
    """
    Updates branding icons.

    Args:
        config: Configuration dictionary
        paths: Paths dictionary
    """
    if not config.get("CUSTOM_FAVICON"):
        return

    print(f"{YELLOW}Updating favicon file...{NC}")

    # Copy favicon to src directory (for production builds)
    src_favicon = paths["SRC_DIR"] / "favicon.ico"
    shutil.copy2(config["FAVICON_PATH"], src_favicon)

    # Copy favicon to public directory (for dev server and default fallback)
    public_favicon = paths["PUBLIC_DIR"] / "favicon.ico"
    shutil.copy2(config["FAVICON_PATH"], public_favicon)

    print(f"{GREEN}Favicon (.ico) updated in src/ and public/ directories{NC}")


def update_production_script(config: Dict[str, Any], paths: Dict[str, Path]) -> None:
    """
    Updates production.py script.

    Args:
        config: Configuration dictionary
        paths: Paths dictionary
    """
    if not config.get("CONFIGURE_PRODUCTION"):
        return

    print(f"{YELLOW}Updating {paths['PRODUCTION_SCRIPT']}...{NC}")

    content = f'''#!/usr/bin/env python3
"""
Production Deployment Configuration
Builds and runs the production Docker container
"""

import os
import sys
import subprocess
from pathlib import Path

# Production Deployment Configuration
# Note: Only DOMAIN and EMAIL are customizable during setup
# PROJECT_NAME, and PROJECT_PATH are static values
PROJECT_NAME = "{config['PROD_CONTAINER_NAME']}"
NETWORK_NAME = "{config['PROD_NETWORK_NAME']}"
DOMAIN = "{config['PROD_DOMAIN']}"
EMAIL = "{config['PROD_EMAIL']}"
PROJECT_PATH = "{config['PROD_PROJECT_PATH']}"

def main() -> int:
    """
    Main execution function.
    
    Returns:
        Exit code (0 for success, 1 for failure)
    """
    try:
        # Change to project path
        os.chdir(Path.cwd())
        
        # Build Docker image
        print(f"Building Docker image for {{PROJECT_NAME}}...")
        subprocess.run(['docker', 'build', '-t', 'nginx', '.'], check=True)
        
        # Run Docker container
        print(f"Starting {{PROJECT_NAME}} container...")
        subprocess.run([
            'docker', 'run',
            '--name', PROJECT_NAME,
            '-d',
            '--network', NETWORK_NAME,
            '-p', '80:80',
            '-p', '443:443',
            '-e', f'DOMAIN={{DOMAIN}}',
            '-e', f'EMAIL={{EMAIL}}',
            '-v', '/etc/letsencrypt:/etc/letsencrypt',
            'nginx'
        ], check=True)
        
        print(f"{{PROJECT_NAME}} container started successfully!")
        return 0
        
    except subprocess.CalledProcessError as e:
        import sys
        print(f"Error: Command failed with exit code {{e.returncode}}", file=sys.stderr)
        return 1
    except Exception as e:
        import sys
        print(f"Error: {{e}}", file=sys.stderr)
        return 1


if __name__ == '__main__':
    sys.exit(main())
'''

    paths["PRODUCTION_SCRIPT"].write_text(content, encoding="utf-8")


def update_cookie_constants(config: Dict[str, Any], paths: Dict[str, Path]) -> None:
    """
    Updates cookie constants.

    Args:
        config: Configuration dictionary
        paths: Paths dictionary
    """
    if not config.get("CUSTOMIZE_COOKIES"):
        return

    print(f"{YELLOW}Updating cookie and storage constants...{NC}")

    # Cookie constants
    cookie_content = f"""export const COOKIE_CONSTANTS = {{
  MAX_AGE: {config['COOKIE_MAX_AGE']},
  SESSION_TIMEOUT: {config['SESSION_TIMEOUT']},
  POLICY_MODAL_DELAY: {config['POLICY_MODAL_DELAY']},
  CONSENT_KEY: '{config['STORAGE_PREFIX']}consent',
  CONSENT_VALUE: 'accepted',
  CONSENT_MAX_AGE: {config['COOKIE_MAX_AGE']}
}} as const;
"""

    paths["COOKIE_CONSTANTS_FILE"].write_text(cookie_content, encoding="utf-8")
    # Storage constants
    storage_content = f"""export const STORAGE_CONSTANTS = {{
  PREFIX: '{config['STORAGE_PREFIX']}',
  TOKEN_KEY: '{config['STORAGE_PREFIX']}token',
  TOKEN_PREFIX: 'Bearer ',
  COOKIE_TOKEN_KEY: '{config['STORAGE_PREFIX']}token',
  COOKIE_SEPARATOR: '|'
}} as const;
"""

    paths["STORAGE_CONSTANTS_FILE"].write_text(storage_content, encoding="utf-8")


def update_animation_constants(config: Dict[str, Any], paths: Dict[str, Path]) -> None:
    """
    Updates animation constants.

    Args:
        config: Configuration dictionary
        paths: Paths dictionary
    """
    if not config.get("CUSTOMIZE_ANIMATIONS"):
        return

    print(f"{YELLOW}Updating animation constants...{NC}")

    content = f"""export const ANIMATION_CONSTANTS = {{
  TOAST_DURATION: {config['TOAST_DURATION']},
  TYPING_SPEED: {config['TYPING_SPEED']},
  DELAY_BETWEEN_TEXTS: {config['DELAY_BETWEEN_TEXTS']},
  ERASING_SPEED: {config['TYPING_SPEED']}
}} as const;
"""

    paths["ANIMATION_CONSTANTS_FILE"].write_text(content, encoding="utf-8")


def update_message_constants(config: Dict[str, Any], paths: Dict[str, Path]) -> None:
    """
    Updates message constants.

    Args:
        config: Configuration dictionary
        paths: Paths dictionary
    """
    if not config.get("CUSTOMIZE_MESSAGES"):
        return

    print(f"{YELLOW}Updating message constants...{NC}")

    content = f"""export const ERROR_MESSAGES = {{
  NETWORK_ERROR: 'Network error occurred',
  AUTHENTICATION_FAILED: 'Authentication failed',
  INVALID_INPUT: 'Invalid input provided',
  SERVER_ERROR: 'Server error occurred',
  NOT_FOUND: 'Resource not found',
  CONVERSATION_CREATION_FAILED: 'Failed to create conversation',
  MESSAGE_SEND_FAILED: 'Failed to send message',
  SEND_MESSAGE_LOGGED_OUT: 'You must be logged in to send messages',
  LOGIN_REQUIRED: 'Please log in to continue',
  BOOKING_INCOMPLETE: 'Please complete all required fields',
  LOAD_LISTINGS_FAILED: 'Failed to load listings',
  LOAD_BOOKINGS_FAILED: 'Failed to load bookings',
  BOOKING_FAILED: 'Booking failed'
}} as const;

export const SUCCESS_MESSAGES = {{
  LOGIN_SUCCESS: '{config['MSG_LOGIN_SUCCESS']}',
  MESSAGE_SENT: '{config['MSG_MESSAGE_SENT']}',
  BOOKING_SUCCESS: 'Booking completed successfully!'
}} as const;
"""

    paths["MESSAGES_CONSTANTS_FILE"].write_text(content, encoding="utf-8")


def update_maps_constants(config: Dict[str, Any], paths: Dict[str, Path]) -> None:
    """
    Updates maps.constants.ts with the configured Google Maps API key and location.

    Args:
        config: Configuration dictionary
        paths: Paths dictionary
    """
    if not config.get("CUSTOMIZE_MAPS"):
        return

    print(f"{YELLOW}Updating {paths['MAPS_CONSTANTS_FILE']}...{NC}")

    content = f"""export const MAPS_CONSTANTS = {{
  API_KEY: '{config['MAPS_API_KEY']}',
  LOCATION: '{config['MAPS_LOCATION']}',
}} as const;
"""

    paths["MAPS_CONSTANTS_FILE"].write_text(content, encoding="utf-8")


def update_index_html(config: Dict[str, Any], paths: Dict[str, Path]) -> None:
    """
    Updates index.html title.

    Args:
        config: Configuration dictionary
        paths: Paths dictionary
    """
    print(f"{YELLOW}Updating {paths['INDEX_FILE']} title...{NC}")

    index_file = paths["INDEX_FILE"]
    content = index_file.read_text(encoding="utf-8")

    content = re.sub(
        r"<title>.*?</title>", f"<title>{config['APP_TITLE']}</title>", content
    )

    index_file.write_text(content, encoding="utf-8")


def update_package_json(config: Dict[str, Any], paths: Dict[str, Path]) -> None:
    """
    Updates package.json name.

    Args:
        config: Configuration dictionary
        paths: Paths dictionary
    """
    print(f"{YELLOW}Updating {paths['PACKAGE_FILE']} name...{NC}")

    lowercase_name = config["APP_NAME"].lower().replace(" ", "-")

    package_file = paths["PACKAGE_FILE"]
    with open(package_file, "r", encoding="utf-8") as f:
        package_data = json.load(f)

    package_data["name"] = lowercase_name

    with open(package_file, "w", encoding="utf-8") as f:
        json.dump(package_data, f, indent=2, ensure_ascii=False)
        f.write("\n")


def apply_configuration(config: Dict[str, Any], paths: Dict[str, Path]) -> None:
    """
    Applies all configuration changes.

    Args:
        config: Configuration dictionary
        paths: Paths dictionary
    """
    from .ui_helpers import BLUE, GREEN, NC

    print()
    print(f"{BLUE}Applying configuration changes...{NC}")
    print()

    update_app_config(config, paths)
    update_proxy_config(config, paths)
    update_styles(config, paths)
    update_favicon(config, paths)
    update_production_script(config, paths)
    update_cookie_constants(config, paths)
    update_animation_constants(config, paths)
    update_message_constants(config, paths)
    update_maps_constants(config, paths)
    update_index_html(config, paths)
    update_package_json(config, paths)
    update_landing_page(config, paths)

    print()
    print(f"{GREEN}All configuration files updated successfully!{NC}")


def restore_default_assets(paths: Dict[str, Path]) -> None:
    """
    Restore default assets (favicon and background image).

    Args:
        paths: Paths dictionary
    """
    from .defaults import DEFAULT_FAVICON_PATH

    print(f"{YELLOW}Restoring default assets...{NC}")

    # Restore default favicon to both src and public directories
    src_favicon = paths["SRC_DIR"] / "favicon.ico"
    public_favicon = paths["PUBLIC_DIR"] / "favicon.ico"

    if DEFAULT_FAVICON_PATH.exists():
        shutil.copy2(DEFAULT_FAVICON_PATH, src_favicon)
        shutil.copy2(DEFAULT_FAVICON_PATH, public_favicon)
        print(f"{GREEN}✓ Default favicon restored to src/ and public/ directories{NC}")
    else:
        print(f"{RED}⚠ Default favicon not found at {DEFAULT_FAVICON_PATH}{NC}")


def remove_custom_theme(paths: Dict[str, Path]) -> None:
    """
    Remove custom theme from styles.css.

    Args:
        paths: Paths dictionary
    """
    print(f"{YELLOW}Removing custom theme from styles.css...{NC}")

    styles_file = paths["STYLES_FILE"]
    content = styles_file.read_text(encoding="utf-8")

    # Remove custom theme section if present
    content = re.sub(
        r"\n*/\* Custom Theme Colors - Generated by setup script \*/.*?^}",
        "",
        content,
        flags=re.MULTILINE | re.DOTALL,
    )

    # Remove trailing empty lines and add single newline
    content = content.rstrip() + "\n"

    styles_file.write_text(content, encoding="utf-8")

    print(f"{GREEN}✓ Custom theme removed (default grayscale restored){NC}")


def update_landing_page(config: Dict[str, Any], paths: Dict[str, Path]) -> None:
    """
    Updates landing page with custom footer content.

    Args:
        config: Configuration dictionary
        paths: Paths dictionary
    """
    print(f"{YELLOW}Updating landing page footer...{NC}")

    landing_file = paths["PROJECT_ROOT"] / "src" / "app" / "landing" / "landing.html"
    content = landing_file.read_text(encoding="utf-8")

    # Replace quote
    content = re.sub(
        r'<p class="text-center reference">\s*".*?"\s*</p>',
        f'<p class="text-center reference">\n      "{config["FOOTER_QUOTE"]}"\n    </p>',
        content,
        flags=re.DOTALL,
    )

    # Replace about
    content = re.sub(
        r'<a href="[^"]*">(\{\{[\s\S]*?\'FOOTER\.ABOUT_US\'[\s\S]*?\}\})</a>',
        f'<a href="{config["FOOTER_ABOUT_URL"]}">\\1</a>',
        content,
        flags=re.DOTALL,
    )

    # Replace legal
    content = re.sub(
        r'<div class="col" routerLink="[^"]*">',
        f'<div class="col" routerLink="{config["FOOTER_LEGAL_URL"]}">',
        content,
        flags=re.DOTALL,
    )

    landing_file.write_text(content, encoding="utf-8")
