/**
 * train_platform.ts
 * 
 * Sample conversation data for the train platform location.
 * This is the first conversation in the game, where the player meets Kaori.
 */

import { Conversation } from '../../utils/Dialog';
import { CharacterPosition } from '../../utils/Character';

/**
 * Train platform conversation where the player meets Kaori
 */
const trainPlatformConversation: Conversation = {
  id: 'train_platform_intro',
  locationId: 'train_platform',
  dialogs: [
    {
      id: 'intro_narration',
      characterId: '', // Empty for narration
      emotion: '',
      japaneseText: '東京駅に到着しました。ホームに立っていると...',
      romaji: 'Tokyo-eki ni touchaku shimashita. Hoomu ni tatte iru to...',
      englishText: 'You\'ve arrived at Tokyo Station. As you stand on the platform...',
    },
    {
      id: 'kaori_greeting',
      characterId: 'kaori',
      emotion: 'surprised',
      position: 'center',
      japaneseText: 'こんにちは！久しぶり！元気？',
      romaji: 'Konnichiwa! Hisashiburi! Genki?',
      englishText: 'Hello! Long time no see! How are you?',
      studyableTerms: [
        {
          id: 'konnichiwa',
          japaneseText: 'こんにちは',
          startIndex: 0,
          endIndex: 5,
          romaji: 'Konnichiwa',
          englishText: 'Hello',
          grammarPoints: ['Greeting']
        },
        {
          id: 'hisashiburi',
          japaneseText: '久しぶり',
          startIndex: 6,
          endIndex: 10,
          romaji: 'Hisashiburi',
          englishText: 'Long time no see',
          grammarPoints: ['Expression']
        },
        {
          id: 'genki',
          japaneseText: '元気',
          startIndex: 11,
          endIndex: 13,
          romaji: 'Genki',
          englishText: 'Well/Healthy',
          grammarPoints: ['Adjective']
        }
      ],
      playerResponses: [
        {
          id: 'response_1',
          japaneseText: 'こんにちは！元気です！',
          romaji: 'Konnichiwa! Genki desu!',
          englishText: 'Hello! I\'m good!',
        },
        {
          id: 'response_2',
          japaneseText: 'やあ、カオリ！会えて嬉しいよ！',
          romaji: 'Yaa, Kaori! Aete ureshii yo!',
          englishText: 'Hey, Kaori! Happy to see you!',
        },
        {
          id: 'response_3',
          japaneseText: '疲れたよ。長いフライトだった。',
          romaji: 'Tsukareta yo. Nagai furaito datta.',
          englishText: 'I\'m tired. It was a long flight.',
        }
      ]
    },
    {
      id: 'kaori_response_1',
      characterId: 'kaori',
      emotion: 'default',
      position: 'center',
      japaneseText: '元気で何よりです！東京へようこそ！',
      romaji: 'Genki de nani yori desu! Tokyo e yōkoso!',
      englishText: 'I\'m glad you\'re well! Welcome to Tokyo!',
    },
    {
      id: 'kaori_follow_up',
      characterId: 'kaori',
      emotion: 'thinking',
      position: 'center',
      japaneseText: 'さあ、ホテルに行きましょうか？荷物を持ちましょうか？',
      romaji: 'Saa, hoteru ni ikimashou ka? Nimotsu wo mochimashou ka?',
      englishText: 'Now, shall we go to the hotel? Shall I help with your luggage?',
      playerResponses: [
        {
          id: 'hotel_response_1',
          japaneseText: 'はい、ホテルに行きましょう。ありがとう。',
          romaji: 'Hai, hoteru ni ikimashou. Arigatou.',
          englishText: 'Yes, let\'s go to the hotel. Thank you.',
        },
        {
          id: 'hotel_response_2',
          japaneseText: '荷物は自分で持てます。早く行きましょう。',
          romaji: 'Nimotsu wa jibun de motemasu. Hayaku ikimashou.',
          englishText: 'I can carry my luggage myself. Let\'s go quickly.',
        }
      ]
    },
    {
      id: 'kaori_hotel_agreement',
      characterId: 'kaori',
      emotion: 'default',
      position: 'center',
      japaneseText: 'わかりました。では、行きましょう！',
      romaji: 'Wakarimashita. Dewa, ikimashou!',
      englishText: 'I understand. Well then, let\'s go!',
    }
  ],
  background: 'train_platform',
  characters: ['kaori'],
  currentDialogIndex: 0
};

export default trainPlatformConversation; 