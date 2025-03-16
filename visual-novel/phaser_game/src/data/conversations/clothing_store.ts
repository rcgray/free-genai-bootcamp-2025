/**
 * clothing_store.ts
 * 
 * Sample conversation data for the clothing store location.
 * This conversation takes place in a Japanese clothing store with Kaori.
 */

import { Conversation } from '../../utils/Dialog';
import { CharacterPosition } from '../../utils/Character';

/**
 * Clothing store conversation where the player and Kaori shop for clothes and learn about Japanese fashion
 */
const clothingStoreConversation: Conversation = {
  id: 'clothing_store_fashion',
  locationId: 'clothing_store',
  dialogs: [
    {
      id: 'store_narration',
      characterId: '', // Empty for narration
      emotion: '',
      japaneseText: '洋服店に入りました。店内には様々なスタイルの服が並んでいます。若い女性向けのファッションが多いようです。',
      romaji: 'Yōfukuten ni hairimashita. Tennai ni wa samazama na sutairu no fuku ga narabinde imasu. Wakai josei muke no fasshon ga ōi yō desu.',
      englishText: 'You entered a clothing store. Various styles of clothes are displayed inside. There seems to be a lot of fashion for young women.',
    },
    {
      id: 'shopkeeper_greeting',
      characterId: 'shopkeeper',
      emotion: 'default',
      position: 'right',
      japaneseText: 'いらっしゃいませ！何かお探しですか？',
      romaji: 'Irasshaimase! Nanika osagashi desu ka?',
      englishText: 'Welcome! Are you looking for something?',
      studyableTerms: [
        {
          id: 'irasshaimase',
          japaneseText: 'いらっしゃいませ',
          startIndex: 0,
          endIndex: 8,
          romaji: 'Irasshaimase',
          englishText: 'Welcome (to our shop)',
          grammarPoints: ['Greeting', 'Business Japanese', 'Honorific language']
        },
        {
          id: 'nanika',
          japaneseText: '何か',
          startIndex: 10,
          endIndex: 12,
          romaji: 'Nanika',
          englishText: 'Something',
          grammarPoints: ['Indefinite pronoun']
        },
        {
          id: 'osagashi',
          japaneseText: 'お探し',
          startIndex: 12,
          endIndex: 15,
          romaji: 'Osagashi',
          englishText: 'Looking for (polite)',
          grammarPoints: ['Honorific form of verb 探す (sagasu)']
        }
      ],
    },
    {
      id: 'kaori_explain',
      characterId: 'kaori',
      emotion: 'default',
      position: 'left',
      japaneseText: '友達は日本の服に興味があります。何かおすすめはありますか？',
      romaji: 'Tomodachi wa Nihon no fuku ni kyōmi ga arimasu. Nanika osusume wa arimasu ka?',
      englishText: 'My friend is interested in Japanese clothes. Do you have any recommendations?',
      studyableTerms: [
        {
          id: 'tomodachi',
          japaneseText: '友達',
          startIndex: 0,
          endIndex: 2,
          romaji: 'Tomodachi',
          englishText: 'Friend',
          grammarPoints: ['Noun']
        },
        {
          id: 'fuku',
          japaneseText: '服',
          startIndex: 7,
          endIndex: 8,
          romaji: 'Fuku',
          englishText: 'Clothes',
          grammarPoints: ['Noun']
        },
        {
          id: 'kyomi',
          japaneseText: '興味',
          startIndex: 10,
          endIndex: 12,
          romaji: 'Kyōmi',
          englishText: 'Interest',
          grammarPoints: ['Noun']
        },
        {
          id: 'osusume',
          japaneseText: 'おすすめ',
          startIndex: 19,
          endIndex: 23,
          romaji: 'Osusume',
          englishText: 'Recommendation',
          grammarPoints: ['Noun', 'Honorific form']
        }
      ],
    },
    {
      id: 'shopkeeper_recommend',
      characterId: 'shopkeeper',
      emotion: 'default',
      position: 'right',
      japaneseText: 'もちろん！こちらの浴衣はいかがですか？夏祭りなどに着るのにぴったりです。または、この和柄のTシャツも人気がありますよ。',
      romaji: 'Mochiron! Kochira no yukata wa ikaga desu ka? Natsu-matsuri nado ni kiru no ni pittari desu. Mata wa, kono wagara no T-shatsu mo ninki ga arimasu yo.',
      englishText: 'Of course! How about this yukata? It\'s perfect for wearing to summer festivals and such. Or, these T-shirts with Japanese patterns are also popular.',
      studyableTerms: [
        {
          id: 'mochiron',
          japaneseText: 'もちろん',
          startIndex: 0,
          endIndex: 4,
          romaji: 'Mochiron',
          englishText: 'Of course',
          grammarPoints: ['Adverb']
        },
        {
          id: 'kochira',
          japaneseText: 'こちら',
          startIndex: 6,
          endIndex: 9,
          romaji: 'Kochira',
          englishText: 'This/This way (polite)',
          grammarPoints: ['Demonstrative', 'Polite form']
        },
        {
          id: 'yukata',
          japaneseText: '浴衣',
          startIndex: 11,
          endIndex: 13,
          romaji: 'Yukata',
          englishText: 'Light summer kimono',
          grammarPoints: ['Noun', 'Cultural item']
        },
        {
          id: 'ikaga',
          japaneseText: 'いかが',
          startIndex: 14,
          endIndex: 17,
          romaji: 'Ikaga',
          englishText: 'How about (polite)',
          grammarPoints: ['Polite expression', 'Question word']
        },
        {
          id: 'natsu-matsuri',
          japaneseText: '夏祭り',
          startIndex: 22,
          endIndex: 25,
          romaji: 'Natsu-matsuri',
          englishText: 'Summer festival',
          grammarPoints: ['Compound noun', 'Cultural term']
        },
        {
          id: 'kiru',
          japaneseText: '着る',
          startIndex: 29,
          endIndex: 31,
          romaji: 'Kiru',
          englishText: 'To wear',
          grammarPoints: ['Verb', 'Ichidan verb']
        },
        {
          id: 'pittari',
          japaneseText: 'ぴったり',
          startIndex: 35,
          endIndex: 39,
          romaji: 'Pittari',
          englishText: 'Perfect/exactly',
          grammarPoints: ['Adverb', 'Onomatopoeia']
        },
        {
          id: 'wagara',
          japaneseText: '和柄',
          startIndex: 49,
          endIndex: 51,
          romaji: 'Wagara',
          englishText: 'Japanese pattern/design',
          grammarPoints: ['Compound noun']
        }
      ],
      playerResponses: [
        {
          id: 'response_yukata',
          japaneseText: '浴衣に興味があります。試着できますか？',
          romaji: 'Yukata ni kyōmi ga arimasu. Shichaku dekimasu ka?',
          englishText: 'I\'m interested in the yukata. Can I try it on?',
        },
        {
          id: 'response_tshirt',
          japaneseText: '和柄のTシャツを見せてください。どんなデザインがありますか？',
          romaji: 'Wagara no T-shatsu o misete kudasai. Donna dezain ga arimasu ka?',
          englishText: 'Please show me the T-shirts with Japanese patterns. What designs do you have?',
        }
      ]
    },
    {
      id: 'shopkeeper_yukata',
      characterId: 'shopkeeper',
      emotion: 'default',
      position: 'right',
      japaneseText: 'はい、こちらの浴衣は色々なサイズがございます。着方も簡単なタイプですので、外国の方でも着やすいですよ。試着室はこちらです。',
      romaji: 'Hai, kochira no yukata wa iroiro na saizu ga gozaimasu. Kikata mo kantan na taipu desu node, gaikoku no kata demo kiyasui desu yo. Shichaku-shitsu wa kochira desu.',
      englishText: 'Yes, we have this yukata in various sizes. It\'s an easy-to-wear type, so it\'s easy for foreigners to wear too. The fitting room is this way.',
      studyableTerms: [
        {
          id: 'saizu',
          japaneseText: 'サイズ',
          startIndex: 15,
          endIndex: 18,
          romaji: 'Saizu',
          englishText: 'Size',
          grammarPoints: ['Loanword', 'Noun']
        },
        {
          id: 'gozaimasu',
          japaneseText: 'ございます',
          startIndex: 19,
          endIndex: 24,
          romaji: 'Gozaimasu',
          englishText: 'To be/to have (super polite form)',
          grammarPoints: ['Honorific language', 'Polite verb']
        },
        {
          id: 'kikata',
          japaneseText: '着方',
          startIndex: 26,
          endIndex: 28,
          romaji: 'Kikata',
          englishText: 'Way of wearing',
          grammarPoints: ['Compound noun', 'Method noun']
        },
        {
          id: 'kantan',
          japaneseText: '簡単',
          startIndex: 30,
          endIndex: 32,
          romaji: 'Kantan',
          englishText: 'Simple/easy',
          grammarPoints: ['Na-adjective']
        },
        {
          id: 'node',
          japaneseText: 'ので',
          startIndex: 38,
          endIndex: 40,
          romaji: 'Node',
          englishText: 'So/Therefore (polite reason)',
          grammarPoints: ['Conjunction', 'Reason particle']
        },
        {
          id: 'gaikoku',
          japaneseText: '外国',
          startIndex: 41,
          endIndex: 43,
          romaji: 'Gaikoku',
          englishText: 'Foreign country',
          grammarPoints: ['Noun']
        },
        {
          id: 'kata',
          japaneseText: '方',
          startIndex: 45,
          endIndex: 46,
          romaji: 'Kata',
          englishText: 'Person (polite)',
          grammarPoints: ['Honorific noun']
        },
        {
          id: 'kiyasui',
          japaneseText: '着やすい',
          startIndex: 49,
          endIndex: 53,
          romaji: 'Kiyasui',
          englishText: 'Easy to wear',
          grammarPoints: ['Compound adjective', 'Potential form']
        },
        {
          id: 'shichaku-shitsu',
          japaneseText: '試着室',
          startIndex: 59,
          endIndex: 62,
          romaji: 'Shichaku-shitsu',
          englishText: 'Fitting room',
          grammarPoints: ['Compound noun']
        }
      ],
    },
    {
      id: 'kaori_explain_yukata',
      characterId: 'kaori',
      emotion: 'default',
      position: 'left',
      japaneseText: '浴衣は夏の着物の一種です。花火大会や夏祭りなどのイベントで着ることが多いです。帯の結び方も少し特別ですよ。',
      romaji: 'Yukata wa natsu no kimono no isshu desu. Hanabi taikai ya natsu-matsuri nado no ibento de kiru koto ga ōi desu. Obi no musubikata mo sukoshi tokubetsu desu yo.',
      englishText: 'A yukata is a type of summer kimono. It\'s often worn at events like fireworks displays and summer festivals. The way to tie the obi belt is also a bit special.',
      studyableTerms: [
        {
          id: 'natsu',
          japaneseText: '夏',
          startIndex: 5,
          endIndex: 6,
          romaji: 'Natsu',
          englishText: 'Summer',
          grammarPoints: ['Noun', 'Season']
        },
        {
          id: 'kimono',
          japaneseText: '着物',
          startIndex: 7,
          endIndex: 9,
          romaji: 'Kimono',
          englishText: 'Kimono (traditional Japanese clothing)',
          grammarPoints: ['Noun', 'Cultural item']
        },
        {
          id: 'isshu',
          japaneseText: '一種',
          startIndex: 11,
          endIndex: 13,
          romaji: 'Isshu',
          englishText: 'A kind/a type',
          grammarPoints: ['Noun', 'Counter']
        },
        {
          id: 'hanabi',
          japaneseText: '花火',
          startIndex: 16,
          endIndex: 18,
          romaji: 'Hanabi',
          englishText: 'Fireworks',
          grammarPoints: ['Compound noun']
        },
        {
          id: 'taikai',
          japaneseText: '大会',
          startIndex: 18,
          endIndex: 20,
          romaji: 'Taikai',
          englishText: 'Event/display/festival',
          grammarPoints: ['Noun']
        },
        {
          id: 'obi',
          japaneseText: '帯',
          startIndex: 39,
          endIndex: 40,
          romaji: 'Obi',
          englishText: 'Kimono belt/sash',
          grammarPoints: ['Noun', 'Cultural item']
        },
        {
          id: 'musubikata',
          japaneseText: '結び方',
          startIndex: 41,
          endIndex: 44,
          romaji: 'Musubikata',
          englishText: 'Way of tying/knotting',
          grammarPoints: ['Compound noun', 'Method noun']
        },
        {
          id: 'tokubetsu',
          japaneseText: '特別',
          startIndex: 50,
          endIndex: 52,
          romaji: 'Tokubetsu',
          englishText: 'Special',
          grammarPoints: ['Na-adjective']
        }
      ],
      playerResponses: [
        {
          id: 'response_try',
          japaneseText: '素敵ですね！試着してみたいです。着方を教えていただけますか？',
          romaji: 'Suteki desu ne! Shichaku shite mitai desu. Kikata o oshiete itadakemasu ka?',
          englishText: 'That\'s lovely! I\'d like to try it on. Could you please teach me how to wear it?',
        },
        {
          id: 'response_price',
          japaneseText: 'とても興味深いです。値段はいくらですか？',
          romaji: 'Totemo kyōmi-bukai desu. Nedan wa ikura desu ka?',
          englishText: 'That\'s very interesting. How much does it cost?',
        }
      ]
    },
    {
      id: 'shopkeeper_price',
      characterId: 'shopkeeper',
      emotion: 'default',
      position: 'right',
      japaneseText: 'この浴衣のセットは12,800円です。浴衣、帯、下駄がセットになっています。外国人のお客様には、税金が免除されますので、パスポートをご提示ください。',
      romaji: 'Kono yukata no setto wa ichiman-ni-sen-happyaku en desu. Yukata, obi, geta ga setto ni natte imasu. Gaikokujin no o-kyaku-sama ni wa, zeikin ga menjo saremasu node, pasupōto o go-teiji kudasai.',
      englishText: 'This yukata set is 12,800 yen. It includes the yukata, obi belt, and geta sandals. For foreign customers, tax is exempted, so please show your passport.',
      studyableTerms: [
        {
          id: 'setto',
          japaneseText: 'セット',
          startIndex: 6,
          endIndex: 9,
          romaji: 'Setto',
          englishText: 'Set',
          grammarPoints: ['Loanword', 'Noun']
        },
        {
          id: 'en',
          japaneseText: '円',
          startIndex: 23,
          endIndex: 24,
          romaji: 'En',
          englishText: 'Yen (Japanese currency)',
          grammarPoints: ['Noun', 'Currency']
        },
        {
          id: 'geta',
          japaneseText: '下駄',
          startIndex: 31,
          endIndex: 33,
          romaji: 'Geta',
          englishText: 'Traditional Japanese wooden sandals',
          grammarPoints: ['Noun', 'Cultural item']
        },
        {
          id: 'ni-natte',
          japaneseText: 'になって',
          startIndex: 39,
          endIndex: 43,
          romaji: 'Ni natte',
          englishText: 'Become/is composed of',
          grammarPoints: ['Grammar pattern', 'Te-form']
        },
        {
          id: 'o-kyaku-sama',
          japaneseText: 'お客様',
          startIndex: 51,
          endIndex: 54,
          romaji: 'O-kyaku-sama',
          englishText: 'Customer (very polite)',
          grammarPoints: ['Honorific term', 'Business Japanese']
        },
        {
          id: 'zeikin',
          japaneseText: '税金',
          startIndex: 59,
          endIndex: 61,
          romaji: 'Zeikin',
          englishText: 'Tax',
          grammarPoints: ['Compound noun']
        },
        {
          id: 'menjo',
          japaneseText: '免除',
          startIndex: 63,
          endIndex: 65,
          romaji: 'Menjo',
          englishText: 'Exemption',
          grammarPoints: ['Noun', 'Formal term']
        },
        {
          id: 'saremasu',
          japaneseText: 'されます',
          startIndex: 65,
          endIndex: 69,
          romaji: 'Saremasu',
          englishText: 'Is done (passive form)',
          grammarPoints: ['Passive form', 'Polite form']
        },
        {
          id: 'go-teiji',
          japaneseText: 'ご提示',
          startIndex: 83,
          endIndex: 86,
          romaji: 'Go-teiji',
          englishText: 'Showing/presenting (honorific)',
          grammarPoints: ['Honorific prefix', 'Formal term']
        }
      ]
    }
  ],
  background: 'clothing_store',
  characters: ['kaori', 'shopkeeper'],
  currentDialogIndex: 0
};

export default clothingStoreConversation; 