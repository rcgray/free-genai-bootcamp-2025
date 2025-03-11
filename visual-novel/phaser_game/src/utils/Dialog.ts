/**
 * Dialog.ts
 * 
 * Defines the core data structures for the dialog system.
 * These interfaces match the specifications in docs/features/Dialog-System.md
 */

import { CharacterPosition } from './Character';

/**
 * Represents a complete conversation for a specific location or sub-location.
 * A conversation consists of a series of dialog entries that occur sequentially.
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
 * Represents a single text entry by a character, possibly with player response options.
 * If characterId is an empty string, the dialog is considered narration.
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
 * Represents a choice the player can make in response to a dialog.
 */
export interface PlayerResponse {
  id: string;                   // Unique identifier for this response
  japaneseText: string;         // Text in Japanese
  romaji: string;               // Romaji pronunciation
  englishText: string;          // English translation
  studyableTerms?: StudyableTerm[]; // Terms that can be studied from this response
}

/**
 * Represents a phrase or word that can be selected for study.
 */
export interface StudyableTerm {
  id: string;                   // Unique identifier for this term
  japaneseText: string;         // Text in Japanese
  startIndex: number;           // Start index in the original text
  endIndex: number;             // End index in the original text
  romaji: string;               // Romaji pronunciation
  englishText: string;          // English translation
  grammarPoints?: string[];     // Grammar points associated with this term
}

/**
 * Represents the state of a conversation, including dialog progression and player choices.
 */
export interface ConversationState {
  currentDialogIndex: number;
  playerChoices: Record<string, string>; // Maps dialogId to selected responseId
}

/**
 * Result of a dialog processing operation.
 */
export interface DialogResult {
  success: boolean;
  message?: string;
  data?: any;
} 