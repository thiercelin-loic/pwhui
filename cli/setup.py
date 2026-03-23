#!/usr/bin/env python3
"""
Booker Configuration Script
Interactive setup wizard for customizing all application settings
"""

import sys
import os
from pathlib import Path
from typing import Dict

# Get the directory where this script is located
SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent

# Add modules to path
sys.path.insert(0, str(SCRIPT_DIR / "modules"))

from modules.ui_helpers import (
    show_summary,
    show_modified_files,
    show_next_steps,
    prompt_yes_no,
    RED,
    NC,
)
from modules.config_prompts import (
    configure_branding,
    configure_project_context,
    configure_features,
    configure_ui,
    configure_styling,
    configure_assets,
    configure_production,
    configure_cookies,
    configure_animations,
    configure_messages,
    configure_maps,
    configure_license,
    configure_footer,
)
from modules.file_updaters import apply_configuration
from modules.defaults import get_default_config


def get_paths() -> Dict[str, Path]:
    """
    Get all file paths used in configuration.

    Returns:
        Dictionary of file paths
    """
    src_dir = PROJECT_ROOT / "src"
    constants_dir = src_dir / "app" / "shared" / "constants"

    return {
        "PROJECT_ROOT": PROJECT_ROOT,
        "SRC_DIR": src_dir,
        "ENV_CONFIG_FILE": src_dir / "environments" / "app.config.ts",
        "PROXY_CONFIG_FILE": PROJECT_ROOT / "proxy.conf.json",
        "STYLES_FILE": src_dir / "styles.css",
        "INDEX_FILE": src_dir / "index.html",
        "PACKAGE_FILE": PROJECT_ROOT / "package.json",
        "NGINX_CONFIG_FILE": PROJECT_ROOT / "nginx.conf",
        "ICONS_DIR": src_dir / "icons",
        "PUBLIC_DIR": PROJECT_ROOT / "public",
        "CONSTANTS_DIR": constants_dir,
        "COOKIE_CONSTANTS_FILE": constants_dir / "cookie.constants.ts",
        "STORAGE_CONSTANTS_FILE": constants_dir / "storage.constants.ts",
        "ANIMATION_CONSTANTS_FILE": constants_dir / "animation.constants.ts",
        "MESSAGES_CONSTANTS_FILE": constants_dir / "messages.constants.ts",
        "DOCKER_DIR": PROJECT_ROOT / "docker",
        "PRODUCTION_SCRIPT": PROJECT_ROOT / "docker" / "production.py",
        "ENTRYPOINT_SCRIPT": PROJECT_ROOT / "docker" / "entrypoint.sh",
        "MAPS_CONSTANTS_FILE": constants_dir / "maps.constants.ts",
    }


def main() -> int:
    """
    Main execution function.

    Returns:
        Exit code (0 for success, 1 for failure)
    """
    import argparse

    parser = argparse.ArgumentParser(
        description="Booker Configuration Script\nInteractive setup wizard for customizing all application settings",
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.parse_args()

    # Verify we're in the correct directory
    if not (PROJECT_ROOT / "package.json").exists():
        print(
            f"{RED}Error: package.json not found. Are you in the correct directory?{NC}",
            file=sys.stderr,
        )
        return 1

    if not (SCRIPT_DIR / "modules").is_dir():
        print(f"{RED}Error: cli/modules directory not found{NC}", file=sys.stderr)
        return 1

    # Change to project root
    os.chdir(PROJECT_ROOT)

    # Get paths
    paths = get_paths()

    # Initialize configuration with defaults
    config = get_default_config()

    # Collect all configuration through prompts
    configure_branding(config)
    configure_project_context(config)
    configure_features(config)
    configure_ui(config)
    configure_styling(config)
    configure_assets(config)
    configure_production(config)
    configure_cookies(config)
    configure_animations(config)
    configure_messages(config)
    configure_maps(config)
    configure_license(config)
    configure_footer(config)

    # Show summary and confirm
    show_summary(config)
    show_modified_files(config, paths)

    if not prompt_yes_no("Apply these changes?", "y"):
        print(f"{RED}Configuration cancelled.{NC}", file=sys.stderr)
        return 130

    # Apply all configuration changes
    apply_configuration(config, paths)

    # Show next steps
    show_next_steps(config)

    return 0


if __name__ == "__main__":
    sys.exit(main())
