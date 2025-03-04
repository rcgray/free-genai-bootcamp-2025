#!/usr/bin/env python3
"""Script to update project documentation files."""

import os
import subprocess
from pathlib import Path
from typing import List, Tuple


def run_command(cmd: List[str], capture_output: bool = False) -> Tuple[int, str, str]:
    """Run a command and return its results.

    Args:
        cmd: Command and arguments to run
        capture_output: Whether to capture command output

    Returns:
        Tuple of (return_code, stdout, stderr)
    """
    result = subprocess.run(
        cmd,
        capture_output=capture_output,
        text=True,
    )
    return (
        result.returncode,
        result.stdout if result.stdout else "",
        result.stderr if result.stderr else "",
    )


def update_file_structure() -> None:
    """Update the project file structure documentation."""
    # Get the project root directory
    project_root = Path(__file__).resolve().parent.parent

    # Create reports directory if it doesn't exist
    reports_dir = project_root / "docs" / "reports"
    reports_dir.mkdir(parents=True, exist_ok=True)

    # Run tree command with pattern matching to ignore GenAI* directories
    tree_command = ["tree", "-a", "--gitignore", "-I", "models/|opea-repos/"]
    returncode, stdout, stderr = run_command(tree_command, capture_output=True)

    if returncode == 0:
        # Write tree output to file
        with open(reports_dir / "Project-File-Structure.md", "w") as f:
            f.write(stdout)
    else:
        print(f"Error running tree command: {stderr}")


def run_tests() -> None:
    """Run tests and save results to report file."""
    # Get the project root directory
    project_root = Path(__file__).resolve().parent.parent
    reports_dir = project_root / "docs" / "reports"
    reports_dir.mkdir(parents=True, exist_ok=True)

    # Run pytest with detailed output
    returncode, stdout, stderr = run_command(
        ["uv", "run", "pytest", "-v"],
        capture_output=True,
    )

    # Write test results to file
    with open(reports_dir / "Test-Results.md", "w") as f:
        f.write(stdout)
        if stderr:
            f.write(stderr)

    # Print the last line of test output to console
    if stdout:
        last_line = stdout.strip().split("\n")[-1]
        print(f"\nTest Results: {last_line}")


def main() -> None:
    """Update all documentation files."""
    # Ensure we're in the project root
    project_root = Path(__file__).resolve().parent.parent
    os.chdir(project_root)

    print("Updating file structure documentation...")
    update_file_structure()

    #print("\nRunning tests and generating report...")
    #run_tests()

    print("\nDocumentation update complete!")


if __name__ == "__main__":
    main()
