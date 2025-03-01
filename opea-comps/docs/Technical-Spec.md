# Technical Specification - OPEA-Based LLM Chat Application

## Overview and MVP Definition

This project aims to create a minimalistic clone of the ChatGPT interface using the Intel OPEA toolchain. The Minimum Viable Product (MVP) will focus on demonstrating the successful use of OPEA tools and the ChatQnA examples, rather than building a feature-rich application.

### MVP Scope
- A simple web interface for sending a message to an LLM and receiving a response
- One-shot prompting capability (no conversation memory required)
- Integration with locally stored LLM models via OPEA
- NVIDIA GPU acceleration for inference

### Out of Scope for MVP
- Conversation history or memory
- User authentication or login
- User database or profiles
- Multi-turn conversations
- Advanced features like system prompts or model switching
- Persistent storage of conversations

The priority is to create a functional demonstration of OPEA's capabilities with minimal complexity.

## Technology Stack

### Core Technologies
- **Python 3.12+**: Base programming language
- **Streamlit**: Frontend framework for the chat interface
- **OPEA**: Intel's Open Platform for Enterprise AI toolchain
- **Docker**: Containerization platform for deployment

### Development Tools
- **Ruff**: Fast, comprehensive Python linter and formatter
- **MyPy**: Static type checker for Python
- **Pytest**: Testing framework
- **uv**: Python package installer and virtual environment manager

### LLM Models
- Support for locally stored models:
  - **Qwen2.5-Coder-14B-Instruct** (11/06/24) - Preferred
  - **Microsoft Phi-4** (12/11/24) - Preferred
  - **Llama-3.1-8B-Instruct** (04/18/24) - Alternative option

The application will prioritize using Qwen2.5-Coder or Microsoft Phi-4 models if available, with Llama-3.1 as a fallback option. All models must be pre-downloaded and available locally.

## Documentation References

### OPEA Documentation
- **Getting Started with OPEA**: https://opea-project.github.io/latest/getting-started/README.html#create-and-configure-a-virtual-server
- **ChatQnA Overview**: https://opea-project.github.io/latest/tutorial/ChatQnA/ChatQnA_Guide.html#
- **MegaService of ChatQnA on NVidia**: https://opea-project.github.io/latest/GenAIExamples/ChatQnA/docker_compose/nvidia/gpu/README.html
- **GenAIComps GitHub**: https://github.com/opea-project/GenAIComps
- **GenAIExamples GitHub**: https://github.com/opea-project/GenAIExamples
- **ChatQnA GitHub**: https://github.com/opea-project/GenAIExamples/tree/main/ChatQnA
- **ChatQnA Single Node On-Premise Deployment on NVidia GPU**: https://opea-project.github.io/latest/tutorial/ChatQnA/deploy/nvidia.html

These documentation sources will be used as primary references for implementing the OPEA integration and configuring the application to work with local LLM models on NVIDIA GPUs.

## Implementation Priorities

1. **OPEA Integration**: Successfully deploy and integrate with OPEA services
2. **Local Model Loading**: Configure OPEA to load models from local storage
3. **Basic UI**: Implement a simple chat interface with Streamlit
4. **GPU Acceleration**: Ensure NVIDIA GPU support is properly configured
5. **Error Handling**: Implement basic error handling for the critical path
6. **Documentation**: Provide clear setup and usage instructions

## Project Architecture

### Directory Structure
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
│   └── manage_db.py    # For future database management
└── tests/              # Test suite
    ├── __init__.py
    ├── test_app.py
    └── test_backend.py
```

### Component Details

#### Streamlit Application (`app/main.py`)
- Provides the chat interface
- Handles user input and displays responses
- Manages the chat session state
- Communicates with the OPEA backend

**Key Functions:**
```python
def initialize_session_state() -> None:
    """Initialize the Streamlit session state for chat history."""
    
def display_chat_history() -> None:
    """Display the current chat history in the UI."""
    
def handle_user_input(user_input: str) -> None:
    """Process user input and get response from LLM."""
    
def main() -> None:
    """Main application entry point."""
```

#### OPEA Client (`backend/opea_client.py`)
- Handles communication with OPEA services
- Manages model inference requests
- Processes responses from the LLM

**Key Classes and Functions:**
```python
class OPEAClient:
    """Client for interacting with OPEA services."""
    
    def __init__(self, config_path: str) -> None:
        """Initialize the OPEA client with configuration."""
        
    def generate_response(self, prompt: str) -> str:
        """Send a prompt to the LLM and get a response."""
        
    def get_model_info(self) -> dict:
        """Get information about the currently loaded model."""
```

#### Configuration (`config/`)
- `app_config.py`: Streamlit application settings
- `opea_config.py`: OPEA connection and model settings

#### Docker Deployment (`docker/`)
- `docker-compose.yml`: Defines the services for the application
- `Dockerfile`: Builds the Streamlit application container

### Integration with OPEA

#### OPEA Components Used
- **Model Service**: For loading and serving LLM models
- **Inference API**: For sending prompts and receiving responses
- **Docker Compose**: For orchestrating the services

#### Model Loading Process
1. OPEA services start via Docker Compose
2. Model is loaded from the local `models/` directory (no downloading from external sources)
3. Inference API becomes available for requests
4. Streamlit application connects to the API

#### Inference Flow
1. User enters a prompt in the Streamlit interface
2. Application sends the prompt to the OPEA Inference API
3. OPEA processes the prompt using the loaded LLM
4. Response is returned to the Streamlit application
5. Response is displayed in the chat interface

## Development Environment

### Environment Management
- Python 3.12+ via conda or pyenv
- uv for dependency management
- Virtual environments for isolation

### Dependency Management
- Core dependencies in `pyproject.toml`
- Development extras for tooling
- Version pinning through `uv.lock`

### Code Quality
- Ruff configuration in `pyproject.toml`
- MyPy strict type checking
- Google-style docstrings
- 88-character line length

### Testing Strategy
- Unit tests with pytest
- Mocked OPEA services for testing
- Integration tests for Streamlit components
- Test coverage tracking

## Deployment Considerations

### Docker Deployment
- Single-node deployment using Docker Compose
- NVIDIA GPU support through Docker runtime
- Volume mounting for local model access
- Network configuration for service communication

### Resource Requirements
- NVIDIA GPU with appropriate drivers
- Docker and Docker Compose
- Sufficient disk space for models
- Adequate memory for model loading

### Security Considerations
- Basic input validation
- Error handling for API communication
- Local-only deployment initially
- No authentication in MVP

## OPEA-Specific Configuration

### ChatQnA Implementation
- Based on the OPEA ChatQnA example
- Simplified for our minimalistic requirements
- Configured for NVIDIA GPU acceleration
- Modified to use locally stored models

### Model Configuration
- Models will be loaded from the local `models/` directory
- No downloading of models from HuggingFace or other sources
- Configuration will support switching between available local models
- NVIDIA GPU optimization settings will be applied

## Future Technical Considerations

### Database Integration
- TinyDB for conversation history (not in MVP)
- Document-based storage for chat sessions
- Simple schema for future requirements

### Scalability
- Support for multiple models
- Model switching capabilities
- Performance optimization for larger models
- Potential multi-user support

### Enhanced Features
- Conversation memory
- Context management
- Prompt templates
- Response streaming
- User preferences

### Monitoring
- Basic logging
- Error tracking
- Performance metrics
- Resource utilization monitoring
