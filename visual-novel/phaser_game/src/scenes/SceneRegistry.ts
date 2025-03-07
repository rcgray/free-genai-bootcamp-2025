/**
 * SceneRegistry.ts
 * Registry for all game scenes to manage scene transitions and state.
 */

import Phaser from 'phaser';
import { GameState } from './BaseScene';

interface SceneInfo {
  key: string;
  scene: typeof Phaser.Scene;
}

class SceneRegistry {
  private scenes: Map<string, typeof Phaser.Scene>;
  private gameState: GameState | null;

  /**
   * Constructor for the SceneRegistry class
   */
  constructor() {
    // Map of scene keys to scene classes
    this.scenes = new Map();
    
    // Global game state that will be shared across scenes
    this.gameState = null;
  }
  
  /**
   * Register a scene with the registry
   * @param key - Unique key for the scene
   * @param sceneClass - Scene class to register
   */
  register(key: string, sceneClass: typeof Phaser.Scene): SceneRegistry {
    if (this.scenes.has(key)) {
      console.warn(`Scene with key ${key} already registered. Overwriting.`);
    }
    
    this.scenes.set(key, sceneClass);
    console.log(`Registered scene: ${key}`);
    
    return this;
  }
  
  /**
   * Get a scene by key
   * @param key - Key of the scene to get
   * @returns Scene class or null if not found
   */
  getScene(key: string): typeof Phaser.Scene | null {
    if (!this.scenes.has(key)) {
      console.error(`Scene with key ${key} not found in registry`);
      return null;
    }
    
    return this.scenes.get(key) || null;
  }
  
  /**
   * Get all registered scenes
   * @returns Array of scene objects with key and class
   */
  getAllScenes(): SceneInfo[] {
    const sceneArray: SceneInfo[] = [];
    
    this.scenes.forEach((sceneClass, key) => {
      sceneArray.push({
        key,
        scene: sceneClass
      });
    });
    
    return sceneArray;
  }
  
  /**
   * Initialize the game state
   * @param initialState - Initial game state
   */
  initGameState(initialState: Partial<GameState> = {}): GameState {
    this.gameState = {
      // Current scene and position
      currentScene: 'TitleScene',
      
      // Dialog and narrative state
      dialogHistory: [],
      currentDialogIndex: 0,
      
      // Character state
      characters: {},
      
      // Background state
      currentBackground: null,
      
      // Player choices and consequences
      choiceHistory: [],
      
      // Study progress
      studiedPhrases: [],
      
      // Game settings
      settings: {
        textSpeed: 50, // Words per minute
        difficultyLevel: 'beginner',
        showFurigana: true,
        showRomaji: true
      },
      
      // Override with any provided initial state
      ...initialState
    };
    
    return this.gameState;
  }
  
  /**
   * Update the game state
   * @param newState - New state to merge with current state
   */
  updateGameState(newState: Partial<GameState>): GameState | null {
    if (!this.gameState) {
      console.error('Game state not initialized. Call initGameState() first.');
      return null;
    }
    
    this.gameState = {
      ...this.gameState,
      ...newState
    };
    
    return this.gameState;
  }
  
  /**
   * Get the current game state
   * @returns Current game state
   */
  getGameState(): GameState | null {
    return this.gameState;
  }
}

// Create a singleton instance
const sceneRegistry = new SceneRegistry();

// Export the singleton instance
export default sceneRegistry; 