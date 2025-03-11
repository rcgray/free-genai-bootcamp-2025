/**
 * MockDialogData.ts
 * Contains mock dialog data for testing and development purposes.
 * Based on the game design in docs/Game-Design.md
 */

import { Conversation, Dialog, PlayerResponse } from './DialogSystem';

/**
 * Generate a unique ID for dialog entries.
 * @returns A unique ID string
 */
function generateId(prefix: string = 'id'): string {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
}

/**
 * Create a mock dialog entry.
 * @param characterId The ID of the speaking character (empty for narration)
 * @param emotion The character's emotion
 * @param japaneseText The dialog text in Japanese
 * @param romaji Romaji pronunciation of the Japanese text
 * @param englishText English translation of the Japanese text
 * @param playerResponses Optional player response choices
 * @returns A Dialog object
 */
export function createMockDialog(
  characterId: string,
  emotion: string,
  japaneseText: string,
  romaji: string,
  englishText: string,
  playerResponses?: PlayerResponse[]
): Dialog {
  return {
    id: generateId('dialog'),
    characterId,
    emotion,
    japaneseText,
    romaji,
    englishText,
    playerResponses,
    studyableTerms: []
  };
}

/**
 * Create a mock player response.
 * @param japaneseText The response text in Japanese
 * @param romaji Romaji pronunciation of the Japanese text
 * @param englishText English translation of the Japanese text
 * @returns A PlayerResponse object
 */
export function createMockResponse(
  japaneseText: string,
  romaji: string,
  englishText: string
): PlayerResponse {
  return {
    id: generateId('response'),
    japaneseText,
    romaji,
    englishText,
    studyableTerms: []
  };
}

/**
 * Mock conversation for the train platform location.
 */
export const trainPlatformConversation: Conversation = {
  id: 'train_platform_conversation',
  locationId: 'train_station',
  subLocationId: 'train_platform',
  background: 'train_platform',
  characters: ['kaori'],
  currentDialogIndex: 0,
  dialogs: [
    // Narration to set the scene
    createMockDialog(
      '', // Empty character ID for narration
      'default',
      '成田空港に着きました。カオリさんが駅で待っています。',
      'Narita kūkō ni tsukimashita. Kaori-san ga eki de matte imasu.',
      'You have arrived at Narita Airport. Kaori is waiting for you at the station.',
      undefined // No player responses for narration
    ),
    
    // Kaori greeting
    createMockDialog(
      'kaori',
      'default',
      'こんにちは！久しぶり！元気？',
      'Konnichiwa! Hisashiburi! Genki?',
      'Hello! Long time no see! How are you?',
      [
        createMockResponse(
          'こんにちは！元気です！',
          'Konnichiwa! Genki desu!',
          'Hello! I\'m good!'
        ),
        createMockResponse(
          'やあ、カオリ！会えて嬉しいよ！',
          'Yaa, Kaori! Aete ureshii yo!',
          'Hey, Kaori! Happy to see you!'
        ),
        createMockResponse(
          '疲れたよ。長いフライトだった。',
          'Tsukareta yo. Nagai furaito datta.',
          'I\'m tired. It was a long flight.'
        )
      ]
    ),
    
    // Kaori's response to greeting
    createMockDialog(
      'kaori',
      'surprised',
      '日本へようこそ！東京に行きましょう。',
      'Nihon e yōkoso! Tōkyō ni ikimashō.',
      'Welcome to Japan! Let\'s go to Tokyo.',
      undefined
    ),
    
    // Kaori explains train tickets
    createMockDialog(
      'kaori',
      'thinking',
      '切符を買いましょう。山手線で東京駅まで行きます。',
      'Kippu o kaimashō. Yamanote-sen de Tōkyō-eki made ikimasu.',
      'Let\'s buy tickets. We\'ll go to Tokyo Station on the Yamanote Line.',
      [
        createMockResponse(
          '切符はいくらですか？',
          'Kippu wa ikura desu ka?',
          'How much is the ticket?'
        ),
        createMockResponse(
          '山手線は何色ですか？',
          'Yamanote-sen wa nani-iro desu ka?',
          'What color is the Yamanote Line?'
        )
      ]
    ),
    
    // Kaori answers about tickets
    createMockDialog(
      'kaori',
      'default',
      '東京駅まで210円です。山手線は緑色です。',
      'Tōkyō-eki made nihyaku jū en desu. Yamanote-sen wa midori-iro desu.',
      'It\'s 210 yen to Tokyo Station. The Yamanote Line is green.',
      undefined
    )
  ]
};

/**
 * Mock conversation for the inside train location.
 */
export const insideTrainConversation: Conversation = {
  id: 'inside_train_conversation',
  locationId: 'train_station',
  subLocationId: 'inside_train',
  background: 'inside_train',
  characters: ['kaori'],
  currentDialogIndex: 0,
  dialogs: [
    // Narration to set the scene
    createMockDialog(
      '', // Empty character ID for narration
      'default',
      '山手線の電車に乗りました。東京に向かっています。',
      'Yamanote-sen no densha ni norimashita. Tōkyō ni mukatte imasu.',
      'You boarded the Yamanote Line train. You are heading to Tokyo.',
      undefined // No player responses for narration
    ),
    
    // Kaori explains trains
    createMockDialog(
      'kaori',
      'thinking',
      '山手線は東京の主要な駅を回る電車です。',
      'Yamanote-sen wa Tōkyō no shuyō na eki o mawaru densha desu.',
      'The Yamanote Line is a train that goes around the major stations in Tokyo.',
      [
        createMockResponse(
          '渋谷に行きたいです。',
          'Shibuya ni ikitai desu.',
          'I want to go to Shibuya.'
        ),
        createMockResponse(
          '東京の電車システムは複雑ですね。',
          'Tōkyō no densha shisutemu wa fukuzatsu desu ne.',
          'Tokyo\'s train system is complicated, isn\'t it?'
        ),
        createMockResponse(
          '山手線は何色ですか？',
          'Yamanote-sen wa nani-iro desu ka?',
          'What color is the Yamanote Line?'
        )
      ]
    ),
    
    // Kaori responds about Shibuya
    createMockDialog(
      'kaori',
      'default',
      'はい、渋谷に行きましょう。そこでランチを食べましょう。',
      'Hai, Shibuya ni ikimashō. Soko de ranchi o tabemashō.',
      'Yes, let\'s go to Shibuya. Let\'s have lunch there.',
      undefined
    )
  ]
};

/**
 * Export all mock conversations for easy access.
 */
export const mockConversations: Conversation[] = [
  trainPlatformConversation,
  insideTrainConversation
]; 