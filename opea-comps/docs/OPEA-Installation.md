# OPEA Installation Guide

This document explains how to properly install the OPEA (Open Platform for Enterprise AI) components for our chat application.

## Understanding OPEA Installation

Based on our exploration, we've discovered that OPEA components are not available as standard PyPI packages. Instead, they need to be installed from the OPEA GitHub repositories.

## Installation Steps

### 1. Clone OPEA Repositories

First, we need to clone the necessary OPEA repositories:

```bash
# Create a directory for OPEA repositories
mkdir -p opea-repos
cd opea-repos

# Clone the GenAIComps repository
git clone https://github.com/opea-project/GenAIComps.git

# Clone the GenAIExamples repository for reference
git clone https://github.com/opea-project/GenAIExamples.git

# Return to the project root
cd ..
```

### 2. Install GenAIComps

Install the core OPEA components from the GenAIComps repository:

```bash
# Navigate to the GenAIComps directory
cd opea-repos/GenAIComps

# Install GenAIComps requirements
uv pip install -r requirements.txt

# Install GenAIComps in development mode
uv pip install -e .

# Return to the project root
cd ../..
```

### 3. Understanding ChatQnA Dependencies

After examining the ChatQnA directory, we found that it does not have a `requirements.txt` file. Looking at the Dockerfile, we can see that ChatQnA primarily depends on GenAIComps, which we've already installed in the previous step.

The Dockerfile shows that ChatQnA:
1. Uses Python 3.11
2. Installs GenAIComps and its dependencies
3. Uses the chatqna.py script as its entry point

Since we've already installed GenAIComps and its dependencies, we should have the necessary packages to run ChatQnA. If there are additional dependencies, they will be identified when we try to run the service.

### 4. Configure Environment

Make sure your environment is properly configured:

```bash
# Create necessary directories if they don't exist
mkdir -p models opea_cache opea_logs

# Ensure you have the models in the models directory
# Meta-Llama-3.2-3B-Instruct-Q6_K_L.gguf should be in the models directory
```

## Running the ChatQnA Example

To understand how OPEA works, try running the ChatQnA example directly:

```bash
# Navigate to the ChatQnA directory
cd opea-repos/GenAIExamples/ChatQnA

# Read the README.md file for specific instructions on running the service
# Based on the Dockerfile, the typical command might be:
python chatqna.py

# Check the README for the exact command and any required environment variables
```

## Recommended Approach: Using Docker

For a more reliable approach, use Docker with the provided configurations:

```bash
# Navigate to the Docker Compose directory for NVIDIA GPU
cd opea-repos/GenAIExamples/ChatQnA/docker_compose/nvidia/gpu

# Set up environment variables
source set_env.sh

# Review and modify docker-compose.yml if needed to point to your models

# Start the Docker containers
docker compose up
```

## Troubleshooting

### Common Installation Issues

1. **Missing Dependencies**:
   - If running ChatQnA directly produces import errors, check which packages are missing
   - Install missing packages individually: `uv pip install <package_name>`
   - Reference the Dockerfile for clues about required dependencies

2. **Dependency Conflicts**:
   - If you encounter dependency conflicts, try creating a fresh virtual environment
   - Make sure you have the correct Python version (3.11 as specified in the Dockerfile)

3. **CUDA Issues**:
   - Ensure you have the appropriate CUDA toolkit installed
   - Check that your NVIDIA drivers are up to date

4. **Missing Files or Directories**:
   - Repository structure may change; always check the actual repository
   - Refer to the README files in each component for the most up-to-date instructions

## Next Steps

After successfully installing the OPEA components:

1. Verify installation by running the ChatQnA example
2. Study how the ChatQnA example works and its architecture
3. Configure our application based on the understanding gained

## References

- [OPEA GitHub Repository](https://github.com/opea-project/GenAIComps)
- [GenAI Examples Repository](https://github.com/opea-project/GenAIExamples)
- [ChatQnA Documentation](https://opea-project.github.io/latest/tutorial/ChatQnA/ChatQnA_Guide.html) 