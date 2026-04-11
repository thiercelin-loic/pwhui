#!/usr/bin/env python3
"""
Booker CLI Tool
Command-line interface for Booker project management
"""

import sys
import subprocess
import os
from pathlib import Path

# Get the directory where this script is located
SCRIPT_FILE = Path(__file__).resolve()
SCRIPT_DIR = SCRIPT_FILE.parent
PROJECT_ROOT = SCRIPT_DIR.parent
CLI_DIR = PROJECT_ROOT / "cli"

# Version
VERSION = "2.2.1"

# Colors for output (ANSI)
RED = "\033[0;31m"
GREEN = "\033[0;32m"
BLUE = "\033[0;34m"
YELLOW = "\033[1;33m"
NC = "\033[0m"  # No Color
BOLD = "\033[1m"


def show_help() -> None:
    """Show help message."""
    print(f"{BOLD}Booker Command Line Interface Help{NC}")
    print(f"{BOLD}Usage:{NC} booker <command> [options]\n")
    print(f"{BOLD}Commands:{NC}")
    print(f"  {GREEN}init{NC}              Run interactive configuration wizard")
    print(f"  {GREEN}default{NC}           Restore default Booker configuration")
    print(f"  {GREEN}serve{NC}             Start development server")
    print(f"  {GREEN}build{NC}             Build the application for production")
    print(f"  {GREEN}test{NC}              Run unit tests")
    print(f"  {GREEN}lint{NC}              Run linter")
    print(f"  {GREEN}compose{NC}           Delegate deployment to booker-services (up)")
    print(f"  {GREEN}deps{NC}              Manage backend docker dependencies")
    print(f"  {GREEN}version{NC}           Show Booker CLI version")
    print(f"  {GREEN}help{NC}              Show this help message\n")
    print(f"{BOLD}Options:{NC}")
    print(f"  {YELLOW}-h, --help{NC}        Show help for command")
    print(f"  {YELLOW}-v, --version{NC}     Show version\n")
    print(f"{BOLD}Examples:{NC}")
    print("  booker init                    # Configure the application")
    print("  booker default                 # Restore default settings")
    print("  booker serve                   # Start dev server")
    print("  booker build                   # Build for production")
    print("  booker deps                    # Manage backend docker dependencies")
    print("  booker compose up              # Deploy stack through booker-services\n")


def show_version() -> None:
    """Show version."""
    print(f"Booker CLI v{VERSION}")


def run_npm_script(script: str, *args) -> int:
    """
    Execute npm script.

    Args:
        script: Script name
        *args: Additional arguments

    Returns:
        Exit code
    """
    # Verify PROJECT_ROOT exists
    if not PROJECT_ROOT.is_dir():
        print(f"{RED}Error: Project root not found: {PROJECT_ROOT}{NC}")
        return 1

    # Verify package.json exists
    if not (PROJECT_ROOT / "package.json").exists():
        print(f"{RED}Error: package.json not found in: {PROJECT_ROOT}{NC}")
        return 1

    # Run npm
    print(f"{BLUE}Running:{NC} npm run {script} {' '.join(args)}")

    cmd = ["npm", "run", script] + list(args)
    try:
        result = subprocess.run(cmd, cwd=PROJECT_ROOT, shell=True)
        return result.returncode
    except KeyboardInterrupt:
        print("\nProcess interrupted by user.")
        return 1


def cmd_init() -> int:
    """Run configuration wizard."""
    print(f"{BLUE}Starting Booker configuration wizard...{NC}\n")

    os.environ["BOOKER_CLI"] = "1"
    setup_script = CLI_DIR / "setup.py"

    try:
        result = subprocess.run([sys.executable, str(setup_script)], cwd=PROJECT_ROOT)
        return result.returncode
    except KeyboardInterrupt:
        print("\nProcess interrupted by user.")
        return 1


def cmd_default() -> int:
    """Restore default configuration."""
    print(f"{BLUE}Restoring Booker default configuration...{NC}\n")

    os.environ["BOOKER_CLI"] = "1"
    default_script = CLI_DIR / "default.py"

    try:
        result = subprocess.run([sys.executable, str(default_script)], cwd=PROJECT_ROOT)
        return result.returncode
    except KeyboardInterrupt:
        print("\nProcess interrupted by user.")
        return 1


def cmd_serve(*args) -> int:
    """Start development server."""
    return run_npm_script("start", *args)


def cmd_build(*args) -> int:
    """Build for production."""
    return run_npm_script("build", *args)


def cmd_test(*args) -> int:
    """Run tests."""
    return run_npm_script("test", *args)


def cmd_lint(*args) -> int:
    """Run linter."""
    return run_npm_script("lint", *args)


def cmd_deps(*args) -> int:
    """Run backend docker dependencies script."""
    script_path = PROJECT_ROOT / "docker" / "dependencies.py"

    print(f"{BLUE}Starting dependencies script...{NC}\n")
    try:
        result = subprocess.run([sys.executable, str(script_path)] + list(args), cwd=PROJECT_ROOT)
        return result.returncode
    except KeyboardInterrupt:
        print("\nProcess interrupted by user.")
        return 1


def cmd_compose(*args) -> int:
    """Delegate deployment to booker-services."""
    if not args:
        print(f"{RED}Error: Missing compose command. Available: up{NC}")
        return 1

    sub_cmd = args[0]
    if sub_cmd != "up":
        print(f"{RED}Error: Unknown compose command '{sub_cmd}'. Available: up{NC}")
        return 1

    services_root = PROJECT_ROOT.parent / "booker-services"
    deploy_script = services_root / "scripts" / "deploy.py"

    if not deploy_script.exists():
        print(f"{RED}Error: booker-services deploy script not found at: {deploy_script}{NC}")
        print("Expected sibling layout:")
        print("  <parent>/booker-client")
        print("  <parent>/booker-services")
        print(
            "Get booker-services here: "
            "https://github.com/thiercelin-loic/booker-services"
        )
        return 1

    delegate_args = list(args[1:])
    if not delegate_args:
        delegate_args = ["--detached"]

    print(f"{BLUE}Delegating deployment to booker-services...{NC}\n")
    try:
        result = subprocess.run(
            [sys.executable, str(deploy_script), "up"] + delegate_args,
            cwd=services_root,
        )
        return result.returncode
    except KeyboardInterrupt:
        print("\nProcess interrupted by user.")
        return 1


def main() -> int:
    """
    Main command router.

    Returns:
        Exit code
    """
    # Handle no arguments
    if len(sys.argv) < 2:
        show_help()
        return 0

    # Parse command
    command = sys.argv[1]
    args = sys.argv[2:]

    # Route commands
    if command in ("init",):
        return cmd_init()
    elif command in ("default", "reset"):
        return cmd_default()
    elif command in ("serve", "start", "s"):
        return cmd_serve(*args)
    elif command in ("build", "b"):
        return cmd_build(*args)
    elif command in ("test", "t"):
        return cmd_test(*args)
    elif command in ("lint", "l"):
        return cmd_lint(*args)
    elif command in ("deps", "d"):
        return cmd_deps(*args)
    elif command in ("compose", "c"):
        return cmd_compose(*args)
    elif command in ("version", "-v", "--version"):
        show_version()
        return 0
    elif command in ("help", "-h", "--help"):
        show_help()
        return 0
    else:
        print(f"{RED}Error: Unknown command '{command}'{NC}\n")
        show_help()
        return 1


if __name__ == "__main__":
    sys.exit(main())
