# OPEA-Based LLM Chat Application 💬

A Streamlit-based chat application that demonstrates the use of locally stored LLM models with NVIDIA GPU acceleration, powered by llama.cpp and FastAPI. This application provides a simple interface for interacting with large language models through Intel's Open Platform for Enterprise AI (OPEA) toolchain.

![OPEA Chat Application](dev/screenshot.png)

## Overview

This project consists of two main components:

1. **Backend Service**: A FastAPI-based service that interfaces with llama.cpp to provide LLM capabilities
2. **Streamlit Frontend**: A user-friendly web interface for chatting with the LLM

The application allows users to run powerful large language models locally on their own hardware, without requiring internet connectivity or sending data to external services. It demonstrates how to build a complete end-to-end AI chat application using open-source tools and models.

## Features

- **Local LLM Integration**: Use your own locally stored LLM models without downloading from external sources
- **NVIDIA GPU Acceleration**: Optimized for performance with NVIDIA GPUs
- **Simple Chat Interface**: Clean, intuitive Streamlit UI for sending prompts and receiving responses
- **Docker Deployment**: Easy setup with Docker and Docker Compose
- **Efficient Model Loading**: Fast model initialization and inference
- **API-First Design**: Backend service with RESTful API for flexible integration

## Getting Started

### Prerequisites

- Python 3.12 or higher
- Conda or pyenv (for environment management)
- uv (for dependency management)
- Docker and Docker Compose
- NVIDIA GPU with appropriate drivers
- Local LLM models (e.g., Llama-3.1-8B-Instruct, Microsoft Phi-4-Mini)

### Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd opea-comps
   ```

2. Create and activate a Python environment:
   ```bash
   # Using conda
   conda create -n opea-chat python=3.12
   conda activate opea-chat

   # OR using pyenv + venv
   pyenv install 3.12.1
   pyenv local 3.12.1
   python -m venv .venv
   source .venv/bin/activate  # On Unix/macOS
   # OR
   .venv\Scripts\activate  # On Windows
   ```

3. Install dependencies:
   ```bash
   # Install core dependencies
   uv sync

   # Install development dependencies
   uv sync --extra dev
   ```

4. Place your GGUF model files in the `models/` directory:
   ```bash
   # Example for Meta-Llama-3.2-3B-Instruct model
   cp /path/to/your/model/your-model-file.gguf models/
   ```

### Running the Application

#### Starting the Backend Service

Run the setup script:
```bash
./backend/setup.sh
```

This will:
- Check for the required model files
- Set up the necessary environment variables
- Start the Docker containers
- Display the service status

#### Testing the Backend Service

To test that the backend service is working correctly:
```bash
./backend/test.sh
```

This will send a test query to the API and display the response.

#### Starting the Streamlit Frontend

Once the backend service is running, you can start the Streamlit frontend:
```bash
./app/run.sh
```

This will:
- Check if the backend service is running
- Start the Streamlit application
- Open a browser window with the chat interface

The Streamlit frontend will be available at:
```
http://localhost:8501
```

## Usage

1. Start the backend service with `./backend/setup.sh`
2. Start the Streamlit frontend with `./app/run.sh`
3. Enter your question or prompt in the chat input field
4. View the AI response in the chat interface

## Architecture

```
┌─────────────────┐     ┌─────────────────┐      ┌─────────────────┐
│                 │     │                 │      │                 │
│    Streamlit    │────▶│    FastAPI      │────▶│    llama.cpp    │
│    Frontend     │◀────│    Backend      │◀────│    Server       │
│                 │     │                 │      │                 │
└─────────────────┘     └─────────────────┘      └─────────────────┘
```

## Project Structure

```
opea-comps/
├── app/                # Streamlit application
│   ├── __init__.py
│   ├── main.py         # Main Streamlit entry point
│   ├── run.sh          # Script to run the Streamlit app
│   └── components/     # UI components
│       ├── __init__.py
│       └── chat.py     # Chat interface components
├── backend/            # Backend service implementation
│   ├── chatqna/        # ChatQnA service code
│   │   ├── __init__.py
│   │   └── service.py  # FastAPI service implementation
│   ├── config/         # Configuration files
│   ├── docker/         # Docker deployment files
│   │   ├── compose.yaml
│   │   ├── Dockerfile
│   │   └── set_env.sh
│   ├── setup.sh        # Setup script
│   └── test.sh         # Test script
├── models/             # Local model storage (not in repo)
├── config/             # Application configuration
├── tests/              # Test suite
└── README.md           # This file
```

## Docker Setup

The OPEA Chat application can be run using Docker for containerized deployment.

### Prerequisites
- Docker and Docker Compose installed on your machine
- NVIDIA GPU with appropriate drivers (for optimal performance)
- NVIDIA Container Toolkit installed (for GPU support)

### Model Setup

Before running the application, you need to download a GGUF model file:

```bash
# From the repository root, run the model setup script
./docker/opea-comps/model-setup.sh
```

This script will:
1. Create the necessary directory for models
2. Create the Docker volume for model storage
3. Provide instructions for downloading appropriate models
4. Check if any models are already available

### Testing Your Setup

To verify that your Docker environment is correctly configured for OPEA Chat:

```bash
# From the repository root, run the test script
./docker/opea-comps/test-setup.sh
```

This test script will:
1. Check if Docker is running
2. Verify if NVIDIA Container Toolkit is installed (for GPU acceleration)
3. Create a docker-compose.override.yml if needed for CPU-only testing
4. Test that the base container can run
5. Provide next steps based on your environment

The test doesn't require a real model file and can help diagnose setup issues before downloading large model files.

### Running with Docker

1. From the repository root, start the application with Docker Compose:
```bash
# First download a GGUF model file and place it in opea-comps/models/
# Then run only the OPEA Chat services
MODEL_FILE=your-model-file.gguf docker compose up -d opea_comps_tgi opea_comps_backend opea_comps_app

# Or run as part of the complete monorepo stack
MODEL_FILE=your-model-file.gguf docker compose up -d
```

2. The application will be available at:
- Chat Interface: http://localhost:8502
- Backend API: http://localhost:8888
- TGI Service: http://localhost:8008

3. To stop the containers:
```bash
# Stop only the OPEA Chat services
docker compose stop opea_comps_tgi opea_comps_backend opea_comps_app

# Or stop all services
docker compose down
```

### Container Details

The application uses three containers:
- `opea_comps_tgi`: The llama.cpp server that loads and runs the language model
- `opea_comps_backend`: The FastAPI backend service that interfaces with the TGI service
- `opea_comps_app`: The Streamlit frontend for the chat interface

### Data Persistence

The Docker setup uses a volume for data persistence:
- `opea_comps_models`: Stores the LLM model files

This ensures your model files remain accessible between container restarts.

### Environment Configuration

You must specify the following environment variable:
- `MODEL_FILE`: Filename of the GGUF model to use (required, no default)

You can optionally specify:
- `TGI_THREADS`: Number of CPU threads to use for inference (default: 8)

Example:
```bash
MODEL_FILE=your-model-file.gguf TGI_THREADS=16 docker compose up -d opea_comps_tgi opea_comps_backend opea_comps_app
```

## Development

### Local Development Setup

1. Install dependencies:
```bash
uv sync
```

2. Run the backend service locally:
```bash
uvicorn backend.chatqna.service:app --host 0.0.0.0 --port 8888 --reload
```

3. Run the Streamlit app locally:
```bash
cd app
streamlit run main.py
```

### Development Tools

The project uses several tools to maintain code quality:

#### Code Quality
```bash
# Format code with Ruff
uv run ruff format .

# Run Ruff linter
uv run ruff check .

# Run type checking
uv run mypy .

# Run tests
uv run pytest
```

### Development Guidelines

1. Follow the Google Python style guide for docstrings
2. Maintain type hints for all functions and classes
3. Write tests for new functionality
4. Keep functions focused and small
5. Document significant changes

## Supported Models

The application has been tested with the following models:

   - **Meta-Llama-3.1:8B**
   - **Meta-Llama-3.2:1B**
   - **Meta-Llama-3.2:3B**
   - **Microsoft-Phi-4:Mini**

## Future Enhancements

- Conversation memory and context management
- Model switching capabilities
- Advanced prompt engineering
- Response streaming
- Performance analytics and monitoring

