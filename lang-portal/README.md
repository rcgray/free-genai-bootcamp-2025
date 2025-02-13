# Language Learning Portal

A web-based language learning platform that serves as:
1. A vocabulary management system
2. A learning record store (LRS)
3. A unified launchpad for various learning applications

## Technology Stack

### Backend
- FastAPI (Python 3.12)
- SQLite3 database
- RESTful JSON API
- SQLAlchemy for ORM
- Alembic for database migrations
- uv for Python package management

### Frontend
- React 18+ with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- React Query for API state management
- React Router for navigation

## Getting Started

### Prerequisites
- Python 3.12 or higher
- optional: uv package manager (`pip install uv`)
- Yarn package manager
- Node.js 18 or higher (for yarn)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/lang-portal.git
cd lang-portal
```

2. Set up the backend
```bash
# Navigate to backend directory
cd backend-fastapi

# Create and activate virtual environment using uv
uv venv .venv
  # or regular venv 
  python -m venv .venv

source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install production dependencies using uv
uv pip install -e .
  # or regular pip
  pip install -e .

# Copy environment file and configure if needed
cp .env.example .env
```

3. Initialize and seed the database
```bash
# Create a new database with schema
python scripts/db/init_db.py --force

# Seed the database with initial data
python scripts/db/seed_db.py
```
As a backup, a copy of a fresh database is available in `data/empty.db` that you can simply copy to `lang_portal.db` and start using immediately.

4. Set up the frontend
```bash
# Navigate to frontend directory
cd ../frontend
yarn install
```

### Developer Setup

For development, you'll need additional dependencies:

```bash
# Install development dependencies using uv
uv pip install -e ".[dev]"
  # or regular pip
  pip install -e ".[dev]"
```

This will install additional packages needed for development:
- pytest and pytest-asyncio for testing
- black for code formatting
- isort for import sorting
- mypy for type checking
- ruff for linting

### Development

Start both backend and frontend development servers:
```bash
python scripts/dev.py
```

Or run them separately:

Backend only:
```bash
cd backend-fastapi
uvicorn app.main:app --reload
```

Frontend only:
```bash
cd frontend
yarn dev
```

### Testing

Run all tests:
```bash
python scripts/test/run_all.py
```

Or test specific components:
```bash
# Backend tests
cd backend-fastapi
uv run pytest

# Frontend tests
cd frontend
yarn test
```

### Code Quality

Format and lint the code:
```bash
# Backend
cd backend-fastapi
uv run black .
uv run isort .
uv run mypy .
uv run ruff check .

# Frontend
cd frontend
yarn lint
yarn format
```

## Project Structure

```
lang-portal/
├── backend-fastapi/        # Backend FastAPI application
│   ├── app/                # Application code
│   │   ├── core/           # Core components (config, database)
│   │   ├── api/            # API routes
│   │   ├── models/         # SQLAlchemy models
│   │   ├── schemas/        # Pydantic models
│   │   ├── crud/           # Database operations
│   │   └── services/       # Business logic
│   ├── alembic/            # Database migrations
│   │   ├── versions/       # Migration scripts
│   │   └── env.py          # Alembic configuration
│   ├── seed/               # Seed data files
│   │   ├── words.*.json          # Word data files (verbs, adjectives, etc.)
│   │   ├── groups.json           # Group definitions
│   │   ├── word_groups.json      # Word-group associations
│   │   └── study_activities.json # Study activity definitions
│   └── tests/              # Backend tests
├── frontend/               # Frontend React application
├── scripts/                # Development and utility scripts
│   └── db/                 # Database management scripts
│       ├── init_db.py      # Database initialization
│       └── seed_db.py      # Database seeding
├── docs/                   # Documentation
└── data/                   # Database and data files
    └── lang_portal.db      # SQLite database file
```

## Database Management

The project uses SQLite with SQLAlchemy ORM and Alembic for migrations.

### Database Setup

1. Initialize a new database:
```bash
python scripts/db/init_db.py --force
```
This will:
- Create a new SQLite database in `data/lang_portal.db`
- Run all Alembic migrations to create the schema

2. Seed the database with initial data:
```bash
python scripts/db/seed_db.py
```
This will populate the database with:
- Words (verbs and adjectives)
- Groups (e.g., "Verbs", "Adjectives")
- Word-group associations
- Study activities

### Working with Migrations

Create a new migration:
```bash
cd backend-fastapi
alembic revision --autogenerate -m "Description of changes"
```

Apply migrations:
```bash
alembic upgrade head
```

Revert migrations:
```bash
alembic downgrade -1  # Revert last migration
alembic downgrade base  # Revert all migrations
```

## API Documentation

Once the development server is running, API documentation is available at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Development Tools

The project includes several development tools and scripts:

1. Database Management
   - Database initialization and migrations (Alembic)
   - Data seeding utilities
   - Backup/restore utilities

2. Testing Tools
   - Unit tests (pytest)
   - Integration tests
   - E2E tests
   - Coverage reports

3. Documentation
   - API documentation (OpenAPI/Swagger)
   - Frontend component documentation
   - Development guides

4. Code Quality Tools
   - Code formatting (black, prettier)
   - Linting (mypy, eslint)
   - Type checking (mypy, TypeScript)

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and ensure code quality
4. Submit a pull request

## License

[Your chosen license]