/**
 * SceneRegistry.js
 * Registry for all game scenes to manage scene transitions and state.
 */

class SceneRegistry {
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
     * @param {string} key - Unique key for the scene
     * @param {Phaser.Scene} sceneClass - Scene class to register
     */
    register(key, sceneClass) {
        if (this.scenes.has(key)) {
            console.warn(`Scene with key ${key} already registered. Overwriting.`);
        }
        
        this.scenes.set(key, sceneClass);
        console.log(`Registered scene: ${key}`);
        
        return this;
    }
    
    /**
     * Get a scene by key
     * @param {string} key - Key of the scene to get
     * @returns {Phaser.Scene} Scene class
     */
    getScene(key) {
        if (!this.scenes.has(key)) {
            console.error(`Scene with key ${key} not found in registry`);
            return null;
        }
        
        return this.scenes.get(key);
    }
    
    /**
     * Get all registered scenes
     * @returns {Array} Array of scene objects with key and class
     */
    getAllScenes() {
        const sceneArray = [];
        
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
     * @param {Object} initialState - Initial game state
     */
    initGameState(initialState = {}) {
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
     * @param {Object} newState - New state to merge with current state
     */
    updateGameState(newState) {
        this.gameState = {
            ...this.gameState,
            ...newState
        };
        
        return this.gameState;
    }
    
    /**
     * Get the current game state
     * @returns {Object} Current game state
     */
    getGameState() {
        return this.gameState;
    }
}

// Create a singleton instance
const sceneRegistry = new SceneRegistry();

// Export the singleton instance
if (typeof module !== 'undefined' && module.exports) {
    module.exports = sceneRegistry;
} 