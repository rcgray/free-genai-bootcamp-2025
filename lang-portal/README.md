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

# Copy environment file and configure if needed
cp .env.example .env
```

2. Set up the backend
```bash
# Navigate to backend directory
cd backend-fastapi

# Create and activate virtual environment using uv
uv venv
  # or regular venv
  python -m venv .venv

source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install production dependencies using uv
uv sync
  # or regular pip
  pip install -e .
```

3. Initialize and seed the database
```bash
# Return to project root
cd ..
# Create a new database with schema
python scripts/db/init_db.py --force
# Seed the database with initial data
python scripts/db/seed_db.py
```
As a backup, a copy of a fresh database is available in `data/empty.db` that you can simply copy to `lang_portal.db` and start using immediately.

4. Set up the frontend
```bash
# Navigate to frontend directory
cd frontend
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
# Backend tests
cd backend-fastapi
uv run pytest -v tests/
  # or regular pip
  python -m pytest tests/
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
├── games/                  # Educational games
│   └── typing-tutor/      # Example game implementation
├── shared/                 # Shared code for games
│   ├── api-client/        # API client library
│   └── types/             # Shared TypeScript types
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


## Game Development

The platform supports the development of educational games as independent sub-projects within the monorepo. Each game is a standalone React application that can be developed and tested independently.

### Building Existing Games

1. First, build the shared code library and all games:
```bash
# From project root
yarn dev:games
```

This will:
- Build the shared library (@lang-portal/shared)
- Build all games
- Copy built game files to the frontend's public directory

2. Build a specific game:
```bash
# Build a single game
cd games/typing-tutor
yarn install
yarn build

# The built game will be available at:
# frontend-react/public/games/typing-tutor.js
```

3. Development mode:
```bash
# Run a game in development mode
cd games/typing-tutor
yarn dev
```

### Creating a New Game

1. Create a new game directory:
```bash
# From project root
mkdir -p games/your-game-name
cd games/your-game-name
```

2. Initialize the game project:
```bash
# Copy the base configuration from typing-tutor
cp ../typing-tutor/package.json .
cp ../typing-tutor/vite.config.ts .
cp ../typing-tutor/tsconfig*.json .

# Update package name in package.json
sed -i 's/typing-tutor/your-game-name/' package.json

# Install dependencies
yarn install
```

3. Create the basic game structure:
```bash
mkdir src
```

4. Create the main game component (`src/index.tsx`):
```typescript
import React from 'react';
import { GameProps } from '@lang-portal/shared/types';

export function YourGame({ apiClient, sessionId, onGameComplete }: GameProps) {
  return (
    <div>
      <h1>Your Game Name</h1>
      {/* Your game implementation */}
    </div>
  );
}

export default YourGame;
```

### Deploying a Game

1. Build the game:
```bash
# From project root
yarn dev:games
```

2. Add the game to the activities database:
```json
{
  "name": "Your Game Name",
  "url": "/games/your-game-name.js",
  "image_url": "images/activities/your-game.jpg",
  "description": "Description of your game."
}
```

3. The game will be automatically loaded by the frontend when users access it through the activities page.

### Game Development Guidelines

1. **Project Structure**
   - Each game is a standalone React project
   - Uses shared types and API client from `@lang-portal/shared`
   - Can include any additional dependencies needed (game engines, etc.)
   - Built files are automatically copied to `frontend-react/public/games/`

2. **Required Interface**
```typescript
interface GameProps {
  apiClient: ApiClient;      // API client for backend communication
  sessionId?: string;        // Current session ID
  onGameComplete?: () => void; // Callback when game completes
}
```

3. **API Integration**
   - Use `apiClient` for backend communication
   - Create sessions using `apiClient.sessions.create()`
   - Log word reviews using `apiClient.sessions.review()`

4. **Development Workflow**
   - Develop and test independently using `yarn dev`
   - Build using `yarn build` or `yarn dev:games` from root
   - Test integration with main app
   - Update activities table in database to enable the game

5. **Adding Game Engines**
   - Install game engine as dependency in game's package.json
   - Configure as needed in game's vite.config.ts
   - Implement game logic within the React component

6. **Build Output**
   - Games are built as ES modules
   - Built files are automatically copied to the frontend's public directory
   - Games are served as static files from `/games/{game-name}.js`
   - No manual file copying or deployment needed
