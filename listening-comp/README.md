# Japanese Listening Learning Tool 🎧

A Streamlit-based application designed to help users learn Japanese through audio content. The tool processes Japanese audio content to create interactive learning experiences with transcriptions, translations, and AI-powered speech synthesis.

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
   uv sync --extras dev
   ```

### Running the Application

Start the Streamlit application:
```bash
uv run streamlit run frontend/app.py
```

The application will be available at `http://localhost:8501` by default.

## Project Structure

```
listening-comp/
├── backend/           # Backend package for audio processing and AI features
│   └── __init__.py
├── frontend/         # Streamlit application
│   └── app.py
├── docs/            # Documentation
│   └── PRD.md      # Product Requirements Document
├── tests/           # Test files
├── pyproject.toml   # Project configuration and dependencies
└── README.md
```

## Development

### Code Quality Tools

The project uses several tools to maintain code quality:

- **Ruff**: Linting and formatting
  ```bash
  uv run ruff check .
  uv run ruff format .
  ```

- **MyPy**: Type checking
  ```bash
  uv run mypy .
  ```

- **Pytest**: Testing
  ```bash
  uv run pytest
  ```

### Development Guidelines

1. Follow the Google Python style guide for docstrings
2. Maintain type hints for all functions and classes
3. Write tests for new functionality
4. Keep functions focused and small
5. Document API endpoints and significant changes

## Future Enhancements

- Support for multiple audio content platforms
- User accounts and progress tracking
- Vocabulary list generation
- Difficulty level assessment
- Interactive quizzes
- Mobile optimization
