#!/usr/bin/env python3
"""
Configuration Collection Functions
Interactive prompts for gathering user configuration
"""

from pathlib import Path
from .ui_helpers import (
    show_section, show_subsection, prompt_with_default, prompt_yes_no
)


def configure_branding(config: dict) -> None:
    """
    Collects application branding configuration.
    
    Args:
        config: Configuration dictionary to update
    """
    show_section("Application Branding")
    
    # Fixed values - not customizable
    config['APP_NAME'] = "Booker"
    config['APP_DESCRIPTION'] = "Customizable market platform"
    
    # Customizable page title
    config['APP_TITLE'] = prompt_with_default("Application title", "Booker")


def configure_project_context(config: dict) -> None:
    """
    Collects project context configuration.
    
    Args:
        config: Configuration dictionary to update
    """
    show_section("Project Context")
    
    # Fixed value - Booker is the engine
    config['PROJECT_NAME'] = "Booker"
    
    config['PROJECT_DOMAIN'] = prompt_with_default("Project domain", "example.com")
    config['PROJECT_URL'] = prompt_with_default("Project URL", 
                                                 f"https://{config['PROJECT_DOMAIN']}")


def configure_api_service(config: dict, service_name: str, 
                         default_host: str, default_port: str, 
                         default_protocol: str) -> None:
    """
    Collects API configuration for a specific service.
    
    Args:
        config: Configuration dictionary to update
        service_name: Name of the service (e.g., "Auth")
        default_host: Default host value
        default_port: Default port value
        default_protocol: Default protocol value
    """
    service_upper = service_name.upper()
    
    show_subsection(f"{service_name} Service")
    
    config[f'{service_upper}_HOST'] = prompt_with_default("  Host", default_host)
    config[f'{service_upper}_PORT'] = prompt_with_default("  Port", default_port)
    config[f'{service_upper}_PROTOCOL'] = prompt_with_default("  Protocol", default_protocol)


def configure_api(config: dict) -> None:
    """
    Collects API configuration for all services.
    
    Args:
        config: Configuration dictionary to update
    """
    show_section("API Configuration")
    
    configure_api_service(config, "Auth", "localhost", "3001", "http")
    configure_api_service(config, "Booking", "localhost", "3002", "http")
    configure_api_service(config, "Messaging", "localhost", "3003", "http")


def configure_features(config: dict) -> None:
    """
    Collects feature flags configuration.
    
    Args:
        config: Configuration dictionary to update
    """
    show_section("Feature Flags")
    
    config['FEATURE_AUTH'] = "true" if prompt_yes_no("Enable authentication?", "y") else "false"
    config['FEATURE_BOOKING'] = "true" if prompt_yes_no("Enable booking?", "y") else "false"
    config['FEATURE_MESSAGING'] = "true" if prompt_yes_no("Enable messaging?", "y") else "false"
    config['FEATURE_I18N'] = "true" if prompt_yes_no("Enable internationalization?", "y") else "false"
    config['FEATURE_POLICIES'] = "true" if prompt_yes_no("Enable policies?", "y") else "false"


def configure_ui(config: dict) -> None:
    """
    Collects UI configuration.
    
    Args:
        config: Configuration dictionary to update
    """
    show_section("UI Configuration")
    
    config['UI_DEFAULT_LANG'] = prompt_with_default("Default language", "en")
    config['UI_AVAILABLE_LANGS'] = prompt_with_default(
        "Available languages (comma-separated)", 
        "en,fr,es,de,zh,ar,pt,it,ja,ru"
    )
    config['UI_DATE_FORMAT'] = prompt_with_default("Date format", "YYYY-MM-DD")
    config['UI_TIME_FORMAT'] = prompt_with_default("Time format", "HH:mm")


def configure_styling(config: dict) -> None:
    """
    Collects color theme configuration.
    
    Args:
        config: Configuration dictionary to update
    """
    show_section("Styling Theme")
    
    if prompt_yes_no("Customize color theme?", "n"):
        config['THEME_PRIMARY_COLOR'] = prompt_with_default("Primary color", "#4A4A4A")
        config['CUSTOMIZE_COLORS'] = True
    else:
        config['CUSTOMIZE_COLORS'] = False
    
    if prompt_yes_no("Customize background image?", "n"):
        config['THEME_BACKGROUND_IMAGE'] = prompt_with_default("Background image URL", "default.jpg")
        config['CUSTOMIZE_BACKGROUND'] = True
    else:
        config['CUSTOMIZE_BACKGROUND'] = False


def configure_assets(config: dict) -> None:
    """
    Collects branding assets configuration.
    
    Args:
        config: Configuration dictionary to update
    """
    from .ui_helpers import GREEN, RED, NC
    
    show_section("Branding Assets")
    
    if prompt_yes_no("Replace favicon with custom icon?", "n"):
        favicon_path = input(f"{GREEN}Path to custom favicon (.ico file only):{NC} ").strip()
        
        if Path(favicon_path).is_file():
            extension = Path(favicon_path).suffix[1:]  # Remove the dot
            if extension == "ico":
                config['CUSTOM_FAVICON'] = True
                config['FAVICON_PATH'] = favicon_path
            else:
                print(f"{RED}Only .ico files are supported. Skipping favicon replacement.{NC}")
                config['CUSTOM_FAVICON'] = False
        else:
            print(f"{RED}File not found. Skipping favicon replacement.{NC}")
            config['CUSTOM_FAVICON'] = False
    else:
        config['CUSTOM_FAVICON'] = False


def configure_production(config: dict) -> None:
    """
    Collects production deployment configuration.
    
    Args:
        config: Configuration dictionary to update
    """
    show_section("Production Deployment")
    
    if prompt_yes_no("Configure production deployment?", "n"):
        config['PROD_DOMAIN'] = prompt_with_default("Production domain", 
                                                     config['PROJECT_DOMAIN'])
        config['PROD_EMAIL'] = prompt_with_default("Admin email for SSL", 
                                                    f"admin@{config['PROJECT_DOMAIN']}")
        config['PROD_NETWORK_NAME'] = prompt_with_default("Docker network name", "booker")
        
        # Static values (not customizable)
        config['PROD_CONTAINER_NAME'] = "Booker"
        config['PROD_PROJECT_PATH'] = "~/Booker"
        
        config['CONFIGURE_PRODUCTION'] = True
    else:
        config['CONFIGURE_PRODUCTION'] = False


def configure_backends(config: dict) -> None:
    """
    Collects backend services configuration.
    
    Args:
        config: Configuration dictionary to update
    """
    show_section("Backend Services (Nginx/Production)")
    
    if prompt_yes_no("Customize backend container names?", "n"):
        config['BACKEND_AUTH_CONTAINER'] = prompt_with_default("Auth container name", "auth")
        config['BACKEND_BOOKING_CONTAINER'] = prompt_with_default("Booking container name", "booking")
        config['BACKEND_MESSAGING_CONTAINER'] = prompt_with_default("Messaging container name", "tell")
        config['BACKEND_AUTH_PORT'] = prompt_with_default("Auth internal port", "3000")
        config['BACKEND_BOOKING_PORT'] = prompt_with_default("Booking internal port", "3000")
        config['BACKEND_MESSAGING_PORT'] = prompt_with_default("Messaging internal port", "3000")
        config['CUSTOMIZE_BACKENDS'] = True
    else:
        config['CUSTOMIZE_BACKENDS'] = False


def configure_cookies(config: dict) -> None:
    """
    Collects cookie and session configuration.
    
    Args:
        config: Configuration dictionary to update
    """
    show_section("Cookie & Session Settings")
    
    if prompt_yes_no("Customize cookie/session settings?", "n"):
        config['COOKIE_MAX_AGE'] = prompt_with_default("Cookie max age (seconds)", "604800")
        config['SESSION_TIMEOUT'] = prompt_with_default("Session timeout (minutes)", "30")
        config['POLICY_MODAL_DELAY'] = prompt_with_default("Policy modal delay (ms)", "1000")
        config['STORAGE_PREFIX'] = prompt_with_default("Storage key prefix", "booker_")
        config['CUSTOMIZE_COOKIES'] = True
    else:
        config['CUSTOMIZE_COOKIES'] = False


def configure_animations(config: dict) -> None:
    """
    Collects animation configuration.
    
    Args:
        config: Configuration dictionary to update
    """
    show_section("Animation Settings")
    
    if prompt_yes_no("Customize animation timing?", "n"):
        config['TOAST_DURATION'] = prompt_with_default("Toast duration (ms)", "3000")
        config['TYPING_SPEED'] = prompt_with_default("Typing speed (ms)", "50")
        config['DELAY_BETWEEN_TEXTS'] = prompt_with_default("Delay between texts (ms)", "1000")
        config['CUSTOMIZE_ANIMATIONS'] = True
    else:
        config['CUSTOMIZE_ANIMATIONS'] = False


def configure_messages(config: dict) -> None:
    """
    Collects user messages configuration.
    
    Args:
        config: Configuration dictionary to update
    """
    show_section("User Messages")
    
    if prompt_yes_no("Customize user-facing messages?", "n"):
        config['MSG_LOGIN_SUCCESS'] = prompt_with_default("Login success message", 
                                                           "Login successful!")
        config['MSG_MESSAGE_SENT'] = prompt_with_default("Message sent confirmation", 
                                                          "Message sent successfully")
        config['CUSTOMIZE_MESSAGES'] = True
    else:
        config['CUSTOMIZE_MESSAGES'] = False


def configure_maps(config: dict) -> None:
    """
    Collects Google Maps configuration.

    Args:
        config: Configuration dictionary to update
    """
    show_section("Google Maps")

    if prompt_yes_no("Configure Google Maps embed?", "n"):
        config['MAPS_API_KEY'] = prompt_with_default("Google Maps API key", "")
        config['MAPS_LOCATION'] = prompt_with_default(
            "Map location query (URL-encoded)",
            "Space+Needle,Seattle+WA"
        )
        config['CUSTOMIZE_MAPS'] = True
    else:
        config['CUSTOMIZE_MAPS'] = False


def configure_license(config: dict) -> None:
    """
    Collects license configuration.
    
    Args:
        config: Configuration dictionary to update
    """
    show_section("License & Legal")
    
    config['PROJECT_LICENSE'] = prompt_with_default("Project license", "CC BY-NC 4.0")


def configure_default_restoration(config: dict) -> bool:
    """
    Configure default restoration (non-interactive).
    
    Args:
        config: Configuration dictionary to update
        
    Returns:
        True if user confirms restoration, False otherwise
    """
    from .ui_helpers import BLUE, YELLOW, RED, NC, GREEN, prompt_yes_no
    from .defaults import get_default_config
    
    print(f"{BLUE}{'=' * 60}")
    print("╔════════════════════════════════════════════════════════════╗")
    print("║                                                            ║")
    print("║           Restore Booker to Default Configuration        ║")
    print("║                                                            ║")
    print("╚════════════════════════════════════════════════════════════╝")
    print(f"{NC}\n")
    
    print(f"{YELLOW}This will restore the following to defaults:{NC}")
    print("  • Color theme (grayscale: #4A4A4A)")
    print("  • Background image (default.jpg)")
    print("  • Favicon (default Booker icon)")
    print("  • API endpoints (localhost:3001/3002/3003)")
    print("  • All feature flags (enabled)")
    print("  • UI settings (languages, date/time formats)")
    print("  • Cookie & session settings")
    print("  • Animation settings")
    print("  • User messages")
    print("  • Production & backend configuration\n")
    
    if prompt_yes_no("Are you sure you want to restore all defaults?", "n"):
        config.update(get_default_config())
        return True
    else:
        print(f"{RED}Default restoration cancelled.{NC}")
        return False


def configure_footer(config: dict) -> None:
    """
    Collects footer configuration.
    
    Args:
        config: Configuration dictionary to update
    """
    show_section("Footer")
    
    config['FOOTER_QUOTE'] = prompt_with_default(
        "Footer quote", 
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis aperiam incidunt dicta, quibusdam similique accusantium saepe nihil minima quia ab doloremque quis? Cupiditate quaerat reprehenderit officia explicabo pariatur, neque sequi."
    )
    config['FOOTER_ABOUT_URL'] = prompt_with_default("Footer 'About us' URL", "https://www.linkedin.com/in/loic-thiercelin/")
    config['FOOTER_LEGAL_URL'] = prompt_with_default("Footer 'Legal' URL", "/policy")
