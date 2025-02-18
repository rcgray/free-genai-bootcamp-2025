#!/usr/bin/env python3
"""Script to reset and reinitialize databases.

This script:
1. Deletes existing databases (lang_portal.db and empty.db)
2. Runs init_db.py to create new database
3. Runs seed_db.py to populate the database
4. Creates a copy of the seeded database as empty.db
"""

import os
import shutil
import subprocess
import sys
from pathlib import Path

def run_command(command: str) -> bool:
    """Run a shell command and return success status.
    
    Args:
        command: The command to run
        
    Returns:
        bool: True if command succeeded (exit code 0), False otherwise
    """
    print(f"\nExecuting: {command}")
    
    try:
        result = subprocess.run(
            command,
            shell=True,
            capture_output=True,
            text=True,
            check=True
        )
        print(result.stdout)
        return True
        
    except subprocess.CalledProcessError as e:
        print(f"Error executing command: {command}")
        print(f"Exit code: {e.returncode}")
        print(f"Error output:\n{e.stderr}")
        return False

def main():
    """Main function to reset databases."""
    # Get project root directory (parent of scripts directory)
    project_root = Path(__file__).parent.parent
    
    # Change to project root directory
    print(f"Changing to project root directory: {project_root}")
    try:
        os.chdir(project_root)
    except Exception as e:
        print(f"Error changing to project root directory: {e}")
        sys.exit(1)
    
    # Delete existing databases
    db_files = [
        Path("data/lang_portal.db"),
        Path("data/empty.db")
    ]
    
    for db_file in db_files:
        if db_file.exists():
            print(f"Deleting {db_file}")
            db_file.unlink()
        else:
            print(f"{db_file} does not exist")
    
    # Run init_db.py
    if not run_command("python scripts/db/init_db.py"):
        print("Database initialization failed")
        sys.exit(1)
    print("Database initialization successful")
    
    # Run seed_db.py
    if not run_command("python scripts/db/seed_db.py"):
        print("Database seeding failed")
        sys.exit(1)
    print("Database seeding successful")
    
    # Copy seeded database to empty.db
    try:
        shutil.copy2("data/lang_portal.db", "data/empty.db")
        print("\nCreated backup copy of database:")
        print("- data/lang_portal.db (seeded database)")
        print("- data/empty.db (backup copy)")
    except Exception as e:
        print(f"Error creating database backup: {e}")
        sys.exit(1)
    
    # Verify both files exist
    success = all(db_file.exists() for db_file in db_files)
    if success:
        print("\nDatabase reset completed successfully")
    else:
        print("\nError: Some database files are missing")
        sys.exit(1)

if __name__ == "__main__":
    main() 