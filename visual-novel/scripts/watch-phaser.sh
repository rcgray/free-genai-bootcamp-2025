#!/bin/bash
# Script to run the Phaser game in watch mode

# Clean up only Vite/Phaser processes
echo "Cleaning up existing Vite/Phaser processes..."

# Kill any process using port 5173 (Vite)
PORT_PID=$(lsof -t -i:5173 2>/dev/null)
if [ -n "$PORT_PID" ]; then
    echo "Killing process on port 5173 (Vite): $PORT_PID"
    kill -9 $PORT_PID 2>/dev/null
fi

# Kill any Node.js processes related to Vite
echo "Killing Vite processes..."
VITE_PIDS=$(ps aux | grep "vite" | grep -v grep | grep -v "watch-phaser.sh" | awk '{print $2}')
if [ -n "$VITE_PIDS" ]; then
    echo "Killing Vite processes: $VITE_PIDS"
    for PID in $VITE_PIDS; do
        kill -9 $PID 2>/dev/null || true
    done
else
    echo "No Vite processes found."
fi

# Give processes time to shut down
sleep 1

# Activate the conda environment
source "$(conda info --base)/etc/profile.d/conda.sh"
conda activate vn

# Navigate to the phaser_game directory and run the development server
cd phaser_game
echo "Starting Vite development server with HMR..."
echo "Hot Module Replacement (HMR) is enabled - changes should reflect automatically"
echo "Tip: Open browser console to see HMR-related messages"

# Run Vite with "goldilocks" logging level
# Enable only HMR-related debug logs and info-level general logs
export DEBUG="vite:hmr"
npm run dev -- --logLevel info 