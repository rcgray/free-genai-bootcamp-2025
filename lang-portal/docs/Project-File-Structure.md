.
├── .cursorignore
├── .cursorrules
├── .env.example
├── .gitignore
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
├── ata
├── backend-fastapi
│   ├── .pytest_cache
│   ├── alembic
│   │   ├── README.md
│   │   ├── __pycache__
│   │   ├── env.py
│   │   ├── script.py.mako
│   │   └── versions
│   │       ├── 20250213_2020_be4ef40d2c7f_initial_migration_create_all_tables.py
│   │       └── __pycache__
│   ├── alembic.ini
│   ├── app
│   │   ├── __pycache__
│   │   ├── api
│   │   │   └── v1
│   │   │       ├── __pycache__
│   │   │       ├── endpoints
│   │   │       │   ├── __pycache__
│   │   │       │   ├── groups.py
│   │   │       │   ├── study_sessions.py
│   │   │       │   └── words.py
│   │   │       └── router.py
│   │   ├── core
│   │   │   ├── __pycache__
│   │   │   ├── config.py
│   │   │   ├── database.py
│   │   │   └── exceptions.py
│   │   ├── crud
│   │   │   ├── __pycache__
│   │   │   ├── base.py
│   │   │   ├── group.py
│   │   │   ├── study_session.py
│   │   │   └── word.py
│   │   ├── main.py
│   │   ├── models
│   │   │   ├── __init__.py
│   │   │   ├── __pycache__
│   │   │   ├── base.py
│   │   │   ├── group.py
│   │   │   ├── study_activity.py
│   │   │   ├── study_session.py
│   │   │   ├── word.py
│   │   │   ├── word_group.py
│   │   │   └── word_review_item.py
│   │   ├── schemas
│   │   │   ├── __pycache__
│   │   │   ├── base.py
│   │   │   ├── group.py
│   │   │   ├── study_session.py
│   │   │   └── word.py
│   │   └── services
│   │       ├── __pycache__
│   │       ├── group_service.py
│   │       ├── study_service.py
│   │       └── word_service.py
│   ├── htmlcov
│   ├── pyproject.toml
│   ├── seed
│   │   ├── groups.json
│   │   ├── study_activities.json
│   │   ├── word_groups.json
│   │   ├── words.adjectives.json
│   │   └── words.verbs.json
│   ├── sql
│   ├── tests
│   │   ├── __pycache__
│   │   ├── conftest.py
│   │   ├── fixtures
│   │   │   ├── __pycache__
│   │   │   └── test_data.py
│   │   ├── test_api
│   │   │   └── test_v1
│   │   │       ├── __pycache__
│   │   │       ├── test_groups.py
│   │   │       ├── test_study_sessions.py
│   │   │       └── test_words.py
│   │   ├── test_crud
│   │   │   ├── __pycache__
│   │   │   ├── test_group_crud.py
│   │   │   ├── test_study_session_crud.py
│   │   │   └── test_word_crud.py
│   │   ├── test_db
│   │   │   ├── __pycache__
│   │   │   ├── conftest.py
│   │   │   └── test_integration.py
│   │   ├── test_models
│   │   │   ├── __pycache__
│   │   │   ├── conftest.py
│   │   │   └── test_word_model.py
│   │   └── test_services
│   │       ├── __pycache__
│   │       ├── conftest.py
│   │       ├── test_group_service.py
│   │       ├── test_study_service.py
│   │       └── test_word_service.py
│   └── uv.lock
├── data
│   ├── empty.db
│   └── lang_portal.db
├── docs
│   ├── AI-TODO.md
│   ├── Backend-Technical-Spec.md
│   ├── Frontend-Technical-Spec.md
│   ├── Project-File-Structure.md
│   ├── Prompts.md
│   └── Tasks-Technical-Spec.md
├── frontend-react
│   └── .gitkeep
├── scripts
│   └── db
│       ├── __pycache__
│       ├── init_db.py
│       └── seed_db.py
└── tests
    └── test_api
        └── test_v1

58 directories, 80 files
