/**
 * Japanese Visual Novel - Phaser Game
 * Main game configuration and initialization
 */

// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Game configuration
    const config = {
        type: Phaser.AUTO,
        width: 1280,
        height: 720,
        parent: 'game-container',
        backgroundColor: '#000000',
        scene: {
            preload: preload,
            create: create,
            update: update
        },
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        }
    };

    // Create the game instance
    const game = new Phaser.Game(config);

    // Asset loading
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

    // Game initialization
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
            this.cameras.main.height / 2 + 100,
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
    }

    // Game update loop
    function update() {
        // Will be used for animations and game logic in future steps
    }
});

// Function to communicate with Streamlit (will be expanded in future steps)
function sendToStreamlit(data) {
    if (window.Streamlit) {
        window.Streamlit.setComponentValue(data);
    } else {
        console.log('Streamlit not available, data:', data);
    }
} 