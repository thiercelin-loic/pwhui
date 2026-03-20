#!/usr/bin/env python3
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
PROJECT_NAME = "Booker"
NETWORK_NAME = "booker"
DOMAIN = "example.com"
EMAIL = "admin@example.com"
PROJECT_PATH = "~/Booker"

def main() -> int:
    """
    Main execution function.
    
    Returns:
        Exit code (0 for success, 1 for failure)
    """
    try:
        # Source dependencies (start backend services)
        dependencies_script = Path(__file__).parent / "dependencies.py"
        if dependencies_script.exists():
            print("Starting backend dependencies...")
            result = subprocess.run([sys.executable, str(dependencies_script)])
            if result.returncode != 0:
                print("Warning: Backend dependencies failed to start")
        
        # Change to project path
        os.chdir(Path.cwd())
        
        # Build Docker image
        print(f"Building Docker image for {PROJECT_NAME}...")
        subprocess.run(['docker', 'build', '-t', 'nginx', '.'], check=True)
        
        # Run Docker container
        print(f"Starting {PROJECT_NAME} container...")
        subprocess.run([
            'docker', 'run',
            '--name', PROJECT_NAME,
            '-d',
            '--network', NETWORK_NAME,
            '-p', '80:80',
            '-p', '443:443',
            '-e', f'DOMAIN={DOMAIN}',
            '-e', f'EMAIL={EMAIL}',
            '-v', '/etc/letsencrypt:/etc/letsencrypt',
            'nginx'
        ], check=True)
        
        print(f"{PROJECT_NAME} container started successfully!")
        return 0
        
    except subprocess.CalledProcessError as e:
        print(f"Error: Command failed with exit code {e.returncode}")
        return 1
    except Exception as e:
        print(f"Error: {e}")
        return 1


if __name__ == '__main__':
    sys.exit(main())
