# Kanji Snake Game Specification

## Overview
A classic snake game reimagined as a Japanese language learning tool, where players guide a snake to eat kanji characters that match a given reading, combining arcade-style gameplay with vocabulary practice.

The game folder is: games/kanji-snake

## Learning Objectives
- Improve kanji recognition skills
- Associate kanji with their readings
- Practice quick visual recognition of Japanese characters
- Build vocabulary through repeated exposure and active recall

## Core Game Mechanics

### Basic Controls
- Four-directional movement (Up, Down, Left, Right)
- Continuous snake movement
- No diagonal movement
- Collision detection with snake body and walls

### Gameplay Elements
1. **Snake Movement**
   - Snake moves continuously in the current direction
   - Player controls direction using arrow keys or WASD
   - Snake grows longer when eating correct kanji
   - Collision with snake's body ends the game

2. **Target System**
   - Target reading displayed in romaji at the top center
   - Multiple kanji words appear on the playing field
   - Only one kanji matches the target reading
   - New target and kanji set generated after each successful/unsuccessful attempt

3. **Scoring System**
   - Points awarded for eating correct kanji
   - Strikes given for eating incorrect kanji
   - Three strikes end the game
   - Correct answers remove one strike (if any)
   - Score increases with snake length and game speed

4. **Difficulty Progression**
   - Snake speed increases gradually with each correct answer
   - Field may become more crowded with options

### Visual Elements
1. **Game Field**
   - Clean, minimalist design
   - Clear contrast between snake and background
   - Grid-based movement system
   - Visible boundaries

2. **UI Components**
   - Target reading display (top center)
   - Score counter (top left)
   - Strike indicator (top right)
   - Game over screen with final score
   - Restart button

### Audio Elements
1. **Sound Effects**
   - Movement sounds
   - Correct/incorrect answer sounds
   - Collision sounds
   - Game over sound

## Technical Implementation

### Framework and Libraries
- Built with TypeScript and Photon game engine
- React integration for UI elements
- Shared API client for backend communication

### Game States
1. **Title Screen**
   - Game title
   - Start button
   - Group selection dropdown (fetched from /api/groups)
   - Instructions/controls
   - Options menu (sound, difficulty)

2. **Playing State**
   - Active gameplay
   - Real-time score updates
   - Strike tracking
   - Session management
   - Pause menu with return to title screen option

3. **Game Over State**
   - Final score display
   - High score update
   - Two options:
     - Quick restart (same word group)
     - Return to title screen (select new group)

### Backend Integration
1. **Word Management**
   - Initial word list fetched on game start:
     ```typescript
     // GET /api/words with optional group filter
     interface WordsRequest {
       page?: number;        // For pagination
       per_page?: number;    // Default: 20, max: 100
       sort_by?: string;     // Default: 'romaji'
       order?: string;       // 'asc' or 'desc'
       group_id?: number;    // Optional group filter
     }
     ```
   - Cache words locally for performance
   - Implement word selection algorithm for gameplay
   - Refresh word list periodically or when exhausted

2. **Session Management**
   - Create session on game start
   - Track game progress
   - Store score and performance data
   - Handle session cleanup on game end

3. **Word Review System**
   ```typescript
   // Review data structure
   interface WordReview {
     word_id: number;
     correct: boolean;
     timestamp: string;
   }
   ```

4. **API Endpoints Used**
   - GET /api/words
     - Fetches word list at game start
     - Supports pagination and filtering by group
   - GET /api/groups
     - Fetches available word groups for selection
   - POST /api/sessions
     - Creates new session when game starts
   - POST /api/sessions/{session_id}/review
     - Records each word attempt
     - Tracks correct/incorrect answers
     - Updates user progress

### Performance Considerations
- Smooth animation at 60 FPS
- Efficient collision detection
- Optimized word rendering
- Responsive controls

### Development Guidelines
1. **Code Organization**
   - All game code should reside within the game folder
   - Separate game logic from rendering
   - Modular component structure
   - Clear state management
   - Type-safe implementations

2. **Testing Requirements**
   - Unit tests for game logic
   - Integration tests for API calls
   - Performance testing
   - Input handling tests

## Future Enhancements
- Multiple difficulty levels
- Power-ups and special items
- Multiplayer mode
- Leaderboard system
- Custom word lists
- Achievement system
- Tutorial mode
- Alternative control schemes

## Assets Required
1. **Graphics**
   - Snake segments
   - Food items (kanji display)
   - Background textures
   - UI elements
   - Particle effects

2. **Sound**
   - Movement effects
   - Collision sounds
   - Success/failure jingles
   - Background music
   - UI interaction sounds

## Development Milestones
1. **Phase 1: Core Mechanics** `[x]`
   - [ ] Basic snake movement
   - [ ] Collision detection
   - [ ] Simple kanji display
   - [ ] Grid system implementation

2. **Phase 2: Game Systems** `[ ]`
   - [ ] Word fetching and caching
   - [ ] Group selection implementation
   - [ ] Scoring system
   - [ ] Strike system
   - [ ] Word selection logic

3. **Phase 3: Polish** `[ ]`
   - [ ] UI implementation
   - [ ] Sound effects
   - [ ] Visual effects
   - [ ] Performance optimization
   - [ ] Pause menu
   - [ ] Game over screen

4. **Phase 4: Integration** `[ ]`
   - [ ] Backend communication
   - [ ] Session management
   - [ ] Progress tracking
   - [ ] Group filtering
   - [ ] Final testing
   - [ ] Bug fixes and refinements
