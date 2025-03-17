/**
 * inside_restaurant.ts
 * 
 * Sample conversation data for the inside restaurant location.
 * This conversation takes place inside the Japanese restaurant with Kaori.
 */

import { Conversation } from '../../utils/Dialog';
import { CharacterPosition } from '../../utils/Character';

/**
 * Inside restaurant conversation where the player and Kaori order food
 */
const insideRestaurantConversation: Conversation = {
  id: 'inside_restaurant_ordering',
  locationId: 'inside_restaurant',
  dialogs: [
    {
      id: 'restaurant_interior_narration',
      characterId: '', // Empty for narration
      emotion: '',
      japaneseText: 'レストランの中は賑やかですが、伝統的な日本の雰囲気があります。壁には美しい浮世絵が飾られています。',
      romaji: 'Resutoran no naka wa nigiyaka desu ga, dentō-teki na Nihon no fun\'iki ga arimasu. Kabe ni wa utsukushii ukiyo-e ga kazararete imasu.',
      englishText: 'The inside of the restaurant is lively but has a traditional Japanese atmosphere. Beautiful ukiyo-e paintings are displayed on the walls.',
    },
    {
      id: 'waitress_greeting',
      characterId: 'waitress',
      emotion: 'default',
      position: 'right',
      japaneseText: 'いらっしゃいませ。お二人様ですか？',
      romaji: 'Irasshaimase. O-futari-sama desu ka?',
      englishText: 'Welcome. Table for two?',
      studyableTerms: [
        {
          id: 'o-futari-sama',
          japaneseText: 'お二人様',
          startIndex: 8,
          endIndex: 12,
          romaji: 'O-futari-sama',
          englishText: 'Two people (polite)',
          grammarPoints: ['Honorific prefix', 'Counter', 'Polite suffix']
        }
      ],
    },
    {
      id: 'kaori_reply',
      characterId: 'kaori',
      emotion: 'default',
      position: 'left',
      japaneseText: 'はい、二人です。窓際の席はありますか？',
      romaji: 'Hai, futari desu. Madogiwa no seki wa arimasu ka?',
      englishText: 'Yes, two people. Is there a seat by the window?',
      studyableTerms: [
        {
          id: 'madogiwa',
          japaneseText: '窓際',
          startIndex: 8,
          endIndex: 10,
          romaji: 'Madogiwa',
          englishText: 'Window seat/by the window',
          grammarPoints: ['Compound noun']
        },
        {
          id: 'seki',
          japaneseText: '席',
          startIndex: 12,
          endIndex: 13,
          romaji: 'Seki',
          englishText: 'Seat',
          grammarPoints: ['Noun']
        }
      ],
    },
    {
      id: 'waitress_seating',
      characterId: 'waitress',
      emotion: 'default',
      position: 'right',
      japaneseText: 'はい、ございます。こちらへどうぞ。',
      romaji: 'Hai, gozaimasu. Kochira e dōzo.',
      englishText: 'Yes, we have one. This way please.',
      studyableTerms: [
        {
          id: 'gozaimasu',
          japaneseText: 'ございます',
          startIndex: 3,
          endIndex: 8,
          romaji: 'Gozaimasu',
          englishText: 'To be/to have (super polite form)',
          grammarPoints: ['Honorific language', 'Polite verb']
        },
        {
          id: 'kochira',
          japaneseText: 'こちら',
          startIndex: 10,
          endIndex: 13,
          romaji: 'Kochira',
          englishText: 'This way/here',
          grammarPoints: ['Polite demonstrative']
        }
      ],
    },
    {
      id: 'kaori_menu',
      characterId: 'kaori',
      emotion: 'default',
      position: 'left',
      japaneseText: 'メニューを見てみましょう。何が食べたいですか？',
      romaji: 'Menyū o mite mimashou. Nani ga tabetai desu ka?',
      englishText: 'Let\'s look at the menu. What would you like to eat?',
      playerResponses: [
        {
          id: 'response_sushi',
          japaneseText: '寿司が食べたいです。日本では本場の寿司を食べてみたかったんです。',
          romaji: 'Sushi ga tabetai desu. Nihon de wa honba no sushi o tabete mitakattan desu.',
          englishText: 'I want to eat sushi. I\'ve been wanting to try authentic sushi in Japan.',
        },
        {
          id: 'response_recommendation',
          japaneseText: 'おすすめは何ですか？日本料理に詳しくないので、アドバイスをください。',
          romaji: 'Osusume wa nan desu ka? Nihon ryōri ni kuwashikunai node, adobaisu o kudasai.',
          englishText: 'What do you recommend? I\'m not familiar with Japanese cuisine, so please give me some advice.',
        }
      ]
    },
    {
      id: 'kaori_recommendation',
      characterId: 'kaori',
      emotion: 'thinking',
      position: 'left',
      japaneseText: 'このお店は「和食御膳」が特に美味しいですよ。さっき話した定食のなかでも最高級です。それぞれの料理が丁寧に作られています。',
      romaji: 'Kono omise wa "Washoku gozen" ga toku ni oishii desu yo. Sakki hanashita teishoku no naka demo saikō-kyū desu. Sorezore no ryōri ga teinei ni tsukurarete imasu.',
      englishText: 'This restaurant\'s "Japanese Set Meal" is especially delicious. It\'s the premium version of the set meal I mentioned earlier. Each dish is carefully prepared.',
      studyableTerms: [
        {
          id: 'washoku-gozen',
          japaneseText: '和食御膳',
          startIndex: 5,
          endIndex: 9,
          romaji: 'Washoku gozen',
          englishText: 'Japanese set meal (formal)',
          grammarPoints: ['Compound noun', 'Honorific term']
        },
        {
          id: 'teinei',
          japaneseText: '丁寧',
          startIndex: 42,
          endIndex: 44,
          romaji: 'Teinei',
          englishText: 'Careful/Polite',
          grammarPoints: ['Na-adjective']
        }
      ],
    },
    {
      id: 'kaori_order',
      characterId: 'kaori',
      emotion: 'default',
      position: 'left',
      japaneseText: 'では、注文しましょう。「すみません」と言って店員さんを呼んでみてください。',
      romaji: 'Dewa, chūmon shimashou. "Sumimasen" to itte ten\'in-san o yonde mite kudasai.',
      englishText: 'Well then, let\'s order. Try calling the server by saying "Excuse me".',
      playerResponses: [
        {
          id: 'response_call_server',
          japaneseText: 'すみません！',
          romaji: 'Sumimasen!',
          englishText: 'Excuse me!',
        },
        {
          id: 'response_hesitate',
          japaneseText: '恥ずかしいです...あなたが呼んでもらえませんか？',
          romaji: 'Hazukashii desu... Anata ga yonde moraemasen ka?',
          englishText: 'I\'m embarrassed... Could you call them instead?',
        }
      ]
    }
  ],
  background: 'inside_restaurant',
  characters: ['kaori', 'waitress'],
  currentDialogIndex: 0
};

export default insideRestaurantConversation; 