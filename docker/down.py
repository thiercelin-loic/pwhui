#!/usr/bin/env python3
"""
Backend Services Shutdown Script
Stops all Docker Compose services for backend dependencies
"""

import sys
import subprocess
from pathlib import Path
from typing import List

# Constants
BACKEND_SERVICES = ["auth", "booking", "tell"]
BASE_DIR = Path.home()

# Color codes for output (ANSI)
RED = '\033[0;31m'
GREEN = '\033[0;32m'
YELLOW = '\033[1;33m'
NC = '\033[0m'  # No Color


def stop_service(service: str) -> bool:
    """
    Stops a single service.
    
    Args:
        service: Service name
        
    Returns:
        True on success, False on failure
    """
    service_dir = BASE_DIR / service
    
    if not service_dir.is_dir():
        print(f"{YELLOW}Warning: Directory not found for {service}, skipping.{NC}")
        return False
    
    print(f"Stopping {service} service...")
    
    try:
        subprocess.run(['docker', 'compose', 'down'],
                      cwd=service_dir, check=True,
                      capture_output=True)
        print(f"{GREEN}✓ {service} stopped successfully{NC}")
        return True
    except subprocess.CalledProcessError:
        print(f"{RED}✗ Failed to stop {service}{NC}")
        return False


def main() -> int:
    """
    Main execution function.
    
    Returns:
        Exit code (0 for success, 1 for failure)
    """
    print("Shutting down backend services...")
    print()
    
    failed_services: List[str] = []
    stopped_count = 0
    
    for service in BACKEND_SERVICES:
        if stop_service(service):
            stopped_count += 1
        else:
            failed_services.append(service)
    
    print()
    print("================== Summary ==================")
    print(f"Services stopped: {stopped_count}/{len(BACKEND_SERVICES)}")
    
    if failed_services:
        print(f"{YELLOW}Failed services: {', '.join(failed_services)}{NC}")
        return 1
    else:
        print(f"{GREEN}All services stopped successfully!{NC}")
        return 0


if __name__ == '__main__':
    sys.exit(main())
