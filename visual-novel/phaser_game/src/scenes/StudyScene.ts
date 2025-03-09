/**
 * StudyScene.ts
 * Study scene for the Japanese Language Learning Visual Novel game.
 * This scene allows players to study Japanese phrases encountered during gameplay.
 */

import BaseScene from './BaseScene';
import sceneRegistry from './SceneRegistry';

export interface StudyPhraseData {
  phrase: string;         // Japanese phrase
  furigana: string;       // Furigana reading
  translation: string;    // English translation
  context?: string;       // Optional contextual information
  source?: string;        // Source of the phrase (character, dialogue, etc.)
}

export default class StudyScene extends BaseScene {
  // Phrase data
  private phrase: string = '';
  private furigana: string = '';
  private translation: string = '';
  private context: string = '';
  private source: string = '';
  
  // UI Components
  private overlay?: Phaser.GameObjects.Rectangle;
  private contentPanel?: Phaser.GameObjects.Rectangle;
  private backButton?: Phaser.GameObjects.Text;
  private phraseText?: Phaser.GameObjects.Text;
  private furiganaText?: Phaser.GameObjects.Text;
  private translationText?: Phaser.GameObjects.Text;
  
  /**
   * Constructor for the StudyScene class
   */
  constructor() {
    super({ key: 'StudyScene' });
  }
  
  /**
   * Initialize scene with data passed from VN Scene
   * @param data - Phrase data to study
   */
  init(data: StudyPhraseData): void {
    // Extract phrase data from passed parameters
    this.phrase = data.phrase || '';
    this.furigana = data.furigana || '';
    this.translation = data.translation || '';
    this.context = data.context || '';
    this.source = data.source || '';
    
    console.log('StudyScene initialized with phrase:', this.phrase);
  }
  
  /**
   * Preload assets for the scene
   */
  preload(): void {
    // No specific assets to preload for now
    super.preload();
  }
  
  /**
   * Create the scene elements
   */
  create(): void {
    console.log('Creating StudyScene');
    
    // Create the background overlay and content panel
    this.createBackground();
    
    // Create the phrase display
    this.createPhraseDisplay();
    
    // Create the translation display
    this.createTranslationDisplay();
    
    // Create the back button
    this.createBackButton();
    
    // Add any placeholder content for future LLM data
    this.createPlaceholderContent();
  }
  
  /**
   * Create the background overlay and content panel
   */
  private createBackground(): void {
    // Semi-transparent overlay covering the entire screen
    this.overlay = this.add.rectangle(
      0, 0,
      this.cameras.main.width,
      this.cameras.main.height,
      0x000000
    );
    this.overlay.setOrigin(0, 0);
    this.overlay.setAlpha(0.8);
    
    // Content panel in the center
    this.contentPanel = this.add.rectangle(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      this.cameras.main.width * 0.8,
      this.cameras.main.height * 0.8,
      0x333333
    );
    this.contentPanel.setStrokeStyle(2, 0xffffff);
  }
  
  /**
   * Create the phrase display (Japanese text with furigana)
   */
  private createPhraseDisplay(): void {
    // For now, we'll use simple text objects
    // Later, we'll replace this with our custom JapaneseText utility
    
    // Main Japanese phrase
    this.phraseText = this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height * 0.25,
      this.phrase,
      {
        fontFamily: 'Arial',
        fontSize: '36px',
        color: '#ffffff',
        align: 'center'
      }
    );
    this.phraseText.setOrigin(0.5, 0.5);
    
    // Furigana (reading) above the phrase
    this.furiganaText = this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height * 0.25 - 30,
      this.furigana,
      {
        fontFamily: 'Arial',
        fontSize: '18px',
        color: '#aaaaff',
        align: 'center'
      }
    );
    this.furiganaText.setOrigin(0.5, 0.5);
  }
  
  /**
   * Create the translation display
   */
  private createTranslationDisplay(): void {
    // English translation
    this.translationText = this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height * 0.35,
      this.translation,
      {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: '#ffffff',
        align: 'center',
        wordWrap: { width: this.cameras.main.width * 0.7 }
      }
    );
    this.translationText.setOrigin(0.5, 0);
  }
  
  /**
   * Create the back button to return to the VN Scene
   */
  private createBackButton(): void {
    this.backButton = this.add.text(
      20, 20,
      'Back to Game',
      {
        fontFamily: 'Arial',
        fontSize: '18px',
        color: '#ffffff',
        backgroundColor: '#5a1e1e',
        padding: { left: 10, right: 10, top: 5, bottom: 5 }
      }
    );
    
    this.backButton.setInteractive({ useHandCursor: true });
    
    // Add hover effect
    this.backButton.on('pointerover', () => {
      this.backButton?.setStyle({ color: '#ffff00' });
    });
    
    this.backButton.on('pointerout', () => {
      this.backButton?.setStyle({ color: '#ffffff' });
    });
    
    // Handle click event
    this.backButton.on('pointerdown', () => {
      this.returnToVNScene();
    });
  }
  
  /**
   * Create placeholder content for future LLM data
   */
  private createPlaceholderContent(): void {
    // Simple placeholder text for now
    // This will be replaced with tabbed content in the enhanced implementation
    const placeholderText = this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height * 0.5,
      'Additional phrase details will appear here in the future.',
      {
        fontFamily: 'Arial',
        fontSize: '18px',
        color: '#aaaaaa',
        align: 'center',
        wordWrap: { width: this.cameras.main.width * 0.7 }
      }
    );
    placeholderText.setOrigin(0.5, 0);
  }
  
  /**
   * Return to the VN Scene
   */
  private returnToVNScene(): void {
    console.log('Returning to VN Scene');
    
    // Stop this scene and resume the VN Scene
    this.scene.stop();
    this.scene.resume('VNScene');
  }
  
  /**
   * Override serializeState to throw an error since StudyScene should never be serialized
   * StudyScene is designed as ephemeral and its state should never be preserved
   */
  serializeState(): any {
    throw new Error('StudyScene.serializeState() should never be called - StudyScene is ephemeral');
  }
  
  /**
   * Override deserializeState to throw an error since StudyScene should never be restored
   * StudyScene is designed as ephemeral and should be recreated fresh each time
   */
  deserializeState(state: any): void {
    throw new Error('StudyScene.deserializeState() should never be called - StudyScene is ephemeral');
  }
}

// Register the scene with the registry
sceneRegistry.register('StudyScene', StudyScene); 