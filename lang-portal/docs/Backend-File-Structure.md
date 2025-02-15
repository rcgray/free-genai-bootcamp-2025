# Backend Project Structure

This is our current file structure for the backend FastAPI project:

```bash
backend-fastapi/
├── alembic/                   # Database migrations
│   ├── README.md
│   ├── env.py                # Alembic environment configuration
│   ├── script.py.mako        # Template for migration files
│   └── versions/             # Migration version files
│       └── 20250213_2020_be4ef40d2c7f_initial_migration_create_all_tables.py
├── alembic.ini               # Alembic configuration file
├── app/                      # Main application package
│   ├── api/                  # API routes and endpoints
│   │   └── v1/
│   │       ├── endpoints/    # API endpoint handlers
│   │       │   ├── groups.py
│   │       │   ├── study_sessions.py
│   │       │   └── words.py
│   │       └── router.py     # API route configuration
│   ├── core/                 # Core application components
│   │   ├── config.py        # Application configuration
│   │   ├── database.py      # Database connection handling
│   │   └── exceptions.py    # Custom exception handlers
│   ├── crud/                 # Database CRUD operations
│   │   ├── base.py          # Base CRUD functionality
│   │   ├── group.py         # Group-specific CRUD
│   │   ├── study_session.py # Study session CRUD
│   │   └── word.py          # Word-specific CRUD
│   ├── main.py              # Application entry point
│   ├── models/              # SQLAlchemy models
│   │   ├── __init__.py
│   │   ├── base.py          # Base model configuration
│   │   ├── group.py         # Group model
│   │   ├── study_activity.py # Study activity model
│   │   ├── study_session.py # Study session model
│   │   ├── word.py          # Word model
│   │   ├── word_group.py    # Word-group association model
│   │   └── word_review_item.py # Word review model
│   ├── schemas/             # Pydantic schemas
│   │   ├── base.py          # Base schema functionality
│   │   ├── group.py         # Group schemas
│   │   ├── study_session.py # Study session schemas
│   │   └── word.py          # Word schemas
│   └── services/            # Business logic services
│       ├── group_service.py # Group-related services
│       ├── study_service.py # Study-related services
│       └── word_service.py  # Word-related services
├── pyproject.toml           # Project dependencies and metadata
├── seed/                    # Seed data for database
│   ├── groups.json          # Group seed data
│   ├── study_activities.json # Study activities seed data
│   ├── word_groups.json     # Word-group associations
│   ├── words.adjectives.json # Adjective word seed data
│   └── words.verbs.json     # Verb word seed data
└── tests/                   # Test suite
    ├── conftest.py          # Test configuration and fixtures
    ├── fixtures/            # Test data fixtures
    │   └── test_data.py     # Test data
    ├── test_api/            # API tests
    │   └── test_v1/
    │       ├── test_groups.py
    │       ├── test_study_sessions.py
    │       └── test_words.py
    ├── test_crud/           # CRUD operation tests
    │   ├── test_group_crud.py
    │   ├── test_study_session_crud.py
    │   └── test_word_crud.py
    ├── test_db/            # Database tests
    │   ├── conftest.py
    │   └── test_integration.py
    ├── test_models/        # Model tests
    │   ├── conftest.py
    │   ├── test_group_model.py
    │   ├── test_study_activity_model.py
    │   ├── test_study_session_model.py
    │   ├── test_word_model.py
    │   └── test_word_review_item_model.py
    ├── test_schemas/       # Schema tests
    │   ├── conftest.py
    │   ├── test_base_schema.py
    │   ├── test_group_schema.py
    │   ├── test_study_session_schema.py
    │   └── test_word_schema.py
    └── test_services/      # Service layer tests
        ├── conftest.py
        ├── test_group_service.py
        ├── test_study_service.py
        └── test_word_service.py
```

## Key Directories and Files

### Configuration Files
- `alembic.ini`: Database migration configuration
- `pyproject.toml`: Project dependencies and build settings

### Application Core (`app/`)
- `main.py`: Application entry point and FastAPI setup
- `core/`: Core application configuration and utilities
- `api/`: API route definitions and handlers
- `crud/`: Database CRUD operations
- `models/`: SQLAlchemy database models
- `schemas/`: Pydantic data validation schemas
- `services/`: Business logic implementation

### Database Migration (`alembic/`)
- `env.py`: Alembic environment configuration
- `versions/`: Migration version files
- `script.py.mako`: Migration file template

### Test Suite (`tests/`)
- Organized by component type (API, CRUD, Models, etc.)
- Includes fixtures and configuration
- Follows same structure as main application

### Seed Data (`seed/`)
- JSON files containing initial data for database
- Separated by entity type

## Development Workflow

### Installation
```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows

# Install dependencies
pip install -e .
```

### Database Management
```bash
# Initialize database
python -m scripts.db.init_db

# Run migrations
alembic upgrade head

# Seed database
python -m scripts.db.seed_db
```

### Development
```bash
# Start development server
uvicorn app.main:app --reload

# Run tests
pytest

# Run tests with coverage
pytest --cov=app
```

## Key Features

1. **Database Integration**
   - SQLAlchemy ORM
   - Alembic migrations
   - SQLite database

2. **API Structure**
   - FastAPI framework
   - Versioned API routes
   - JSON response format

3. **Testing**
   - Pytest test suite
   - Comprehensive test coverage
   - Fixture-based testing

4. **Data Validation**
   - Pydantic schemas
   - Request/response validation
   - Type checking

5. **Code Organization**
   - Modular structure
   - Separation of concerns
   - Clear component boundaries

6. **Development Tools**
   - Hot reload support
   - Database seeding
   - Migration management

7. **Documentation**
   - OpenAPI/Swagger UI
   - API documentation
   - README and setup guides
