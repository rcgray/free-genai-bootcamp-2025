# Technical Specification - Japanese Language Learning Visual Novel

## Technology Stack

### Core Technologies
- **Python 3.12+**: Base programming language
- **Phaser 3.88.2**: JavaScript game framework for creating the visual novel interface
- **OpenAI API Standard**: For LLM integration (with flexibility to change providers)
- **TinyDB**: Lightweight, document-oriented database (for future implementation)

### Development Tools
- **Ruff**: Fast, comprehensive Python linter and formatter
- **MyPy**: Static type checker for Python
- **Pytest**: Testing framework
- **uv**: Modern Python package installer and resolver

### Documentation

- Phaser General Documentation: (@Phaser General Documentation) - https://docs.phaser.io/phaser/getting-started/what-is-phaser
- Phaser API Documentation: (@Phaser API Documentation) - https://docs.phaser.io/api-documentation/api-documentation

## Project Architecture

### Directory Structure
```
visual-novel/
├── app/                # Main application
│   ├── __init__.py
│   ├── main.py         # Entry point
│   ├── api/            # API endpoints
│   │   └── llm.py      # LLM integration
│   ├── game/           # Game logic
│   │   ├── scenes/     # Game scenes (Title, VN, Study)
│   │   ├── characters/ # Character definitions
│   │   └── dialog/     # Dialog management
│   └── utils/          # Utility functions
├── assets/             # Game assets
│   ├── images/         # Background and character images
│   │   ├── backgrounds/
│   │   └── characters/
│   ├── audio/          # Sound effects and music
│   └── fonts/          # Custom fonts for Japanese text
├── data/               # Data storage (for future implementation)
│   └── game.json       # TinyDB database
├── scripts/            # Utility scripts
│   └── update_docs.py  # Documentation updater
├── static/             # Static web files
│   ├── js/             # JavaScript files including Phaser
│   ├── css/            # Stylesheets
│   └── index.html      # Main HTML file
└── tests/              # Test suite
    ├── test_game.py
    └── test_llm.py
```

### Component Details

#### Game Engine (`app/game/`)
The game module contains the core game logic, organized into submodules:

##### Scene Management (`app/game/scenes/`)
- Implements the three main scenes: Title, VN, and Study
- Handles transitions between scenes
- Manages game state and progression

**Key Classes:**
```python
class TitleScene:
    """Title screen with game options and start button."""
    def __init__(self, config: Dict[str, Any]) -> None: ...
    def render(self) -> None: ...
    def handle_input(self, event: Dict[str, Any]) -> None: ...

class VNScene:
    """Main visual novel scene with character interactions."""
    def __init__(self, game_state: Dict[str, Any]) -> None: ...
    def load_background(self, image_path: str) -> None: ...
    def display_character(self, character_id: str, emotion: str) -> None: ...
    def display_dialog(self, text: str, character_id: Optional[str] = None) -> None: ...
    def display_choices(self, choices: List[str]) -> None: ...
    def handle_choice(self, choice_index: int) -> None: ...

class StudyScene:
    """Language study scene for focused learning."""
    def __init__(self, phrase: str, translation: str, pronunciation: str) -> None: ...
    def render(self) -> None: ...
    def return_to_vn(self) -> None: ...
```

##### Character Management (`app/game/characters/`)
- Defines character attributes and sprites
- Manages character emotions and expressions
- Handles character positioning in scenes

**Key Classes:**
```python
class Character:
    """Represents a character in the visual novel."""
    def __init__(self, 
                 character_id: str, 
                 name: str, 
                 sprite_base_path: str,
                 emotions: List[str]) -> None: ...
    def get_sprite(self, emotion: str) -> str: ...
    def get_name(self) -> str: ...
```

##### Dialog Management (`app/game/dialog/`)
- Handles text display and formatting
- Manages dialog flow and choices
- Integrates with LLM for dynamic content

**Key Classes:**
```python
class DialogManager:
    """Manages dialog display and interaction."""
    def __init__(self, llm_client: LLMClient) -> None: ...
    def display_text(self, text: str, character_id: Optional[str] = None) -> None: ...
    def generate_response_options(self, context: Dict[str, Any]) -> List[str]: ...
    def process_player_choice(self, choice_index: int, context: Dict[str, Any]) -> str: ...
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

#### Frontend Integration (`static/`)
- Phaser game implementation
- HTML/CSS for web interface
- JavaScript for game logic and API communication

**Key Files:**
- `static/js/game.js`: Main Phaser game configuration
- `static/js/scenes/`: JavaScript implementations of game scenes
- `static/index.html`: Main HTML entry point

### Game Flow

1. **Game Initialization**
   - Load assets (images, fonts)
   - Initialize Phaser
   - Set up API connections
   - Display Title Scene

2. **Title Scene**
   - Display game title and options
   - Handle player customization
   - Transition to VN Scene on start

3. **VN Scene Flow**
   - Load background and characters
   - Display dialog (from LLM or predefined)
   - Present player choices
   - Process player selection
   - Offer study opportunities
   - Update game state

4. **Study Scene Flow**
   - Display selected phrase
   - Show pronunciation guide
   - Provide translation
   - Offer contextual explanations
   - Return to VN Scene

### LLM Integration Workflow

#### Dialog Generation
1. Construct context object with scene information, characters, and history
2. Send context to LLM API
3. Process response to extract dialog text
4. Display dialog in game interface

#### Choice Generation
1. Send current game state and dialog history to LLM
2. Request appropriate response options (max 3)
3. Process and validate responses
4. Present choices to player

#### Language Learning Features
1. Extract phrase for study
2. Request translation from LLM
3. Request pronunciation guide
4. Request contextual explanations
5. Present information in Study Scene

## Development Environment

### Environment Management
- Conda or pyenv for Python version management
- uv for dependency management
- Virtual environments for isolation

### Dependency Management
- Core dependencies in `pyproject.toml`
- Development extras for tooling
- Version pinning through `uv.lock`

### Code Quality
- Ruff configuration in `pyproject.toml`
- MyPy strict type checking
- Google-style docstrings
- 88-character line length (Black compatible)

### Testing Strategy
- Unit tests with pytest
- Integration tests for game logic
- Mocked LLM responses
- Test coverage tracking

## Deployment Considerations

### Local Deployment
- Single-user setup
- Web browser interface
- Local Python server
- No additional services required beyond LLM API

### Resource Requirements
- Python 3.12+ runtime
- Modern web browser with WebGL support
- Internet connection for LLM API
- Sufficient memory for game assets

### Security Considerations
- API key management
- Input validation
- Error handling for external services
- Content filtering for LLM responses

## Future Technical Considerations

### Scalability
- TinyDB implementation for game state persistence
- Cloud deployment options
- User account system
- Progress tracking across sessions

### Performance Optimization
- Asset preloading and caching
- LLM response caching
- Asynchronous API calls
- Resource cleanup

### Feature Expansion
- Voice generation integration
- Speech recognition for pronunciation practice
- Expanded character and scene library
- Advanced language learning analytics 