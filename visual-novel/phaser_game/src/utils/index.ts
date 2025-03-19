/**
 * index.ts
 * Barrel export file for utility classes
 */

// Character system
export { Character } from './Character';
export type { CharacterPosition } from './Character';
export { CharacterManager } from './CharacterManager';

// Dialog system
export type { Dialog, PlayerResponse, Conversation, ConversationState, StudyableTerm } from './Dialog';
export { DialogManager } from './DialogManager';
export { DialogSystem } from './DialogSystem';

// Japanese text handling
export { JapaneseTextWrapper } from './JapaneseTextWrapper';
export { FuriganaRenderer } from './FuriganaRenderer';
export type { FuriganaOptions, KanjiWithReading } from './FuriganaRenderer';

// Game management
export { GameStateManager } from './GameStateManager';
export type { StatefulScene } from './StatefulScene';

// Asset management
export { default as AssetManager } from './AssetManager';

// Debug utilities
export {
  debugGameInstance,
  debugSceneManager,
  debugScene,
  checkPropertyExists,
  monitorProperty
} from './PhaserDebug';

export * from './LLMService'; 