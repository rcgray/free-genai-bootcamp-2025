#!/bin/bash
set -e

echo "======================================================================"
echo "OPEA Chat Model Setup"
echo "======================================================================"

# Define script directory and repository root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
cd "${REPO_ROOT}"

# Create models directory if it doesn't exist
echo -e "\n📋 Setting up models directory..."
MODELS_DIR="${REPO_ROOT}/opea-comps/models"
if [ ! -d "${MODELS_DIR}" ]; then
  mkdir -p "${MODELS_DIR}"
  echo "Created models directory: ${MODELS_DIR}"
else
  echo "✅ Models directory exists: ${MODELS_DIR}"
fi

# Create Docker volume if it doesn't exist
echo -e "\n📋 Setting up Docker volume..."
if ! docker volume inspect opea_comps_models > /dev/null 2>&1; then
  echo "Creating Docker volume: opea_comps_models"
  docker volume create opea_comps_models
else
  echo "✅ Docker volume 'opea_comps_models' exists"
fi

# Check for model files
echo -e "\n📋 Checking for model files..."
MODEL_FILES=$(find "${MODELS_DIR}" -name "*.gguf" | wc -l)

if [ "${MODEL_FILES}" -eq 0 ]; then
  echo -e "\n❌ No GGUF model files found in ${MODELS_DIR}"
  echo -e "\nYou need to download a GGUF model file to use OPEA Chat."
  echo -e "\nRecommended models:"
  echo "1. Llama 3.2 3B Instruct - Smaller, faster model (1.6GB)"
  echo "2. Llama 3.1 8B Instruct - Medium size, good performance (4.1GB)"
  echo ""
  echo "   https://huggingface.co/bartowski/Llama-3.2-3B-Instruct-GGUF"
  echo ""
  echo "To download a model, use:"
  echo "wget -P ${MODELS_DIR} https://huggingface.co/bartowski/Llama-3.2-3B-Instruct-GGUF/resolve/main/Meta-Llama-3.2-3B-Instruct-Q6_K_L.gguf"
  echo ""
  echo "Once downloaded, you can start OPEA Chat with:"
  echo "MODEL_FILE=Meta-Llama-3.2-3B-Instruct-Q6_K_L.gguf docker compose up -d opea_comps_tgi opea_comps_backend opea_comps_app"
else
  echo -e "\n✅ Found ${MODEL_FILES} GGUF model file(s) in ${MODELS_DIR}:"
  find "${MODELS_DIR}" -name "*.gguf" -printf "   - %f (%s bytes)\n"
  
  # Select the first model file for example
  EXAMPLE_MODEL=$(find "${MODELS_DIR}" -name "*.gguf" | head -n 1 | xargs basename)
  
  echo -e "\nTo start OPEA Chat with one of these models, use:"
  echo "MODEL_FILE=${EXAMPLE_MODEL} docker compose up -d opea_comps_tgi opea_comps_backend opea_comps_app"
  echo ""
  echo "Or to run as part of the complete stack:"
  echo "MODEL_FILE=${EXAMPLE_MODEL} docker compose up -d"
fi

echo -e "\n======================================================================"
echo "Model setup complete!"
echo "======================================================================" 