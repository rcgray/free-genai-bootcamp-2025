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
  
  /**
   * Constructor for the CharacterManager class
   */
  constructor() {
    // Initialize with default character configurations
    this.initializeDefaultCharacters();
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
   * Show a character in the current scene
   * @param id - Character ID
   * @param position - Position to display the character (optional if character has a saved position)
   * @param emotion - Emotion to display (defaults to the character's default emotion)
   * @returns Whether the character was successfully shown
   */
  show(id: string, position?: CharacterPosition, emotion?: string): boolean {
    const character = this.characters.get(id);
    if (!character || !this.scene) {
      console.error(`Cannot show character ${id}: Character not found or no scene set`);
      return false;
    }
    
    // Only update position if explicitly provided, otherwise use the character's current position
    // This allows position to persist even when character is hidden
    if (position) {
      character.setPosition(position, false);
    }
    
    // Set emotion (if provided) and position
    if (emotion) {
      character.setEmotion(emotion, false);
    }
    
    // Display the character
    const depthOffset = this.activeCharacters.size; // Layer characters based on display order
    character.display(this.scene, depthOffset);
    
    // Mark as active
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
    activeCharacterIds.forEach((id, index) => {
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