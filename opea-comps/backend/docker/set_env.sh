#!/usr/bin/env bash

# Set default host_ip if not already set
if [ -z "$host_ip" ]; then
    export host_ip="localhost"  # Default for local development
fi

# Update the TGI endpoint port to match llama.cpp server port
export TGI_ENDPOINT="http://${host_ip}:8008"

# Service endpoints for our simplified setup
export BACKEND_SERVICE_ENDPOINT="http://${host_ip}:8888/v1/chatqna"

# For Docker networking, use the actual service names instead of host_ip
export BACKEND_SERVICE_NAME=chatqna
export BACKEND_SERVICE_IP=chatqna-backend-server
export BACKEND_SERVICE_PORT=8888 