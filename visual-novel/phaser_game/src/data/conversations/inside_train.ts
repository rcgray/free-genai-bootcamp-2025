/**
 * inside_train.ts
 * 
 * Sample conversation data for the inside train location.
 * This conversation happens after the player and Kaori board the train.
 */

import { Conversation } from '../../utils/Dialog';
import { CharacterPosition } from '../../utils/Character';

/**
 * Inside train conversation where the player discusses travel with Kaori
 */
const insideTrainConversation: Conversation = {
  id: 'inside_train_travel',
  locationId: 'inside_train',
  dialogs: [
    {
      id: 'train_narration',
      characterId: '', // Empty for narration
      emotion: '',
      japaneseText: '電車に乗りました。窓の外には東京の景色が流れています。',
      romaji: 'Densha ni norimashita. Mado no soto niwa Tokyo no keshiki ga nagarete imasu.',
      englishText: 'You boarded the train. The Tokyo landscape flows outside the window.',
    },
    {
      id: 'kaori_question',
      characterId: 'kaori',
      emotion: 'default',
      position: 'center',
      japaneseText: '日本に来るのは初めてですか？',
      romaji: 'Nihon ni kuru no wa hajimete desu ka?',
      englishText: 'Is this your first time coming to Japan?',
      studyableTerms: [
        {
          id: 'hajimete',
          japaneseText: '初めて',
          startIndex: 7,
          endIndex: 10,
          romaji: 'Hajimete',
          englishText: 'First time',
          grammarPoints: ['Expression']
        }
      ],
      playerResponses: [
        {
          id: 'response_yes',
          japaneseText: 'はい、初めてです。とても楽しみにしていました。',
          romaji: 'Hai, hajimete desu. Totemo tanoshimi ni shite imashita.',
          englishText: 'Yes, it\'s my first time. I was really looking forward to it.',
        },
        {
          id: 'response_no',
          japaneseText: 'いいえ、二回目です。前は大阪に行きました。',
          romaji: 'Iie, ni-kaime desu. Mae wa Osaka ni ikimashita.',
          englishText: 'No, it\'s my second time. I went to Osaka before.',
        }
      ]
    },
    {
      id: 'kaori_reaction_first_time',
      characterId: 'kaori',
      emotion: 'surprised',
      position: 'center',
      japaneseText: 'そうですか！では、色々な場所を案内します。東京は大きいですよ。',
      romaji: 'Sou desu ka! Dewa, iroirona basho wo annai shimasu. Tokyo wa ookii desu yo.',
      englishText: 'I see! Then, I\'ll show you various places. Tokyo is big, you know.',
    },
    {
      id: 'kaori_transport',
      characterId: 'kaori',
      emotion: 'thinking',
      position: 'center',
      japaneseText: '東京では電車がとても便利です。地下鉄や山手線を使うと、どこでも行けますよ。',
      romaji: 'Tokyo dewa densha ga totemo benri desu. Chikatetsu ya Yamanote-sen wo tsukau to, doko demo ikemasu yo.',
      englishText: 'Trains are very convenient in Tokyo. If you use the subway or Yamanote Line, you can go anywhere.',
      studyableTerms: [
        {
          id: 'densha',
          japaneseText: '電車',
          startIndex: 4,
          endIndex: 6,
          romaji: 'Densha',
          englishText: 'Train',
          grammarPoints: ['Noun']
        },
        {
          id: 'benri',
          japaneseText: '便利',
          startIndex: 10,
          endIndex: 12,
          romaji: 'Benri',
          englishText: 'Convenient',
          grammarPoints: ['Adjective']
        },
        {
          id: 'chikatetsu',
          japaneseText: '地下鉄',
          startIndex: 18,
          endIndex: 21,
          romaji: 'Chikatetsu',
          englishText: 'Subway',
          grammarPoints: ['Noun']
        }
      ],
    },
    {
      id: 'kaori_question_transportation',
      characterId: 'kaori',
      emotion: 'default',
      position: 'center',
      japaneseText: 'あなたの国では、どんな交通手段をよく使いますか？',
      romaji: 'Anata no kuni dewa, donna kōtsū shudan wo yoku tsukaimasu ka?',
      englishText: 'In your country, what kind of transportation do you often use?',
      playerResponses: [
        {
          id: 'response_car',
          japaneseText: '車をよく使います。公共交通機関は少ないです。',
          romaji: 'Kuruma wo yoku tsukaimasu. Kōkyō kōtsū kikan wa sukunai desu.',
          englishText: 'I often use a car. Public transportation is limited.',
        },
        {
          id: 'response_public',
          japaneseText: 'バスや電車をよく使います。でも、日本ほど便利ではありません。',
          romaji: 'Basu ya densha wo yoku tsukaimasu. Demo, Nihon hodo benri dewa arimasen.',
          englishText: 'I often use buses and trains. But they\'re not as convenient as in Japan.',
        }
      ]
    },
    {
      id: 'kaori_next_stop',
      characterId: 'kaori',
      emotion: 'default',
      position: 'center',
      japaneseText: 'あ、次の駅で降ります。ホテルはここから近いですよ。',
      romaji: 'A, tsugi no eki de orimasu. Hoteru wa koko kara chikai desu yo.',
      englishText: 'Oh, we\'ll get off at the next station. The hotel is close from here.',
    }
  ],
  background: 'inside_train',
  characters: ['kaori'],
  currentDialogIndex: 0
};

export default insideTrainConversation; 