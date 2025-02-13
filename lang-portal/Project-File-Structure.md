.
├── .cursorignore
├── .cursorrules
├── .env
├── .env.example
├── .gitignore
├── .vscode
│   └── tasks.json
├── AI-TODO.md
├── Backend-Technical-Spec.md
├── Frontend-Technical-Spec.md
├── Project-File-Structure.md
├── README.md
├── Tasks-Technical-Spec.md
├── app
│   ├── api
│   │   └── v1
│   │       └── endpoints
│   │           ├── groups.py
│   │           └── study_sessions.py
│   ├── crud
│   │   ├── base.py
│   │   ├── group.py
│   │   ├── study_session.py
│   │   └── word.py
│   └── services
│       ├── group_service.py
│       ├── study_service.py
│       └── word_service.py
├── backend-fastapi
│   ├── alembic
│   │   ├── README.md
│   │   ├── alembic.ini
│   │   ├── env.py
│   │   ├── script.py.mako
│   │   └── versions
│   ├── alembic.ini
│   ├── app
│   │   ├── api
│   │   │   └── v1
│   │   │       ├── endpoints
│   │   │       │   ├── groups.py
│   │   │       │   ├── study_sessions.py
│   │   │       │   └── words.py
│   │   │       └── router.py
│   │   ├── core
│   │   │   ├── config.py
│   │   │   ├── database.py
│   │   │   └── exceptions.py
│   │   ├── crud
│   │   ├── main.py
│   │   ├── models
│   │   │   ├── base.py
│   │   │   ├── group.py
│   │   │   ├── study_activity.py
│   │   │   ├── study_session.py
│   │   │   ├── word.py
│   │   │   └── word_group.py
│   │   ├── schemas
│   │   │   ├── base.py
│   │   │   ├── group.py
│   │   │   ├── study_session.py
│   │   │   └── word.py
│   │   └── services
│   ├── pyproject.toml
│   └── tests
│       ├── conftest.py
│       ├── fixtures
│       │   └── test_data.py
│       ├── test_api
│       │   └── test_v1
│       │       └── test_words.py
│       └── test_crud
│           └── test_word_crud.py
├── frontend-react
│   └── .gitkeep
└── scripts
    └── db
        └── init_db.py