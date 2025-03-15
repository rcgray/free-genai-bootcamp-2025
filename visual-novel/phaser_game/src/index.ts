import Phaser from 'phaser';

// Declaration for HMR
declare global {
  interface ImportMeta {
    hot?: {
      accept(callback?: (newModule?: any) => void): void;
      dispose(callback: (data: Record<string, any>) => void): void;
      data: Record<string, any>;
    };
  }
}

// Import scenes
import TitleScene from './scenes/TitleScene';
import TestScene from './scenes/TestScene';
import VNScene from './scenes/VNScene';
import StudyScene from './scenes/StudyScene';

// Import state management
import { GameStateManager, GameState } from './utils/GameStateManager';

// Import debug utilities
import { debugGameInstance, monitorProperty } from './utils/PhaserDebug';

// First import the HMR test file to ensure it's loaded
import './hmr-test';

// Parse URL parameters to check if we're running tests
const urlParams = new URLSearchParams(window.location.search);
const testParam = urlParams.get('test');
const isRunningTest = testParam === 'furigana';

// Skip normal game initialization if we're in test mode
if (isRunningTest) {
  console.log('🧪 Test mode detected: test=furigana. Skipping game initialization.');
  
  // Create a simple DOM element to confirm the test is running
  document.addEventListener('DOMContentLoaded', () => {
    // Make sure we have a game container (in case the hmr-test.ts file needs it)
    const gameContainer = document.getElementById('game-container');
    if (!gameContainer) {
      const container = document.createElement('div');
      container.id = 'game-container';
      document.body.appendChild(container);
    }
  });
} else {
  // Normal game initialization starts here
  
  // Game configuration
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1200,
    height: 800,
    parent: 'game-container',
    backgroundColor: '#333333',
    scene: [TitleScene, TestScene, VNScene, StudyScene],
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

  // Track the game instance globally so we can destroy it during HMR
  let game: Phaser.Game;

  // Keep track of the current scene outside of the GameStateManager for HMR
  let currentSceneKey: string = 'TitleScene';

  // Helper function to safely update currentSceneKey
  function safeSetCurrentSceneKey(value: string): void {
    // Never allow currentSceneKey to be StudyScene
    if (value === 'StudyScene') {
      console.warn('⚠️ Attempted to set currentSceneKey to StudyScene - ignoring');
      return;
    }
    
    // Only log if actually changing
    if (currentSceneKey !== value) {
      console.log(`📊 Setting currentSceneKey: ${currentSceneKey} → ${value}`);
      currentSceneKey = value;
    }
  }

  // Function to initialize the game
  function initGame() {
    // Create game instance
    game = new Phaser.Game(config);
    
    // Debug the game instance
    setTimeout(() => {
      try {
        debugGameInstance(game);
      } catch (e) {
        console.error('Error during game instance debug:', e);
      }
    }, 1000);
    
    // Set up scene transition listeners to track the current scene
    setupSceneTransitionListeners();
    
    // Initialize the GameStateManager
    return GameStateManager.getInstance(game);
  }

  // Add scene transition listeners to track the current scene
  function setupSceneTransitionListeners() {
    // Wait until the scene manager is ready
    setTimeout(() => {
      try {
        if (!game || !game.scene) {
          console.warn('⚠️ Game or scene manager not initialized, cannot set up scene listeners');
          return;
        }
        
        // Debug listener - track scene changes in real-time
        game.events.on('step', () => {
          // Get currently active scenes
          const activeScenes = game.scene.getScenes(true);
          const activeSceneKeys = activeScenes.map(s => s.scene.key);
          
          // Only log when there's a change to avoid console spam
          const activeSceneString = JSON.stringify(activeSceneKeys);
          if ((window as any).__lastActiveScenes !== activeSceneString) {
            (window as any).__lastActiveScenes = activeSceneString;
            
            // Update tracking variable but never use StudyScene
            if (activeSceneKeys.length > 0) {
              // Skip StudyScene for tracking
              if (activeSceneKeys[0] !== 'StudyScene' && currentSceneKey !== activeSceneKeys[0]) {
                console.log(`🔍 Scene tracking updated: ${currentSceneKey} → ${activeSceneKeys[0]}`);
                safeSetCurrentSceneKey(activeSceneKeys[0]);
              } else if (activeSceneKeys[0] === 'StudyScene') {
                console.log(`🔍 StudyScene is active, but not tracking it as current scene`);
              }
            }
            
            console.log(`🎮 Active scenes: ${activeSceneKeys.join(', ')}`);
          }
        });
        
        // Listen for scene transitions
        game.scene.scenes.forEach(scene => {
          // Listen for scene start events
          scene.events.on('start', () => {
            const newSceneKey = scene.scene.key;
            
            // Never track StudyScene as the current scene
            if (newSceneKey === 'StudyScene') {
              console.log(`ℹ️ StudyScene started, but not tracking it as current scene`);
              return;
            }
            
            if (newSceneKey !== currentSceneKey) {
              console.log(`🔄 Scene changed from ${currentSceneKey} to ${newSceneKey}`);
              safeSetCurrentSceneKey(newSceneKey);
              
              // Update stored scene information
              const hmrState = getHmrState();
              if (hmrState) {
                hmrState.currentScene = currentSceneKey;
                saveHmrState(hmrState);
                console.log(`💾 Updated HMR state with new scene: ${currentSceneKey}`);
              }
            }
          });
        });
        
        console.log('✅ Scene transition listeners set up successfully');
      } catch (e) {
        console.error('❌ Failed to set up scene transition listeners:', e);
      }
    }, 1500);
  }

  // Helper functions for HMR state management
  function saveHmrState(state: GameState): void {
    try {
      // Validate the input state
      if (!state || !state.currentScene) {
        console.error('❌ Invalid state object provided to saveHmrState:', state);
        throw new Error('Invalid state object provided to saveHmrState');
      }
      
      // Critical safety check - never allow StudyScene as currentScene
      if (state.currentScene === 'StudyScene') {
        console.error('🛑 CRITICAL ERROR: Attempted to save StudyScene as currentScene in HMR state!');
        throw new Error('StudyScene cannot be saved as currentScene');
      }
      
      // Secondary validation - ensure currentSceneKey and state.currentScene match
      // unless currentSceneKey is StudyScene
      if (currentSceneKey !== state.currentScene && currentSceneKey !== 'StudyScene') {
        console.log(`🔄 Updating state.currentScene from ${state.currentScene} to ${currentSceneKey}`);
        state.currentScene = currentSceneKey;
      }
      
      // Create a JSON-serializable version of the state
      const stateJson = JSON.stringify(state);
      
      // Log what we're saving
      console.log('💾 Saving HMR state:', {
        currentScene: state.currentScene,
        timestamp: new Date(state.timestamp).toISOString(),
        hasGlobalState: !!state.globalState,
        sceneStateKeys: Object.keys(state.sceneStates || {})
      });
      
      // Save to sessionStorage (persists across page reloads within the same tab)
      sessionStorage.setItem('hmr-state', stateJson);
      console.log(`💾 HMR state saved to sessionStorage (${stateJson.length} bytes)`);
      
      // Also save to module data if available
      if (import.meta.hot && import.meta.hot.data) {
        import.meta.hot.data.gameState = state;
      }
      
      // Save a debug copy to localStorage for inspection
      localStorage.setItem('hmr-debug-state', stateJson);
    } catch (e) {
      console.error('❌ Failed to save HMR state:', e);
    }
  }

  function getHmrState(): GameState | null {
    try {
      // Try to get from sessionStorage first
      const storedState = sessionStorage.getItem('hmr-state');
      if (storedState) {
        try {
          const state = JSON.parse(storedState) as GameState;
          
          // Validate the state
          if (!state || !state.currentScene) {
            console.error('❌ Invalid state retrieved from sessionStorage:', state);
            // Clear invalid state
            sessionStorage.removeItem('hmr-state');
            return null;
          }
          
          console.log('📂 Retrieved state from sessionStorage:', {
            currentScene: state.currentScene,
            timestamp: new Date(state.timestamp).toISOString(),
            hasGlobalState: !!state.globalState,
            sceneStateKeys: Object.keys(state.sceneStates || {})
          });
          
          return state;
        } catch (parseError) {
          console.error('❌ Error parsing state from sessionStorage:', parseError);
          // Clear invalid state
          sessionStorage.removeItem('hmr-state');
        }
      }
      
      // Fall back to module data
      if (import.meta.hot && import.meta.hot.data && import.meta.hot.data.gameState) {
        const state = import.meta.hot.data.gameState as GameState;
        
        // Validate the state
        if (!state || !state.currentScene) {
          console.error('❌ Invalid state retrieved from module data:', state);
          return null;
        }
        
        console.log('📂 Retrieved state from module data:', {
          currentScene: state.currentScene,
          timestamp: new Date(state.timestamp).toISOString()
        });
        
        return state;
      }
      
      // Try localStorage as a last resort
      const debugState = localStorage.getItem('hmr-debug-state');
      if (debugState) {
        try {
          const state = JSON.parse(debugState) as GameState;
          
          // Validate the state
          if (!state || !state.currentScene) {
            console.error('❌ Invalid state retrieved from localStorage:', state);
            return null;
          }
          
          console.log('📂 Retrieved state from localStorage (debug):', {
            currentScene: state.currentScene,
            timestamp: new Date(state.timestamp).toISOString()
          });
          
          return state;
        } catch (parseError) {
          console.error('❌ Error parsing state from localStorage:', parseError);
        }
      }
    } catch (e) {
      console.error('❌ Failed to get HMR state:', e);
    }
    
    console.log('⚠️ No valid HMR state found');
    return null;
  }

  function clearHmrState(): void {
    try {
      sessionStorage.removeItem('hmr-state');
      if (import.meta.hot && import.meta.hot.data) {
        import.meta.hot.data.gameState = undefined;
      }
    } catch (e) {
      console.error('❌ Failed to clear HMR state:', e);
    }
  }

  // Function to attempt automatic navigation after safe delay
  function attemptAutoRestore(targetScene: string, maxAttempts = 5): void {
    if (!targetScene || targetScene === 'TitleScene') {
      console.log('🔄 No need to restore - target is already TitleScene');
      return;
    }
    
    console.log(`🔄 Setting up automatic restoration to ${targetScene}`);
    
    let attempts = 0;
    
    // Store the autoRestore function globally for debugging
    (window as any).__AUTO_RESTORE_INFO__ = { 
      targetScene, 
      attempts: 0, 
      maxAttempts,
      startTime: Date.now() 
    };
    
    // Create a restoration function that checks for safe conditions
    const tryRestore = () => {
      attempts++;
      (window as any).__AUTO_RESTORE_INFO__.attempts = attempts;
      
      try {
        // Only proceed if we have a valid game with initialized scene manager
        if (!game || !game.isBooted || !game.scene) {
          console.log(`⏳ Game not ready yet, attempt ${attempts}/${maxAttempts}`);
          return false;
        }
        
        // Check if the current active scene is TitleScene (and it's fully ready)
        const titleScene = game.scene.getScene('TitleScene');
        const currentActiveScene = game.scene.scenes.find(s => s.scene.settings.active);
        
        if (!titleScene || !currentActiveScene || currentActiveScene.scene.key !== 'TitleScene') {
          console.log(`⏳ TitleScene not active yet, attempt ${attempts}/${maxAttempts}`);
          return false;
        }
        
        // Check if target scene exists and is initialized
        const targetSceneObj = game.scene.getScene(targetScene);
        if (!targetSceneObj) {
          console.error(`❌ Target scene ${targetScene} not found`);
          return false;
        }
        
        console.log(`✅ All checks passed on attempt ${attempts}/${maxAttempts}. Navigating to ${targetScene}...`);
        
        // Perform the scene transition
        game.scene.start(targetScene);
        
        // Update the current scene tracking
        safeSetCurrentSceneKey(targetScene);
        
        // Log success
        console.log(`🎮 Automatically restored to ${targetScene} scene`);
        return true;
      } catch (e) {
        console.error(`❌ Error during restoration attempt ${attempts}:`, e);
        return false;
      }
    };
    
    // Set up a sequence of attempts with increasing delays
    const attemptWithBackoff = () => {
      // Stop if we've hit max attempts
      if (attempts >= maxAttempts) {
        console.warn(`⚠️ Reached maximum ${maxAttempts} attempts for automatic restoration`);
        // Don't clear the button - leave it as a fallback
        return;
      }
      
      // Try to restore
      const success = tryRestore();
      
      // If successful, we're done
      if (success) {
        return;
      }
      
      // Otherwise, schedule another attempt with backoff
      const delay = Math.min(500 + (attempts * 200), 2000);
      setTimeout(attemptWithBackoff, delay);
    };
    
    // Start the first attempt after a base delay to let the game initialize
    setTimeout(attemptWithBackoff, 1000);
  }

  // Initialize the game and state manager
  const stateManager = initGame();

  // Get the saved HMR state
  const savedHmrState = getHmrState();

  // Store target scene for later use
  const targetScene = savedHmrState?.currentScene || 'TitleScene';
  console.log(`🎯 Target scene for next navigation: ${targetScene}`);

  // Try automatic restoration first
  if (savedHmrState && targetScene !== 'TitleScene') {
    // Critical safety check - StudyScene should never be saved as the target scene
    if (targetScene === 'StudyScene') {
      console.error('🛑 CRITICAL ERROR: HMR attempting to restore to StudyScene!');
      throw new Error('Cannot restore to StudyScene - it is ephemeral by design');
    }
    
    // Standard restoration approach
    attemptAutoRestore(targetScene);
  }

  // Add global helper for manual navigation
  (window as any).__NAVIGATE_TO_SCENE__ = (sceneKey: string = targetScene) => {
    try {
      if (!game || !game.scene) {
        console.error('Game or scene manager not initialized');
        return;
      }
      
      if (!game.scene.getScene(sceneKey)) {
        console.error(`Scene ${sceneKey} not found`);
        return;
      }
      
      console.log(`🚀 Manually navigating to scene: ${sceneKey}`);
      game.scene.start(sceneKey);
      
      // Update the current scene tracking
      safeSetCurrentSceneKey(sceneKey);
    } catch (e) {
      console.error('Error during manual navigation:', e);
    }
  };

  // Add a button to the page for manual navigation as fallback
  if (savedHmrState && targetScene !== 'TitleScene') {
    setTimeout(() => {
      try {
        // Don't add the button if we've already restored automatically
        if (game && game.scene && game.scene.isActive(targetScene)) {
          console.log('Scene already restored automatically, skipping button creation');
          return;
        }
        
        console.log('Creating manual navigation button as fallback');
        const container = document.getElementById('game-container');
        if (container && container.parentElement) {
          const button = document.createElement('button');
          button.id = 'restore-button';
          button.innerText = `Return to ${targetScene}`;
          button.style.position = 'absolute';
          button.style.zIndex = '1000';
          button.style.top = '10px';
          button.style.left = '10px';
          button.style.padding = '8px 16px';
          button.style.backgroundColor = '#4CAF50';
          button.style.color = 'white';
          button.style.border = 'none';
          button.style.borderRadius = '4px';
          button.style.cursor = 'pointer';
          
          button.onclick = () => {
            (window as any).__NAVIGATE_TO_SCENE__(targetScene);
            button.remove(); // Remove after clicking
          };
          
          container.parentElement.appendChild(button);
        }
      } catch (e) {
        console.error('Error adding navigation button:', e);
      }
    }, 3000); // Wait longer to see if auto-restore succeeds first
  }

  // Set up HMR
  if (import.meta.hot) {
    // Clean up the old game instance when the module is about to be replaced
    import.meta.hot.dispose((_data: Record<string, any>) => {
      console.log('🧹 Cleaning up old game instance...');
      
      // Save the current state before disposing
      try {
        // Make sure the game is initialized before trying to save state
        if (game && game.isBooted) {
          // Check if we're currently in the StudyScene
          const isInStudyScene = currentSceneKey === 'StudyScene';
          
          // Log the current scene detection for debugging
          console.log(`🔍 HMR detected current scene: ${currentSceneKey}`);
          
          // Use the specialized HMR state saving method that handles StudyScene
          const currentState = stateManager.saveStateBeforeHMR();
          
          // Validate the state before saving
          if (currentState && currentState.currentScene) {
            // Store the state for persistence
            saveHmrState(currentState);
          } else {
            console.error('❌ Invalid state returned from saveStateBeforeHMR:', currentState);
          }
        } else {
          console.warn('⚠️ Game not initialized, skipping state save');
        }
        
      } catch (e) {
        console.error('❌ Failed to save game state for HMR:', e);
      }
      
      // Remove any navigation button
      try {
        const button = document.getElementById('restore-button');
        if (button) button.remove();
      } catch (e) {
        // Ignore errors
      }
      
      // Destroy the game instance
      if (game) {
        // Properly destroy the game instance
        game.destroy(true, false);
      }
      
      // Clear the game container but keep the wrapper
      const gameContainer = document.getElementById('game-container');
      if (gameContainer) {
        gameContainer.innerHTML = '';
      }
    });

    // Handle HMR updates
    import.meta.hot.accept((_newModule) => {
      console.log('🔄 HMR update detected');
      // State restoration now handled by attemptAutoRestore
    });
  }
} 