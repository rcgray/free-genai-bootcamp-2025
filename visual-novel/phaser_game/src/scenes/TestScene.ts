/**
 * TestScene.ts
 * A test scene to demonstrate character system functionality.
 * Provides UI controls for showing characters, changing positions, and changing emotions.
 */

import BaseScene from './BaseScene';
import sceneRegistry from './SceneRegistry';
import { CharacterManager } from '../utils/CharacterManager';
import { CharacterPosition } from '../utils/Character';
import { runDialogSystemTests } from '../utils/DialogSystemTests';

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
    waitress: ['default'],
    shopkeeper: ['default']
  };
  
  // Dialog system test button
  private dialogTestButton?: Phaser.GameObjects.Text;
  
  // Dialog test results display
  private testResultsPanel?: Phaser.GameObjects.Container;
  private testResultsBackground?: Phaser.GameObjects.Rectangle;
  private testResultsText?: Phaser.GameObjects.Text;
  private testResultsCloseButton?: Phaser.GameObjects.Text;
  private testResultsPageText?: Phaser.GameObjects.Text;
  private testResultsNextButton?: Phaser.GameObjects.Text;
  private testResultsPrevButton?: Phaser.GameObjects.Text;
  private testResultsConsoleButton?: Phaser.GameObjects.Text;
  
  // Test results pagination
  private testResultsPages: string[] = [];
  private currentResultsPage: number = 0;
  private readonly LINES_PER_PAGE = 20;
  
  // Define depth constants for proper layering
  private readonly DEPTH_BACKGROUND: number = 0;
  private readonly DEPTH_CHARACTER: number = 10;
  private readonly DEPTH_UI: number = 100;
  private readonly DEPTH_UI_OVERLAY: number = 200;
  
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
    
    // Waitress
    this.load.image('waitress_default', 'assets/images/characters/waitress/default.png');
    
    // Shopkeeper
    this.load.image('shopkeeper_default', 'assets/images/characters/shopkeeper/default.png');
  }
  
  /**
   * Create the scene elements
   */
  create(): void {
    console.log('Creating TestScene');
    
    // Create background
    this.createBackground();
    
    // Set up the character manager
    this.characterManager = new CharacterManager();
    this.characterManager.setScene(this);
    this.characterManager.setCharacterDepth(this.DEPTH_CHARACTER); // Set character depth
    
    // Create UI controls
    this.createControls();
    
    // Create navigation buttons
    this.createTitleButton();
    
    // Create dialog system test button
    this.createDialogTestButton();
    
    // Initialize test results panel (hidden by default)
    this.createTestResultsPanel();
    
    // Add help text explaining console access
    this.addConsoleHelpText();
    
    // Create UI for LLM Study Scene integration tests
    this.createLLMStudyTests();
  }
  
  /**
   * Create background for the scene
   */
  private createBackground(): void {
    // Set up the background image
    this.background = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      this.currentBackground
    );
    
    // Scale to fit the screen while maintaining aspect ratio
    const scaleX = this.cameras.main.width / this.background.width;
    const scaleY = this.cameras.main.height / this.background.height;
    const scale = Math.max(scaleX, scaleY);
    this.background.setScale(scale);
    
    // Set the depth to ensure it's behind everything else
    this.background.setDepth(this.DEPTH_BACKGROUND);
  }
  
  /**
   * Create UI controls for character manipulation
   */
  private createControls(): void {
    // Create a container for the controls
    this.controls = this.add.container(0, 0);
    this.controls.setDepth(this.DEPTH_UI); // Ensure controls are above characters
    
    // Create controls container with improved positioning
    const controlsBg = this.add.rectangle(
      this.cameras.main.width - 170, 
      this.cameras.main.height / 2,
      340, 
      this.cameras.main.height, 
      0x1a2639, 
      0.9
    );
    controlsBg.setOrigin(0.5, 0.5);
    controlsBg.setStrokeStyle(2, 0x3f88c5);
    this.controls.add(controlsBg);
    
    // Add a title for the controls
    const title = this.add.text(
      this.cameras.main.width - 170,
      20,
      'Character Test Controls',
      {
        fontSize: '18px',
        fontStyle: 'bold',
        color: '#ffffff'
      }
    );
    title.setOrigin(0.5, 0);
    this.controls.add(title);
    
    // Add background selector
    this.addBackgroundSelector(60);
    
    // Add character controls for each character
    let yOffset = 130;
    Object.keys(this.emotionsMap).forEach(characterId => {
      this.addCharacterControls(characterId, yOffset);
      yOffset += 160; // Reduced vertical space between characters
    });
  }
  
  /**
   * Add background selector controls
   */
  private addBackgroundSelector(yOffset: number = 0): void {
    // Add background label
    const label = this.add.text(
      this.cameras.main.width - 320,
      yOffset,
      'Background:',
      {
      fontSize: '16px',
      color: '#ffffff'
      }
    );
    this.controls.add(label);
    
    // Create a single cycling button for backgrounds
    const bgButton = this.add.text(
      this.cameras.main.width - 170,
      yOffset,
      this.currentBackground,
      {
      fontSize: '14px',
      color: '#ffffff',
        backgroundColor: '#1d3557',
        padding: { left: 8, right: 8, top: 4, bottom: 4 },
        fixedWidth: 160,
        align: 'center'
      }
    );
    
    bgButton.setOrigin(0.5, 0);
    bgButton.setInteractive({ useHandCursor: true });
    
    bgButton.on('pointerover', () => {
      bgButton.setStyle({ backgroundColor: '#2a6f97' });
    });
    
    bgButton.on('pointerout', () => {
      bgButton.setStyle({ backgroundColor: '#1d3557' });
    });
    
    bgButton.on('pointerdown', () => {
      // Cycle to next background
      const currentIndex = this.backgrounds.indexOf(this.currentBackground);
      const nextIndex = (currentIndex + 1) % this.backgrounds.length;
      this.setCurrentBackground(this.backgrounds[nextIndex]);
      
      // Update button text
      bgButton.setText(this.currentBackground);
    });
    
    this.controls.add(bgButton);
  }
  
  /**
   * Set the current background
   */
  private setCurrentBackground(backgroundKey: string): void {
    this.currentBackground = backgroundKey;
    
    // Update background
    if (this.background) {
      this.background.setTexture(this.currentBackground);
    }
  }
  
  /**
   * Add character controls for the specified character
   */
  private addCharacterControls(id: string, yOffset: number): void {
    // Character header with improved styling
    const header = this.add.text(
      this.cameras.main.width - 170,
      yOffset,
      id.charAt(0).toUpperCase() + id.slice(1),
      {
        fontSize: '16px',
        fontStyle: 'bold',
        backgroundColor: '#3f88c5',
        padding: { left: 10, right: 10, top: 6, bottom: 6 },
        fixedWidth: 120,
        align: 'center'
      }
    );
    header.setOrigin(0.5, 0);
    this.controls.add(header);
    
    // Position controls - more compact layout
    const posLabel = this.add.text(
      this.cameras.main.width - 320,
      yOffset + 35,
      'Position:',
      {
      fontSize: '14px',
      color: '#ffffff'
      }
    );
    this.controls.add(posLabel);
    
    // Position buttons with more compact layout
    this.positions.forEach((position, index) => {
      const buttonWidth = 65;
      const button = this.add.text(
        this.cameras.main.width - 310 + (index * (buttonWidth + 5)),
        yOffset + 60,
        position,
        {
        fontSize: '12px',
          backgroundColor: '#1d3557',
          padding: { left: 3, right: 3, top: 3, bottom: 3 },
          fixedWidth: buttonWidth,
          align: 'center'
        }
      );
      
      button.setInteractive({ useHandCursor: true });
      
      button.on('pointerover', () => {
        button.setStyle({ backgroundColor: '#2a6f97' });
      });
      
      button.on('pointerout', () => {
        button.setStyle({ backgroundColor: '#1d3557' });
      });
      
      button.on('pointerdown', () => {
        const character = this.characterManager.getCharacter(id);
        if (character) {
          if (position === 'offscreen') {
            this.characterManager.hide(id);
          } else {
            this.characterManager.show(id, position);
          }
        }
      });
      
      this.controls.add(button);
    });
    
    // Emotion controls - more compact layout
    const emoLabel = this.add.text(
      this.cameras.main.width - 320,
      yOffset + 90,
      'Emotion:',
      {
      fontSize: '14px',
      color: '#ffffff'
      }
    );
    this.controls.add(emoLabel);
    
    // Emotion buttons in a single row if possible
    const emotions = this.emotionsMap[id] || [];
    const emotionColumns = Math.min(emotions.length, 4);
    
    emotions.forEach((emotion, index) => {
      const buttonWidth = 65;
      const column = index % emotionColumns;
      const row = Math.floor(index / emotionColumns);
      
      const button = this.add.text(
        this.cameras.main.width - 310 + (column * (buttonWidth + 5)),
        yOffset + 115 + (row * 30),
        emotion,
        {
        fontSize: '12px',
          backgroundColor: '#1d3557',
          padding: { left: 3, right: 3, top: 3, bottom: 3 },
          fixedWidth: buttonWidth,
          align: 'center'
        }
      );
      
      button.setInteractive({ useHandCursor: true });
      
      button.on('pointerover', () => {
        button.setStyle({ backgroundColor: '#2a6f97' });
      });
      
      button.on('pointerout', () => {
        button.setStyle({ backgroundColor: '#1d3557' });
      });
      
      button.on('pointerdown', () => {
        this.characterManager.setEmotion(id, emotion);
      });
      
      this.controls.add(button);
    });
    
    // Show/Hide button
    const actionButton = this.add.text(
      this.cameras.main.width - 70,
      yOffset + 35,
      'Show',
      {
        fontSize: '14px',
        backgroundColor: '#43aa8b',
        padding: { left: 8, right: 8, top: 4, bottom: 4 },
        fixedWidth: 60,
        align: 'center'
      }
    );
    
    actionButton.setOrigin(0.5, 0);
    actionButton.setInteractive({ useHandCursor: true });
    
    // Toggle show/hide with text update
    actionButton.on('pointerdown', () => {
      const character = this.characterManager.getCharacter(id);
      if (character) {
        if (this.characterManager.getActiveCharacterIds().includes(id)) {
        this.characterManager.hide(id);
          actionButton.setText('Show');
          actionButton.setStyle({ backgroundColor: '#43aa8b' });
      } else {
          this.characterManager.show(id, 'center');
          actionButton.setText('Hide');
          actionButton.setStyle({ backgroundColor: '#f94144' });
        }
      }
    });
    
    actionButton.on('pointerover', () => {
      actionButton.setStyle({ 
        backgroundColor: this.characterManager.getActiveCharacterIds().includes(id) ? '#ff5d5d' : '#4ecb9c'
      });
    });
    
    actionButton.on('pointerout', () => {
      actionButton.setStyle({ 
        backgroundColor: this.characterManager.getActiveCharacterIds().includes(id) ? '#f94144' : '#43aa8b'
      });
    });
    
    this.controls.add(actionButton);
  }
  
  /**
   * Create button to return to title screen
   */
  private createTitleButton(): void {
    // Create button text with improved styling
    this.titleButton = this.add.text(
      20,
      20,
      'Back to Title',
      {
        fontSize: '18px',
        backgroundColor: '#1d3557',
        padding: { left: 15, right: 15, top: 8, bottom: 8 },
        align: 'center'
      }
    );
    
    this.titleButton.setInteractive({ useHandCursor: true });
    this.titleButton.on('pointerdown', () => {
      this.scene.start('TitleScene');
    });
    
    this.titleButton.on('pointerover', () => {
      this.titleButton?.setStyle({ backgroundColor: '#2a6f97' });
    });
    
    this.titleButton.on('pointerout', () => {
      this.titleButton?.setStyle({ backgroundColor: '#1d3557' });
    });
    
    // Set the depth to ensure it's above everything else
    this.titleButton.setDepth(this.DEPTH_UI);
  }
  
  /**
   * Create a button to run dialog system tests
   */
  private createDialogTestButton(): void {
    // Create button text with improved positioning
    this.dialogTestButton = this.add.text(
      this.cameras.main.width - 120, 
      this.cameras.main.height - 40, 
      'Test Dialog System',
      {
        fontSize: '14px',
        backgroundColor: '#333',
        padding: { left: 10, right: 10, top: 6, bottom: 6 },
        fixedWidth: 150,
        align: 'center'
      }
    );
    
    this.dialogTestButton.setOrigin(0.5, 0.5);
    this.dialogTestButton.setInteractive({ useHandCursor: true });
    this.dialogTestButton.on('pointerdown', () => {
      console.log('Running dialog system tests...');
      // Run tests and capture console output
      this.captureTestResults(() => {
        runDialogSystemTests();
      });
    });
    
    this.dialogTestButton.on('pointerover', () => {
      this.dialogTestButton?.setStyle({ backgroundColor: '#555' });
    });
    
    this.dialogTestButton.on('pointerout', () => {
      this.dialogTestButton?.setStyle({ backgroundColor: '#333' });
    });
    
    // Set the depth to ensure it's above everything else
    this.dialogTestButton.setDepth(this.DEPTH_UI);
  }
  
  /**
   * Create a panel to display test results
   */
  private createTestResultsPanel(): void {
    // Create container for test results display
    this.testResultsPanel = this.add.container(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2
    );
    this.testResultsPanel.setDepth(this.DEPTH_UI_OVERLAY); // Higher than UI
    this.testResultsPanel.setVisible(false);
    
    // Create background for test results
    this.testResultsBackground = this.add.rectangle(
      0, 0, 600, 400, 0x000000, 0.9
    );
    this.testResultsBackground.setStrokeStyle(2, 0xffffff);
    this.testResultsPanel.add(this.testResultsBackground);
    
    // Create title for test results
    const titleText = this.add.text(
      0, -180, 'Dialog System Test Results', 
      { 
        fontSize: '22px',
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center'
      }
    );
    titleText.setOrigin(0.5, 0.5);
    this.testResultsPanel.add(titleText);
    
    // Create text for test results (limited height to fit in panel)
    this.testResultsText = this.add.text(
      -280, -150, '', 
      { 
        fontSize: '14px',
        color: '#ffffff',
        wordWrap: { width: 560 },
        lineSpacing: 4
      }
    );
    this.testResultsPanel.add(this.testResultsText);
    
    // Create page navigation text
    this.testResultsPageText = this.add.text(
      0, 140, 'Page 1/1', 
      { 
        fontSize: '14px',
        color: '#ffffff',
        align: 'center'
      }
    );
    this.testResultsPageText.setOrigin(0.5, 0.5);
    this.testResultsPanel.add(this.testResultsPageText);
    
    // Create previous page button
    this.testResultsPrevButton = this.add.text(
      -100, 140, '< Previous', 
      {
        fontSize: '14px',
        backgroundColor: '#444444',
        padding: { left: 10, right: 10, top: 5, bottom: 5 },
        align: 'center'
      }
    );
    this.testResultsPrevButton.setOrigin(0.5, 0.5);
    this.testResultsPrevButton.setInteractive({ useHandCursor: true });
    this.testResultsPrevButton.on('pointerdown', () => {
      this.showPreviousResultsPage();
    });
    this.testResultsPrevButton.on('pointerover', () => {
      this.testResultsPrevButton?.setStyle({ backgroundColor: '#666666' });
    });
    this.testResultsPrevButton.on('pointerout', () => {
      this.testResultsPrevButton?.setStyle({ backgroundColor: '#444444' });
    });
    this.testResultsPanel.add(this.testResultsPrevButton);
    
    // Create next page button
    this.testResultsNextButton = this.add.text(
      100, 140, 'Next >', 
      {
        fontSize: '14px',
        backgroundColor: '#444444',
        padding: { left: 10, right: 10, top: 5, bottom: 5 },
        align: 'center'
      }
    );
    this.testResultsNextButton.setOrigin(0.5, 0.5);
    this.testResultsNextButton.setInteractive({ useHandCursor: true });
    this.testResultsNextButton.on('pointerdown', () => {
      this.showNextResultsPage();
    });
    this.testResultsNextButton.on('pointerover', () => {
      this.testResultsNextButton?.setStyle({ backgroundColor: '#666666' });
    });
    this.testResultsNextButton.on('pointerout', () => {
      this.testResultsNextButton?.setStyle({ backgroundColor: '#444444' });
    });
    this.testResultsPanel.add(this.testResultsNextButton);
    
    // Create "View in Console" button
    this.testResultsConsoleButton = this.add.text(
      -130, 180, 'View Full Log in Console',
      {
        fontSize: '14px',
        backgroundColor: '#007766',
        padding: { left: 10, right: 10, top: 5, bottom: 5 },
        align: 'center'
      }
    );
    this.testResultsConsoleButton.setOrigin(0.5, 0.5);
    this.testResultsConsoleButton.setInteractive({ useHandCursor: true });
    this.testResultsConsoleButton.on('pointerdown', () => {
      // Add a visual notification that explains where to find the output
      const notification = this.add.text(
        this.cameras.main.width / 2,
        this.cameras.main.height - 50,
        'Test results logged to browser console! Open developer tools (F12) to view.',
        {
          fontSize: '16px',
          backgroundColor: '#000000',
          padding: { left: 10, right: 10, top: 5, bottom: 5 },
          color: '#ffffff',
          align: 'center'
        }
      );
      notification.setOrigin(0.5, 0.5);
      notification.setDepth(this.DEPTH_UI);
      
      // Style the console output to be more noticeable
      console.log('%c ========= DIALOG SYSTEM TEST RESULTS =========', 'background: #007766; color: white; font-size: 16px; font-weight: bold; padding: 5px; border-radius: 3px;');
      console.log('%c Click on arrows next to items to expand groups', 'font-style: italic; color: gray;');
      console.log(this.testResultsPages.join('\n'));
      console.log('%c ========= END OF TEST RESULTS =========', 'background: #007766; color: white; font-size: 16px; font-weight: bold; padding: 5px; border-radius: 3px;');
      
      // Show notification briefly, then remove it
      this.time.delayedCall(5000, () => {
        notification.destroy();
      });
    });
    this.testResultsConsoleButton.on('pointerover', () => {
      this.testResultsConsoleButton?.setStyle({ backgroundColor: '#009988' });
    });
    this.testResultsConsoleButton.on('pointerout', () => {
      this.testResultsConsoleButton?.setStyle({ backgroundColor: '#007766' });
    });
    this.testResultsPanel.add(this.testResultsConsoleButton);
    
    // Create close button
    this.testResultsCloseButton = this.add.text(
      130, 180, 'Close',
      {
        fontSize: '16px',
        backgroundColor: '#880000',
        padding: { left: 20, right: 20, top: 8, bottom: 8 },
        align: 'center'
      }
    );
    this.testResultsCloseButton.setOrigin(0.5, 0.5);
    this.testResultsCloseButton.setInteractive({ useHandCursor: true });
    this.testResultsCloseButton.on('pointerdown', () => {
      this.testResultsPanel?.setVisible(false);
    });
    this.testResultsCloseButton.on('pointerover', () => {
      this.testResultsCloseButton?.setStyle({ backgroundColor: '#aa0000' });
    });
    this.testResultsCloseButton.on('pointerout', () => {
      this.testResultsCloseButton?.setStyle({ backgroundColor: '#880000' });
    });
    this.testResultsPanel.add(this.testResultsCloseButton);
    
    // Initialize pagination controls
    this.updateResultsPageControls();
  }
  
  /**
   * Show the next page of test results
   */
  private showNextResultsPage(): void {
    if (this.currentResultsPage < this.testResultsPages.length - 1) {
      this.currentResultsPage++;
      this.updateResultsDisplay();
    }
  }
  
  /**
   * Show the previous page of test results
   */
  private showPreviousResultsPage(): void {
    if (this.currentResultsPage > 0) {
      this.currentResultsPage--;
      this.updateResultsDisplay();
    }
  }
  
  /**
   * Update the test results display based on the current page
   */
  private updateResultsDisplay(): void {
    if (this.testResultsText && this.testResultsPages.length > 0) {
      this.testResultsText.setText(this.testResultsPages[this.currentResultsPage]);
      this.updateResultsPageControls();
    }
  }
  
  /**
   * Update the page navigation controls based on current page
   */
  private updateResultsPageControls(): void {
    if (this.testResultsPageText) {
      const total = Math.max(1, this.testResultsPages.length);
      this.testResultsPageText.setText(`Page ${this.currentResultsPage + 1}/${total}`);
    }
    
    // Update previous button state
    if (this.testResultsPrevButton) {
      this.testResultsPrevButton.setAlpha(this.currentResultsPage > 0 ? 1.0 : 0.5);
      this.testResultsPrevButton.disableInteractive();
      if (this.currentResultsPage > 0) {
        this.testResultsPrevButton.setInteractive({ useHandCursor: true });
      }
    }
    
    // Update next button state
    if (this.testResultsNextButton) {
      this.testResultsNextButton.setAlpha(this.currentResultsPage < this.testResultsPages.length - 1 ? 1.0 : 0.5);
      this.testResultsNextButton.disableInteractive();
      if (this.currentResultsPage < this.testResultsPages.length - 1) {
        this.testResultsNextButton.setInteractive({ useHandCursor: true });
      }
    }
  }
  
  /**
   * Capture console output during test execution and display in panel
   * @param testFn Function that executes the tests
   */
  private captureTestResults(testFn: () => void): void {
    // Store original console methods
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;
    const originalGroup = console.group;
    const originalGroupEnd = console.groupEnd;
    
    // Capture output
    let output = '';
    let indentLevel = 0;
    
    // Override console methods to capture output
    console.log = (...args) => {
      originalLog(...args);
      const indent = '  '.repeat(indentLevel);
      output += indent + args.join(' ') + '\n';
    };
    
    console.warn = (...args) => {
      originalWarn(...args);
      const indent = '  '.repeat(indentLevel);
      output += indent + '⚠️ ' + args.join(' ') + '\n';
    };
    
    console.error = (...args) => {
      originalError(...args);
      const indent = '  '.repeat(indentLevel);
      output += indent + '❌ ' + args.join(' ') + '\n';
    };
    
    console.group = (...args) => {
      originalGroup(...args);
      const indent = '  '.repeat(indentLevel);
      output += indent + args.join(' ') + '\n';
      indentLevel++;
    };
    
    console.groupEnd = () => {
      originalGroupEnd();
      indentLevel = Math.max(0, indentLevel - 1);
    };
    
    // Run the tests
    testFn();
    
    // Restore original console methods
    console.log = originalLog;
    console.warn = originalWarn;
    console.error = originalError;
    console.group = originalGroup;
    console.groupEnd = originalGroupEnd;
    
    // Split output into pages
    this.paginateTestResults(output);
    
    // Display results
    this.currentResultsPage = 0;
    this.updateResultsDisplay();
    
    this.testResultsPanel?.setVisible(true);
  }
  
  /**
   * Split test results into pages for display
   * @param output The complete test results output
   */
  private paginateTestResults(output: string): void {
    // Clear existing pages
    this.testResultsPages = [];
    
    // Split output into lines
    const lines = output.split('\n');
    
    // Group lines into pages
    for (let i = 0; i < lines.length; i += this.LINES_PER_PAGE) {
      const pageLines = lines.slice(i, i + this.LINES_PER_PAGE);
      this.testResultsPages.push(pageLines.join('\n'));
    }
    
    // If no pages were created (empty output), add an empty page
    if (this.testResultsPages.length === 0) {
      this.testResultsPages.push('No test results to display.');
    }
  }
  
  /**
   * Serialize the test scene state
   */
  serializeState(): any {
    return {
      currentBackground: this.currentBackground,
      testResultsPanelVisible: this.testResultsPanel?.visible || false,
      testResultsPages: this.testResultsPages,
      currentResultsPage: this.currentResultsPage
    };
  }
  
  /**
   * Deserialize and apply state to the test scene
   */
  deserializeState(state: any): void {
    if (state.currentBackground) {
      this.currentBackground = state.currentBackground;
      this.setCurrentBackground(this.currentBackground);
    }
    
    if (state.testResultsPages) {
      this.testResultsPages = state.testResultsPages;
      this.currentResultsPage = state.currentResultsPage || 0;
      
      if (this.testResultsPanel) {
        if (state.testResultsPanelVisible) {
          this.updateResultsDisplay();
          this.testResultsPanel.setVisible(true);
        } else {
          this.testResultsPanel.setVisible(false);
        }
      }
    }
  }
  
  /**
   * Add help text explaining how to access the browser console
   */
  private addConsoleHelpText(): void {
    const helpText = this.add.text(
      this.cameras.main.width - 120,
      this.cameras.main.height - 15,
      'Tip: Open browser console with F12 to see full test output',
      {
        fontSize: '10px',
        color: '#ffffff',
        backgroundColor: '#333333',
        padding: { left: 6, right: 6, top: 2, bottom: 2 },
      }
    );
    helpText.setOrigin(0.5, 0.5);
    helpText.setDepth(this.DEPTH_UI); // Set appropriate depth
  }
  
  /**
   * Create UI for LLM Study Scene integration tests
   */
  private createLLMStudyTests(): void {
    const startY = 1200; // Adjust based on your layout
    const startX = this.cameras.main.width / 2;
    
    // Section title
    this.add.text(startX, startY, 'LLM Study Scene Integration Tests', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#ffffff',
      align: 'center'
    }).setOrigin(0.5, 0);
    
    // Button to launch Study Scene with test data (offline)
    const testDataButton = this.add.text(startX, startY + 50, 'Test with Local Data', {
      fontFamily: 'Arial',
      fontSize: '18px',
      color: '#ffffff',
      backgroundColor: '#00aa00',
      padding: { left: 10, right: 10, top: 5, bottom: 5 }
    }).setOrigin(0.5, 0).setInteractive({ useHandCursor: true });
    
    testDataButton.on('pointerdown', () => {
      this.launchStudySceneWithTestData();
    });
    
    // Button to test with actual LLM
    const llmButton = this.add.text(startX, startY + 100, 'Test with LLM', {
      fontFamily: 'Arial',
      fontSize: '18px',
      color: '#ffffff',
      backgroundColor: '#0000aa',
      padding: { left: 10, right: 10, top: 5, bottom: 5 }
    }).setOrigin(0.5, 0).setInteractive({ useHandCursor: true });
    
    llmButton.on('pointerdown', () => {
      this.launchStudySceneWithLLM();
    });
    
    // Button to test error handling
    const errorButton = this.add.text(startX, startY + 150, 'Test Error Handling', {
      fontFamily: 'Arial',
      fontSize: '18px',
      color: '#ffffff',
      backgroundColor: '#aa0000',
      padding: { left: 10, right: 10, top: 5, bottom: 5 }
    }).setOrigin(0.5, 0).setInteractive({ useHandCursor: true });
    
    errorButton.on('pointerdown', () => {
      this.launchStudySceneWithError();
    });
  }
  
  /**
   * Launch study scene with test data
   */
  private launchStudySceneWithTestData(): void {
    this.scene.launch('StudyScene', {
      testPhraseName: 'complete',
      phrase: '',
      romaji: '',
      translation: ''
    });
    this.scene.pause();
  }
  
  /**
   * Launch study scene with LLM integration
   */
  private launchStudySceneWithLLM(): void {
    this.scene.launch('StudyScene', {
      phrase: '日本語を勉強するのは楽しいです。',
      romaji: 'Nihongo o benkyō suru no wa tanoshii desu.',
      translation: 'Studying Japanese is fun.',
      context: 'discussing language learning',
      source: 'Test Scene'
    });
    this.scene.pause();
  }
  
  /**
   * Launch study scene with simulated error
   * This tests the error handling in the Study Scene
   */
  private launchStudySceneWithError(): void {
    // Pass an invalid phrase that will cause the LLM service to fail
    // The empty phrase should trigger validation errors
    this.scene.launch('StudyScene', {
      phrase: '',
      romaji: '',
      translation: '',
      context: 'invalid data test',
      source: 'Error Test'
    });
    this.scene.pause();
  }
}

// Register the scene with the registry
sceneRegistry.register('TestScene', TestScene); 