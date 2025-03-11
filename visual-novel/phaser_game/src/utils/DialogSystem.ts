/**
 * DialogSystem.ts
 * Core data structures and utilities for the dialog system.
 * This file defines the interfaces and utility functions for the dialog system,
 * which is responsible for managing conversations, dialogs, and player responses.
 */

import { CharacterPosition } from './Character';

/**
 * Represents a term or phrase that can be studied by the player.
 */
export interface StudyableTerm {
  id: string;                 // Unique identifier for this term
  japaneseText: string;       // Text in Japanese
  startIndex: number;         // Start index in the original text
  endIndex: number;           // End index in the original text
  romaji: string;             // Romaji pronunciation
  englishText: string;        // English translation
  grammarPoints?: string[];   // Grammar points associated with this term
}

/**
 * Represents a player response option to a dialog.
 */
export interface PlayerResponse {
  id: string;                   // Unique identifier for this response
  japaneseText: string;         // Text in Japanese
  romaji: string;               // Romaji pronunciation
  englishText: string;          // English translation
  studyableTerms?: StudyableTerm[]; // Terms that can be studied from this response
}

/**
 * Represents a single dialog entry by a character or narration.
 */
export interface Dialog {
  id: string;                   // Unique identifier for this dialog entry
  characterId: string;          // ID of the speaking character (empty string for narration)
  emotion: string;              // Character's emotion/expression (if applicable)
  position?: CharacterPosition; // Character's position on screen (if applicable)
  japaneseText: string;         // Text in Japanese
  romaji: string;               // Romaji pronunciation
  englishText: string;          // English translation
  playerResponses?: PlayerResponse[]; // Optional player choices
  studyableTerms?: StudyableTerm[]; // Terms that can be studied from this dialog
}

/**
 * Represents the complete dialog for a specific location or sub-location.
 */
export interface Conversation {
  id: string;                   // Unique identifier for the conversation
  locationId: string;           // Location where this conversation occurs
  subLocationId?: string;       // Optional sub-location identifier
  dialogs: Dialog[];            // Series of dialog entries
  background: string;           // Background image for this conversation
  characters: string[];         // Characters present in this conversation
  currentDialogIndex: number;   // Current position in the dialog sequence
}

/**
 * Represents the state of a conversation including player choices.
 */
export interface ConversationState {
  currentDialogIndex: number;
  playerChoices: Record<string, string>; // Maps dialogId to selected responseId
}

/**
 * DialogSystem class for managing conversations and dialogs.
 */
export class DialogSystem {
  private conversations: Map<string, Conversation> = new Map();
  private currentConversationId: string | null = null;
  private conversationStates: Map<string, ConversationState> = new Map();

  /**
   * Register a new conversation.
   * @param conversation The conversation to register
   */
  public registerConversation(conversation: Conversation): void {
    this.conversations.set(conversation.id, conversation);
    // Initialize conversation state if it doesn't exist
    if (!this.conversationStates.has(conversation.id)) {
      this.conversationStates.set(conversation.id, {
        currentDialogIndex: 0,
        playerChoices: {}
      });
    }
  }

  /**
   * Get a conversation by ID.
   * @param id The ID of the conversation to get
   * @returns The conversation or undefined if not found
   */
  public getConversation(id: string): Conversation | undefined {
    return this.conversations.get(id);
  }

  /**
   * Get the current conversation.
   * @returns The current conversation or undefined if none is set
   */
  public getCurrentConversation(): Conversation | undefined {
    if (!this.currentConversationId) return undefined;
    return this.conversations.get(this.currentConversationId);
  }

  /**
   * Set the current conversation.
   * @param id The ID of the conversation to set as current
   * @returns True if the conversation was found and set, false otherwise
   */
  public setCurrentConversation(id: string): boolean {
    if (!this.conversations.has(id)) return false;
    this.currentConversationId = id;
    return true;
  }

  /**
   * Get the current dialog in the current conversation.
   * @returns The current dialog or undefined if no current conversation or all dialogs completed
   */
  public getCurrentDialog(): Dialog | undefined {
    const conversation = this.getCurrentConversation();
    if (!conversation) return undefined;
    
    const state = this.conversationStates.get(conversation.id);
    if (!state) return undefined;
    
    if (state.currentDialogIndex >= conversation.dialogs.length) return undefined;
    
    return conversation.dialogs[state.currentDialogIndex];
  }

  /**
   * Advance to the next dialog in the current conversation.
   * @returns The next dialog or undefined if no more dialogs
   */
  public advanceDialog(): Dialog | undefined {
    const conversation = this.getCurrentConversation();
    if (!conversation) return undefined;
    
    const state = this.conversationStates.get(conversation.id);
    if (!state) return undefined;
    
    state.currentDialogIndex++;
    
    // Update the conversation's current dialog index for serialization purposes
    conversation.currentDialogIndex = state.currentDialogIndex;
    
    return this.getCurrentDialog();
  }

  /**
   * Select a player response for the current dialog.
   * @param dialogId The ID of the dialog being responded to
   * @param responseId The ID of the selected response
   * @returns True if the response was registered, false otherwise
   */
  public selectResponse(dialogId: string, responseId: string): boolean {
    const conversation = this.getCurrentConversation();
    if (!conversation) return false;
    
    const state = this.conversationStates.get(conversation.id);
    if (!state) return false;
    
    state.playerChoices[dialogId] = responseId;
    return true;
  }

  /**
   * Get a player's selected response for a dialog.
   * @param dialogId The ID of the dialog
   * @returns The ID of the selected response or undefined if none selected
   */
  public getSelectedResponse(dialogId: string): string | undefined {
    const conversation = this.getCurrentConversation();
    if (!conversation) return undefined;
    
    const state = this.conversationStates.get(conversation.id);
    if (!state) return undefined;
    
    return state.playerChoices[dialogId];
  }

  /**
   * Reset the current conversation to the beginning.
   * @returns True if a current conversation exists and was reset
   */
  public resetCurrentConversation(): boolean {
    const conversation = this.getCurrentConversation();
    if (!conversation) return false;
    
    const state = this.conversationStates.get(conversation.id);
    if (!state) return false;
    
    state.currentDialogIndex = 0;
    state.playerChoices = {};
    
    // Update the conversation's current dialog index for serialization purposes
    conversation.currentDialogIndex = 0;
    
    return true;
  }

  /**
   * Serialize the dialog system state for storage.
   * @returns A serialized representation of the dialog system state
   */
  public serialize(): any {
    const serializedConversations: Record<string, any> = {};
    this.conversations.forEach((conversation, id) => {
      serializedConversations[id] = {
        ...conversation,
        currentDialogIndex: this.conversationStates.get(id)?.currentDialogIndex || 0
      };
    });
    
    const serializedStates: Record<string, ConversationState> = {};
    this.conversationStates.forEach((state, id) => {
      serializedStates[id] = { ...state };
    });
    
    return {
      conversations: serializedConversations,
      states: serializedStates,
      currentConversationId: this.currentConversationId
    };
  }

  /**
   * Deserialize and restore dialog system state.
   * @param data The serialized state to restore
   */
  public deserialize(data: any): void {
    this.conversations.clear();
    this.conversationStates.clear();
    this.currentConversationId = data.currentConversationId;
    
    // Restore conversations
    Object.entries(data.conversations).forEach(([id, conversationData]: [string, any]) => {
      this.conversations.set(id, conversationData as Conversation);
    });
    
    // Restore conversation states
    Object.entries(data.states).forEach(([id, stateData]: [string, any]) => {
      this.conversationStates.set(id, stateData as ConversationState);
    });
  }

  /**
   * Identify and extract studyable terms from a string of text.
   * This is a placeholder implementation that would be replaced with actual
   * term identification logic in a more advanced implementation.
   * 
   * @param text The text to analyze for studyable terms
   * @param startIndex The starting index in the original text
   * @returns An array of identified studyable terms
   */
  public identifyStudyableTerms(text: string, startIndex: number = 0): StudyableTerm[] {
    // This is a placeholder implementation
    // In a real implementation, we would analyze the text and identify
    // actual terms that could be studied based on grammar points, vocabulary, etc.
    const terms: StudyableTerm[] = [];
    
    // For now, we'll just create a single term for the entire text
    if (text.trim().length > 0) {
      terms.push({
        id: `term_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        japaneseText: text,
        startIndex: startIndex,
        endIndex: startIndex + text.length,
        romaji: "Sample romaji", // This would be properly generated
        englishText: "Sample translation", // This would be properly generated
        grammarPoints: ["Sample grammar point"] // This would be properly defined
      });
    }
    
    return terms;
  }
}

// Create and export an instance for global use
export const dialogSystem = new DialogSystem(); 