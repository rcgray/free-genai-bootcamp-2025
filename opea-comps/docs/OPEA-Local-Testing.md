# Testing OPEA Installation Locally

This document outlines the steps to test the OPEA installation locally without Docker, as part of Phase 1.2 of our implementation plan.

## Prerequisites

Before testing, ensure you have the following:

1. Python 3.12+ installed
2. NVIDIA GPU with appropriate drivers (for GPU acceleration)
3. CUDA toolkit installed and configured
4. Local LLM models in the `models/` directory (at least one of the following):
   - Meta-Llama-3.1-8B-Instruct-Q6_K_L.gguf
   - Meta-Llama-3.2-1B-Instruct-Q6_K_L.gguf
   - Meta-Llama-3.2-3B-Instruct-Q6_K_L.gguf
   - Microsoft-Phi-4-Mini-Instruct-Q6_K_L.gguf

## Installation Steps

### 1. Install OPEA and Dependencies

Make sure all the required dependencies are installed:

```bash
# Navigate to project directory
cd opea-comps

# Use uv to install dependencies from pyproject.toml
uv sync
```

### 2. Setup OPEA Local Service

We need to run a local instance of the OPEA service to interact with our models. Following the ChatQnA example:

```bash
# Install the Genai Bridge package (should already be in dependencies)
uv pip install genai-bridge

# Run the OPEA service locally 
uv python -m genai_bridge --config config/local_config.yaml
```

Note: The actual command may differ depending on the specific OPEA setup requirements we discover during testing.

## Testing OPEA Integration

We've created a test script to verify our OPEA integration. This script checks various aspects of the OPEA service:

1. Service availability
2. Model listing
3. Model information retrieval
4. Response generation

### Running the Test Script

```bash
# Basic service check
./scripts/test_opea.py --test service

# List available models
./scripts/test_opea.py --test models

# Get information about a specific model
./scripts/test_opea.py --test info --model "Meta-Llama-3.2-3B-Instruct"

# Generate a response with a specific prompt
./scripts/test_opea.py --test generate --prompt "Explain how to implement merge sort in Python"

# Run all tests
./scripts/test_opea.py --prompt "What is the capital of France?"
```

### Test Script Options

| Option | Description | Default |
|--------|-------------|---------|
| `--host` | OPEA API host | localhost |
| `--port` | OPEA API port | 8000 |
| `--model` | Model name to use | (default from config) |
| `--prompt` | Prompt to send to the model | (required for generate test) |
| `--timeout` | Request timeout in seconds | 60 |
| `--test` | Test to run (service, models, info, generate, all) | all |

## Troubleshooting

### Common Issues

1. **Service Not Available**:
   - Verify that the OPEA service is running
   - Check the host and port settings
   - Ensure there are no firewall issues

2. **Model Not Found**:
   - Verify the model exists in the models directory
   - Check model name spelling and format
   - Ensure the model is compatible with OPEA

3. **GPU Acceleration Issues**:
   - Verify CUDA installation
   - Check GPU drivers
   - Monitor GPU usage during inference

4. **Response Generation Failures**:
   - Check prompt format
   - Verify model loading was successful
   - Look for error messages in the OPEA service logs

### Logging

To enable more detailed logging, modify the logging level in the test script:

```python
# In scripts/test_opea.py, change:
logging.basicConfig(
    level=logging.DEBUG,  # Change from INFO to DEBUG
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
```

## Next Steps

After successfully testing the OPEA installation locally:

1. Document any issues encountered and their solutions
2. Optimize configuration for better performance
3. Proceed to implementing the Streamlit interface
4. Prepare for Docker-based deployment

## References

- OPEA Documentation: [Getting Started with OPEA](https://opea-project.github.io/latest/getting-started/README.html)
- ChatQnA Guide: [ChatQnA Overview](https://opea-project.github.io/latest/tutorial/ChatQnA/ChatQnA_Guide.html)
- OPEA GitHub Repositories:
  - [GenAIComps](https://github.com/opea-project/GenAIComps)
  - [GenAIExamples](https://github.com/opea-project/GenAIExamples) 