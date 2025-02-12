# Development Tasks Technical Specification

## Overview

This document outlines the development tasks, scripts, and tools needed to support the language learning portal project. These tasks are intended for developers and system administrators, not end users.

## Development Scripts

### Database Management

1. **Database Setup**
   - Initialize SQLite database with schema
   - Create indexes
   - Load initial study activities data
   - Load sample word and group data for development

2. **Data Management**
   - Export database to JSON/CSV
   - Import data from JSON/CSV
   - Data validation scripts
   - Database backup/restore utilities

### Development Environment

1. **Project Setup**
   ```bash
   # Backend setup
   python -m venv venv
   source venv/bin/activate  # or `venv\Scripts\activate` on Windows
   pip install -r requirements.txt
   
   # Frontend setup
   cd frontend
   yarn install
   
   # Run both (from project root)
   python scripts/dev.py     # Starts both frontend and backend
   
   # Run individually
   python -m uvicorn app.main:app --reload  # Backend only
   cd frontend && yarn dev                  # Frontend only
   ```

2. **Code Quality**
   ```bash
   # Backend
   python -m black .                # Format Python code
   python -m pylint app/**/*.py     # Lint Python code
   python -m mypy app               # Type checking
   
   # Frontend
   cd frontend
   yarn lint                       # Run ESLint
   yarn format                     # Run Prettier
   yarn type-check                 # Run TypeScript type checking
   ```

3. **Testing**
   ```bash
   # Backend
   python -m pytest                # Run all backend tests
   python -m pytest --cov=app      # Run with coverage
   
   # Frontend
   cd frontend
   yarn test                       # Run frontend tests
   yarn test:coverage              # Run with coverage
   
   # E2E Testing
   yarn playwright test            # Run E2E tests
   ```

### Build and Deployment

1. **Build Scripts**
   ```bash
   # Frontend build
   cd frontend
   yarn build
   
   # Backend doesn't require a build step, but we can create dist
   python -m pip install build
   python -m build
   ```

2. **Deployment**
   ```bash
   # Deploy commands will depend on deployment platform
   python scripts/deploy.py prod    # Deploy to production
   python scripts/deploy.py stage   # Deploy to staging
   ```

## Development Tools

### Custom CLI Tools

1. **Word Management**
   ```bash
   python manage.py word add    # Add new words
   python manage.py word import # Import words from file
   python manage.py word export # Export words to file
   ```

2. **Group Management**
   ```bash
   python manage.py group create  # Create new group
   python manage.py group assign  # Assign words to group
   python manage.py group list    # List all groups
   ```

3. **Study Activity Management**
   ```bash
   python manage.py activity add    # Add new study activity
   python manage.py activity update # Update activity details
   python manage.py activity list   # List all activities
   ```

### Documentation

1. **API Documentation**
   - Script to generate OpenAPI documentation
   - API endpoint testing tool
   - Documentation site builder

2. **Code Documentation**
   - TypeScript documentation generator
   - Python documentation generator
   - Component documentation builder

## Future Considerations

- Container orchestration scripts
- Multi-environment configuration management
- Automated backup system
- Performance optimization tools
- Data migration tools for future updates
- Maintenance scripts for database and application
- GitHub Actions workflows for CI/CD
- Security scanning and auditing tools

## Required Script Files

### Core Management Scripts

1. **manage.py**
   - Main CLI management script
   - Handles all word, group, and activity management commands
   - Located at: `./manage.py`
   ```python
   Usage: python manage.py <command> [options]
   ```

2. **scripts/dev.py**
   - Development server launcher
   - Starts both frontend and backend servers
   - Handles hot reloading
   - Located at: `./scripts/dev.py`
   ```python
   Usage: python scripts/dev.py [--port BACKEND_PORT] [--front-port FRONTEND_PORT]
   ```

3. **scripts/deploy.py**
   - Deployment script
   - Handles staging and production deployments
   - Located at: `./scripts/deploy.py`
   ```python
   Usage: python scripts/deploy.py <environment>
   ```

### Database Scripts

1. **scripts/db/init_db.py**
   - Database initialization script
   - Creates tables and indexes
   - Located at: `./scripts/db/init_db.py`
   ```python
   Usage: python scripts/db/init_db.py [--force]
   ```

2. **scripts/db/seed.py**
   - Database seeding script
   - Loads initial study activities and sample data
   - Located at: `./scripts/db/seed.py`
   ```python
   Usage: python scripts/db/seed.py [--sample-data]
   ```

3. **scripts/db/backup.py**
   - Database backup utility
   - Handles export/import of data
   - Located at: `./scripts/db/backup.py`
   ```python
   Usage: python scripts/db/backup.py <backup|restore> <filename>
   ```

### Testing Scripts

1. **scripts/test/run_all.py**
   - Comprehensive test runner
   - Runs backend, frontend, and E2E tests
   - Located at: `./scripts/test/run_all.py`
   ```python
   Usage: python scripts/test/run_all.py [--coverage] [--e2e]
   ```

2. **frontend/scripts/test-setup.ts**
   - Frontend test configuration
   - Sets up testing environment for React components
   - Located at: `./frontend/scripts/test-setup.ts`

### Documentation Scripts

1. **scripts/docs/generate_api_docs.py**
   - OpenAPI documentation generator
   - Creates API documentation from FastAPI endpoints
   - Located at: `./scripts/docs/generate_api_docs.py`
   ```python
   Usage: python scripts/docs/generate_api_docs.py [--output DIR]
   ```

2. **scripts/docs/generate_frontend_docs.py**
   - Frontend documentation generator
   - Generates TypeScript/React component documentation
   - Located at: `./scripts/docs/generate_frontend_docs.py`
   ```python
   Usage: python scripts/docs/generate_frontend_docs.py [--output DIR]
   ```

### Security Scripts

1. **scripts/security/scan.py**
   - Security scanner
   - Runs vulnerability checks and security audits
   - Located at: `./scripts/security/scan.py`
   ```python
   Usage: python scripts/security/scan.py [--full] [--report-file FILE]
   ```

2. **scripts/security/audit.py**
   - Access and usage auditing tool
   - Generates audit reports
   - Located at: `./scripts/security/audit.py`
   ```python
   Usage: python scripts/security/audit.py <start-date> <end-date> [--report-type TYPE]
   ```

### Utility Scripts

1. **scripts/utils/check_dependencies.py**
   - Dependency checker
   - Verifies all required software is installed
   - Located at: `./scripts/utils/check_dependencies.py`
   ```python
   Usage: python scripts/utils/check_dependencies.py [--fix]
   ```

2. **scripts/utils/format_all.py**
   - Code formatter
   - Runs all code formatting tools
   - Located at: `./scripts/utils/format_all.py`
   ```python
   Usage: python scripts/utils/format_all.py [--check]
   ```

Each script should include:
- Comprehensive help text (`--help`)
- Error handling and logging
- Configuration via environment variables and command line arguments
- Clear success/failure exit codes
