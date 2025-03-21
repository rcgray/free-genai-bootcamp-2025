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
   cp /path/to/your/model/Meta-Llama-3.2-3B-Instruct-Q6_K_L.gguf models/
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

