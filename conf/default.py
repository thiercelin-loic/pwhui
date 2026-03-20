#!/usr/bin/env python3
"""
Booker Default Configuration Restoration Script
Restores all settings to default Booker configuration
"""

import sys
import os
from pathlib import Path

# Get the directory where this script is located
SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent

# Add modules to path
sys.path.insert(0, str(SCRIPT_DIR / 'modules'))

from modules.ui_helpers import (
    show_banner, GREEN, NC
)
from modules.config_prompts import configure_default_restoration
from modules.file_updaters import (
    apply_configuration, restore_default_assets, remove_custom_theme
)
from modules.defaults import get_default_config


def get_paths() -> dict:
    """
    Get all file paths used in configuration.
    
    Returns:
        Dictionary of file paths
    """
    src_dir = PROJECT_ROOT / "src"
    constants_dir = src_dir / "app" / "shared" / "constants"
    
    return {
        'PROJECT_ROOT': PROJECT_ROOT,
        'SRC_DIR': src_dir,
        'ENV_CONFIG_FILE': src_dir / "environments" / "app.config.ts",
        'PROXY_CONFIG_FILE': PROJECT_ROOT / "proxy.conf.json",
        'STYLES_FILE': src_dir / "styles.css",
        'INDEX_FILE': src_dir / "index.html",
        'PACKAGE_FILE': PROJECT_ROOT / "package.json",
        'NGINX_CONFIG_FILE': PROJECT_ROOT / "nginx.conf",
        'ICONS_DIR': src_dir / "icons",
        'PUBLIC_DIR': PROJECT_ROOT / "public",
        'CONSTANTS_DIR': constants_dir,
        'COOKIE_CONSTANTS_FILE': constants_dir / "cookie.constants.ts",
        'STORAGE_CONSTANTS_FILE': constants_dir / "storage.constants.ts",
        'ANIMATION_CONSTANTS_FILE': constants_dir / "animation.constants.ts",
        'MESSAGES_CONSTANTS_FILE': constants_dir / "messages.constants.ts",
        'DOCKER_DIR': PROJECT_ROOT / "docker",
        'PRODUCTION_SCRIPT': PROJECT_ROOT / "docker" / "production.py",
        'ENTRYPOINT_SCRIPT': PROJECT_ROOT / "docker" / "entrypoint.sh",
        'MAPS_CONSTANTS_FILE': constants_dir / "maps.constants.ts",
    }


def main() -> int:
    """
    Main execution function.
    
    Returns:
        Exit code (0 for success, 1 for failure)
    """
    from modules.ui_helpers import RED, NC
    
    # Verify we're in the correct directory
    if not (PROJECT_ROOT / "package.json").exists():
        print(f"{RED}Error: package.json not found. Are you in the correct directory?{NC}")
        return 1
    
    if not (SCRIPT_DIR / "modules").is_dir():
        print(f"{RED}Error: conf/modules directory not found{NC}")
        return 1
    
    # Change to project root
    os.chdir(PROJECT_ROOT)
    
    # Get paths
    paths = get_paths()
    
    # Initialize configuration with defaults
    config = get_default_config()
    
    # Show banner
    show_banner()
    
    # Show invocation method
    if os.environ.get('BOOKER_CLI') == '1':
        print("\033[0;36m✨ Running via Booker CLI (booker default)\033[0m\n")
    
    # Show restoration dialog and get confirmation
    if not configure_default_restoration(config):
        return 0
    
    print()
    
    # Restore default assets
    restore_default_assets(paths)
    
    # Remove custom theme
    remove_custom_theme(paths)
    
    # Apply all configuration changes
    apply_configuration(config, paths)
    
    # Show completion message
    print(f"\n{GREEN}{'=' * 60}{NC}")
    print(f"{GREEN}╔════════════════════════════════════════════════════════════╗{NC}")
    print(f"{GREEN}║                                                            ║{NC}")
    print(f"{GREEN}║     ✓ Default Configuration Successfully Restored!        ║{NC}")
    print(f"{GREEN}║                                                            ║{NC}")
    print(f"{GREEN}╚════════════════════════════════════════════════════════════╝{NC}\n")
    
    from modules.ui_helpers import BLUE, YELLOW
    
    print(f"{BLUE}Next Steps:{NC}")
    print(f"  {GREEN}1.{NC} Restart development server if running: {YELLOW}booker serve{NC}")
    print(f"  {GREEN}2.{NC} Backend services will use default ports (3001/3002/3003)")
    print(f"  {GREEN}3.{NC} All features are enabled by default\n")
    
    return 0


if __name__ == '__main__':
    sys.exit(main())
