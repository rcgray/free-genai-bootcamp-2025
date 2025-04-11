#!/bin/bash
set -e

echo "======================================================================"
echo "OPEA Chat Docker Setup Test"
echo "======================================================================"

# Define script directory and repository root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
cd "${REPO_ROOT}"

# Check if Docker is running
echo -e "\n📋 Checking if Docker is running..."
if ! docker info > /dev/null 2>&1; then
  echo "❌ Docker is not running. Please start Docker and try again."
  exit 1
else
  echo "✅ Docker is running"
fi

# Check if NVIDIA Container Toolkit is installed (optional)
echo -e "\n📋 Checking NVIDIA Container Toolkit..."
if docker run --rm --gpus all nvidia/cuda:11.0.3-base-ubuntu20.04 nvidia-smi > /dev/null 2>&1; then
  echo "✅ NVIDIA Container Toolkit is installed and working"
  HAS_GPU="true"
else
  echo "⚠️ NVIDIA Container Toolkit is not available."
  echo "   GPU acceleration will not be available."
  echo "   See: https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html"
  HAS_GPU="false"
fi

# Check if opea_comps_models volume exists
echo -e "\n📋 Checking Docker volume..."
if ! docker volume inspect opea_comps_models > /dev/null 2>&1; then
  echo "Creating Docker volume: opea_comps_models"
  docker volume create opea_comps_models
else
  echo "✅ Docker volume 'opea_comps_models' exists"
fi

# Check for model files
echo -e "\n📋 Checking for model files..."
MODELS_DIR="${REPO_ROOT}/opea-comps/models"
if [ ! -d "${MODELS_DIR}" ]; then
  mkdir -p "${MODELS_DIR}"
  echo "Created models directory: ${MODELS_DIR}"
fi

MODEL_FILES=$(find "${MODELS_DIR}" -name "*.gguf" | wc -l)
if [ "${MODEL_FILES}" -eq 0 ]; then
  echo "⚠️ No model files found in ${MODELS_DIR}"
  echo "   For a quick test, you can create a small dummy model file:"
  echo "   $ touch ${MODELS_DIR}/test-model.gguf"
  echo "   Note: This will let you test the container setup but won't work for inference."
else
  echo "✅ Found ${MODEL_FILES} model file(s)"
  find "${MODELS_DIR}" -name "*.gguf" -exec basename {} \;
fi

# Create test docker-compose.override.yml for CPU-only testing if needed
if [ "${HAS_GPU}" = "false" ]; then
  echo -e "\n📋 Creating docker-compose.override.yml for CPU-only testing..."
  cat > "${REPO_ROOT}/docker-compose.override.yml" << EOF
services:
  opea_comps_tgi:
    deploy:
      resources: {}
EOF
  echo "✅ Created override file to disable GPU requirements"
  echo "   This will allow testing on systems without GPUs"
  echo "   Note: Performance will be very slow without GPU acceleration"
fi

echo -e "\n📋 Testing minimal TGI build..."
if [ "${MODEL_FILES}" -eq 0 ]; then
  echo "⚠️ No model files found in ${MODELS_DIR}"
  echo "   You'll need to download a GGUF model file before using OPEA Chat"
  echo "   This test can verify the container setup, but a real model is required for functionality"
  
  echo -e "\n📋 Running minimal container test without a model..."
  echo "docker run --rm ghcr.io/ggerganov/llama.cpp:full echo 'Container works!'"
  if docker run --rm ghcr.io/ggerganov/llama.cpp:full echo 'Container works!'; then
    echo "✅ Base container test successful"
  else
    echo "❌ Error testing base container"
    exit 1
  fi
  
  echo ""
  echo "⚠️ No usable model files. Please download a GGUF model and place it in:"
  echo "   ${MODELS_DIR_ABS}"
else
  # Select the first model file for testing
  TEST_MODEL=$(find "${MODELS_DIR}" -name "*.gguf" | head -n 1 | xargs basename)
  
  echo -e "\n📋 Running test with model: ${TEST_MODEL}"
  echo "docker run --rm -v ${MODELS_DIR}:/models ghcr.io/ggerganov/llama.cpp:full echo 'Container works!'"
  if docker run --rm -v "${MODELS_DIR}:/models" ghcr.io/ggerganov/llama.cpp:full echo 'Container works!'; then
    echo "✅ Base container test successful"
  else
    echo "❌ Error testing base container"
    exit 1
  fi
  
  echo ""
  echo "✅ Model file '${TEST_MODEL}' is available for use."
fi

echo -e "\n======================================================================"
echo "✅ Setup test complete! Configuration appears valid."
echo "To run OPEA Chat with minimal setup:"
echo "MODEL_FILE=${TEST_MODEL} docker compose up -d opea_comps_tgi opea_comps_backend opea_comps_app"
echo ""
echo "Note: For actual functioning LLM inference, you'll need a real GGUF model file."
echo "Download links are provided in the model-setup.sh script."
echo "======================================================================" 