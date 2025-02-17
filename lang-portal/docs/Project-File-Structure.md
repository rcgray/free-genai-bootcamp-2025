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
│   │   │       │   ├── activities.py
│   │   │       │   ├── groups.py
│   │   │       │   ├── sessions.py
│   │   │       │   └── words.py
│   │   │       └── router.py
│   │   ├── core
│   │   │   ├── config.py
│   │   │   ├── database.py
│   │   │   └── exceptions.py
│   │   ├── crud
│   │   │   ├── activity.py
│   │   │   ├── base.py
│   │   │   ├── group.py
│   │   │   ├── session.py
│   │   │   └── word.py
│   │   ├── main.py
│   │   ├── models
│   │   │   ├── activity.py
│   │   │   ├── base.py
│   │   │   ├── group.py
│   │   │   ├── session.py
│   │   │   ├── word.py
│   │   │   ├── word_group.py
│   │   │   └── word_review_item.py
│   │   ├── schemas
│   │   │   ├── activity.py
│   │   │   ├── base.py
│   │   │   ├── group.py
│   │   │   ├── session.py
│   │   │   └── word.py
│   │   └── services
│   │       ├── activity_service.py
│   │       ├── group_service.py
│   │       ├── session_service.py
│   │       └── word_service.py
│   ├── htmlcov
│   ├── pyproject.toml
│   ├── seed
│   │   ├── activities.json
│   │   ├── groups.json
│   │   ├── word_groups.json
│   │   ├── words.adjectives.json
│   │   └── words.verbs.json
│   ├── tests
│   │   ├── conftest.py
│   │   ├── fixtures
│   │   │   └── test_data.py
│   │   ├── test_api
│   │   │   └── test_v1
│   │   │       ├── test_activities.py
│   │   │       ├── test_groups.py
│   │   │       ├── test_sessions.py
│   │   │       └── test_words.py
│   │   ├── test_crud
│   │   │   ├── test_activity_crud.py
│   │   │   ├── test_group_crud.py
│   │   │   ├── test_session_crud.py
│   │   │   └── test_word_crud.py
│   │   ├── test_db
│   │   │   ├── conftest.py
│   │   │   └── test_integration.py
│   │   ├── test_models
│   │   │   ├── conftest.py
│   │   │   ├── test_activity_model.py
│   │   │   ├── test_group_model.py
│   │   │   ├── test_session_model.py
│   │   │   ├── test_word_model.py
│   │   │   └── test_word_review_item_model.py
│   │   ├── test_schemas
│   │   │   ├── conftest.py
│   │   │   ├── test_activity_schema.py
│   │   │   ├── test_base_schema.py
│   │   │   ├── test_group_schema.py
│   │   │   ├── test_session_schema.py
│   │   │   └── test_word_schema.py
│   │   └── test_services
│   │       ├── conftest.py
│   │       ├── test_activity_service.py
│   │       ├── test_group_service.py
│   │       ├── test_session_service.py
│   │       └── test_word_service.py
│   └── uv.lock
├── data
│   └── empty.db
├── docs
│   ├── AI-TODO.md
│   ├── Backend-Technical-Spec.md
│   ├── Database-Schema.md
│   ├── Database-Schema.png
│   ├── Frontend-Design.md
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
│   │   │   ├── ActivityLayout
│   │   │   │   └── index.tsx
│   │   │   └── MainLayout
│   │   │       ├── Footer
│   │   │       │   └── index.tsx
│   │   │       ├── Navigation
│   │   │       │   └── index.tsx
│   │   │       └── index.tsx
│   │   ├── main.tsx
│   │   ├── pages
│   │   │   ├── Activities
│   │   │   │   ├── [id].tsx
│   │   │   │   └── index.tsx
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

55 directories, 130 files
