"""Script to prepare code for check-in by running formatting, type checking, and doc updates."""

import os
import subprocess
import sys
from pathlib import Path
from typing import List

# ANSI escape codes for colors
HIGHLIGHT = "\033[92m"
RESET = "\033[0m"


def run_command(cmd: List[str], description: str) -> bool:
    """Run a command and return whether it succeeded.

    Args:
        cmd: Command and arguments to run
        description: Description of the command for output

    Returns:
        True if command succeeded, False otherwise
    """
    print(f"\n=== Running {description} ===")
    try:
        subprocess.run(cmd, check=True)
        print(f"✅ {description} completed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} failed with exit code {e.returncode}")
        return False


def main() -> int:
    """Run all pre-checkin steps.

    Returns:
        Exit code (0 for success, 1 for failure)
    """
    # Ensure we're in the project root
    project_root = Path(__file__).parent.parent
    os.chdir(project_root)

    steps = [
        (["uv", "run", "ruff", "format", "."], "Code formatting"),
        (["uv", "run", "mypy", "."], "Type checking"),
        (["python", "scripts/update_docs.py"], "Documentation update"),
    ]

    success = True
    for cmd, description in steps:
        if not run_command(cmd, description):
            success = False

    if success:
        print("\n✨ All checks passed! Ready to commit.")
        print(f"\n{HIGHLIGHT}Be sure to update the Action Plan doc{RESET}")
        return 0
    else:
        print("\n❌ Some checks failed. Please fix the issues and try again.")
        return 1


if __name__ == "__main__":
    sys.exit(main())
