#!/usr/bin/env python3
"""
Script to build the Phaser game and run the Streamlit app.
"""

import os
import subprocess
import sys
from pathlib import Path

# Add the project root to the Python path
script_dir = Path(__file__).parent
project_root = script_dir.parent
sys.path.insert(0, str(project_root))

# Import the build_game function from the build_game.py script
from scripts.build_game import build_game

def run_app():
    """Build the game and run the Streamlit app."""
    print("=== Japanese Visual Novel ===")
    
    # Ask if the user wants to rebuild the game
    rebuild = input("Do you want to rebuild the Phaser game? (y/n) [n]: ").lower().strip()
    
    if rebuild == 'y':
        print("Rebuilding the Phaser game...")
        if not build_game():
            print("Error: Failed to build the Phaser game.")
            return False
        print("Phaser game built successfully.")
    
    # Run the Streamlit app
    print("\nStarting Streamlit app...")
    try:
        # Use subprocess.run to capture output and handle errors
        result = subprocess.run(
            ["conda", "run", "-n", "vn", "uv", "run", "streamlit", "run", "app/main.py"],
            cwd=project_root,
            check=True
        )
        return result.returncode == 0
    except subprocess.CalledProcessError as e:
        print(f"Error: Streamlit app failed with exit code {e.returncode}")
        if hasattr(e, 'stdout') and e.stdout:
            print(f"Command output: {e.stdout.decode()}")
        if hasattr(e, 'stderr') and e.stderr:
            print(f"Error output: {e.stderr.decode()}")
        return False
    except Exception as e:
        print(f"Error: An unexpected error occurred: {str(e)}")
        return False

if __name__ == "__main__":
    success = run_app()
    sys.exit(0 if success else 1) 