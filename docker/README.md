# Docker Containers for Free GenAI Bootcamp 2025

This directory contains Docker configurations for all projects in the Free GenAI Bootcamp 2025 repository.

## Overview

The repository contains containerized versions of the following projects:

1. **Language Learning Portal** - A full-stack web application with FastAPI backend and React frontend
2. **Japanese Listening App** - A Streamlit application for processing Japanese audio content  
3. **OPEA Chat** - A LLM chat application using Docker containers
4. **Visual Novel** - A Phaser-based game with an LLM proxy server

## Prerequisites

- Docker Engine 24.0+
- Docker Compose 2.20+
- 8GB RAM minimum (16GB recommended)
- For OPEA Chat: NVIDIA GPU with appropriate drivers (optional)

## Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/rcgray/free-genai-bootcamp-2025.git
   cd free-genai-bootcamp-2025
   ```

2. Set up environment variables (copy examples and modify):
   ```bash
   # For OPEA Chat (optional)
   cp docker/env-example/opea-comps.env .env
   # For Visual Novel LLM integration (optional)
   cp docker/env-example/visual-novel.env .env
   # Edit .env with appropriate API keys
   ```

3. Run all projects:
   ```bash
   ./docker/build-and-run.sh
   ```

   Or run individual projects:
   ```bash
   # Language Learning Portal
   docker compose up -d lang_portal_backend lang_portal_frontend
   
   # Japanese Listening App
   docker compose up -d listening_comp_app
   
   # OPEA Chat (requires model file)
   MODEL_FILE=your-model-file.gguf docker compose up -d opea_comps_tgi opea_comps_backend opea_comps_app
   
   # Visual Novel
   docker compose up -d visual_novel_game visual_novel_server
   ```

4. Access the applications:
   - Language Portal: http://localhost:3000
   - Japanese Listening App: http://localhost:8501
   - OPEA Chat: http://localhost:8502 (if running)
   - Visual Novel: http://localhost:8080
   - Visual Novel LLM Proxy: http://localhost:3011

## Containerized Projects

### 1. Language Learning Portal
A full-stack Japanese language learning application with a FastAPI backend and React frontend.

- **Services**: `lang_portal_backend`, `lang_portal_frontend`
- **Ports**: 8000 (API), 3000 (Frontend)
- **Environment Variables**: See `docker/env-example/lang-portal.env`

### 2. Japanese Listening App
A Streamlit application for processing and learning from Japanese audio content.

- **Service**: `listening_comp_app`
- **Port**: 8501
- **Environment Variables**: `OPENAI_API_KEY`, `MAX_AUDIO_DURATION_SECONDS`, `WHISPER_MODEL`, `GPT_MODEL`

### 3. OPEA Chat
A containerized text generation service using local LLMs.

- **Services**: `opea_comps_tgi`, `opea_comps_backend`, `opea_comps_app`
- **Ports**: 8008 (TGI), 8888 (Backend), 8502 (Frontend)
- **Environment Variables**: `MODEL_FILE` (required), `TGI_THREADS`

### 4. Visual Novel
A Japanese language learning visual novel game with LLM integration for language explanations.

- **Services**: `visual_novel_game`, `visual_novel_server`
- **Ports**: 8080 (Game), 3011 (LLM Proxy)
- **Environment Variables**: `LLM_API_KEY`, `LLM_API_BASE_URL`, `LLM_MODEL`, `LLM_ENDPOINT_PATH`
- **Container Architecture**:
  - **Game Container**: Multi-stage build with Node.js for building and Nginx for serving the Phaser 3 game
  - **LLM Proxy Server Container**: Node.js Express server handling secure communication with LLM providers

## Environment Variables

Each project may require specific environment variables. Examples are provided in the `env-example/` directory.

For LLM-based projects requiring API keys (Visual Novel and Japanese Listening App):
1. Copy the example environment file
2. Add your API keys
3. Run the containers with the environment file or export the variables

### Visual Novel Environment Variables

```
# LLM API configuration
LLM_API_KEY=your_api_key_here       # Your API key for OpenAI or other provider
LLM_API_BASE_URL=https://api.openai.com/v1  # API base URL
LLM_MODEL=o3-mini                   # Model to use
LLM_ENDPOINT_PATH=chat/completions  # Endpoint path for the API

# Server configuration
PORT=3011                           # Port for the LLM proxy server

# Game settings
DEFAULT_LANGUAGE_LEVEL=beginner     # Language difficulty level
```

## Project Documentation

For detailed information about each project, refer to their original documentation:

- [Language Portal](../lang-portal/README.md)
- [Japanese Listening App](../listening-comp/README.md)
- [OPEA Chat](../opea-comps/README.md)
- [Visual Novel](../visual-novel/README.md)

## Troubleshooting

### Common Issues

1. **Port conflicts**: If you see "port is already allocated" errors, change the port mapping in docker-compose.yml
2. **Missing API keys**: For LLM-based projects, ensure you've set the required API keys
3. **OPEA model file missing**: Ensure you've downloaded and specified a valid GGUF model file for OPEA Chat

### Viewing Logs

```bash
# View logs for a specific container
docker logs <container-name>

# Follow logs in real-time
docker logs -f <container-name>

# View logs for a service
docker compose logs <service-name>
```

### Restarting Services

```bash
# Restart a specific service
docker compose restart <service-name>

# Stop all services
docker compose down

# Start all services
docker compose up -d
``` 