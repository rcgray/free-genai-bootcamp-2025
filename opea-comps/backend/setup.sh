#!/bin/bash

# Change to the project root directory
cd "$(dirname "$0")/.."

# Check if the models directory exists
if [ ! -d "models" ]; then
    echo "Creating models directory..."
    mkdir -p models
fi

# Check if the model file exists
MODEL_FILE="models/Meta-Llama-3.2-3B-Instruct-Q6_K_L.gguf"
if [ ! -f "$MODEL_FILE" ]; then
    echo "Warning: Model file $MODEL_FILE not found!"
    echo "Please make sure to copy or link your model file to this location."
    echo "Example: cp /path/to/your/model.gguf $MODEL_FILE"
    exit 1
fi

# Set environment variables
source backend/docker/set_env.sh

# Navigate to Docker directory
cd backend/docker

# Build and start the services
echo "Starting services with Docker Compose..."
docker compose up -d

# Check the status of the services
echo "Service status:"
docker compose ps

echo ""
echo "Services are now running!"
echo "You can access the backend API at: http://localhost:8888/v1/chatqna"
echo ""
echo "To stop the services, run: docker compose down" 