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
# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Initialize the database
python scripts/db/init_db.py
```

3. Set up the frontend
```bash
cd frontend
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
python -m uvicorn app.main:app --reload
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
python -m pytest

# Frontend tests
cd frontend
yarn test
```

### Code Quality

Format and lint the code:
```bash
# Backend
python -m black .
python -m pylint app/**/*.py
python -m mypy app

# Frontend
cd frontend
yarn lint
yarn format
```

## Project Structure

```
lang-portal/
├── app/                    # Backend FastAPI application
├── frontend/              # Frontend React application
├── scripts/               # Development and utility scripts
│   ├── db/               # Database management scripts
│   ├── test/             # Test runners
│   └── utils/            # Utility scripts
├── data/                 # Database and data files
├── docs/                 # Documentation
├── tests/                # Backend tests
└── requirements.txt      # Python dependencies
```

## API Documentation

Once the development server is running, API documentation is available at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Development Tools

The project includes several development tools and scripts:

1. Database Management
   - Database initialization
   - Data import/export
   - Backup/restore utilities

2. Testing Tools
   - Unit tests
   - Integration tests
   - E2E tests
   - Coverage reports

3. Documentation
   - API documentation generation
   - Frontend component documentation
   - Development guides

4. Code Quality Tools
   - Code formatting
   - Linting
   - Type checking

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and ensure code quality
4. Submit a pull request

## License

[Your chosen license]