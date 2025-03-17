/**
 * outside_restaurant.ts
 * 
 * Sample conversation data for the outside restaurant location.
 * This conversation happens when the player and Kaori arrive at a restaurant.
 */

import { Conversation } from '../../utils/Dialog';
import { CharacterPosition } from '../../utils/Character';

/**
 * Outside restaurant conversation where the player and Kaori discuss food options
 */
const outsideRestaurantConversation: Conversation = {
  id: 'outside_restaurant_food',
  locationId: 'outside_restaurant',
  dialogs: [
    {
      id: 'restaurant_narration',
      characterId: '', // Empty for narration
      emotion: '',
      japaneseText: 'カオリさんと一緒にレストランに到着しました。看板には「和食処 さくら」と書いてあります。',
      romaji: 'Kaori-san to issho ni resutoran ni tōchaku shimashita. Kanban niwa "Washoku-dokoro Sakura" to kaite arimasu.',
      englishText: 'You arrived at the restaurant with Kaori. The sign says "Japanese Restaurant Sakura".',
    },
    {
      id: 'kaori_restaurant',
      characterId: 'kaori',
      emotion: 'default',
      position: 'center',
      japaneseText: 'このレストランは日本の伝統的な料理が食べられますよ。和食は好きですか？',
      romaji: 'Kono resutoran wa Nihon no dentō-teki na ryōri ga taberaremasu yo. Washoku wa suki desu ka?',
      englishText: 'You can eat traditional Japanese cuisine at this restaurant. Do you like Japanese food?',
      studyableTerms: [
        {
          id: 'washoku',
          japaneseText: '和食',
          startIndex: 22,
          endIndex: 24,
          romaji: 'Washoku',
          englishText: 'Japanese cuisine',
          grammarPoints: ['Noun']
        },
        {
          id: 'suki',
          japaneseText: '好き',
          startIndex: 26,
          endIndex: 28,
          romaji: 'Suki',
          englishText: 'Like (something)',
          grammarPoints: ['Na-adjective']
        }
      ],
      playerResponses: [
        {
          id: 'response_like',
          japaneseText: '少し食べたことがあります。寿司は知っていますが、他の料理はよく分かりません。',
          romaji: 'Sukoshi tabeta koto ga arimasu. Sushi wa shitte imasu ga, hoka no ryōri wa yoku wakarimasen.',
          englishText: 'I\'ve eaten it a little. I know about sushi, but I don\'t know much about other dishes.',
        },
        {
          id: 'response_never',
          japaneseText: '実は、あまり食べたことがありません。何がおすすめですか？',
          romaji: 'Jitsu wa, amari tabeta koto ga arimasen. Nani ga osusume desu ka?',
          englishText: 'Actually, I haven\'t eaten it much. What do you recommend?',
        }
      ]
    },
    {
      id: 'kaori_recommendation',
      characterId: 'kaori',
      emotion: 'thinking',
      position: 'center',
      japaneseText: 'そうですね…初めてなら、定食がいいかもしれません。色々な料理が少しずつ食べられますよ。',
      romaji: 'Sō desu ne... Hajimete nara, teishoku ga ii kamo shiremasen. Iroirona ryōri ga sukoshi zutsu taberaremasu yo.',
      englishText: 'Let\'s see... For a first time, a set meal might be good. You can try various dishes in small portions.',
      studyableTerms: [
        {
          id: 'teishoku',
          japaneseText: '定食',
          startIndex: 9,
          endIndex: 11,
          romaji: 'Teishoku',
          englishText: 'Set meal',
          grammarPoints: ['Noun']
        }
      ],
    },
    {
      id: 'kaori_ask_enter',
      characterId: 'kaori',
      emotion: 'default',
      position: 'center',
      japaneseText: '入りましょうか？今はちょうどランチタイムなので、混んでいるかもしれませんよ。',
      romaji: 'Hairimashou ka? Ima wa chōdo ranchi-taimu nanode, konde iru kamo shiremasen yo.',
      englishText: 'Shall we go in? It might be crowded now since it\'s lunchtime.',
      playerResponses: [
        {
          id: 'response_enter',
          japaneseText: 'はい、入りましょう。お腹が空きました。',
          romaji: 'Hai, hairimashou. Onaka ga sukimashita.',
          englishText: 'Yes, let\'s go in. I\'m hungry.',
        },
        {
          id: 'response_wait',
          japaneseText: '混んでいるかもしれませんが、大丈夫です。ぜひ入りましょう。',
          romaji: 'Konde iru kamo shiremasen ga, daijōbu desu. Zehi hairimashou.',
          englishText: 'It might be crowded, but that\'s okay. Let\'s definitely go in.',
        }
      ]
    },
    {
      id: 'kaori_enter',
      characterId: 'kaori',
      emotion: 'default',
      position: 'center',
      japaneseText: 'じゃあ、入りましょう。「いらっしゃいませ」と言われたら、「よろしくお願いします」と答えてみてください。',
      romaji: 'Jaa, hairimashou. "Irasshaimase" to iwaretara, "Yoroshiku onegaishimasu" to kotaete mite kudasai.',
      englishText: 'Well then, let\'s go in. When they say "Welcome", try responding with "Pleased to meet you".',
      studyableTerms: [
        {
          id: 'irasshaimase',
          japaneseText: 'いらっしゃいませ',
          startIndex: 8,
          endIndex: 16,
          romaji: 'Irasshaimase',
          englishText: 'Welcome (to our shop)',
          grammarPoints: ['Greeting', 'Polite form']
        },
        {
          id: 'yoroshiku',
          japaneseText: 'よろしくお願いします',
          startIndex: 24,
          endIndex: 34,
          romaji: 'Yoroshiku onegaishimasu',
          englishText: 'Please treat me well/Nice to meet you',
          grammarPoints: ['Expression', 'Polite form']
        }
      ]
    }
  ],
  background: 'outside_restaurant',
  characters: ['kaori'],
  currentDialogIndex: 0
};

export default outsideRestaurantConversation; 