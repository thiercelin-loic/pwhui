#!/usr/bin/env python3
"""
UI Helper Functions
Provides user interaction and display utilities
"""

# Color codes (ANSI)
BLUE = '\033[0;34m'
GREEN = '\033[0;32m'
YELLOW = '\033[1;33m'
RED = '\033[0;31m'
NC = '\033[0m'  # No Color


def show_banner() -> None:
    """Display the configuration banner."""
    print(f"{BLUE}╔════════════════════════════════════════════════════════════╗{NC}")
    print(f"{BLUE}║           Booker Configuration Assistant                 ║{NC}")
    print(f"{BLUE}║  Customize all project settings for your deployment       ║{NC}")
    print(f"{BLUE}╚════════════════════════════════════════════════════════════╝{NC}")
    print("")


def prompt_with_default(prompt_text: str, default: str) -> str:
    """
    Prompts for input with a default value.
    
    Args:
        prompt_text: The prompt message
        default: The default value
        
    Returns:
        User input or default value
    """
    user_input = input(f"{GREEN}{prompt_text}{NC} [{YELLOW}{default}{NC}]: ").strip()
    return user_input if user_input else default


def prompt_yes_no(prompt_text: str, default: str = "n") -> bool:
    """
    Prompts yes/no question.
    
    Args:
        prompt_text: The prompt message
        default: Default answer ("y" or "n")
        
    Returns:
        True for yes, False for no
    """
    if default == "y":
        response = input(f"{GREEN}{prompt_text}{NC} [{YELLOW}Y/n{NC}]: ").strip().lower() or "y"
    else:
        response = input(f"{GREEN}{prompt_text}{NC} [{YELLOW}y/N{NC}]: ").strip().lower() or "n"
    
    return response in ('y', 'yes')


def show_section(title: str) -> None:
    """Display a section header."""
    print()
    print(f"{BLUE}=== {title} ==={NC}")


def show_subsection(title: str) -> None:
    """Display a subsection header."""
    print(f"{YELLOW}{title}:{NC}")


def show_summary(config: dict) -> None:
    """
    Displays configuration summary.
    
    Args:
        config: Configuration dictionary
    """
    print()
    print(f"{YELLOW}{'=' * 60}{NC}")
    print(f"{YELLOW}Configuration Summary:{NC}")
    print(f"{YELLOW}{'=' * 60}{NC}")
    print(f"App Name: {GREEN}{config['APP_NAME']}{NC}")
    print(f"Project: {GREEN}{config['APP_TITLE']}{NC} ({config['PROJECT_DOMAIN']})")
    print(f"License: {GREEN}{config['PROJECT_LICENSE']}{NC}")
    print(f"APIs: Auth({config['AUTH_HOST']}:{config['AUTH_PORT']}), "
          f"Booking({config['BOOKING_HOST']}:{config['BOOKING_PORT']}), "
          f"Messaging({config['MESSAGING_HOST']}:{config['MESSAGING_PORT']})")
    print(f"Languages: {GREEN}{config['UI_AVAILABLE_LANGS']}{NC}")
    
    if config.get('CUSTOMIZE_COLORS'):
        print(f"Theme: {GREEN}Custom colors configured{NC}")
    
    if config.get('CUSTOM_FAVICON'):
        print(f"Favicon: {GREEN}Custom favicon set{NC}")
    
    if config.get('CUSTOMIZE_BACKENDS'):
        print(f"Backends: {GREEN}Custom container names configured{NC}")
    
    if config.get('CUSTOMIZE_COOKIES'):
        print(f"Cookies: {GREEN}Custom cookie settings configured{NC}")
    
    if config.get('CUSTOMIZE_ANIMATIONS'):
        print(f"Animations: {GREEN}Custom animation timing configured{NC}")
    
    if config.get('CUSTOMIZE_MESSAGES'):
        print(f"Messages: {GREEN}Custom user messages configured{NC}")
    
    if config.get('CONFIGURE_PRODUCTION'):
        print(f"Production: {GREEN}Deployment configured{NC}")
    
    print()


def show_modified_files(config: dict, paths: dict) -> None:
    """
    Lists all modified files.
    
    Args:
        config: Configuration dictionary
        paths: Paths dictionary
    """
    print()
    print(f"{YELLOW}Files that will be modified:{NC}")
    print(f"  - {GREEN}{paths['ENV_CONFIG_FILE']}{NC}")
    print(f"  - {GREEN}{paths['PROXY_CONFIG_FILE']}{NC}")
    print(f"  - {GREEN}{paths['INDEX_FILE']}{NC}")
    print(f"  - {GREEN}{paths['PACKAGE_FILE']}{NC}")
    
    if config.get('CUSTOMIZE_COLORS'):
        print(f"  - {GREEN}{paths['STYLES_FILE']}{NC}")
    if config.get('CUSTOM_FAVICON'):
        print(f"  - {GREEN}Favicon file in {paths['SRC_DIR']}{NC}")
    if config.get('CUSTOMIZE_BACKENDS'):
        print(f"  - {GREEN}{paths['NGINX_CONFIG_FILE']}{NC}")
    if config.get('CONFIGURE_PRODUCTION'):
        print(f"  - {GREEN}{paths['PRODUCTION_SCRIPT']}{NC}")
    if config.get('CUSTOMIZE_COOKIES'):
        print(f"  - {GREEN}{paths['COOKIE_CONSTANTS_FILE']}{NC}")
        print(f"  - {GREEN}{paths['STORAGE_CONSTANTS_FILE']}{NC}")
    if config.get('CUSTOMIZE_ANIMATIONS'):
        print(f"  - {GREEN}{paths['ANIMATION_CONSTANTS_FILE']}{NC}")
    if config.get('CUSTOMIZE_MESSAGES'):
        print(f"  - {GREEN}{paths['MESSAGES_CONSTANTS_FILE']}{NC}")
    
    print()


def show_next_steps(config: dict) -> None:
    """
    Shows next steps after configuration.
    
    Args:
        config: Configuration dictionary
    """
    print()
    print(f"{GREEN}╔════════════════════════════════════════════════════════════╗{NC}")
    print(f"{GREEN}║           Configuration Applied Successfully!             ║{NC}")
    print(f"{GREEN}╚════════════════════════════════════════════════════════════╝{NC}")
    print()
    print(f"{YELLOW}Next Steps:{NC}")
    print(f"  1. Review the generated configuration files")
    print(f"  2. Test locally: {GREEN}booker serve{NC} or {GREEN}npm start{NC}")
    print(f"  3. Build for production: {GREEN}booker build{NC} or {GREEN}npm run build{NC}")
    
    if config.get('CONFIGURE_PRODUCTION'):
        print(f"  4. Deploy to production: {GREEN}python docker/production.py{NC}")
    
    print()
