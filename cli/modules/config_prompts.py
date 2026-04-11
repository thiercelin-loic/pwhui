#!/usr/bin/env python3
"""
Configuration Collection Functions
Interactive prompts for gathering user configuration
"""

from pathlib import Path
from typing import Dict, Any
from .ui_helpers import (
    show_section,
    prompt_with_default,
    prompt_yes_no,
)


def configure_branding(config: Dict[str, Any]) -> None:
    """
    Collects application branding configuration.

    Args:
        config: Configuration dictionary to update
    """
    show_section("Application Branding")

    # Fixed values - not customizable
    config["APP_NAME"] = "Booker"
    config["APP_DESCRIPTION"] = "Customizable market platform"

    # Customizable page title
    config["APP_TITLE"] = prompt_with_default("Application title", "Booker")


def configure_project_context(config: Dict[str, Any]) -> None:
    """
    Collects project context configuration.

    Args:
        config: Configuration dictionary to update
    """
    show_section("Project Context")

    # Fixed value - Booker is the engine
    config["PROJECT_NAME"] = "Booker"

    config["PROJECT_DOMAIN"] = prompt_with_default("Project domain", "example.com")
    config["PROJECT_URL"] = prompt_with_default(
        "Project URL", f"https://{config['PROJECT_DOMAIN']}"
    )


def configure_features(config: Dict[str, Any]) -> None:
    """
    Collects feature flags configuration.

    Args:
        config: Configuration dictionary to update
    """
    show_section("Feature Flags")

    features = [
        ("FEATURE_CORE", "core services (authentication, booking, messaging)"),
        ("FEATURE_I18N", "internationalization"),
        ("FEATURE_POLICIES", "policies"),
    ]

    for key, name in features:
        config[key] = "true" if prompt_yes_no(f"Enable {name}?", "y") else "false"


def configure_ui(config: Dict[str, Any]) -> None:
    """
    Collects UI configuration.

    Args:
        config: Configuration dictionary to update
    """
    show_section("UI Configuration")

    config["UI_DEFAULT_LANG"] = prompt_with_default("Default language", "en")
    config["UI_AVAILABLE_LANGS"] = prompt_with_default(
        "Available languages (comma-separated)", "en,fr,es,de,zh,ar,pt,it,ja,ru"
    )
    config["UI_DATE_FORMAT"] = prompt_with_default("Date format", "YYYY-MM-DD")
    config["UI_TIME_FORMAT"] = prompt_with_default("Time format", "HH:mm")


def configure_styling(config: Dict[str, Any]) -> None:
    """
    Collects color theme configuration.

    Args:
        config: Configuration dictionary to update
    """
    show_section("Styling Theme")

    if prompt_yes_no("Customize color theme?", "n"):
        config["THEME_PRIMARY_COLOR"] = prompt_with_default("Primary color", "#4A4A4A")
        config["CUSTOMIZE_COLORS"] = True
    else:
        config["CUSTOMIZE_COLORS"] = False

    if prompt_yes_no("Customize background image?", "n"):
        config["THEME_BACKGROUND_IMAGE"] = prompt_with_default(
            "Background image URL", "default.jpg"
        )
        config["CUSTOMIZE_BACKGROUND"] = True
    else:
        config["CUSTOMIZE_BACKGROUND"] = False


def configure_assets(config: Dict[str, Any]) -> None:
    """
    Collects branding assets configuration.

    Args:
        config: Configuration dictionary to update
    """
    from .ui_helpers import GREEN, RED, NC

    show_section("Branding Assets")

    config["CUSTOM_FAVICON"] = False

    if not prompt_yes_no("Replace favicon with custom icon?", "n"):
        return

    try:
        favicon_path = input(
            f"{GREEN}Path to custom favicon (.ico file only):{NC} "
        ).strip()
    except (EOFError, KeyboardInterrupt):
        print("\nConfiguration aborted.")
        import sys

        sys.exit(1)

    if not Path(favicon_path).is_file():
        import sys

        print(
            f"{RED}File not found. Skipping favicon replacement.{NC}",
            file=sys.stderr,
        )
        return

    if Path(favicon_path).suffix.lower() != ".ico":
        import sys

        print(
            f"{RED}Only .ico files are supported. Skipping favicon replacement.{NC}",
            file=sys.stderr,
        )
        return

    config["CUSTOM_FAVICON"] = True
    config["FAVICON_PATH"] = favicon_path


def configure_production(config: Dict[str, Any]) -> None:
    """
    Collects production deployment configuration.

    Args:
        config: Configuration dictionary to update
    """
    show_section("Production Deployment")

    if prompt_yes_no("Configure production deployment?", "n"):
        config["PROD_DOMAIN"] = prompt_with_default(
            "Production domain", config["PROJECT_DOMAIN"]
        )
        config["PROD_EMAIL"] = prompt_with_default(
            "Admin email for SSL", f"admin@{config['PROJECT_DOMAIN']}"
        )

        # Static values (not customizable)
        config["PROD_NETWORK_NAME"] = "booker"
        config["PROD_CONTAINER_NAME"] = "Booker"
        config["PROD_PROJECT_PATH"] = "~/Booker"

        config["CONFIGURE_PRODUCTION"] = True
    else:
        config["CONFIGURE_PRODUCTION"] = False


def configure_cookies(config: Dict[str, Any]) -> None:
    """
    Collects cookie and session configuration.

    Args:
        config: Configuration dictionary to update
    """
    show_section("Cookie & Session Settings")

    if prompt_yes_no("Customize cookie/session settings?", "n"):
        config["COOKIE_MAX_AGE"] = prompt_with_default(
            "Cookie max age (seconds)", "604800"
        )
        config["SESSION_TIMEOUT"] = prompt_with_default(
            "Session timeout (minutes)", "30"
        )
        config["POLICY_MODAL_DELAY"] = prompt_with_default(
            "Policy modal delay (ms)", "1000"
        )
        config["STORAGE_PREFIX"] = prompt_with_default("Storage key prefix", "booker_")
        config["CUSTOMIZE_COOKIES"] = True
    else:
        config["CUSTOMIZE_COOKIES"] = False


def configure_animations(config: Dict[str, Any]) -> None:
    """
    Collects animation configuration.

    Args:
        config: Configuration dictionary to update
    """
    show_section("Animation Settings")

    if prompt_yes_no("Customize animation timing?", "n"):
        config["TOAST_DURATION"] = prompt_with_default("Toast duration (ms)", "3000")
        config["TYPING_SPEED"] = prompt_with_default("Typing speed (ms)", "50")
        config["DELAY_BETWEEN_TEXTS"] = prompt_with_default(
            "Delay between texts (ms)", "1000"
        )
        config["CUSTOMIZE_ANIMATIONS"] = True
    else:
        config["CUSTOMIZE_ANIMATIONS"] = False


def configure_messages(config: Dict[str, Any]) -> None:
    """
    Collects user messages configuration.

    Args:
        config: Configuration dictionary to update
    """
    show_section("User Messages")

    if prompt_yes_no("Customize user-facing messages?", "n"):
        config["MSG_LOGIN_SUCCESS"] = prompt_with_default(
            "Login success message", "Login successful!"
        )
        config["MSG_MESSAGE_SENT"] = prompt_with_default(
            "Message sent confirmation", "Message sent successfully"
        )
        config["CUSTOMIZE_MESSAGES"] = True
    else:
        config["CUSTOMIZE_MESSAGES"] = False


def configure_maps(config: Dict[str, Any]) -> None:
    """
    Collects Google Maps configuration.

    Args:
        config: Configuration dictionary to update
    """
    show_section("Google Maps")

    if prompt_yes_no("Configure Google Maps embed?", "n"):
        config["MAPS_API_KEY"] = prompt_with_default("Google Maps API key", "")
        config["MAPS_LOCATION"] = prompt_with_default(
            "Map location query (URL-encoded)", "Space+Needle,Seattle+WA"
        )
        config["CUSTOMIZE_MAPS"] = True
    else:
        config["CUSTOMIZE_MAPS"] = False


def configure_license(config: Dict[str, Any]) -> None:
    """
    Collects license configuration.

    Args:
        config: Configuration dictionary to update
    """
    show_section("License & Legal")

    config["PROJECT_LICENSE"] = prompt_with_default("Project license", "CC BY-NC 4.0")


def configure_default_restoration(config: Dict[str, Any]) -> bool:
    """
    Configure default restoration (non-interactive).

    Args:
        config: Configuration dictionary to update

    Returns:
        True if user confirms restoration, False otherwise
    """
    from .ui_helpers import BLUE, YELLOW, RED, NC, prompt_yes_no
    from .defaults import get_default_config

    print(f"{BLUE}Restore Booker to Default Configuration{NC}")

    print(f"{YELLOW}This will restore the following to defaults:{NC}")
    print("  • Color theme (grayscale: #4A4A4A)")
    print("  • Background image (default.jpg)")
    print("  • Favicon (default Booker icon)")
    print("  • All feature flags (enabled)")
    print("  • UI settings (languages, date/time formats)")
    print("  • Cookie & session settings")
    print("  • Animation settings")
    print("  • User messages")
    print("  • Production configuration")

    if prompt_yes_no("Are you sure you want to restore all defaults?", "n"):
        config.update(get_default_config())
        return True
    else:
        import sys

        print(f"{RED}Default restoration cancelled.{NC}", file=sys.stderr)
        return False


def configure_footer(config: Dict[str, Any]) -> None:
    """
    Collects footer configuration.

    Args:
        config: Configuration dictionary to update
    """
    show_section("Footer")

    config["FOOTER_QUOTE"] = prompt_with_default(
        "Footer quote",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis aperiam incidunt dicta, quibusdam similique accusantium saepe nihil minima quia ab doloremque quis? Cupiditate quaerat reprehenderit officia explicabo pariatur, neque sequi.",
    )
    config["FOOTER_ABOUT_URL"] = prompt_with_default(
        "Footer 'About us' URL", "https://www.linkedin.com/in/loic-thiercelin/"
    )
    config["FOOTER_LEGAL_URL"] = prompt_with_default("Footer 'Legal' URL", "/policy")
