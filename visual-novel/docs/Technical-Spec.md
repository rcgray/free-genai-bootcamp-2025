# Technical Specification - Japanese Language Learning Visual Novel

## Technology Stack

### Core Technologies
- **Python 3.12+**: Base programming language
- **Streamlit 1.32.0+**: Python web framework for serving the application
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
│   ├── main.py         # Streamlit entry point
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
│   └── index.html      # Main HTML file for Phaser game
├── .streamlit/         # Streamlit configuration
│   └── config.toml     # Streamlit settings
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

#### Frontend Integration (`static/` and Streamlit)
- Phaser game implementation embedded in Streamlit
- Streamlit for UI framework and Python backend
- JavaScript for game logic and API communication
- Communication between Phaser and Python backend via Streamlit components

**Key Files:**
- `app/main.py`: Main Streamlit application entry point
- `static/js/game.js`: Main Phaser game configuration
- `static/js/scenes/`: JavaScript implementations of game scenes
- `static/index.html`: HTML template for Phaser game

### Game Flow

1. **Application Initialization**
   - Start Streamlit server
   - Load Python backend components
   - Serve Phaser game within Streamlit interface
   - Initialize game assets and configuration

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
- Streamlit web interface
- Embedded Phaser game
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

## Scene Designs and UI Layouts

### Title Scene
The Title Scene serves as the entry point to the game and provides initial configuration options.

#### UI Components
- **Background**: A static background image that sets the tone for the game
- **Game Title**: Prominently displayed at the top of the screen
- **Start Button**: Primary button to begin the game and transition to the VN Scene
- **Settings Panel**: Optional panel with customization options:
  - Language difficulty level (Beginner, Intermediate, Advanced)
  - Text display speed
  - Audio volume controls (future implementation)
- **Credits/Info Button**: Small button to display game credits and information

#### Interactions
- Clicking the Start Button transitions to the VN Scene
- Settings changes are saved to the game state
- Visual feedback (hover effects, animations) on interactive elements

### Visual Novel (VN) Scene
The VN Scene is the primary gameplay area where the narrative unfolds through character interactions.

#### UI Components
- **Background Layer**: Full-screen background image representing the current location
- **Character Layer**: Character sprites positioned in front of the background
  - Characters can be positioned at left, center, or right
  - Characters display different emotions/expressions based on the dialog
- **Dialog Box**: Semi-transparent panel at the bottom of the screen containing:
  - Character name display (when a character is speaking)
  - Dialog text with Japanese and optional furigana
  - "Next" indicator to show more text is available
- **Choice Panel**: Appears when player input is required
  - Contains up to 3 response options
  - Each option is a button with text
- **Study Button**: Small button next to relevant dialog that can be studied
  - Appears when Japanese phrases are present in the dialog
  - Visual indicator to show it's interactive
- **UI Controls**: Small buttons for:
  - Dialog history access
  - Auto-advance toggle
  - Save/Load (future implementation)
  - Return to title

#### Interactions
- Clicking anywhere advances the dialog when no choices are present
- Clicking a choice option selects that response and advances the story
- Clicking the Study Button transitions to the Study Scene with the selected phrase
- Character sprites animate on entry/exit and when speaking
- Dialog text appears with a typewriter effect (configurable speed)

### Study Scene
The Study Scene provides focused language learning for specific phrases from the VN Scene.

#### UI Components
- **Header**: Displays "Study Mode" and the current phrase being studied
- **Original Text Panel**: Shows the selected Japanese phrase in its original context
- **Pronunciation Panel**: Displays the romaji pronunciation of the phrase
- **Translation Panel**: Shows the English translation of the phrase
- **Explanation Panel**: Provides grammatical or cultural context for the phrase
- **Example Usage Panel**: Shows additional examples of how the phrase is used
- **Back Button**: Returns to the VN Scene at the point where study was initiated
- **Additional Resources**: Optional links or buttons for further study of similar phrases

#### Interactions
- Clicking on any Japanese word shows its individual pronunciation and meaning
- Audio playback of the phrase (future implementation)
- Interactive exercises related to the phrase (future implementation)
- Back Button returns to the VN Scene

## Game State Management

### Core Game State
The game maintains a state object that includes:

```typescript
interface GameState {
  // Current scene and position
  currentScene: 'title' | 'vn' | 'study';
  
  // Dialog and narrative state
  dialogHistory: DialogEntry[];
  currentDialogIndex: number;
  
  // Character state
  characters: {
    [characterId: string]: {
      name: string;
      position: 'left' | 'center' | 'right' | 'offscreen';
      emotion: string;
      isActive: boolean;
    }
  };
  
  // Background state
  currentBackground: string;
  
  // Player choices and consequences
  choiceHistory: ChoiceEntry[];
  
  // Study progress
  studiedPhrases: StudiedPhrase[];
  
  // Game settings
  settings: {
    textSpeed: number;
    difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
    showFurigana: boolean;
    showRomaji: boolean;
  };
}
```

### State Transitions
- Game state is updated after each player interaction
- Scene transitions preserve the relevant state
- When returning from Study Scene to VN Scene, the dialog position is maintained
- Game state can be serialized for saving/loading (future implementation)

## Scene Transitions and Flow

### Game Flow Diagram
```
┌─────────────┐
│ Title Scene │
└──────┬──────┘
       │ Start Game
       ▼
┌─────────────┐     Study Button     ┌─────────────┐
│  VN Scene   │──────────────────────▶ Study Scene │
└──────┬──────┘                      └──────┬──────┘
       │                                    │
       │ Dialog & Choices                   │ Back Button
       │                                    │
       ▼                                    │
┌─────────────┐                             │
│  VN Scene   │◀────────────────────────────┘
│ (continued) │
└─────────────┘
```

### Transition Effects
- Fade transitions between scenes for smooth experience
- Character entrance/exit animations in the VN Scene
- Dialog box slide-in animation
- Study mode transition with focus effect on the selected phrase 

## Phaser Implementation Details

### Scene Structure
Each game scene will be implemented as a Phaser.Scene subclass:

```javascript
// Base scene with common functionality
class BaseScene extends Phaser.Scene {
    constructor(config) {
        super(config);
        this.gameState = null;
    }
    
    init(data) {
        // Initialize scene with game state
        this.gameState = data.gameState || {};
    }
    
    // Common methods for all scenes
    transitionTo(sceneName, data = {}) {
        // Handle scene transitions with data passing
    }
    
    saveGameState() {
        // Save current game state
    }
}

// Title scene implementation
class TitleScene extends BaseScene {
    constructor() {
        super({ key: 'TitleScene' });
    }
    
    create() {
        // Create title UI elements
        // Set up event handlers
    }
}

// VN scene implementation
class VNScene extends BaseScene {
    constructor() {
        super({ key: 'VNScene' });
        this.dialogManager = null;
        this.characterManager = null;
    }
    
    create() {
        // Create VN UI elements
        // Set up dialog and character managers
        // Set up event handlers
    }
    
    showDialog(text, character) {
        // Display dialog with typewriter effect
    }
    
    showChoices(choices) {
        // Display player choice options
    }
    
    handleChoice(choiceIndex) {
        // Process player choice
    }
    
    enterStudyMode(phrase) {
        // Transition to study scene with selected phrase
    }
}

// Study scene implementation
class StudyScene extends BaseScene {
    constructor() {
        super({ key: 'StudyScene' });
    }
    
    create() {
        // Create study UI elements
        // Display phrase information
        // Set up event handlers
    }
    
    returnToVN() {
        // Return to VN scene at the correct point
    }
}
```

### Asset Management
Phaser's asset loading system will be used to manage game resources:

```javascript
function preload() {
    // Load backgrounds
    this.load.image('bg_classroom', 'assets/images/backgrounds/classroom.jpg');
    this.load.image('bg_street', 'assets/images/backgrounds/street.jpg');
    
    // Load character sprites
    this.load.atlas('character_sensei', 
                   'assets/images/characters/sensei.png',
                   'assets/images/characters/sensei.json');
    
    // Load UI elements
    this.load.image('dialog_box', 'assets/images/ui/dialog_box.png');
    this.load.image('choice_button', 'assets/images/ui/choice_button.png');
    
    // Load audio (future implementation)
    // this.load.audio('bgm_title', 'assets/audio/bgm_title.mp3');
}
```

### UI Component Implementation
UI components will be implemented using Phaser's built-in objects:

#### Dialog Box
```javascript
class DialogBox {
    constructor(scene, x, y, width, height) {
        this.scene = scene;
        this.container = scene.add.container(x, y);
        
        // Background panel
        this.background = scene.add.image(0, 0, 'dialog_box');
        this.background.setOrigin(0, 0);
        this.background.setDisplaySize(width, height);
        
        // Character name text
        this.nameText = scene.add.text(10, 10, '', {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        });
        
        // Dialog text
        this.dialogText = scene.add.text(20, 50, '', {
            fontFamily: 'Arial',
            fontSize: '20px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2,
            wordWrap: { width: width - 40 }
        });
        
        // Add elements to container
        this.container.add([this.background, this.nameText, this.dialogText]);
        
        // Initially hidden
        this.container.setAlpha(0);
    }
    
    show(characterName, text, callback) {
        // Display the dialog box with text
        this.nameText.setText(characterName || '');
        this.dialogText.setText('');
        
        // Show container with animation
        this.scene.tweens.add({
            targets: this.container,
            alpha: 1,
            duration: 200,
            onComplete: () => {
                // Start typewriter effect
                this.typewriteText(text, callback);
            }
        });
    }
    
    typewriteText(text, callback) {
        // Implement typewriter text effect
    }
    
    hide() {
        // Hide dialog box with animation
    }
}
```

#### Choice Panel
```javascript
class ChoicePanel {
    constructor(scene, x, y, width) {
        this.scene = scene;
        this.container = scene.add.container(x, y);
        this.choices = [];
        this.width = width;
        
        // Initially hidden
        this.container.setAlpha(0);
    }
    
    showChoices(choices, callback) {
        // Clear previous choices
        this.clearChoices();
        
        // Create new choice buttons
        let yOffset = 0;
        choices.forEach((choice, index) => {
            const button = this.createChoiceButton(0, yOffset, choice, () => {
                callback(index);
            });
            
            this.choices.push(button);
            yOffset += 60; // Button height + spacing
        });
        
        // Add all buttons to container
        this.container.add(this.choices);
        
        // Show with animation
        this.scene.tweens.add({
            targets: this.container,
            alpha: 1,
            duration: 200
        });
    }
    
    createChoiceButton(x, y, text, callback) {
        // Create and return an interactive button with text
    }
    
    clearChoices() {
        // Remove all choice buttons
    }
    
    hide() {
        // Hide choice panel with animation
    }
}
```

### Communication with Streamlit
The Phaser game will communicate with the Streamlit backend when needed:

```javascript
function sendToStreamlit(data) {
    if (window.Streamlit) {
        window.Streamlit.setComponentValue(data);
    }
}

// Example: Request LLM-generated dialog
function requestDialog(context, characterId) {
    sendToStreamlit({
        type: 'request_dialog',
        context: context,
        characterId: characterId
    });
    
    // The response will be handled by Streamlit's component API
    // and passed back to the game
}
```

### Game State Persistence
Game state will be maintained within the Phaser game and synchronized with Streamlit:

```javascript
// Save game state
function saveGameState(state) {
    // Save to local storage for immediate persistence
    localStorage.setItem('gameState', JSON.stringify(state));
    
    // Optionally send to Streamlit for server-side storage
    sendToStreamlit({
        type: 'save_game_state',
        state: state
    });
}

// Load game state
function loadGameState() {
    // Try to load from local storage first
    const savedState = localStorage.getItem('gameState');
    if (savedState) {
        return JSON.parse(savedState);
    }
    
    // Return default state if nothing is saved
    return createDefaultGameState();
}
```

## Japanese Language Learning Features

### Text Rendering
The game will support proper rendering of Japanese text with the following features:

#### Furigana Support
Furigana (ruby text) will be displayed above kanji characters to aid pronunciation:

```javascript
class JapaneseText {
    constructor(scene, x, y, options = {}) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.options = {
            fontSize: options.fontSize || 20,
            furiganaSize: options.furiganaSize || 12,
            color: options.color || '#ffffff',
            furiganaColor: options.furiganaColor || '#ffffff',
            stroke: options.stroke || '#000000',
            strokeThickness: options.strokeThickness || 2,
            wordWrap: options.wordWrap || { width: 400 },
            lineSpacing: options.lineSpacing || 10
        };
        
        this.container = scene.add.container(x, y);
    }
    
    setText(text, furigana) {
        // Clear previous text
        this.container.removeAll(true);
        
        // Parse text and furigana
        const textElements = this.parseJapaneseText(text, furigana);
        
        // Create text objects
        let xPos = 0;
        let yPos = 0;
        let lineWidth = 0;
        
        textElements.forEach(element => {
            // Create main text
            const textObj = this.scene.add.text(xPos, yPos, element.text, {
                fontFamily: 'Noto Sans JP, Arial',
                fontSize: `${this.options.fontSize}px`,
                color: this.options.color,
                stroke: this.options.stroke,
                strokeThickness: this.options.strokeThickness
            });
            
            // Add to container
            this.container.add(textObj);
            
            // Add furigana if present
            if (element.furigana) {
                const furiganaObj = this.scene.add.text(
                    xPos + (textObj.width - textObj.width * 0.8) / 2,
                    yPos - this.options.furiganaSize - 2,
                    element.furigana,
                    {
                        fontFamily: 'Noto Sans JP, Arial',
                        fontSize: `${this.options.furiganaSize}px`,
                        color: this.options.furiganaColor,
                        stroke: this.options.stroke,
                        strokeThickness: 1
                    }
                );
                
                // Add to container
                this.container.add(furiganaObj);
            }
            
            // Update position for next element
            xPos += textObj.width;
            lineWidth += textObj.width;
            
            // Handle word wrapping
            if (lineWidth > this.options.wordWrap.width) {
                xPos = 0;
                yPos += this.options.fontSize + this.options.lineSpacing;
                lineWidth = 0;
            }
        });
    }
    
    parseJapaneseText(text, furigana) {
        // Parse text and match furigana to kanji
        // Return array of { text, furigana } objects
    }
}
```

#### Language Difficulty Levels
The game will support different difficulty levels that affect the Japanese content:

- **Beginner**: 
  - Simple phrases and basic grammar
  - All kanji have furigana
  - Romaji available for all text
  - More detailed explanations in Study Scene

- **Intermediate**:
  - More complex sentences and grammar
  - Furigana only for uncommon kanji
  - Romaji available on request
  - Moderate explanations in Study Scene

- **Advanced**:
  - Natural Japanese dialog
  - Minimal furigana
  - No automatic romaji (available in Study Scene)
  - Brief explanations focusing on nuance

### Study Features

#### Phrase Analysis
When a phrase is selected for study, it will be analyzed to provide:

1. **Word Breakdown**: Individual words identified with their meanings
2. **Grammar Points**: Explanation of grammar structures used
3. **Cultural Context**: Cultural notes relevant to the phrase
4. **Usage Examples**: Additional examples of similar phrases

#### Progress Tracking
The game will track the player's language learning progress:

```typescript
interface StudiedPhrase {
    id: string;
    japaneseText: string;
    translation: string;
    pronunciation: string;
    timestamp: number;
    repetitionCount: number;
    nextReviewDate: number;
    difficulty: 'easy' | 'medium' | 'hard';
}

interface LearningProgress {
    studiedPhrases: StudiedPhrase[];
    vocabularyStats: {
        total: number;
        mastered: number;
        learning: number;
        new: number;
    };
    grammarPoints: {
        [grammarPoint: string]: {
            encountered: number;
            mastered: boolean;
        }
    };
}
```

#### Spaced Repetition
For future implementation, the game will incorporate spaced repetition to optimize learning:

1. Phrases will be scheduled for review based on difficulty and previous reviews
2. Previously studied phrases may appear in later dialog
3. The system will prioritize reinforcing challenging phrases

### LLM Integration for Language Learning

#### Translation Generation
The LLM will be used to generate accurate translations:

```python
def generate_translation(japanese_text: str, context: Dict[str, Any]) -> str:
    """Generate an English translation of Japanese text with context awareness."""
    prompt = f"""
    Translate the following Japanese text to natural English.
    Consider the context: {context['scene']}, {context['speaker']}, {context['emotion']}
    
    Japanese: {japanese_text}
    
    English translation:
    """
    
    response = llm_client.generate(prompt)
    return extract_translation(response)
```

#### Pronunciation Guide
The LLM will generate romaji and pronunciation notes:

```python
def generate_pronunciation(japanese_text: str) -> Dict[str, str]:
    """Generate romaji and pronunciation notes for Japanese text."""
    prompt = f"""
    Provide the romaji (Roman alphabet) pronunciation for this Japanese text:
    {japanese_text}
    
    Also provide any pronunciation notes for English speakers.
    
    Format your response as:
    Romaji: [romaji here]
    Notes: [pronunciation notes here]
    """
    
    response = llm_client.generate(prompt)
    return extract_pronunciation_data(response)
```

#### Grammar Explanations
The LLM will provide grammar explanations tailored to the player's level:

```python
def generate_grammar_explanation(
    japanese_text: str, 
    difficulty_level: str
) -> str:
    """Generate grammar explanation for Japanese text based on difficulty level."""
    prompt = f"""
    Explain the grammar in this Japanese text:
    {japanese_text}
    
    The explanation should be suitable for a {difficulty_level} level Japanese learner.
    Focus on the key grammar points and patterns.
    """
    
    response = llm_client.generate(prompt)
    return extract_grammar_explanation(response)
``` 