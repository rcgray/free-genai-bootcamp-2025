.
├── .cursorignore
├── .cursorrules
├── .env.example
├── .gitignore
├── README.md
├── backend-fastapi
│   ├── .pytest_cache
│   ├── alembic
│   │   ├── README.md
│   │   ├── env.py
│   │   ├── script.py.mako
│   │   └── versions
│   │       └── 20250213_2020_be4ef40d2c7f_initial_migration_create_all_tables.py
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
│   │   │   ├── base.py
│   │   │   ├── group.py
│   │   │   ├── study_session.py
│   │   │   └── word.py
│   │   ├── main.py
│   │   ├── models
│   │   │   ├── __init__.py
│   │   │   ├── base.py
│   │   │   ├── group.py
│   │   │   ├── study_activity.py
│   │   │   ├── study_session.py
│   │   │   ├── word.py
│   │   │   ├── word_group.py
│   │   │   └── word_review_item.py
│   │   ├── schemas
│   │   │   ├── base.py
│   │   │   ├── group.py
│   │   │   ├── study_session.py
│   │   │   └── word.py
│   │   └── services
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
│   ├── tests
│   │   ├── conftest.py
│   │   ├── fixtures
│   │   │   └── test_data.py
│   │   ├── test_api
│   │   │   └── test_v1
│   │   │       ├── test_groups.py
│   │   │       ├── test_study_sessions.py
│   │   │       └── test_words.py
│   │   ├── test_crud
│   │   │   ├── test_group_crud.py
│   │   │   ├── test_study_session_crud.py
│   │   │   └── test_word_crud.py
│   │   ├── test_db
│   │   │   ├── conftest.py
│   │   │   └── test_integration.py
│   │   ├── test_models
│   │   │   ├── conftest.py
│   │   │   ├── test_group_model.py
│   │   │   ├── test_study_activity_model.py
│   │   │   ├── test_study_session_model.py
│   │   │   ├── test_word_model.py
│   │   │   └── test_word_review_item_model.py
│   │   ├── test_schemas
│   │   │   ├── conftest.py
│   │   │   ├── test_base_schema.py
│   │   │   ├── test_group_schema.py
│   │   │   ├── test_study_session_schema.py
│   │   │   └── test_word_schema.py
│   │   └── test_services
│   │       ├── conftest.py
│   │       ├── test_group_service.py
│   │       ├── test_study_service.py
│   │       └── test_word_service.py
│   └── uv.lock
├── data
│   ├── app.db
│   ├── empty.db
│   └── lang_portal.db
├── docs
│   ├── AI-TODO.md
│   ├── Backend-File-Structure.md
│   ├── Backend-Technical-Spec.md
│   ├── Frontend-Design.md
│   ├── Frontend-File-Structure.md
│   ├── Frontend-Technical-Spec.md
│   ├── Project-File-Structure.md
│   ├── Prompts.md
│   └── Tasks-Technical-Spec.md
├── frontend-react
│   ├── .eslintrc.js
│   ├── .gitignore
│   ├── .prettierrc
│   ├── README.md
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── public
│   │   └── vite.svg
│   ├── src
│   │   ├── App.tsx
│   │   ├── Router.tsx
│   │   ├── api
│   │   │   └── axios.ts
│   │   ├── assets
│   │   │   └── styles
│   │   │       └── index.css
│   │   ├── config
│   │   │   └── routes.ts
│   │   ├── contexts
│   │   │   └── ThemeContext
│   │   │       └── index.tsx
│   │   ├── index.css
│   │   ├── layouts
│   │   │   ├── MainLayout
│   │   │   │   ├── Footer
│   │   │   │   │   └── index.tsx
│   │   │   │   ├── Navigation
│   │   │   │   │   └── index.tsx
│   │   │   │   └── index.tsx
│   │   │   └── StudyLayout
│   │   │       └── index.tsx
│   │   ├── main.tsx
│   │   ├── pages
│   │   │   ├── Error
│   │   │   │   └── index.tsx
│   │   │   ├── Groups
│   │   │   │   ├── [id].tsx
│   │   │   │   └── index.tsx
│   │   │   ├── Home
│   │   │   │   └── index.tsx
│   │   │   ├── Sessions
│   │   │   │   └── index.tsx
│   │   │   ├── Settings
│   │   │   │   └── index.tsx
│   │   │   ├── StudyActivities
│   │   │   │   ├── [id].tsx
│   │   │   │   └── index.tsx
│   │   │   └── Words
│   │   │       └── index.tsx
│   │   ├── test
│   │   │   ├── mocks
│   │   │   │   ├── handlers.ts
│   │   │   │   └── server.ts
│   │   │   └── setup.ts
│   │   ├── types
│   │   │   └── api.ts
│   │   ├── utils
│   │   │   └── format.ts
│   │   └── vite-env.d.ts
│   ├── tailwind.config.js
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
│   └── yarn.lock
└── scripts
    └── db
        ├── init_db.py
        └── seed_db.py

55 directories, 125 files
