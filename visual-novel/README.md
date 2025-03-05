# Japanese Language Learning Visual Novel

A visual novel game designed to help English speakers learn Japanese through interactive storytelling and gameplay, powered by a Large Language Model for dynamic dialog generation.

## Features

- Interactive visual novel gameplay with branching storylines
- Japanese language learning integrated into the gameplay
- Dynamic dialog generation using LLM
- Vocabulary tracking and learning progress
- Multiple difficulty levels for language learners
- Save and load game progress

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
│   └── main.py             # Main entry point
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
│   └── js/                 # JavaScript files
├── tests/                  # Test files
├── .env.example            # Example environment variables
├── requirements.txt        # Python dependencies
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
   conda create -n visual-novel python=3.10
   conda activate visual-novel
   
   # Or using pyenv + uv venv
   pyenv install 3.10.0
   pyenv local 3.10.0
   uv venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   uv sync
   ```

4. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```
   
5. Edit the `.env` file to add your OpenAI API key (optional, for dynamic dialog generation).

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

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- OpenAI for the LLM API
- Streamlit for the web framework
- All contributors to the project 