#!/bin/bash

# Change to the project root directory
cd "$(dirname "$0")/.."

# Check if the backend is running
echo "Checking if the backend service is running..."
if ! curl -s http://localhost:8888/health > /dev/null; then
  echo "Warning: Backend service does not appear to be running."
  echo "You should start it with ./backend/setup.sh before running the UI."
  echo "Continuing anyway..."
fi

# Run the Streamlit app
echo "Starting Streamlit application..."
uv run streamlit run app/main.py

# Exit with the same code as Streamlit
exit $? 