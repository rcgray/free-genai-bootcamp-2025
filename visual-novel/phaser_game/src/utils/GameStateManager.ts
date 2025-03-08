import { StatefulScene } from './StatefulScene';

/**
 * Interface representing the complete game state.
 */
export interface GameState {
  /** The key of the currently active scene */
  currentScene: string;
  /** Global state that applies across all scenes */
  globalState: Record<string, any>;
  /** State for individual scenes, keyed by scene key */
  sceneStates: Record<string, any>;
  /** Timestamp when the state was saved */
  timestamp: number;
}

/**
 * Manages game state serialization and deserialization.
 * This class is responsible for saving and restoring the state of the game,
 * which is useful for both development (HMR) and gameplay (save/load).
 */
export class GameStateManager {
  private static instance: GameStateManager;
  private game: Phaser.Game;
  
  /**
   * Get the singleton instance of the GameStateManager.
   * @param game The Phaser game instance (required on first call)
   * @returns The GameStateManager instance
   */
  public static getInstance(game?: Phaser.Game): GameStateManager {
    if (!GameStateManager.instance && game) {
      GameStateManager.instance = new GameStateManager(game);
    } else if (!GameStateManager.instance && !game) {
      throw new Error('GameStateManager must be initialized with a game instance on first call');
    }
    return GameStateManager.instance;
  }
  
  /**
   * Private constructor to enforce singleton pattern.
   * @param game The Phaser game instance
   */
  private constructor(game: Phaser.Game) {
    this.game = game;
    console.log('🎮 GameStateManager initialized');
  }
  
  /**
   * Save the current game state.
   * @returns A GameState object representing the current state
   */
  public saveState(): GameState {
    try {
      // Get the currently active scene
      const activeScenes = this.game.scene.getScenes(true);
      if (activeScenes.length === 0) {
        console.warn('No active scenes found when saving state');
        return {
          currentScene: '',
          globalState: this.captureGlobalState(),
          sceneStates: {},
          timestamp: Date.now()
        };
      }
      
      const currentScene = activeScenes[0].scene.key;
      const sceneStates = this.captureSceneStates();
      
      const state: GameState = {
        currentScene,
        globalState: this.captureGlobalState(),
        sceneStates,
        timestamp: Date.now()
      };
      
      console.log(`🔄 Game state saved (current scene: ${currentScene})`);
      return state;
    } catch (e) {
      console.error('Error saving game state:', e);
      // Return a minimal valid state
      return {
        currentScene: '',
        globalState: {},
        sceneStates: {},
        timestamp: Date.now()
      };
    }
  }
  
  /**
   * Restore a previously saved game state.
   * @param state The GameState object to restore
   */
  public restoreState(state: GameState): void {
    if (!state || !state.currentScene) {
      console.error('Invalid state provided to restoreState');
      return;
    }
    
    // Restore global state first
    this.restoreGlobalState(state.globalState);
    
    // Start the current scene with its state
    if (this.game.scene.getScene(state.currentScene)) {
      console.log(`🔄 Restoring scene: ${state.currentScene}`);
      
      // Stop all currently running scenes
      this.game.scene.getScenes(true).forEach(scene => {
        if (scene.scene.key !== state.currentScene) {
          scene.scene.stop();
        }
      });
      
      // If the scene is already running, restart it with the saved state
      if (this.game.scene.isActive(state.currentScene)) {
        this.game.scene.stop(state.currentScene);
        this.game.scene.start(state.currentScene, state.sceneStates[state.currentScene]);
      } else {
        // Otherwise, start it fresh with the saved state
        this.game.scene.start(state.currentScene, state.sceneStates[state.currentScene]);
      }
      
      // Restore other scene states (for scenes that might be running in parallel)
      Object.entries(state.sceneStates).forEach(([sceneKey, sceneState]) => {
        if (sceneKey !== state.currentScene) {
          const scene = this.game.scene.getScene(sceneKey);
          if (scene) {
            // Apply state to scene if it exists
            this.applyStateToScene(scene, sceneState);
          }
        }
      });
    } else {
      console.error(`Scene ${state.currentScene} not found when restoring state`);
    }
  }
  
  /**
   * Capture state from all active scenes.
   * @returns An object mapping scene keys to their serialized states
   */
  private captureSceneStates(): Record<string, any> {
    const states: Record<string, any> = {};
    
    try {
      this.game.scene.getScenes().forEach(scene => {
        if (scene.sys && scene.sys.settings.active) {
          try {
            const sceneKey = scene.scene.key;
            
            // Call serializeState on the scene if it implements our interface
            if (this.isStatefulScene(scene)) {
              states[sceneKey] = (scene as unknown as StatefulScene).serializeState();
            } else {
              // Default serialization for scenes without custom implementation
              states[sceneKey] = this.defaultSerializeScene(scene);
            }
          } catch (sceneError) {
            console.error(`Error serializing scene ${scene.scene?.key || 'unknown'}:`, sceneError);
            // Add a minimal state entry for this scene to avoid missing keys
            if (scene.scene?.key) {
              states[scene.scene.key] = { error: true };
            }
          }
        }
      });
    } catch (e) {
      console.error('Error capturing scene states:', e);
    }
    
    return states;
  }
  
  /**
   * Check if a scene implements the StatefulScene interface.
   * @param scene The scene to check
   * @returns True if the scene implements StatefulScene
   */
  private isStatefulScene(scene: Phaser.Scene): boolean {
    return typeof (scene as unknown as StatefulScene).serializeState === 'function' &&
           typeof (scene as unknown as StatefulScene).deserializeState === 'function';
  }
  
  /**
   * Default scene serialization for scenes that don't implement StatefulScene.
   * @param scene The scene to serialize
   * @returns A basic serialized state for the scene
   */
  private defaultSerializeScene(scene: Phaser.Scene): any {
    // Basic serialization of common properties
    return {
      key: scene.scene.key,
      active: scene.scene.isActive(),
      visible: scene.scene.isVisible()
    };
  }
  
  /**
   * Capture global game state.
   * @returns An object representing the global state
   */
  private captureGlobalState(): Record<string, any> {
    // Serialize global state (registry, etc.)
    return {
      registry: this.serializeRegistry(),
      // Other global state as needed
    };
  }
  
  /**
   * Serialize the game registry.
   * @returns An object representing the registry values
   */
  private serializeRegistry(): Record<string, any> {
    const registry: Record<string, any> = {};
    
    // Get all registry values - Phaser's registry.getAll() returns an object, not an array
    const registryData = this.game.registry.getAll();
    
    // Check if registryData is an object we can iterate over
    if (registryData && typeof registryData === 'object') {
      // Iterate over the object keys
      Object.keys(registryData).forEach((key: string) => {
        const value = registryData[key];
        // Only serialize JSON-compatible values
        if (this.isSerializable(value)) {
          registry[key] = value;
        } else {
          console.warn(`Registry value for key "${key}" is not serializable and will be omitted`);
        }
      });
    } else {
      console.warn('Registry data is not in the expected format');
    }
    
    return registry;
  }
  
  /**
   * Check if a value is JSON-serializable.
   * @param value The value to check
   * @returns True if the value can be safely serialized to JSON
   */
  private isSerializable(value: any): boolean {
    if (value === undefined) return false;
    if (value === null) return true;
    if (typeof value === 'function') return false;
    if (typeof value === 'symbol') return false;
    
    // Handle circular references
    try {
      JSON.stringify(value);
      return true;
    } catch (e) {
      return false;
    }
  }
  
  /**
   * Restore global state.
   * @param globalState The global state to restore
   */
  private restoreGlobalState(globalState: Record<string, any>): void {
    // Restore registry values
    if (globalState.registry) {
      Object.entries(globalState.registry).forEach(([key, value]) => {
        this.game.registry.set(key, value);
      });
    }
    
    // Restore other global state as needed
  }
  
  /**
   * Apply state to a scene.
   * @param scene The scene to apply state to
   * @param state The state to apply
   */
  private applyStateToScene(scene: Phaser.Scene, state: any): void {
    // Call deserializeState on the scene if it implements our interface
    if (this.isStatefulScene(scene)) {
      (scene as unknown as StatefulScene).deserializeState(state);
    } else {
      // Default deserialization for scenes without custom implementation
      this.defaultDeserializeScene(scene, state);
    }
  }
  
  /**
   * Default scene deserialization for scenes that don't implement StatefulScene.
   * @param scene The scene to deserialize state into
   * @param state The state to apply
   */
  private defaultDeserializeScene(scene: Phaser.Scene, state: any): void {
    // Apply basic scene properties
    if (state.active === false) {
      scene.scene.setActive(false);
    }
    if (state.visible === false) {
      scene.scene.setVisible(false);
    }
  }
  
  /**
   * Save state to localStorage.
   * @param slotName The name of the save slot
   */
  public persistState(slotName: string = 'dev-state'): void {
    try {
      const state = this.saveState();
      try {
        localStorage.setItem(`game-save-${slotName}`, JSON.stringify(state));
        console.log(`💾 Game state saved to slot "${slotName}"`);
      } catch (e) {
        console.error('Failed to save game state to localStorage:', e);
      }
    } catch (e) {
      console.error('Error while creating game state to save:', e);
    }
  }
  
  /**
   * Load state from localStorage.
   * @param slotName The name of the save slot
   * @returns The loaded GameState or null if not found
   */
  public loadPersistedState(slotName: string = 'dev-state'): GameState | null {
    try {
      const savedState = localStorage.getItem(`game-save-${slotName}`);
      if (savedState) {
        const state = JSON.parse(savedState) as GameState;
        console.log(`📂 Game state loaded from slot "${slotName}"`);
        return state;
      }
    } catch (e) {
      console.error('Failed to load game state from localStorage:', e);
    }
    return null;
  }
} 