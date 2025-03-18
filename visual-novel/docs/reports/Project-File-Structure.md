.
├── .cursor
│   └── rules
│       ├── general-all.mdc
│       ├── project.mdc
│       └── python.mdc
├── .cursorignore
├── .env.example
├── .gitignore
├── .streamlit
├── .windsurfrules
├── README.md
├── app
│   ├── api
│   │   └── __init__.py
│   ├── dev_iframe.py
│   ├── main.py
│   └── utils
│       └── __init__.py
├── dev
│   └── Screenshot 2025-03-10 164123.png
├── docs
│   ├── Action-Plan.md
│   ├── Fallback-Dialog.md
│   ├── Game-Design.md
│   ├── Game-LLM-Prompts.md
│   ├── PRD.md
│   ├── Technical-Spec.md
│   ├── cursorrules
│   │   ├── .cursorrules.macos
│   │   └── .cursorrules.windows
│   ├── features
│   │   ├── Dialog-System.md
│   │   ├── Furigana-Integration-Plan.md
│   │   ├── Furigana-Ruby-Text.md
│   │   ├── Phaser-Rewrite.md
│   │   ├── Scene-Specific-Reloading.md
│   │   ├── Study-Scene-Layout.md
│   │   └── Study-Scene.md
│   ├── read-only
│   │   ├── Feature-Spec-Template.md
│   │   ├── Project-Setup.md
│   │   ├── Prompts.md
│   │   └── archive
│   │       └── Prompts01.md
│   ├── reference
│   │   ├── Japanese-Text-Line-Breaking.md
│   │   └── Streamlit-Phaser-Howto.md
│   └── reports
│       └── Project-File-Structure.md
├── phaser_game
│   ├── assets
│   │   ├── audio
│   │   ├── fonts
│   │   └── images
│   │       ├── backgrounds
│   │       │   ├── clothing_store.png
│   │       │   ├── hotel_lobby.png
│   │       │   ├── inside_restaurant.png
│   │       │   ├── inside_train.png
│   │       │   ├── outside_mall.png
│   │       │   ├── outside_restaurant.png
│   │       │   ├── park_bench.png
│   │       │   ├── park_lawn.png
│   │       │   ├── title.png
│   │       │   └── train_platform.png
│   │       └── characters
│   │           ├── kaori
│   │           │   ├── default.png
│   │           │   ├── surprised.png
│   │           │   ├── thinking.png
│   │           │   └── worried.png
│   │           ├── shopkeeper
│   │           │   └── default.png
│   │           ├── takashi
│   │           │   └── default.png
│   │           └── waitress
│   │               └── default.png
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│   │   ├── components
│   │   ├── data
│   │   │   ├── conversations
│   │   │   │   ├── clothing_store.ts
│   │   │   │   ├── hotel_lobby.ts
│   │   │   │   ├── inside_restaurant.ts
│   │   │   │   ├── inside_train.ts
│   │   │   │   ├── outside_mall.ts
│   │   │   │   ├── outside_restaurant.ts
│   │   │   │   ├── park_bench.ts
│   │   │   │   ├── park_lawn.ts
│   │   │   │   └── train_platform.ts
│   │   │   └── study
│   │   │       └── test-phrase-data.ts
│   │   ├── hmr-test.ts
│   │   ├── index.ts
│   │   ├── scenes
│   │   │   ├── BaseScene.ts
│   │   │   ├── SceneRegistry.ts
│   │   │   ├── StudyScene.ts
│   │   │   ├── TestScene.ts
│   │   │   ├── TitleScene.ts
│   │   │   └── VNScene.ts
│   │   ├── types
│   │   └── utils
│   │       ├── AssetManager.ts
│   │       ├── Character.ts
│   │       ├── CharacterManager.ts
│   │       ├── Dialog.ts
│   │       ├── DialogManager.ts
│   │       ├── DialogSystem.ts
│   │       ├── DialogSystemTests.ts
│   │       ├── FuriganaRenderer.ts
│   │       ├── GameStateManager.ts
│   │       ├── JapaneseTextWrapper.ts
│   │       ├── MockDialogData.ts
│   │       ├── PhaserDebug.ts
│   │       ├── README.md
│   │       ├── StatefulScene.ts
│   │       └── index.ts
│   ├── tests
│   │   └── FuriganaRenderer.test.ts
│   ├── tsconfig.json
│   └── vite.config.ts
├── pyproject.toml
├── scripts
│   ├── build_game.py
│   ├── cleanup-dev.sh
│   ├── run_app.py
│   ├── start-dev.sh
│   ├── update_docs.py
│   ├── watch-phaser.sh
│   └── watch-streamlit.sh
├── tests
└── uv.lock

37 directories, 100 files
