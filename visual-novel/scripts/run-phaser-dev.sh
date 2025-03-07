#!/bin/bash

# Ensure we're in the project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_ROOT" || exit

# Activate conda environment
eval "$(conda shell.bash hook)"
conda activate vn

# Kill any existing Vite processes to avoid port conflicts
pkill -f "vite" || true
sleep 1

# Clear the terminal
clear

# Run the Phaser development server only (no Streamlit)
cd phaser_game && npm run dev

# After script completion, print instructions
echo "---------------------------------------------"
echo "Phaser development server is now running."
echo "Open http://localhost:5173 in your browser."
echo "When you make changes to the code, the page will"
echo "automatically reload to show your changes."
echo "Press Ctrl+C to stop the server."
echo "---------------------------------------------" 