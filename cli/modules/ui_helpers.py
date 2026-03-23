#!/usr/bin/env python3
"""
UI Helper Functions
Provides user interaction and display utilities
"""

import os
import sys
from typing import Dict, Any
from pathlib import Path


# Color codes (ANSI) - clig.dev: disable colors if NO_COLOR environment variable exists or stdout is not a tty
def _use_color() -> bool:
    if "NO_COLOR" in os.environ:
        return False
    # If stdout is redirected or piped, don't use colors
    if not sys.stdout.isatty():
        return False
    # Also check if NO_COLOR is explicitly set to empty string
    return True


_has_color = _use_color()

BLUE = "\033[0;34m" if _has_color else ""
GREEN = "\033[0;32m" if _has_color else ""
YELLOW = "\033[1;33m" if _has_color else ""
RED = "\033[0;31m" if _has_color else ""
NC = "\033[0m" if _has_color else ""  # No Color


def prompt_with_default(prompt_text: str, default: str) -> str:
    """
    Prompts for input with a default value.

    Args:
        prompt_text: The prompt message
        default: The default value

    Returns:
        User input or default value
    """
    if not sys.stdin.isatty():
        return default

    try:
        user_input = input(
            f"{GREEN}{prompt_text}{NC} [{YELLOW}{default}{NC}]: "
        ).strip()
        return user_input if user_input else default
    except EOFError:
        return default
    except KeyboardInterrupt:
        print("\nConfiguration aborted.")
        sys.exit(1)


def prompt_yes_no(prompt_text: str, default: str = "n") -> bool:
    """
    Prompts yes/no question.

    Args:
        prompt_text: The prompt message
        default: Default answer ("y" or "n")

    Returns:
        True for yes, False for no
    """
    if not sys.stdin.isatty():
        return default.lower() in ("y", "yes")

    if default == "y":
        prompt_suffix = f"{GREEN}{prompt_text}{NC} [{YELLOW}Y/n{NC}]: "
    else:
        prompt_suffix = f"{GREEN}{prompt_text}{NC} [{YELLOW}y/N{NC}]: "

    try:
        response = input(prompt_suffix).strip().lower() or default.lower()
    except EOFError:
        response = default.lower()
    except KeyboardInterrupt:
        print("\nConfiguration aborted.")
        sys.exit(1)

    return response in ("y", "yes")


def show_section(title: str) -> None:
    """Display a section header."""
    print(f"{BLUE}{title}{NC}")


def show_subsection(title: str) -> None:
    """Display a subsection header."""
    print(f"{YELLOW}{title}:{NC}")


def show_summary(config: Dict[str, Any]) -> None:
    """
    Displays configuration summary.

    Args:
        config: Configuration dictionary
    """
    print(f"{YELLOW}Configuration Summary{NC}")
    print(f"App Name: {GREEN}{config['APP_NAME']}{NC}")
    print(f"Project: {GREEN}{config['APP_TITLE']}{NC} ({config['PROJECT_DOMAIN']})")
    print(f"License: {GREEN}{config['PROJECT_LICENSE']}{NC}")
    print(f"Languages: {GREEN}{config['UI_AVAILABLE_LANGS']}{NC}")

    if config.get("CUSTOMIZE_COLORS"):
        print(f"Theme: {GREEN}Custom colors configured{NC}")

    if config.get("CUSTOM_FAVICON"):
        print(f"Favicon: {GREEN}Custom favicon set{NC}")

    if config.get("CUSTOMIZE_COOKIES"):
        print(f"Cookies: {GREEN}Custom cookie settings configured{NC}")

    if config.get("CUSTOMIZE_ANIMATIONS"):
        print(f"Animations: {GREEN}Custom animation timing configured{NC}")

    if config.get("CUSTOMIZE_MESSAGES"):
        print(f"Messages: {GREEN}Custom user messages configured{NC}")

    if config.get("CONFIGURE_PRODUCTION"):
        print(f"Production: {GREEN}Deployment configured{NC}")


def show_modified_files(config: Dict[str, Any], paths: Dict[str, Path]) -> None:
    """
    Lists all modified files.

    Args:
        config: Configuration dictionary
        paths: Paths dictionary
    """
    print(f"{YELLOW}Files that will be modified:{NC}")
    print(f"  - {GREEN}{paths['ENV_CONFIG_FILE']}{NC}")
    print(f"  - {GREEN}{paths['PROXY_CONFIG_FILE']}{NC}")
    print(f"  - {GREEN}{paths['INDEX_FILE']}{NC}")
    print(f"  - {GREEN}{paths['PACKAGE_FILE']}{NC}")

    if config.get("CUSTOMIZE_COLORS"):
        print(f"  - {GREEN}{paths['STYLES_FILE']}{NC}")
    if config.get("CUSTOM_FAVICON"):
        print(f"  - {GREEN}Favicon file in {paths['SRC_DIR']}{NC}")
    if config.get("CONFIGURE_PRODUCTION"):
        print(f"  - {GREEN}{paths['PRODUCTION_SCRIPT']}{NC}")
    if config.get("CUSTOMIZE_COOKIES"):
        print(f"  - {GREEN}{paths['COOKIE_CONSTANTS_FILE']}{NC}")
        print(f"  - {GREEN}{paths['STORAGE_CONSTANTS_FILE']}{NC}")
    if config.get("CUSTOMIZE_ANIMATIONS"):
        print(f"  - {GREEN}{paths['ANIMATION_CONSTANTS_FILE']}{NC}")
    if config.get("CUSTOMIZE_MESSAGES"):
        print(f"  - {GREEN}{paths['MESSAGES_CONSTANTS_FILE']}{NC}")


def show_next_steps(config: Dict[str, Any]) -> None:
    """
    Shows next steps after configuration.

    Args:
        config: Configuration dictionary
    """
    print(f"{GREEN}✓ Configuration Applied Successfully!{NC}")
    print(f"{YELLOW}Next Steps:{NC}")
    print("  1. Review the generated configuration files")
    print(f"  2. Test locally: {GREEN}booker serve{NC} or {GREEN}npm start{NC}")
    print(
        f"  3. Build for production: {GREEN}booker build{NC} or {GREEN}npm run build{NC}"
    )

    if config.get("CONFIGURE_PRODUCTION"):
        print(f"  4. Deploy to production: {GREEN}python docker/production.py{NC}")
