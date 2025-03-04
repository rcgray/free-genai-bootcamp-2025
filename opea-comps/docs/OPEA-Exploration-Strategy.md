# OPEA Exploration Strategy

Based on our initial findings, this document outlines a revised strategy for exploring and testing OPEA locally.

## Key Findings

1. **Installation Approach**: OPEA components are not available as standard PyPI packages but must be installed from source via GitHub repositories.

2. **Repository Structure**: The OPEA project is split into multiple repositories:
   - `GenAIComps`: Core components and libraries
   - `GenAIExamples`: Example applications and use cases, including ChatQnA

3. **Integration Complexity**: Integration requires understanding both the core components and example applications to extract the minimal required functionality.

## ChatQnA Structure

The ChatQnA example in the GenAIExamples repository has the following structure:

- `chatqna.py`: Main implementation file for the ChatQnA service
- `docker_compose`: Docker-based deployment configurations for different hardware (NVIDIA, Intel, AMD)
- `ui`: User interface components
- `tests`: Test files for the ChatQnA service
- `Dockerfile`: Contains information about dependencies and setup
- Other supporting files and directories

Note that there is no `requirements.txt` file in the ChatQnA directory; dependency information must be gathered from the Dockerfile and other sources.

## Revised Exploration Strategy

### Step 1: Clone and Explore OPEA Repositories

```bash
# Create a directory for OPEA repositories
mkdir -p opea-repos
cd opea-repos

# Clone the repositories
git clone https://github.com/opea-project/GenAIComps.git
git clone https://github.com/opea-project/GenAIExamples.git

# Return to the project root
cd ..
```

### Step 2: Install GenAIComps

Since ChatQnA depends on GenAIComps, we need to install it first:

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

### Step 3: Learn from ChatQnA Example Implementation

The ChatQnA example has an integrated architecture that we need to understand:

1. **Main Service Implementation**: The `chatqna.py` file contains the core service logic
2. **Docker Configuration**: The docker_compose directory contains deployment configurations
3. **UI Components**: The ui directory contains frontend components
4. **Dockerfile**: Contains information about dependencies and environment

Study these files to gain an understanding of the architecture and dependencies.

### Step 4: Test the ChatQnA Example

Start by testing the ChatQnA example directly:

```bash
# Navigate to the ChatQnA directory
cd opea-repos/GenAIExamples/ChatQnA

# Study the README.md file for instructions on running the service
# Based on the Dockerfile, the typical command might be:
python chatqna.py

# If there are import errors, install missing dependencies individually
```

### Step 5: Understand the API and Service Structure

Study the `chatqna.py` file to understand:
- How the service is structured
- How it handles requests
- How it integrates with the LLM backend
- What dependencies it requires

If running the service directly results in import errors, note these dependencies for installation.

### Step 6: Adapt Configuration and Integration

Once we understand how the components work:

1. Extract the key components needed for our use case
2. Adapt the configuration for our specific requirements
3. Implement a simplified version in our project

## Alternative Approach: Docker-Based Testing

For a more reliable approach that handles dependencies automatically, use the provided Docker configurations:

```bash
# Navigate to the Docker Compose directory for NVIDIA GPU
cd opea-repos/GenAIExamples/ChatQnA/docker_compose/nvidia/gpu

# Set up environment variables
source set_env.sh

# Review and modify the docker-compose.yml file as needed
# For example, update volume mounts to point to our models directory

# Start the Docker containers
docker compose up
```

## Next Steps

1. **Study Repository Structure**: Carefully examine the actual structure of the repositories
2. **Examine READMEs**: Read all README files to understand setup requirements
3. **Test the Example**: Try running the ChatQnA example using both direct and Docker approaches
4. **Document Dependencies**: Record any dependencies discovered through testing
5. **Document Findings**: Record what works and what doesn't for future reference

## Success Criteria for Exploration Phase

1. Successfully run the ChatQnA service with a local model
2. Understand how the service is implemented and its architecture
3. Identify all required dependencies for running the service directly
4. Generate responses through the service
5. Document the key components and their configurations

## Resources

- [GenAIComps Repository](https://github.com/opea-project/GenAIComps)
- [GenAIExamples Repository](https://github.com/opea-project/GenAIExamples)
- [ChatQnA Documentation](https://opea-project.github.io/latest/tutorial/ChatQnA/ChatQnA_Guide.html)
- [OPEA Getting Started Guide](https://opea-project.github.io/latest/getting-started/README.html) 