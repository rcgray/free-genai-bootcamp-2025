# Japanese Language Learning Visual Novel

A visual novel game designed to help English speakers learn Japanese through interactive storytelling and gameplay, powered by a Large Language Model for dynamic dialog generation. The application uses Streamlit as the web framework with an embedded Phaser game for the visual novel interface.

## Features

- Interactive visual novel gameplay with dynamic interactions
- Japanese language learning integrated into the gameplay
- Dynamic dialog generation using LLM
- Vocabulary tracking and learning progress
- Multiple difficulty levels for language learners
- Streamlit-based user interface with embedded Phaser game

## Project Structure

```
.
├── app/                    # Streamlit application code
│   ├── api/                # API integration
│   └── main.py             # Streamlit entry point
├── phaser_game/            # Phaser game (TypeScript)
│   ├── assets/             # Game assets
│   │   ├── images/         # Image files
│   │   ├── audio/          # Audio files
│   │   └── fonts/          # Font files
│   ├── src/                # Game source code
│   │   ├── scenes/         # Game scenes
│   │   └── utils/          # Utility functions
│   ├── index.html          # Game HTML template
│   ├── package.json        # npm dependencies
│   ├── tsconfig.json       # TypeScript configuration
│   └── vite.config.ts      # Vite build configuration
├── data/                   # Game data
├── docs/                   # Documentation
├── scripts/                # Build and development scripts
├── .streamlit/             # Streamlit configuration
├── tests/                  # Test files
├── .env.example            # Example environment variables
├── pyproject.toml          # Python dependencies and tool configuration
└── README.md               # This file
```

## Prerequisites

- Python 3.12 or higher
- Node.js 16.x or higher
- npm 8.x or higher
- uv (for Python dependency management)

## Setup

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/japanese-visual-novel.git
   cd japanese-visual-novel
   ```

2. Set up a Python environment:
   ```bash
   # Using conda (recommended)
   conda create -n vn python=3.12
   conda activate vn
   
   # Or using pyenv + uv venv
   pyenv install 3.12
   pyenv local 3.12
   uv venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. Install Python dependencies:
   ```bash
   uv sync  # for production dependencies
   # or
   uv sync --extra dev  # for development dependencies
   ```

4. Install Node.js dependencies:
   ```bash
   cd phaser_game
   npm install
   cd ..
   ```

5. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```
   
6. Edit the `.env` file to add your OpenAI API key (optional, for dynamic dialog generation).

### Building the Game

To build the Phaser game for production:

```bash
npm --prefix phaser_game run build
```

### Running the Application

To run the Streamlit app with the built Phaser game:

```bash
conda activate vn  # or your environment activation command
uv run streamlit run app/main.py
```

## Development Workflow

This project uses a dual development workflow to provide the best experience when working on both the Phaser game and the Streamlit app.

### Option 1: Automatic Development Environment (Recommended)

Run the all-in-one development script:

```bash
./scripts/start-dev.sh
```

This will:
1. Clean up any existing development processes
2. Launch the Phaser development server in one terminal
3. Launch the Streamlit app in another terminal

### Option 2: Manual Development Environment

For more control, run the scripts in separate terminals in this specific order:

Terminal 1 (Phaser - Start this FIRST):
```bash
./scripts/watch-phaser.sh
```

Terminal 2 (Streamlit - Start this AFTER Phaser is running):
```bash
./scripts/watch-streamlit.sh
```

### How the Development Workflow Works

- The Phaser game runs a Vite development server with hot module replacement (HMR)
- The Streamlit app detects the Vite dev server and embeds it via iframe
- Changes to Phaser game files are instantly reflected without manual refresh
- Changes to Streamlit app files utilize Streamlit's built-in hot reloading
- Each script now handles only its own process cleanup to avoid conflicts

### Stopping the Development Environment

To stop both the Phaser and Streamlit servers:

```bash
./scripts/cleanup-dev.sh
```

Or close the terminal windows where they're running.

## Utility Scripts

The project includes several utility scripts to help with development, building, and maintenance:

### Development Scripts

- `./scripts/start-dev.sh` - One-click script to start both Phaser and Streamlit servers in development mode
- `./scripts/watch-phaser.sh` - Starts the Phaser development server with hot module replacement
- `./scripts/watch-streamlit.sh` - Starts the Streamlit app in watch mode, connecting to the Phaser dev server
- `./scripts/cleanup-dev.sh` - Stops all development servers (Phaser and Streamlit)

### Build Scripts

- `./scripts/build_game.py` - Python script to build the Phaser game for production
- `./scripts/run_app.py` - Builds the game (if needed) and runs the Streamlit app

### Maintenance Scripts

- `./scripts/update_docs.py` - Updates project documentation files like Project-File-Structure.md

## Development Tools

### Python Tools

- Format code:
  ```bash
  conda activate vn
  ruff format .
  ```

- Lint code:
  ```bash
  conda activate vn
  ruff check .
  ```

- Type check:
  ```bash
  conda activate vn
  mypy .
  ```

- Run tests:
  ```bash
  conda activate vn
  uv run pytest
  ```

### TypeScript/Phaser Tools

- Build the game:
  ```bash
  npm --prefix phaser_game run build
  ```

- Run the development server:
  ```bash
  npm --prefix phaser_game run dev
  ```

- Preview the built game:
  ```bash
  npm --prefix phaser_game run preview
  ```

## Troubleshooting

### Hot Module Replacement (HMR) Issues

If changes to Phaser game files aren't automatically reflected:

1. Check the browser console for error messages
2. Try running `./scripts/cleanup-dev.sh` to kill any lingering processes
3. Restart the development servers
4. Try opening the Phaser dev server directly at http://localhost:5173

### Streamlit Connection Issues

If Streamlit cannot connect to the Phaser development server:

1. Ensure the Phaser server is running first
2. Verify the Phaser server is running on port 5173
3. Check for any browser console errors
4. Try running `./scripts/cleanup-dev.sh` and restart both servers

### Asset Loading Issues

If game assets aren't loading correctly:

1. Ensure the assets are in the `phaser_game/assets` directory
2. Check the browser console for 404 errors
3. Verify the file paths in your game code
4. Rebuild the game with `npm --prefix phaser_game run build`

