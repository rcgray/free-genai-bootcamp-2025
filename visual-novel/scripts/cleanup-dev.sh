#!/bin/bash
# Script to clean up any running development processes

echo "Cleaning up development processes..."

# Kill any process using port 5173 (Vite)
PORT_PID=$(lsof -t -i:5173 2>/dev/null)
if [ -n "$PORT_PID" ]; then
    echo "Killing process on port 5173 (Vite): $PORT_PID"
    kill -9 $PORT_PID 2>/dev/null
fi

# Kill any Streamlit processes
echo "Killing Streamlit processes..."
# Find running Streamlit processes
STREAMLIT_PIDS=$(ps aux | grep "streamlit run" | grep -v grep | awk '{print $2}')
if [ -n "$STREAMLIT_PIDS" ]; then
    echo "Killing Streamlit processes: $STREAMLIT_PIDS"
    for PID in $STREAMLIT_PIDS; do
        kill -9 $PID 2>/dev/null || true
    done
else
    echo "No Streamlit processes found."
fi

# Kill any Node.js processes related to Vite
echo "Killing Node/Vite processes..."
VITE_PIDS=$(ps aux | grep "vite" | grep -v grep | awk '{print $2}')
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

echo "Cleanup complete!" 