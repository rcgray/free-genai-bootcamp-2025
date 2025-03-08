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
├── app/                    # Application code
│   ├── api/                # API integration
│   ├── game/               # Game engine
│   │   ├── characters/     # Character definitions
│   │   ├── dialog/         # Dialog management
│   │   └── scenes/         # Scene definitions
│   ├── utils/              # Utility functions
│   └── main.py             # Streamlit entry point
├── assets/                 # Game assets
│   ├── images/             # Image files
│   │   ├── backgrounds/    # Background images
│   │   └── characters/     # Character images
│   ├── audio/              # Audio files
│   └── fonts/              # Font files
├── data/                   # Game data
├── docs/                   # Documentation
├── static/                 # Static files
│   ├── css/                # CSS files
│   └── js/                 # JavaScript files including Phaser
├── .streamlit/             # Streamlit configuration
├── tests/                  # Test files
├── .env.example            # Example environment variables
├── pyproject.toml          # Python dependencies and tool configuration
└── README.md               # This file
```

## Setup

### Prerequisites

- Python 3.10 or higher
- uv (for dependency management)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/japanese-visual-novel.git
   cd japanese-visual-novel
   ```

2. Set up a virtual environment (using your preferred method):
   ```bash
   # Using conda
   conda create -n visual-novel python=3.12
   conda activate visual-novel
   
   # Or using pyenv + uv venv
   pyenv install 3.12
   pyenv local 3.12
   uv venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   uv sync  # for production dependencies
   # or
   uv sync --extra dev  # for development dependencies
   ```

4. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```
   
5. Edit the `.env` file to add your OpenAI API key (optional, for dynamic dialog generation).

6. (Optional) Disable Streamlit telemetry:
   The application uses Streamlit, which collects anonymous usage statistics by default.
   A configuration file is included at `.streamlit/config.toml` that disables this behavior.

### Running the Application

```bash
uv run streamlit run app/main.py
```

### Development

- Format code:
  ```bash
  ruff format .
  ```

- Lint code:
  ```bash
  ruff check .
  ```

- Type check:
  ```bash
  mypy .
  ```

- Run tests:
  ```bash
  uv run pytest
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

