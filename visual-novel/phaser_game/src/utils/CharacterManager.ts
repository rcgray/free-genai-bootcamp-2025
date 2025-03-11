/**
 * CharacterManager.ts
 * Manages all character instances in the game.
 * Provides methods for creating, displaying, and interacting with characters.
 */

import Phaser from 'phaser';
import { Character, CharacterConfig, CharacterPosition } from './Character';

/**
 * Serialized character state for the manager
 */
export interface SerializedCharacterState {
  characters: Record<string, any>;
  activeCharacters: string[];
}

/**
 * Manages all characters in the game
 */
export class CharacterManager {
  // Character registry
  private characters: Map<string, Character> = new Map();
  
  // Currently active (displayed) characters
  private activeCharacters: Set<string> = new Set();
  
  // Current scene reference
  private scene?: Phaser.Scene;
  
  // Default character configurations from game design
  private defaultConfigs: Record<string, CharacterConfig> = {
    kaori: {
      id: 'kaori',
      name: 'Kaori',
      defaultEmotion: 'default',
      emotions: {
        default: { id: 'default', spriteKey: 'kaori_default', displayName: 'Kaori' },
        worried: { id: 'worried', spriteKey: 'kaori_worried', displayName: 'Kaori (Worried)' },
        surprised: { id: 'surprised', spriteKey: 'kaori_surprised', displayName: 'Kaori (Surprised)' },
        thinking: { id: 'thinking', spriteKey: 'kaori_thinking', displayName: 'Kaori (Thinking)' }
      }
    },
    takashi: {
      id: 'takashi',
      name: 'Takashi',
      defaultEmotion: 'default',
      emotions: {
        default: { id: 'default', spriteKey: 'takashi_default', displayName: 'Takashi' }
      }
    },
    shopkeeper: {
      id: 'shopkeeper',
      name: 'Shopkeeper',
      defaultEmotion: 'default',
      emotions: {
        default: { id: 'default', spriteKey: 'shopkeeper_default', displayName: 'Shopkeeper' }
      }
    }
  };
  
  // Default z-index depth for characters
  private characterDepth: number = 10;
  
  /**
   * Constructor for the CharacterManager class
   */
  constructor() {
    // Initialize with default character configurations
    this.initializeDefaultCharacters();
    
    // Make the character manager globally accessible for test purposes
    (window as any).characterManager = this;
  }
  
  /**
   * Initialize default characters defined in the game design
   */
  private initializeDefaultCharacters(): void {
    Object.values(this.defaultConfigs).forEach(config => {
      this.registerCharacter(config);
    });
  }
  
  /**
   * Register a new character with the manager
   * @param config - Character configuration
   * @returns The registered character instance
   */
  registerCharacter(config: CharacterConfig): Character {
    const character = new Character(config);
    this.characters.set(config.id, character);
    return character;
  }
  
  /**
   * Get a character by ID
   * @param id - Character ID
   * @returns Character instance or undefined if not found
   */
  getCharacter(id: string): Character | undefined {
    return this.characters.get(id);
  }
  
  /**
   * Set the current scene for character display
   * @param scene - Phaser scene instance
   */
  setScene(scene: Phaser.Scene): void {
    this.scene = scene;
    
    // Display any active characters in the new scene
    this.refreshCharacters();
  }
  
  /**
   * Get the current scene
   * @returns Current Phaser scene instance
   */
  getScene(): Phaser.Scene | undefined {
    return this.scene;
  }
  
  /**
   * Set the depth value for all characters managed by this instance
   * @param depth The z-index depth value for characters
   */
  public setCharacterDepth(depth: number): void {
    this.characterDepth = depth;
    
    // Update active characters by rehiding/reshowing them
    // We can't directly set depth on Character objects
    this.refreshCharacterDepth();
  }
  
  /**
   * Refresh the depth of all active characters
   * This recreates the sprites with the current depth value
   */
  private refreshCharacterDepth(): void {
    // Only proceed if we have a valid scene
    if (!this.scene) return;
    
    const scene = this.scene; // Store in local variable to satisfy TypeScript
    
    // Get currently active characters
    const activeIds = [...this.activeCharacters];
    
    // Hide all characters (removes sprites)
    activeIds.forEach(id => this.hide(id));
    
    // Re-show all characters (creates new sprites with current depth)
    activeIds.forEach(id => {
      const character = this.getCharacter(id);
      if (character) {
        character.display(scene, this.characterDepth);
        this.activeCharacters.add(id);
      }
    });
  }
  
  /**
   * Show a character at the specified position and with the specified emotion
   * @param id The ID of the character to show
   * @param position Optional position to place the character (defaults to character's current position)
   * @param emotion Optional emotion to display (defaults to character's current emotion)
   * @returns True if the character was successfully shown, false otherwise
   */
  show(id: string, position?: CharacterPosition, emotion?: string): boolean {
    const character = this.getCharacter(id);
    if (!character || !this.scene) return false;
    
    // Set position and emotion if provided
    if (position) character.setPosition(position);
    if (emotion) character.setEmotion(emotion);
    
    // Display character with proper depth
    character.display(this.scene, this.characterDepth);
    
    // Add to active characters
    this.activeCharacters.add(id);
    
    return true;
  }
  
  /**
   * Hide a character from the scene
   * @param id - Character ID
   * @param animate - Whether to animate the exit
   * @returns Whether the character was successfully hidden
   */
  hide(id: string, animate: boolean = true): boolean {
    const character = this.characters.get(id);
    if (!character) {
      console.error(`Cannot hide character ${id}: Character not found`);
      return false;
    }
    
    // Hide the character (note: this only removes the sprite, but doesn't change the character's state)
    character.hide(animate);
    
    // Remove from active set
    this.activeCharacters.delete(id);
    return true;
  }
  
  /**
   * Change a character's emotion
   * @param id - Character ID
   * @param emotion - Emotion to set
   * @param animate - Whether to animate the change
   * @returns Whether the emotion was successfully changed
   */
  setEmotion(id: string, emotion: string, animate: boolean = true): boolean {
    const character = this.characters.get(id);
    if (!character) {
      console.error(`Cannot set emotion for character ${id}: Character not found`);
      return false;
    }
    
    character.setEmotion(emotion, animate);
    return true;
  }
  
  /**
   * Change a character's position
   * @param id - Character ID
   * @param position - Position to set
   * @param animate - Whether to animate the change
   * @returns Whether the position was successfully changed
   */
  setPosition(id: string, position: CharacterPosition, animate: boolean = true): boolean {
    const character = this.characters.get(id);
    if (!character) {
      console.error(`Cannot set position for character ${id}: Character not found`);
      return false;
    }
    
    // Set the character's position, regardless of whether it's active
    character.setPosition(position, animate);
    
    return true;
  }
  
  /**
   * Hide all characters from the scene
   * @param animate - Whether to animate the exits
   */
  hideAll(animate: boolean = true): void {
    this.activeCharacters.forEach(id => {
      this.hide(id, animate);
    });
  }
  
  /**
   * Refresh display of all active characters
   * Called when the scene changes or when characters need to be redrawn
   */
  refreshCharacters(): void {
    if (!this.scene) return;
    
    // Create array from active characters set to preserve display order
    const activeCharacterIds = Array.from(this.activeCharacters);
    
    // Clear active set (will be repopulated in show())
    this.activeCharacters.clear();
    
    // Display each character
    activeCharacterIds.forEach((id, _index) => {
      const character = this.characters.get(id);
      if (character) {
        // Use current emotion and position
        const position = character.getCurrentPosition();
        if (position !== 'offscreen') {
          this.show(id, position);
        }
      }
    });
  }
  
  /**
   * Serialize manager state for saving/loading
   * @returns Serialized character manager state
   */
  serialize(): SerializedCharacterState {
    const characterStates: Record<string, any> = {};
    
    this.characters.forEach((character, id) => {
      characterStates[id] = character.serialize();
    });
    
    return {
      characters: characterStates,
      activeCharacters: Array.from(this.activeCharacters)
    };
  }
  
  /**
   * Deserialize manager state from saved data
   * @param state - Saved character manager state
   */
  deserialize(state: SerializedCharacterState): void {
    // Reset active characters
    this.activeCharacters.clear();
    
    // Restore character states
    if (state.characters) {
      Object.entries(state.characters).forEach(([id, characterState]) => {
        const character = this.characters.get(id);
        if (character) {
          character.deserialize(characterState);
        }
      });
    }
    
    // Restore active characters
    if (state.activeCharacters) {
      state.activeCharacters.forEach(id => {
        this.activeCharacters.add(id);
      });
    }
    
    // Refresh display if scene is set
    if (this.scene) {
      this.refreshCharacters();
    }
  }
  
  /**
   * Find a character by name (case-insensitive)
   * Helpful for dialog processing
   * @param name - Character name to find
   * @returns Character instance or undefined if not found
   */
  findCharacterByName(name: string): Character | undefined {
    const normalizedName = name.toLowerCase();
    
    for (const character of this.characters.values()) {
      if (character.getName().toLowerCase() === normalizedName) {
        return character;
      }
    }
    
    return undefined;
  }
  
  /**
   * Check if a character exists
   * @param id - Character ID to check
   * @returns Whether the character exists
   */
  hasCharacter(id: string): boolean {
    return this.characters.has(id);
  }
  
  /**
   * Get all registered characters
   * @returns Array of all character instances
   */
  getAllCharacters(): Character[] {
    return Array.from(this.characters.values());
  }
  
  /**
   * Get all active character IDs
   * @returns Array of active character IDs
   */
  getActiveCharacterIds(): string[] {
    return Array.from(this.activeCharacters);
  }
} 