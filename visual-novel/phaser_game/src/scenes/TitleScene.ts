/**
 * TitleScene.ts
 * Title screen for the Japanese Visual Novel game.
 * This is the first scene that appears when the game starts.
 */

import BaseScene from './BaseScene';
import sceneRegistry from './SceneRegistry';

// Debug function to log information about the global asset
function debugAsset(name: string) {
  const win = window as any;
  console.log('Debugging asset:', name);
  console.log('window.GAME_ASSETS exists:', !!win.GAME_ASSETS);
  if (win.GAME_ASSETS) {
    console.log(`Asset '${name}' exists:`, !!win.GAME_ASSETS[name]);
    if (win.GAME_ASSETS[name]) {
      console.log(`Asset '${name}' data URL length:`, win.GAME_ASSETS[name].length);
      console.log(`Asset '${name}' starts with:`, win.GAME_ASSETS[name].substring(0, 50) + '...');
    }
  }
}

export default class TitleScene extends BaseScene {
  /**
   * Constructor for the TitleScene class
   */
  constructor() {
    super({ key: 'TitleScene' });
  }
  
  /**
   * Preload assets for the scene
   */
  preload(): void {
    // Call the parent preload method to display loading text
    super.preload();
    
    // Debug the asset availability
    debugAsset('title-bg');
    
    // Check if we're in the embedded mode (Streamlit) with assets provided
    const win = window as any;
    if (win.GAME_ASSETS && win.GAME_ASSETS['title-bg']) {
      // Use the embedded asset URLs
      console.log('Using embedded title background image');
      
      // Load the image from the data URL
      this.load.image('title-bg', win.GAME_ASSETS['title-bg']);
    } else {
      // Load the title background normally
      console.log('Loading title background image from assets/images/backgrounds/title.png');
      this.load.image('title-bg', 'assets/images/backgrounds/title.png');
    }
  }
  
  /**
   * Create the scene elements
   */
  create(): void {
    console.log('Creating TitleScene');
    
    // Debug log to verify the image was loaded
    console.log('Loaded images:', Object.keys(this.textures.list));
    console.log('title-bg texture exists:', this.textures.exists('title-bg'));
    
    // Create a simple colored background as a fallback
    this.cameras.main.setBackgroundColor('#4b7bec');
    
    try {
      // Add the title background
      if (this.textures.exists('title-bg')) {
        const background = this.add.image(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2,
          'title-bg'
        );
        
        // Scale the background to fit the screen
        background.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
        console.log('Background image added successfully');
      } else {
        // Create a gradient background if the image failed to load
        console.log('Title background image not found, creating gradient background');
        this.createGradientBackground();
      }
    } catch (error) {
      console.error('Error adding background:', error);
      // Create a gradient background as fallback
      this.createGradientBackground();
    }
    
    // Add a start button
    const startButton = this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2 + 150,
      'Start Game',
      {
        fontFamily: 'Arial',
        fontSize: '32px',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 4
      }
    );
    startButton.setOrigin(0.5, 0.5);
    startButton.setInteractive({ useHandCursor: true });
    
    // Add hover effect
    startButton.on('pointerover', () => {
      startButton.setStyle({ color: '#ff8800' });
    });
    
    startButton.on('pointerout', () => {
      startButton.setStyle({ color: '#ffffff' });
    });
    
    // Make the button pulse
    this.tweens.add({
      targets: startButton,
      scale: 1.1,
      duration: 800,
      ease: 'Power2',
      yoyo: true,
      repeat: -1
    });
    
    // Handle click event
    startButton.on('pointerdown', () => {
      console.log('Start button clicked');
      // For now, just transition to the test scene if available
      this.transitionTo('TestScene');
    });
    
    // Add title text
    const titleText = this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2 - 100,
      'Japanese Visual Novel',
      {
        fontFamily: 'Arial',
        fontSize: '64px',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 6
      }
    );
    titleText.setOrigin(0.5, 0.5);
  }
  
  /**
   * Create a gradient background directly in the scene
   */
  createGradientBackground(): void {
    // Create a rectangle for the background
    const background = this.add.rectangle(
      0, 0,
      this.cameras.main.width,
      this.cameras.main.height,
      0x4b7bec
    );
    background.setOrigin(0, 0);
    
    // Add a gradient overlay
    const gradientRect = this.add.rectangle(
      0, 0,
      this.cameras.main.width,
      this.cameras.main.height,
      0x3867d6
    );
    gradientRect.setOrigin(0, 0);
    gradientRect.setAlpha(0.5);
    
    console.log('Gradient background created');
  }
}

// Register the scene with the registry
sceneRegistry.register('TitleScene', TitleScene); 