/**
 * park_bench.ts
 * 
 * Sample conversation data for the park bench location.
 * This conversation takes place on a bench in a Japanese park with Kaori.
 */

import { Conversation } from '../../utils/Dialog';
import { CharacterPosition } from '../../utils/Character';

/**
 * Park bench conversation where the player and Kaori discuss daily life and hobbies
 */
const parkBenchConversation: Conversation = {
  id: 'park_bench_hobbies',
  locationId: 'park_bench',
  dialogs: [
    {
      id: 'bench_narration',
      characterId: '', // Empty for narration
      emotion: '',
      japaneseText: '公園のベンチに座りました。前には小さな池があり、鯉が泳いでいます。穏やかな時間が流れています。',
      romaji: 'Kōen no benchi ni suwarimashita. Mae ni wa chiisana ike ga ari, koi ga oyoide imasu. Odayaka na jikan ga nagarete imasu.',
      englishText: 'You sat down on a park bench. There\'s a small pond in front where koi fish are swimming. Time passes peacefully.',
    },
    {
      id: 'kaori_relax',
      characterId: 'kaori',
      emotion: 'relaxed',
      position: 'right',
      japaneseText: 'ここは静かで落ち着きますね。日本の都市部でも、こういった自然スポットがあるのはいいですね。',
      romaji: 'Koko wa shizuka de ochitsukimasu ne. Nihon no toshi-bu demo, kō itta shizen supotto ga aru no wa ii desu ne.',
      englishText: 'It\'s quiet and peaceful here. It\'s nice that there are natural spots like this even in Japanese urban areas.',
      studyableTerms: [
        {
          id: 'shizuka',
          japaneseText: '静か',
          startIndex: 3,
          endIndex: 5,
          romaji: 'Shizuka',
          englishText: 'Quiet',
          grammarPoints: ['Na-adjective']
        },
        {
          id: 'ochitsuku',
          japaneseText: '落ち着き',
          startIndex: 7,
          endIndex: 10,
          romaji: 'Ochitsuki',
          englishText: 'Calm/Tranquility',
          grammarPoints: ['Noun form of verb 落ち着く (ochitsuku)']
        },
        {
          id: 'toshi-bu',
          japaneseText: '都市部',
          startIndex: 18,
          endIndex: 21,
          romaji: 'Toshi-bu',
          englishText: 'Urban area',
          grammarPoints: ['Compound noun']
        }
      ],
      playerResponses: [
        {
          id: 'response_agree',
          japaneseText: 'そうですね。忙しい生活の中でこういう時間が必要ですね。',
          romaji: 'Sō desu ne. Isogashii seikatsu no naka de kō iu jikan ga hitsuyō desu ne.',
          englishText: 'That\'s right. We need time like this in the midst of our busy lives.',
        },
        {
          id: 'response_ask_hobby',
          japaneseText: '日本の都市の中でもこんな静かな場所があるのは素晴らしいですね。',
          romaji: 'Nihon no toshi no naka demo konna shizuka na basho ga aru no wa subarashii desu ne.',
          englishText: 'It\'s wonderful that there are such quiet places even within Japanese cities.',
        }
      ]
    },
    {
      id: 'kaori_wabi_sabi_intro',
      characterId: 'kaori',
      emotion: 'thinking',
      position: 'right',
      japaneseText: 'ここにいると思い出しますね。日本には「わび・さび」という美学的な概念があります。この池と古い石灯籠がそれを表していますよ。',
      romaji: 'Koko ni iru to omoidashimasu ne. Nihon ni wa "wabi-sabi" to iu bigaku-teki na gainen ga arimasu. Kono ike to furui ishi-dōrō ga sore o arawashite imasu yo.',
      englishText: 'Being here reminds me. In Japan, there\'s an aesthetic concept called "wabi-sabi". This pond and the old stone lanterns represent it.',
      studyableTerms: [
        {
          id: 'wabi-sabi',
          japaneseText: 'わび・さび',
          startIndex: 16,
          endIndex: 21,
          romaji: 'Wabi-sabi',
          englishText: 'Japanese aesthetic centered on acceptance of imperfection',
          grammarPoints: ['Cultural concept', 'Compound term']
        },
        {
          id: 'bigaku',
          japaneseText: '美学的',
          startIndex: 24,
          endIndex: 27,
          romaji: 'Bigaku-teki',
          englishText: 'Aesthetic',
          grammarPoints: ['Na-adjective', 'Adjectival form']
        },
        {
          id: 'gainen',
          japaneseText: '概念',
          startIndex: 29,
          endIndex: 31,
          romaji: 'Gainen',
          englishText: 'Concept/Notion',
          grammarPoints: ['Noun']
        },
        {
          id: 'ishi-doro',
          japaneseText: '石灯籠',
          startIndex: 39,
          endIndex: 42,
          romaji: 'Ishi-dōrō',
          englishText: 'Stone lantern',
          grammarPoints: ['Compound noun']
        }
      ],
      playerResponses: [
        {
          id: 'response_wabi_sabi_question',
          japaneseText: 'わび・さびとは何ですか？もう少し説明していただけますか？',
          romaji: 'Wabi-sabi to wa nan desu ka? Mō sukoshi setsumei shite itadakemasu ka?',
          englishText: 'What is wabi-sabi? Could you explain it a little more?',
        },
        {
          id: 'response_notice_pond',
          japaneseText: 'この池の美しさは独特ですね。完璧ではないけれど、魅力的です。',
          romaji: 'Kono ike no utsukushisa wa dokutoku desu ne. Kanpeki dewa nai keredo, miryoku-teki desu.',
          englishText: 'The beauty of this pond is unique. It\'s not perfect, but it\'s charming.',
        }
      ]
    },
    {
      id: 'kaori_explains_wabi_sabi',
      characterId: 'kaori',
      emotion: 'default',
      position: 'right',
      japaneseText: 'わび・さびは難しい概念ですが、簡単に言うと「不完全さの美しさ」です。「わび」は質素さや簡素さを、「さび」は年月を経た物の風合いや風情を表します。',
      romaji: 'Wabi-sabi wa muzukashii gainen desu ga, kantan ni iu to "fukanzen-sa no utsukushisa" desu. "Wabi" wa shisso-sa ya kanso-sa o, "sabi" wa nengetsu o heta mono no fuai ya fūjō o arawashimasu.',
      englishText: 'Wabi-sabi is a difficult concept, but simply put, it\'s "the beauty of imperfection". "Wabi" represents simplicity and modesty, while "sabi" expresses the patina and elegance that comes with age.',
      studyableTerms: [
        {
          id: 'fukanzen-sa',
          japaneseText: '不完全さ',
          startIndex: 22,
          endIndex: 26,
          romaji: 'Fukanzen-sa',
          englishText: 'Imperfection',
          grammarPoints: ['Noun', 'Abstract concept']
        },
        {
          id: 'utsukushisa',
          japaneseText: '美しさ',
          startIndex: 28,
          endIndex: 31,
          romaji: 'Utsukushisa',
          englishText: 'Beauty',
          grammarPoints: ['Noun form of adjective 美しい (utsukushii)']
        },
        {
          id: 'shisso-sa',
          japaneseText: '質素さ',
          startIndex: 40,
          endIndex: 43,
          romaji: 'Shisso-sa',
          englishText: 'Simplicity/Frugality',
          grammarPoints: ['Noun form of adjective 質素 (shisso)']
        },
        {
          id: 'fuai',
          japaneseText: '風合い',
          startIndex: 63,
          endIndex: 66,
          romaji: 'Fuai',
          englishText: 'Texture/Feel/Patina',
          grammarPoints: ['Noun']
        }
      ]
    },
    {
      id: 'kaori_wabi_sabi_examples',
      characterId: 'kaori',
      emotion: 'thinking',
      position: 'right',
      japaneseText: '例えば、この古い灯籠は少し欠けていて完璧ではありませんが、それが時間の流れを感じさせ、美しいと思いませんか？新しく完璧なものより魅力的なことがあります。',
      romaji: 'Tatoeba, kono furui dōrō wa sukoshi kakete ite kanpeki dewa arimasen ga, sore ga jikan no nagare o kanjisase, utsukushii to omoimasen ka? Atarashiku kanpeki na mono yori miryoku-teki na koto ga arimasu.',
      englishText: 'For example, this old lantern is a bit chipped and not perfect, but doesn\'t that make you feel the passage of time, making it beautiful? Sometimes it\'s more appealing than something new and perfect.',
      studyableTerms: [
        {
          id: 'tatoeba',
          japaneseText: '例えば',
          startIndex: 0,
          endIndex: 3,
          romaji: 'Tatoeba',
          englishText: 'For example',
          grammarPoints: ['Adverb', 'Expression']
        },
        {
          id: 'kakete-iru',
          japaneseText: '欠けていて',
          startIndex: 12,
          endIndex: 16,
          romaji: 'Kakete ite',
          englishText: 'Is chipped/missing a part',
          grammarPoints: ['Te-form', 'Progressive form']
        },
        {
          id: 'kanpeki',
          japaneseText: '完璧',
          startIndex: 17,
          endIndex: 19,
          romaji: 'Kanpeki',
          englishText: 'Perfect/Flawless',
          grammarPoints: ['Na-adjective']
        },
        {
          id: 'jikan-no-nagare',
          japaneseText: '時間の流れ',
          startIndex: 31,
          endIndex: 36,
          romaji: 'Jikan no nagare',
          englishText: 'Passage of time',
          grammarPoints: ['Noun phrase']
        }
      ]
    },
    {
      id: 'kaori_wabi_sabi_daily_life',
      characterId: 'kaori',
      emotion: 'default',
      position: 'right',
      japaneseText: 'わび・さびは陶芸や庭園だけでなく、日本人の考え方にも影響しています。完璧を求めすぎるより、物事の自然な姿や年月による変化を受け入れる価値観です。',
      romaji: 'Wabi-sabi wa tōgei ya teien dake denaku, Nihonjin no kangaekata ni mo eikyō shite imasu. Kanpeki o motome sugiru yori, monogoto no shizen na sugata ya nengetsu ni yoru henka o ukeireru kachi-kan desu.',
      englishText: 'Wabi-sabi influences not only pottery and gardens but also Japanese thinking. Rather than seeking perfection, it\'s a value system that accepts the natural state of things and changes that come with time.',
      studyableTerms: [
        {
          id: 'togei',
          japaneseText: '陶芸',
          startIndex: 7,
          endIndex: 9,
          romaji: 'Tōgei',
          englishText: 'Pottery/Ceramics',
          grammarPoints: ['Compound noun']
        },
        {
          id: 'teien',
          japaneseText: '庭園',
          startIndex: 11,
          endIndex: 13,
          romaji: 'Teien',
          englishText: 'Garden',
          grammarPoints: ['Compound noun']
        },
        {
          id: 'eikyo',
          japaneseText: '影響',
          startIndex: 33,
          endIndex: 35,
          romaji: 'Eikyō',
          englishText: 'Influence',
          grammarPoints: ['Noun']
        },
        {
          id: 'kachi-kan',
          japaneseText: '価値観',
          startIndex: 75,
          endIndex: 78,
          romaji: 'Kachi-kan',
          englishText: 'Sense of values/Value system',
          grammarPoints: ['Compound noun']
        }
      ]
    },
    {
      id: 'kaori_wabi_sabi_conclusion',
      characterId: 'kaori',
      emotion: 'default',
      position: 'right',
      japaneseText: 'このように、日本文化を理解するには、わび・さびのような美学的な概念も大切です。言葉で説明するのは難しいですが、この公園のような場所で感じることができますよ。',
      romaji: 'Kono yō ni, Nihon bunka o rikai suru ni wa, wabi-sabi no yō na bigaku-teki na gainen mo taisetsu desu. Kotoba de setsumei suru no wa muzukashii desu ga, kono kōen no yō na basho de kanjiru koto ga dekimasu yo.',
      englishText: 'As you can see, aesthetic concepts like wabi-sabi are important for understanding Japanese culture. It\'s difficult to explain in words, but you can feel it in places like this park.',
      studyableTerms: [
        {
          id: 'rikai-suru',
          japaneseText: '理解する',
          startIndex: 11,
          endIndex: 15,
          romaji: 'Rikai suru',
          englishText: 'To understand',
          grammarPoints: ['Suru verb', 'Verb phrase']
        },
        {
          id: 'taisetsu',
          japaneseText: '大切',
          startIndex: 37,
          endIndex: 39,
          romaji: 'Taisetsu',
          englishText: 'Important',
          grammarPoints: ['Na-adjective']
        },
        {
          id: 'kotoba',
          japaneseText: '言葉',
          startIndex: 41,
          endIndex: 43,
          romaji: 'Kotoba',
          englishText: 'Word/Language',
          grammarPoints: ['Noun']
        },
        {
          id: 'kanjiru',
          japaneseText: '感じる',
          startIndex: 72,
          endIndex: 74,
          romaji: 'Kanjiru',
          englishText: 'To feel',
          grammarPoints: ['Ichidan verb']
        }
      ]
    },
  ],
  background: 'park_bench',
  characters: ['kaori'],
  currentDialogIndex: 0
};

export default parkBenchConversation; 