/**
 * Utility for debugging Phaser's internal state
 */

/**
 * Print detailed information about the game instance
 * @param game The Phaser game instance
 */
export function debugGameInstance(game: Phaser.Game): void {
  console.group('🔍 Phaser Game Instance Debug:');
  
  try {
    console.log('Game instance:', {
      isBooted: game.isBooted,
      isPaused: game.isPaused,
      renderer: game.renderer ? game.renderer.type : 'No renderer',
      config: {
        width: game.config.width,
        height: game.config.height,
        type: (game.config as any).type,
        parent: game.config.parent
      }
    });
    
    // Debug scene manager
    if (game.scene) {
      debugSceneManager(game.scene);
    } else {
      console.warn('❌ Scene manager not initialized');
    }
    
    // Debug renderer
    if (game.renderer) {
      console.log('Renderer:', {
        type: game.renderer.type,
        width: game.renderer.width,
        height: game.renderer.height,
        resolution: (game.renderer as any).resolution,
        'context exists': !!(game.renderer as any).gl
      });
    } else {
      console.warn('❌ Renderer not initialized');
    }
    
  } catch (e) {
    console.error('Error during game instance debug:', e);
  }
  
  console.groupEnd();
}

/**
 * Print detailed information about the scene manager
 * @param sceneManager The Phaser scene manager
 */
export function debugSceneManager(sceneManager: Phaser.Scenes.SceneManager): void {
  console.group('🔍 Scene Manager Debug:');
  
  try {
    // Get basic info
    const sceneCount = sceneManager.scenes ? sceneManager.scenes.length : 0;
    const activeScenes = sceneManager.getScenes(true);
    const activeSceneCount = activeScenes ? activeScenes.length : 0;
    
    console.log('Scene Manager:', {
      'Total scenes': sceneCount,
      'Active scenes': activeSceneCount,
      'isBooted': sceneManager.isBooted,
      'Processing': sceneManager.isProcessing
    });
    
    // List all scenes
    if (sceneManager.scenes && sceneManager.scenes.length > 0) {
      console.group('Scenes:');
      
      sceneManager.scenes.forEach((scene, index) => {
        if (scene) {
          const isActive = scene.sys ? scene.sys.isActive() : false;
          const isVisible = scene.sys ? scene.sys.isVisible() : false;
          
          console.log(`Scene #${index} [${scene.scene.key}]:`, {
            'Active': isActive,
            'Visible': isVisible,
            'Systems initialized': !!scene.sys,
            'Events initialized': scene.sys ? !!scene.sys.events : false,
            'Input initialized': scene.sys ? !!(scene.sys as any).input : false
          });
        } else {
          console.log(`Scene #${index}: null or undefined`);
        }
      });
      
      console.groupEnd();
    } else {
      console.warn('❌ No scenes found in sceneManager.scenes');
    }
    
  } catch (e) {
    console.error('Error during scene manager debug:', e);
  }
  
  console.groupEnd();
}

/**
 * Print detailed information about a specific scene
 * @param scene The Phaser scene to debug
 */
export function debugScene(scene: Phaser.Scene): void {
  console.group(`🔍 Scene Debug: ${scene.scene.key}`);
  
  try {
    console.log('Scene:', {
      'Key': scene.scene.key,
      'Is Active': scene.scene.isActive(),
      'Is Visible': scene.scene.isVisible(),
      'Is Paused': scene.scene.isPaused(),
      'Is Sleeping': scene.scene.isSleeping()
    });
    
    // Debug scene systems
    if (scene.sys) {
      console.log('Scene Systems:', {
        'Is Active': scene.sys.isActive(),
        'Is Visible': scene.sys.isVisible(),
        'Settings exists': !!scene.sys.settings,
        'Events exists': !!scene.sys.events,
        'Game exists': !!scene.sys.game,
        'DisplayList exists': !!scene.sys.displayList,
        'UpdateList exists': !!scene.sys.updateList
      });
    } else {
      console.warn('❌ Scene systems not initialized');
    }
    
  } catch (e) {
    console.error('Error during scene debug:', e);
  }
  
  console.groupEnd();
}

/**
 * Check if a property exists and is not null
 * @param obj The object to check
 * @param path The dot-notation path to the property
 * @returns True if the property exists and is not null
 */
export function checkPropertyExists(obj: any, path: string): boolean {
  const parts = path.split('.');
  let current = obj;
  
  for (let i = 0; i < parts.length; i++) {
    if (current === null || current === undefined) {
      return false;
    }
    
    current = current[parts[i]];
  }
  
  return current !== null && current !== undefined;
}

/**
 * Monitor an object property and report when it changes
 * @param obj The object to monitor
 * @param path The dot-notation path to the property
 * @param interval The check interval in ms
 * @param label A label for the monitor
 * @returns A function to stop monitoring
 */
export function monitorProperty(obj: any, path: string, interval: number = 100, label: string = 'Property Monitor'): () => void {
  let lastValue: any = undefined;
  let lastExists = checkPropertyExists(obj, path);
  
  const intervalId = setInterval(() => {
    const exists = checkPropertyExists(obj, path);
    
    if (exists !== lastExists) {
      console.log(`${label}: Property ${path} ${exists ? 'now exists' : 'no longer exists'}`);
      lastExists = exists;
    }
    
    if (exists) {
      const value = getPropertyValue(obj, path);
      
      if (value !== lastValue) {
        console.log(`${label}: Property ${path} changed:`, value);
        lastValue = value;
      }
    }
  }, interval);
  
  return () => clearInterval(intervalId);
}

/**
 * Get a property value using dot notation
 * @param obj The object to get the property from
 * @param path The dot-notation path to the property
 * @returns The property value or undefined
 */
function getPropertyValue(obj: any, path: string): any {
  const parts = path.split('.');
  let current = obj;
  
  for (let i = 0; i < parts.length; i++) {
    if (current === null || current === undefined) {
      return undefined;
    }
    
    current = current[parts[i]];
  }
  
  return current;
} 