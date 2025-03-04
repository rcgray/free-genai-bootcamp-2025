#!/bin/bash

# Change to the project root directory
cd "$(dirname "$0")/.."

# Check if the service is running
if ! curl -s http://localhost:8888/health > /dev/null; then
    echo "Error: ChatQnA service is not running. Please start it with backend/setup.sh"
    exit 1
fi

echo "Testing ChatQnA API..."
echo ""

# Test a simple query
echo "Sending query: 'What is the capital of France?'"
curl -X POST http://localhost:8888/v1/chatqna \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "messages":[{"role":"user","content":"What is the capital of France?"}],
    "stream":false,
    "context":[],
    "meta":{"auth_token":""}
  }' | jq

echo ""
echo "Test completed." 