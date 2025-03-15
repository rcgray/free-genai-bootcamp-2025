/**
 * hotel_lobby.ts
 * 
 * Sample conversation data for the hotel lobby location.
 * This conversation takes place in a Japanese hotel lobby as a reflective
 * conclusion to the adventure.
 */

import { Conversation } from '../../utils/Dialog';
import { CharacterPosition } from '../../utils/Character';

/**
 * Hotel lobby conversation where the player reflects on their day in Japan
 * and what they've learned
 */
const hotelLobbyConversation: Conversation = {
  id: 'hotel_lobby_reflection',
  locationId: 'hotel_lobby',
  dialogs: [
    {
      id: 'lobby_narration',
      characterId: '', // Empty for narration
      emotion: '',
      japaneseText: 'ホテルのロビーに到着しました。長い一日でしたが、とても楽しかったです。日本について多くのことを学びました。',
      romaji: 'Hoteru no robī ni tōchaku shimashita. Nagai ichinichi deshita ga, totemo tanoshikatta desu. Nihon ni tsuite ōku no koto o manabimashita.',
      englishText: 'You arrived at the hotel lobby. It was a long day, but very enjoyable. You learned a lot about Japan.',
    },
    {
      id: 'reflection_1',
      characterId: '', // Empty for narration/reflection
      emotion: '',
      japaneseText: '電車に乗って、おいしい食べ物を食べて、公園で友達に会いました。日本語もたくさん練習しました。',
      romaji: 'Densha ni notte, oishii tabemono o tabete, kōen de tomodachi ni aimashita. Nihongo mo takusan renshū shimashita.',
      englishText: 'You rode the train, ate delicious food, and met friends at the park. You also practiced a lot of Japanese.',
      studyableTerms: [
        {
          id: 'densha',
          japaneseText: '電車',
          startIndex: 0,
          endIndex: 2,
          romaji: 'Densha',
          englishText: 'Train',
          grammarPoints: ['Noun']
        },
        {
          id: 'notte',
          japaneseText: '乗って',
          startIndex: 4,
          endIndex: 7,
          romaji: 'Notte',
          englishText: 'Ride/take (te-form)',
          grammarPoints: ['Verb te-form']
        },
        {
          id: 'oishii',
          japaneseText: 'おいしい',
          startIndex: 9,
          endIndex: 13,
          romaji: 'Oishii',
          englishText: 'Delicious',
          grammarPoints: ['I-adjective']
        },
        {
          id: 'tabemono',
          japaneseText: '食べ物',
          startIndex: 13,
          endIndex: 16,
          romaji: 'Tabemono',
          englishText: 'Food',
          grammarPoints: ['Compound noun']
        },
        {
          id: 'koen',
          japaneseText: '公園',
          startIndex: 23,
          endIndex: 25,
          romaji: 'Kōen',
          englishText: 'Park',
          grammarPoints: ['Noun']
        },
        {
          id: 'tomodachi',
          japaneseText: '友達',
          startIndex: 27,
          endIndex: 29,
          romaji: 'Tomodachi',
          englishText: 'Friend',
          grammarPoints: ['Noun']
        },
        {
          id: 'aimashita',
          japaneseText: '会いました',
          startIndex: 31,
          endIndex: 35,
          romaji: 'Aimashita',
          englishText: 'Met (past tense)',
          grammarPoints: ['Verb past tense']
        },
        {
          id: 'takusan',
          japaneseText: 'たくさん',
          startIndex: 41,
          endIndex: 45,
          romaji: 'Takusan',
          englishText: 'A lot/many',
          grammarPoints: ['Adverb']
        },
        {
          id: 'renshu',
          japaneseText: '練習',
          startIndex: 45,
          endIndex: 47,
          romaji: 'Renshū',
          englishText: 'Practice',
          grammarPoints: ['Verbal noun']
        }
      ],
    },
    {
      id: 'reflection_2',
      characterId: '', // Empty for narration/reflection
      emotion: '',
      japaneseText: '明日はどこに行きますか？もっと東京を探検したいです。日本語をもっと勉強しましょう。',
      romaji: 'Ashita wa doko ni ikimasu ka? Motto Tokyo o tanken shitai desu. Nihongo o motto benkyō shimashō.',
      englishText: 'Where will you go tomorrow? You want to explore more of Tokyo. Let\'s study more Japanese.',
      studyableTerms: [
        {
          id: 'ashita',
          japaneseText: '明日',
          startIndex: 0,
          endIndex: 2,
          romaji: 'Ashita',
          englishText: 'Tomorrow',
          grammarPoints: ['Noun', 'Time expression']
        },
        {
          id: 'doko',
          japaneseText: 'どこ',
          startIndex: 4,
          endIndex: 6,
          romaji: 'Doko',
          englishText: 'Where',
          grammarPoints: ['Question word']
        },
        {
          id: 'ikimasu',
          japaneseText: '行きます',
          startIndex: 8,
          endIndex: 12,
          romaji: 'Ikimasu',
          englishText: 'Will go',
          grammarPoints: ['Verb', 'Masu-form']
        },
        {
          id: 'motto',
          japaneseText: 'もっと',
          startIndex: 15,
          endIndex: 18,
          romaji: 'Motto',
          englishText: 'More',
          grammarPoints: ['Adverb']
        },
        {
          id: 'tanken',
          japaneseText: '探検',
          startIndex: 23,
          endIndex: 25,
          romaji: 'Tanken',
          englishText: 'Exploration',
          grammarPoints: ['Verbal noun']
        },
        {
          id: 'shitai',
          japaneseText: 'したい',
          startIndex: 25,
          endIndex: 28,
          romaji: 'Shitai',
          englishText: 'Want to do',
          grammarPoints: ['Tai-form', 'Desire form']
        },
        {
          id: 'benkyou',
          japaneseText: '勉強',
          startIndex: 39,
          endIndex: 41,
          romaji: 'Benkyō',
          englishText: 'Study',
          grammarPoints: ['Verbal noun']
        },
        {
          id: 'shimashou',
          japaneseText: 'しましょう',
          startIndex: 41,
          endIndex: 46,
          romaji: 'Shimashō',
          englishText: 'Let\'s do',
          grammarPoints: ['Volitional form', 'Suggestion']
        }
      ],
      playerResponses: [
        {
          id: 'response_diary',
          japaneseText: '日記を書きます。「今日は楽しかったです。明日も楽しみです。」',
          romaji: 'Nikki o kakimasu. "Kyō wa tanoshikatta desu. Ashita mo tanoshimi desu."',
          englishText: 'I\'ll write in my diary. "Today was fun. I\'m looking forward to tomorrow too."',
        },
        {
          id: 'response_plans',
          japaneseText: '明日の計画を立てます。もっと日本語を練習したいです。',
          romaji: 'Ashita no keikaku o tatemasu. Motto nihongo o renshū shitai desu.',
          englishText: 'I\'ll make plans for tomorrow. I want to practice more Japanese.',
        },
        {
          id: 'response_sleep',
          japaneseText: '疲れました。すぐに寝ます。おやすみなさい。',
          romaji: 'Tsukaremashita. Sugu ni nemasu. Oyasuminasai.',
          englishText: 'I\'m tired. I\'ll sleep right away. Good night.',
        }
      ]
    },
    {
      id: 'ending_narration',
      characterId: '', // Empty for narration
      emotion: '',
      japaneseText: '今日は素晴らしい一日でした。日本語を学ぶのは大変ですが、とても面白いです。明日はきっともっと上手になるでしょう。おやすみなさい。',
      romaji: 'Kyō wa subarashii ichinichi deshita. Nihongo o manabu no wa taihen desu ga, totemo omoshiroi desu. Ashita wa kitto motto jōzu ni naru deshō. Oyasuminasai.',
      englishText: 'Today was a wonderful day. Learning Japanese is challenging, but very interesting. Tomorrow you\'ll surely get better. Good night.',
      studyableTerms: [
        {
          id: 'kyou',
          japaneseText: '今日',
          startIndex: 0,
          endIndex: 2,
          romaji: 'Kyō',
          englishText: 'Today',
          grammarPoints: ['Noun', 'Time expression']
        },
        {
          id: 'subarashii',
          japaneseText: '素晴らしい',
          startIndex: 4,
          endIndex: 9,
          romaji: 'Subarashii',
          englishText: 'Wonderful/excellent',
          grammarPoints: ['I-adjective']
        },
        {
          id: 'ichinichi',
          japaneseText: '一日',
          startIndex: 9,
          endIndex: 11,
          romaji: 'Ichinichi',
          englishText: 'One day/whole day',
          grammarPoints: ['Noun', 'Time expression']
        },
        {
          id: 'manabu',
          japaneseText: '学ぶ',
          startIndex: 19,
          endIndex: 21,
          romaji: 'Manabu',
          englishText: 'To learn',
          grammarPoints: ['Verb', 'Godan verb']
        },
        {
          id: 'taihen',
          japaneseText: '大変',
          startIndex: 25,
          endIndex: 27,
          romaji: 'Taihen',
          englishText: 'Difficult/challenging',
          grammarPoints: ['Na-adjective']
        },
        {
          id: 'omoshiroi',
          japaneseText: '面白い',
          startIndex: 35,
          endIndex: 38,
          romaji: 'Omoshiroi',
          englishText: 'Interesting',
          grammarPoints: ['I-adjective']
        },
        {
          id: 'kitto',
          japaneseText: 'きっと',
          startIndex: 45,
          endIndex: 48,
          romaji: 'Kitto',
          englishText: 'Surely/definitely',
          grammarPoints: ['Adverb']
        },
        {
          id: 'jouzu',
          japaneseText: '上手',
          startIndex: 50,
          endIndex: 52,
          romaji: 'Jōzu',
          englishText: 'Skilled/good at',
          grammarPoints: ['Na-adjective']
        },
        {
          id: 'naru',
          japaneseText: 'なる',
          startIndex: 54,
          endIndex: 56,
          romaji: 'Naru',
          englishText: 'To become',
          grammarPoints: ['Verb', 'Godan verb']
        },
        {
          id: 'deshou',
          japaneseText: 'でしょう',
          startIndex: 56,
          endIndex: 60,
          romaji: 'Deshō',
          englishText: 'Probably/I think',
          grammarPoints: ['Auxiliary verb', 'Conjecture']
        },
        {
          id: 'oyasuminasai',
          japaneseText: 'おやすみなさい',
          startIndex: 62,
          endIndex: 69,
          romaji: 'Oyasuminasai',
          englishText: 'Good night',
          grammarPoints: ['Set phrase', 'Greeting']
        }
      ]
    }
  ],
  background: 'hotel_lobby',
  characters: [], // Explicitly empty array - no characters in this scene
  currentDialogIndex: 0
};

export default hotelLobbyConversation; 