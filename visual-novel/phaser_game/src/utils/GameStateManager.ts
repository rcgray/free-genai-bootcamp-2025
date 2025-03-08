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
      // Make sure the game is fully initialized
      if (!this.game || !this.game.isBooted) {
        console.error('Cannot save state: Game not initialized');
        throw new Error('Game not initialized');
      }
      
      // Get the currently active scene
      const activeScenes = this.game.scene.getScenes(true);
      if (activeScenes.length === 0) {
        console.warn('No active scenes found when saving state');
        throw new Error('No active scenes found');
      }
      
      // Get the current scene key
      const currentScene = activeScenes[0].scene.key;
      if (!currentScene) {
        console.error('Cannot save state: Current scene has no key');
        throw new Error('Current scene has no key');
      }
      
      // Capture scene states
      const sceneStates = this.captureSceneStates();
      
      // Create the state object
      const state: GameState = {
        currentScene,
        globalState: this.captureGlobalState(),
        sceneStates,
        timestamp: Date.now()
      };
      
      // Validate the state
      if (!this.validateState(state)) {
        console.error('Invalid state generated:', state);
        throw new Error('Invalid state generated');
      }
      
      console.log(`🔄 Game state saved (current scene: ${currentScene})`);
      return state;
    } catch (e) {
      console.error('Error saving game state:', e);
      // Return a minimal valid state as a fallback
      return {
        currentScene: 'TitleScene', // Always fall back to TitleScene
        globalState: {},
        sceneStates: {},
        timestamp: Date.now()
      };
    }
  }
  
  /**
   * Validate a game state object
   * @param state The state to validate
   * @returns True if the state is valid
   */
  private validateState(state: GameState): boolean {
    // Basic validation
    if (!state) return false;
    if (!state.currentScene) return false;
    if (!state.sceneStates || typeof state.sceneStates !== 'object') return false;
    if (!state.globalState || typeof state.globalState !== 'object') return false;
    if (!state.timestamp || typeof state.timestamp !== 'number') return false;
    
    // Make sure the current scene exists in the scene states
    if (!state.sceneStates[state.currentScene]) {
      console.warn(`Current scene ${state.currentScene} not found in scene states`);
      // This is not a fatal error, so we'll still return true
    }
    
    return true;
  }
  
  /**
   * Restore a previously saved game state.
   * @param state The GameState object to restore
   */
  public restoreState(state: GameState): void {
    // Validate the state
    if (!state) {
      console.error('Invalid state provided to restoreState: state is null or undefined');
      return;
    }
    
    if (!state.currentScene) {
      console.error('Invalid state provided to restoreState: no currentScene property');
      return;
    }
    
    if (!state.sceneStates || typeof state.sceneStates !== 'object') {
      console.error('Invalid state provided to restoreState: invalid sceneStates property');
      return;
    }
    
    try {
      // Restore global state first
      this.restoreGlobalState(state.globalState);
      
      console.log(`🔄 Preparing to restore scene: ${state.currentScene}`);
      
      // Use a safer approach to scene restoration
      const sceneData = state.sceneStates[state.currentScene] || {};
      
      // Instead of trying to force scene restoration immediately,
      // we'll use a completely different approach: start with the title scene
      // and use Phaser's event system to handle the transition
      
      // First, make sure we have a clean slate
      try {
        // Stop all scenes
        this.game.scene.scenes.forEach(scene => {
          if (scene && scene.scene) {
            scene.scene.stop();
          }
        });
      } catch (e) {
        console.warn('Warning when stopping scenes:', e);
      }
      
      // Store the target scene and data for later use
      const targetScene = state.currentScene;
      const targetSceneData = sceneData;
      
      // Always start with the title scene, which we know exists and works
      try {
        // Start with TitleScene which is guaranteed to be available
        this.game.scene.start('TitleScene');
        
        // Wait for the title scene to be ready, then transition to our target scene
        const checkSceneReady = () => {
          const titleScene = this.game.scene.getScene('TitleScene');
          
          if (titleScene && titleScene.events) {
            console.log('✅ Title scene is ready, setting up transition to target scene');
            
            // Use Phaser's event system to transition once the scene is fully ready
            titleScene.events.once('create', () => {
              console.log(`🔄 Title scene created, transitioning to ${targetScene}`);
              
              // Short delay to ensure everything is initialized
              setTimeout(() => {
                try {
                  // Now it's safe to transition to our target scene
                  this.game.scene.start(targetScene, targetSceneData);
                  console.log(`✅ Transitioned to ${targetScene} with saved state`);
                  
                  // Restore other scene states after a short delay
                  setTimeout(() => this.restoreOtherScenes(state), 300);
                } catch (e) {
                  console.error(`Error transitioning to ${targetScene}:`, e);
                }
              }, 100);
            });
          } else {
            // Title scene not ready yet, check again in a bit
            setTimeout(checkSceneReady, 100);
          }
        };
        
        // Start checking if the title scene is ready
        checkSceneReady();
        
        // Mark as successful even if we're still in the process of restoring
        console.log('✅ Game state restoration process started (via title scene)');
        return;
      } catch (e) {
        console.error('Error starting title scene:', e);
        
        // Fallback to direct restoration if title scene approach fails
        console.log('⚠️ Falling back to direct scene restoration');
        this.fallbackRestore(state);
      }
    } catch (e) {
      console.error('Error in main restoreState:', e);
      
      // Try fallback as last resort
      this.fallbackRestore(state);
    }
  }
  
  /**
   * Fallback restoration method that tries a more direct approach
   * @param state The game state to restore
   */
  private fallbackRestore(state: GameState): void {
    try {
      console.log(`🔄 Attempting fallback restoration for scene: ${state.currentScene}`);
      
      // Store the target scene and data for later use
      const targetScene = state.currentScene;
      const targetSceneData = state.sceneStates[targetScene] || {};
      
      // Just start with TitleScene and set up a delayed transition
      console.log('🔄 Starting with TitleScene and setting up delayed transition');
      
      // Clear any existing scenes first
      try {
        this.game.scene.scenes.forEach(scene => {
          if (scene && scene.scene) {
            scene.scene.stop();
          }
        });
      } catch (e) {
        // Ignore errors when stopping scenes
      }
      
      // Set up a global variable to track our restoration target
      const win = window as any;
      win.__PHASER_RESTORATION_TARGET__ = {
        scene: targetScene,
        data: targetSceneData,
        timestamp: Date.now()
      };
      
      // Start with TitleScene
      try {
        // Use a simpler approach - just start TitleScene
        // TitleScene will handle the transition in its create method
        this.game.scene.start('TitleScene');
        console.log('✅ Started TitleScene successfully');
      } catch (e) {
        console.error('Error starting TitleScene:', e);
        
        // Last resort: try again with a delay
        setTimeout(() => {
          try {
            this.game.scene.start('TitleScene');
            console.log('✅ Started TitleScene with delay');
          } catch (delayedError) {
            console.error('Error starting TitleScene with delay:', delayedError);
          }
        }, 500);
      }
    } catch (e) {
      console.error('Error in fallbackRestore:', e);
      
      // Last resort: just try to start TitleScene directly
      try {
        this.game.scene.start('TitleScene');
        console.log('⚠️ Started TitleScene as absolute last resort');
      } catch (lastError) {
        console.error('Even TitleScene failed to start:', lastError);
      }
    }
  }
  
  /**
   * Restore states for scenes other than the current one.
   * @param state The full game state
   */
  private restoreOtherScenes(state: GameState): void {
    try {
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
    } catch (e) {
      console.error('Error restoring other scenes:', e);
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