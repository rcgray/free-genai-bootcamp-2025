FROM python:3.12-slim

WORKDIR /app

# Install required packages
RUN apt-get update && \
    apt-get install -y curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy requirements file
COPY backend/requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend code
COPY backend/chatqna /app/chatqna
COPY backend/config /app/config

# Set environment variables
ENV PYTHONPATH=/app
ENV PYTHONUNBUFFERED=1

# Expose port
EXPOSE 8888

# Run the ChatQnA service
CMD ["python", "-m", "chatqna.service"] 