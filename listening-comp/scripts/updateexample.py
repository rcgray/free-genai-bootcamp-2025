#!/usr/bin/env python3
"""Script to update project documentation automatically.

This script runs various commands to generate and update documentation files
based on the current state of the project.
"""

import os
import subprocess
import sys
from pathlib import Path
from typing import Union


def run_command(command: str, output_file: Union[str, None] = None) -> bool:
    """Run a shell command and optionally save its output to a file.

    Args:
        command: The command to run
        output_file: Optional file path to save the command output

    Returns:
        bool: True if command succeeded, False otherwise
    """
    print(f"\nExecuting: {command}")

    try:
        # Run the command and capture output
        result = subprocess.run(
            command,
            shell=True,
            capture_output=True,
            text=True,
            check=False,  # Don't raise exception on non-zero exit codes
        )

        if output_file:
            # Save output to file (combine stdout and stderr)
            output_path = Path(output_file)
            output_path.parent.mkdir(parents=True, exist_ok=True)

            print(f"Saving output to: {output_file}")
            with open(output_file, "w") as f:
                # Write stdout first if we have it
                if result.stdout:
                    f.write(result.stdout)
                # Write stderr if we have it
                if result.stderr:
                    f.write(result.stderr)

        # Return True only if exit code was 0
        return result.returncode == 0

    except Exception as e:
        print(f"Unexpected error executing command: {command}")
        print(f"Error: {str(e)}")
        return False


def main() -> None:
    """Main function to update documentation."""
    # Get project root directory (parent of scripts directory)
    project_root = Path(__file__).parent.parent

    # Change to project root directory
    print(f"Changing to project root directory: {project_root}")
    try:
        os.chdir(project_root)
    except Exception as e:
        print(f"Error changing to project root directory: {e}")
        sys.exit(1)

    # List of commands to run with their output files
    commands = [
        {
            "command": "tree -a --gitignore",
            "output": "docs/reports/Project-File-Structure.md",
        },
        {
            "command": "uv run pytest backend-fastapi/tests/",
            "output": "docs/reports/Backend-Tests.md",
        },
    ]

    # Run each command
    success = True
    for cmd in commands:
        if not run_command(cmd["command"], cmd["output"]):
            success = False

    # Exit with appropriate status code
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
