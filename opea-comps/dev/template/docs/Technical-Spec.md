# Technical Specification - Japanese Listening Learning Tool

## Technology Stack

### Core Technologies
- **Python 3.12+**: Base programming language
- **Streamlit**: Frontend framework for rapid development of data applications
- **TinyDB**: Lightweight, document-oriented database
- **uv**: Modern Python package installer and resolver

### Development Tools
- **Ruff**: Fast, comprehensive Python linter and formatter
- **MyPy**: Static type checker for Python
- **Pytest**: Testing framework
- **Black**: Code formatting (through Ruff)
- **isort**: Import sorting (through Ruff)

## Project Architecture

### Directory Structure
```
listening-comp/
├── backend/           # Core application logic
│   ├── __init__.py
│   └── db.py         # Database operations and models
├── data/             # Data storage
│   └── app.json      # TinyDB database
├── frontend/         # Streamlit UI
│   └── app.py       # Main application entry point
├── media/           # Media file storage
│   ├── sources/     # Downloaded audio files
│   ├── transcripts/ # Generated transcripts
│   └── translations/# Generated translations
├── scripts/         # Utility scripts
│   └── manage_db.py # Database management
└── tests/          # Test suite
```

### Component Details

#### Backend Package
The backend package contains the core application logic, organized into modules:

##### Database Module (`backend/db.py`)
- Uses TinyDB for document storage
- Implements the `Database` class for audio source management
- Provides type-safe interfaces through TypedDict definitions
- Handles file path management and timestamps

**Key Classes and Types:**
```python
class AudioSource(TypedDict):
    url: str
    title: str
    source_type: str
    duration_seconds: float
    download_path: str
    transcript_path: Optional[str]
    translation_path: Optional[str]
    created_at: str
    updated_at: str
    status: str

class Database:
    def __init__(self, db_path: str = "data/app.json") -> None: ...
    def add_source(...) -> int: ...
    def get_source(self, doc_id: int) -> Optional[AudioSource]: ...
    def update_source_status(...) -> None: ...
    def get_source_by_url(self, url: str) -> Optional[AudioSource]: ...
```

#### Frontend Application (`frontend/app.py`)
- Built with Streamlit
- Handles user interactions and file uploads
- Displays audio player and transcripts
- Manages application state

#### Data Storage
- **TinyDB Database** (`data/app.json`):
  - Document-oriented storage
  - JSON-based persistence
  - No server required
  - Suitable for single-user deployment

- **Media Files**:
  - `media/sources/`: Original audio files
  - `media/transcripts/`: Generated text transcripts
  - `media/translations/`: English translations

### Processing Pipeline

1. **Content Input**
   - URL validation
   - Audio file download
   - Initial database entry creation

2. **Audio Processing**
   - Format conversion (if needed)
   - Audio quality checks
   - Storage in `media/sources/`

3. **Transcription**
   - Speech-to-text processing
   - Timestamp generation
   - Storage in `media/transcripts/`

4. **Translation**
   - Text translation
   - Alignment with original transcript
   - Storage in `media/translations/`

### Database Workflow

#### Status Flow
```
pending → downloaded → transcribed → translated
```

#### Document Lifecycle
1. Initial creation with `status: "pending"`
2. Update to `completed` when audio is processed (transcription and translation)

## Development Environment

### Environment Management
- Conda or pyenv for Python version management
- uv for dependency management
- Virtual environments for isolation

### Dependency Management
- Core dependencies in `pyproject.toml`
- Development extras for tooling
- Version pinning through `uv.lock`

### Code Quality
- Ruff configuration in `pyproject.toml`
- MyPy strict type checking
- Google-style docstrings
- 88-character line length (Black compatible)

### Testing Strategy
- Unit tests with pytest
- Integration tests for database operations
- Mocked external services
- Test coverage tracking

## Deployment Considerations

### Local Deployment
- Single-user setup
- File-based database
- Local file storage
- No additional services required

### Resource Requirements
- Python 3.12+ runtime
- Sufficient disk space for media files
- Memory for audio processing
- CPU for transcription/translation

### Security Considerations
- Input validation for URLs
- Safe file path handling
- Media file type verification
- Error handling for external services

## Future Technical Considerations

### Scalability
- Potential migration to SQLite/PostgreSQL
- Cloud storage for media files
- User authentication system
- Multi-user support

### Performance Optimization
- Caching strategies
- Batch processing
- Async operations
- Resource cleanup

### Monitoring
- Error logging
- Performance metrics
- Usage statistics
- Storage monitoring
