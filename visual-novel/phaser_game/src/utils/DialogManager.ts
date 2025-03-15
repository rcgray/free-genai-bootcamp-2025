/**
 * DialogManager.ts
 * 
 * Manages dialog for the game, including conversation loading, progression,
 * and integration with the character system.
 */

import Phaser from 'phaser';
import { 
  Conversation, 
  Dialog, 
  PlayerResponse, 
  ConversationState,
  DialogResult 
} from './Dialog';
import { CharacterManager } from './CharacterManager';
import { StudyPhraseData } from '../scenes/StudyScene';
import trainPlatformConversation from '../data/conversations/train_platform';
import insideTrainConversation from '../data/conversations/inside_train';
import outsideRestaurantConversation from '../data/conversations/outside_restaurant';
import insideRestaurantConversation from '../data/conversations/inside_restaurant';
import parkLawnConversation from '../data/conversations/park_lawn';
import parkBenchConversation from '../data/conversations/park_bench';
import outsideMallConversation from '../data/conversations/outside_mall';
import clothingStoreConversation from '../data/conversations/clothing_store';
import hotelLobbyConversation from '../data/conversations/hotel_lobby';

/**
 * Serialized dialog state for the manager
 */
export interface SerializedDialogState {
  currentConversationId: string | null;
  conversations: Record<string, ConversationState>;
}

/**
 * Manages dialog interactions in the game
 */
export class DialogManager {
  // Current scene reference
  private scene?: Phaser.Scene;
  
  // Character manager reference for character integration
  private characterManager?: CharacterManager;
  
  // Loaded conversations
  private conversations: Map<string, Conversation> = new Map();
  
  // Current active conversation
  private currentConversationId: string | null = null;
  
  // Conversation states (for saving/loading)
  private conversationStates: Map<string, ConversationState> = new Map();
  
  // Callback functions
  private onDialogDisplay?: (dialog: Dialog) => void;
  private onDialogComplete?: () => void;
  private onShowChoices?: (responses: PlayerResponse[]) => void;
  
  // Track the currently shown characters to prevent unnecessary reanimation
  private shownCharacters: Set<string> = new Set();
  
  constructor() {
    // Register available conversations
    this.registerConversation(trainPlatformConversation);
    this.registerConversation(insideTrainConversation);
    this.registerConversation(outsideRestaurantConversation);
    this.registerConversation(insideRestaurantConversation);
    this.registerConversation(parkLawnConversation);
    this.registerConversation(parkBenchConversation);
    this.registerConversation(outsideMallConversation);
    this.registerConversation(clothingStoreConversation);
    this.registerConversation(hotelLobbyConversation);
  }
  
  /**
   * Set the current scene for dialog display
   * @param scene - Phaser scene instance
   */
  setScene(scene: Phaser.Scene): void {
    this.scene = scene;
  }
  
  /**
   * Set the character manager for integration
   * @param characterManager - Character manager instance
   */
  setCharacterManager(characterManager: CharacterManager): void {
    this.characterManager = characterManager;
  }
  
  /**
   * Register event callbacks
   * @param callbacks - Object containing callback functions
   */
  setCallbacks(callbacks: {
    onDialogDisplay?: (dialog: Dialog) => void;
    onDialogComplete?: () => void;
    onShowChoices?: (responses: PlayerResponse[]) => void;
  }): void {
    this.onDialogDisplay = callbacks.onDialogDisplay;
    this.onDialogComplete = callbacks.onDialogComplete;
    this.onShowChoices = callbacks.onShowChoices;
  }
  
  /**
   * Register a conversation with the manager
   */
  registerConversation(conversation: Conversation): void {
    this.conversations.set(conversation.id, conversation);
    
    // Initialize the conversation state if it doesn't exist
    if (!this.conversationStates.has(conversation.id)) {
      this.conversationStates.set(conversation.id, {
        currentDialogIndex: 0,
        playerChoices: {}
      });
    }
  }
  
  /**
   * Get a conversation by its ID
   * @param conversationId - ID of the conversation to retrieve
   * @returns The conversation object or undefined if not found
   */
  getConversation(conversationId: string): Conversation | undefined {
    return this.conversations.get(conversationId);
  }
  
  /**
   * Start a conversation by location ID
   */
  startConversationByLocation(locationId: string): boolean {
    // Find the first conversation that matches this location
    for (const conversation of this.conversations.values()) {
      if (conversation.locationId === locationId) {
        return this.startConversation(conversation.id);
      }
    }
    console.warn(`No conversation found for location: ${locationId}`);
    return false;
  }
  
  /**
   * Start a conversation by its ID
   */
  startConversation(conversationId: string): boolean {
    console.log(`Starting conversation: ${conversationId}`);
    
    const conversation = this.conversations.get(conversationId);
    if (!conversation) {
      console.warn(`Conversation not found: ${conversationId}`);
      return false;
    }
    
    // Reset dialog index and set as current
    this.currentConversationId = conversationId;
    
    // Get or initialize conversation state
    let state = this.conversationStates.get(conversationId);
    if (!state) {
      state = {
        currentDialogIndex: 0,
        playerChoices: {}
      };
      this.conversationStates.set(conversationId, state);
    }
    
    // Reset to beginning 
    state.currentDialogIndex = 0;
    
    // Clear shown characters when starting a new conversation
    this.shownCharacters.clear();
    
    // Check the characters array to determine if we should hide all characters
    if (this.characterManager && conversation.characters !== undefined) {
      // If the conversation explicitly defines an empty characters array, hide all characters
      if (conversation.characters.length === 0) {
        console.log(`Starting conversation ${conversationId} with no characters - hiding all characters`);
        this.characterManager.hideAll();
      }
    }
    
    // Display the first dialog
    this.displayCurrentDialog();
    
    return true;
  }
  
  /**
   * Display the current dialog based on conversation state
   * @returns DialogResult indicating success or failure
   */
  displayCurrentDialog(): DialogResult {
    if (!this.currentConversationId) {
      console.error('No active conversation');
      return {
        success: false,
        message: 'No active conversation'
      };
    }
    
    const conversation = this.conversations.get(this.currentConversationId);
    if (!conversation) {
      console.error(`Current conversation ${this.currentConversationId} not found`);
      return {
        success: false,
        message: `Current conversation ${this.currentConversationId} not found`
      };
    }
    
    const state = this.conversationStates.get(this.currentConversationId);
    if (!state) {
      console.error(`State for conversation ${this.currentConversationId} not found`);
      return {
        success: false,
        message: `State for conversation ${this.currentConversationId} not found`
      };
    }
    
    if (state.currentDialogIndex >= conversation.dialogs.length) {
      console.warn(`End of conversation reached`);
      return {
        success: false,
        message: `End of conversation reached`
      };
    }
    
    // Get the current dialog
    const currentDialog = conversation.dialogs[state.currentDialogIndex];
    console.log(`Displaying dialog: ${currentDialog.id} - ${currentDialog.japaneseText}`);
    
    // Update character display if this is character dialog (not narration)
    if (currentDialog.characterId && this.characterManager) {
      const position = currentDialog.position || 'center';
      const characterId = currentDialog.characterId;
      
      console.log(`Character dialog from: ${characterId}, position: ${position}, emotion: ${currentDialog.emotion || 'default'}`);
      
      try {
        // Check if this character is already shown
        if (this.shownCharacters.has(characterId)) {
          console.log(`Character ${characterId} is already shown, updating emotion/position`);
          // Only update emotion and position without triggering a full show animation
          if (currentDialog.emotion) {
            this.characterManager.setEmotion(characterId, currentDialog.emotion);
          }
          if (position) {
            this.characterManager.setPosition(characterId, position);
          }
        } else {
          console.log(`Character ${characterId} not shown yet, showing with full animation`);
          // First time showing this character, show with full animation
          this.characterManager.show(characterId, position, currentDialog.emotion);
          // Track that this character is now shown
          this.shownCharacters.add(characterId);
        }
      } catch (error) {
        console.error(`Error updating character: ${error}`);
      }
    }
    
    // Call the display dialog callback
    if (this.onDialogDisplay) {
      console.log('Calling onDialogDisplay callback');
      this.onDialogDisplay(currentDialog);
    } else {
      console.warn('No onDialogDisplay callback registered');
    }
    
    return {
      success: true,
      data: currentDialog
    };
  }
  
  /**
   * Advance to the next dialog or show choices if present
   * @returns DialogResult indicating success or failure
   */
  advanceDialog(): DialogResult {
    console.log('Advancing dialog');
    
    if (!this.currentConversationId) {
      console.error('No active conversation');
      return {
        success: false,
        message: 'No active conversation'
      };
    }
    
    const conversation = this.conversations.get(this.currentConversationId);
    if (!conversation) {
      console.error(`Current conversation ${this.currentConversationId} not found`);
      return {
        success: false,
        message: `Current conversation ${this.currentConversationId} not found`
      };
    }
    
    const state = this.conversationStates.get(this.currentConversationId);
    if (!state) {
      console.error(`State for conversation ${this.currentConversationId} not found`);
      return {
        success: false,
        message: `State for conversation ${this.currentConversationId} not found`
      };
    }
    
    // Get the current dialog
    const currentDialog = conversation.dialogs[state.currentDialogIndex];
    
    // If the current dialog has choices, show them
    if (currentDialog.playerResponses && currentDialog.playerResponses.length > 0) {
      console.log(`Dialog has ${currentDialog.playerResponses.length} choices, showing choices`);
      if (this.onShowChoices) {
        this.onShowChoices(currentDialog.playerResponses);
      } else {
        console.warn('No onShowChoices callback registered');
      }
      
      return {
        success: true,
        message: 'Choices displayed',
        data: currentDialog.playerResponses
      };
    }
    
    // No choices, advance to next dialog
    state.currentDialogIndex++;
    console.log(`Advanced to dialog index: ${state.currentDialogIndex}`);
    
    // Check if we've reached the end of the conversation
    if (state.currentDialogIndex >= conversation.dialogs.length) {
      console.log('End of conversation reached');
      if (this.onDialogComplete) {
        this.onDialogComplete();
      } else {
        console.warn('No onDialogComplete callback registered');
      }
      
      return {
        success: true,
        message: 'End of conversation reached'
      };
    }
    
    // Display the next dialog
    return this.displayCurrentDialog();
  }
  
  /**
   * Handle a player choice selection
   * @param responseId - ID of the selected response
   * @returns DialogResult indicating success or failure
   */
  selectChoice(responseId: string): DialogResult {
    console.log(`Selecting choice: ${responseId}`);
    
    if (!this.currentConversationId) {
      console.error('No active conversation');
      return {
        success: false,
        message: 'No active conversation'
      };
    }
    
    const conversation = this.conversations.get(this.currentConversationId);
    if (!conversation) {
      console.error(`Current conversation ${this.currentConversationId} not found`);
      return {
        success: false,
        message: `Current conversation ${this.currentConversationId} not found`
      };
    }
    
    const state = this.conversationStates.get(this.currentConversationId);
    if (!state) {
      console.error(`State for conversation ${this.currentConversationId} not found`);
      return {
        success: false,
        message: `State for conversation ${this.currentConversationId} not found`
      };
    }
    
    // Get the current dialog
    const currentDialog = conversation.dialogs[state.currentDialogIndex];
    
    // Store the player's choice
    state.playerChoices[currentDialog.id] = responseId;
    
    // Advance to the next dialog
    state.currentDialogIndex++;
    console.log(`Advanced to dialog index: ${state.currentDialogIndex} after choice selection`);
    
    // Check if we've reached the end of the conversation
    if (state.currentDialogIndex >= conversation.dialogs.length) {
      console.log('End of conversation reached after choice selection');
      if (this.onDialogComplete) {
        this.onDialogComplete();
      } else {
        console.warn('No onDialogComplete callback registered');
      }
      
      return {
        success: true,
        message: 'End of conversation reached'
      };
    }
    
    // Display the next dialog
    return this.displayCurrentDialog();
  }
  
  /**
   * Get the current dialog for study purposes
   * @returns The current dialog or null if not available
   */
  getCurrentDialog(): Dialog | null {
    if (!this.currentConversationId) {
      return null;
    }
    
    const conversation = this.conversations.get(this.currentConversationId);
    if (!conversation) {
      return null;
    }
    
    const state = this.conversationStates.get(this.currentConversationId);
    if (!state || state.currentDialogIndex >= conversation.dialogs.length) {
      return null;
    }
    
    return conversation.dialogs[state.currentDialogIndex];
  }
  
  /**
   * Serialize the dialog manager state
   */
  serialize(): SerializedDialogState {
    // Convert the maps to plain objects for serialization
    const conversationStates: Record<string, ConversationState> = {};
    this.conversationStates.forEach((state, key) => {
      conversationStates[key] = state;
    });
    
    return {
      currentConversationId: this.currentConversationId,
      conversations: conversationStates
    };
  }
  
  /**
   * Deserialize the dialog manager state
   */
  deserialize(state: SerializedDialogState): void {
    // Restore the current conversation
    this.currentConversationId = state.currentConversationId;
    
    // Clear existing conversation states
    this.conversationStates.clear();
    
    // Restore conversation states
    Object.entries(state.conversations).forEach(([key, value]) => {
      this.conversationStates.set(key, value);
    });
  }
} 