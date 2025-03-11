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
          japaneseText: 'カオリさんは休みの日は何をするのが好きですか？',
          romaji: 'Kaori-san wa yasumi no hi wa nani o suru no ga suki desu ka?',
          englishText: 'What do you like to do on your days off, Kaori?',
        }
      ]
    },
    {
      id: 'kaori_hobbies',
      characterId: 'kaori',
      emotion: 'thinking',
      position: 'right',
      japaneseText: '私は読書が好きです。あとは、時々写真を撮ったり、友達と買い物に行ったりします。あなたは？',
      romaji: 'Watashi wa dokusho ga suki desu. Ato wa, tokidoki shashin o tottari, tomodachi to kaimono ni ittari shimasu. Anata wa?',
      englishText: 'I like reading. Also, I sometimes take photos and go shopping with friends. How about you?',
      studyableTerms: [
        {
          id: 'dokusho',
          japaneseText: '読書',
          startIndex: 3,
          endIndex: 5,
          romaji: 'Dokusho',
          englishText: 'Reading',
          grammarPoints: ['Compound noun']
        },
        {
          id: 'tokidoki',
          japaneseText: '時々',
          startIndex: 14,
          endIndex: 16,
          romaji: 'Tokidoki',
          englishText: 'Sometimes',
          grammarPoints: ['Adverb']
        },
        {
          id: 'tari-form',
          japaneseText: 'ったり',
          startIndex: 22,
          endIndex: 25,
          romaji: '-ttari',
          englishText: 'Doing things like... (listing actions)',
          grammarPoints: ['Grammar pattern', 'Listing actions']
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
          id: 'kaimono',
          japaneseText: '買い物',
          startIndex: 31,
          endIndex: 34,
          romaji: 'Kaimono',
          englishText: 'Shopping',
          grammarPoints: ['Compound noun']
        }
      ],
      playerResponses: [
        {
          id: 'response_my_hobbies',
          japaneseText: '私は音楽を聴くことと、料理をすることが好きです。日本料理にも興味があります。',
          romaji: 'Watashi wa ongaku o kiku koto to, ryōri o suru koto ga suki desu. Nihon ryōri ni mo kyōmi ga arimasu.',
          englishText: 'I like listening to music and cooking. I\'m also interested in Japanese cuisine.',
        },
        {
          id: 'response_ask_book',
          japaneseText: 'どんな本を読むのが好きですか？おすすめの日本の作家はいますか？',
          romaji: 'Donna hon o yomu no ga suki desu ka? Osusume no Nihon no sakka wa imasu ka?',
          englishText: 'What kind of books do you like to read? Do you have any recommended Japanese authors?',
        }
      ]
    },
    {
      id: 'kaori_books',
      characterId: 'kaori',
      emotion: 'default',
      position: 'right',
      japaneseText: '村上春樹が好きです。「ノルウェイの森」は有名な小説です。あとは、川端康成も古典的で素晴らしいです。',
      romaji: 'Murakami Haruki ga suki desu. "Norway no Mori" wa yūmei na shōsetsu desu. Ato wa, Kawabata Yasunari mo koten-teki de subarashii desu.',
      englishText: 'I like Haruki Murakami. "Norwegian Wood" is a famous novel. Also, Yasunari Kawabata is classic and wonderful.',
      studyableTerms: [
        {
          id: 'murakami',
          japaneseText: '村上春樹',
          startIndex: 0,
          endIndex: 4,
          romaji: 'Murakami Haruki',
          englishText: 'Haruki Murakami (famous Japanese author)',
          grammarPoints: ['Proper noun', 'Name']
        },
        {
          id: 'norway-mori',
          japaneseText: 'ノルウェイの森',
          startIndex: 12,
          endIndex: 19,
          romaji: 'Norway no Mori',
          englishText: 'Norwegian Wood (novel title)',
          grammarPoints: ['Proper noun', 'Book title']
        },
        {
          id: 'yumei',
          japaneseText: '有名',
          startIndex: 21,
          endIndex: 23,
          romaji: 'Yūmei',
          englishText: 'Famous',
          grammarPoints: ['Na-adjective']
        },
        {
          id: 'shosetsu',
          japaneseText: '小説',
          startIndex: 25,
          endIndex: 27,
          romaji: 'Shōsetsu',
          englishText: 'Novel',
          grammarPoints: ['Noun']
        },
        {
          id: 'kawabata',
          japaneseText: '川端康成',
          startIndex: 32,
          endIndex: 36,
          romaji: 'Kawabata Yasunari',
          englishText: 'Yasunari Kawabata (Nobel Prize-winning Japanese author)',
          grammarPoints: ['Proper noun', 'Name']
        }
      ],
    },
    {
      id: 'kaori_daily_life',
      characterId: 'kaori',
      emotion: 'default',
      position: 'right',
      japaneseText: '日本人の日常生活について知りたいことはありますか？仕事や学校のことなど、何でも聞いてください。',
      romaji: 'Nihonjin no nichijō seikatsu ni tsuite shiritai koto wa arimasu ka? Shigoto ya gakkō no koto nado, nan demo kiite kudasai.',
      englishText: 'Is there anything you\'d like to know about Japanese people\'s daily lives? Please feel free to ask about work, school, or anything else.',
      studyableTerms: [
        {
          id: 'nichijo-seikatsu',
          japaneseText: '日常生活',
          startIndex: 4,
          endIndex: 8,
          romaji: 'Nichijō seikatsu',
          englishText: 'Daily life',
          grammarPoints: ['Compound noun']
        },
        {
          id: 'ni-tsuite',
          japaneseText: 'について',
          startIndex: 8,
          endIndex: 11,
          romaji: 'Ni tsuite',
          englishText: 'About/Concerning',
          grammarPoints: ['Grammar pattern', 'Particle']
        },
        {
          id: 'shiritai',
          japaneseText: '知りたい',
          startIndex: 11,
          endIndex: 14,
          romaji: 'Shiritai',
          englishText: 'Want to know',
          grammarPoints: ['Tai-form', 'Desire form of verb']
        },
        {
          id: 'shigoto',
          japaneseText: '仕事',
          startIndex: 22,
          endIndex: 24,
          romaji: 'Shigoto',
          englishText: 'Work/Job',
          grammarPoints: ['Noun']
        },
        {
          id: 'gakko',
          japaneseText: '学校',
          startIndex: 26,
          endIndex: 28,
          romaji: 'Gakkō',
          englishText: 'School',
          grammarPoints: ['Noun']
        }
      ],
      playerResponses: [
        {
          id: 'response_work',
          japaneseText: '日本人の仕事の生活について教えてください。残業は本当に多いですか？',
          romaji: 'Nihonjin no shigoto no seikatsu ni tsuite oshiete kudasai. Zangyō wa hontō ni ōi desu ka?',
          englishText: 'Please tell me about Japanese working life. Is overtime really common?',
        },
        {
          id: 'response_leisure',
          japaneseText: '日本人は休日に何をして過ごすことが多いですか？人気のある趣味は何ですか？',
          romaji: 'Nihonjin wa kyūjitsu ni nani o shite sugosu koto ga ōi desu ka? Ninki no aru shumi wa nan desu ka?',
          englishText: 'What do Japanese people often do on their days off? What are popular hobbies?',
        }
      ]
    }
  ],
  background: 'park_bench',
  characters: ['kaori'],
  currentDialogIndex: 0
};

export default parkBenchConversation; 