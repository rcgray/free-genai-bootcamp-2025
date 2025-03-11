.
├── .cursorignore
├── .cursorrules
├── .env.example
├── .gitignore
├── .streamlit
├── README.md
├── app
│   ├── api
│   │   └── __init__.py
│   ├── dev_iframe.py
│   ├── main.py
│   └── utils
│       └── __init__.py
├── dev
├── docs
│   ├── Action-Plan.md
│   ├── Game-Design.md
│   ├── Game-LLM-Prompts.md
│   ├── PRD.md
│   ├── Technical-Spec.md
│   ├── features
│   │   ├── Dialog-System.md
│   │   ├── Phaser-Rewrite.md
│   │   ├── Scene-Specific-Reloading.md
│   │   └── Study-Scene.md
│   ├── read-only
│   │   ├── Feature-Spec-Template.md
│   │   ├── Project-Setup.md
│   │   ├── Prompt-Header.md
│   │   └── Prompts.md
│   ├── reference
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
│   │           └── takashi
│   │               └── default.png
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│   │   ├── data
│   │   │   └── conversations
│   │   │       └── train_platform.ts
│   │   ├── hmr-test.ts
│   │   ├── index.ts
│   │   ├── scenes
│   │   │   ├── BaseScene.ts
│   │   │   ├── SceneRegistry.ts
│   │   │   ├── StudyScene.ts
│   │   │   ├── TestScene.ts
│   │   │   ├── TitleScene.ts
│   │   │   └── VNScene.ts
│   │   └── utils
│   │       ├── AssetManager.ts
│   │       ├── Character.ts
│   │       ├── CharacterManager.ts
│   │       ├── Dialog.ts
│   │       ├── DialogManager.ts
│   │       ├── DialogSystem.ts
│   │       ├── DialogSystemTests.ts
│   │       ├── GameStateManager.ts
│   │       ├── MockDialogData.ts
│   │       ├── PhaserDebug.ts
│   │       └── StatefulScene.ts
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

28 directories, 74 files
