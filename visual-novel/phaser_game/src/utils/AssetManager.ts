/**
 * AssetManager.ts
 * Manages asset preloading and access for the game.
 */

import Phaser from 'phaser';

interface ImageAsset {
  key: string;
  path: string;
  type: string;
}

interface AudioAsset {
  key: string;
  path: string;
}

interface SpritesheetAsset {
  key: string;
  path: string;
  frameConfig: Phaser.Types.Loader.FileTypes.ImageFrameConfig;
}

interface FontAsset {
  key: string;
  path: string;
}

interface AssetRegistry {
  images: Map<string, ImageAsset>;
  audio: Map<string, AudioAsset>;
  spritesheets: Map<string, SpritesheetAsset>;
  fonts: Map<string, FontAsset>;
}

interface AssetPaths {
  [key: string]: string;
}

class AssetManager {
  private assets: AssetRegistry;
  private paths: AssetPaths;

  /**
   * Constructor for the AssetManager class
   */
  constructor() {
    // Asset registry by type and key
    this.assets = {
      images: new Map<string, ImageAsset>(),
      audio: new Map<string, AudioAsset>(),
      spritesheets: new Map<string, SpritesheetAsset>(),
      fonts: new Map<string, FontAsset>()
    };
    
    // Default asset paths
    this.paths = {
      images: 'assets/images/',
      backgrounds: 'assets/images/backgrounds/',
      characters: 'assets/images/characters/',
      audio: 'assets/audio/',
      fonts: 'assets/fonts/'
    };
  }
  
  /**
   * Register an image asset
   * @param key - Unique key for the asset
   * @param path - Path to the asset
   * @param type - Type of image (background, character, etc.)
   */
  registerImage(key: string, path: string, type: string = 'images'): AssetManager {
    const fullPath = this.paths[type] ? this.paths[type] + path : path;
    
    this.assets.images.set(key, {
      key,
      path: fullPath,
      type
    });
    
    return this;
  }
  
  /**
   * Register a background image
   * @param key - Unique key for the background
   * @param path - Path to the background image
   */
  registerBackground(key: string, path: string): AssetManager {
    return this.registerImage(key, path, 'backgrounds');
  }
  
  /**
   * Register a character image
   * @param key - Unique key for the character
   * @param path - Path to the character image
   */
  registerCharacter(key: string, path: string): AssetManager {
    return this.registerImage(key, path, 'characters');
  }
  
  /**
   * Register an audio asset
   * @param key - Unique key for the asset
   * @param path - Path to the asset
   */
  registerAudio(key: string, path: string): AssetManager {
    const fullPath = this.paths.audio + path;
    
    this.assets.audio.set(key, {
      key,
      path: fullPath
    });
    
    return this;
  }
  
  /**
   * Register a spritesheet asset
   * @param key - Unique key for the asset
   * @param path - Path to the asset
   * @param frameConfig - Frame configuration for the spritesheet
   */
  registerSpritesheet(
    key: string, 
    path: string, 
    frameConfig: Phaser.Types.Loader.FileTypes.ImageFrameConfig
  ): AssetManager {
    const fullPath = this.paths.images + path;
    
    this.assets.spritesheets.set(key, {
      key,
      path: fullPath,
      frameConfig
    });
    
    return this;
  }
  
  /**
   * Register a font asset
   * @param key - Unique key for the asset
   * @param path - Path to the asset
   */
  registerFont(key: string, path: string): AssetManager {
    const fullPath = this.paths.fonts + path;
    
    this.assets.fonts.set(key, {
      key,
      path: fullPath
    });
    
    return this;
  }
  
  /**
   * Preload all registered assets into a Phaser scene
   * @param scene - Phaser scene to load assets into
   */
  preloadAll(scene: Phaser.Scene): void {
    console.log('Preloading all assets...');
    
    // Preload images
    this.assets.images.forEach(image => {
      scene.load.image(image.key, image.path);
    });
    
    // Preload audio
    this.assets.audio.forEach(audio => {
      scene.load.audio(audio.key, audio.path);
    });
    
    // Preload spritesheets
    this.assets.spritesheets.forEach(spritesheet => {
      scene.load.spritesheet(
        spritesheet.key,
        spritesheet.path,
        spritesheet.frameConfig
      );
    });
    
    // Preload fonts (if applicable)
    this.assets.fonts.forEach(font => {
      // For web fonts, we might not need to preload them
      // But we can register them for later use
      console.log(`Registered font: ${font.key}`);
    });
  }
  
  /**
   * Preload assets of a specific type
   * @param scene - Phaser scene to load assets into
   * @param type - Type of assets to preload (images, audio, etc.)
   */
  preloadType(scene: Phaser.Scene, type: keyof AssetRegistry): void {
    if (!this.assets[type]) {
      console.error(`Asset type ${type} not recognized`);
      return;
    }
    
    console.log(`Preloading ${type}...`);
    
    if (type === 'images') {
      this.assets.images.forEach(image => {
        scene.load.image(image.key, image.path);
      });
    } else if (type === 'audio') {
      this.assets.audio.forEach(audio => {
        scene.load.audio(audio.key, audio.path);
      });
    } else if (type === 'spritesheets') {
      this.assets.spritesheets.forEach(spritesheet => {
        scene.load.spritesheet(
          spritesheet.key,
          spritesheet.path,
          spritesheet.frameConfig
        );
      });
    }
  }
  
  /**
   * Get an asset by key and type
   * @param key - Key of the asset to get
   * @param type - Type of the asset
   * @returns Asset object or null if not found
   */
  getAsset<T>(key: string, type: keyof AssetRegistry): T | null {
    if (!this.assets[type]) {
      console.error(`Asset type ${type} not recognized`);
      return null;
    }
    
    if (!this.assets[type].has(key)) {
      console.error(`Asset with key ${key} not found in ${type}`);
      return null;
    }
    
    return this.assets[type].get(key) as unknown as T || null;
  }
  
  /**
   * Get an image asset by key
   * @param key - Key of the image to get
   * @returns Image asset object or null if not found
   */
  getImage(key: string): ImageAsset | null {
    return this.getAsset<ImageAsset>(key, 'images');
  }
  
  /**
   * Get an audio asset by key
   * @param key - Key of the audio to get
   * @returns Audio asset object or null if not found
   */
  getAudio(key: string): AudioAsset | null {
    return this.getAsset<AudioAsset>(key, 'audio');
  }
}

// Create a singleton instance
const assetManager = new AssetManager();

// Export the singleton instance
export default assetManager; 