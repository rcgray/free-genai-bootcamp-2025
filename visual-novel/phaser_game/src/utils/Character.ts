/**
 * Character.ts
 * Handles character representation and display in the visual novel.
 * Characters have different expressions (emotions) and can be positioned at different locations on screen.
 */

import Phaser from 'phaser';

/**
 * Represents a character's position on screen
 */
export type CharacterPosition = 'left' | 'center' | 'right' | 'offscreen';

/**
 * Represents a character's emotion/expression state
 */
export interface CharacterEmotion {
  id: string;
  spriteKey: string;
  displayName: string;
}

/**
 * Interface for character configuration
 */
export interface CharacterConfig {
  id: string;
  name: string;
  defaultEmotion: string;
  emotions: Record<string, CharacterEmotion>;
  defaultPosition?: CharacterPosition;
}

/**
 * Manages a character's state and display
 */
export class Character {
  // Core character properties
  private id: string;
  private name: string;
  private emotions: Record<string, CharacterEmotion>;
  private defaultEmotion: string;
  
  // Display state
  private currentEmotion: string;
  private currentPosition: CharacterPosition;
  private sprite?: Phaser.GameObjects.Sprite;
  private scene?: Phaser.Scene;
  
  // Display constants
  private readonly DEPTH_BASE = 10;
  private readonly POSITION_OFFSETS: Record<CharacterPosition, number> = {
    left: 0.25,
    center: 0.5,
    right: 0.75,
    offscreen: 1.5 // Outside the visible area
  };
  
  /**
   * Constructor for the Character class
   * @param config - Configuration for the character
   */
  constructor(config: CharacterConfig) {
    this.id = config.id;
    this.name = config.name;
    this.emotions = config.emotions;
    this.defaultEmotion = config.defaultEmotion;
    
    // Set initial state
    this.currentEmotion = this.defaultEmotion;
    this.currentPosition = config.defaultPosition || 'offscreen';
  }
  
  /**
   * Get the character's ID
   * @returns The character's ID
   */
  getId(): string {
    return this.id;
  }
  
  /**
   * Get the character's display name
   * @returns The character's name
   */
  getName(): string {
    return this.name;
  }
  
  /**
   * Get the character's current emotion
   * @returns The current emotion ID
   */
  getCurrentEmotion(): string {
    return this.currentEmotion;
  }
  
  /**
   * Get the character's current position
   * @returns The current position
   */
  getCurrentPosition(): CharacterPosition {
    return this.currentPosition;
  }
  
  /**
   * Set the character's position and update sprite if displayed
   * @param position - New position for the character
   * @param animate - Whether to animate the position change
   */
  setPosition(position: CharacterPosition, animate: boolean = true): void {
    if (this.currentPosition === position) return;
    
    // Save the new position
    this.currentPosition = position;
    
    // Update sprite position if it exists
    if (this.sprite && this.scene) {
      const x = this.scene.cameras.main.width * this.POSITION_OFFSETS[position];
      
      if (animate) {
        // Animate to new position (only change x-coordinate)
        this.scene.tweens.add({
          targets: this.sprite,
          x: x,
          duration: 500,
          ease: 'Power2'
        });
      } else {
        // Set position immediately (only change x-coordinate)
        this.sprite.setX(x);
      }
    }
  }
  
  /**
   * Set the character's emotion and update sprite if displayed
   * @param emotionId - ID of the emotion to set
   * @param animate - Whether to animate the emotion change
   */
  setEmotion(emotionId: string, animate: boolean = true): void {
    if (!this.emotions[emotionId]) {
      console.error(`Emotion ${emotionId} not found for character ${this.id}`);
      return;
    }
    
    if (this.currentEmotion === emotionId) return;
    
    // Save the new emotion
    this.currentEmotion = emotionId;
    
    // Update sprite texture if it exists
    if (this.sprite && this.scene) {
      const emotion = this.emotions[emotionId];
      
      if (animate) {
        // Fade out
        this.scene.tweens.add({
          targets: this.sprite,
          alpha: 0.6,
          duration: 100,
          onComplete: () => {
            // Change texture
            this.sprite?.setTexture(emotion.spriteKey);
            
            // Fade in
            this.scene?.tweens.add({
              targets: this.sprite,
              alpha: 1,
              duration: 100
            });
          }
        });
      } else {
        // Change texture immediately
        this.sprite.setTexture(emotion.spriteKey);
      }
    }
  }
  
  /**
   * Display the character in the given scene
   * @param scene - Phaser scene to display the character in
   * @param depthOffset - Offset to the base depth (for layering characters)
   */
  display(scene: Phaser.Scene, depthOffset: number = 0): void {
    this.scene = scene;
    
    // Get current emotion
    const emotion = this.emotions[this.currentEmotion];
    if (!emotion) {
      console.error(`Emotion ${this.currentEmotion} not found for character ${this.id}`);
      return;
    }
    
    // Calculate horizontal position based on screen width
    const x = scene.cameras.main.width * this.POSITION_OFFSETS[this.currentPosition];
    
    // Position character at the very bottom of the screen
    // We want legs to go off the bottom for a 3/4 view
    const y = scene.cameras.main.height;
    
    // Remove existing sprite if it exists
    if (this.sprite) {
      this.sprite.destroy();
    }
    
    // Create new sprite
    this.sprite = scene.add.sprite(x, y, emotion.spriteKey);
    
    // Set origin to bottom center so the character sprite bottom aligns with screen bottom
    // Using 0.5, 1.0 ensures horizontal center with vertical bottom alignment
    this.sprite.setOrigin(0.5, 1.0);
    
    // Set depth (characters behind UI but in front of background)
    this.sprite.setDepth(this.DEPTH_BASE + depthOffset);
    
    // Add entrance animation if not offscreen
    if (this.currentPosition !== 'offscreen') {
      // Start fully transparent and slightly scaled down
      this.sprite.setAlpha(0);
      this.sprite.setScale(1, 0.95); // Scale vertically only, to 95%
      
      // Fade in and scale up animation
      // Instead of moving up and down, we'll scale up which keeps the bottom aligned
      scene.tweens.add({
        targets: this.sprite,
        alpha: 1,
        scaleY: 1, // Return to full vertical scale
        duration: 500,
        ease: 'Power2'
      });
    }
  }
  
  /**
   * Hide the character (remove from scene)
   * @param animate - Whether to animate the exit
   */
  hide(animate: boolean = true): void {
    if (!this.sprite || !this.scene) return;
    
    if (animate) {
      // Animate exit - fade out and slightly scale down
      this.scene.tweens.add({
        targets: this.sprite,
        alpha: 0,
        scaleY: 0.95, // Slightly shrink vertically
        duration: 500,
        ease: 'Power2',
        onComplete: () => {
          if (this.sprite) {
            this.sprite.destroy();
            this.sprite = undefined;
          }
        }
      });
    } else {
      // Remove immediately
      this.sprite.destroy();
      this.sprite = undefined;
    }
  }
  
  /**
   * Serialize the character's state for saving/loading
   * @returns Serialized character state
   */
  serialize(): any {
    return {
      id: this.id,
      currentEmotion: this.currentEmotion,
      currentPosition: this.currentPosition
    };
  }
  
  /**
   * Deserialize character state from saved data
   * @param data - Saved character state
   */
  deserialize(data: any): void {
    if (data.id !== this.id) {
      console.error(`Character ID mismatch: ${data.id} vs ${this.id}`);
      return;
    }
    
    this.currentEmotion = data.currentEmotion || this.defaultEmotion;
    this.currentPosition = data.currentPosition || 'offscreen';
    
    // If displayed, update the sprite
    if (this.sprite && this.scene) {
      // Update emotion
      const emotion = this.emotions[this.currentEmotion];
      if (emotion) {
        this.sprite.setTexture(emotion.spriteKey);
      }
      
      // Update position (only x-coordinate)
      const x = this.scene.cameras.main.width * this.POSITION_OFFSETS[this.currentPosition];
      this.sprite.setX(x);
      
      // Ensure origin is set correctly for bottom anchoring
      this.sprite.setOrigin(0.5, 1.0);
    }
  }

  /**
   * Get the character's sprite
   * @returns The character's sprite or undefined if not displayed
   */
  getSprite(): Phaser.GameObjects.Sprite | undefined {
    return this.sprite;
  }

  /**
   * Update the position of the character's sprite based on current position
   * @param scene - Phaser scene to update the sprite in
   * @param animate - Whether to animate the position change
   */
  updateSpritePosition(scene: Phaser.Scene, animate: boolean = true): void {
    if (!this.sprite) return;
    
    const x = scene.cameras.main.width * this.POSITION_OFFSETS[this.currentPosition];
    
    if (animate) {
      // Animate to new position
      scene.tweens.add({
        targets: this.sprite,
        x: x,
        duration: 500,
        ease: 'Power2'
      });
    } else {
      // Set position immediately
      this.sprite.setX(x);
    }
  }
} 