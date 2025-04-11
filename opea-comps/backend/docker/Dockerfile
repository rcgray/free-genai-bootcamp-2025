FROM python:3.12-slim

WORKDIR /app

# Install required packages
RUN apt-get update && \
    apt-get install -y curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy requirements file
COPY opea-comps/backend/requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend code
COPY opea-comps/backend/chatqna /app/chatqna
# COPY opea-comps/backend/config /app/config # This directory does not exist and appears unused

# Set environment variables
ENV PYTHONPATH=/app
ENV PYTHONUNBUFFERED=1

# Expose port
EXPOSE 8888

# Run the ChatQnA service
CMD ["python", "-m", "chatqna.service"]
