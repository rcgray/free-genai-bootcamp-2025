/**
 * clothing_store.ts
 * 
 * Sample conversation data for the clothing store location.
 * This conversation takes place in a Japanese handbag store with Kaori.
 */

import { Conversation } from '../../utils/Dialog';
import { CharacterPosition } from '../../utils/Character';

/**
 * Clothing store conversation where Kaori shops for a handbag while discussing Japanese 
 * fashion and retail practices with the player
 */
const clothingStoreConversation: Conversation = {
  id: 'clothing_store_fashion',
  locationId: 'clothing_store',
  dialogs: [
    {
      id: 'store_narration',
      characterId: '', // Empty for narration
      emotion: '',
      japaneseText: 'バッグ専門店に入りました。店内には様々なデザインや素材のバッグが陳列されています。シンプルで洗練されたデザインが多いようです。',
      romaji: 'Baggu senmonten ni hairimashita. Tennai ni wa samazama na dezain ya sozai no baggu ga chinretsu sarete imasu. Shinpuru de senren sareta dezain ga ōi yō desu.',
      englishText: 'You entered a handbag specialty store. Various designs and materials of bags are displayed inside. There seem to be many simple and refined designs.',
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
      emotion: 'excited',
      position: 'left',
      japaneseText: 'はい、私は新しいバッグを探しています。日常使いできるシンプルなものが欲しいのですが。',
      romaji: 'Hai, watashi wa atarashii baggu o sagashite imasu. Nichijō tsukai dekiru shinpuru na mono ga hoshii no desu ga.',
      englishText: 'Yes, I\'m looking for a new handbag. I want something simple that I can use for everyday purposes.',
      studyableTerms: [
        {
          id: 'atarashii',
          japaneseText: '新しい',
          startIndex: 5,
          endIndex: 8,
          romaji: 'Atarashii',
          englishText: 'New',
          grammarPoints: ['I-adjective']
        },
        {
          id: 'sagashite',
          japaneseText: '探して',
          startIndex: 14,
          endIndex: 17,
          romaji: 'Sagashite',
          englishText: 'Looking for',
          grammarPoints: ['Te-form of verb 探す (sagasu)']
        },
        {
          id: 'nichijo',
          japaneseText: '日常',
          startIndex: 21,
          endIndex: 23,
          romaji: 'Nichijō',
          englishText: 'Everyday/daily',
          grammarPoints: ['Noun', 'Time reference']
        },
        {
          id: 'tsukai',
          japaneseText: '使い',
          startIndex: 23,
          endIndex: 25,
          romaji: 'Tsukai',
          englishText: 'Use/usage',
          grammarPoints: ['Noun form of verb 使う (tsukau)']
        },
        {
          id: 'hoshii',
          japaneseText: '欲しい',
          startIndex: 36,
          endIndex: 38,
          romaji: 'Hoshii',
          englishText: 'Want/desire',
          grammarPoints: ['I-adjective']
        }
      ],
    },
    {
      id: 'shopkeeper_recommend',
      characterId: 'shopkeeper',
      emotion: 'default',
      position: 'right',
      japaneseText: 'かしこまりました。こちらの商品はいかがでしょうか？日本製のレザーを使った定番デザインです。軽くて丈夫で、長く使っていただけます。こちらは黒と茶色がございます。',
      romaji: 'Kashikomarimashita. Kochira no shōhin wa ikaga deshou ka? Nihon-sei no rezā o tsukatta teiban dezain desu. Karukute jōbu de, nagaku tsukatte itadakemasu. Kochira wa kuro to chairo ga gozaimasu.',
      englishText: 'Certainly. How about this item? It\'s a classic design using Japanese leather. It\'s light, durable, and will last a long time. We have it in black and brown.',
      studyableTerms: [
        {
          id: 'kashikomarimashita',
          japaneseText: 'かしこまりました',
          startIndex: 0,
          endIndex: 8,
          romaji: 'Kashikomarimashita',
          englishText: 'Certainly/understood (very polite)',
          grammarPoints: ['Business Japanese', 'Honorific language']
        },
        {
          id: 'shōhin',
          japaneseText: '商品',
          startIndex: 13,
          endIndex: 15,
          romaji: 'Shōhin',
          englishText: 'Product/item',
          grammarPoints: ['Noun', 'Business term']
        },
        {
          id: 'nihon-sei',
          japaneseText: '日本製',
          startIndex: 22,
          endIndex: 25,
          romaji: 'Nihon-sei',
          englishText: 'Made in Japan',
          grammarPoints: ['Compound noun']
        },
        {
          id: 'rezā',
          japaneseText: 'レザー',
          startIndex: 26,
          endIndex: 29,
          romaji: 'Rezā',
          englishText: 'Leather',
          grammarPoints: ['Loanword', 'Noun']
        },
        {
          id: 'teiban',
          japaneseText: '定番',
          startIndex: 35,
          endIndex: 37,
          romaji: 'Teiban',
          englishText: 'Standard/classic',
          grammarPoints: ['Noun']
        },
        {
          id: 'karukute',
          japaneseText: '軽くて',
          startIndex: 42,
          endIndex: 45,
          romaji: 'Karukute',
          englishText: 'Light and',
          grammarPoints: ['Te-form of adjective 軽い (karui)']
        },
        {
          id: 'jōbu',
          japaneseText: '丈夫',
          startIndex: 46,
          endIndex: 48,
          romaji: 'Jōbu',
          englishText: 'Durable/sturdy',
          grammarPoints: ['Na-adjective']
        },
        {
          id: 'kuro',
          japaneseText: '黒',
          startIndex: 66,
          endIndex: 67,
          romaji: 'Kuro',
          englishText: 'Black',
          grammarPoints: ['Noun', 'Color term']
        },
        {
          id: 'chairo',
          japaneseText: '茶色',
          startIndex: 69,
          endIndex: 71,
          romaji: 'Chairo',
          englishText: 'Brown',
          grammarPoints: ['Noun', 'Color term']
        }
      ],
      playerResponses: [
        {
          id: 'response_color',
          japaneseText: '黒の方が素敵だと思います。シンプルで使いやすそうですね。',
          romaji: 'Kuro no hō ga suteki da to omoimasu. Shinpuru de tsukaiyasusō desu ne.',
          englishText: 'I think the black one is nicer. It seems simple and easy to use.',
        },
        {
          id: 'response_size',
          japaneseText: 'そのバッグは少し大きいですね。もっと小さいものはありますか？',
          romaji: 'Sono baggu wa sukoshi ōkii desu ne. Motto chiisai mono wa arimasu ka?',
          englishText: 'That bag seems a bit large. Do you have something smaller?',
        }
      ]
    },
    {
      id: 'kaori_try',
      characterId: 'kaori',
      emotion: 'thinking',
      position: 'left',
      japaneseText: 'そうですね、黒のほうが私には似合うかもしれません。でも、サイズも考えなくては。小さすぎると使いづらいし、大きすぎると重いですよね。',
      romaji: 'Sō desu ne, kuro no hō ga watashi ni wa niau kamo shiremasen. Demo, saizu mo kangaenakereba. Chiisasugiru to tsukai-zurai shi, ōkisugiru to omoi desu yo ne.',
      englishText: 'I see, the black one might suit me better. But I need to consider the size too. If it\'s too small, it\'ll be hard to use, and if it\'s too big, it\'ll be heavy.',
      studyableTerms: [
        {
          id: 'niau',
          japaneseText: '似合う',
          startIndex: 18,
          endIndex: 21,
          romaji: 'Niau',
          englishText: 'To suit/to look good on',
          grammarPoints: ['Verb', 'Godan verb']
        },
        {
          id: 'kangaenakereba',
          japaneseText: '考えなくては',
          startIndex: 33,
          endIndex: 39,
          romaji: 'Kangaenakereba',
          englishText: 'Must consider/have to think about',
          grammarPoints: ['Conditional form', 'Obligation']
        },
        {
          id: 'chiisasugiru',
          japaneseText: '小さすぎる',
          startIndex: 41,
          endIndex: 46,
          romaji: 'Chiisasugiru',
          englishText: 'Too small',
          grammarPoints: ['Adjective + sugiru (excessive)']
        },
        {
          id: 'tsukai-zurai',
          japaneseText: '使いづらい',
          startIndex: 48,
          endIndex: 52,
          romaji: 'Tsukai-zurai',
          englishText: 'Difficult to use',
          grammarPoints: ['Compound adjective']
        },
        {
          id: 'ōkisugiru',
          japaneseText: '大きすぎる',
          startIndex: 55,
          endIndex: 60,
          romaji: 'Ōkisugiru',
          englishText: 'Too big',
          grammarPoints: ['Adjective + sugiru (excessive)']
        },
        {
          id: 'omoi',
          japaneseText: '重い',
          startIndex: 62,
          endIndex: 64,
          romaji: 'Omoi',
          englishText: 'Heavy',
          grammarPoints: ['I-adjective']
        }
      ],
      playerResponses: [
        {
          id: 'response_medium',
          japaneseText: '中くらいのサイズがいいと思います。普段使いにちょうどいいですよ。',
          romaji: 'Chū kurai no saizu ga ii to omoimasu. Fudan-tsukai ni chōdo ii desu yo.',
          englishText: 'I think a medium size would be good. It\'s just right for everyday use.',
        },
        {
          id: 'response_price',
          japaneseText: '値段はいくらですか？品質と価格のバランスも大切ですね。',
          romaji: 'Nedan wa ikura desu ka? Hinshitsu to kakaku no baransu mo taisetsu desu ne.',
          englishText: 'How much does it cost? The balance between quality and price is important too.',
        }
      ]
    },
    {
      id: 'shopkeeper_price',
      characterId: 'shopkeeper',
      emotion: 'default',
      position: 'right',
      japaneseText: 'こちらの中サイズのバッグは18,500円です。質の高い革を使っており、手作りのため一つ一つ表情が異なります。長く使えるので、コストパフォーマンスは良いと思いますよ。',
      romaji: 'Kochira no chū saizu no baggu wa ichiman-hassen-gohyaku en desu. Shitsu no takai kawa o tsukatte ori, te-tsukuri no tame hitotsu hitotsu hyōjō ga kotonari masu. Nagaku tsukaeru node, kosuto pafōmansu wa yoi to omoimasu yo.',
      englishText: 'This medium-sized bag is 18,500 yen. It uses high-quality leather and since it\'s handmade, each one has a slightly different appearance. Since it will last a long time, I think the cost performance is good.',
      studyableTerms: [
        {
          id: 'chū-saizu',
          japaneseText: '中サイズ',
          startIndex: 4,
          endIndex: 8,
          romaji: 'Chū saizu',
          englishText: 'Medium size',
          grammarPoints: ['Compound noun', 'Size descriptor']
        },
        {
          id: 'shitsu',
          japaneseText: '質',
          startIndex: 28,
          endIndex: 29,
          romaji: 'Shitsu',
          englishText: 'Quality',
          grammarPoints: ['Noun']
        },
        {
          id: 'takai',
          japaneseText: '高い',
          startIndex: 31,
          endIndex: 33,
          romaji: 'Takai',
          englishText: 'High/expensive',
          grammarPoints: ['I-adjective']
        },
        {
          id: 'kawa',
          japaneseText: '革',
          startIndex: 34,
          endIndex: 35,
          romaji: 'Kawa',
          englishText: 'Leather',
          grammarPoints: ['Noun', 'Material']
        },
        {
          id: 'tsukatte-ori',
          japaneseText: '使っており',
          startIndex: 37,
          endIndex: 42,
          romaji: 'Tsukatte ori',
          englishText: 'Is using (formal)',
          grammarPoints: ['Te-form + ori (formal)', 'Formal speech']
        },
        {
          id: 'te-tsukuri',
          japaneseText: '手作り',
          startIndex: 44,
          endIndex: 47,
          romaji: 'Te-tsukuri',
          englishText: 'Handmade',
          grammarPoints: ['Compound noun']
        },
        {
          id: 'hitotsu-hitotsu',
          japaneseText: '一つ一つ',
          startIndex: 52,
          endIndex: 56,
          romaji: 'Hitotsu hitotsu',
          englishText: 'Each one/one by one',
          grammarPoints: ['Repetitive expression', 'Counter']
        },
        {
          id: 'hyōjō',
          japaneseText: '表情',
          startIndex: 57,
          endIndex: 59,
          romaji: 'Hyōjō',
          englishText: 'Expression/appearance',
          grammarPoints: ['Noun']
        },
        {
          id: 'kotonari',
          japaneseText: '異なり',
          startIndex: 61,
          endIndex: 64,
          romaji: 'Kotonari',
          englishText: 'Differ/be different',
          grammarPoints: ['Masu-form of verb 異なる (kotonaru)']
        }
      ],
    },
    {
      id: 'kaori_decision',
      characterId: 'kaori',
      emotion: 'happy',
      position: 'left',
      japaneseText: '黒の中サイズにします！長く使えるものを買いたかったので、ちょうどいいですね。日本の物は品質が良くて本当に素晴らしいです。',
      romaji: 'Kuro no chū saizu ni shimasu! Nagaku tsukaeru mono o kaitakatta node, chōdo ii desu ne. Nihon no mono wa hinshitsu ga yokute hontō ni subarashii desu.',
      englishText: 'I\'ll take the black medium size! Since I wanted something that would last a long time, this is perfect. Japanese products have such good quality, they\'re really wonderful.',
      studyableTerms: [
        {
          id: 'ni-shimasu',
          japaneseText: 'にします',
          startIndex: 11,
          endIndex: 15,
          romaji: 'Ni shimasu',
          englishText: 'I will take/I decide on',
          grammarPoints: ['Decision expression', 'Polite form']
        },
        {
          id: 'tsukaeru',
          japaneseText: '使える',
          startIndex: 19,
          endIndex: 22,
          romaji: 'Tsukaeru',
          englishText: 'Can use/usable',
          grammarPoints: ['Potential form of verb 使う (tsukau)']
        },
        {
          id: 'kaitakatta',
          japaneseText: '買いたかった',
          startIndex: 26,
          endIndex: 31,
          romaji: 'Kaitakatta',
          englishText: 'Wanted to buy',
          grammarPoints: ['Past form of desire form 買いたい (kaitai)']
        },
        {
          id: 'node',
          japaneseText: 'ので',
          startIndex: 31,
          endIndex: 33,
          romaji: 'Node',
          englishText: 'So/because (polite)',
          grammarPoints: ['Conjunction', 'Reason particle']
        },
        {
          id: 'hinshitsu',
          japaneseText: '品質',
          startIndex: 46,
          endIndex: 48,
          romaji: 'Hinshitsu',
          englishText: 'Quality',
          grammarPoints: ['Noun', 'Business term']
        },
        {
          id: 'yokute',
          japaneseText: '良くて',
          startIndex: 50,
          endIndex: 53,
          romaji: 'Yokute',
          englishText: 'Good and',
          grammarPoints: ['Te-form of adjective 良い (yoi)']
        },
        {
          id: 'subarashii',
          japaneseText: '素晴らしい',
          startIndex: 57,
          endIndex: 61,
          romaji: 'Subarashii',
          englishText: 'Wonderful/excellent',
          grammarPoints: ['I-adjective']
        }
      ],
      playerResponses: [
        {
          id: 'response_praise',
          japaneseText: 'いい選択だと思います。シンプルで上品なデザインですね。',
          romaji: 'Ii sentaku da to omoimasu. Shinpuru de jōhin na dezain desu ne.',
          englishText: 'I think it\'s a good choice. It has a simple and elegant design.',
        },
        {
          id: 'response_gift',
          japaneseText: '素敵なバッグですね。特別な日のためのプレゼントにもいいと思います。',
          romaji: 'Suteki na baggu desu ne. Tokubetsu na hi no tame no purezento ni mo ii to omoimasu.',
          englishText: 'It\'s a lovely bag. I think it would also make a good gift for a special day.',
        }
      ]
    },
    {
      id: 'shopkeeper_thanks',
      characterId: 'shopkeeper',
      emotion: 'happy',
      position: 'right',
      japaneseText: 'ありがとうございます。ラッピングはいかがいたしましょうか？プレゼント用や自分用で包装紙の種類も選べますよ。また、当店のポイントカードもございます。',
      romaji: 'Arigatō gozaimasu. Rappingu wa ikaga itashimashou ka? Purezento-yō ya jibun-yō de hōsō-shi no shurui mo erabemasu yo. Mata, tōten no pointo kādo mo gozaimasu.',
      englishText: 'Thank you very much. How would you like it wrapped? You can choose different types of wrapping paper for gifts or personal use. Also, we have a store point card.',
      studyableTerms: [
        {
          id: 'rappingu',
          japaneseText: 'ラッピング',
          startIndex: 10,
          endIndex: 15,
          romaji: 'Rappingu',
          englishText: 'Wrapping',
          grammarPoints: ['Loanword', 'Retail term']
        },
        {
          id: 'ikaga-itashimashou',
          japaneseText: 'いかがいたしましょう',
          startIndex: 16,
          endIndex: 25,
          romaji: 'Ikaga itashimashou',
          englishText: 'How would you like (very polite)',
          grammarPoints: ['Honorific expression', 'Business Japanese']
        },
        {
          id: 'purezento-yo',
          japaneseText: 'プレゼント用',
          startIndex: 28,
          endIndex: 34,
          romaji: 'Purezento-yō',
          englishText: 'For gift purposes',
          grammarPoints: ['Compound noun', 'Purpose indicator 用']
        },
        {
          id: 'jibun-yo',
          japaneseText: '自分用',
          startIndex: 36,
          endIndex: 39,
          romaji: 'Jibun-yō',
          englishText: 'For personal use',
          grammarPoints: ['Compound noun', 'Purpose indicator 用']
        },
        {
          id: 'hōsō-shi',
          japaneseText: '包装紙',
          startIndex: 41,
          endIndex: 44,
          romaji: 'Hōsō-shi',
          englishText: 'Wrapping paper',
          grammarPoints: ['Compound noun', 'Retail term']
        },
        {
          id: 'shurui',
          japaneseText: '種類',
          startIndex: 46,
          endIndex: 48,
          romaji: 'Shurui',
          englishText: 'Type/kind',
          grammarPoints: ['Noun']
        },
        {
          id: 'erabemasu',
          japaneseText: '選べます',
          startIndex: 50,
          endIndex: 54,
          romaji: 'Erabemasu',
          englishText: 'Can choose',
          grammarPoints: ['Potential form', 'Polite form']
        },
        {
          id: 'tōten',
          japaneseText: '当店',
          startIndex: 59,
          endIndex: 61,
          romaji: 'Tōten',
          englishText: 'This store',
          grammarPoints: ['Business term', 'Formal language']
        },
        {
          id: 'pointo-kādo',
          japaneseText: 'ポイントカード',
          startIndex: 63,
          endIndex: 70,
          romaji: 'Pointo kādo',
          englishText: 'Point card/loyalty card',
          grammarPoints: ['Loanword', 'Retail term']
        }
      ]
    },
    {
      id: 'kaori_wrap',
      characterId: 'kaori',
      emotion: 'default',
      position: 'left',
      japaneseText: '普通の包装で大丈夫です。ポイントカードもぜひお願いします。日本のお店はサービスが本当に素晴らしいですね。',
      romaji: 'Futsū no hōsō de daijōbu desu. Pointo kādo mo zehi onegai shimasu. Nihon no omise wa sābisu ga hontō ni subarashii desu ne.',
      englishText: 'Regular wrapping is fine. I\'d definitely like a point card too. Japanese stores really have wonderful service.',
      studyableTerms: [
        {
          id: 'futsū',
          japaneseText: '普通',
          startIndex: 0,
          endIndex: 2,
          romaji: 'Futsū',
          englishText: 'Regular/normal',
          grammarPoints: ['Na-adjective', 'Adverbial usage']
        },
        {
          id: 'hōsō',
          japaneseText: '包装',
          startIndex: 4,
          endIndex: 6,
          romaji: 'Hōsō',
          englishText: 'Wrapping/packaging',
          grammarPoints: ['Noun', 'Retail term']
        },
        {
          id: 'daijōbu',
          japaneseText: '大丈夫',
          startIndex: 8,
          endIndex: 11,
          romaji: 'Daijōbu',
          englishText: 'All right/okay',
          grammarPoints: ['Na-adjective', 'Expression']
        },
        {
          id: 'zehi',
          japaneseText: 'ぜひ',
          startIndex: 22,
          endIndex: 24,
          romaji: 'Zehi',
          englishText: 'Definitely/by all means',
          grammarPoints: ['Adverb']
        },
        {
          id: 'onegai',
          japaneseText: 'お願い',
          startIndex: 24,
          endIndex: 27,
          romaji: 'Onegai',
          englishText: 'Please/request',
          grammarPoints: ['Noun', 'Expression']
        },
        {
          id: 'omise',
          japaneseText: 'お店',
          startIndex: 33,
          endIndex: 35,
          romaji: 'Omise',
          englishText: 'Store/shop',
          grammarPoints: ['Noun', 'Honorific prefix']
        },
        {
          id: 'sābisu',
          japaneseText: 'サービス',
          startIndex: 37,
          endIndex: 41,
          romaji: 'Sābisu',
          englishText: 'Service',
          grammarPoints: ['Loanword', 'Noun']
        }
      ]
    }
  ],
  background: 'clothing_store',
  characters: ['kaori', 'shopkeeper'],
  currentDialogIndex: 0
};

export default clothingStoreConversation; 