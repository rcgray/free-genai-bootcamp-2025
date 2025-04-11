# Docker Containerization Plan for Free GenAI Bootcamp 2025

This document outlines the comprehensive plan for containerizing the projects within the Free GenAI Bootcamp 2025 repository. The containerization approach uses Docker and Docker Compose to create a standardized, portable environment for each project.

## Project Overview

The repository contains four main projects that need containerization:

1. **Language Learning Portal** (`lang-portal/`) - A full-stack web application with a FastAPI backend, React frontend, and SQLite database
2. **Japanese Listening App** (`listening-comp/`) - A Streamlit application for processing Japanese audio content
3. **OPEA Chat** (`opea-comps/`) - A LLM chat application already using Docker containers
4. **Visual Novel** (`visual-novel/`) - A Phaser-based game with an LLM proxy server

## Updated Containerization Strategy

Based on our experience with the first two projects, we've refined our containerization approach:

### Monorepo Docker Best Practices

1. **Single docker-compose.yml in Root**: We will maintain a single docker-compose.yml file in the repository root that defines ALL services across ALL projects.

2. **Consistent Service Naming**: Services should follow a consistent naming pattern:
   - `<project>_<component>`: e.g., `lang_portal_backend`, `lang_portal_frontend`, `listening_comp_app`
   - This makes it clear which services belong to which projects

3. **Service-Specific Commands**: For running individual services:
   - Use `docker compose up -d <service_name> [<service_name>...]` 
   - Example: `docker compose up -d lang_portal_backend lang_portal_frontend`
   - Example: `docker compose up -d listening_comp_app`

4. **Project-Specific Docker Files**: Each project's Dockerfiles and .dockerignore files remain in the `docker/<project>/` directory

5. **Consistent Documentation**: All README files should reference the master docker-compose.yml:
   - Main README.md includes commands for running all services or specific project services
   - Project READMEs reference service names from the main docker-compose.yml

6. **No Project-Specific docker-compose.yml Files**: We're eliminating separate docker-compose.yml files for individual projects to maintain consistency

### Lessons Learned

From our implementation of the first two projects, we've learned:

1. **Avoid Duplicate docker-compose Files**: Multiple docker-compose.yml files lead to confusion and inconsistent documentation.

2. **Standardize Service References**: All documentation and scripts should reference the same service names consistently.

3. **Clear Volume Descriptions**: Include clear comments in the docker-compose.yml describing what each volume stores.

4. **Modular Service Architecture**: Design services to be runnable independently or as part of the complete stack.

5. **Consolidated Helper Script**: The build-and-run.sh script should provide clear instructions for both full-stack and individual service execution.

## Directory Structure

```
free-genai-bootcamp-2025/
├── docker-compose.yml      # SINGLE compose file for ALL services
├── docker/
│   ├── build-and-run.sh    # Script to run all containers
│   ├── lang-portal/
│   │   ├── Dockerfile.backend   # Backend container definition
│   │   ├── Dockerfile.frontend  # Frontend container definition
│   │   └── .dockerignore        # Files to exclude from build
│   ├── listening-comp/
│   │   ├── Dockerfile           # Container definition
│   │   └── .dockerignore        # Files to exclude from build
│   ├── opea-comps/              # To be implemented
│   └── visual-novel/            # To be implemented
```

## Implementation Strategy for Remaining Projects

For the remaining two projects (OPEA Chat and Visual Novel), we will:

1. Create the necessary Dockerfiles in their respective `docker/<project>/` directories
2. Add their services to the main docker-compose.yml file using consistent naming
3. Update the build-and-run.sh script to include the new services
4. Update all README files to reference the correct service names

This consolidated approach will ensure consistency across all projects while providing flexibility for users to run individual services as needed.

## Documentation Strategy

To maintain consistency and avoid duplication, we'll use the following documentation approach:

1. **Main README.md**: Contains:
   - Overview of all containerized projects
   - Instructions for running the complete stack: `docker compose up -d`
   - Instructions for running specific services: `docker compose up -d <service_name>`
   - Links to project-specific READMEs for details

2. **Project README.md files**: Each project's README will:
   - Include a "Docker Setup" section with specific service names
   - Use consistent commands referencing the main docker-compose.yml file
   - Explain project-specific environment variables or volumes

3. **build-and-run.sh**: Will provide:
   - Commands for building and running all services
   - Examples of running specific services
   - URLs and ports for accessing each application

This standardized approach ensures that users receive consistent instructions regardless of which README they read.

## Detailed Implementation Plan

### 1. Language Learning Portal

#### Container Architecture

The Language Learning Portal will use a two-container architecture:

1. **Backend Container**: FastAPI + SQLite + Alembic + Python dependencies
2. **Frontend Container**: Nginx + Node.js for building React application

#### Dockerfile.backend

```dockerfile
FROM python:3.12-slim

WORKDIR /app

# Copy only the backend requirements and install them
COPY lang-portal/backend-fastapi/pyproject.toml .
COPY lang-portal/backend-fastapi/setup.py .
COPY lang-portal/backend-fastapi/app ./app
COPY lang-portal/backend-fastapi/alembic.ini .
COPY lang-portal/backend-fastapi/alembic ./alembic

# Copy scripts
COPY lang-portal/scripts/db ./scripts/db

# Create data directory
RUN mkdir -p data

# Install dependencies
RUN pip install --no-cache-dir -e .

# Copy sample database if needed
COPY lang-portal/data/empty.db ./data/empty.db

# Expose API port
EXPOSE 8000

# Run the application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

#### Dockerfile.frontend

```dockerfile
# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files and install dependencies
COPY lang-portal/frontend-react/package.json .
COPY lang-portal/frontend-react/yarn.lock .
RUN yarn install

# Copy the rest of the frontend code
COPY lang-portal/frontend-react/ .

# Build the frontend
RUN yarn build

# Production stage
FROM nginx:alpine

# Copy built frontend from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
```

#### docker-compose.yml

```yaml
services:
  lang_portal_backend:
    build:
      context: .
      dockerfile: docker/lang-portal/Dockerfile.backend
    image: lang-portal-backend
    container_name: lang-portal-backend
    volumes:
      - lang_portal_data:/app/data
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=sqlite:///./data/lang_portal.db
      - API_V1_PREFIX=/api
      - ENVIRONMENT=production
      - DEBUG=false
      - FRONTEND_URL=http://localhost:3000
    restart: unless-stopped
    networks:
      - lang_portal_network

  lang_portal_frontend:
    build:
      context: .
      dockerfile: docker/lang-portal/Dockerfile.frontend
    image: lang-portal-frontend
    container_name: lang-portal-frontend
    ports:
      - "3000:80"
    depends_on:
      - lang_portal_backend
    restart: unless-stopped
    networks:
      - lang_portal_network
      
  # Other services would be defined here...

volumes:
  lang_portal_data:
    # This volume stores the SQLite database
  # Other volumes would be defined here...

networks:
  lang_portal_network:
    driver: bridge
  # Other networks would be defined here...
```

#### .dockerignore

```
**/.git
**/.venv
**/.env
**/__pycache__
**/node_modules
**/dist
**/*.pyc
**/.pytest_cache
**/.coverage
**/htmlcov
```

#### entrypoint.sh

```bash
#!/bin/bash
set -e

# Create or copy the database if it doesn't exist
if [ ! -f /app/data/lang_portal.db ]; then
    echo "Database not found, initializing..."
    cp /app/data/empty.db /app/data/lang_portal.db || python scripts/db/init_db.py --force
    python scripts/db/seed_db.py
fi

# Run migrations
python -m alembic upgrade head

# Execute the CMD
exec "$@"
```

### 2. Japanese Listening App

#### Container Architecture

The Japanese Listening App will use a single container:

1. **App Container**: Streamlit + Python dependencies + data volumes

#### Dockerfile

```dockerfile
FROM python:3.12-slim

WORKDIR /app

# Copy requirements
COPY pyproject.toml .
COPY uv.lock .

# Install uv for Python package management
RUN pip install --no-cache-dir uv==0.1.0

# Install the app dependencies
RUN uv pip install --no-cache-dir -e .

# Copy application code
COPY backend ./backend
COPY frontend ./frontend
COPY scripts ./scripts
COPY .streamlit ./.streamlit

# Create data directories
RUN mkdir -p data media

# Set environment variables
ENV PYTHONUNBUFFERED=1

# Expose Streamlit port
EXPOSE 8501

# Run the application
CMD ["streamlit", "run", "frontend/app.py"]
```

#### docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build:
      context: ../../listening-comp
      dockerfile: ../../docker/listening-comp/Dockerfile
    volumes:
      - listening_data:/app/data
      - listening_media:/app/media
    ports:
      - "8501:8501"
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
    restart: unless-stopped

volumes:
  listening_data:
  listening_media:
```

#### .dockerignore

```
**/.git
**/.venv
**/.env
**/__pycache__
**/.pytest_cache
**/.coverage
**/.ruff_cache
**/.mypy_cache
```

### 3. OPEA Chat Containerization ✅

1. **Analyze Existing Docker Setup** ✅
   - Review the current OPEA docker configuration:
     ```bash
     cat opea-comps/backend/docker/Dockerfile
     cat opea-comps/backend/docker/compose.yaml
     ```
   
   - Identify any necessary modifications or additions

2. **Create Docker Configuration Files** ✅
   - Create Docker Compose wrapper:
     ```bash
     touch docker/opea-comps/docker-compose.yml
     ```
   - Add content from the docker-compose.yml template
   
   - Create model setup script:
     ```bash
     touch docker/opea-comps/model-setup.sh
     chmod +x docker/opea-comps/model-setup.sh
     ```
   - Add content from the model-setup.sh template
   
   - Create app Dockerfile if needed:
     ```bash
     touch docker/opea-comps/Dockerfile.app
     ```
   - Add content based on app requirements

3. **Create Environment File** ✅
   - Create example environment file:
     ```bash
     touch docker/env-example/opea-comps.env
     ```
   - Add necessary environment variables based on project needs

4. **Prepare Model Volume** ✅
   - Run the model setup script:
     ```bash
     cd <repository_root>
     ./docker/opea-comps/model-setup.sh
     ```
   
   - Copy or download a suitable model file following instructions

5. **Build and Test Containers** ✅
   - Build the containers:
     ```bash
     cd <repository_root>
     docker-compose -f docker/opea-comps/docker-compose.yml build
     ```
   
   - Start the containers:
     ```bash
     docker-compose -f docker/opea-comps/docker-compose.yml up -d
     ```
   
   - Verify containers are running:
     ```bash
     docker ps
     ```
   
   - Test backend API access:
     ```bash
     curl http://localhost:8888/health
     ```
   
   - Test frontend access by opening http://localhost:8502 in a browser

6. **Debug and Fix Issues** ✅
   - Check container logs if issues occur:
     ```bash
     docker-compose -f docker/opea-comps/docker-compose.yml logs
     ```
   
   - Fix any issues in the Docker files
   
   - Rebuild and retest as needed

7. **Update Project README** ✅
   - Add Docker setup section to the project's README.md:
     ```bash
     # Add the Docker Setup section to opea-comps/README.md
     ```

### 4. Visual Novel Containerization ✅

1. **Create Docker Configuration Files** ✅
   - Create game Dockerfile:
     ```bash
     touch docker/visual-novel/Dockerfile.game
     ```
   - Add content from the Dockerfile.game template
   
   - Create server Dockerfile:
     ```bash
     touch docker/visual-novel/Dockerfile.server
     ```
   - Add content from the Dockerfile.server template
   
   - Create Docker Compose file:
     ```bash
     touch docker/visual-novel/docker-compose.yml
     ```
   - Add content from the docker-compose.yml template
   
   - Create .dockerignore file:
     ```bash
     touch docker/visual-novel/.dockerignore
     ```
   - Add content from the .dockerignore template

2. **Create Environment File** ✅
   - Create example environment file:
     ```bash
     touch docker/env-example/visual-novel.env
     ```
   - Add necessary environment variables based on .env.example

3. **Build and Test Containers** ✅
   - Build the containers:
     ```bash
     cd <repository_root>
     docker compose --profile visual_novel build
     ```
   
   - Start the containers:
     ```bash
     docker compose --profile visual_novel up -d
     ```
   
   - Verify containers are running:
     ```bash
     docker ps
     ```
   
   - Test LLM proxy server:
     ```bash
     curl http://localhost:3011/api/health
     ```
   
   - Test game access by opening http://localhost:8080 in a browser

4. **Debug and Fix Issues** ✅
   - Check container logs if issues occur:
     ```bash
     docker compose logs visual_novel_game
     docker compose logs visual_novel_server
     ```
   
   - Fix any issues in the Dockerfiles or docker-compose.yml
   
   - Rebuild and retest as needed

5. **Update Project README** ✅
   - Add Docker setup section to the project's README.md:
     ```bash
     # Add the Docker Setup section to visual-novel/README.md
     ```

## Phase 4 Summary: Visual Novel Containerization

The Visual Novel project was successfully containerized with the following components:

1. **Docker Configuration Files**: 
   - `docker/visual-novel/Dockerfile.game`: Multi-stage Dockerfile to build and serve the Phaser game
   - `docker/visual-novel/Dockerfile.server`: Dockerfile for the LLM proxy server
   - `docker/visual-novel/.dockerignore`: Configured to exclude unnecessary files

2. **Environment Configuration**:
   - `docker/env-example/visual-novel.env`: Contains sample environment variables for the LLM proxy server

3. **Docker Compose Integration**:
   - Added `visual_novel_game` and `visual_novel_server` services to main docker-compose.yml
   - Configured ports, networks, and environment variables
   - Added profile support for selective service starting

4. **Documentation Updates**:
   - Added Docker setup section to `visual-novel/README.md`
   - Updated `docker/README.md` with Visual Novel information
   - Updated `docker/build-and-run.sh` script to handle Visual Novel services

5. **Implemented Features**:
   - Multi-stage build for the game frontend to optimize container size
   - Nginx-based serving of the static game files
   - Node.js Express server for the LLM proxy component
   - Environment variable fallbacks for simpler configuration
   - Network isolation through dedicated Docker network
   - Profile-based service selection for flexible deployment

6. **Running the Visual Novel Containers**:
   ```bash
   # Run only the Visual Novel containers
   docker compose --profile visual_novel up -d

   # Access the applications
   # Game: http://localhost:8080
   # LLM Proxy: http://localhost:3011

   # To run with LLM integration
   LLM_API_KEY=your_api_key_here docker compose --profile visual_novel up -d
   ```

## Standardized Implementation Approach for Remaining Projects

Following our updated containerization strategy, the ~~OPEA Chat and~~ Visual Novel application~~s~~ ~~will be~~ has been containerized using the same principles:

1. Service-specific Dockerfiles in their respective `docker/<project>/` directories
2. Services added to the root docker-compose.yml with consistent naming patterns
3. Consistent documentation in each project's README and the main README
4. Environment variables managed with sensible defaults and clear documentation
5. Data persistence through appropriately named and commented volumes

By applying these consistent patterns across all projects, we've ensured a cohesive Docker experience throughout the monorepo.

## Security and Data Handling Considerations

1. **Environment Variables**
   - Never commit real API keys to the repository
   - Use .env files for configuration
   - Provide clear documentation on required variables

2. **Volumes**
   - Use named volumes for persistent data
   - Document backup/restore procedures
   - Include clear comments in docker-compose.yml about the purpose of each volume

3. **Network Security**
   - Minimize exposed ports
   - Use container networks where possible

4. **Data Persistence**
   - Mount databases as volumes
   - Include initialization scripts
   - Document data backup/restore procedures

## Conclusion

This standardized Docker approach provides several benefits:

1. **Consistency**: Users experience a consistent interface across all projects
2. **Simplicity**: One docker-compose.yml file to rule them all
3. **Flexibility**: Run the full stack or individual services as needed
4. **Maintainability**: Easier to update and maintain a single configuration
5. **Documentation Clarity**: Clear, consistent instructions across all READMEs

By following these guidelines for the remaining projects, we'll ensure a professional, maintainable containerization solution for the entire Free GenAI Bootcamp 2025 portfolio.