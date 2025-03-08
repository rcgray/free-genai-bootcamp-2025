#!/bin/bash
# Script to start both the Phaser development server and Streamlit app in separate terminals

# Clean up any existing processes first - use the complete cleanup script
echo "Cleaning up all development processes..."
bash "$(dirname "$0")/cleanup-dev.sh"

# Determine if we're in WSL for handling the terminal properly
if [[ $(uname -r) == *Microsoft* || $(uname -r) == *microsoft* ]]; then
    IS_WSL=true
else
    IS_WSL=false
fi

# Get the absolute path to the scripts
SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
PHASER_SCRIPT="$SCRIPT_DIR/watch-phaser.sh"
STREAMLIT_SCRIPT="$SCRIPT_DIR/watch-streamlit.sh"

echo "Starting development environment..."

# Launch the Phaser watch script in a new terminal
if $IS_WSL; then
    # For WSL, we use wt (Windows Terminal)
    echo "Detected WSL, using Windows Terminal..."
    # Start Phaser first since Streamlit will look for it
    cmd.exe /c start wt.exe -d "$(wslpath -w "$(pwd)")" wsl.exe bash "$PHASER_SCRIPT"
    echo "Waiting for Vite server to start..."
    sleep 3  # Give Vite time to start
    cmd.exe /c start wt.exe -d "$(wslpath -w "$(pwd)")" wsl.exe bash "$STREAMLIT_SCRIPT"
else
    # For Linux, we use gnome-terminal or xterm, depending on what's available
    if command -v gnome-terminal &> /dev/null; then
        echo "Using gnome-terminal..."
        # Start Phaser first since Streamlit will look for it
        gnome-terminal -- bash "$PHASER_SCRIPT" &
        echo "Waiting for Vite server to start..."
        sleep 3  # Give Vite time to start
        gnome-terminal -- bash "$STREAMLIT_SCRIPT" &
    elif command -v xterm &> /dev/null; then
        echo "Using xterm..."
        # Start Phaser first since Streamlit will look for it
        xterm -e "bash '$PHASER_SCRIPT'" &
        echo "Waiting for Vite server to start..."
        sleep 3  # Give Vite time to start
        xterm -e "bash '$STREAMLIT_SCRIPT'" &
    else
        echo "No suitable terminal emulator found. Please run the scripts manually:"
        echo "Terminal 1: $PHASER_SCRIPT"
        echo "Terminal 2: $STREAMLIT_SCRIPT"
        exit 1
    fi
fi

echo "Development environment started!"
echo "Phaser game will be available at: http://localhost:5173"
echo "Streamlit app will be available at: http://localhost:8501"
echo ""
echo "⚠️ Tip: Use ./scripts/cleanup-dev.sh to stop all servers when done." 