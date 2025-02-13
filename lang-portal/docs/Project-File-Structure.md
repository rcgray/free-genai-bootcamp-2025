.
├── .cursorignore
├── .cursorrules
├── .env
├── .env.example
├── .gitignore
├── .vscode
│   └── tasks.json
├── Project-File-Structure.md
├── README.md
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
│   │   ├── __pycache__
│   │   │   └── env.cpython-312.pyc
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
│   │   │   ├── __pycache__
│   │   │   │   ├── config.cpython-312.pyc
│   │   │   │   └── database.cpython-312.pyc
│   │   │   ├── config.py
│   │   │   ├── database.py
│   │   │   └── exceptions.py
│   │   ├── crud
│   │   │   ├── group.py
│   │   │   ├── study_session.py
│   │   │   └── word.py
│   │   ├── main.py
│   │   ├── models
│   │   │   ├── __pycache__
│   │   │   │   ├── base.cpython-312.pyc
│   │   │   │   ├── group.cpython-312.pyc
│   │   │   │   ├── study_activity.cpython-312.pyc
│   │   │   │   ├── study_session.cpython-312.pyc
│   │   │   │   ├── word.cpython-312.pyc
│   │   │   │   └── word_group.cpython-312.pyc
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
│   │       ├── group_service.py
│   │       ├── study_service.py
│   │       └── word_service.py
│   ├── pyproject.toml
│   ├── seed
│   │   ├── groups.json
│   │   ├── study_activities.json
│   │   ├── word_groups.json
│   │   ├── words.adjectives.json
│   │   └── words.verbs.json
│   ├── sql
│   ├── tests
│   │   ├── conftest.py
│   │   ├── fixtures
│   │   │   └── test_data.py
│   │   ├── test_api
│   │   │   └── test_v1
│   │   │       └── test_words.py
│   │   └── test_crud
│   │       └── test_word_crud.py
│   └── versions
│       ├── 20250213_2020_be4ef40d2c7f_initial_migration_create_all_tables.py
│       └── __pycache__
│           └── 20250213_2020_be4ef40d2c7f_initial_migration_create_all_tables.cpython-312.pyc
├── data
│   └── lang_portal.db
├── docs
│   ├── AI-TODO.md
│   ├── Backend-Technical-Spec.md
│   ├── Frontend-Technical-Spec.md
│   ├── Project-File-Structure.md
│   └── Tasks-Technical-Spec.md
├── frontend-react
│   └── .gitkeep
└── scripts
    └── db
        ├── __pycache__
        │   └── init_db.cpython-312.pyc
        ├── init_db.py
        ├── seed_db.py
        └── setup_db.py

38 directories, 77 files
