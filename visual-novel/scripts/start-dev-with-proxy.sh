#!/bin/bash

# This script starts both the LLM proxy server and the Phaser game in development mode

# Start the LLM proxy server in the background
echo "Starting the LLM proxy server..."
cd server && npm run dev &
PROXY_PID=$!

# Wait a moment for the proxy to start
sleep 2

# Start the Phaser game watch server
echo "Starting the Phaser game watch server..."
./scripts/watch-phaser.sh &
PHASER_PID=$!

# Start the Streamlit app
echo "Starting the Streamlit app..."
./scripts/watch-streamlit.sh

# Make sure we clean up child processes when this script exits
cleanup() {
  echo "Shutting down all processes..."
  kill $PROXY_PID
  kill $PHASER_PID
  exit 0
}

# Register the cleanup function for various exit signals
trap cleanup SIGINT SIGTERM

# Wait for the streamlit process to finish (it's in the foreground)
wait 