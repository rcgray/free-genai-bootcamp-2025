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
  // Add properties to track state
  private startButtonTween?: Phaser.Tweens.Tween;
  private startButton?: Phaser.GameObjects.Text;
  private titleText?: Phaser.GameObjects.Text;
  private background?: Phaser.GameObjects.Image | Phaser.GameObjects.Rectangle;
  private gradientRect?: Phaser.GameObjects.Rectangle;
  private hasGradientBackground: boolean = false;

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
        this.background = this.add.image(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2,
          'title-bg'
        );
        
        // Scale the background to fit the screen
        (this.background as Phaser.GameObjects.Image).setDisplaySize(this.cameras.main.width, this.cameras.main.height);
        console.log('Background image added successfully');
        this.hasGradientBackground = false;
      } else {
        // Create a gradient background if the image failed to load
        console.log('Title background image not found, creating gradient background');
        this.createGradientBackground();
        this.hasGradientBackground = true;
      }
    } catch (error) {
      console.error('Error adding background:', error);
      // Create a gradient background as fallback
      this.createGradientBackground();
      this.hasGradientBackground = true;
    }
    
    // Add a start button
    this.startButton = this.add.text(
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
    this.startButton.setOrigin(0.5, 0.5);
    this.startButton.setInteractive({ useHandCursor: true });
    
    // Add hover effect
    this.startButton.on('pointerover', () => {
      this.startButton?.setStyle({ color: '#ff8800' });
    });
    
    this.startButton.on('pointerout', () => {
      this.startButton?.setStyle({ color: '#ffffff' });
    });
    
    // Make the button pulse
    this.startButtonTween = this.tweens.add({
      targets: this.startButton,
      scale: 1.1,
      duration: 800,
      ease: 'Power2',
      yoyo: true,
      repeat: -1
    });
    
    // Handle click event
    this.startButton.on('pointerdown', () => {
      console.log('Start button clicked');
      // For now, just transition to the test scene if available
      this.transitionTo('TestScene');
    });
    
    // Add title text
    this.titleText = this.add.text(
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
    this.titleText.setOrigin(0.5, 0.5);
  }
  
  /**
   * Create a gradient background directly in the scene
   */
  createGradientBackground(): void {
    // Create a rectangle for the background
    this.background = this.add.rectangle(
      0, 0,
      this.cameras.main.width,
      this.cameras.main.height,
      0x4b7bec
    );
    this.background.setOrigin(0, 0);
    
    // Add a gradient overlay
    this.gradientRect = this.add.rectangle(
      0, 0,
      this.cameras.main.width,
      this.cameras.main.height,
      0x3867d6
    );
    this.gradientRect.setOrigin(0, 0);
    this.gradientRect.setAlpha(0.5);
    
    console.log('Gradient background created');
  }

  /**
   * Override serializeState to include TitleScene-specific state
   */
  serializeState(): any {
    // Get base state from parent
    const baseState = super.serializeState();
    
    // Add scene-specific state
    return {
      ...baseState,
      hasGradientBackground: this.hasGradientBackground,
      startButtonPosition: this.startButton ? {
        x: this.startButton.x,
        y: this.startButton.y,
        scale: this.startButton.scale
      } : undefined,
      titleTextPosition: this.titleText ? {
        x: this.titleText.x,
        y: this.titleText.y
      } : undefined
    };
  }
  
  /**
   * Override deserializeState to restore TitleScene-specific state
   */
  deserializeState(state: any): void {
    // Apply base state
    super.deserializeState(state);
    
    // Restore scene-specific state
    if (state.hasGradientBackground !== undefined) {
      this.hasGradientBackground = state.hasGradientBackground;
    }
    
    // Note: Most UI elements will be recreated in create(),
    // but we could use this state to modify their appearance or behavior
    console.log('TitleScene state restored');
  }
}

// Register the scene with the registry
sceneRegistry.register('TitleScene', TitleScene); 