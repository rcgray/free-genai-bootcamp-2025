# Technical Specification - Japanese Language Learning Visual Novel

## Technology Stack

### Core Technologies
- **Python 3.10+**: Base programming language
- **Streamlit 1.32.0**: Web framework for creating the interactive user interface
- **OpenAI API Standard**: For LLM integration (with flexibility to change providers)
- **TinyDB 4.8.0**: Lightweight, document-oriented database for game state persistence
- **Pydantic 2.5.2**: Data validation and settings management
- **Python-dotenv 1.0.0**: Environment variable management

### Development Tools
- **Ruff**: Fast, comprehensive Python linter and formatter
- **MyPy**: Static type checker for Python
- **Pytest**: Testing framework
- **uv**: Modern Python package installer and resolver

### Japanese Language Processing
- **Fugashi 1.3.0**: Japanese morphological analyzer
- **Unidic-lite 1.0.8**: Dictionary for Japanese language processing

### Image Processing
- **Pillow 10.1.0**: Python Imaging Library for image processing

### Documentation

- **Streamlit Documentation**: [Streamlit Documentation](https://docs.streamlit.io/)
- **OpenAI API Documentation**: [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- **TinyDB Documentation**: [TinyDB Documentation](https://tinydb.readthedocs.io/en/latest/)

## Project Architecture

### Directory Structure
```
visual-novel/
├── app/                # Main application
│   ├── __init__.py
│   ├── main.py         # Entry point (Streamlit application)
│   ├── api/            # API endpoints
│   │   └── llm.py      # LLM integration
│   ├── game/           # Game logic
│   │   ├── engine.py   # Core game engine
│   │   ├── scenes/     # Game scenes (Title, VN, Study)
│   │   ├── characters/ # Character definitions
│   │   └── dialog/     # Dialog management
│   └── utils/          # Utility functions
│       ├── config.py   # Configuration management
│       ├── database.py # Database operations
│       └── language.py # Language processing utilities
├── assets/             # Game assets
│   ├── images/         # Background and character images
│   │   ├── backgrounds/
│   │   └── characters/
│   ├── audio/          # Sound effects and music
│   └── fonts/          # Custom fonts for Japanese text
├── data/               # Data storage
│   ├── dialog/         # Static dialog JSON files
│   └── vocabulary.json # Vocabulary database
├── scripts/            # Utility scripts
│   └── update_docs.py  # Documentation updater
├── static/             # Static web files
│   ├── js/             # JavaScript files
│   ├── css/            # Stylesheets
│   └── index.html      # HTML template
└── tests/              # Test suite
    ├── conftest.py     # Test fixtures and configuration
    ├── test_game_engine.py
    └── test_language_utils.py
```

### Component Details

#### Game Engine (`app/game/engine.py`)
The game engine manages the core game logic and state:

**Key Classes:**
```python
class GameEngine:
    """Core game engine that manages scenes, characters, and game state."""
    def __init__(self, config: Dict[str, Any]) -> None: ...
    def register_scene(self, scene_id: str, scene_class: Type[Scene], scene_config: Dict[str, Any]) -> None: ...
    def register_character(self, character: Character) -> None: ...
    def start_game(self, initial_scene: str) -> None: ...
    def transition_to_scene(self, scene_id: str) -> None: ...
    def update(self, delta_time: float) -> None: ...
    def render(self) -> None: ...
    def handle_input(self, event: Dict[str, Any]) -> None: ...
    def save_game(self, save_slot: int = 0) -> bool: ...
    def load_game(self, save_slot: int = 0) -> bool: ...
```

#### Scene Management (`app/game/scenes/`)
- Implements the game scenes: Intro, Title, VN, and Study
- Handles transitions between scenes
- Manages game state and progression

**Key Classes:**
```python
class Scene:
    """Base class for all game scenes."""
    def __init__(self, name: str, config: Dict[str, Any]) -> None: ...
    def enter(self) -> None: ...
    def exit(self) -> None: ...
    def update(self, delta_time: float) -> None: ...
    def render(self) -> None: ...
    def handle_input(self, event: Dict[str, Any]) -> None: ...
    def transition_to(self, scene_name: str) -> None: ...

class IntroScene(Scene):
    """Introduction scene with initial story setup and player name input."""
    def __init__(self, name: str, config: Dict[str, Any]) -> None: ...
    def enter(self) -> None: ...
    def update(self, delta_time: float) -> None: ...
    def render(self) -> None: ...
    def handle_input(self, event: Dict[str, Any]) -> None: ...
```

#### Character Management (`app/game/characters/`)
- Defines character attributes and sprites
- Manages character emotions and expressions
- Handles character positioning in scenes

**Key Classes:**
```python
class Character:
    """Represents a character in the visual novel."""
    def __init__(
        self,
        name: str,
        display_name: str,
        description: str,
        images: Dict[str, str],
        traits: Optional[Dict[str, Any]] = None,
        language_level: str = "beginner"
    ) -> None: ...
    def get_image(self, pose: str = "default") -> str: ...
    def add_dialog(self, text: str, translation: str, context: Optional[Dict[str, Any]] = None) -> None: ...
    def to_dict(self) -> Dict[str, Any]: ...
```

#### Dialog Management (`app/game/dialog/`)
- Handles text display and formatting
- Manages dialog flow and choices
- Integrates with LLM for dynamic content

**Key Classes:**
```python
class DialogManager:
    """Manages dialog display and interaction."""
    def __init__(
        self,
        llm_client: Optional[LLMClient] = None,
        static_dialog_path: Optional[Path] = None
    ) -> None: ...
    def load_static_dialog(self, scene_id: str) -> List[Dict[str, Any]]: ...
    def generate_dynamic_dialog(
        self,
        character_name: str,
        context: Dict[str, Any],
        language_level: str = "beginner"
    ) -> Dict[str, Any]: ...
    def generate_choices(
        self,
        context: Dict[str, Any],
        num_choices: int = 3,
        language_level: str = "beginner"
    ) -> List[Dict[str, Any]]: ...
```

#### LLM Integration (`app/api/llm.py`)
- Implements OpenAI API standard interface
- Handles prompt construction for dialog generation
- Processes language learning features (translation, pronunciation)

**Key Classes:**
```python
class LLMClient:
    """Client for interacting with LLM APIs."""
    def __init__(self, api_key: str, model: str = "gpt-4") -> None: ...
    def generate_dialog(self, context: Dict[str, Any], character_id: str) -> str: ...
    def generate_choices(self, context: Dict[str, Any]) -> List[str]: ...
    def translate_text(self, japanese_text: str) -> str: ...
    def get_pronunciation(self, japanese_text: str) -> str: ...
```

#### Database Management (`app/utils/database.py`)
- Manages game state persistence
- Handles player data and game saves
- Provides vocabulary access

**Key Classes:**
```python
class PlayerData(TypedDict):
    """Type definition for player data."""
    name: str
    language_level: str
    progress: Dict[str, Any]
    learned_words: List[Dict[str, Any]]
    score: int

class GameSave(TypedDict):
    """Type definition for game save data."""
    save_id: int
    timestamp: str
    player: PlayerData
    current_scene: str
    flags: Dict[str, Any]
    inventory: List[Dict[str, Any]]

class DatabaseManager:
    """Manages database operations for the game."""
    def __init__(self, data_path: Union[str, Path]) -> None: ...
    def save_game(self, save_data: GameSave) -> bool: ...
    def load_game(self, save_id: int) -> Optional[GameSave]: ...
    def get_vocabulary_word(self, word: str) -> Optional[Dict[str, Any]]: ...
    def update_player_data(self, player_data: PlayerData) -> bool: ...
```

#### Language Utilities (`app/utils/language.py`)
- Provides Japanese language processing
- Handles vocabulary extraction and analysis
- Manages pronunciation guides and translations

**Key Functions:**
```python
def extract_vocabulary(text: str) -> List[str]: ...
def get_word_info(
    word: str,
    llm_client: Optional[LLMClient] = None,
    vocabulary_db: Optional[Path] = None
) -> Dict[str, Any]: ...
def get_pronunciation_guide(
    text: str,
    llm_client: Optional[LLMClient] = None
) -> str: ...
def translate_text(
    text: str,
    source_lang: str = "ja",
    target_lang: str = "en",
    llm_client: Optional[LLMClient] = None
) -> str: ...
```

### Streamlit Integration

The application uses Streamlit as the primary web framework, which differs from the original Phaser-based approach. Key Streamlit components include:

1. **Main Application (`app/main.py`)**
   - Sets up the Streamlit page configuration
   - Initializes session state for game persistence
   - Renders the game UI components

2. **Game UI Components**
   - Dialog rendering with Japanese and English text
   - Character display with emotion states
   - Choice selection interface
   - Game controls (save/load/settings)

3. **Session State Management**
   - Tracks game state across interactions
   - Manages dialog history and player choices
   - Persists player progress and settings

### Game Flow

1. **Game Initialization**
   - Load configuration from environment variables
   - Initialize Streamlit session state
   - Set up game engine and components
   - Display intro scene

2. **Game Progression**
   - Render current scene and dialog
   - Process player input and choices
   - Transition between scenes based on player actions
   - Update game state and session variables

3. **Language Learning Integration**
   - Extract vocabulary from dialog
   - Provide translations and pronunciation guides
   - Track player's vocabulary progress
   - Offer contextual explanations for language elements

### Data Management

1. **Static Data**
   - Dialog scripts stored as JSON files
   - Character definitions in Python modules
   - Vocabulary database as JSON

2. **Dynamic Data**
   - Game saves stored in TinyDB
   - Player progress tracking
   - Vocabulary mastery levels

## Development Environment

### Environment Management
- Conda or pyenv for Python version management
- uv for dependency management
- Virtual environments for isolation

### Dependency Management
- Core dependencies defined in `pyproject.toml`
- Package installation and management via `uv`
- Version pinning for reproducibility
- Development dependencies included in `pyproject.toml` under tool sections

### Code Quality
- Ruff configuration in `pyproject.toml`
- MyPy strict type checking
- Google-style docstrings
- 100-character line length

### Testing Strategy
- Unit tests with pytest
- Integration tests for game logic
- Mocked LLM responses
- Test fixtures in conftest.py

## Deployment Considerations

### Local Deployment
- Streamlit local server
- Environment variable configuration via .env file
- Local file system for data storage
- OpenAI API key required for dynamic content

### Resource Requirements
- Python 3.10+ runtime
- Modern web browser
- Internet connection for LLM API
- Sufficient memory for application

### Security Considerations
- API key management through environment variables
- Input validation for all user inputs
- Error handling for external services
- Content filtering for LLM responses

## Future Technical Considerations

### Scalability
- Cloud deployment options (Streamlit Cloud)
- Database migration to more robust solutions
- User account system
- Progress tracking across sessions

### Performance Optimization
- Caching strategies for LLM responses
- Asynchronous API calls
- Resource cleanup
- Image optimization

### Feature Expansion
- Voice generation for dialog
- Speech recognition for pronunciation practice
- Expanded character and scene library
- Advanced language learning analytics 