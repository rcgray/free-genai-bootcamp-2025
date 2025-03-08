# Technical Specification - Japanese Language Learning Visual Novel

## Technology Stack

### Core Technologies
- **Python 3.12+**: Base programming language
- **Streamlit 1.32.0+**: Python web framework for serving the application
- **Phaser 3.88.2**: JavaScript game framework for creating the visual novel interface
- **TypeScript 5.x**: Type-safe superset of JavaScript
- **Vite 6.x**: Modern frontend build tool
- **Node.js 16+**: JavaScript runtime for development
- **OpenAI API Standard**: For LLM integration (with flexibility to change providers)
- **TinyDB**: Lightweight, document-oriented database (for future implementation)

### Development Tools
- **Ruff**: Fast, comprehensive Python linter and formatter
- **MyPy**: Static type checker for Python
- **Pytest**: Testing framework
- **uv**: Modern Python package installer and resolver
- **npm**: Node.js package manager

### Documentation

- Phaser General Documentation: (@Phaser General Documentation) - https://docs.phaser.io/phaser/getting-started/what-is-phaser
- Phaser API Documentation: (@Phaser API Documentation) - https://docs.phaser.io/api-documentation/api-documentation
- TypeScript Documentation: https://www.typescriptlang.org/docs/
- Vite Documentation: https://vitejs.dev/guide/

## Project Architecture

### Directory Structure
```
visual-novel/
├── app/                    # Streamlit application
│   ├── __init__.py
│   ├── main.py             # Streamlit entry point
│   └── api/                # API endpoints
│       └── llm.py          # LLM integration
├── phaser_game/            # Phaser game (TypeScript)
│   ├── assets/             # Game assets
│   │   ├── images/         # Image files
│   │   │   ├── backgrounds/
│   │   │   └── characters/
│   │   ├── audio/          # Audio files
│   │   └── fonts/          # Font files
│   ├── src/                # Game source code
│   │   ├── index.ts        # Main entry point
│   │   ├── scenes/         # Game scenes
│   │   │   ├── BaseScene.ts
│   │   │   ├── TitleScene.ts
│   │   │   ├── VNScene.ts
│   │   │   └── StudyScene.ts
│   │   └── utils/          # Utility functions
│   ├── index.html          # Game HTML template
│   ├── package.json        # npm dependencies
│   ├── tsconfig.json       # TypeScript configuration
│   └── vite.config.ts      # Vite build configuration
├── data/                   # Game data
│   └── game.json           # TinyDB database (future)
├── scripts/                # Utility scripts
│   ├── update_docs.py      # Documentation updater
│   ├── watch-phaser.sh     # Development script for Phaser
│   ├── watch-streamlit.sh  # Development script for Streamlit
│   └── cleanup-dev.sh      # Clean up development processes
├── .streamlit/             # Streamlit configuration
│   └── config.toml         # Streamlit settings
└── tests/                  # Test suite
    ├── test_game.py
    └── test_llm.py
```

### Component Details

#### Streamlit App (`app/`)
- Main entry point for the application
- Embeds the Phaser game
- Handles API integration and backend logic

**Key Files:**
```python
# app/main.py
def main() -> None:
    """Main entry point for the Streamlit application."""
    # Set up Streamlit page
    # Embed Phaser game
    # Handle API communication
```

#### Phaser Game (`phaser_game/`)
The Phaser game is built using TypeScript and Vite, organized into modules:

##### Base Scene (`phaser_game/src/scenes/BaseScene.ts`)
- Abstract base class for all game scenes
- Handles common functionality
- Provides structure for scene implementation

**Key Implementation:**
```typescript
// phaser_game/src/scenes/BaseScene.ts
export default abstract class BaseScene extends Phaser.Scene {
    constructor(config: Phaser.Types.Scenes.SettingsConfig) {
        super(config);
    }
    
    // Common methods for all scenes
    preload(): void {
        // Common asset loading
    }
    
    create(): void {
        // Common scene setup
    }
}
```

##### Title Scene (`phaser_game/src/scenes/TitleScene.ts`)
- Displays game title and options
- Handles transitions to main game scene
- Offers game customization options

**Key Implementation:**
```typescript
// phaser_game/src/scenes/TitleScene.ts
export default class TitleScene extends BaseScene {
    constructor() {
        super({ key: 'TitleScene' });
    }
    
    preload(): void {
        super.preload();
        // Load title-specific assets
    }
    
    create(): void {
        // Create title screen elements
        // Add start button with transition to VN scene
    }
}
```

##### VN Scene (`phaser_game/src/scenes/VNScene.ts`)
- Main visual novel scene with interactive elements
- Displays background, characters, and dialog
- Handles player choices and game progression

**Key Implementation:**
```typescript
// phaser_game/src/scenes/VNScene.ts
export default class VNScene extends BaseScene {
    constructor() {
        super({ key: 'VNScene' });
    }
    
    preload(): void {
        super.preload();
        // Load VN-specific assets
    }
    
    create(): void {
        // Create scene elements
        // Set up character display
        // Implement dialog system
        // Handle player choices
    }
    
    displayDialog(text: string, character?: string): void {
        // Display dialog text
    }
    
    displayChoices(choices: string[]): void {
        // Display player choice options
    }
}
```

##### Study Scene (`phaser_game/src/scenes/StudyScene.ts`)
- Language learning focused scene
- Displays phrase details including translation and pronunciation
- Allows return to VN scene after study

**Key Implementation:**
```typescript
// phaser_game/src/scenes/StudyScene.ts
export default class StudyScene extends BaseScene {
    constructor() {
        super({ key: 'StudyScene' });
    }
    
    init(data: { phrase: string, translation: string, pronunciation: string }): void {
        // Initialize scene with phrase data
    }
    
    create(): void {
        // Display phrase information
        // Show translation and pronunciation
        // Add return button
    }
}
```

#### Integration between Streamlit and Phaser

The Phaser game is embedded in Streamlit using two approaches:

1. **Development Mode**:
   - Vite development server runs on port 5173
   - Streamlit detects the development server
   - Game is embedded via iframe for hot module replacement

2. **Production Mode**:
   - Built Phaser game (HTML/JS) is embedded directly in Streamlit
   - Assets are included as base64-encoded data
   - Static deployment with no external dependencies

**Key Implementation:**
```python
# app/main.py
def embed_phaser_game():
    """Embed the Phaser game in Streamlit."""
    # Check if development server is running
    if is_dev_server_running():
        # Embed iframe to dev server
        st.components.v1.html("""
            <iframe src="http://localhost:5173" width="1200" height="800"></iframe>
        """, height=800, width=1200)
    else:
        # Embed built game directly
        html_content = get_built_game_html()
        st.components.v1.html(html_content, height=800, width=1200)
```

### Development Workflow

The project uses a dual-terminal development workflow:

1. **Phaser Development**:
   - Watch script runs Vite development server with HMR
   - Changes to TypeScript files are instantly reflected
   - Direct access available at http://localhost:5173

2. **Streamlit Development**:
   - Streamlit server runs in watch mode
   - Embeds the Phaser game via iframe when in development
   - Changes to Python files trigger automatic reload

3. **Combined Workflow**:
   - Scripts handle process management and cleanup
   - Automatic detection of development mode
   - Consistent experience across environments

### Build Process

The build process for the Phaser game uses Vite:

1. TypeScript compilation
2. Asset optimization
3. Bundle creation
4. Output to `phaser_game/dist/`

The built game is then embedded in the Streamlit app for deployment.

### API Integration

Communication between the Phaser game and Python backend happens through Streamlit's bidirectional communication:

1. Phaser game sends messages via the Streamlit message event system
2. Python backend processes requests and returns responses
3. Messages are handled asynchronously to maintain performance

## Future Technical Considerations

### Scalability
- TinyDB implementation for game state persistence
- Game progress saving mechanism
- Additional scenes and game mechanics
- Enhanced visual and audio assets

### Performance Optimization
- Asset preloading strategies
- Bundle splitting for faster initial loading
- Texture atlas for sprite optimization
- Audio compression for size reduction

### Offline Support
- PWA implementation for offline gameplay
- Local LLM integration for disconnected operation
- Cache-first asset loading strategy

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