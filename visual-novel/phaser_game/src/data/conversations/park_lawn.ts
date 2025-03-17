/**
 * park_lawn.ts
 * 
 * Sample conversation data for the park lawn location.
 * This conversation takes place in a Japanese park with Kaori.
 */

import { Conversation } from '../../utils/Dialog';
import { CharacterPosition } from '../../utils/Character';

/**
 * Park lawn conversation where the player and Kaori discuss nature and seasons
 */
const parkLawnConversation: Conversation = {
  id: 'park_lawn_seasons',
  locationId: 'park_lawn',
  dialogs: [
    {
      id: 'park_narration',
      characterId: '', // Empty for narration
      emotion: '',
      japaneseText: '公園に着きました。広い芝生と美しい木々が見えます。天気が良くて、多くの人が公園で楽しんでいます。',
      romaji: 'Kōen ni tsukimashita. Hiroi shibafu to utsukushii kigi ga miemasu. Tenki ga yokute, ōku no hito ga kōen de tanoshinde imasu.',
      englishText: 'You arrived at the park. You can see a wide lawn and beautiful trees. The weather is nice, and many people are enjoying the park.',
    },
    {
      id: 'kaori_park_greeting',
      characterId: 'kaori',
      emotion: 'default',
      position: 'center',
      japaneseText: 'この公園は四季折々の景色が楽しめますよ。今は春なので、桜がきれいに咲いています。',
      romaji: 'Kono kōen wa shiki oriori no keshiki ga tanoshimemasu yo. Ima wa haru nanode, sakura ga kirei ni saite imasu.',
      englishText: 'You can enjoy the seasonal scenery in this park. It\'s spring now, so the cherry blossoms are beautifully in bloom.',
      studyableTerms: [
        {
          id: 'shiki-oriori',
          japaneseText: '四季折々',
          startIndex: 4,
          endIndex: 8,
          romaji: 'Shiki oriori',
          englishText: 'The four seasons/seasonal',
          grammarPoints: ['Idiomatic expression', 'Compound noun']
        },
        {
          id: 'haru',
          japaneseText: '春',
          startIndex: 22,
          endIndex: 23,
          romaji: 'Haru',
          englishText: 'Spring',
          grammarPoints: ['Noun', 'Season']
        },
        {
          id: 'sakura',
          japaneseText: '桜',
          startIndex: 28,
          endIndex: 29,
          romaji: 'Sakura',
          englishText: 'Cherry blossom',
          grammarPoints: ['Noun']
        }
      ],
      playerResponses: [
        {
          id: 'response_beautiful',
          japaneseText: '本当にきれいですね。日本の桜は世界的に有名ですよね。',
          romaji: 'Hontō ni kirei desu ne. Nihon no sakura wa sekai-teki ni yūmei desu yo ne.',
          englishText: 'It\'s really beautiful. Japanese cherry blossoms are famous worldwide, aren\'t they?',
        },
        {
          id: 'response_seasons',
          japaneseText: '日本の他の季節はどうですか？どの季節が一番好きですか？',
          romaji: 'Nihon no hoka no kisetsu wa dō desu ka? Dono kisetsu ga ichiban suki desu ka?',
          englishText: 'What about other seasons in Japan? Which season do you like the most?',
        }
      ]
    },
    {
      id: 'kaori_seasons',
      characterId: 'kaori',
      emotion: 'thinking',
      position: 'center',
      japaneseText: '桜は確かに素晴らしいですね。でも、私個人は秋が一番好きです。紅葉がとても美しいし、気温も快適です。日本の四季はそれぞれ魅力がありますよ。',
      romaji: 'Sakura wa tashika ni subarashii desu ne. Demo, watashi kojin wa aki ga ichiban suki desu. Kōyō ga totemo utsukushii shi, kion mo kaiteki desu. Nihon no shiki wa sorezore miryoku ga arimasu yo.',
      englishText: 'Cherry blossoms are certainly wonderful. But personally, I like autumn the most. The autumn leaves are very beautiful, and the temperature is comfortable. Each of Japan\'s four seasons has its own charm.',
      studyableTerms: [
        {
          id: 'sakura',
          japaneseText: '桜',
          startIndex: 0,
          endIndex: 1,
          romaji: 'Sakura',
          englishText: 'Cherry blossom',
          grammarPoints: ['Noun']
        },
        {
          id: 'aki',
          japaneseText: '秋',
          startIndex: 20,
          endIndex: 21,
          romaji: 'Aki',
          englishText: 'Autumn/Fall',
          grammarPoints: ['Noun', 'Season']
        },
        {
          id: 'koyo',
          japaneseText: '紅葉',
          startIndex: 30,
          endIndex: 32,
          romaji: 'Kōyō',
          englishText: 'Autumn leaves/fall foliage',
          grammarPoints: ['Noun']
        },
        {
          id: 'shiki',
          japaneseText: '四季',
          startIndex: 50,
          endIndex: 52,
          romaji: 'Shiki',
          englishText: 'Four seasons',
          grammarPoints: ['Noun', 'Cultural term']
        }
      ],
    },
    {
      id: 'kaori_picnic',
      characterId: 'kaori',
      emotion: 'default',
      position: 'center',
      japaneseText: 'この芝生の上で少し休みませんか？日本では「花見」といって、桜の下でピクニックをする習慣があります。',
      romaji: 'Kono shibafu no ue de sukoshi yasumimasen ka? Nihon de wa "hanami" to itte, sakura no shita de pikunikku o suru shūkan ga arimasu.',
      englishText: 'Shall we rest a bit on this lawn? In Japan, there\'s a custom called "hanami," which means having a picnic under the cherry blossoms.',
      studyableTerms: [
        {
          id: 'shibafu',
          japaneseText: '芝生',
          startIndex: 1,
          endIndex: 3,
          romaji: 'Shibafu',
          englishText: 'Lawn/grass',
          grammarPoints: ['Noun']
        },
        {
          id: 'hanami',
          japaneseText: '花見',
          startIndex: 19,
          endIndex: 21,
          romaji: 'Hanami',
          englishText: 'Cherry blossom viewing',
          grammarPoints: ['Compound noun', 'Cultural term']
        },
        {
          id: 'shukan',
          japaneseText: '習慣',
          startIndex: 42,
          endIndex: 44,
          romaji: 'Shūkan',
          englishText: 'Custom/habit',
          grammarPoints: ['Noun']
        }
      ],
      playerResponses: [
        {
          id: 'response_rest',
          japaneseText: 'いいですね。少し休みましょう。花見をしたことがないので、楽しみです。',
          romaji: 'Ii desu ne. Sukoshi yasumimashou. Hanami o shita koto ga nai node, tanoshimi desu.',
          englishText: 'That sounds good. Let\'s rest a bit. I\'ve never done hanami before, so I\'m looking forward to it.',
        },
        {
          id: 'response_walk',
          japaneseText: '今日は歩き続けたいです。公園をもっと探検しませんか？',
          romaji: 'Kyō wa aruki tsudzuketai desu. Kōen o motto tanken shimasen ka?',
          englishText: 'I want to keep walking today. Shall we explore the park more?',
        }
      ]
    },
    {
      id: 'kaori_nature',
      characterId: 'kaori',
      emotion: 'default',
      position: 'center',
      japaneseText: '日本人は自然との調和を大切にします。四季を通じて自然を楽しむ文化があります。季節ごとの行事や食べ物も特別なんですよ。',
      romaji: 'Nihonjin wa shizen to no chōwa o taisetsu ni shimasu. Shiki o tōjite shizen o tanoshimu bunka ga arimasu. Kisetsu-goto no gyōji ya tabemono mo tokubetsu nan desu yo.',
      englishText: 'Japanese people value harmony with nature. There is a culture of enjoying nature throughout the four seasons. Seasonal events and foods are also special.',
      studyableTerms: [
        {
          id: 'nihonjin',
          japaneseText: '日本人',
          startIndex: 0,
          endIndex: 3,
          romaji: 'Nihonjin',
          englishText: 'Japanese person/people',
          grammarPoints: ['Compound noun', 'Nationality']
        },
        {
          id: 'shizen',
          japaneseText: '自然',
          startIndex: 4,
          endIndex: 6,
          romaji: 'Shizen',
          englishText: 'Nature',
          grammarPoints: ['Noun']
        },
        {
          id: 'chowa',
          japaneseText: '調和',
          startIndex: 9,
          endIndex: 11,
          romaji: 'Chōwa',
          englishText: 'Harmony',
          grammarPoints: ['Noun']
        },
        {
          id: 'kisetsu',
          japaneseText: '季節',
          startIndex: 41,
          endIndex: 43,
          romaji: 'Kisetsu',
          englishText: 'Season',
          grammarPoints: ['Noun']
        },
        {
          id: 'gyoji',
          japaneseText: '行事',
          startIndex: 46,
          endIndex: 48,
          romaji: 'Gyōji',
          englishText: 'Event/Ceremony',
          grammarPoints: ['Noun']
        }
      ]
    }
  ],
  background: 'park_lawn',
  characters: ['kaori', 'takashi'],
  currentDialogIndex: 0
};

export default parkLawnConversation; 