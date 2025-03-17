/**
 * VNScene.ts
 * Main Visual Novel scene for the Japanese Language Learning game.
 * This scene handles displaying backgrounds, characters, dialog, and choices.
 * Based on the game design in docs/Game-Design.md
 */

import BaseScene from './BaseScene';
import sceneRegistry from './SceneRegistry';
import { StudyPhraseData } from './StudyScene';
import { CharacterManager, CharacterPosition, DialogManager, Dialog, PlayerResponse, JapaneseTextWrapper } from '../utils';
import trainPlatformConversation from '../data/conversations/train_platform';

export default class VNScene extends BaseScene {
  // UI Components
  private background?: Phaser.GameObjects.Image;
  private dialogBox?: Phaser.GameObjects.Rectangle;
  private dialogText?: Phaser.GameObjects.Text;
  private romajiText?: Phaser.GameObjects.Text;
  private englishText?: Phaser.GameObjects.Text;
  private nameBox?: Phaser.GameObjects.Rectangle;
  private nameText?: Phaser.GameObjects.Text;
  private nextIndicator?: Phaser.GameObjects.Text;
  private choiceContainer?: Phaser.GameObjects.Container;
  private choiceButtons: Phaser.GameObjects.Text[] = [];
  private titleButton?: Phaser.GameObjects.Text;
  private studyButton?: Phaser.GameObjects.Text;
  private difficultyButton?: Phaser.GameObjects.Text;
  
  // Character management
  private characterManager: CharacterManager;
  
  // Dialog management
  private dialogManager: DialogManager;
  
  // Dialog state
  private currentDialog: string = '';
  private currentSpeaker: string = '';
  private isDialogComplete: boolean = false;
  private dialogSpeed: number = 30; // ms per character
  private dialogTimer?: Phaser.Time.TimerEvent;
  private displayedTextLength: number = 0;
  
  // Current location
  private currentLocation: string = 'train_platform';
  
  // Z-index depths for layering
  private readonly DEPTH_BACKGROUND: number = 0;
  private readonly DEPTH_CHARACTER: number = 10;
  private readonly DEPTH_UI: number = 100; // Increased to ensure UI is always on top
  
  // Difficulty level setting
  private difficultyLevel: 'beginner' | 'intermediate' | 'advanced' = 'beginner';
  
  // Store collections of objects that need to be tracked for cleanup
  private studyButtonContainers: Phaser.GameObjects.Container[] = [];
  
  /**
   * Constructor for the VNScene class
   */
  constructor() {
    super({ key: 'VNScene' });
    
    // Initialize the character manager
    this.characterManager = new CharacterManager();
    
    // Initialize the dialog manager
    this.dialogManager = new DialogManager();
  }
  
  /**
   * Preload assets for the scene
   */
  preload(): void {
    // Call the parent preload method to display loading text
    super.preload();
    
    // Dynamically load background images
    this.loadBackgrounds();
    
    // Dynamically load character images
    this.loadCharacters();
  }
  
  /**
   * Dynamically load all background images from the assets/images/backgrounds directory
   */
  private loadBackgrounds(): void {
    const backgroundPaths = [
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
    
    // Load each background
    backgroundPaths.forEach(bg => {
      this.load.image(bg, `assets/images/backgrounds/${bg}.png`);
    });
  }
  
  /**
   * Dynamically load all character images from the assets/images/characters directory
   */
  private loadCharacters(): void {
    // Define character expressions based on the game design
    const characterExpressions = {
      'kaori': ['default', 'worried', 'surprised', 'thinking'],
      'takashi': ['default'],
      'shopkeeper': ['default'],
      'waitress': ['default']
    };
    
    // Load each character with their expressions
    Object.entries(characterExpressions).forEach(([character, expressions]) => {
      expressions.forEach(expression => {
        const spriteKey = `${character}_${expression}`;
        const imagePath = `assets/images/characters/${character}/${expression}.png`;
        this.load.image(spriteKey, imagePath);
      });
    });
  }
  
  /**
   * Create the scene elements
   */
  create(): void {
    console.log('VNScene create() method called');
    
    // Set up core UI and interactions
    this.createBackground();
    this.createDialogBox();
    this.createNameBox();
    this.createNextIndicator();
    this.createChoiceContainer();
    this.createTitleButton();
    this.createDifficultyButton();
    this.setupInputHandlers();
    
    // Initialize character manager
    this.characterManager = new CharacterManager();
    this.characterManager.setScene(this);
    this.characterManager.setCharacterDepth(this.DEPTH_CHARACTER);
    
    // Initialize dialog manager with our dialog data
    this.dialogManager = new DialogManager();
    this.dialogManager.setScene(this);
    this.dialogManager.setCharacterManager(this.characterManager);
    this.setupDialogManagerCallbacks();
    
    // Register for scene-specific reloading
    this.registry.set('stateful_scene_' + this.scene.key, true);
    
    // Add a pink circle at (1050, 550) for debugging position
    //const debugCircle = this.add.circle(1050, 550, 10, 0xff00ff);
    //debugCircle.setAlpha(0.8);
    //debugCircle.setDepth(this.DEPTH_UI + 20); // Make sure it's on top
    
    // Start the train platform conversation
    setTimeout(() => {
      console.log('Starting initial conversation after a short delay');
      this.dialogManager.startConversation(trainPlatformConversation.id);
    }, 100); // Short delay to ensure everything is ready
    
    // Debug initial state
    console.log('[SB1] create() complete - dialog box exists:', !!this.dialogBox, 'study button exists:', !!this.studyButton);
  }
  
  /**
   * Set up callbacks for the dialog manager
   */
  private setupDialogManagerCallbacks(): void {
    this.dialogManager.setCallbacks({
      onDialogDisplay: (dialog: Dialog) => {
        console.log(`Dialog display callback triggered: ${dialog.japaneseText}`);
        
        // Format dialog text based on difficulty level
        const formattedDialog = this.formatDialogForDifficulty(dialog);
        
        // Display dialog
        if (dialog.characterId === '') {
          // Narration has no speaker
          this.displayDialog(formattedDialog, '');
        } else {
          // Character dialog
          this.displayDialog(formattedDialog, dialog.characterId);
        }
      },
      onDialogComplete: () => {
        console.log('Conversation complete');
        // Handle end of conversation - navigate to next location
        this.handleConversationComplete();
      },
      onShowChoices: (responses: PlayerResponse[]) => {
        console.log(`Show choices callback triggered: ${responses.length} choices`);
        
        // Clean up dialog-related elements BUT preserve the study button
        
        // Destroy romaji text
        if (this.romajiText) {
          this.romajiText.destroy();
          this.romajiText = undefined;
        }
        
        // Destroy English text
        if (this.englishText) {
          this.englishText.destroy();
          this.englishText = undefined;
        }
        
        // Explicitly hide the next indicator (continue button)
        if (this.nextIndicator) {
          this.nextIndicator.setAlpha(0);
        }
        
        // Note: We specifically do NOT destroy the study button here
        
        // Display the player choices
        this.showChoices(responses);
      }
    });
  }
  
  /**
   * Format dialog text based on the current difficulty level
   */
  private formatDialogForDifficulty(dialog: Dialog): Dialog {
    // Enable debug logging for longer Japanese text that might need complex wrapping
    const enableDebug = dialog.japaneseText.length > 43;
    
    // Create the wrapped Japanese text
    const wrappedJapanese = JapaneseTextWrapper.wrap(dialog.japaneseText, 43, enableDebug);
    
    // Debug log to verify the wrapping
    const originalLength = dialog.japaneseText.length;
    const wrappedLength = wrappedJapanese.length;
    const lineCount = (wrappedJapanese.match(/\n/g) || []).length + 1;
    console.log(`formatDialogForDifficulty: Original length ${originalLength}, wrapped length ${wrappedLength}, newlines ${lineCount-1}, total lines ${lineCount}`);
    
    // Return a new Dialog object with the wrapped text and metadata for positioning
    return {
      ...dialog,
      japaneseText: wrappedJapanese,
      _wrappedLineCount: lineCount // Add a metadata property to track line count
    };
  }
  
  /**
   * Handle the end of a conversation by navigating to the next location
   */
  private handleConversationComplete(): void {
    console.log(`Conversation at ${this.currentLocation} complete, determining next location`);
    
    // Clean up any study button
    if (this.studyButton) {
      this.studyButton.removeAllListeners();
      this.studyButton.destroy();
      this.studyButton = undefined;
    }
    
    // Clean up tracked study button containers
    this.studyButtonContainers.forEach(container => {
      if (container && container.active) {
        // Remove all event listeners first
        container.getAll().forEach(child => {
          if (child instanceof Phaser.GameObjects.Rectangle || 
              child instanceof Phaser.GameObjects.Text) {
            child.removeAllListeners();
          }
        });
        container.destroy();
      }
    });
    this.studyButtonContainers = [];
    
    // For now, we'll implement a simple linear progression through locations
    const locationSequence = [
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
    
    // Find the current location in the sequence
    const currentIndex = locationSequence.indexOf(this.currentLocation);
    
    if (currentIndex === -1 || currentIndex === locationSequence.length - 1) {
      // If we're at the end or location not found, go to title screen
      console.log('Reached end of story, returning to title screen');
      this.transitionTo('TitleScene');
      return;
    }
    
    // Get the next location
    const nextLocation = locationSequence[currentIndex + 1];
    console.log(`Transitioning to next location: ${nextLocation}`);
    
    // Hide all characters from the previous scene
    console.log('Hiding all characters from previous scene');
    this.characterManager.hideAll();
    
    // Update the background to the new location
    this.setBackground(nextLocation);
    
    // Start the conversation for this location
    this.dialogManager.startConversationByLocation(nextLocation);
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
    const height = this.cameras.main.height * 0.3; // Increased from 0.25 to 0.3 for more text space
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
      'Loading dialog...',  // Initial text to ensure it's visible
      {
        fontFamily: '"Hiragino Sans", "Meiryo", "Yu Gothic", "MS Gothic", sans-serif', // Better Japanese font support
        fontSize: '24px', // Restored original size that word wrapping depends on
        color: '#ffffff',
        wordWrap: { width: width - 40 },
        lineSpacing: 6, // Restored original line spacing
        stroke: '#000000', // Kept stroke for readability
        strokeThickness: 1
      }
    );
    this.dialogText.setDepth(this.DEPTH_UI);
    
    // Add click event to the dialog box
    this.dialogBox.on('pointerdown', () => {
      console.log('Dialog box clicked directly');
      if (this.isDialogComplete) {
        this.dialogManager.advanceDialog();
      } else {
        this.completeDialog();
      }
    });
  }
  
  /**
   * Create the name box for the speaking character
   */
  private createNameBox(): void {
    const width = 200;
    const height = 40;
    const x = this.cameras.main.width * 0.05 + width / 2;
    const y = this.cameras.main.height - this.cameras.main.height * 0.3 - 40; // Adjusted for new dialog box height
    
    // Create the name box background
    this.nameBox = this.add.rectangle(x, y, width, height, 0x5a5a5a);
    this.nameBox.setAlpha(0.9);
    this.nameBox.setStrokeStyle(2, 0xffffff);
    this.nameBox.setDepth(this.DEPTH_UI);
    
    // Create the name text
    this.nameText = this.add.text(
      x,
      y,
      'Character',  // Initial text to ensure it's visible
      {
        fontFamily: '"Hiragino Sans", "Meiryo", "Yu Gothic", "MS Gothic", sans-serif', // Match dialog text
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
    this.nextIndicator.setVisible(false); // Initially invisible
    this.nextIndicator.setDepth(this.DEPTH_UI);
    
    // We'll start the animation when needed, not at creation time
  }
  
  /**
   * Create the container for choice buttons
   */
  private createChoiceContainer(): void {
    // Create a container for the choice content
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
        fontFamily: '"Hiragino Sans", "Meiryo", "Yu Gothic", "MS Gothic", sans-serif', // Match other text
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
   * Create a button to select difficulty level
   */
  private createDifficultyButton(): void {
    // Position in the top right corner
    const x = this.cameras.main.width - 20;
    const y = 20;
    
    const buttonText = `Difficulty: ${this.capitalizeFirstLetter(this.difficultyLevel)}`;
    
    this.difficultyButton = this.add.text(
      x,
      y,
      buttonText,
      {
        fontFamily: '"Hiragino Sans", "Meiryo", "Yu Gothic", "MS Gothic", sans-serif', // Match other text
        fontSize: '18px',
        color: '#ffffff',
        backgroundColor: '#1e5a5a',
        padding: { left: 10, right: 10, top: 5, bottom: 5 }
      }
    );
    
    this.difficultyButton.setOrigin(1, 0); // Align to top right
    this.difficultyButton.setInteractive({ useHandCursor: true });
    this.difficultyButton.setDepth(this.DEPTH_UI);
    
    // Add hover effect
    this.difficultyButton.on('pointerover', () => {
      if (this.difficultyButton) {
        this.difficultyButton.setStyle({ color: '#ffff00' });
      }
    });
    
    this.difficultyButton.on('pointerout', () => {
      if (this.difficultyButton) {
        this.difficultyButton.setStyle({ color: '#ffffff' });
      }
    });
    
    // Handle click event - cycle through difficulty levels
    this.difficultyButton.on('pointerdown', () => {
      this.cycleDifficultyLevel();
      
      // Update button text
      if (this.difficultyButton) {
        this.difficultyButton.setText(`Difficulty: ${this.capitalizeFirstLetter(this.difficultyLevel)}`);
      }
      
      // Refresh current dialog if needed
      if (this.dialogText && this.currentDialog) {
        const currentDialog = this.dialogManager.getCurrentDialog();
        if (currentDialog) {
          const formattedDialog = this.formatDialogForDifficulty(currentDialog);
          this.dialogText.setText(formattedDialog.japaneseText);
          this.currentDialog = formattedDialog.japaneseText;
        }
      }
    });
  }
  
  /**
   * Cycle through difficulty levels
   */
  private cycleDifficultyLevel(): void {
    // Store the previous difficulty level
    const previousDifficulty = this.difficultyLevel;
    
    // Change to the next difficulty level
    switch (this.difficultyLevel) {
      case 'beginner':
        this.difficultyLevel = 'intermediate';
        break;
      case 'intermediate':
        this.difficultyLevel = 'advanced';
        break;
      case 'advanced':
        this.difficultyLevel = 'beginner';
        break;
    }
    
    console.log(`Difficulty level changed from ${previousDifficulty} to ${this.difficultyLevel}`);
    
    // Update button text
    if (this.difficultyButton) {
      this.difficultyButton.setText(`Difficulty: ${this.capitalizeFirstLetter(this.difficultyLevel)}`);
    }
    
    // Refresh dialog or choices based on what's currently visible
    if (this.choiceContainer && this.choiceContainer.alpha > 0) {
      // If choices are currently visible, rebuild them completely with the new difficulty
      const currentDialog = this.dialogManager.getCurrentDialog();
      if (currentDialog && currentDialog.playerResponses && currentDialog.playerResponses.length > 0) {
        // Hide the container first for a smooth transition
        this.tweens.add({
          targets: this.choiceContainer,
          alpha: 0,
          scale: 0.95,
          duration: 200,
          ease: 'Power2',
          onComplete: () => {
            // Clear all old content to avoid any transparency issues
            this.choiceContainer?.removeAll(true);
            this.choiceButtons = [];
            
            // IMPORTANT: Destroy (not just hide) these elements
            if (this.romajiText) {
              this.romajiText.destroy();
              this.romajiText = undefined;
            }
            
            if (this.englishText) {
              this.englishText.destroy();
              this.englishText = undefined;
            }
            
            if (this.studyButton) {
              this.studyButton.destroy();
              this.studyButton = undefined;
            }
            
            // Show choices again with the new difficulty format - completely rebuilt
            this.showChoices(currentDialog.playerResponses!);
          }
        });
      }
    } else if (this.dialogText && this.currentDialog) {
      // If dialog is visible, completely rebuild it with the new difficulty level
      const currentDialog = this.dialogManager.getCurrentDialog();
      if (currentDialog) {
        // Clean up and recreate with new formatting
        this.displayDialog(this.formatDialogForDifficulty(currentDialog), currentDialog.characterId);
        
        // If dialog was already complete, show everything immediately
        if (this.isDialogComplete) {
          // Complete the dialog to show all elements
          this.completeDialog();
        }
      }
    }
  }
  
  /**
   * Set up input handlers for advancing dialog and making choices
   */
  private setupInputHandlers(): void {
    // Click/tap anywhere on the scene to advance dialog
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      // Debug log to check if click event is firing
      console.log('Pointer down detected at', pointer.x, pointer.y);
      console.log('[SB1] pointerdown - Current study button:', this.studyButton);
      
      // Ignore if clicking on a choice button or title button
      if (this.isClickingInteractive(pointer)) {
        console.log('Clicked on interactive element, ignoring');
        return;
      }
      
      if (this.isDialogComplete) {
        console.log('Dialog complete, advancing to next dialog');
        console.log('[SB1] pointerdown - Dialog complete, study button before advancing:', this.studyButton);
        
        // The study button will be destroyed in displayDialog when next dialog is shown
        this.dialogManager.advanceDialog();
      } else {
        console.log('Dialog not complete, completing it immediately');
        // If dialog is still typing, complete it immediately
        this.completeDialog();
      }
    });
    
    // Keyboard input for advancing dialog
    this.input.keyboard?.on('keydown-SPACE', () => {
      console.log('Space key pressed');
      if (this.isDialogComplete) {
        console.log('Dialog complete, advancing to next dialog');
        
        // The study button will be destroyed in displayDialog when next dialog is shown
        this.dialogManager.advanceDialog();
      } else {
        console.log('Dialog not complete, completing it immediately');
        this.completeDialog();
      }
    });
  }
  
  /**
   * Check if the pointer is clicking on an interactive element
   */
  private isClickingInteractive(pointer: Phaser.Input.Pointer): boolean {
    const targets = this.input.hitTestPointer(pointer);
    console.log('Hit test targets:', targets.map(t => t.type));
    
    // Always proceed with dialog advancement if clicking on the dialog box itself
    if (targets.some(target => target === this.dialogBox)) {
      console.log('Clicked on dialog box, proceeding with dialog advancement');
      return false;
    }
    
    return targets.some(target => 
      (target === this.titleButton) || 
      (target === this.studyButton) ||
      (target === this.difficultyButton) ||
      this.choiceButtons.includes(target as Phaser.GameObjects.Text)
    );
  }
  
  /**
   * Display a dialog from a specific speaker
   */
  private displayDialog(dialog: Dialog, speaker: string): void {
    if (!this.dialogText || !this.nameText || !this.dialogBox) {
      console.error('Dialog text, name text, or dialog box not initialized');
      throw new Error('Dialog UI components not initialized');
    }
    
    console.log(`Displaying dialog: "${dialog.japaneseText}" from speaker: "${speaker}"`);
    
    // Stop any existing dialog timer
    if (this.dialogTimer) {
      this.dialogTimer.remove();
      this.dialogTimer = undefined; // Make sure to clear the reference
    }
    
    // Remove any existing study button
    if (this.studyButton) {
      console.log('[SB1] displayDialog() - destroying existing study button:', this.studyButton);
      this.studyButton.destroy();
      this.studyButton = undefined;
    } else {
      console.log('[SB1] displayDialog() - no existing study button to destroy');
    }
    
    // Clean up existing secondary text elements
    if (this.romajiText) {
      this.romajiText.destroy();
      this.romajiText = undefined;
    }
    
    if (this.englishText) {
      this.englishText.destroy();
      this.englishText = undefined;
    }
    
    // Set the current dialog and speaker
    this.currentDialog = dialog.japaneseText;
    this.currentSpeaker = speaker;
    this.isDialogComplete = false;
    this.displayedTextLength = 0; // Reset this to 0 for each new dialog
    
    // Set the speaker name with capitalized first letter
    const displayName = this.capitalizeFirstLetter(speaker);
    this.nameText.setText(displayName);
    this.nameText.setAlpha(1); // Ensure name is visible
    
    // Show/hide the name box based on whether there's a speaker
    if (this.nameBox) {
      this.nameBox.setAlpha(speaker ? 0.9 : 0);
    }
    
    // Clear the dialog text to start fresh
    this.dialogText.setText('');
    
    // Make sure dialog box and text are visible
    this.dialogBox.setAlpha(0.7);
    this.dialogText.setAlpha(1);
    
    // Apply consistent styling with the choice buttons
    this.dialogText.setStyle({
      fontFamily: '"Hiragino Sans", "Meiryo", "Yu Gothic", "MS Gothic", sans-serif',
      fontSize: '24px', // Restore original size for Japanese text
      color: '#ffffff',
      wordWrap: { width: this.dialogBox ? this.dialogBox.width - 40 : 700 },
      lineSpacing: 6,
      stroke: '#000000',
      strokeThickness: 1
    });
    
    // Add romaji text below if present and if not in advanced mode
    if (dialog.romaji && this.difficultyLevel !== 'advanced') {
      // IMPORTANT: The dialog.japaneseText is already wrapped by formatDialogForDifficulty()
      // so we should directly count newlines in it rather than double-wrapping
      
      // Count the number of lines by using our stored _wrappedLineCount, or fall back to counting newlines
      const lineCount = dialog._wrappedLineCount || (dialog.japaneseText.match(/\n/g) || []).length + 1;
      
      // Log what we found for debugging
      console.log(`Using stored line count: ${dialog._wrappedLineCount}, total lines: ${lineCount}`);
      
      // Calculate the proper Y position based on the number of lines
      // Account for the line height and spacing
      const lineHeight = 32; // Slightly increased from 30 to provide more room
      const lineSpacing = 6; // From the lineSpacing setting in dialogText.setStyle
      
      // Calculate extra height needed for multi-line text
      // Formula: If more than 1 line, add height for each additional line
      const extraHeight = lineCount > 1 ? (lineCount - 1) * (lineHeight + lineSpacing) : 0;
      
      // Position below Japanese text with proper spacing for multi-line text
      const baseY = this.dialogText.y + this.dialogText.height;
      const padding = 15; // Padding between Japanese and romaji
      const romajiY = baseY + extraHeight + padding;
      
      // Log for debugging
      console.log(`Japanese text has ${lineCount} lines from direct count. Positioning romaji at Y: ${romajiY} (base: ${baseY}, extra height: ${extraHeight})`);
      
      // Create romaji text with styling matching choice buttons
      this.romajiText = this.add.text(
        this.dialogText.x,
        romajiY,
        `(${dialog.romaji})`,
        {
          fontFamily: '"Hiragino Sans", "Meiryo", "Yu Gothic", "MS Gothic", sans-serif',
          fontSize: '18px', // Smaller font for romaji
          color: '#cccccc',
          wordWrap: { width: this.dialogBox ? this.dialogBox.width - 40 : 700 },
          lineSpacing: 2
        }
      );
      this.romajiText.setDepth(this.DEPTH_UI);
      this.romajiText.setAlpha(0); // Start hidden, will be shown after Japanese text is complete
    }
    
    // Add English text if present and if in beginner mode
    if (this.difficultyLevel === 'beginner' && dialog.englishText) {
      // Position below romaji or Japanese text with proper spacing
      let englishY;
      
      if (dialog.romaji) {
        // If romaji is displayed, position English text relative to romaji
        englishY = this.romajiText!.y + this.romajiText!.height + 15;
      } else {
        // If no romaji, position directly below Japanese text with proper spacing for multi-line text
        // Count lines directly from the already-wrapped text or use stored line count
        const lineCount = dialog._wrappedLineCount || (dialog.japaneseText.match(/\n/g) || []).length + 1;
        
        const lineHeight = 32; // Same as used for romaji positioning
        const lineSpacing = 6;
        
        // Calculate extra height needed for multi-line text
        const extraHeight = lineCount > 1 ? (lineCount - 1) * (lineHeight + lineSpacing) : 0;
        
        // Position below Japanese text with proper spacing
        const baseY = this.dialogText.y + this.dialogText.height;
        const padding = 15; // Padding between Japanese and English
        englishY = baseY + extraHeight + padding;
        
        // Log for debugging
        console.log(`No romaji shown. Japanese text has ${lineCount} lines from direct count. Positioning English at Y: ${englishY} (base: ${baseY}, extra height: ${extraHeight})`);
      }
      
      // Create English text with styling matching choice buttons
      this.englishText = this.add.text(
        this.dialogText.x,
        englishY,
        `[${dialog.englishText}]`,
        {
          fontFamily: '"Hiragino Sans", "Meiryo", "Yu Gothic", "MS Gothic", sans-serif',
          fontSize: '18px', // Smaller font for English
          color: '#aaddff',
          wordWrap: { width: this.dialogBox ? this.dialogBox.width - 40 : 700 },
          lineSpacing: 2
        }
      );
      this.englishText.setDepth(this.DEPTH_UI);
      this.englishText.setAlpha(0); // Start hidden, will be shown after Japanese text is complete
    }
    
    // Hide the next indicator until dialog is complete
    if (this.nextIndicator) {
      this.nextIndicator.setAlpha(0);
      this.nextIndicator.setVisible(false);
      
      // Stop any existing tweens on the indicator
      this.tweens.killTweensOf(this.nextIndicator);
    }
    
    // Start the typewriter effect on Japanese text only
    const dialogLength = dialog.japaneseText.length;
    
    // Debug log to verify if the text contains newlines
    const newlineCount = (dialog.japaneseText.match(/\n/g) || []).length;
    console.log(`Starting typewriter effect for text with ${newlineCount} newlines, length: ${dialogLength}`);
    
    this.dialogTimer = this.time.addEvent({
      delay: this.dialogSpeed,
      callback: this.updateDialogText,
      callbackScope: this,
      repeat: dialogLength > 0 ? dialogLength - 1 : 0 // Make sure repeat is at least 0
    });
  }
  
  /**
   * Utility function to capitalize the first letter of a string
   */
  private capitalizeFirstLetter(str: string): string {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  /**
   * Update the dialog text with the typewriter effect
   */
  private updateDialogText(): void {
    if (!this.dialogText) return;
    
    // Increment the displayed text length
    this.displayedTextLength++;
    
    if (this.displayedTextLength <= this.currentDialog.length) {
      // Get the substring of text to display
      const textToShow = this.currentDialog.substring(0, this.displayedTextLength);
      this.dialogText.setText(textToShow);
    }
    
    // When we reach the end of the Japanese text, show the additional elements with a slight delay
    if (this.displayedTextLength >= this.currentDialog.length) {
      console.log('[SB1] updateDialogText() - reached end of text, length:', this.currentDialog.length);
      
      // Show romaji with a slight delay
      if (this.romajiText) {
        this.romajiText.setAlpha(1);
      }
      
      // Show English after romaji
      if (this.englishText) {
        this.englishText.setAlpha(1);
      }
      
      // Show the next indicator
      if (this.nextIndicator) {
        this.nextIndicator.setAlpha(1);
        this.nextIndicator.setVisible(true);
        
        // Restart the pulsing animation if it was stopped
        if (!this.tweens.getTweensOf(this.nextIndicator).length) {
          this.tweens.add({
            targets: this.nextIndicator,
            alpha: { from: 0.5, to: 1 },
            duration: 500,
            ease: 'Power2',
            yoyo: true,
            repeat: -1
          });
        }
      }
      
      // Mark dialog as complete
      this.isDialogComplete = true;
      console.log('[SB1] Dialog marked as complete, isDialogComplete:', this.isDialogComplete);
      
      // Clean up any existing study button first
      if (this.studyButton) {
        console.log('[SB1] updateDialogText() - cleaning up existing study button:', this.studyButton);
        this.studyButton.removeAllListeners();
        this.studyButton.destroy();
        this.studyButton = undefined;
      } else {
        console.log('[SB1] updateDialogText() - no existing study button to clean up');
      }
      
      // Add study button
      console.log('[SB1] updateDialogText() - calling addStudyButton()');
      this.addStudyButton();
    }
  }
  
  /**
   * Complete the current dialog immediately
   */
  private completeDialog(): void {
    console.log('[SB1] completeDialog() called');
    if (!this.dialogText) return;
    
    // Stop the typewriter timer
    if (this.dialogTimer) {
      console.log('[SB1] completeDialog() - stopping dialog timer');
      this.dialogTimer.remove();
    }
    
    // Show the complete Japanese text
    this.dialogText.setText(this.currentDialog);
    
    // Show the romaji text if it exists
    if (this.romajiText) {
      this.romajiText.setAlpha(1);
    }
    
    // Show the English text if it exists
    if (this.englishText) {
      this.englishText.setAlpha(1);
    }
    
    // Show the next indicator
    if (this.nextIndicator) {
      this.nextIndicator.setAlpha(1);
      this.nextIndicator.setVisible(true);
      
      // Restart the pulsing animation if it was stopped
      if (!this.tweens.getTweensOf(this.nextIndicator).length) {
        this.tweens.add({
          targets: this.nextIndicator,
          alpha: { from: 0.5, to: 1 },
          duration: 500,
          ease: 'Power2',
          yoyo: true,
          repeat: -1
        });
      }
    }
    
    // Clean up any existing study button to avoid duplicates
    if (this.studyButton) {
      console.log('[SB1] completeDialog() - cleaning up existing study button:', this.studyButton);
      this.studyButton.removeAllListeners();
      this.studyButton.destroy();
      this.studyButton = undefined;
    } else {
      console.log('[SB1] completeDialog() - no existing study button to clean up');
    }
    
    // Mark as complete
    this.isDialogComplete = true;
    console.log('[SB1] completeDialog() - isDialogComplete set to true');
    
    // Add study button
    console.log('[SB1] completeDialog() - calling addStudyButton()');
    this.addStudyButton();
  }
  
  /**
   * Add a study button to the current dialog
   */
  private addStudyButton(): void {
    console.log('[SB1] addStudyButton() called');
    
    // Only add the study button if it doesn't already exist
    if (this.studyButton || !this.dialogBox) {
      console.log('[SB1] addStudyButton() early return - studyButton exists:', !!this.studyButton, 'dialogBox exists:', !!this.dialogBox);
      return;
    }
    
    console.log('[SB1] dialogBox visibility - visible:', this.dialogBox.visible, 'alpha:', this.dialogBox.alpha);
    console.log('[SB1] dialogBox position and size - x:', this.dialogBox.x, 'y:', this.dialogBox.y, 
                'width:', this.dialogBox.width, 'height:', this.dialogBox.height);
    
    // Get the current dialog from the dialog manager
    const currentDialog = this.dialogManager.getCurrentDialog();
    if (!currentDialog) {
      console.log('[SB1] addStudyButton() early return - no current dialog');
      return;
    }
    
    // Position the study button at the same location as the pink debug dot (1050, 550)
    // Calculate this position based on the dialog box position
    const studyButtonX = this.dialogBox.x + 460; // 450 pixels from left edge of dialog box
    const studyButtonY = this.dialogBox.y - 120; // 110 pixels above top edge of dialog box
    
    console.log('[SB1] Creating study button at position:', studyButtonX, studyButtonY);
    
    this.studyButton = this.add.text(
      studyButtonX,
      studyButtonY,
      'Study',
      {
        fontFamily: '"Hiragino Sans", "Meiryo", "Yu Gothic", "MS Gothic", sans-serif',
        fontSize: '16px', // Same size as choice study buttons
        color: '#ffffff',
        backgroundColor: '#1e5a5a', // Same GREEN color as choice study buttons
        padding: {
          x: 10,
          y: 5
        },
        stroke: '#000000',
        strokeThickness: 1
      }
    );
    
    // Set depth to ensure visibility
    this.studyButton.setDepth(this.DEPTH_UI + 10);
    console.log('[SB1] Study button depth set to:', this.DEPTH_UI + 10);
    this.studyButton.setInteractive({ useHandCursor: true });
    
    console.log('[SB1] Study button created:', this.studyButton);
    
    // Add hover effect
    const originalBgColor = '#1e5a5a'; // GREEN color
    const hoverBgColor = '#2a7a7a'; // Lighter green for hover
    
    this.studyButton.on('pointerover', () => {
      if (this.studyButton) {
        this.studyButton.setStyle({ color: '#aaddff', backgroundColor: hoverBgColor });
      }
    });
    
    this.studyButton.on('pointerout', () => {
      if (this.studyButton) {
        this.studyButton.setStyle({ color: '#ffffff', backgroundColor: originalBgColor });
      }
    });
    
    // Handle click event
    this.studyButton.on('pointerdown', () => {
      if (currentDialog) {
        const studyData = {
          phrase: currentDialog.japaneseText,
          furigana: currentDialog.romaji,
          translation: currentDialog.englishText,
          context: `${this.currentLocation}`,
          source: currentDialog.characterId || 'Narration'
        };
        
        this.openStudyScene(studyData);
      }
    });
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
   * Show choice buttons
   */
  private showChoices(choices: PlayerResponse[]): void {
    // Safety check
    if (!this.choiceContainer) {
      console.error('Choice container not initialized');
      return;
    }

    console.log(`[SB1] showChoices() - Showing ${choices.length} choices`);
    console.log(`[SB1] showChoices() - Current study button:`, this.studyButton);
    
    // Hide the study button completely when choices are shown
    if (this.studyButton) {
      console.log(`[SB1] showChoices() - Hiding study button`);
      this.studyButton.setVisible(false);
    }
    
    // Reset containers first to clean state
    this.choiceContainer.setVisible(true);
    
    // Clean up any existing study button containers (for choice buttons only)
    this.studyButtonContainers.forEach(container => {
      if (container && container.active) {
        // Remove all event listeners first
        container.getAll().forEach(child => {
          if (child instanceof Phaser.GameObjects.Rectangle || 
              child instanceof Phaser.GameObjects.Text) {
            child.removeAllListeners();
          }
        });
        console.log('Destroying tracked study button container');
        container.destroy();
      }
    });
    // Clear the tracking array
    this.studyButtonContainers = [];
    
    // Clear existing choices
    this.choiceButtons.forEach(button => button.destroy());
    this.choiceButtons = [];
    
    // Clean out any existing children to prevent potential memory leaks
    this.choiceContainer.removeAll(true);
    
    // Hide the dialog box and other primary UI elements
    // Make sure everything is completely invisible
    if (this.dialogBox) this.dialogBox.setAlpha(0);
    if (this.dialogText) this.dialogText.setAlpha(0);
    if (this.nameBox) this.nameBox.setAlpha(0);
    if (this.nameText) this.nameText.setAlpha(0);
    
    // Make the next indicator completely invisible
    if (this.nextIndicator) {
      this.nextIndicator.setAlpha(0);
      this.nextIndicator.setVisible(false);
      // Stop any tweens on the next indicator
      this.tweens.killTweensOf(this.nextIndicator);
    }
    
    // Set up sizing for choices
    const choiceBoxWidth = this.cameras.main.width * 0.7; // Reduced width for a lighter feel
    const buttonHeight = 135; // Increased from 115px to 135px for more text space
    const buttonPadding = 40; // Increased vertical spacing between buttons
    const buttonWidth = choiceBoxWidth;
    
    // Start position for first button
    let yOffset = -((choices.length - 1) * (buttonHeight + buttonPadding)) / 2;
    
    // Create each choice button
    choices.forEach((choice, index) => {
      // Create a group for this choice (button + study button)
      const choiceGroup = this.add.container(0, yOffset);
      
      // Create button background with gradient effect
      const buttonBackground = this.add.rectangle(
        0,
        0,
        buttonWidth,
        buttonHeight,
        0x2a2a3a
      );
      buttonBackground.setStrokeStyle(2, 0xaaddff);
      buttonBackground.setAlpha(0.85); // Slightly more transparent for a floating feel
      
      // Add inner glow effect
      const innerGlow = this.add.rectangle(
        0,
        0,
        buttonWidth - 4,
        buttonHeight - 4,
        0x3a3a4a
      );
      innerGlow.setAlpha(0.5);
      
      // Format Japanese text with proper wrapping
      const japaneseText = this.wrapJapaneseText(choice.japaneseText, 31); // Use 31 char max for player responses
      
      // Create container for text elements to control positioning
      const textContainer = this.add.container(0, 0);
      
      // Create Japanese text with larger font - always shown regardless of difficulty
      const japaneseTextObj = this.add.text(
        0,
        -buttonHeight/2 + 25, // Position at top with margin
        japaneseText,
        {
          fontFamily: '"Hiragino Sans", "Meiryo", "Yu Gothic", "MS Gothic", sans-serif',
          fontSize: '26px', // Larger font for Japanese text
          color: '#ffffff',
          align: 'center',
          wordWrap: { width: buttonWidth - 30 },
          lineSpacing: 5,
          stroke: '#000000',
          strokeThickness: 1
        }
      );
      japaneseTextObj.setOrigin(0.5, 0);
      textContainer.add(japaneseTextObj);
      
      // Calculate where additional text will be positioned
      let yPos = japaneseTextObj.y + japaneseTextObj.height + 10;
      
      // Add romaji text in beginner and intermediate modes
      if ((this.difficultyLevel === 'beginner' || this.difficultyLevel === 'intermediate') && choice.romaji) {
        const romajiTextObj = this.add.text(
          0,
          yPos,
          `(${choice.romaji})`,
          {
            fontFamily: '"Hiragino Sans", "Meiryo", "Yu Gothic", "MS Gothic", sans-serif',
            fontSize: '18px', // Smaller font for romaji
            color: '#cccccc',
            align: 'center',
            wordWrap: { width: buttonWidth - 40 },
            lineSpacing: 2
          }
        );
        romajiTextObj.setOrigin(0.5, 0);
        textContainer.add(romajiTextObj);
        yPos = romajiTextObj.y + romajiTextObj.height + 5;
      }
      
      // Add English translation in beginner mode only
      if (this.difficultyLevel === 'beginner' && choice.englishText) {
        const englishTextObj = this.add.text(
          0,
          yPos,
          `[${choice.englishText}]`,
          {
            fontFamily: '"Hiragino Sans", "Meiryo", "Yu Gothic", "MS Gothic", sans-serif',
            fontSize: '18px', // Smaller font for English
            color: '#aaddff',
            align: 'center',
            wordWrap: { width: buttonWidth - 40 },
            lineSpacing: 2
          }
        );
        englishTextObj.setOrigin(0.5, 0);
        textContainer.add(englishTextObj);
      }
      
      // Add text container to choice group
      choiceGroup.add(buttonBackground);
      choiceGroup.add(innerGlow);
      choiceGroup.add(textContainer);
      
      // Store the Japanese text object for reference
      this.choiceButtons.push(japaneseTextObj);
      
      // Make the button interactive
      buttonBackground.setInteractive({ useHandCursor: true });
      
      // Add hover effect
      buttonBackground.on('pointerover', () => {
        buttonBackground.setFillStyle(0x3a3a5a);
        innerGlow.setFillStyle(0x4a4a6a);
        japaneseTextObj.setStyle({ color: '#ffff99' });
        
        // Add scale animation on hover
        this.tweens.add({
          targets: choiceGroup,
          scaleX: 1.05,
          scaleY: 1.05,
          duration: 150,
          ease: 'Power1'
        });
      });
      
      buttonBackground.on('pointerout', () => {
        buttonBackground.setFillStyle(0x2a2a3a);
        innerGlow.setFillStyle(0x3a3a4a);
        japaneseTextObj.setStyle({ color: '#ffffff' });
        
        // Reset scale on mouse out
        this.tweens.add({
          targets: choiceGroup,
          scaleX: 1,
          scaleY: 1,
          duration: 150,
          ease: 'Power1'
        });
      });
      
      // Handle click event
      buttonBackground.on('pointerdown', () => {
        // Add highlight effect on click
        buttonBackground.setFillStyle(0x5a5aaa);
        innerGlow.setFillStyle(0x6a6aba);
        
        // Add click animation
        this.tweens.add({
          targets: choiceGroup,
          scaleX: 0.97,
          scaleY: 0.97,
          duration: 50,
          yoyo: true,
          ease: 'Power1',
          onComplete: () => {
            this.handleChoice(index);
          }
        });
      });
      
      // Add study button
      const studyButton = this.addStudyButtonToChoice(buttonBackground, japaneseTextObj, choice);
      if (studyButton) {
        choiceGroup.add(studyButton);
      }
      
      // Add the group to the container
      if (this.choiceContainer) {
        this.choiceContainer.add(choiceGroup);
      }
      
      // Update y offset for next button
      yOffset += buttonHeight + buttonPadding;
    });
    
    // Show the choice container with animation - make it a bit more dramatic
    this.choiceContainer.setAlpha(0);
    this.choiceContainer.setScale(0.8);
    this.tweens.add({
      targets: this.choiceContainer,
      alpha: 1,
      scale: 1,
      duration: 500,
      ease: 'Back.easeOut'
    });
  }
  
  /**
   * Add a study button to a choice
   */
  private addStudyButtonToChoice(
    buttonBackground: Phaser.GameObjects.Rectangle, 
    buttonText: Phaser.GameObjects.Text, 
    choice: PlayerResponse
  ): Phaser.GameObjects.Container | undefined {
    // Create a container for the study button
    const studyButtonContainer = this.add.container(
      buttonBackground.width / 2 - 40, // Position in top right
      -buttonBackground.height / 2 + 15 // Position at top
    );
    
    // Create background for study button
    const studyButtonBg = this.add.rectangle(
      0,
      0,
      70,
      30,
      0x1e5a5a
    );
    studyButtonBg.setStrokeStyle(1, 0xaaddff);
    
    // Create the study text
    const studyButtonText = this.add.text(
      0,
      0,
      'Study',
      {
        fontFamily: '"Hiragino Sans", "Meiryo", "Yu Gothic", "MS Gothic", sans-serif',
        fontSize: '16px',
        color: '#ffffff',
        align: 'center',
        stroke: '#000000',
        strokeThickness: 1
      }
    );
    studyButtonText.setOrigin(0.5, 0.5);
    
    // Add components to container
    studyButtonContainer.add(studyButtonBg);
    studyButtonContainer.add(studyButtonText);
    
    // Make the button interactive
    studyButtonBg.setInteractive({ useHandCursor: true });
    
    // Add hover effect
    studyButtonBg.on('pointerover', () => {
      studyButtonBg.setFillStyle(0x2a7a7a);
      
      // Add scale animation on hover
      this.tweens.add({
        targets: studyButtonContainer,
        scaleX: 1.1,
        scaleY: 1.1,
        duration: 100,
        ease: 'Power1'
      });
    });
    
    studyButtonBg.on('pointerout', () => {
      studyButtonBg.setFillStyle(0x1e5a5a);
      
      // Reset scale on mouse out
      this.tweens.add({
        targets: studyButtonContainer,
        scaleX: 1,
        scaleY: 1,
        duration: 100,
        ease: 'Power1'
      });
    });
    
    // Handle click event
    studyButtonBg.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      // Prevent event propagation
      if (pointer.event && pointer.event instanceof Event) {
        pointer.event.stopPropagation();
      }
      
      console.log('Study button clicked');
      
      // Add click animation
      this.tweens.add({
        targets: studyButtonContainer,
        scaleX: 0.9,
        scaleY: 0.9,
        duration: 50,
        yoyo: true,
        ease: 'Power1'
      });
      
      // Prepare phrase data directly from the response data
      const phraseData: StudyPhraseData = {
        phrase: choice.japaneseText,
        furigana: choice.romaji,
        translation: choice.englishText,
        context: `Choice option at ${this.currentLocation}`,
        source: 'Player Option'
      };
      
      // Launch the study scene
      this.openStudyScene(phraseData);
    });
    
    // Track this container for cleanup
    this.studyButtonContainers.push(studyButtonContainer);
    
    return studyButtonContainer;
  }
  
  /**
   * Handle choice selection
   * @param choiceIndex Index of the selected choice
   */
  private handleChoice(choiceIndex: number): void {
    if (!this.choiceContainer) return;
    
    console.log(`Selected choice: ${choiceIndex}`);
    console.log('[SB1] handleChoice() - Current study button:', this.studyButton);
    
    // Play a sound effect if available
    if (this.sound.get('selection')) {
      this.sound.play('selection', { volume: 0.5 });
    }
    
    // Instead of destroying the study button, just make it invisible until the next dialog is shown
    // This will make the transition smoother
    if (this.studyButton) {
      console.log('[SB1] handleChoice() - hiding study button for transition:', this.studyButton);
      this.studyButton.setVisible(false);
    } else {
      console.log('[SB1] handleChoice() - no study button to hide');
    }
    
    // Remove all event listeners from choice buttons before destroying them
    if (this.choiceContainer && this.choiceContainer.active) {
      // Get all interactive objects within the choice container
      this.choiceContainer.getAll().forEach(child => {
        if (child instanceof Phaser.GameObjects.Rectangle || 
            child instanceof Phaser.GameObjects.Text) {
          // Remove all event listeners
          child.removeAllListeners();
        } else if (child instanceof Phaser.GameObjects.Container) {
          // For nested containers, remove listeners from their children too
          child.getAll().forEach(nestedChild => {
            if (nestedChild instanceof Phaser.GameObjects.Rectangle || 
                nestedChild instanceof Phaser.GameObjects.Text) {
              nestedChild.removeAllListeners();
            }
          });
        }
      });
    }
    
    // Cleanup all tracked study button containers
    this.studyButtonContainers.forEach(container => {
      if (container && container.active) {
        // Remove all event listeners first
        container.getAll().forEach(child => {
          if (child instanceof Phaser.GameObjects.Rectangle || 
              child instanceof Phaser.GameObjects.Text) {
            child.removeAllListeners();
          }
        });
        console.log('Destroying tracked study button container in handleChoice');
        container.destroy();
      }
    });
    this.studyButtonContainers = [];
    
    // Also ensure romaji and English text are destroyed
    if (this.romajiText) {
      this.romajiText.destroy();
      this.romajiText = undefined;
    }
    
    if (this.englishText) {
      this.englishText.destroy();
      this.englishText = undefined;
    }
    
    // Hide the choice container with improved animation
    this.tweens.add({
      targets: this.choiceContainer,
      alpha: 0,
      scale: 0.95,
      duration: 400,
      ease: 'Power2',
      onComplete: () => {
        // Clear choices
        this.choiceButtons.forEach(button => button.destroy());
        this.choiceButtons = [];
        
        // Show the dialog box again with fade in
        if (this.dialogBox) {
          this.dialogBox.setAlpha(0);
          this.tweens.add({
            targets: this.dialogBox,
            alpha: 0.7,
            duration: 300,
            ease: 'Power1'
          });
        }
        
        if (this.dialogText) {
          this.dialogText.setAlpha(0);
          this.tweens.add({
            targets: this.dialogText,
            alpha: 1,
            duration: 300,
            ease: 'Power1'
          });
        }
        
        // Restore the next indicator (continue button) when returning to regular dialog
        // We'll only show it after the dialog is fully displayed (when the text animation completes)
        // This will happen in the displayDialog or completeDialog methods
        
        // Get the current dialog from DialogManager
        const currentDialog = this.dialogManager.getCurrentDialog();
        if (currentDialog && currentDialog.playerResponses) {
          // Use the response ID for proper choice handling
          const selectedResponse = currentDialog.playerResponses[choiceIndex];
          if (selectedResponse) {
            this.dialogManager.selectChoice(selectedResponse.id);
          }
        }
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
    
    // Add dialog manager state
    state.dialogState = this.dialogManager.serialize();
    
    // Add scene-specific state
    return {
      ...state,
      currentDialog: this.currentDialog,
      currentSpeaker: this.currentSpeaker,
      isDialogComplete: this.isDialogComplete,
      displayedTextLength: this.displayedTextLength,
      currentLocation: this.currentLocation,
      difficultyLevel: this.difficultyLevel
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
      this.difficultyLevel = state.difficultyLevel || 'beginner';
      
      // Restore character manager state
      if (state.characterState) {
        this.characterManager.deserialize(state.characterState);
      }
      
      // Restore dialog manager state
      if (state.dialogState) {
        this.dialogManager.deserialize(state.dialogState);
      }
      
      // Update UI elements to match state
      if (this.dialogText && this.currentDialog) {
        this.dialogText.setText(this.currentDialog.substring(0, this.displayedTextLength));
      }
      
      if (this.nameText && this.currentSpeaker) {
        // Use capitalized name for display
        const displayName = this.capitalizeFirstLetter(this.currentSpeaker);
        this.nameText.setText(displayName);
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
      console.log(`Setting background to ${locationKey}`);
      this.background.setTexture(locationKey);
      
      // Update the current location
      this.currentLocation = locationKey;
      console.log(`Current location updated to: ${this.currentLocation}`);
    }
  }
  
  /**
   * Wraps Japanese text at a maximum of specified characters per line
   * Avoids breaking words in the middle
   * @param text The Japanese text to wrap
   * @param maxLength Maximum characters per line (default 43 for dialog, 31 for choices)
   * @returns The wrapped text with newlines
   */
  private wrapJapaneseText(text: string, maxLength: number = 43): string {
    // Check if text needs wrapping
    if (text.length <= maxLength) {
      return text;
    }
    
    console.log(`Wrapping Japanese text: ${text.length} chars, max ${maxLength}, starts with: ${text.substring(0, 20)}...`);
    
    const lines: string[] = [];
    let currentLine = '';
    let currentLineLength = 0;
    
    // Process the text character by character
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      currentLine += char;
      currentLineLength++;
      
      // Check if we've reached the maximum line length
      if (currentLineLength >= maxLength && i < text.length - 1) {
        // Find better break point
        const nextChar = text[i + 1];
        const currentType = this.getCharacterType(char);
        const nextType = this.getCharacterType(nextChar);
        
        // Only break if it's safe to do so
        if (this.canBreakBetween(currentType, nextType)) {
          lines.push(currentLine);
          currentLine = '';
          currentLineLength = 0;
        }
        // If we can't break here, continue to next character and find better break point
        else if (currentLineLength >= maxLength) {
          const breakPoint = this.findBetterBreakPoint(text, i);
          if (breakPoint > 0 && breakPoint < i) {
            // Split at the better break point
            const lineEnd = currentLine.substring(0, currentLine.length - (i - breakPoint));
            lines.push(lineEnd);
            
            // Start new line with the rest
            currentLine = currentLine.substring(currentLine.length - (i - breakPoint));
            currentLineLength = currentLine.length;
          } else {
            // If no better break point found, force a break
            lines.push(currentLine);
            currentLine = '';
            currentLineLength = 0;
          }
        }
      }
    }
    
    // Add the last line if it's not empty
    if (currentLine) {
      lines.push(currentLine);
    }
    
    console.log(`Wrapped Japanese text into ${lines.length} lines`);
    return lines.join('\n');
  }
  
  /**
   * Get the type of a Japanese character
   * @param char The character to check
   * @returns The character type
   */
  private getCharacterType(char: string): string {
    // Kanji characters (CJK Unified Ideographs)
    if (/[\u4e00-\u9faf]/.test(char)) {
      return 'kanji';
    }
    // Hiragana
    else if (/[\u3040-\u309f]/.test(char)) {
      return 'hiragana';
    }
    // Katakana
    else if (/[\u30a0-\u30ff]/.test(char)) {
      return 'katakana';
    }
    // Punctuation
    else if (/[、。！？「」『』（）]/.test(char)) {
      return 'punctuation';
    }
    // Default/other
    else {
      return 'other';
    }
  }
  
  /**
   * Check if we can safely break between two character types
   * @param type1 The type of the first character
   * @param type2 The type of the second character
   * @returns True if we can safely break between these types
   */
  private canBreakBetween(type1: string, type2: string): boolean {
    // Safe to break between kanji
    if (type1 === 'kanji' && type2 === 'kanji') {
      return true;
    }
    // Don't break between hiragana (could be a word)
    else if (type1 === 'hiragana' && type2 === 'hiragana') {
      return false;
    }
    // Don't break between katakana (could be a word)
    else if (type1 === 'katakana' && type2 === 'katakana') {
      return false;
    }
    // Don't break before punctuation
    else if (type2 === 'punctuation') {
      return false;
    }
    // Generally safe to break between different types
    else {
      return true;
    }
  }
  
  /**
   * Find a better break point in the text
   * @param text The full text
   * @param currentIndex The current index
   * @returns The index of a better break point, or -1 if none found
   */
  private findBetterBreakPoint(text: string, currentIndex: number): number {
    // Look back a few characters for a better break point
    for (let i = currentIndex - 1; i >= Math.max(0, currentIndex - 10); i--) {
      const char = text[i];
      const nextChar = text[i + 1];
      
      const currentType = this.getCharacterType(char);
      const nextType = this.getCharacterType(nextChar);
      
      if (this.canBreakBetween(currentType, nextType)) {
        return i;
      }
    }
    
    return -1;
  }
}

// Register the scene with the registry
sceneRegistry.register('VNScene', VNScene); 