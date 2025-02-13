lang-portal/
├── .env                      # Shared environment variables
├── .env.example             # Example environment file
├── .gitignore               # Shared git ignore rules
├── README.md                # Project-wide documentation
├── backend-fastapi/
│   ├── app/                  # Move entire app directory here
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── core/
│   │   ├── api/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── crud/
│   │   └── services/
│   ├── tests/
│   ├── alembic/
│   │   └── versions/
│   ├── alembic.ini
│   └── pyproject.toml
└── frontend/
    └── ... 