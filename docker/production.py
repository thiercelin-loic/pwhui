#!/usr/bin/env python3
"""
Legacy deployment wrapper for booker-client.

Deployment ownership is centralized in booker-services.
"""

import os
import subprocess
from pathlib import Path
import sys

# Optional override values propagated to booker-services deployment.
DOMAIN = "parisworkhub.eu"
EMAIL = "admin@parisworkhub.eu"

PROJECT_ROOT = Path(__file__).resolve().parents[1]
SERVICES_ROOT = PROJECT_ROOT.parent / "booker-services"
DEPLOY_SCRIPT = SERVICES_ROOT / "scripts" / "deploy.py"

def main() -> int:
    """
    Main execution function.

    Returns:
        Exit code (0 for success, 1 for failure)
    """
    if not DEPLOY_SCRIPT.is_file():
        print("Error: deployment script not found in booker-services.", file=sys.stderr)
        print(
            "Expected sibling layout: <parent>/booker-client and <parent>/booker-services",
            file=sys.stderr,
        )
        print(
            "Get booker-services here: https://github.com/thiercelin-loic/booker-services",
            file=sys.stderr,
        )
        return 1

    print("[DEPRECATED] Use deployment from booker-services.")
    print("Delegating to: booker-services/scripts/deploy.py")

    env = os.environ.copy()
    env["BOOKER_CLIENT_DOMAIN"] = DOMAIN
    env["BOOKER_CLIENT_EMAIL"] = EMAIL

    result = subprocess.run(
        [sys.executable, str(DEPLOY_SCRIPT), "up", "--detached"],
        cwd=SERVICES_ROOT,
        env=env,
    )
    return result.returncode


if __name__ == '__main__':
    sys.exit(main())
