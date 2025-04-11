FROM python:3.11-slim

WORKDIR /app

# Create required directories
RUN mkdir -p data media

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy only requirements files first for better layer caching
COPY listening-comp/pyproject.toml listening-comp/requirements.txt* ./

# Copy README.md which is required for installation
COPY listening-comp/README.md ./

# Install dependencies - using pip directly instead of uv
RUN pip install --no-cache-dir -e .

# Copy application code
COPY listening-comp/backend ./backend
COPY listening-comp/frontend ./frontend
COPY listening-comp/scripts ./scripts
COPY listening-comp/.streamlit ./.streamlit

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app

# Expose Streamlit port
EXPOSE 8501

# Set entry point
CMD ["streamlit", "run", "frontend/app.py", "--server.port=8501", "--server.address=0.0.0.0"] 