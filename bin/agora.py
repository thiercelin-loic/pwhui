#!/usr/bin/env python3
"""
AgoraUI CLI Tool
Command-line interface for AgoraUI project management
"""

import sys
import subprocess
import os
from pathlib import Path

# Get the directory where this script is located
SCRIPT_FILE = Path(__file__).resolve()
SCRIPT_DIR = SCRIPT_FILE.parent
PROJECT_ROOT = SCRIPT_DIR.parent
CONF_DIR = PROJECT_ROOT / "conf"

# Version
VERSION = "2.0.0"

# Colors for output (ANSI)
RED = '\033[0;31m'
GREEN = '\033[0;32m'
BLUE = '\033[0;34m'
YELLOW = '\033[1;33m'
NC = '\033[0m'  # No Color
BOLD = '\033[1m'


def show_banner() -> None:
    """Show the AgoraUI banner."""
    print(f"{BLUE}{BOLD}")
    print(r"    _                           _   _ ___ ")
    print(r"   / \   __ _  ___  _ __ __ _  | | | |_ _|")
    print(r"  / _ \ / _` |/ _ \| '__/ _` | | | | || | ")
    print(r" / ___ \ (_| | (_) | | | (_| | | |_| || | ")
    print(r"/_/   \_\__, |\___/|_|  \__,_|  \___/|___|")
    print(r"        |___/                              ")
    print(f"{NC}")
    print(f"Version {VERSION}\n")


def show_help() -> None:
    """Show help message."""
    show_banner()
    print(f"{BOLD}Usage:{NC} agora <command> [options]\n")
    print(f"{BOLD}Commands:{NC}")
    print(f"  {GREEN}init{NC}              Run interactive configuration wizard")
    print(f"  {GREEN}default{NC}           Restore default AgoraUI configuration")
    print(f"  {GREEN}serve{NC}             Start development server")
    print(f"  {GREEN}build{NC}             Build the application for production")
    print(f"  {GREEN}test{NC}              Run unit tests")
    print(f"  {GREEN}lint{NC}              Run linter")
    print(f"  {GREEN}backend:start{NC}     Start backend services (Docker)")
    print(f"  {GREEN}backend:stop{NC}      Stop backend services")
    print(f"  {GREEN}backend:logs{NC}      Show backend service logs")
    print(f"  {GREEN}version{NC}           Show AgoraUI CLI version")
    print(f"  {GREEN}help{NC}              Show this help message\n")
    print(f"{BOLD}Options:{NC}")
    print(f"  {YELLOW}-h, --help{NC}        Show help for command")
    print(f"  {YELLOW}-v, --version{NC}     Show version\n")
    print(f"{BOLD}Examples:{NC}")
    print("  agora init                    # Configure the application")
    print("  agora default                 # Restore default settings")
    print("  agora serve                   # Start dev server")
    print("  agora build                   # Build for production")
    print("  agora backend:start           # Start all backend services\n")


def show_version() -> None:
    """Show version."""
    print(f"AgoraUI CLI v{VERSION}")


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
    
    cmd = ['npm', 'run', script] + list(args)
    result = subprocess.run(cmd, cwd=PROJECT_ROOT, shell=True)
    return result.returncode


def cmd_init() -> int:
    """Run configuration wizard."""
    print(f"{BLUE}Starting AgoraUI configuration wizard...{NC}\n")
    
    os.environ['AGORA_CLI'] = '1'
    setup_script = CONF_DIR / "setup.py"
    
    result = subprocess.run([sys.executable, str(setup_script)], cwd=PROJECT_ROOT)
    return result.returncode


def cmd_default() -> int:
    """Restore default configuration."""
    print(f"{BLUE}Restoring AgoraUI default configuration...{NC}\n")
    
    os.environ['AGORA_CLI'] = '1'
    default_script = CONF_DIR / "default.py"
    
    result = subprocess.run([sys.executable, str(default_script)], cwd=PROJECT_ROOT)
    return result.returncode


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


def cmd_backend_start() -> int:
    """Start backend services."""
    print(f"{BLUE}Starting backend services...{NC}")
    return run_npm_script("backend:start")


def cmd_backend_stop() -> int:
    """Stop backend services."""
    print(f"{BLUE}Stopping backend services...{NC}")
    return run_npm_script("backend:stop")


def cmd_backend_logs(service: str = None) -> int:
    """
    Show backend service logs.
    
    Args:
        service: Optional service name
        
    Returns:
        Exit code
    """
    if service:
        print(f"{BLUE}Showing logs for {service}...{NC}")
        cmd = ['docker', 'compose', 'logs', '-f', service]
    else:
        print(f"{BLUE}Showing logs for all services...{NC}")
        cmd = ['docker', 'compose', 'logs', '-f']
    
    result = subprocess.run(cmd, cwd=PROJECT_ROOT, shell=True)
    return result.returncode


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
    if command in ('init',):
        return cmd_init()
    elif command in ('default', 'reset'):
        return cmd_default()
    elif command in ('serve', 'start', 's'):
        return cmd_serve(*args)
    elif command in ('build', 'b'):
        return cmd_build(*args)
    elif command in ('test', 't'):
        return cmd_test(*args)
    elif command in ('lint', 'l'):
        return cmd_lint(*args)
    elif command in ('backend:start', 'bs'):
        return cmd_backend_start()
    elif command in ('backend:stop', 'bst'):
        return cmd_backend_stop()
    elif command in ('backend:logs', 'bl'):
        service = args[0] if args else None
        return cmd_backend_logs(service)
    elif command in ('version', '-v', '--version'):
        show_version()
        return 0
    elif command in ('help', '-h', '--help'):
        show_help()
        return 0
    else:
        print(f"{RED}Error: Unknown command '{command}'{NC}\n")
        show_help()
        return 1


if __name__ == '__main__':
    sys.exit(main())
