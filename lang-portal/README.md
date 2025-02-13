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

### Frontend
- React 18+ with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- React Query for API state management
- React Router for navigation

## Getting Started

### Prerequisites
- Python 3.12 or higher
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

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install backend dependencies
pip install -e .

# Copy environment file and configure if needed
cp .env.example .env

# Initialize the database
alembic upgrade head

# Start the development server
uvicorn app.main:app --reload
```

3. Set up the frontend
```bash
# Navigate to frontend directory
cd ../frontend
yarn install
```

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
pytest

# Frontend tests
cd frontend
yarn test
```

### Code Quality

Format and lint the code:
```bash
# Backend
cd backend-fastapi
black .
isort .
mypy .

# Frontend
cd frontend
yarn lint
yarn format
```

## Project Structure

```
lang-portal/
├── backend-fastapi/          # Backend FastAPI application
│   ├── app/                 # Application code
│   │   ├── core/           # Core components
│   │   ├── api/            # API routes
│   │   ├── models/         # SQLAlchemy models
│   │   ├── schemas/        # Pydantic models
│   │   ├── crud/          # Database operations
│   │   └── services/      # Business logic
│   ├── alembic/            # Database migrations
│   └── tests/             # Backend tests
├── frontend/              # Frontend React application
├── scripts/               # Development and utility scripts
├── docs/                 # Documentation
└── data/                 # Database and data files
```

## API Documentation

Once the development server is running, API documentation is available at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Development Tools

The project includes several development tools and scripts:

1. Database Management
   - Database migrations (Alembic)
   - Data import/export utilities
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