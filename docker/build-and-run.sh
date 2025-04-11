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
docker compose build

# Start all containers
echo -e "\n🚀 Starting application containers..."
if [[ "${RUN_OPEA}" == "true" ]]; then
  echo "Starting with OPEA Chat services..."
  MODEL_FILE="${MODEL_FILE}" docker compose up -d
else
  echo "Starting without OPEA Chat services..."
  docker compose up -d lang_portal_backend lang_portal_frontend listening_comp_app visual_novel_game visual_novel_server
fi

echo -e "\n✅ Containers are now running!"
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

echo -e "\nTo check container status: docker ps"
echo "To view container logs: docker logs <container-name>"
echo "To stop all containers: docker compose down"
echo -e "\nRunning specific services:"
echo "To run only the Language Portal: docker compose up -d lang_portal_backend lang_portal_frontend"
echo "To run only the Listening App: docker compose up -d listening_comp_app"
echo "To run only OPEA Chat: MODEL_FILE=<your-model-file> docker compose up -d opea_comps_tgi opea_comps_backend opea_comps_app"
echo "To run only Visual Novel: docker compose up -d visual_novel_game visual_novel_server"
echo "To stop specific services: docker compose stop <service-name>" 