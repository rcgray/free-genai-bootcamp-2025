/**
 * TestScene.ts
 * A simple test scene to verify the scene management system works.
 */

import BaseScene from './BaseScene';
import sceneRegistry from './SceneRegistry';

export default class TestScene extends BaseScene {
  /**
   * Constructor for the TestScene class
   */
  constructor() {
    super({ key: 'TestScene' });
  }
  
  /**
   * Preload assets for the scene
   */
  preload(): void {
    // Call the parent preload method to display loading text
    super.preload();
    
    // Load any test assets here
  }
  
  /**
   * Create the scene elements
   */
  create(): void {
    console.log('Creating TestScene');
    
    // Add a background color
    this.cameras.main.setBackgroundColor('#333333');
    
    // Add a title
    const titleText = this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2 - 100,
      'Test Scene',
      {
        fontFamily: 'Arial',
        fontSize: '64px',
        color: '#ffffff'
      }
    );
    titleText.setOrigin(0.5, 0.5);
    
    // Add a description
    const descText = this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      'Scene Management System is working!',
      {
        fontFamily: 'Arial',
        fontSize: '32px',
        color: '#ffffff'
      }
    );
    descText.setOrigin(0.5, 0.5);
    
    // Add a button to return to the title scene
    const backButton = this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2 + 100,
      'Return to Title Scene3',
      {
        fontFamily: 'Arial',
        fontSize: '32px',
        color: '#ffffff'
      }
    );
    backButton.setOrigin(0.5, 0.5);
    backButton.setInteractive({ useHandCursor: true });
    
    // Add hover effect
    backButton.on('pointerover', () => {
      backButton.setStyle({ color: '#ff8800' });
    });
    
    backButton.on('pointerout', () => {
      backButton.setStyle({ color: '#ffffff' });
    });
    
    // Handle click event
    backButton.on('pointerdown', () => {
      this.transitionTo('TitleScene');
    });
    
    // Display game state info
    if (this.gameState) {
      const stateText = this.add.text(
        this.cameras.main.width / 2,
        this.cameras.main.height - 50,
        `Current Scene: ${this.gameState.currentScene}`,
        {
          fontFamily: 'Arial',
          fontSize: '16px',
          color: '#ffffff'
        }
      );
      stateText.setOrigin(0.5, 0.5);
    }
  }
}

// Register the scene with the registry
sceneRegistry.register('TestScene', TestScene); 