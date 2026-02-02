#!/usr/bin/env python3
"""
Backend Dependencies Manager
Manages Docker-based backend services (auth, booking, tell)
"""

import os
import sys
import subprocess
from pathlib import Path
from typing import List, Dict, Tuple

# Constants
BACKEND_SERVICES = ["auth", "booking", "tell"]
ENV_REQUIRED_SERVICES = ["auth", "booking"]
GITHUB_USERNAME = "thiercelin-loic"
BASE_DIR = Path.home()

# Default environment values
DEFAULT_MYSQL_HOST = "database"
DEFAULT_MYSQL_PORT = "3306"
DEFAULT_MYSQL_USERNAME = "root"
DEFAULT_MYSQL_PASSWORD = "password"
DEFAULT_NODE_ENV = "production"
DEFAULT_PORT = "3000"


def prompt_yes_no(question: str) -> bool:
    """
    Prompts user with yes/no question.
    
    Args:
        question: The question text
        
    Returns:
        True if yes, False if no
    """
    while True:
        reply = input(f"{question} [y/N] ").strip().lower()
        if reply in ('y', 'yes'):
            return True
        elif reply in ('n', 'no', ''):
            return False
        print("Please answer 'y' or 'n'")


def is_docker_installed() -> bool:
    """
    Checks if Docker is installed.
    
    Returns:
        True if installed, False otherwise
    """
    try:
        subprocess.run(['docker', '--version'], 
                      capture_output=True, check=True)
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        return False


def install_docker() -> bool:
    """
    Installs Docker on the system.
    
    Returns:
        True on success, False on failure
    """
    print("Installing Docker...")
    print("Please visit https://docs.docker.com/get-docker/ to install Docker for your platform.")
    print("For Windows: Install Docker Desktop from https://www.docker.com/products/docker-desktop")
    print("For macOS: Install Docker Desktop from https://www.docker.com/products/docker-desktop")
    print("For Linux: Run 'curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh'")
    return False


def check_missing_dependencies() -> List[str]:
    """
    Checks for missing backend service directories.
    
    Returns:
        List of missing service names
    """
    missing_deps = []
    
    for service in BACKEND_SERVICES:
        if not (BASE_DIR / service).is_dir():
            missing_deps.append(service)
    
    return missing_deps


def clone_repositories(services: List[str]) -> bool:
    """
    Clones missing repositories from GitHub.
    
    Args:
        services: List of service names to clone
        
    Returns:
        True on success, False if any clone failed
    """
    failed_clones = []
    
    for service in services:
        print(f"Cloning {service}...")
        
        try:
            subprocess.run([
                'git', 'clone',
                f'https://github.com/{GITHUB_USERNAME}/{service}.git',
                str(BASE_DIR / service)
            ], check=True)
        except subprocess.CalledProcessError:
            print(f"Warning: Failed to clone {service}")
            failed_clones.append(service)
    
    if failed_clones:
        print(f"Warning: Some repositories failed to clone: {', '.join(failed_clones)}")
        return False
    
    print("Dependencies cloned successfully.")
    return True


def prompt_custom_env_values() -> Dict[str, str]:
    """
    Prompts for custom environment values.
    
    Returns:
        Dictionary of environment variables
    """
    mysql_host = input(f"MYSQL_HOST [{DEFAULT_MYSQL_HOST}]: ").strip() or DEFAULT_MYSQL_HOST
    mysql_port = input(f"MYSQL_PORT [{DEFAULT_MYSQL_PORT}]: ").strip() or DEFAULT_MYSQL_PORT
    mysql_username = input(f"MYSQL_USERNAME [{DEFAULT_MYSQL_USERNAME}]: ").strip() or DEFAULT_MYSQL_USERNAME
    
    import getpass
    mysql_password = getpass.getpass(f"MYSQL_PASSWORD [{DEFAULT_MYSQL_PASSWORD}]: ").strip() or DEFAULT_MYSQL_PASSWORD
    
    node_env = input(f"NODE_ENV [{DEFAULT_NODE_ENV}]: ").strip() or DEFAULT_NODE_ENV
    port = input(f"PORT [{DEFAULT_PORT}]: ").strip() or DEFAULT_PORT
    
    return {
        'mysql_host': mysql_host,
        'mysql_port': mysql_port,
        'mysql_username': mysql_username,
        'mysql_password': mysql_password,
        'node_env': node_env,
        'port': port
    }


def get_default_env_values() -> Dict[str, str]:
    """
    Gets default environment values.
    
    Returns:
        Dictionary of default environment variables
    """
    return {
        'mysql_host': DEFAULT_MYSQL_HOST,
        'mysql_port': DEFAULT_MYSQL_PORT,
        'mysql_username': DEFAULT_MYSQL_USERNAME,
        'mysql_password': DEFAULT_MYSQL_PASSWORD,
        'node_env': DEFAULT_NODE_ENV,
        'port': DEFAULT_PORT
    }


def create_env_file(service: str, env_values: Dict[str, str]) -> None:
    """
    Creates .env file for a service.
    
    Args:
        service: Service name
        env_values: Dictionary of environment variables
    """
    env_file = BASE_DIR / service / '.env'
    
    content = f"""MYSQL_HOST={env_values['mysql_host']}
MYSQL_PORT={env_values['mysql_port']}
MYSQL_USERNAME={env_values['mysql_username']}
MYSQL_PASSWORD={env_values['mysql_password']}
MYSQL_DATABASE={service}
NODE_ENV={env_values['node_env']}
PORT={env_values['port']}
"""
    
    env_file.write_text(content)
    print(f".env file created for {service}.")


def configure_environments() -> None:
    """
    Configures environment files for services that require them.
    """
    for service in ENV_REQUIRED_SERVICES:
        service_dir = BASE_DIR / service
        
        if not service_dir.is_dir():
            continue
        
        env_file = service_dir / '.env'
        if env_file.exists():
            continue
        
        print(f"Missing .env file for {service}")
        
        if not prompt_yes_no(f"Would you like to create .env file for {service}?"):
            print(f"Warning: {service} may not work without .env configuration.")
            continue
        
        print(f"Configuring {service} environment...")
        
        if prompt_yes_no("Use default values?"):
            env_values = get_default_env_values()
        else:
            env_values = prompt_custom_env_values()
        
        create_env_file(service, env_values)


def start_service(service: str) -> bool:
    """
    Starts a backend service using Docker Compose.
    
    Args:
        service: Service name
        
    Returns:
        True on success, False on failure
    """
    service_dir = BASE_DIR / service
    
    if not service_dir.is_dir():
        print(f"Warning: Directory not found for {service}, skipping.")
        return False
    
    print(f"Starting {service} service...")
    
    try:
        subprocess.run(['docker', 'compose', 'up', '-d'],
                      cwd=service_dir, check=True)
        return True
    except subprocess.CalledProcessError:
        print(f"Error: Failed to start {service} service.")
        return False


def start_all_services() -> bool:
    """
    Starts all backend services.
    
    Returns:
        True if all services started successfully, False otherwise
    """
    failed_services = []
    
    for service in BACKEND_SERVICES:
        if not start_service(service):
            failed_services.append(service)
    
    if not failed_services:
        print("All backend services started successfully.")
        return True
    else:
        print(f"Warning: Some services failed to start: {', '.join(failed_services)}")
        return False


def are_services_running() -> bool:
    """
    Check if backend services are already running.
    
    Returns:
        True if all services are running, False otherwise
    """
    try:
        result = subprocess.run(
            ["docker", "ps", "--format", "{{.Names}}"],
            capture_output=True,
            text=True,
            timeout=10
        )
        
        if result.returncode != 0:
            return False
        
        running_containers = result.stdout.strip().split('\n')
        required_containers = [
            "auth.api", "booking.api", "tell.api",
            "auth.database", "booking.database", "tell.database"
        ]
        
        # Check if all required containers are running
        for container in required_containers:
            if container not in running_containers:
                return False
        
        return True
    except Exception:
        return False


def main() -> int:
    """
    Main execution function.
    
    Returns:
        Exit code (0 for success, 1 for failure)
    """
    # Check if services are already running
    if are_services_running():
        print("Backend services are already running.")
        return 0
    
    if not prompt_yes_no("Do you want to start backend dependencies? (auth, booking, tell)?"):
        print("Skipping backend dependencies.")
        return 0
    
    # Verify Docker installation
    if not is_docker_installed():
        print("Docker is not installed.")
        
        if prompt_yes_no("Would you like to install Docker?"):
            if not install_docker():
                print("Docker installation failed. Exiting.")
                return 1
            return 0
        else:
            print("Docker is required to run backend services. Exiting.")
            return 1
    
    # Check and clone missing dependencies
    missing_deps = check_missing_dependencies()
    
    if missing_deps:
        print(f"Missing backend dependencies: {', '.join(missing_deps)}")
        
        if prompt_yes_no("Would you like to clone the missing repositories?"):
            if not clone_repositories(missing_deps):
                print("Warning: Some repositories failed to clone.")
        else:
            print("Cannot start services without all dependencies. Exiting.")
            return 1
    
    # Configure environment files
    configure_environments()
    
    # Start all services
    start_all_services()
    
    return 0


if __name__ == '__main__':
    sys.exit(main())
