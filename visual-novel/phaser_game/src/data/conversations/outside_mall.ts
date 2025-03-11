/**
 * outside_mall.ts
 * 
 * Sample conversation data for the outside mall location.
 * This conversation takes place outside a Japanese shopping mall with Kaori.
 */

import { Conversation } from '../../utils/Dialog';
import { CharacterPosition } from '../../utils/Character';

/**
 * Outside mall conversation where the player and Kaori discuss shopping and Japanese retail
 */
const outsideMallConversation: Conversation = {
  id: 'outside_mall_shopping',
  locationId: 'outside_mall',
  dialogs: [
    {
      id: 'mall_narration',
      characterId: '', // Empty for narration
      emotion: '',
      japaneseText: '大きなショッピングモールの前に到着しました。入り口には、様々な店の広告が掲示されています。多くの人が行き来しています。',
      romaji: 'Ōkina shoppingu mōru no mae ni tōchaku shimashita. Iriguchi ni wa, samazama na mise no kōkoku ga keiji sarete imasu. Ōku no hito ga ikikite imasu.',
      englishText: 'You arrived in front of a large shopping mall. Various store advertisements are displayed at the entrance. Many people are coming and going.',
    },
    {
      id: 'kaori_mall_intro',
      characterId: 'kaori',
      emotion: 'default',
      position: 'left',
      japaneseText: 'ここは市内で一番大きなショッピングモールです。レストラン、衣料品店、電化製品店など、色々なお店があります。',
      romaji: 'Koko wa shinai de ichiban ōkina shoppingu mōru desu. Resutoran, iryōhinten, denka seihinten nado, iroiro na omise ga arimasu.',
      englishText: 'This is the largest shopping mall in the city. There are various stores such as restaurants, clothing stores, electronics stores, and so on.',
      studyableTerms: [
        {
          id: 'shinai',
          japaneseText: '市内',
          startIndex: 3,
          endIndex: 5,
          romaji: 'Shinai',
          englishText: 'Within the city',
          grammarPoints: ['Compound noun']
        },
        {
          id: 'iryohinten',
          japaneseText: '衣料品店',
          startIndex: 28,
          endIndex: 32,
          romaji: 'Iryōhinten',
          englishText: 'Clothing store',
          grammarPoints: ['Compound noun']
        },
        {
          id: 'denka-seihinten',
          japaneseText: '電化製品店',
          startIndex: 34,
          endIndex: 39,
          romaji: 'Denka seihinten',
          englishText: 'Electronics store',
          grammarPoints: ['Compound noun']
        },
        {
          id: 'nado',
          japaneseText: 'など',
          startIndex: 39,
          endIndex: 41,
          romaji: 'Nado',
          englishText: 'Et cetera/and so on',
          grammarPoints: ['Particle']
        },
        {
          id: 'omise',
          japaneseText: 'お店',
          startIndex: 48,
          endIndex: 50,
          romaji: 'Omise',
          englishText: 'Store/shop',
          grammarPoints: ['Noun with honorific prefix']
        }
      ],
      playerResponses: [
        {
          id: 'response_shopping',
          japaneseText: '買い物をしたいです。日本のお土産を探しています。',
          romaji: 'Kaimono o shitai desu. Nihon no omiyage o sagashite imasu.',
          englishText: 'I want to go shopping. I\'m looking for Japanese souvenirs.',
        },
        {
          id: 'response_curious',
          japaneseText: '日本のショッピングモールは、他の国と何が違いますか？',
          romaji: 'Nihon no shoppingu mōru wa, hoka no kuni to nani ga chigaimasu ka?',
          englishText: 'How are Japanese shopping malls different from those in other countries?',
        }
      ]
    },
    {
      id: 'kaori_japanese_malls',
      characterId: 'kaori',
      emotion: 'thinking',
      position: 'left',
      japaneseText: '日本のモールは清潔で、サービスが良いですね。また、地下に大きな食品売り場があるのが特徴的です。デパ地下と呼ばれています。',
      romaji: 'Nihon no mōru wa seiketsu de, sābisu ga ii desu ne. Mata, chika ni ōkina shokuhin uriba ga aru no ga tokuchō-teki desu. Depachika to yobarete imasu.',
      englishText: 'Japanese malls are clean and have good service. Also, a characteristic feature is that they have large food markets in the basement. They\'re called "depachika".',
      studyableTerms: [
        {
          id: 'seiketsu',
          japaneseText: '清潔',
          startIndex: 7,
          endIndex: 9,
          romaji: 'Seiketsu',
          englishText: 'Clean/hygienic',
          grammarPoints: ['Na-adjective']
        },
        {
          id: 'chika',
          japaneseText: '地下',
          startIndex: 25,
          endIndex: 27,
          romaji: 'Chika',
          englishText: 'Basement/underground',
          grammarPoints: ['Noun']
        },
        {
          id: 'shokuhin',
          japaneseText: '食品',
          startIndex: 30,
          endIndex: 32,
          romaji: 'Shokuhin',
          englishText: 'Food products',
          grammarPoints: ['Compound noun']
        },
        {
          id: 'uriba',
          japaneseText: '売り場',
          startIndex: 32,
          endIndex: 35,
          romaji: 'Uriba',
          englishText: 'Sales floor/marketplace',
          grammarPoints: ['Compound noun']
        },
        {
          id: 'tokuchoteki',
          japaneseText: '特徴的',
          startIndex: 41,
          endIndex: 44,
          romaji: 'Tokuchō-teki',
          englishText: 'Characteristic/distinctive',
          grammarPoints: ['Na-adjective']
        },
        {
          id: 'depachika',
          japaneseText: 'デパ地下',
          startIndex: 48,
          endIndex: 52,
          romaji: 'Depachika',
          englishText: 'Department store basement (food section)',
          grammarPoints: ['Compound noun', 'Abbreviation']
        }
      ],
    },
    {
      id: 'kaori_souvenirs',
      characterId: 'kaori',
      emotion: 'default',
      position: 'left',
      japaneseText: 'お土産をお探しでしたら、このモールの5階に「ジャパン・トラディション」というお店があります。伝統的な日本のお土産が揃っていますよ。',
      romaji: 'Omiyage o osagashi deshitara, kono mōru no go-kai ni "Japan Tradition" to iu omise ga arimasu. Dentō-teki na Nihon no omiyage ga sorotte imasu yo.',
      englishText: 'If you\'re looking for souvenirs, there\'s a store called "Japan Tradition" on the 5th floor of this mall. They have a variety of traditional Japanese souvenirs.',
      studyableTerms: [
        {
          id: 'omiyage',
          japaneseText: 'お土産',
          startIndex: 0,
          endIndex: 3,
          romaji: 'Omiyage',
          englishText: 'Souvenir/gift',
          grammarPoints: ['Noun with honorific prefix']
        },
        {
          id: 'osagashi',
          japaneseText: 'お探し',
          startIndex: 5,
          endIndex: 8,
          romaji: 'Osagashi',
          englishText: 'Looking for (polite)',
          grammarPoints: ['Honorific form of verb 探す (sagasu)']
        },
        {
          id: 'deshitara',
          japaneseText: 'でしたら',
          startIndex: 8,
          endIndex: 12,
          romaji: 'Deshitara',
          englishText: 'If (it is the case that)',
          grammarPoints: ['Conditional form', 'Polite form']
        },
        {
          id: 'go-kai',
          japaneseText: '5階',
          startIndex: 18,
          endIndex: 20,
          romaji: 'Go-kai',
          englishText: '5th floor',
          grammarPoints: ['Number + counter']
        },
        {
          id: 'to-iu',
          japaneseText: 'という',
          startIndex: 41,
          endIndex: 44,
          romaji: 'To iu',
          englishText: 'Called/named',
          grammarPoints: ['Grammar pattern', 'Quotation']
        },
        {
          id: 'dentoteki',
          japaneseText: '伝統的',
          startIndex: 53,
          endIndex: 56,
          romaji: 'Dentō-teki',
          englishText: 'Traditional',
          grammarPoints: ['Na-adjective']
        },
        {
          id: 'sorotte',
          japaneseText: '揃って',
          startIndex: 66,
          endIndex: 69,
          romaji: 'Sorotte',
          englishText: 'To be complete/available',
          grammarPoints: ['Te-form of verb 揃う (sorou)']
        }
      ],
      playerResponses: [
        {
          id: 'response_tradition',
          japaneseText: 'ぜひそのお店に行きたいです。どんな商品が人気ですか？',
          romaji: 'Zehi sono omise ni ikitai desu. Donna shōhin ga ninki desu ka?',
          englishText: 'I definitely want to go to that store. What kinds of products are popular?',
        },
        {
          id: 'response_other',
          japaneseText: '他に行くべき場所はありますか？日本らしい買い物体験をしたいです。',
          romaji: 'Hoka ni ikubeki basho wa arimasu ka? Nihon-rashii kaimono taiken o shitai desu.',
          englishText: 'Are there other places I should go? I want to have a typically Japanese shopping experience.',
        }
      ]
    },
    {
      id: 'kaori_popular',
      characterId: 'kaori',
      emotion: 'happy',
      position: 'left',
      japaneseText: '人気の商品は、手ぬぐい、扇子、和柄の小物、陶器などですね。あと、日本のお菓子も外国人観光客に人気があります。東京ばな奈とか。',
      romaji: 'Ninki no shōhin wa, tenugui, sensu, wagara no komono, tōki nado desu ne. Ato, Nihon no okashi mo gaikokujin kankōkyaku ni ninki ga arimasu. Tokyo Banana toka.',
      englishText: 'Popular items include tenugui (hand towels), folding fans, Japanese pattern accessories, pottery, and so on. Also, Japanese sweets are popular with foreign tourists. Things like Tokyo Banana.',
      studyableTerms: [
        {
          id: 'tenugui',
          japaneseText: '手ぬぐい',
          startIndex: 8,
          endIndex: 12,
          romaji: 'Tenugui',
          englishText: 'Japanese hand towel',
          grammarPoints: ['Noun', 'Cultural item']
        },
        {
          id: 'sensu',
          japaneseText: '扇子',
          startIndex: 14,
          endIndex: 16,
          romaji: 'Sensu',
          englishText: 'Folding fan',
          grammarPoints: ['Noun', 'Cultural item']
        },
        {
          id: 'wagara',
          japaneseText: '和柄',
          startIndex: 18,
          endIndex: 20,
          romaji: 'Wagara',
          englishText: 'Japanese pattern/design',
          grammarPoints: ['Compound noun']
        },
        {
          id: 'komono',
          japaneseText: '小物',
          startIndex: 21,
          endIndex: 23,
          romaji: 'Komono',
          englishText: 'Small items/accessories',
          grammarPoints: ['Compound noun']
        },
        {
          id: 'toki',
          japaneseText: '陶器',
          startIndex: 25,
          endIndex: 27,
          romaji: 'Tōki',
          englishText: 'Pottery/ceramics',
          grammarPoints: ['Compound noun']
        },
        {
          id: 'okashi',
          japaneseText: 'お菓子',
          startIndex: 37,
          endIndex: 40,
          romaji: 'Okashi',
          englishText: 'Sweets/confectionery',
          grammarPoints: ['Noun with honorific prefix']
        },
        {
          id: 'gaikokujin',
          japaneseText: '外国人',
          startIndex: 42,
          endIndex: 45,
          romaji: 'Gaikokujin',
          englishText: 'Foreigner',
          grammarPoints: ['Compound noun']
        },
        {
          id: 'kankokyaku',
          japaneseText: '観光客',
          startIndex: 45,
          endIndex: 48,
          romaji: 'Kankōkyaku',
          englishText: 'Tourist',
          grammarPoints: ['Compound noun']
        },
        {
          id: 'toka',
          japaneseText: 'とか',
          startIndex: 66,
          endIndex: 68,
          romaji: 'Toka',
          englishText: 'Things like/such as',
          grammarPoints: ['Particle', 'Casual expression']
        }
      ],
    },
    {
      id: 'kaori_enter_question',
      characterId: 'kaori',
      emotion: 'default',
      position: 'left',
      japaneseText: 'さて、中に入りますか？それとも、まず食事をしますか？地下のフードコートもおすすめですよ。',
      romaji: 'Sate, naka ni hairimasu ka? Soretomo, mazu shokuji o shimasu ka? Chika no fūdo kōto mo osusume desu yo.',
      englishText: 'Well then, shall we go inside? Or would you like to eat first? The food court in the basement is also recommended.',
      playerResponses: [
        {
          id: 'response_shop',
          japaneseText: 'まず買い物をしましょう。5階の「ジャパン・トラディション」に行きたいです。',
          romaji: 'Mazu kaimono o shimashou. Go-kai no "Japan Tradition" ni ikitai desu.',
          englishText: 'Let\'s shop first. I want to go to "Japan Tradition" on the 5th floor.',
        },
        {
          id: 'response_food',
          japaneseText: '先に食事をしたいです。フードコートがいいですね。',
          romaji: 'Saki ni shokuji o shitai desu. Fūdo kōto ga ii desu ne.',
          englishText: 'I\'d like to eat first. The food court sounds good.',
        }
      ]
    }
  ],
  background: 'outside_mall',
  characters: ['kaori'],
  currentDialogIndex: 0
};

export default outsideMallConversation; 