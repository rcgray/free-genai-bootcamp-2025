/**
 * BaseScene.ts
 * Base scene class that provides common functionality for all game scenes.
 * This serves as the foundation for the Title, VN, and Study scenes.
 */

import Phaser from 'phaser';

// Type definitions for game state
export interface GameSettings {
  textSpeed: number;
  difficultyLevel: string;
  showFurigana: boolean;
  showRomaji: boolean;
}

export interface GameState {
  currentScene: string;
  dialogHistory: any[];
  currentDialogIndex: number;
  characters: Record<string, any>;
  currentBackground: string | null;
  choiceHistory: any[];
  studiedPhrases: any[];
  settings: GameSettings;
}

export interface SceneData {
  gameState?: GameState;
  [key: string]: any;
}

export default class BaseScene extends Phaser.Scene {
  protected gameState: GameState | null;
  protected transitionDuration: number;
  protected isTransitioning: boolean;
  private loadingText?: Phaser.GameObjects.Text;

  /**
   * Constructor for the BaseScene class
   * @param config - Configuration object for the scene
   */
  constructor(config: Phaser.Types.Scenes.SettingsConfig) {
    super(config);
    
    // Game state object that will be shared across scenes
    this.gameState = null;
    
    // Scene transition properties
    this.transitionDuration = 500; // milliseconds
    this.isTransitioning = false;
  }
  
  /**
   * Initialize the scene with data passed from another scene
   * @param data - Data passed from another scene
   */
  init(data: SceneData): void {
    console.log(`Initializing ${this.scene.key} scene`);
    
    // Initialize or update game state
    this.gameState = data.gameState || this.createDefaultGameState();
    
    // Set up any scene-specific initialization
    this.setupScene(data);
  }
  
  /**
   * Create a default game state object if none is provided
   * @returns Default game state object
   */
  createDefaultGameState(): GameState {
    return {
      // Current scene and position
      currentScene: this.scene.key,
      
      // Dialog and narrative state
      dialogHistory: [],
      currentDialogIndex: 0,
      
      // Character state
      characters: {},
      
      // Background state
      currentBackground: null,
      
      // Player choices and consequences
      choiceHistory: [],
      
      // Study progress
      studiedPhrases: [],
      
      // Game settings
      settings: {
        textSpeed: 50, // Words per minute
        difficultyLevel: 'beginner',
        showFurigana: true,
        showRomaji: true
      }
    };
  }
  
  /**
   * Setup method to be overridden by child classes
   * @param data - Data passed from another scene
   */
  setupScene(_data: SceneData): void {
    // To be implemented by child classes
  }
  
  /**
   * Preload assets for the scene
   * This method should be overridden by child classes
   */
  preload(): void {
    // Display loading text
    this.createLoadingText();
    
    // To be extended by child classes
  }
  
  /**
   * Create loading text to display during asset loading
   */
  createLoadingText(): void {
    this.loadingText = this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      'Loading...',
      {
        fontFamily: 'Arial',
        fontSize: '28px',
        color: '#ffffff'
      }
    );
    this.loadingText.setOrigin(0.5, 0.5);
    
    // Set up loading events
    this.load.on('progress', (value: number) => {
      if (this.loadingText) {
        this.loadingText.setText(`Loading: ${Math.floor(value * 100)}%`);
      }
    });
    
    this.load.on('complete', () => {
      if (this.loadingText) {
        this.loadingText.setText('Ready!');
        this.loadingText.destroy();
      }
    });
  }
  
  /**
   * Create the scene elements
   * This method should be overridden by child classes
   */
  create(): void {
    console.log(`Creating ${this.scene.key} scene`);
    
    // To be implemented by child classes
  }
  
  /**
   * Update method called on each frame
   * This method should be overridden by child classes if needed
   * @param time - Current time
   * @param delta - Time since last frame
   */
  update(_time: number, _delta: number): void {
    // To be implemented by child classes if needed
  }
  
  /**
   * Transition to another scene
   * @param targetScene - Key of the target scene
   * @param data - Data to pass to the target scene
   */
  transitionTo(targetScene: string, data: SceneData = {}): void {
    if (this.isTransitioning || !this.gameState) return;
    
    this.isTransitioning = true;
    console.log(`Transitioning from ${this.scene.key} to ${targetScene}`);
    
    // Update game state
    this.gameState.currentScene = targetScene;
    
    // Create data object to pass to the next scene
    const sceneData: SceneData = {
      gameState: this.gameState,
      ...data
    };
    
    // Create a camera fade effect
    this.cameras.main.fadeOut(this.transitionDuration);
    
    this.cameras.main.once('camerafadeoutcomplete', () => {
      // Start the new scene and stop this one
      this.scene.start(targetScene, sceneData);
      this.isTransitioning = false;
    });
  }
  
  /**
   * Save the current game state
   * This is a placeholder for future implementation
   */
  saveGameState(): void {
    if (!this.gameState) return;
    
    console.log('Saving game state...');
    // In the future, this will save to TinyDB or localStorage
    
    // For now, just send to Streamlit for debugging
    this.sendToStreamlit({
      action: 'saveGameState',
      gameState: this.gameState
    });
  }
  
  /**
   * Send data to Streamlit
   * @param data - Data to send to Streamlit
   */
  sendToStreamlit(data: any): void {
    const win = window as any;
    if (win.sendToStreamlit) {
      win.sendToStreamlit(data);
    } else {
      console.log('sendToStreamlit function not available, data:', data);
    }
  }
} 