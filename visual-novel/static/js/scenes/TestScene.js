/**
 * TestScene.js
 * A simple test scene to verify the scene management system works.
 */

class TestScene extends BaseScene {
    /**
     * Constructor for the TestScene class
     */
    constructor() {
        super({ key: 'TestScene' });
    }
    
    /**
     * Preload assets for the scene
     */
    preload() {
        // Call the parent preload method to display loading text
        super.preload();
        
        // Load any test assets here
    }
    
    /**
     * Create the scene elements
     */
    create() {
        console.log('Creating TestScene');
        
        // Add a background color
        this.cameras.main.setBackgroundColor('#333333');
        
        // Add a title
        const titleText = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2 - 100,
            'Test Scene',
            {
                font: '64px Arial',
                fill: '#ffffff'
            }
        );
        titleText.setOrigin(0.5, 0.5);
        
        // Add a description
        const descText = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            'Scene Management System is working!',
            {
                font: '32px Arial',
                fill: '#ffffff'
            }
        );
        descText.setOrigin(0.5, 0.5);
        
        // Add a button to return to the default scene
        const backButton = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2 + 100,
            'Return to Default Scene',
            {
                font: '32px Arial',
                fill: '#ffffff'
            }
        );
        backButton.setOrigin(0.5, 0.5);
        backButton.setInteractive({ useHandCursor: true });
        
        // Add hover effect
        backButton.on('pointerover', () => {
            backButton.setStyle({ fill: '#ff8800' });
        });
        
        backButton.on('pointerout', () => {
            backButton.setStyle({ fill: '#ffffff' });
        });
        
        // Handle click event
        backButton.on('pointerdown', () => {
            this.transitionTo('DefaultScene');
        });
        
        // Display game state info
        const stateText = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height - 50,
            `Current Scene: ${this.gameState.currentScene}`,
            {
                font: '16px Arial',
                fill: '#ffffff'
            }
        );
        stateText.setOrigin(0.5, 0.5);
    }
}

// Register the scene with the registry
if (window.sceneRegistry) {
    window.sceneRegistry.register('TestScene', TestScene);
} 