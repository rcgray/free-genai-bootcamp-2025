/**
 * Japanese Visual Novel Game - Phaser Implementation
 */

// Configuration for our Phaser game
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-game-container',
    scene: {
        preload: preload,
        create: create
    }
};

// Initialize the game
let game;

// Wait for the DOM to be ready
window.onload = function() {
    // Create the game
    game = new Phaser.Game(config);
};

// Preload assets
function preload() {
    console.log('Preloading assets...');
    
    // Load the title background image
    // In Phaser, paths are relative to the HTML file
    this.load.image('title-background', 'assets/images/backgrounds/title.jpg');
    
    console.log('Assets preloaded');
}

// Create the scene
function create() {
    console.log('Creating title scene...');
    
    // Add the title background image
    // The image will be centered in the game canvas
    const background = this.add.image(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        'title-background'
    );
    
    // Scale the background to fit the screen
    const scaleX = this.cameras.main.width / background.width;
    const scaleY = this.cameras.main.height / background.height;
    const scale = Math.max(scaleX, scaleY);
    background.setScale(scale);
    
    // Add a title text
    const titleText = this.add.text(
        this.cameras.main.width / 2,
        100,
        'Japanese Visual Novel',
        {
            font: '48px Arial',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6,
            align: 'center'
        }
    );
    titleText.setOrigin(0.5);
    
    console.log('Title scene created successfully');
} 