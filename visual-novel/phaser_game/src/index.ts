import Phaser from 'phaser';

// Declaration for HMR
declare global {
  interface ImportMeta {
    hot?: {
      accept(callback?: (newModule?: any) => void): void;
      dispose(callback: () => void): void;
    };
  }
}

// Import scenes
import TitleScene from './scenes/TitleScene';
import TestScene from './scenes/TestScene';

// Import state management
import { GameStateManager } from './utils/GameStateManager';

// Import HMR test
import './hmr-test';

// Game configuration
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1200,
  height: 800,
  parent: 'game-container',
  backgroundColor: '#333333',
  scene: [TitleScene, TestScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false
    }
  }
};

// Create game instance
const game = new Phaser.Game(config);

// Initialize the GameStateManager
const stateManager = GameStateManager.getInstance(game);

// Set up HMR with state preservation
if (import.meta.hot) {
  // Add keyboard shortcuts for development
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

  // Handle HMR updates
  import.meta.hot.accept((newModule) => {
    console.log('🔄 HMR update detected, preserving game state...');
    
    // Save current state before module replacement
    const gameState = stateManager.saveState();
    
    // Also persist to localStorage as a backup
    stateManager.persistState('hmr-backup');
    
    // After module replacement, restore state
    setTimeout(() => {
      console.log('🔄 Restoring game state...');
      stateManager.restoreState(gameState);
    }, 100); // Small delay to ensure modules are fully loaded
  });
} 