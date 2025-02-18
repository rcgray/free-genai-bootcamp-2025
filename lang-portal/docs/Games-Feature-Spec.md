# Games Feature Specification

## Overview
This document outlines the architecture and implementation plan for integrating educational language games into the main application. Games will be developed as independent sub-projects within the monorepo but will be launched and played through the main application interface.

## Goals
- Enable independent development of games while maintaining integration with the main application
- Allow games to interact with the application's backend API
- Support dynamic addition and removal of games through database configuration
- Maintain clean separation of concerns and code organization
- Ensure optimal performance and user experience

## Architecture

### Directory Structure
```
.
├── backend-fastapi/     # Existing backend
├── frontend-react/      # Existing frontend
├── games/              # New games directory
│   ├── typing-tutor/   # Example game
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   ├── src/
│   │   ├── public/
│   │   └── dist/       # Built game files
│   └── memory-match/   # Another example game
│       ├── package.json
│       ├── vite.config.ts
│       ├── src/
│       ├── public/
│       └── dist/       # Built game files
└── shared/             # Code shared between frontend and games
    ├── api-client/     # Common API client library
    └── types/          # Shared TypeScript interfaces
```

### Database Usage
The existing `url` field in the activities table will be used to store the module URL for games. This URL will point to the location where the game's built assets are hosted.

## Implementation Details

### 1. Game Project Structure
Each game will be a standalone React project with:
- Independent package.json and dependencies
- Vite configuration for building and development
- Access to shared API client and types
- Standard interface for integration with main app

#### Standard Game Component Interface
```typescript
interface GameProps {
  apiClient: ApiClient;
  sessionId?: string;
  onGameComplete?: () => void;
}
```

### 2. Integration Method
- Use dynamic imports with React.lazy()
- Games are built as ES modules
- Games are served as static files from public directory
- Support for iframe-based isolation if needed in the future

### 3. Shared Code
#### API Client
- TypeScript client for backend API
- Used by both games and frontend
- Provides consistent API interaction patterns
- Handles error handling and response types

#### Common Types
- TypeScript interfaces shared between frontend and games
- Activity and session types
- API request/response types
- Game component interfaces

## Development Workflow

### 1. Game Development
1. Create new game directory in `games/`
2. Initialize with standard template
3. Develop and test independently
4. Build game assets using `yarn build` or `yarn dev:games`

### 2. Game Integration
1. Build games using `yarn dev:games` script
2. Games are automatically copied to frontend's public directory
3. Update activities table with game URL (e.g., `/games/game-name.js`)
4. Test integration with main application

### 3. Build Process
1. Build shared library
2. Build all games
3. Copy built files to frontend public directory

## Testing Strategy

### Integration Testing
- Basic game loading verification
- API endpoint connectivity
- Session creation and management

### Manual Testing
- Game functionality testing during development
- User experience validation
- Cross-browser compatibility

## Security Considerations

### 1. Module Loading
- Origin validation
- Content Security Policy
- CORS configuration

### 2. Asset Security
- Secure asset hosting
- Integrity checks

## Performance Considerations

### 1. Loading Optimization
- Code splitting
- Lazy loading
- Asset caching

### 2. Runtime Performance
- Memory management
- Resource cleanup
- State management

## Implementation Checklist

### Phase 1: Infrastructure Setup ✅
- [x] Create games directory structure
- [x] Set up shared code directory
- [x] Configure build system

### Phase 2: Core Integration ✅
- [x] Implement dynamic module loading
- [x] Create game component template
- [x] Set up shared API client
- [x] Implement session management

### Phase 3: First Game Implementation
- [ ] Create example game
- [ ] Implement integration
- [ ] Manual testing
- [ ] Document workflow

### Phase 4: Security and Documentation
- [ ] Set up CORS and CSP
- [ ] Basic developer documentation
- [ ] Final integration testing

## Documentation

### Developer Documentation
- Setup instructions
- Game development guide
- Integration guide
- API documentation

## Future Considerations
- Support for non-React games
- Additional game types
- Admin interface for managing games
- Performance monitoring and optimization
- Version tracking (if needed in the future)
