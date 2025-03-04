# Implementation Action Plan

This action plan outlines the step-by-step process for building our OPEA-based LLM Chat Application, with a focus on creating a minimalistic MVP that demonstrates the successful use of OPEA tools and the ChatQnA examples.

## Phase 1: Environment Setup and OPEA Integration ✅

### 1.1 Development Environment Setup
- [x] Set up Python 3.12+ environment with conda or pyenv
- [x] Configure uv for dependency management
- [x] Create initial pyproject.toml with dependencies
- [x] Set up Ruff and MyPy configurations
- [x] Create basic project structure following technical spec
- [x] Set up Git repository with appropriate .gitignore

### 1.2 OPEA Exploration and Testing
- [x] Study OPEA documentation and ChatQnA examples
- [x] Document key OPEA components and their functions
- [x] Clone and install OPEA repositories locally
- [x] Test OPEA installation locally without Docker
- [x] Experiment with basic OPEA commands and APIs
- [x] Identify minimal required components for our MVP

### 1.3 Docker Configuration
- [x] Create basic Docker files (Dockerfile and docker-compose.yml)
- [x] Set up Docker and Docker Compose
- [x] Configure NVIDIA GPU support for Docker
- [x] Test Docker setup with simple OPEA components

### 1.4 Local Model Integration
- [x] Create models directory structure
- [x] Document model requirements and formats
- [x] Test loading a local model with OPEA
- [x] Configure model paths in OPEA settings
- [x] Verify GPU acceleration is working

## Phase 2: Core Backend Implementation ✅

### 2.1 Backend Service Implementation
- [x] Create backend/chatqna service module
- [x] Implement FastAPI service
- [x] Add llama.cpp integration
- [x] Implement chat completion endpoint
- [x] Create Docker configuration for the service
- [x] Implement health check endpoint
- [x] Add error handling for API communication

### 2.2 Command-Line Testing
- [x] Create a simple CLI script for testing (test.sh)
- [x] Implement basic prompt-response functionality
- [x] Test with different prompt formats
- [x] Document successful configurations
- [x] Create a setup script for easy deployment (setup.sh)

### 2.3 Model Configuration
- [x] Test compatibility with a local LLM model
- [x] Document model-specific configurations
- [x] Optimize model loading and inference settings

## Phase 3: Streamlit Application Development 🟡

### 3.1 Basic Streamlit Setup
- [ ] Create app/main.py with minimal structure
- [ ] Set up session state management
- [ ] Create basic page layout
- [ ] Implement simple header and footer
- [ ] Add application configuration loading

### 3.2 Chat Interface
- [ ] Create chat message display component
- [ ] Implement user input form
- [ ] Add basic styling for chat messages
- [ ] Create loading/processing indicators
- [ ] Implement error message display

### 3.3 OPEA Integration in UI
- [ ] Connect Streamlit app to OPEA client
- [ ] Implement response generation and display
- [ ] Add model information display
- [ ] Create simple response caching
- [ ] Implement basic error handling

## Phase 4: Testing and Refinement 🟡

### 4.1 Unit Testing
- [ ] Set up pytest infrastructure
- [ ] Create tests for OPEA client
- [ ] Add tests for Streamlit components
- [ ] Implement mocks for OPEA services
- [ ] Add test documentation

### 4.2 Performance Optimization
- [ ] Measure response times
- [ ] Optimize model loading
- [ ] Improve UI responsiveness
- [ ] Document performance characteristics
- [ ] Identify bottlenecks for future improvement

### 4.3 Error Handling and Resilience
- [ ] Improve error messages
- [ ] Add retry mechanisms for API failures
- [ ] Implement graceful degradation
- [ ] Create user-friendly error displays
- [ ] Document common errors and solutions

## Phase 5: Documentation and Deployment 🟡

### 5.1 User Documentation
- [x] Create setup instructions
- [x] Document application usage
- [ ] Add troubleshooting guide
- [x] Create model configuration guide
- [x] Document Docker deployment process

### 5.2 Developer Documentation
- [x] Document code structure
- [x] Create API documentation
- [ ] Add development setup guide
- [ ] Document testing procedures
- [ ] Create contribution guidelines

### 5.3 Deployment Preparation
- [x] Finalize Docker configuration
- [x] Create deployment scripts
- [ ] Document resource requirements
- [ ] Add security considerations
- [ ] Create backup and restore procedures

## Future Phases 🔮

### 6.1 Enhanced Features
- [ ] Add conversation memory
- [ ] Implement model switching
- [ ] Create prompt templates
- [ ] Add response streaming
- [ ] Implement system prompts

### 6.2 Database Integration
- [ ] Set up TinyDB for conversation history
- [ ] Create database schema
- [ ] Implement conversation saving
- [ ] Add conversation loading
- [ ] Create database management utilities

### 6.3 Advanced UI
- [ ] Improve chat interface design
- [ ] Add dark/light mode
- [ ] Implement responsive design
- [ ] Create advanced message formatting
- [ ] Add keyboard shortcuts

## Current Testing Instructions

Follow these steps to test the backend service:

### 1. Prerequisites

- Docker and Docker Compose installed
- NVIDIA GPU with drivers installed
- LLM models in GGUF format (Meta-Llama-3.2-3B-Instruct-Q6_K_L.gguf is used by default)

### 2. Clone the Repository

```bash
git clone <repository-url>
cd opea-comps
```

### 3. Set Up Model Files

Place your GGUF model files in the `models/` directory:
```bash
# Example for Meta-Llama-3.2-3B-Instruct model
cp /path/to/your/model/Meta-Llama-3.2-3B-Instruct-Q6_K_L.gguf models/
```

### 4. Start the Backend Service

Run the setup script:
```bash
./backend/setup.sh
```

This will:
- Check for the required model files
- Set up the necessary environment variables
- Start the Docker containers
- Display the service status

### 5. Test the Backend Service

To test that the backend service is working correctly:
```bash
./backend/test.sh
```

This will send a test query to the API and display the response.

### 6. Manually Test with Curl (Optional)

You can also manually test the API using curl:
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Tell me a short joke"}],"stream":false,"context":[],"meta":{"auth_token":""}}' \
  http://localhost:8888/v1/chatqna | jq
```

### 7. Common Issues

If you encounter issues:

1. **Docker containers conflicts**:
   - Stop any existing containers with `docker compose down` or `docker rm -f <container-name>`
   - Check running containers with `docker ps -a`

2. **Model loading issues**:
   - Verify model files exist in the models directory
   - Check Docker logs with `docker logs tgi-server` or `docker logs chatqna-backend-server`

3. **API connectivity issues**:
   - Ensure the service is running with `curl http://localhost:8888/health`
   - Check for port conflicts using `netstat -tulpn | grep 8888`

## Notes

### Priority Levels
- 🔴 Critical Path (MVP Core)
- 🟡 High Priority (MVP Enhancement)
- 🟢 Medium Priority (Documentation & Deployment)
- 🔮 Future Enhancement
- ✅ Completed

### Implementation Approach
1. ✅ Focus first on getting the backend service working with local models
2. 🟡 Next step: integrate with Streamlit for a simple UI
3. 🟢 Finally, refine and document the solution

### Key Success Criteria
- ✅ Successfully load and use local LLM models with llama.cpp
- ✅ Achieve reasonable response times with GPU acceleration
- 🟡 Create a simple but functional chat interface
- ✅ Document the setup and usage process clearly
