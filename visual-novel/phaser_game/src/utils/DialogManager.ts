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
  
  /**
   * Constructor for the DialogManager class
   */
  constructor() {
    // Make the dialog manager globally accessible for debugging
    (window as any).dialogManager = this;
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
   * Load a conversation
   * @param conversation - Conversation data to load
   * @returns DialogResult indicating success or failure
   */
  loadConversation(conversation: Conversation): DialogResult {
    try {
      // Validate conversation data
      if (!conversation.id || !conversation.dialogs || !conversation.dialogs.length) {
        return {
          success: false,
          message: `Invalid conversation data: missing id or dialogs`
        };
      }
      
      // Store the conversation
      this.conversations.set(conversation.id, conversation);
      
      // Initialize conversation state if it doesn't exist
      if (!this.conversationStates.has(conversation.id)) {
        this.conversationStates.set(conversation.id, {
          currentDialogIndex: 0,
          playerChoices: {}
        });
      }
      
      return {
        success: true,
        message: `Conversation ${conversation.id} loaded successfully`
      };
    } catch (error) {
      console.error('Error loading conversation:', error);
      return {
        success: false,
        message: `Error loading conversation: ${error}`
      };
    }
  }
  
  /**
   * Start a conversation
   * @param conversationId - ID of the conversation to start
   * @returns DialogResult indicating success or failure
   */
  startConversation(conversationId: string): DialogResult {
    try {
      const conversation = this.conversations.get(conversationId);
      
      if (!conversation) {
        return {
          success: false,
          message: `Conversation ${conversationId} not found`
        };
      }
      
      // Set as current conversation
      this.currentConversationId = conversationId;
      
      // Get or initialize conversation state
      const state = this.conversationStates.get(conversationId) || {
        currentDialogIndex: 0,
        playerChoices: {}
      };
      
      // Reset to beginning if requested
      state.currentDialogIndex = 0;
      
      // Display the first dialog
      this.displayCurrentDialog();
      
      // Set background if specified
      if (conversation.background && this.scene) {
        // This will be handled by the scene itself
        // The scene should listen for background changes
      }
      
      return {
        success: true,
        message: `Conversation ${conversationId} started successfully`
      };
    } catch (error) {
      console.error('Error starting conversation:', error);
      return {
        success: false,
        message: `Error starting conversation: ${error}`
      };
    }
  }
  
  /**
   * Display the current dialog based on conversation state
   * @returns DialogResult indicating success or failure
   */
  displayCurrentDialog(): DialogResult {
    if (!this.currentConversationId) {
      return {
        success: false,
        message: 'No active conversation'
      };
    }
    
    const conversation = this.conversations.get(this.currentConversationId);
    if (!conversation) {
      return {
        success: false,
        message: `Current conversation ${this.currentConversationId} not found`
      };
    }
    
    const state = this.conversationStates.get(this.currentConversationId);
    if (!state) {
      return {
        success: false,
        message: `State for conversation ${this.currentConversationId} not found`
      };
    }
    
    if (state.currentDialogIndex >= conversation.dialogs.length) {
      return {
        success: false,
        message: `End of conversation reached`
      };
    }
    
    // Get the current dialog
    const currentDialog = conversation.dialogs[state.currentDialogIndex];
    
    // Update character display if this is character dialog (not narration)
    if (currentDialog.characterId && this.characterManager) {
      // Show the character with specified emotion and position
      const position = currentDialog.position || 'center';
      this.characterManager.show(
        currentDialog.characterId,
        position,
        currentDialog.emotion
      );
    }
    
    // Call the display dialog callback
    if (this.onDialogDisplay) {
      this.onDialogDisplay(currentDialog);
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
    if (!this.currentConversationId) {
      return {
        success: false,
        message: 'No active conversation'
      };
    }
    
    const conversation = this.conversations.get(this.currentConversationId);
    if (!conversation) {
      return {
        success: false,
        message: `Current conversation ${this.currentConversationId} not found`
      };
    }
    
    const state = this.conversationStates.get(this.currentConversationId);
    if (!state) {
      return {
        success: false,
        message: `State for conversation ${this.currentConversationId} not found`
      };
    }
    
    // Get the current dialog
    const currentDialog = conversation.dialogs[state.currentDialogIndex];
    
    // If the current dialog has choices, show them
    if (currentDialog.playerResponses && currentDialog.playerResponses.length > 0) {
      if (this.onShowChoices) {
        this.onShowChoices(currentDialog.playerResponses);
      }
      
      return {
        success: true,
        message: 'Choices displayed',
        data: currentDialog.playerResponses
      };
    }
    
    // No choices, advance to next dialog
    state.currentDialogIndex++;
    
    // Check if we've reached the end of the conversation
    if (state.currentDialogIndex >= conversation.dialogs.length) {
      if (this.onDialogComplete) {
        this.onDialogComplete();
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
    if (!this.currentConversationId) {
      return {
        success: false,
        message: 'No active conversation'
      };
    }
    
    const conversation = this.conversations.get(this.currentConversationId);
    if (!conversation) {
      return {
        success: false,
        message: `Current conversation ${this.currentConversationId} not found`
      };
    }
    
    const state = this.conversationStates.get(this.currentConversationId);
    if (!state) {
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
    
    // Check if we've reached the end of the conversation
    if (state.currentDialogIndex >= conversation.dialogs.length) {
      if (this.onDialogComplete) {
        this.onDialogComplete();
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
   * Create study data from dialog text
   * @param text - Text to create study data from
   * @param context - Context information for the study data
   * @returns Study phrase data
   */
  createStudyData(text: string, context: string): StudyPhraseData {
    // Extract Japanese, furigana, and translation
    const japaneseText = this.extractJapaneseText(text);
    const furigana = this.extractFurigana(text);
    const translation = this.extractTranslation(text);
    
    return {
      phrase: japaneseText,
      furigana: furigana,
      translation: translation,
      context: context,
      source: context
    };
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
   * Serialize the manager state for saving/loading
   * @returns Serialized dialog manager state
   */
  serialize(): SerializedDialogState {
    const conversationStates: Record<string, ConversationState> = {};
    
    this.conversationStates.forEach((state, id) => {
      conversationStates[id] = state;
    });
    
    return {
      currentConversationId: this.currentConversationId,
      conversations: conversationStates
    };
  }
  
  /**
   * Deserialize and apply previously serialized state
   * @param state - Serialized dialog manager state
   */
  deserialize(state: SerializedDialogState): void {
    // Restore conversation states
    if (state.conversations) {
      this.conversationStates.clear();
      
      Object.entries(state.conversations).forEach(([id, conversationState]) => {
        this.conversationStates.set(id, conversationState);
      });
    }
    
    // Restore current conversation
    this.currentConversationId = state.currentConversationId;
    
    // If there's an active conversation, display the current dialog
    if (this.currentConversationId) {
      this.displayCurrentDialog();
    }
  }
} 