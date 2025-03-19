# Japanese Language Learning Visual Novel

A visual novel game designed to help English speakers learn Japanese through interactive storytelling and gameplay, powered by a Large Language Model for dynamic dialog generation. The application uses Streamlit as the web framework with an embedded Phaser game for the visual novel interface.

## Features

- Interactive visual novel gameplay with dynamic interactions
- Japanese language learning integrated into the gameplay
- Dynamic dialog generation using LLM through a secure proxy server
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
├── server/                 # LLM proxy server (Node.js/Express)
│   ├── server.js           # Proxy server implementation
│   ├── package.json        # npm dependencies for the proxy
│   ├── .env.example        # Example environment variables for the proxy
│   └── README.md           # Proxy server documentation
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

4. Install Node.js dependencies for the Phaser game:
   ```bash
   cd phaser_game
   npm install
   cd ..
   ```

5. Install Node.js dependencies for the LLM proxy server:
   ```bash
   cd server
   npm install
   cd ..
   ```

6. Create `.env` files from the examples:
   ```bash
   # For the main app
   cp .env.example .env
   
   # For the LLM proxy server (IMPORTANT!)
   cp server/.env.example server/.env
   ```
   
7. Edit the `.env` files:
   - Edit `server/.env` to add your OpenAI API key (or other LLM provider information) for the proxy server
   - Edit the main `.env` file if needed for other environment variables

### Building the Game

To build the Phaser game for production:

```bash
npm --prefix phaser_game run build
```

### Running the Application

To run the complete application (proxy server, Phaser game, and Streamlit app):

```bash
conda activate vn  # or your environment activation command
./scripts/start-dev-with-proxy.sh
```

## Development Workflow

This project uses several development workflows to provide the best experience when working on all components.

### Option 1: All-in-One Development Environment (Recommended)

Run the all-in-one development script with proxy server:

```bash
./scripts/start-dev-with-proxy.sh
```

This will:
1. Start the LLM proxy server for secure API key handling
2. Launch the Phaser development server with hot module replacement
3. Launch the Streamlit app connected to both

### Option 2: Without LLM Features

If you don't need the LLM features during development:

```bash
./scripts/start-dev.sh
```

This will start only the Phaser game and Streamlit app without the proxy server.

### Option 3: Manual Development Environment

For more control, run the scripts in separate terminals:

Terminal 1 (LLM Proxy Server):
```bash
cd server && npm run dev
```

This starts the proxy server on port 3000 (by default). You can test it with:

```bash
curl http://localhost:3000/api/health
```

Terminal 2 (Phaser):
```bash
./scripts/watch-phaser.sh
```

This starts the Vite server for the Phaser game with hot-reloading on port 5173 (by default). You can test it by visiting `http://localhost:5173` in a browser.

Terminal 3 (Streamlit):
```bash
./scripts/watch-streamlit.sh
```

This starts the Streamlit server for the frontend with hot-reloading on port 8501 (by default). It should automatically open a browser window, or otherwise you can visiting `http://localhost:8501` in a browser.


### How the Development Workflow Works

- The LLM proxy server securely handles API requests without exposing keys in client code
- The Phaser game runs a Vite development server with hot module replacement (HMR)
- The Streamlit app detects the Vite dev server and embeds it via iframe
- Changes to Phaser game files are instantly reflected without manual refresh
- Changes to Streamlit app files utilize Streamlit's built-in hot reloading

### Stopping the Development Environment

To stop all the development servers:

```bash
./scripts/cleanup-dev.sh
```

Or close the terminal windows where they're running.

## Utility Scripts

The project includes several utility scripts to help with development, building, and maintenance:

### Development Scripts

- `./scripts/start-dev-with-proxy.sh` - One-click script to start the proxy server, Phaser, and Streamlit
- `./scripts/start-dev.sh` - Start both Phaser and Streamlit servers (without LLM proxy)
- `./scripts/watch-phaser.sh` - Starts the Phaser development server with hot module replacement
- `./scripts/watch-streamlit.sh` - Starts the Streamlit app in watch mode
- `./scripts/cleanup-dev.sh` - Stops all development servers

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

### Node.js/Express Tools

- Run the LLM proxy server:
  ```bash
  npm --prefix server start
  ```

- Run the proxy in development mode:
  ```bash
  npm --prefix server run dev
  ```

## Troubleshooting

### LLM Proxy Server Issues

If the application cannot connect to the LLM API:

1. Verify the proxy server is running (`npm --prefix server run dev`)
2. Check that you've created a `server/.env` file with your API key
3. Look for error messages in the proxy server console
4. Try hitting the health check endpoint: http://localhost:3000/api/health
5. If needed, restart the proxy server and the application

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

