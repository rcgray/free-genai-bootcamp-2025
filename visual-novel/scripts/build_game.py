#!/usr/bin/env python3
"""
Build script for the Phaser game.
This script builds the Phaser game for production.
"""

import os
import subprocess
import sys
from pathlib import Path

def build_game():
    """Build the Phaser game for production."""
    print("Building Phaser game...")
    
    # Get the project root directory
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    phaser_dir = project_root / "phaser_game"
    
    # Check if the phaser_game directory exists
    if not phaser_dir.exists():
        print(f"Error: phaser_game directory not found at {phaser_dir}")
        return False
    
    # Run npm build command
    try:
        # Use npm --prefix for running commands from the project root
        result = subprocess.run(
            ["npm", "--prefix", "phaser_game", "run", "build"], 
            cwd=project_root, 
            check=True,
            capture_output=True,
            text=True
        )
        
        # Print the command output
        print(result.stdout)
        if result.stderr:
            print(f"Warnings or errors during build:\n{result.stderr}", file=sys.stderr)
        
        # Check if the build was successful by verifying the dist directory exists
        dist_dir = phaser_dir / "dist"
        if dist_dir.exists() and list(dist_dir.glob("*.html")) and list(dist_dir.glob("assets/*.js")):
            print(f"Build successful! Output directory: {dist_dir}")
            return True
        else:
            print("Error: Build failed or output files not found")
            return False
    
    except subprocess.CalledProcessError as e:
        print(f"Error: Build command failed with exit code {e.returncode}")
        print(f"Command output: {e.stdout}")
        print(f"Error output: {e.stderr}")
        return False
    
    except Exception as e:
        print(f"Error: An unexpected error occurred: {str(e)}")
        return False

if __name__ == "__main__":
    success = build_game()
    sys.exit(0 if success else 1) 