# Japanese Listening Learning Tool 🎧

A Streamlit-based application designed to help users learn Japanese through audio content. The tool processes Japanese audio content to create interactive learning experiences with transcriptions, translations, and AI-powered speech synthesis.

![Japanese Listening Learning Tool](dev/screenshot.png)

## Overview

This tool helps Japanese language learners practice their listening skills by working with authentic Japanese audio content. Users can upload audio files or provide URLs to Japanese podcasts or other audio content. The application automatically transcribes the Japanese audio, provides English translations, and offers an interactive interface for studying the content.

## Features

- **Audio Content Processing**: Download and process Japanese audio content from various platforms
- **Automated Transcription**: Generate Japanese transcripts using AI Speech-to-Text
- **English Translation**: Provide English translations of the content
- **Interactive Learning**: Synchronized transcript and audio playback with instant translations
- **Speech Synthesis**: AI-powered speech synthesis for improved comprehension and practice

## Getting Started

### Prerequisites

- Python 3.12 or higher
- Conda or pyenv (for environment management)
- uv (for dependency management)
- OpenAI API key for transcription and translation services

### Development Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd listening-comp
   ```

2. Create and activate a Python environment (choose one):
   ```bash
   # Using conda
   conda create -n listening-comp python=3.12
   conda activate listening-comp

   # OR using pyenv + venv
   pyenv install 3.12.1
   pyenv local 3.12.1
   python -m venv .venv
   source .venv/bin/activate  # On Unix/macOS
   # OR
   .venv\Scripts\activate  # On Windows
   ```

3. Install dependencies:
   ```bash
   # Install core dependencies
   uv sync

   # Install development dependencies
   uv sync --extra dev
   ```

4. Set up environment variables:
   ```bash
   # Copy the example environment file
   cp .env.example .env

   # Edit .env with your API keys
   # You'll need an OpenAI API key for audio transcription and translation
   ```

### Running the Application

Start the Streamlit application:
```bash
uv run streamlit run frontend/app.py
```

The application will be available at `http://localhost:8501` by default.

### Production Deployment

For production deployment:

```bash
# Set environment variables in your production environment
# OPENAI_API_KEY=your-api-key

# Start the application
streamlit run frontend/app.py
```

## Project Structure

```
listening-comp/
├── backend/           # Backend package for audio processing and AI features
│   ├── __init__.py
│   └── db.py         # Database operations and models
├── data/             # Data storage
│   └── app.json      # TinyDB database file
├── frontend/         # Streamlit application
│   └── app.py
├── docs/             # Documentation
│   └── PRD.md        # Product Requirements Document
├── scripts/          # Utility scripts
│   └── manage_db.py  # Database management script
├── tests/            # Test files
├── pyproject.toml    # Project configuration and dependencies
└── README.md
```

## Development

### Development Tools

The project uses several tools to maintain code quality:

#### Code Quality
```bash
# Format code with Ruff
uv run ruff format .

# Run Ruff linter
uv run ruff check .

# Run type checking
uv run mypy .

# Run tests
uv run pytest

# Run tests including API-dependent tests (requires OpenAI API key)
uv run pytest --api-tests

# Install pre-commit hooks
uv pip install pre-commit
pre-commit install
```

#### VS Code Integration
The project includes VS Code settings for:
- Automatic formatting on save
- Import sorting
- Type checking
- Test discovery and running

To use these features, install the following VS Code extensions:
- Ruff (charliermarsh.ruff)
- Python (ms-python.python)
- Python Test Explorer (littlefoxteam.vscode-python-test-adapter)

### Development Guidelines

1. Follow the Google Python style guide for docstrings
2. Maintain type hints for all functions and classes
3. Write tests for new functionality
4. Keep functions focused and small
5. Document API endpoints and significant changes

### API-Dependent Tests

Some tests in the project require access to external APIs (primarily OpenAI's API for transcription and translation). These tests are marked with `@pytest.mark.api` and are skipped by default to avoid:

1. Requiring all developers to have API keys configured
2. Incurring API usage costs during routine testing
3. Slowing down the test suite with external API calls

To run these tests:

1. Ensure you have configured your `.env` file with the necessary API keys
2. Run the tests with the `--api-tests` flag:
   ```bash
   uv run pytest --api-tests
   ```

This approach allows for comprehensive testing when needed while keeping routine test runs fast and free of external dependencies.

## Future Enhancements

- Support for multiple audio content platforms
- User accounts and progress tracking
- Vocabulary list generation
- Difficulty level assessment
- Interactive quizzes
- Mobile optimization

### Database

The application uses TinyDB, a lightweight document-oriented database, to manage audio sources and their processing status. The database file is stored at `data/app.json`.

#### Database Schema

Audio sources are stored with the following structure:
```python
{
    "url": str,                # Source URL
    "title": str,              # Content title
    "source_type": str,        # Type of source (youtube, spotify, etc.)
    "duration_seconds": float, # Duration of audio
    "download_path": str,      # Path to downloaded audio file
    "transcript_path": str,    # Path to transcript file (optional)
    "translation_path": str,   # Path to translation file (optional)
    "created_at": str,         # Creation timestamp
    "updated_at": str,         # Last update timestamp
    "status": str              # Processing status
}
```

#### Database Management

The project includes a management script for database operations:

```bash
# Reset the database (clear all data)
uv run python scripts/manage_db.py reset

# Seed the database with sample data
uv run python scripts/manage_db.py seed

# Reset and seed the database
uv run python scripts/manage_db.py reset-and-seed

# Use custom database path
uv run python scripts/manage_db.py reset-and-seed --db-path custom/path/db.json
```
