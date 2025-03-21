# Kanji Snake Game

A classic snake game reimagined as a Japanese language learning tool, where players guide a snake to eat kanji characters that match a given target reading.

![Kanji Snake Game](dev/screenshot.png)

## Overview

Kanji Snake serves dual purposes:
1. An engaging educational game for Japanese language learners to practice kanji recognition
2. A demonstration of the Lang Portal's game integration architecture

This game showcases how third-party educational games can be independently developed and then seamlessly integrated with the Lang Portal's backend services for word management, session tracking, and progress reporting.

## Learning Features

- Practice associating kanji with their readings
- Quick visual recognition training for Japanese characters
- Vocabulary building through active recall
- Progress tracking integrated with the main Lang Portal system

## Game Mechanics

### Core Gameplay
- Guide your snake to eat kanji characters that match the target reading
- Avoid eating incorrect kanji (three strikes and you're out!)
- Earn points for correct answers
- Snake grows with each correct answer, increasing difficulty
- Each correct answer removes one strike (if any)

### Controls
- Arrow keys or WASD for directional movement
- ESC key to pause/unpause
- Snake wraps around screen edges

## Technical Implementation

### Frameworks & Libraries
- Built with TypeScript and Phaser 3 game engine
- React integration for UI components
- Lang Portal API client for backend communication

### Integration Features
- Fetches word groups from Lang Portal backend
- Creates learning sessions to track player progress
- Reports word review results back to the system
- Uses shared API client for consistent backend communication

## Development

This game demonstrates the Lang Portal game development workflow:

1. **Independent Development**: Games can be developed and tested standalone
2. **Shared Services**: Common APIs for word management and session tracking
3. **Integration**: Simple process to integrate with the main application

### Development Commands

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build
```

## Architecture

Kanji Snake follows the Lang Portal game architecture:

```
src/
├── index.tsx       # Production entry point
├── dev.tsx         # Development harness
├── dev.css         # Development styles
├── scenes/         # Phaser game scenes
│   ├── TitleScene.ts
│   ├── MainScene.ts
│   └── ...
└── services/       # Game-specific services
    └── ...
```

The game demonstrates how to:
- Initialize a Phaser game within React
- Communicate with the Lang Portal backend
- Track learning sessions
- Report word review results
- Manage game state

## For Developers

Kanji Snake serves as a reference implementation for developers creating new educational games for the Lang Portal platform. Key patterns demonstrated include:

- Game configuration and initialization
- Word fetching and management
- Session creation and tracking
- Progress reporting
- UI integration with the main application

For detailed development guidelines, see:
- `lang-portal/docs/Games-Feature-Spec.md` - Platform integration specification
- `lang-portal/docs/Game-Harness-Spec.md` - Development guide for game creators 