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
- Arrow keys or WASD for movement
- ESC key for pause/unpause

### Movement Rules
1. **Direction Changes**
   - Snake moves continuously in the current direction
   - Direction changes are queued and applied at movement "beats"
   - Cannot move directly opposite to current direction
   - Rapid keypresses only queue the last direction before next movement
   - Snake moves at 150ms per move at start

2. **Field Boundaries**
   - Snake wraps around field edges (no collision with walls)
   - Moving off top edge appears at bottom
   - Moving off bottom edge appears at top
   - Moving off left edge appears at right
   - Moving off right edge appears at left

3. **Collision Rules**
   - Game over on collision with snake's own body
   - Collision check excludes tail position during movement
   - No wall collisions (wrap-around movement)

### Game Field
- 48x36 grid (1200x900 pixels)
- 25x25 pixel grid cells
- Dark background with subtle grid lines
- Snake rendered in contrasting bright green
- Head slightly darker than body segments

### Gameplay Elements
1. **Target System**
   - Target reading displayed in romaji at the top center
   - Multiple kanji words appear on the playing field
   - Only one kanji matches the target reading
   - New target and kanji set generated after each successful/unsuccessful attempt

2. **Scoring System**
   - Points awarded for eating correct kanji
   - Strikes given for eating incorrect kanji
   - Three strikes end the game
   - Correct answers remove one strike (if any)
   - Score increases with snake length and game speed

### Visual Elements
1. **Game Field**
   - Dark theme (#1a1a1a background)
   - Subtle grid lines (#333333)
   - Snake head (#22c55e)
   - Snake body (#4ade80)
   - Light container background (#f1f5f9)

2. **UI Components**
   - Target reading display (top center)
   - Score counter (top left)
   - Strike indicator (top right)
   - Game over screen with final score
   - Restart button
   - Pause menu overlay

### Audio Elements
1. **Sound Effects**
   - Movement sounds
   - Correct/incorrect answer sounds
   - Collision sounds
   - Game over sound

## Technical Implementation

### Framework and Libraries
- Built with TypeScript and Phaser game engine
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
   - [x] Basic snake movement
   - [x] Grid system implementation
   - [x] Collision detection
   - [x] Edge wrapping
   - [x] Direction queuing
   - [x] Pause functionality
   - [ ] Simple kanji display

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
