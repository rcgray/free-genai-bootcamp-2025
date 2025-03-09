/**
 * TestScene.ts
 * A test scene to demonstrate character system functionality.
 * Provides UI controls for showing characters, changing positions, and changing emotions.
 */

import BaseScene from './BaseScene';
import sceneRegistry from './SceneRegistry';
import { CharacterManager } from '../utils/CharacterManager';
import { CharacterPosition } from '../utils/Character';

export default class TestScene extends BaseScene {
  // Character management
  private characterManager: CharacterManager;
  
  // UI elements
  private controls!: Phaser.GameObjects.Container;
  private background?: Phaser.GameObjects.Image;
  private titleButton?: Phaser.GameObjects.Text;
  
  // Current background
  private currentBackground: string = 'train_platform';
  private backgrounds: string[] = [
    'train_platform',
    'inside_train',
    'outside_restaurant',
    'inside_restaurant',
    'park_lawn',
    'park_bench',
    'outside_mall',
    'clothing_store',
    'hotel_lobby'
  ];
  
  // Character positions for UI
  private positions: CharacterPosition[] = ['left', 'center', 'right', 'offscreen'];
  
  // Character emotions map
  private emotionsMap: Record<string, string[]> = {
    kaori: ['default', 'worried', 'surprised', 'thinking'],
    takashi: ['default'],
    shopkeeper: ['default']
  };
  
  /**
   * Constructor for the TestScene class
   */
  constructor() {
    super({ key: 'TestScene' });
    
    // Initialize the character manager
    this.characterManager = new CharacterManager();
  }
  
  /**
   * Preload assets for the scene
   */
  preload(): void {
    // Call the parent preload method to display loading text
    super.preload();
    
    // Load all background images
    this.backgrounds.forEach(bg => {
      this.load.image(bg, `assets/images/backgrounds/${bg}.png`);
    });
    
    // Load all character images
    // Kaori
    this.load.image('kaori_default', 'assets/images/characters/kaori/default.png');
    this.load.image('kaori_worried', 'assets/images/characters/kaori/worried.png');
    this.load.image('kaori_surprised', 'assets/images/characters/kaori/surprised.png');
    this.load.image('kaori_thinking', 'assets/images/characters/kaori/thinking.png');
    
    // Takashi
    this.load.image('takashi_default', 'assets/images/characters/takashi/default.png');
    
    // Shopkeeper
    this.load.image('shopkeeper_default', 'assets/images/characters/shopkeeper/default.png');
  }
  
  /**
   * Create the scene elements
   */
  create(): void {
    console.log('Creating TestScene');
    
    // Create the background
    this.createBackground();
    
    // Set the character manager's scene reference
    this.characterManager.setScene(this);
    
    // Create UI controls
    this.createControls();
    
    // Create title button to return to title screen
    this.createTitleButton();
  }
  
  /**
   * Create the background image
   */
  private createBackground(): void {
    // Create the background image
    this.background = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      this.currentBackground
    );
    
    // Scale the background to fit the screen if needed
    this.background.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
    
    // Place at the bottom layer
    this.background.setDepth(0);
  }
  
  /**
   * Create UI controls for interacting with characters
   */
  private createControls(): void {
    // Create container for controls - moved down by 50 pixels
    this.controls = this.add.container(this.cameras.main.width - 200, 200); // Changed from 150 to 200
    this.controls.setDepth(100);
    
    // Add semi-transparent background - moved down by additional 70 pixels
    const bg = this.add.rectangle(0, 70, 380, 600, 0x000000, 0.7); // Added 70 to y-position
    bg.setOrigin(0.5);
    this.controls.add(bg);
    
    // Add title - adjusted for background shift
    const title = this.add.text(0, -260 + 70, 'Character Test Controls', { // Added 70 to y-position
      fontFamily: 'Arial',
      fontSize: '20px',
      color: '#ffffff',
      backgroundColor: '#333333',
      padding: { left: 10, right: 10, top: 5, bottom: 5 }
    });
    title.setOrigin(0.5);
    this.controls.add(title);
    
    // Add background selector - adjusted for background shift
    this.addBackgroundSelector(70); // Pass 70 as offset
    
    // Add character controls for each character
    let yOffset = -180;
    const characterIds = Object.keys(this.emotionsMap);
    
    characterIds.forEach(id => {
      this.addCharacterControls(id, yOffset);
      yOffset += 180;
    });
  }
  
  /**
   * Add background selector to controls
   * @param yOffset - Additional vertical offset to apply
   */
  private addBackgroundSelector(yOffset: number = 0): void {
    const label = this.add.text(0, -220 + yOffset, 'Back ground:', {
      fontFamily: 'Arial',
      fontSize: '16px',
      color: '#ffffff'
    });
    label.setOrigin(0.5);
    this.controls.add(label);
    
    // Add buttons for each background
    const bgButton = this.add.text(0, -190 + yOffset, this.currentBackground, {
      fontFamily: 'Arial',
      fontSize: '14px',
      color: '#ffffff',
      backgroundColor: '#555555',
      padding: { left: 10, right: 10, top: 5, bottom: 5 }
    });
    bgButton.setOrigin(0.5);
    bgButton.setInteractive({ cursor: 'pointer' });
    
    bgButton.on('pointerdown', () => {
      // Cycle to next background
      const currentIndex = this.backgrounds.indexOf(this.currentBackground);
      const nextIndex = (currentIndex + 1) % this.backgrounds.length;
      this.currentBackground = this.backgrounds[nextIndex];
      
      // Update background
      if (this.background) {
        this.background.setTexture(this.currentBackground);
      }
      
      // Update button text
      bgButton.setText(this.currentBackground);
    });
    
    this.controls.add(bgButton);
  }
  
  /**
   * Add controls for a specific character
   * @param id - Character ID
   * @param yOffset - Vertical offset for positioning controls
   */
  private addCharacterControls(id: string, yOffset: number): void {
    // Add the background offset to the yOffset
    yOffset += 70; // Add the background offset

    // Character name header
    const nameLabel = this.add.text(0, yOffset, id.charAt(0).toUpperCase() + id.slice(1), {
      fontFamily: 'Arial',
      fontSize: '18px',
      color: '#ffffff',
      backgroundColor: '#0055aa',
      padding: { left: 10, right: 10, top: 3, bottom: 3 }
    });
    nameLabel.setOrigin(0.5);
    this.controls.add(nameLabel);
    
    // Position controls
    const posLabel = this.add.text(-150, yOffset + 30, 'Position:', {
      fontFamily: 'Arial',
      fontSize: '14px',
      color: '#ffffff'
    });
    posLabel.setOrigin(0, 0.5);
    this.controls.add(posLabel);
    
    // Add position buttons
    this.positions.forEach((pos, index) => {
      const posButton = this.add.text(-70 + index * 70, yOffset + 30, pos, {
        fontFamily: 'Arial',
        fontSize: '12px',
        color: '#ffffff',
        backgroundColor: '#555555',
        padding: { left: 5, right: 5, top: 3, bottom: 3 }
      });
      posButton.setOrigin(0.5);
      posButton.setInteractive({ cursor: 'pointer' });
      
      posButton.on('pointerdown', () => {
        // Set character position, works even if character is hidden
        this.characterManager.setPosition(id, pos);
        
        // If character is currently visible, also update its display
        if (this.characterManager.getActiveCharacterIds().includes(id)) {
          // First hide and then show to properly update
          this.characterManager.hide(id, false);
          this.characterManager.show(id);
        }
      });
      
      this.controls.add(posButton);
    });
    
    // Emotion controls
    const emoLabel = this.add.text(-150, yOffset + 60, 'Emotion:', {
      fontFamily: 'Arial',
      fontSize: '14px',
      color: '#ffffff'
    });
    emoLabel.setOrigin(0, 0.5);
    this.controls.add(emoLabel);
    
    // Add emotion buttons
    const emotions = this.emotionsMap[id] || ['default'];
    emotions.forEach((emotion, index) => {
      const row = Math.floor(index / 2);
      const col = index % 2;
      
      const emoButton = this.add.text(-70 + col * 140, yOffset + 60 + row * 30, emotion, {
        fontFamily: 'Arial',
        fontSize: '12px',
        color: '#ffffff',
        backgroundColor: '#555555',
        padding: { left: 5, right: 5, top: 3, bottom: 3 }
      });
      emoButton.setOrigin(0.5);
      emoButton.setInteractive({ cursor: 'pointer' });
      
      emoButton.on('pointerdown', () => {
        this.characterManager.setEmotion(id, emotion);
      });
      
      this.controls.add(emoButton);
    });
    
    // Show/Hide button
    const showHideBtn = this.add.text(0, yOffset + 130, 'Show', {
      fontFamily: 'Arial',
      fontSize: '16px',
      color: '#ffffff',
      backgroundColor: '#00aa00',
      padding: { left: 10, right: 10, top: 5, bottom: 5 }
    });
    showHideBtn.setOrigin(0.5);
    showHideBtn.setInteractive({ cursor: 'pointer' });
    
    let isShown = false;
    
    showHideBtn.on('pointerdown', () => {
      if (isShown) {
        // Hide character
        this.characterManager.hide(id);
        showHideBtn.setText('Show');
        showHideBtn.setBackgroundColor('#00aa00');
        isShown = false;
      } else {
        // Show character without specifying position - will use last position
        this.characterManager.show(id);
        showHideBtn.setText('Hide');
        showHideBtn.setBackgroundColor('#aa0000');
        isShown = true;
      }
    });
    
    this.controls.add(showHideBtn);
  }
  
  /**
   * Create button to return to title screen
   */
  private createTitleButton(): void {
    // Create the title button
    this.titleButton = this.add.text(
      20,
      20,
      'Back to Title',
      {
        fontFamily: 'Arial',
        fontSize: '16px',
        color: '#ffffff',
        backgroundColor: '#000000',
        padding: { left: 10, right: 10, top: 5, bottom: 5 }
      }
    );
    
    // Make the button interactive
    this.titleButton.setInteractive({ cursor: 'pointer' });
    
    // Set up the click handler
    this.titleButton.on('pointerdown', () => {
      this.transitionTo('TitleScene');
    });
    
    // Add to a high depth to ensure it's visible
    this.titleButton.setDepth(100);
  }
  
  /**
   * Serialize scene state for hot module replacement and save/load functionality
   */
  serializeState(): any {
    const state = super.serializeState();
    
    // Add character manager state
    state.characterState = this.characterManager.serialize();
    
    // Add test scene specific state
    return {
      ...state,
      currentBackground: this.currentBackground
    };
  }
  
  /**
   * Deserialize and apply previously serialized state
   */
  deserializeState(state: any): void {
    super.deserializeState(state);
    
    // Restore test scene specific state
    if (state) {
      this.currentBackground = state.currentBackground || 'train_platform';
      
      // Restore character manager state
      if (state.characterState) {
        this.characterManager.deserialize(state.characterState);
      }
      
      // Update background
      if (this.background) {
        this.background.setTexture(this.currentBackground);
      }
    }
  }
}

// Register the scene with the registry
sceneRegistry.register('TestScene', TestScene); 