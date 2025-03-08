# Scene-Specific Reloading

## Overview

This feature aims to improve the development experience by implementing scene-specific hot module replacement (HMR) for our Phaser game. Instead of restarting the entire game when code changes are detected, we'll create a system that preserves game state and only reloads the affected components.

This architecture will also serve as the foundation for a future save/load game feature, allowing players to save their progress and resume from where they left off.

## Goals

1. **Improved Developer Experience**: Maintain game state during development, avoiding the need to navigate from the title screen after each code change
2. **Faster Iteration**: Reduce the time between making a change and seeing its effect
3. **State Persistence**: Create a reusable system for serializing and deserializing game state
4. **Future-Proofing**: Design the system to be extensible for future save/load functionality

## Technical Design

### 1. Game State Manager

The core of this feature is a `GameStateManager` that handles serializing and deserializing the game state:

```typescript
// src/utils/GameStateManager.ts
export interface GameState {
  currentScene: string;
  globalState: Record<string, any>;
  sceneStates: Record<string, any>;
  timestamp: number;
}

export class GameStateManager {
  private static instance: GameStateManager;
  private game: Phaser.Game;
  
  // Singleton pattern
  public static getInstance(game?: Phaser.Game): GameStateManager {
    if (!GameStateManager.instance && game) {
      GameStateManager.instance = new GameStateManager(game);
    }
    return GameStateManager.instance;
  }
  
  private constructor(game: Phaser.Game) {
    this.game = game;
  }
  
  // Save the current game state
  public saveState(): GameState {
    const currentScene = this.game.scene.getScenes(true)[0].scene.key;
    const sceneStates = this.captureSceneStates();
    
    return {
      currentScene,
      globalState: this.captureGlobalState(),
      sceneStates,
      timestamp: Date.now()
    };
  }
  
  // Restore a previously saved game state
  public restoreState(state: GameState): void {
    // Restore global state
    this.restoreGlobalState(state.globalState);
    
    // Start at the correct scene
    this.game.scene.start(state.currentScene, state.sceneStates[state.currentScene]);
    
    // Restore other scene states
    Object.entries(state.sceneStates).forEach(([sceneKey, sceneState]) => {
      if (sceneKey !== state.currentScene) {
        const scene = this.game.scene.getScene(sceneKey);
        if (scene) {
          // Apply state to scene if it exists
          this.applyStateToScene(scene, sceneState);
        }
      }
    });
  }
  
  // Capture state from all active scenes
  private captureSceneStates(): Record<string, any> {
    const states: Record<string, any> = {};
    
    this.game.scene.getScenes().forEach(scene => {
      if (scene.sys && scene.sys.settings.active) {
        const sceneKey = scene.scene.key;
        // Call serializeState on the scene if it implements our interface
        if ('serializeState' in scene) {
          states[sceneKey] = (scene as any).serializeState();
        } else {
          // Default serialization for scenes without custom implementation
          states[sceneKey] = this.defaultSerializeScene(scene);
        }
      }
    });
    
    return states;
  }
  
  // Default scene serialization
  private defaultSerializeScene(scene: Phaser.Scene): any {
    // Basic serialization of common properties
    return {
      // Capture basic scene properties
      // This will be expanded as needed
    };
  }
  
  // Capture global game state
  private captureGlobalState(): Record<string, any> {
    // Serialize global state (registry, etc.)
    return {
      registry: this.serializeRegistry(),
      // Other global state as needed
    };
  }
  
  // Serialize the game registry
  private serializeRegistry(): Record<string, any> {
    const registry: Record<string, any> = {};
    
    // Extract values from Phaser's data registry
    this.game.registry.getAll().forEach((value, key) => {
      registry[key] = value;
    });
    
    return registry;
  }
  
  // Restore global state
  private restoreGlobalState(globalState: Record<string, any>): void {
    // Restore registry values
    if (globalState.registry) {
      Object.entries(globalState.registry).forEach(([key, value]) => {
        this.game.registry.set(key, value);
      });
    }
    
    // Restore other global state as needed
  }
  
  // Apply state to a scene
  private applyStateToScene(scene: Phaser.Scene, state: any): void {
    // Call deserializeState on the scene if it implements our interface
    if ('deserializeState' in scene) {
      (scene as any).deserializeState(state);
    } else {
      // Default deserialization for scenes without custom implementation
      this.defaultDeserializeScene(scene, state);
    }
  }
  
  // Default scene deserialization
  private defaultDeserializeScene(scene: Phaser.Scene, state: any): void {
    // Apply basic scene properties
    // This will be expanded as needed
  }
  
  // Save state to localStorage (for development or save game)
  public persistState(slotName: string = 'dev-state'): void {
    const state = this.saveState();
    localStorage.setItem(`game-save-${slotName}`, JSON.stringify(state));
  }
  
  // Load state from localStorage
  public loadPersistedState(slotName: string = 'dev-state'): GameState | null {
    const savedState = localStorage.getItem(`game-save-${slotName}`);
    if (savedState) {
      return JSON.parse(savedState) as GameState;
    }
    return null;
  }
}
```

### 2. Scene Interface for State Management

To make scenes work with our state system, we'll define an interface that scenes can implement:

```typescript
// src/utils/StatefulScene.ts
export interface StatefulScene {
  // Serialize scene-specific state
  serializeState(): any;
  
  // Deserialize and apply scene-specific state
  deserializeState(state: any): void;
}
```

### 3. HMR Integration

We'll integrate with Vite's HMR system to preserve state during development:

```typescript
// src/index.ts
import { GameStateManager } from './utils/GameStateManager';

// Initialize the game
const game = new Phaser.Game(config);

// Set up HMR handling
if (import.meta.hot) {
  // Store the state manager instance
  const stateManager = GameStateManager.getInstance(game);
  
  import.meta.hot.accept((newModule) => {
    console.log('🔄 HMR update detected, preserving game state...');
    
    // Save current state before module replacement
    const gameState = stateManager.saveState();
    
    // Also persist to localStorage as a backup
    stateManager.persistState();
    
    // After module replacement, restore state
    setTimeout(() => {
      console.log('🔄 Restoring game state...');
      stateManager.restoreState(gameState);
    }, 100); // Small delay to ensure modules are fully loaded
  });
  
  // Add development keyboard shortcuts
  document.addEventListener('keydown', (event) => {
    // Ctrl+S to save current state
    if (event.ctrlKey && event.key === 's') {
      event.preventDefault();
      stateManager.persistState('manual-save');
      console.log('💾 Game state manually saved');
    }
    
    // Ctrl+L to load saved state
    if (event.ctrlKey && event.key === 'l') {
      event.preventDefault();
      const savedState = stateManager.loadPersistedState('manual-save');
      if (savedState) {
        stateManager.restoreState(savedState);
        console.log('📂 Game state manually loaded');
      } else {
        console.log('❌ No saved game state found');
      }
    }
  });
}
```

### 4. BaseScene Implementation

We'll extend our `BaseScene` class to implement the `StatefulScene` interface:

```typescript
// src/scenes/BaseScene.ts
import { StatefulScene } from '../utils/StatefulScene';

export class BaseScene extends Phaser.Scene implements StatefulScene {
  // Existing BaseScene code...
  
  // Implement StatefulScene interface
  serializeState(): any {
    // Base implementation that can be overridden by child scenes
    return {
      // Basic scene state
      active: this.scene.isActive(),
      visible: this.scene.isVisible(),
      // Add more common state properties as needed
    };
  }
  
  deserializeState(state: any): void {
    // Base implementation that can be overridden by child scenes
    if (state.active === false) {
      this.scene.setActive(false);
    }
    if (state.visible === false) {
      this.scene.setVisible(false);
    }
    // Apply more common state properties as needed
  }
}
```

### 5. Example Scene Implementation

Here's how a specific scene would implement state serialization:

```typescript
// src/scenes/VNScene.ts
export class VNScene extends BaseScene {
  private currentDialogIndex: number = 0;
  private characters: Character[] = [];
  private dialogHistory: DialogEntry[] = [];
  
  // Existing scene code...
  
  // Override serializeState to include scene-specific state
  serializeState(): any {
    // Get base state from parent
    const baseState = super.serializeState();
    
    // Add scene-specific state
    return {
      ...baseState,
      dialogIndex: this.currentDialogIndex,
      characters: this.characters.map(char => ({
        id: char.id,
        position: char.position,
        expression: char.currentExpression,
        visible: char.visible
      })),
      dialogHistory: this.dialogHistory
    };
  }
  
  // Override deserializeState to restore scene-specific state
  deserializeState(state: any): void {
    // Apply base state
    super.deserializeState(state);
    
    // Restore scene-specific state
    if (state.dialogIndex !== undefined) {
      this.currentDialogIndex = state.dialogIndex;
    }
    
    // Restore characters
    if (state.characters) {
      state.characters.forEach((charState: any) => {
        const character = this.characters.find(c => c.id === charState.id);
        if (character) {
          character.position = charState.position;
          character.setExpression(charState.expression);
          character.visible = charState.visible;
        }
      });
    }
    
    // Restore dialog history
    if (state.dialogHistory) {
      this.dialogHistory = state.dialogHistory;
      this.updateDialogHistoryDisplay();
    }
  }
}
```

## Development Plan

### Phase 1: Core State Management (HMR Focus)

1. **Create GameStateManager**: Implement the core state management system
2. **Define StatefulScene Interface**: Create the interface for scenes to implement
3. **Update BaseScene**: Extend BaseScene to implement StatefulScene
4. **Integrate with HMR**: Set up Vite HMR handlers to preserve state during development
5. **Test Basic State Persistence**: Verify that basic scene state is preserved during HMR

### Phase 2: Scene-Specific State Handling

1. **Implement VNScene State**: Add state serialization to the Visual Novel scene
2. **Implement TitleScene State**: Add state serialization to the Title scene
3. **Implement StudyScene State**: Add state serialization to the Study scene
4. **Test Scene Transitions**: Ensure state is preserved when transitioning between scenes
5. **Add Development Shortcuts**: Implement keyboard shortcuts for testing state persistence

### Phase 3: Save/Load Game Feature (Future)

1. **Create Save/Load UI**: Design and implement UI for saving and loading games
2. **Add Multiple Save Slots**: Support multiple named save slots
3. **Implement Save File Export/Import**: Allow exporting and importing save files
4. **Add Save Metadata**: Include screenshots, timestamps, and descriptions for save files
5. **Implement Auto-Save**: Add automatic saving at key points in the game

## Implementation Considerations

### State Serialization Challenges

- **Complex Objects**: Some objects may be difficult to serialize (e.g., Phaser game objects)
- **Circular References**: Avoid circular references in state objects
- **Size Limitations**: Be mindful of localStorage size limits for saved states

### Performance Optimization

- **Selective Serialization**: Only serialize essential state to minimize overhead
- **Lazy Loading**: Consider lazy loading assets when restoring state
- **Incremental Updates**: For large states, consider implementing incremental updates

### Security Considerations

- **Data Validation**: Validate loaded state data to prevent security issues
- **Sanitization**: Sanitize user-provided save data before applying it
- **Version Compatibility**: Handle version differences in save data format

## Conclusion

The Scene-Specific Reloading feature will significantly improve the development experience by preserving game state during hot module replacement. By designing this system with future save/load functionality in mind, we're also laying the groundwork for an important player-facing feature.

This approach balances immediate developer needs with long-term project goals, creating a flexible and robust state management system that will benefit both development and gameplay. 