#!/bin/bash
# Script to run the Streamlit app in watch mode

# Clean up only existing Streamlit processes, but be more specific
echo "Cleaning up existing Streamlit processes..."

# Find running Streamlit processes but exclude this script
PIDS=$(ps aux | grep "streamlit run" | grep -v grep | grep -v "watch-streamlit.sh" | awk '{print $2}')

if [ -n "$PIDS" ]; then
    echo "Killing Streamlit processes: $PIDS"
    for PID in $PIDS; do
        kill -9 $PID 2>/dev/null || true
    done
else
    echo "No existing Streamlit processes found."
fi

# Give processes time to shut down
sleep 1

# Activate the conda environment
source "$(conda info --base)/etc/profile.d/conda.sh"
conda activate vn

# Run Streamlit with automatic reloading
echo "Starting Streamlit server..."
uv run streamlit run app/main.py 