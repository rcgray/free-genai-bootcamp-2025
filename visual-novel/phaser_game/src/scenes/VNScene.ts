/**
 * VNScene.ts
 * Main Visual Novel scene for the Japanese Language Learning game.
 * This scene handles displaying backgrounds, characters, dialog, and choices.
 * Based on the game design in docs/Game-Design.md
 */

import BaseScene from './BaseScene';
import sceneRegistry from './SceneRegistry';

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
  
  // Character display
  private characterSprites: Record<string, Phaser.GameObjects.Sprite> = {};
  
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
  }
  
  /**
   * Preload assets for the scene
   */
  preload(): void {
    // Call the parent preload method to display loading text
    super.preload();
    
    // Load background images for the train station location
    this.load.image('train_platform', 'assets/images/backgrounds/train_platform.png');
    
    // Load character sprites for Kaori
    this.load.image('kaori_default', 'assets/images/characters/kaori/default.png');
    
    // Check if we're in the embedded mode (Streamlit) with assets provided
    const win = window as any;
    if (win.GAME_ASSETS) {
      // Use embedded assets if available
      if (win.GAME_ASSETS['train_platform']) {
        this.load.image('train_platform', win.GAME_ASSETS['train_platform']);
      }
      if (win.GAME_ASSETS['kaori_default']) {
        this.load.image('kaori_default', win.GAME_ASSETS['kaori_default']);
      }
    }
  }
  
  /**
   * Create the scene elements
   */
  create(): void {
    console.log('Creating VNScene');
    
    // Set up the background (lowest layer)
    this.createBackground();
    
    // Display Kaori character (middle layer)
    this.displayCharacter('kaori', 'kaori_default', 'center');
    
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
    }
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
   */
  private displayCharacter(id: string, spriteKey: string, position: 'left' | 'center' | 'right'): void {
    // Remove existing character sprite if it exists
    if (this.characterSprites[id]) {
      this.characterSprites[id].destroy();
    }
    
    // Calculate x position based on position parameter
    let x: number;
    switch (position) {
      case 'left':
        x = this.cameras.main.width * 0.25;
        break;
      case 'right':
        x = this.cameras.main.width * 0.75;
        break;
      case 'center':
      default:
        x = this.cameras.main.width * 0.5;
        break;
    }
    
    // Create the character sprite
    const y = this.cameras.main.height * 0.5;
    const sprite = this.add.sprite(x, y, spriteKey);
    
    // Scale the sprite to a reasonable size
    const scale = this.cameras.main.height * 0.7 / sprite.height;
    sprite.setScale(scale);
    
    // Set the character depth to be above background but below UI
    sprite.setDepth(this.DEPTH_CHARACTER);
    
    // Store the sprite reference
    this.characterSprites[id] = sprite;
    
    // Add entrance animation
    sprite.setAlpha(0);
    this.tweens.add({
      targets: sprite,
      alpha: 1,
      y: y - 20,
      duration: 500,
      ease: 'Power2'
    });
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
      
      // Add to container and button array
      if (this.choiceContainer) {
        this.choiceContainer.add(button);
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
   * Override serializeState to include VNScene-specific state
   */
  serializeState(): any {
    // Get base state from parent
    const baseState = super.serializeState();
    
    // Add scene-specific state
    return {
      ...baseState,
      currentDialog: this.currentDialog,
      currentSpeaker: this.currentSpeaker,
      isDialogComplete: this.isDialogComplete,
      displayedTextLength: this.displayedTextLength,
      currentLocation: this.currentLocation,
      characters: Object.keys(this.characterSprites).map(id => {
        const sprite = this.characterSprites[id];
        if (!sprite) return null;
        
        return {
          id,
          spriteKey: sprite.texture.key,
          x: sprite.x,
          y: sprite.y,
          alpha: sprite.alpha,
          scale: sprite.scale
        };
      }).filter(Boolean)
    };
  }
  
  /**
   * Override deserializeState to restore VNScene-specific state
   */
  deserializeState(state: any): void {
    // Apply base state
    super.deserializeState(state);
    
    // Restore scene-specific state
    if (state.currentDialog) {
      this.currentDialog = state.currentDialog;
    }
    
    if (state.currentSpeaker) {
      this.currentSpeaker = state.currentSpeaker;
    }
    
    if (state.isDialogComplete !== undefined) {
      this.isDialogComplete = state.isDialogComplete;
    }
    
    if (state.displayedTextLength !== undefined) {
      this.displayedTextLength = state.displayedTextLength;
    }
    
    if (state.currentLocation) {
      this.currentLocation = state.currentLocation;
    }
    
    // Note: Character sprites will be recreated in create(),
    // but we could use this state to modify their appearance or behavior
    console.log('VNScene state restored');
  }
}

// Register the scene with the registry
sceneRegistry.register('VNScene', VNScene); 