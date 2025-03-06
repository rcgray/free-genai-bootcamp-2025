/**
 * Japanese Visual Novel - Phaser Game
 * Main game configuration and initialization
 */

// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Load scene classes
    // In a production environment, these would be imported via modules
    // For now, we'll assume they're loaded in the HTML before this script
    
    // Game configuration
    const config = {
        type: Phaser.AUTO,
        width: 1280,
        height: 720,
        parent: 'game-container',
        backgroundColor: '#000000',
        scene: [], // We'll add scenes dynamically
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        }
    };

    // Create the game instance
    const game = new Phaser.Game(config);
    
    // Initialize the scene registry
    if (window.sceneRegistry) {
        console.log('Scene registry found, initializing game state');
        window.sceneRegistry.initGameState();
        
        // Add the default scene
        game.scene.add('DefaultScene', {
            preload: preload,
            create: create,
            update: update
        }, true);
        
        // Add the test scene if available
        if (window.TestScene) {
            game.scene.add('TestScene', TestScene);
        }
    } else {
        console.warn('Scene registry not found, using default scene');
        
        // Add a default scene if the registry isn't available
        game.scene.add('DefaultScene', {
            preload: preload,
            create: create,
            update: update
        }, true);
    }
    
    // Asset loading for default scene
    function preload() {
        // Display loading text
        const loadingText = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            'Loading...',
            {
                font: '28px Arial',
                fill: '#ffffff'
            }
        );
        loadingText.setOrigin(0.5, 0.5);

        // Set up loading events
        this.load.on('progress', function(value) {
            loadingText.setText(`Loading: ${Math.floor(value * 100)}%`);
        });

        this.load.on('complete', function() {
            loadingText.setText('Ready!');
        });

        // Load assets here (will be expanded in future steps)
        // Example: this.load.image('background', 'assets/images/backgrounds/title.jpg');
    }

    // Game initialization for default scene
    function create() {
        // Set up the test scene
        const titleText = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2 - 100,
            'Japanese Visual Novel',
            {
                font: '64px Arial',
                fill: '#ffffff'
            }
        );
        titleText.setOrigin(0.5, 0.5);

        const startText = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2 + 50,
            'Click to Start',
            {
                font: '32px Arial',
                fill: '#ffffff'
            }
        );
        startText.setOrigin(0.5, 0.5);
        startText.setInteractive({ useHandCursor: true });

        // Make the text pulse
        this.tweens.add({
            targets: startText,
            alpha: 0.5,
            duration: 800,
            ease: 'Power2',
            yoyo: true,
            repeat: -1
        });

        // Handle click event
        startText.on('pointerdown', function() {
            startText.setText('Game Starting...');
            // In the future, this will transition to the main game scene
        });
        
        // Add a button to test the scene management system
        if (window.TestScene) {
            const testButton = this.add.text(
                this.cameras.main.width / 2,
                this.cameras.main.height / 2 + 150,
                'Test Scene System',
                {
                    font: '32px Arial',
                    fill: '#ffffff'
                }
            );
            testButton.setOrigin(0.5, 0.5);
            testButton.setInteractive({ useHandCursor: true });
            
            // Add hover effect
            testButton.on('pointerover', function() {
                testButton.setStyle({ fill: '#ff8800' });
            });
            
            testButton.on('pointerout', function() {
                testButton.setStyle({ fill: '#ffffff' });
            });
            
            // Handle click event
            testButton.on('pointerdown', () => {
                // Start the test scene
                this.scene.start('TestScene', { 
                    gameState: window.sceneRegistry.getGameState() 
                });
            });
        }
        
        // Add a message about the scene system
        const sceneText = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height - 50,
            'Scene management system is ready.',
            {
                font: '16px Arial',
                fill: '#ffffff'
            }
        );
        sceneText.setOrigin(0.5, 0.5);
    }

    // Game update loop for default scene
    function update() {
        // Will be used for animations and game logic in future steps
    }
});

// Function to communicate with Streamlit
function sendToStreamlit(data) {
    if (window.Streamlit) {
        window.Streamlit.setComponentValue(data);
    } else {
        console.log('Streamlit not available, data:', data);
    }
}

// Make sendToStreamlit available globally
window.sendToStreamlit = sendToStreamlit; 