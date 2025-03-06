/**
 * BaseScene.js
 * Base scene class that provides common functionality for all game scenes.
 * This serves as the foundation for the Title, VN, and Study scenes.
 */

class BaseScene extends Phaser.Scene {
    /**
     * Constructor for the BaseScene class
     * @param {Object} config - Configuration object for the scene
     */
    constructor(config) {
        super(config);
        
        // Game state object that will be shared across scenes
        this.gameState = null;
        
        // Scene transition properties
        this.transitionDuration = 500; // milliseconds
        this.isTransitioning = false;
    }
    
    /**
     * Initialize the scene with data passed from another scene
     * @param {Object} data - Data passed from another scene
     */
    init(data) {
        console.log(`Initializing ${this.scene.key} scene`);
        
        // Initialize or update game state
        this.gameState = data.gameState || this.createDefaultGameState();
        
        // Set up any scene-specific initialization
        this.setupScene(data);
    }
    
    /**
     * Create a default game state object if none is provided
     * @returns {Object} Default game state object
     */
    createDefaultGameState() {
        return {
            // Current scene and position
            currentScene: this.scene.key,
            
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
            }
        };
    }
    
    /**
     * Setup method to be overridden by child classes
     * @param {Object} data - Data passed from another scene
     */
    setupScene(data) {
        // To be implemented by child classes
    }
    
    /**
     * Preload assets for the scene
     * This method should be overridden by child classes
     */
    preload() {
        // Display loading text
        this.createLoadingText();
        
        // To be extended by child classes
    }
    
    /**
     * Create loading text to display during asset loading
     */
    createLoadingText() {
        this.loadingText = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            'Loading...',
            {
                font: '28px Arial',
                fill: '#ffffff'
            }
        );
        this.loadingText.setOrigin(0.5, 0.5);
        
        // Set up loading events
        this.load.on('progress', (value) => {
            this.loadingText.setText(`Loading: ${Math.floor(value * 100)}%`);
        });
        
        this.load.on('complete', () => {
            this.loadingText.setText('Ready!');
            this.loadingText.destroy();
        });
    }
    
    /**
     * Create the scene elements
     * This method should be overridden by child classes
     */
    create() {
        console.log(`Creating ${this.scene.key} scene`);
        
        // To be implemented by child classes
    }
    
    /**
     * Update method called on each frame
     * This method should be overridden by child classes if needed
     * @param {number} time - Current time
     * @param {number} delta - Time since last frame
     */
    update(time, delta) {
        // To be implemented by child classes if needed
    }
    
    /**
     * Transition to another scene
     * @param {string} targetScene - Key of the target scene
     * @param {Object} data - Data to pass to the target scene
     */
    transitionTo(targetScene, data = {}) {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        console.log(`Transitioning from ${this.scene.key} to ${targetScene}`);
        
        // Update game state
        this.gameState.currentScene = targetScene;
        
        // Create data object to pass to the next scene
        const sceneData = {
            gameState: this.gameState,
            ...data
        };
        
        // Create a camera fade effect
        this.cameras.main.fadeOut(this.transitionDuration);
        
        this.cameras.main.once('camerafadeoutcomplete', () => {
            // Start the new scene and stop this one
            this.scene.start(targetScene, sceneData);
            this.isTransitioning = false;
        });
    }
    
    /**
     * Save the current game state
     * This is a placeholder for future implementation
     */
    saveGameState() {
        console.log('Saving game state...');
        // In the future, this will save to TinyDB or localStorage
        
        // For now, just send to Streamlit for debugging
        this.sendToStreamlit({
            action: 'saveGameState',
            gameState: this.gameState
        });
    }
    
    /**
     * Send data to Streamlit
     * @param {Object} data - Data to send to Streamlit
     */
    sendToStreamlit(data) {
        if (window.sendToStreamlit) {
            window.sendToStreamlit(data);
        } else {
            console.log('sendToStreamlit function not available, data:', data);
        }
    }
}

// Export the BaseScene class
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BaseScene;
} 