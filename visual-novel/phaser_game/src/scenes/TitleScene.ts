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
  private resetButton?: Phaser.GameObjects.Text;
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
    
    // Check for restoration target
    this.checkForRestorationTarget();
    
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
      'Start Game2',
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
      // Transition to the VN scene
      this.transitionTo('VNScene');
    });
    
    // Add reset button in the top right corner
    this.resetButton = this.add.text(
      this.cameras.main.width - 20,
      20,
      'Reset',
      {
        fontFamily: 'Arial',
        fontSize: '20px',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 2,
        backgroundColor: '#ff0000'
      }
    );
    this.resetButton.setOrigin(1, 0); // Align to top right
    this.resetButton.setPadding(8);
    this.resetButton.setInteractive({ useHandCursor: true });
    
    // Add hover effect for reset button
    this.resetButton.on('pointerover', () => {
      this.resetButton?.setStyle({ color: '#ffff00' });
    });
    
    this.resetButton.on('pointerout', () => {
      this.resetButton?.setStyle({ color: '#ffffff' });
    });
    
    // Handle reset button click
    this.resetButton.on('pointerdown', () => {
      console.log('Reset button clicked - clearing game state');
      this.resetGameState();
    });
  }
  
  /**
   * Reset the game state completely
   */
  private resetGameState(): void {
    console.log('🔄 Resetting game state completely');
    
    // Clear any restoration target
    const win = window as any;
    if (win.__PHASER_RESTORATION_TARGET__) {
      console.log('Clearing restoration target:', win.__PHASER_RESTORATION_TARGET__);
      win.__PHASER_RESTORATION_TARGET__ = null;
    }
    
    // Clear any stored game state
    if (localStorage) {
      console.log('Clearing localStorage game state');
      localStorage.removeItem('gameState');
      localStorage.removeItem('currentScene');
      
      // Clear any other game-related items
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('phaser') || key.startsWith('game') || key.includes('Scene'))) {
          keysToRemove.push(key);
        }
      }
      
      keysToRemove.forEach(key => {
        localStorage.removeItem(key);
        console.log(`Removed localStorage item: ${key}`);
      });
    }
    
    // Restart the current scene to apply the reset
    console.log('Restarting TitleScene to apply reset');
    this.scene.restart();
  }
  
  /**
   * Check if there's a restoration target and handle it
   */
  private checkForRestorationTarget(): void {
    // Check if we have a restoration target
    const win = window as any;
    if (win.__PHASER_RESTORATION_TARGET__) {
      console.log('🔄 Found restoration target in TitleScene:', win.__PHASER_RESTORATION_TARGET__);
      
      // Make sure we're fully initialized before attempting transition
      // Use a longer delay and Phaser's own timing system
      this.time.delayedCall(800, () => {
        try {
          // Double-check that we're still in a valid state
          if (!this.scene || !this.scene.manager) {
            console.warn('⚠️ Scene or scene manager not available, delaying transition');
            // Try again in a bit
            this.time.delayedCall(500, this.checkForRestorationTarget, [], this);
            return;
          }
          
          // Get the target scene information
          const target = win.__PHASER_RESTORATION_TARGET__;
          if (!target || !target.scene) {
            console.warn('⚠️ Invalid restoration target, aborting transition');
            return;
          }
          
          console.log(`🔄 Executing delayed transition from TitleScene to ${target.scene}`);
          
          // Use a safer approach to scene transition
          try {
            // First check if the target scene exists
            if (this.scene.manager.getScene(target.scene)) {
              // Use Phaser's scene transition instead of direct start
              this.scene.transition({
                target: target.scene,
                duration: 100,
                data: target.data || {}
              });
              
              console.log(`✅ Transition to ${target.scene} initiated`);
              
              // Clear the target after successful transition
              win.__PHASER_RESTORATION_TARGET__ = null;
            } else {
              console.warn(`⚠️ Target scene ${target.scene} not found, cannot transition`);
            }
          } catch (transitionError) {
            console.error('Error during scene transition:', transitionError);
            
            // Fallback to direct scene start
            try {
              this.scene.start(target.scene, target.data || {});
              console.log(`✅ Direct start of ${target.scene} as fallback`);
              
              // Clear the target after successful start
              win.__PHASER_RESTORATION_TARGET__ = null;
            } catch (startError) {
              console.error('Error during direct scene start:', startError);
            }
          }
        } catch (e) {
          console.error('Error executing delayed transition from TitleScene:', e);
        }
      });
    }
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