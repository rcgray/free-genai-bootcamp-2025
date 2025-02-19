# Game Development Guide

This guide explains how to create new games for the Lang Portal system, using our development harness and shared services.

## Project Structure

A typical game project should have the following structure:

```
games/your-game-name/
├── src/
│   ├── index.tsx       # Production entry point
│   ├── dev.tsx         # Development harness
│   ├── dev.css         # Development styles
│   ├── scenes/         # Phaser scenes
│   │   ├── TitleScene.ts
│   │   ├── MainScene.ts
│   │   └── ...
│   └── services/       # Game-specific services
│       └── ...
├── vite.config.ts      # Vite configuration
└── package.json        # Dependencies
```

## Core Files

### index.tsx

This is your game's production entry point. It should:
- Export a React component that implements the `GameProps` interface
- Handle core game initialization
- Be clean and focused on game functionality
- Not include development-only code

Example:
```typescript
export function BaseGame({ 
  apiClient,      // API client for backend communication
  sessionId,      // Current session ID
  onGameComplete, // Callback for game completion
  title          // Game title
}: GameProps) {
  // Game initialization
}
```

### dev.tsx

This is your development harness. It:
- Imports your game component from `index.tsx`
- Provides a development environment
- Includes developer tools and debugging features
- Won't be included in production

Features include:
- API call logging
- Session management
- Error handling
- Activity registration
- Mock data setup

## Scene Management

Games should use Phaser's scene system for organization. Common scenes include:

### TitleScene

The title/menu scene typically handles:
- Game title and instructions
- Configuration options (e.g., word group selection)
- Session initialization
- Transition to main game

Example:
```typescript
export default class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TitleScene' });
  }

  create() {
    // Setup UI elements
    // Handle user input
    // Initialize game settings
  }
}
```

### MainScene

The main game scene contains:
- Core game mechanics
- Game state management
- User interaction
- Score tracking
- Word/learning content display

Example:
```typescript
export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  init(data: { sessionId?: string }) {
    // Initialize with data from previous scene
  }

  create() {
    // Setup game elements
    // Initialize game state
  }

  update() {
    // Handle game loop
    // Update game state
  }
}
```

## Services

### WordService

A shared service for managing word-related functionality:

```typescript
export class WordService {
  // Fetch words for a specific group
  async fetchWordsByGroup(groupId: number): Promise<Word[]>

  // Select random words for gameplay
  async selectRandomWords(count: number): Promise<Word[]>

  // Cache management
  clearCache(): void
}
```

Features:
- Word fetching and caching
- Group management
- Random word selection
- Error handling

### SessionService

Handles game session management:

```typescript
export class SessionService {
  // Start a new session
  async startSession(): Promise<boolean>

  // Submit word reviews
  async submitWordReview(wordId: number, correct: boolean): Promise<boolean>

  // Session state management
  getCurrentSession(): Session | null
  endSession(): void
}
```

## Development Workflow

1. **Initial Setup**
   ```bash
   cd games/your-game-name
   yarn install
   ```

2. **Development**
   ```bash
   yarn dev
   ```
   This runs the development harness with:
   - Hot reloading
   - API logging
   - Development tools

3. **Testing**
   - Use the development harness to test different scenarios
   - Check API interactions in the logs
   - Test session management
   - Verify word fetching and review submission

4. **Production**
   - The game will be served from `index.tsx`
   - Development tools will be stripped out
   - The game will receive real session and API data

## Best Practices

1. **Code Organization**
   - Keep scenes focused and single-purpose
   - Use services for shared functionality
   - Separate UI from game logic

2. **State Management**
   - Use Phaser's scene data for passing information
   - Keep game state in appropriate scenes
   - Use services for persistent data

3. **Error Handling**
   - Gracefully handle API failures
   - Provide user feedback for errors
   - Log errors appropriately

4. **Performance**
   - Use proper cleanup in scene shutdown
   - Implement proper caching
   - Manage memory usage

5. **User Experience**
   - Provide clear feedback
   - Handle loading states
   - Implement proper error messages

## API Integration

Your game should use the provided `apiClient` for all backend communication. Common operations:

1. **Session Management**
   ```typescript
   // Start session
   const session = await apiClient.sessions.create(groupId, activityId);

   // Submit review
   await apiClient.sessions.submitReview(sessionId, wordId, correct);
   ```

2. **Word Management**
   ```typescript
   // Fetch words
   const words = await apiClient.words.getAll({ groupId });

   // Fetch groups
   const groups = await apiClient.groups.getAll();
   ```

## Debugging

The development harness provides several debugging tools:

1. **API Logs**
   - All API calls are logged
   - Response data is displayed
   - Errors are highlighted

2. **Session Tools**
   - Create test sessions
   - Monitor session state
   - Test different group selections

3. **Error Display**
   - API errors are displayed
   - Session creation failures are shown
   - Word fetching issues are logged

## Common Gotchas

1. **Session Handling**
   - Always check session existence before operations
   - Handle session creation failures
   - Clean up sessions properly

2. **Word Groups**
   - Handle empty groups gracefully
   - Support the "All Words" (-1) group ID
   - Cache group data appropriately

3. **Scene Transitions**
   - Pass necessary data between scenes
   - Clean up resources when leaving scenes
   - Handle scene restart properly

4. **API Calls**
   - Handle network errors
   - Implement proper loading states
   - Cache data when appropriate
