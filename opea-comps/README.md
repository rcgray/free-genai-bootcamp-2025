# OPEA-Based LLM Chat Application 💬

A minimalistic chat application that demonstrates the use of Intel's Open Platform for Enterprise AI (OPEA) toolchain with locally stored LLM models. This application provides a simple Streamlit interface for interacting with large language models using NVIDIA GPU acceleration.

## Features

- **Local LLM Integration**: Use your own locally stored LLM models without downloading from external sources
- **NVIDIA GPU Acceleration**: Optimized for performance with NVIDIA GPUs
- **Simple Chat Interface**: Clean, intuitive Streamlit UI for sending prompts and receiving responses
- **Docker Deployment**: Easy setup with Docker and Docker Compose
- **Minimalistic Design**: Focused on demonstrating OPEA capabilities with minimal complexity

## Getting Started

### Prerequisites

- Python 3.12 or higher
- Conda or pyenv (for environment management)
- uv (for dependency management)
- Docker and Docker Compose
- NVIDIA GPU with appropriate drivers
- Local LLM models (e.g., Qwen2.5-Coder-14B-Instruct, Microsoft Phi-4, or Llama-3.1-8B-Instruct)

### Development Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd opea-chat
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

4. Set up environment variables:
   ```bash
   # Copy the example environment file
   cp .env.example .env

   # Edit .env with your configuration
   ```

5. Place your LLM models in the `models/` directory.

### Running the Application

#### Using Docker (Recommended)

1. Build and start the Docker containers:
   ```bash
   cd docker
   docker-compose up -d
   ```

2. Access the application at `http://localhost:8501`

#### Local Development

1. Start the Streamlit application:
   ```bash
   uv run streamlit run app/main.py
   ```

2. The application will be available at `http://localhost:8501`

## Project Structure

```
opea-chat/
├── app/                # Streamlit application
│   ├── __init__.py
│   ├── main.py         # Main Streamlit entry point
│   └── components/     # UI components
│       └── chat.py     # Chat interface components
├── backend/            # Backend integration with OPEA
│   ├── __init__.py
│   └── opea_client.py  # OPEA API client
├── config/             # Configuration files
│   ├── app_config.py   # Application configuration
│   └── opea_config.py  # OPEA configuration
├── docker/             # Docker deployment files
│   ├── docker-compose.yml
│   └── Dockerfile
├── models/             # Local model storage (not in repo)
├── scripts/            # Utility scripts
├── tests/              # Test suite
├── pyproject.toml      # Project configuration and dependencies
└── README.md
```

## Development

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

- **Qwen2.5-Coder-14B-Instruct** (11/06/24) - Preferred
- **Microsoft Phi-4** (12/11/24) - Preferred
- **Llama-3.1-8B-Instruct** (04/18/24) - Alternative option

## OPEA Integration

This application demonstrates the use of Intel's OPEA toolchain for deploying and serving LLM models. Key OPEA components used include:

- Model Service for loading and serving LLM models
- Inference API for sending prompts and receiving responses
- Docker Compose for orchestrating the services

For more information about OPEA, refer to the [official documentation](https://opea-project.github.io/latest/).

## Future Enhancements

- Conversation memory and context management
- Model switching capabilities
- Advanced prompt engineering
- Response streaming
- Performance analytics and monitoring

