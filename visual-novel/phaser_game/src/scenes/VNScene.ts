/**
 * VNScene.ts
 * Main Visual Novel scene for the Japanese Language Learning game.
 * This scene handles displaying backgrounds, characters, dialog, and choices.
 * Based on the game design in docs/Game-Design.md
 */

import BaseScene from './BaseScene';
import sceneRegistry from './SceneRegistry';
import { StudyPhraseData } from './StudyScene';
import { CharacterManager } from '../utils/CharacterManager';
import { CharacterPosition } from '../utils/Character';

export default class VNScene extends BaseScene {
  // UI Components
  private background?: Phaser.GameObjects.Image;
  private dialogBox?: Phaser.GameObjects.Rectangle;
  private dialogText?: Phaser.GameObjects.Text;
  private nameBox?: Phaser.GameObjects.Rectangle;
  private nameText?: Phaser.GameObjects.Text;
  private nextIndicator?: Phaser.GameObjects.Text;
  private choiceContainer?: Phaser.GameObjects.Container;
  private choiceButtons: Phaser.GameObjects.Text[] = [];
  private titleButton?: Phaser.GameObjects.Text;
  private studyButton?: Phaser.GameObjects.Text;
  
  // Character management
  private characterManager: CharacterManager;
  
  // Dialog state
  private currentDialog: string = '';
  private currentSpeaker: string = '';
  private isDialogComplete: boolean = false;
  private dialogSpeed: number = 50; // ms per character
  private dialogTimer?: Phaser.Time.TimerEvent;
  private displayedTextLength: number = 0;
  
  // Current location
  private currentLocation: string = 'train_platform';
  
  // Z-index depths for layering
  private readonly DEPTH_BACKGROUND: number = 0;
  private readonly DEPTH_CHARACTER: number = 10;
  private readonly DEPTH_UI: number = 20;
  
  /**
   * Constructor for the VNScene class
   */
  constructor() {
    super({ key: 'VNScene' });
    
    // Initialize the character manager
    this.characterManager = new CharacterManager();
  }
  
  /**
   * Preload assets for the scene
   */
  preload(): void {
    // Call the parent preload method to display loading text
    super.preload();
    
    // Load background images for the train station location
    this.load.image('train_platform', 'assets/images/backgrounds/train_platform.png');
    this.load.image('inside_train', 'assets/images/backgrounds/inside_train.png');
    this.load.image('outside_restaurant', 'assets/images/backgrounds/outside_restaurant.png');
    this.load.image('inside_restaurant', 'assets/images/backgrounds/inside_restaurant.png');
    this.load.image('park_lawn', 'assets/images/backgrounds/park_lawn.png');
    this.load.image('park_bench', 'assets/images/backgrounds/park_bench.png');
    this.load.image('outside_mall', 'assets/images/backgrounds/outside_mall.png');
    this.load.image('clothing_store', 'assets/images/backgrounds/clothing_store.png');
    this.load.image('hotel_lobby', 'assets/images/backgrounds/hotel_lobby.png');
    
    // Load character images
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
    console.log('Creating VNScene');
    
    // Set up the background (lowest layer)
    this.createBackground();
    
    // Set the character manager's scene reference
    this.characterManager.setScene(this);
    
    // Display Kaori character (middle layer)
    this.characterManager.show('kaori', 'center');
    
    // Set up the UI elements (highest layer)
    this.createDialogBox();
    this.createNameBox();
    this.createNextIndicator();
    this.createChoiceContainer();
    this.createTitleButton();
    
    // Set up input handling
    this.setupInputHandlers();
    
    // Display initial dialog from the Game Design document
    this.displayDialog('こんにちは！久しぶり！元気？ (Konnichiwa! Hisashiburi! Genki?)', 'Kaori');
  }
  
  /**
   * Create the background for the scene
   */
  private createBackground(): void {
    // Default background color
    this.cameras.main.setBackgroundColor('#4a6fa5');
    
    try {
      // Try to load the train platform background
      if (this.textures.exists('train_platform')) {
        this.background = this.add.image(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2,
          'train_platform'
        );
        
        // Scale the background to fit the screen
        this.background.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
        // Set background depth to be the lowest
        this.background.setDepth(this.DEPTH_BACKGROUND);
        console.log('Background image added successfully');
      } else {
        console.log('Background image not found, using color background');
      }
    } catch (error) {
      console.error('Error adding background:', error);
    }
  }
  
  /**
   * Create the dialog box at the bottom of the screen
   */
  private createDialogBox(): void {
    const width = this.cameras.main.width * 0.9;
    const height = this.cameras.main.height * 0.25;
    const x = this.cameras.main.width / 2;
    const y = this.cameras.main.height - height / 2 - 20;
    
    // Create the dialog box background
    this.dialogBox = this.add.rectangle(x, y, width, height, 0x000000);
    this.dialogBox.setAlpha(0.7);
    this.dialogBox.setStrokeStyle(2, 0xffffff);
    this.dialogBox.setInteractive();
    this.dialogBox.setDepth(this.DEPTH_UI);
    
    // Create the dialog text
    this.dialogText = this.add.text(
      x - width / 2 + 20,
      y - height / 2 + 20,
      '',
      {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: '#ffffff',
        wordWrap: { width: width - 40 }
      }
    );
    this.dialogText.setDepth(this.DEPTH_UI);
  }
  
  /**
   * Create the name box for the speaking character
   */
  private createNameBox(): void {
    const width = 200;
    const height = 40;
    const x = this.cameras.main.width * 0.05 + width / 2;
    const y = this.cameras.main.height - this.cameras.main.height * 0.25 - 40;
    
    // Create the name box background
    this.nameBox = this.add.rectangle(x, y, width, height, 0x5a5a5a);
    this.nameBox.setAlpha(0.9);
    this.nameBox.setStrokeStyle(2, 0xffffff);
    this.nameBox.setDepth(this.DEPTH_UI);
    
    // Create the name text
    this.nameText = this.add.text(
      x,
      y,
      '',
      {
        fontFamily: 'Arial',
        fontSize: '20px',
        color: '#ffffff'
      }
    );
    this.nameText.setOrigin(0.5, 0.5);
    this.nameText.setDepth(this.DEPTH_UI);
  }
  
  /**
   * Create the next indicator to show there's more dialog
   */
  private createNextIndicator(): void {
    if (!this.dialogBox) return;
    
    const x = this.dialogBox.x + this.dialogBox.width / 2 - 30;
    const y = this.dialogBox.y + this.dialogBox.height / 2 - 30;
    
    this.nextIndicator = this.add.text(
      x,
      y,
      '▼',
      {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: '#ffffff'
      }
    );
    this.nextIndicator.setOrigin(0.5, 0.5);
    this.nextIndicator.setAlpha(0);
    this.nextIndicator.setDepth(this.DEPTH_UI);
    
    // Add a pulsing animation
    this.tweens.add({
      targets: this.nextIndicator,
      alpha: 1,
      duration: 500,
      ease: 'Power2',
      yoyo: true,
      repeat: -1
    });
  }
  
  /**
   * Create the container for choice buttons
   */
  private createChoiceContainer(): void {
    this.choiceContainer = this.add.container(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2
    );
    this.choiceContainer.setAlpha(0); // Hide initially
    this.choiceContainer.setDepth(this.DEPTH_UI);
  }
  
  /**
   * Create a button to return to the title screen
   */
  private createTitleButton(): void {
    // Position in the top left corner
    const x = 20;
    const y = 20;
    
    this.titleButton = this.add.text(
      x,
      y,
      'Title Screen',
      {
        fontFamily: 'Arial',
        fontSize: '18px',
        color: '#ffffff',
        backgroundColor: '#5a1e1e',
        padding: { left: 10, right: 10, top: 5, bottom: 5 }
      }
    );
    this.titleButton.setOrigin(0, 0); // Align to top left
    this.titleButton.setInteractive({ useHandCursor: true });
    this.titleButton.setDepth(this.DEPTH_UI);
    
    // Add hover effect
    this.titleButton.on('pointerover', () => {
      this.titleButton?.setStyle({ color: '#ffff00' });
    });
    
    this.titleButton.on('pointerout', () => {
      this.titleButton?.setStyle({ color: '#ffffff' });
    });
    
    // Handle click event
    this.titleButton.on('pointerdown', () => {
      console.log('Title button clicked');
      this.transitionTo('TitleScene');
    });
  }
  
  /**
   * Set up input handlers for advancing dialog and making choices
   */
  private setupInputHandlers(): void {
    // Click/tap to advance dialog
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      // Ignore if clicking on a choice button or title button
      if (this.isClickingInteractive(pointer)) {
        return;
      }
      
      if (this.isDialogComplete) {
        // If dialog is complete, advance to next dialog
        this.advanceDialog();
      } else {
        // If dialog is still typing, complete it immediately
        this.completeDialog();
      }
    });
    
    // Keyboard input for advancing dialog
    this.input.keyboard?.on('keydown-SPACE', () => {
      if (this.isDialogComplete) {
        this.advanceDialog();
      } else {
        this.completeDialog();
      }
    });
  }
  
  /**
   * Check if the pointer is clicking on an interactive element
   */
  private isClickingInteractive(pointer: Phaser.Input.Pointer): boolean {
    const targets = this.input.hitTestPointer(pointer);
    return targets.some(target => 
      (target === this.titleButton) || 
      (target === this.studyButton) ||
      this.choiceButtons.includes(target as Phaser.GameObjects.Text)
    );
  }
  
  /**
   * Display dialog text with a typewriter effect
   */
  private displayDialog(text: string, speaker: string): void {
    if (!this.dialogText || !this.nameText) return;
    
    // Stop any existing dialog timer
    if (this.dialogTimer) {
      this.dialogTimer.remove();
    }
    
    // Remove any existing study button
    if (this.studyButton) {
      this.studyButton.destroy();
      this.studyButton = undefined;
    }
    
    // Set the current dialog and speaker
    this.currentDialog = text;
    this.currentSpeaker = speaker;
    this.isDialogComplete = false;
    this.displayedTextLength = 0;
    
    // Set the speaker name
    this.nameText.setText(speaker);
    
    // Show/hide the name box based on whether there's a speaker
    if (this.nameBox) {
      this.nameBox.setAlpha(speaker ? 0.9 : 0);
    }
    
    // Clear the dialog text
    this.dialogText.setText('');
    
    // Hide the next indicator
    if (this.nextIndicator) {
      this.nextIndicator.setAlpha(0);
    }
    
    // Start the typewriter effect
    this.dialogTimer = this.time.addEvent({
      delay: this.dialogSpeed,
      callback: this.updateDialogText,
      callbackScope: this,
      repeat: text.length - 1
    });
  }
  
  /**
   * Update the dialog text for the typewriter effect
   */
  private updateDialogText(): void {
    if (!this.dialogText) return;
    
    this.displayedTextLength++;
    this.dialogText.setText(this.currentDialog.substring(0, this.displayedTextLength));
    
    // Check if dialog is complete
    if (this.displayedTextLength >= this.currentDialog.length) {
      this.isDialogComplete = true;
      
      // Show the next indicator
      if (this.nextIndicator) {
        this.nextIndicator.setAlpha(1);
      }
      
      // Add the study button
      this.addStudyButton();
    }
  }
  
  /**
   * Add a study button next to the dialog
   */
  private addStudyButton(): void {
    if (!this.dialogBox || !this.dialogText) return;
    
    // Only add study button if we have actual dialog
    if (this.currentDialog.trim() === '') return;
    
    // Get the current dialog text
    const dialogText = this.currentDialog;
    
    // Extract furigana and translation (example: extract from format "Japanese (Romaji) [Translation]")
    const furigana = this.extractFurigana(dialogText);
    const translation = this.extractTranslation(dialogText);
    
    // Create the study button
    this.studyButton = this.add.text(
      this.dialogBox.x + this.dialogBox.width / 2 - 80,
      this.dialogBox.y - this.dialogBox.height / 2 - 10,
      '📝', // Study emoji
      { 
        fontSize: '32px'
      }
    );
    
    this.studyButton.setOrigin(0.5, 0.5);
    this.studyButton.setInteractive({ useHandCursor: true });
    this.studyButton.setDepth(this.DEPTH_UI);
    
    // Add hover effect
    this.studyButton.on('pointerover', () => {
      this.studyButton?.setScale(1.2);
    });
    
    this.studyButton.on('pointerout', () => {
      this.studyButton?.setScale(1.0);
    });
    
    // Handle click event
    this.studyButton.on('pointerdown', () => {
      console.log('Study button clicked');
      
      // Prepare phrase data
      const phraseData: StudyPhraseData = {
        phrase: this.extractJapaneseText(dialogText),
        furigana: furigana,
        translation: translation,
        context: `Currently at ${this.currentLocation}, spoken by ${this.currentSpeaker}`,
        source: this.currentSpeaker
      };
      
      // Launch the study scene
      this.openStudyScene(phraseData);
    });
  }
  
  /**
   * Extract Japanese text from the dialog
   * Assumes format: "Japanese (Romaji) [Translation]"
   */
  private extractJapaneseText(text: string): string {
    // For now, a simple extraction - take everything before the first '('
    const match = text.match(/^([^(]+)/);
    return match ? match[1].trim() : text;
  }
  
  /**
   * Extract furigana (romaji) from the dialog
   * Assumes format: "Japanese (Romaji) [Translation]"
   */
  private extractFurigana(text: string): string {
    // Extract text between the first pair of parentheses
    const match = text.match(/\(([^)]+)\)/);
    return match ? match[1].trim() : '';
  }
  
  /**
   * Extract translation from the dialog
   * Assumes format: "Japanese (Romaji) [Translation]"
   */
  private extractTranslation(text: string): string {
    // Extract text between the first pair of square brackets
    const match = text.match(/\[([^\]]+)\]/);
    return match ? match[1].trim() : '';
  }
  
  /**
   * Open the Study Scene with the given phrase data
   */
  private openStudyScene(phraseData: StudyPhraseData): void {
    console.log('Opening Study Scene with phrase:', phraseData.phrase);
    
    // Launch the study scene as an overlay
    this.scene.launch('StudyScene', phraseData);
    
    // Pause this scene (but keep it visible in the background)
    this.scene.pause();
    
    console.log('VNScene paused, StudyScene launched');
  }
  
  /**
   * Complete the current dialog immediately
   */
  private completeDialog(): void {
    if (!this.dialogText || this.isDialogComplete) return;
    
    // Stop the dialog timer
    if (this.dialogTimer) {
      this.dialogTimer.remove();
    }
    
    // Display the full text
    this.dialogText.setText(this.currentDialog);
    this.isDialogComplete = true;
    
    // Show the next indicator
    if (this.nextIndicator) {
      this.nextIndicator.setAlpha(1);
    }
    
    // Add the study button
    this.addStudyButton();
  }
  
  /**
   * Advance to the next dialog or show choices
   */
  private advanceDialog(): void {
    // Show choices from the Game Design document
    this.showChoices([
      'こんにちは！元気です！(Konnichiwa! Genki desu!) [Hello! I\'m good!]',
      'やあ、カオリ！会えて嬉しいよ！(Yaa, Kaori! Aete ureshii yo!) [Hey, Kaori! Happy to see you!]',
      '疲れたよ。長いフライトだった。(Tsukareta yo. Nagai furaito datta.) [I\'m tired. It was a long flight.]'
    ]);
  }
  
  /**
   * Display character sprite on screen
   * @deprecated Use characterManager.show() instead
   */
  private displayCharacter(_id: string, spriteKey: string, position: 'left' | 'center' | 'right'): void {
    console.warn('displayCharacter is deprecated, use characterManager.show() instead');
    
    // Convert old position format to CharacterPosition type
    const characterPosition = position as CharacterPosition;
    
    // Extract emotion from spriteKey (e.g., kaori_default -> default)
    const parts = spriteKey.split('_');
    const characterId = parts[0];
    const emotion = parts.length > 1 ? parts[1] : 'default';
    
    // Use the character manager to show the character
    this.characterManager.show(characterId, characterPosition, emotion);
  }
  
  /**
   * Show choice buttons
   */
  private showChoices(choices: string[]): void {
    if (!this.choiceContainer) return;
    
    // Clear existing choices
    this.choiceButtons.forEach(button => button.destroy());
    this.choiceButtons = [];
    
    // Hide the dialog box and next indicator
    if (this.dialogBox) this.dialogBox.setAlpha(0);
    if (this.dialogText) this.dialogText.setAlpha(0);
    if (this.nameBox) this.nameBox.setAlpha(0);
    if (this.nameText) this.nameText.setAlpha(0);
    if (this.nextIndicator) this.nextIndicator.setAlpha(0);
    if (this.studyButton) this.studyButton.setAlpha(0);
    
    // Create new choice buttons
    const buttonHeight = 50;
    const padding = 10;
    const totalHeight = choices.length * buttonHeight + (choices.length - 1) * padding;
    let yOffset = -totalHeight / 2;
    
    choices.forEach((choice, index) => {
      const button = this.add.text(
        0,
        yOffset,
        choice,
        {
          fontFamily: 'Arial',
          fontSize: '20px',
          color: '#ffffff',
          backgroundColor: '#5a5a5a',
          padding: { left: 15, right: 15, top: 8, bottom: 8 },
          wordWrap: { width: this.cameras.main.width * 0.6 }
        }
      );
      
      button.setOrigin(0.5, 0.5);
      button.setInteractive({ useHandCursor: true });
      
      // Add hover effect
      button.on('pointerover', () => {
        button.setStyle({ backgroundColor: '#7a7a7a' });
      });
      
      button.on('pointerout', () => {
        button.setStyle({ backgroundColor: '#5a5a5a' });
      });
      
      // Handle click event
      button.on('pointerdown', () => {
        this.handleChoice(index);
      });
      
      // Add study button for this choice
      const studyChoiceButton = this.addStudyButtonToChoice(button, choice);
      
      // Add to container and button array
      if (this.choiceContainer) {
        this.choiceContainer.add(button);
        if (studyChoiceButton) {
          this.choiceContainer.add(studyChoiceButton);
        }
      }
      this.choiceButtons.push(button);
      
      // Update y offset for next button
      yOffset += buttonHeight + padding;
    });
    
    // Show the choice container with animation
    this.choiceContainer.setAlpha(0);
    this.tweens.add({
      targets: this.choiceContainer,
      alpha: 1,
      duration: 300,
      ease: 'Power2'
    });
  }
  
  /**
   * Add a study button to a choice
   */
  private addStudyButtonToChoice(button: Phaser.GameObjects.Text, choiceText: string): Phaser.GameObjects.Text | undefined {
    const studyButton = this.add.text(
      button.width / 2 + 40,
      0,
      '📝', // Study emoji
      { 
        fontSize: '24px'
      }
    );
    
    studyButton.setOrigin(0.5, 0.5);
    studyButton.setInteractive({ useHandCursor: true });
    
    // Add hover effect
    studyButton.on('pointerover', () => {
      studyButton.setScale(1.2);
    });
    
    studyButton.on('pointerout', () => {
      studyButton.setScale(1.0);
    });
    
    // Handle click event
    studyButton.on('pointerdown', () => {
      console.log('Study choice button clicked');
      
      // Prepare phrase data
      const phraseData: StudyPhraseData = {
        phrase: this.extractJapaneseText(choiceText),
        furigana: this.extractFurigana(choiceText),
        translation: this.extractTranslation(choiceText),
        context: `Choice option at ${this.currentLocation}`,
        source: 'Player Option'
      };
      
      // Launch the study scene
      this.openStudyScene(phraseData);
    });
    
    return studyButton;
  }
  
  /**
   * Handle choice selection
   */
  private handleChoice(choiceIndex: number): void {
    if (!this.choiceContainer) return;
    
    console.log(`Selected choice: ${choiceIndex}`);
    
    // Hide the choice container
    this.tweens.add({
      targets: this.choiceContainer,
      alpha: 0,
      duration: 300,
      ease: 'Power2',
      onComplete: () => {
        // Clear choices
        this.choiceButtons.forEach(button => button.destroy());
        this.choiceButtons = [];
        
        // Show the dialog box again
        if (this.dialogBox) this.dialogBox.setAlpha(0.7);
        if (this.dialogText) this.dialogText.setAlpha(1);
        
        // Display new dialog based on choice
        let nextDialog = '';
        let speaker = 'Kaori';
        
        switch (choiceIndex) {
          case 0:
            nextDialog = "元気で何よりです！東京へようこそ！(Genki de nani yori desu! Tokyo e yōkoso!) [I'm glad you're well! Welcome to Tokyo!]";
            break;
          case 1:
            nextDialog = "私も会えて嬉しいよ！東京を案内するのが楽しみ！(Watashi mo aete ureshii yo! Tokyo wo annai suru no ga tanoshimi!) [I'm also happy to see you! I'm looking forward to showing you around Tokyo!]";
            break;
          case 2:
            nextDialog = "大変だったね。ホテルに行く前に何か食べる？(Taihen datta ne. Hoteru ni iku mae ni nanika taberu?) [That was tough. Want to eat something before going to the hotel?]";
            break;
          default:
            nextDialog = "さあ、東京観光を始めましょう！(Sā, Tokyo kankō wo hajimemashō!) [Now, let's start our Tokyo tour!]";
            break;
        }
        
        this.displayDialog(nextDialog, speaker);
      }
    });
  }
  
  /**
   * Serialize scene state for hot module replacement and save/load functionality
   */
  serializeState(): any {
    const state = super.serializeState();
    
    // Add character manager state
    state.characterState = this.characterManager.serialize();
    
    // Add scene-specific state
    return {
      ...state,
      currentDialog: this.currentDialog,
      currentSpeaker: this.currentSpeaker,
      isDialogComplete: this.isDialogComplete,
      displayedTextLength: this.displayedTextLength,
      currentLocation: this.currentLocation
    };
  }
  
  /**
   * Deserialize and apply previously serialized state
   */
  deserializeState(state: any): void {
    super.deserializeState(state);
    
    // Restore VN scene specific state
    if (state) {
      this.currentDialog = state.currentDialog || '';
      this.currentSpeaker = state.currentSpeaker || '';
      this.isDialogComplete = state.isDialogComplete || false;
      this.displayedTextLength = state.displayedTextLength || 0;
      this.currentLocation = state.currentLocation || 'train_platform';
      
      // Restore character manager state
      if (state.characterState) {
        this.characterManager.deserialize(state.characterState);
      }
      
      // Update UI elements to match state
      if (this.dialogText && this.currentDialog) {
        this.dialogText.setText(this.currentDialog.substring(0, this.displayedTextLength));
      }
      
      if (this.nameText && this.currentSpeaker) {
        this.nameText.setText(this.currentSpeaker);
      }
      
      // Update background
      this.setBackground(this.currentLocation);
    }
  }
  
  /**
   * Set the current background
   */
  private setBackground(locationKey: string): void {
    if (!this.background) {
      this.createBackground();
    }
    
    if (this.background) {
      this.background.setTexture(locationKey);
      this.currentLocation = locationKey;
    }
  }
}

// Register the scene with the registry
sceneRegistry.register('VNScene', VNScene); 