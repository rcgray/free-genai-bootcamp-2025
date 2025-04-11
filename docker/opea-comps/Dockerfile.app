FROM python:3.12-slim

WORKDIR /app

# Install required packages
RUN apt-get update && \
    apt-get install -y curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy requirements and app code
COPY opea-comps/pyproject.toml .
COPY opea-comps/app ./app

# Install dependencies
RUN pip install --no-cache-dir streamlit requests

# Expose Streamlit port
EXPOSE 8501

# Set environment variables
ENV PYTHONPATH=/app
ENV PYTHONUNBUFFERED=1
ENV BACKEND_URL=http://opea_comps_backend:8888

# Run the Streamlit app
CMD ["streamlit", "run", "app/main.py", "--server.port=8501", "--server.address=0.0.0.0"] 