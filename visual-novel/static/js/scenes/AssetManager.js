/**
 * AssetManager.js
 * Manages asset preloading and access for the game.
 */

class AssetManager {
    /**
     * Constructor for the AssetManager class
     */
    constructor() {
        // Asset registry by type and key
        this.assets = {
            images: new Map(),
            audio: new Map(),
            spritesheets: new Map(),
            fonts: new Map()
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
     * @param {string} key - Unique key for the asset
     * @param {string} path - Path to the asset
     * @param {string} type - Type of image (background, character, etc.)
     */
    registerImage(key, path, type = 'images') {
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
     * @param {string} key - Unique key for the background
     * @param {string} path - Path to the background image
     */
    registerBackground(key, path) {
        return this.registerImage(key, path, 'backgrounds');
    }
    
    /**
     * Register a character image
     * @param {string} key - Unique key for the character
     * @param {string} path - Path to the character image
     */
    registerCharacter(key, path) {
        return this.registerImage(key, path, 'characters');
    }
    
    /**
     * Register an audio asset
     * @param {string} key - Unique key for the asset
     * @param {string} path - Path to the asset
     */
    registerAudio(key, path) {
        const fullPath = this.paths.audio + path;
        
        this.assets.audio.set(key, {
            key,
            path: fullPath
        });
        
        return this;
    }
    
    /**
     * Register a spritesheet asset
     * @param {string} key - Unique key for the asset
     * @param {string} path - Path to the asset
     * @param {Object} frameConfig - Frame configuration for the spritesheet
     */
    registerSpritesheet(key, path, frameConfig) {
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
     * @param {string} key - Unique key for the asset
     * @param {string} path - Path to the asset
     */
    registerFont(key, path) {
        const fullPath = this.paths.fonts + path;
        
        this.assets.fonts.set(key, {
            key,
            path: fullPath
        });
        
        return this;
    }
    
    /**
     * Preload all registered assets into a Phaser scene
     * @param {Phaser.Scene} scene - Phaser scene to load assets into
     */
    preloadAll(scene) {
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
     * @param {Phaser.Scene} scene - Phaser scene to load assets into
     * @param {string} type - Type of assets to preload (images, audio, etc.)
     */
    preloadType(scene, type) {
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
     * @param {string} key - Key of the asset to get
     * @param {string} type - Type of the asset
     * @returns {Object} Asset object
     */
    getAsset(key, type) {
        if (!this.assets[type]) {
            console.error(`Asset type ${type} not recognized`);
            return null;
        }
        
        if (!this.assets[type].has(key)) {
            console.error(`Asset with key ${key} not found in ${type}`);
            return null;
        }
        
        return this.assets[type].get(key);
    }
    
    /**
     * Get an image asset by key
     * @param {string} key - Key of the image to get
     * @returns {Object} Image asset object
     */
    getImage(key) {
        return this.getAsset(key, 'images');
    }
    
    /**
     * Get an audio asset by key
     * @param {string} key - Key of the audio to get
     * @returns {Object} Audio asset object
     */
    getAudio(key) {
        return this.getAsset(key, 'audio');
    }
}

// Create a singleton instance
const assetManager = new AssetManager();

// Export the singleton instance
if (typeof module !== 'undefined' && module.exports) {
    module.exports = assetManager;
} 