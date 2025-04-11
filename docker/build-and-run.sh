#!/bin/bash
# build-and-run.sh - Helper script to build and run all project containers
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
cd "${REPO_ROOT}"

echo "======================================================================"
echo "Building and running containers for Free GenAI Bootcamp 2025 projects"
echo "======================================================================"
echo "Projects containerized: Language Portal, Listening App, OPEA Chat, Visual Novel"
echo "All phases of containerization plan are now complete!"
echo "======================================================================"

# Check OPEA models
echo -e "\n📦 Checking OPEA Chat models..."
${SCRIPT_DIR}/opea-comps/model-setup.sh
if [[ -z "${MODEL_FILE}" ]]; then
  # Try to find a model file
  if [ -d "${REPO_ROOT}/opea-comps/models" ]; then
    MODEL_FILE=$(find "${REPO_ROOT}/opea-comps/models" -name "*.gguf" | head -n 1 | xargs basename 2>/dev/null)
  fi

  if [[ -z "${MODEL_FILE}" ]]; then
    echo "⚠️  No MODEL_FILE specified and no models found. OPEA Chat will not be started."
    echo "    Download a model and place it in opea-comps/models/"
    echo "    Then run: MODEL_FILE=your-model-file.gguf ./docker/build-and-run.sh"
    RUN_OPEA="false"
  else
    echo "✅ Found model file: ${MODEL_FILE}"
    echo "    Will use this model for OPEA Chat"
    RUN_OPEA="true"
  fi
else
  echo "✅ Using specified model: ${MODEL_FILE}"
  # Verify the model file exists
  if [ ! -f "${REPO_ROOT}/opea-comps/models/${MODEL_FILE}" ]; then
    echo "⚠️  Warning: Model file ${MODEL_FILE} not found in opea-comps/models/"
    echo "    Please check that the file exists before starting OPEA Chat"
    echo "    OPEA Chat services will be started but may fail if the model is missing"
  fi
  RUN_OPEA="true"
fi

# Check Visual Novel LLM API key
if [[ -z "${LLM_API_KEY}" ]]; then
  echo -e "\n⚠️  No LLM_API_KEY specified for Visual Novel."
  echo "    The Visual Novel will still run, but language learning features will not work properly."
  echo "    To enable language learning features, set: LLM_API_KEY=your_api_key ./docker/build-and-run.sh"
else
  echo -e "\n✅ LLM API key provided for Visual Novel."
fi

# Build all containers
echo -e "\n📦 Building all application containers..."

# Determine if GPU support should be enabled
COMPOSE_FILES="-f docker-compose.yml"
if command -v nvidia-smi &> /dev/null; then
    echo "✅ NVIDIA GPU detected. Enabling GPU support for OPEA Chat."
    COMPOSE_FILES="${COMPOSE_FILES} -f docker/docker-compose.gpu.yml"
else
    echo "ℹ️ No NVIDIA GPU detected or nvidia-smi not found. Running OPEA Chat on CPU."
fi

# Build containers using the determined compose files
docker compose ${COMPOSE_FILES} build

# Start all containers
echo -e "\n🚀 Starting application containers..."
if [[ "${RUN_OPEA}" == "true" ]]; then
  echo "Starting all services (Language Portal, Listening App, OPEA Chat, Visual Novel)..."
  # Activate ALL profiles, using the determined compose files
  MODEL_FILE="${MODEL_FILE}" docker compose ${COMPOSE_FILES} --profile lang_portal --profile listening_comp --profile opea --profile visual_novel up -d
else
  echo "Starting without OPEA Chat services (Language Portal, Listening App, Visual Novel)..."
  # Activate lang_portal, listening_comp, and visual_novel profiles (GPU file doesn't affect these)
  docker compose ${COMPOSE_FILES} --profile lang_portal --profile listening_comp --profile visual_novel up -d
fi

echo -e "\n✅ Containers should now be running or starting!"
echo "---------------------------------------------------------------------"
echo "Language Learning Portal:"
echo "- Frontend: http://localhost:3000"
echo "- Backend API: http://localhost:8000"
echo "- API Documentation: http://localhost:8000/docs"
echo "---------------------------------------------------------------------"
echo "Japanese Listening App:"
echo "- Streamlit App: http://localhost:8501"
echo "---------------------------------------------------------------------"
if [[ "${RUN_OPEA}" == "true" ]]; then
  echo "OPEA Chat:"
  echo "- Chat Interface: http://localhost:8502"
  echo "- Backend API: http://localhost:8888"
  echo "- TGI Service: http://localhost:8008"
  echo "---------------------------------------------------------------------"
fi
echo "Visual Novel:"
echo "- Game: http://localhost:8080"
echo "- LLM Proxy Server: http://localhost:3011"
echo "---------------------------------------------------------------------"

echo -e "\nTo check container status: docker ps -a"
echo "To view container logs: docker logs <container-name>"
echo "To stop all containers: docker compose ${COMPOSE_FILES} down"
echo -e "\nRunning specific services (using profiles):"
echo "To run only the Language Portal: docker compose ${COMPOSE_FILES} --profile lang_portal up -d"
echo "To run only the Listening App: docker compose ${COMPOSE_FILES} --profile listening_comp up -d"
echo "To run only OPEA Chat: MODEL_FILE=<your-model-file> docker compose ${COMPOSE_FILES} --profile opea up -d"
echo "To run only Visual Novel: docker compose ${COMPOSE_FILES} --profile visual_novel up -d"
echo "To stop specific services: docker compose stop <service-name>"
echo "To stop all services (including profiled ones): docker compose ${COMPOSE_FILES} down"
