# ChatQnA Backend Service

This is a simplified implementation of a ChatQnA service that communicates with a llama.cpp server to provide LLM capabilities. It's designed to provide a backend API for our Streamlit frontend application.

## Features

- Simple FastAPI-based service for chat completion
- Docker Compose setup for easy deployment
- Integration with local GGUF models via llama.cpp
- Support for streaming responses
- Compatible with our upcoming Streamlit frontend

## Directory Structure

```
backend/
├── chatqna/                 # Main service code
│   ├── __init__.py
│   └── service.py           # FastAPI service implementation
├── config/                  # Configuration files 
├── docker/                  # Docker deployment files
│   ├── compose.yaml         # Docker Compose configuration
│   ├── Dockerfile           # Dockerfile for the service
│   └── set_env.sh           # Environment setup script
└── requirements.txt         # Python dependencies

models/                      # Directory for local models (at project root)
```

## Setup and Deployment

### Prerequisites

- Docker and Docker Compose
- NVIDIA GPU with appropriate drivers
- Local GGUF model files in the root `models/` directory

### Local Development Setup

1. Install dependencies:
```bash
uv sync
```

2. Run the service locally:
```bash
uvicorn backend.chatqna.service:app --host 0.0.0.0 --port 8888 --reload
```

### Docker Deployment

0. If using Windows (WSL), make sure the Windows Docker Desktop is running.

1. Set up environment variables:
```bash
source backend/docker/set_env.sh
```

2. Start the services using Docker Compose:
```bash
cd backend/docker
docker compose up -d
```

3. Check the status of the services:
```bash
docker compose ps
```

## API Usage

### Chat Completion Endpoint

- **URL**: `/v1/chatqna`
- **Method**: `POST`
- **Request Body**:
```json
{
  "messages": [
    {"role": "user", "content": "Hello, how are you?"}
  ],
  "stream": false,
  "context": [],
  "meta": {"auth_token": ""}
}
```

- **Response**:
```json
{
  "id": "chatcmpl-abc123",
  "object": "chat.completion",
  "created": 1701234567,
  "model": "chatqna",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "I'm doing well, thank you for asking! How can I assist you today?"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 0,
    "completion_tokens": 0,
    "total_tokens": 0
  }
}
```

### Health Check Endpoint

- **URL**: `/health`
- **Method**: `GET`
- **Response**:
```json
{
  "status": "ok"
}
```

## Streamlit Integration

This backend service is designed to be used with our Streamlit frontend application. The frontend will communicate with the backend using the `/v1/chatqna` endpoint to send messages and receive responses from the LLM.

## Model Configuration

The service is configured to use the local GGUF model provided by the llama.cpp server. The model path is specified in the Docker Compose file and points to the root `models/` directory. 