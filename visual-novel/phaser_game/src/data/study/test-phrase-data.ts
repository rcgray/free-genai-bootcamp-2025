/**
 * test-phrase-data.ts
 * 
 * This file contains test data for the Study Scene that represents what we would 
 * receive from an LLM analysis of Japanese phrases. This data is used during
 * development to implement and test the Study Scene UI before integrating
 * with actual LLM responses.
 */

/**
 * Structure for a complete phrase analysis
 */
export interface PhraseAnalysis {
  // The original phrase
  phrase: string;
  romaji: string;
  translation: string;
  
  // Detailed analysis
  word_breakdown: WordBreakdown[];
  grammar_points: GrammarPoint[];
  cultural_notes?: string;
  alternative_expressions?: AlternativeExpression[];
  example_sentences: ExampleSentence[];
  pronunciation_tips?: string;
  common_mistakes?: string;
}

/**
 * Structure for breaking down individual words in a phrase
 */
export interface WordBreakdown {
  word: string;              // Japanese word
  reading: string;           // Reading in hiragana
  romaji: string;            // Romaji pronunciation
  part_of_speech: string;    // Noun, verb, adjective, etc.
  meaning: string;           // English meaning
  notes?: string;            // Optional usage notes
}

/**
 * Structure for grammar points identified in a phrase
 */
export interface GrammarPoint {
  pattern: string;           // Grammar pattern
  explanation: string;       // Explanation of the grammar
  usage_notes: string;       // Notes on usage
  difficulty_level: string;  // beginner, intermediate, advanced
}

/**
 * Structure for alternative expressions to the original phrase
 */
export interface AlternativeExpression {
  japanese: string;          // Alternative phrase in Japanese
  romaji: string;            // Romaji pronunciation
  english: string;           // English translation
  usage_context: string;     // When to use this alternative
}

/**
 * Structure for example sentences using similar patterns
 */
export interface ExampleSentence {
  japanese: string;          // Example sentence in Japanese
  romaji: string;            // Romaji pronunciation
  english: string;           // English translation
}

/**
 * Test data for a typical phrase with complete information
 */
export const testPhraseComplete: PhraseAnalysis = {
  phrase: '日本では電車がとても便利です。',
  romaji: 'Nihon dewa densha ga totemo benri desu.',
  translation: 'Trains are very convenient in Japan.',
  
  word_breakdown: [
    {
      word: '日本',
      reading: 'にほん',
      romaji: 'nihon',
      part_of_speech: 'noun',
      meaning: 'Japan'
    },
    {
      word: 'では',
      reading: 'では',
      romaji: 'dewa',
      part_of_speech: 'particle',
      meaning: 'in, at',
      notes: 'Combination of で (location) and は (topic marker)'
    },
    {
      word: '電車',
      reading: 'でんしゃ',
      romaji: 'densha',
      part_of_speech: 'noun',
      meaning: 'train'
    },
    {
      word: 'が',
      reading: 'が',
      romaji: 'ga',
      part_of_speech: 'particle',
      meaning: 'subject marker'
    },
    {
      word: 'とても',
      reading: 'とても',
      romaji: 'totemo',
      part_of_speech: 'adverb',
      meaning: 'very'
    },
    {
      word: '便利',
      reading: 'べんり',
      romaji: 'benri',
      part_of_speech: 'na-adjective',
      meaning: 'convenient'
    },
    {
      word: 'です',
      reading: 'です',
      romaji: 'desu',
      part_of_speech: 'copula',
      meaning: 'is',
      notes: 'Polite form'
    }
  ],
  
  grammar_points: [
    {
      pattern: '～では',
      explanation: 'Indicates location where something takes place',
      usage_notes: 'Similar to ～で but adds slight emphasis on the topic',
      difficulty_level: 'beginner'
    },
    {
      pattern: 'noun + が + adjective + です',
      explanation: 'Basic sentence structure for describing a quality of the subject',
      usage_notes: 'The pattern "X が Y です" states that X is Y, with が marking the subject',
      difficulty_level: 'beginner'
    }
  ],
  
  cultural_notes: "Japan has one of the most efficient and punctual train systems in the world. Trains are a primary mode of transportation in urban areas like Tokyo and Osaka. Many Japanese people rely on trains for their daily commute, and the train system connects most major cities and many smaller towns. The convenience of Japan's rail network is a point of national pride.",
  
  alternative_expressions: [
    {
      japanese: '日本の電車はすごく便利です。',
      romaji: 'Nihon no densha wa sugoku benri desu.',
      english: 'Japanese trains are incredibly convenient.',
      usage_context: 'Emphasizes "Japanese trains" as the topic rather than "in Japan"'
    },
    {
      japanese: '日本では公共交通機関が発達しています。',
      romaji: 'Nihon dewa kōkyō kōtsū kikan ga hattatsu shite imasu.',
      english: 'Public transportation is well-developed in Japan.',
      usage_context: 'More formal expression, suitable for written descriptions'
    }
  ],
  
  example_sentences: [
    {
      japanese: '東京では地下鉄が便利です。',
      romaji: 'Tōkyō dewa chikatetsu ga benri desu.',
      english: 'Subways are convenient in Tokyo.'
    },
    {
      japanese: '大阪でも電車がよく発達しています。',
      romaji: 'Ōsaka demo densha ga yoku hattatsu shite imasu.',
      english: 'Trains are also well-developed in Osaka.'
    }
  ],
  
  pronunciation_tips: 'Pay attention to the particle は which is pronounced "wa" when used as a topic marker. The word 便利 (benri) has stress on the first syllable.',
  
  common_mistakes: 'Non-native speakers often confuse the particles は (wa) and が (ga). Remember that は marks the topic while が marks the subject of the sentence. Also, some learners mistake 便利 (benri) for 弁理 (benri) which has the same pronunciation but means "legal representation".'
};

/**
 * Test data for a phrase with minimal information to test UI adaptability
 */
export const testPhraseMinimal: PhraseAnalysis = {
  phrase: 'すみません、トイレはどこですか？',
  romaji: 'Sumimasen, toire wa doko desu ka?',
  translation: 'Excuse me, where is the bathroom?',
  
  word_breakdown: [
    {
      word: 'すみません',
      reading: 'すみません',
      romaji: 'sumimasen',
      part_of_speech: 'expression',
      meaning: 'excuse me, I\'m sorry'
    },
    {
      word: 'トイレ',
      reading: 'トイレ',
      romaji: 'toire',
      part_of_speech: 'noun',
      meaning: 'toilet, bathroom'
    },
    {
      word: 'は',
      reading: 'は',
      romaji: 'wa',
      part_of_speech: 'particle',
      meaning: 'topic marker'
    },
    {
      word: 'どこ',
      reading: 'どこ',
      romaji: 'doko',
      part_of_speech: 'question word',
      meaning: 'where'
    },
    {
      word: 'ですか',
      reading: 'ですか',
      romaji: 'desu ka',
      part_of_speech: 'question marker',
      meaning: 'is it?'
    }
  ],
  
  grammar_points: [
    {
      pattern: '～はどこですか',
      explanation: 'Pattern for asking where something is',
      usage_notes: 'Common phrase for asking locations',
      difficulty_level: 'beginner'
    }
  ],
  
  example_sentences: [
    {
      japanese: '駅はどこですか？',
      romaji: 'Eki wa doko desu ka?',
      english: 'Where is the station?'
    }
  ]
};

/**
 * Test data for a longer, more complex phrase
 */
export const testPhraseComplex: PhraseAnalysis = {
  phrase: '明日の会議に間に合うように、早く起きなければならないです。',
  romaji: 'Ashita no kaigi ni maniauyo ni, hayaku okinakereba narimasen desu.',
  translation: 'I must wake up early in order to make it to tomorrow\'s meeting on time.',
  
  word_breakdown: [
    {
      word: '明日',
      reading: 'あした',
      romaji: 'ashita',
      part_of_speech: 'noun',
      meaning: 'tomorrow'
    },
    {
      word: 'の',
      reading: 'の',
      romaji: 'no',
      part_of_speech: 'particle',
      meaning: 'possessive marker'
    },
    {
      word: '会議',
      reading: 'かいぎ',
      romaji: 'kaigi',
      part_of_speech: 'noun',
      meaning: 'meeting, conference'
    },
    {
      word: 'に',
      reading: 'に',
      romaji: 'ni',
      part_of_speech: 'particle',
      meaning: 'to, for (direction/purpose)'
    },
    {
      word: '間に合う',
      reading: 'まにあう',
      romaji: 'maniau',
      part_of_speech: 'verb',
      meaning: 'to be in time for, to make it (on time)'
    },
    {
      word: 'ように',
      reading: 'ように',
      romaji: 'yō ni',
      part_of_speech: 'conjunction',
      meaning: 'in order to, so that'
    },
    {
      word: '早く',
      reading: 'はやく',
      romaji: 'hayaku',
      part_of_speech: 'adverb',
      meaning: 'early'
    },
    {
      word: '起きなければならない',
      reading: 'おきなければならない',
      romaji: 'okinakereba naranai',
      part_of_speech: 'verb phrase',
      meaning: 'must wake up, have to wake up',
      notes: 'Necessity form of 起きる (to wake up)'
    },
    {
      word: 'です',
      reading: 'です',
      romaji: 'desu',
      part_of_speech: 'copula',
      meaning: 'is, am'
    }
  ],
  
  grammar_points: [
    {
      pattern: '～ように',
      explanation: 'Used to express purpose or intention',
      usage_notes: 'Connects an action with its purpose or desired outcome',
      difficulty_level: 'intermediate'
    },
    {
      pattern: '～なければならない',
      explanation: 'Expresses necessity or obligation',
      usage_notes: 'Indicates that something must be done or is required',
      difficulty_level: 'intermediate'
    },
    {
      pattern: '～に間に合う',
      explanation: 'To be in time for something',
      usage_notes: 'Used when talking about making it on time to events, deadlines, etc.',
      difficulty_level: 'intermediate'
    }
  ],
  
  cultural_notes: "Punctuality is highly valued in Japanese business culture. Being late to meetings or appointments is considered disrespectful. It's common for people to arrive early to ensure they are not late, especially for important business meetings.",
  
  alternative_expressions: [
    {
      japanese: '明日の会議に遅れないように、早く起きます。',
      romaji: 'Ashita no kaigi ni okurenai yō ni, hayaku okimasu.',
      english: 'I will wake up early so as not to be late for tomorrow\'s meeting.',
      usage_context: 'Focuses on avoiding being late rather than making it on time'
    }
  ],
  
  example_sentences: [
    {
      japanese: '試験に間に合うように、一時間前に家を出ました。',
      romaji: 'Shiken ni maniau yō ni, ichi-jikan mae ni ie o demashita.',
      english: 'I left home an hour early to make it to the exam on time.'
    },
    {
      japanese: '健康でいるためには、野菜をたくさん食べなければなりません。',
      romaji: 'Kenkō de iru tame ni wa, yasai o takusan tabenakerebanarimasen.',
      english: 'In order to stay healthy, you must eat plenty of vegetables.'
    },
    {
      japanese: '電車に間に合わなかったので、タクシーを使いました。',
      romaji: 'Densha ni maniawanakatta node, takushī o tsukaimashita.',
      english: 'I didn\'t make it in time for the train, so I took a taxi.'
    }
  ],
  
  pronunciation_tips: 'Pay attention to the intonation pattern of なければならない (nakereba naranai), where the stress gradually falls towards the end. The final ない is often pronounced softly.',
  
  common_mistakes: 'Learners often confuse ように (purpose) with ために (purpose/benefit). While similar, ように is used more for desired outcomes, while ために can indicate both purpose and benefit. Another common mistake is dropping the ば in なければ, which is incorrect in formal speech.'
};

/**
 * Test data with missing optional sections to test UI adaptability
 */
export const testPhraseMissingOptional: PhraseAnalysis = {
  phrase: 'お元気ですか？',
  romaji: 'O-genki desu ka?',
  translation: 'How are you?',
  
  word_breakdown: [
    {
      word: 'お',
      reading: 'お',
      romaji: 'o',
      part_of_speech: 'prefix',
      meaning: 'honorific prefix'
    },
    {
      word: '元気',
      reading: 'げんき',
      romaji: 'genki',
      part_of_speech: 'na-adjective',
      meaning: 'healthy, well, fine'
    },
    {
      word: 'ですか',
      reading: 'ですか',
      romaji: 'desu ka',
      part_of_speech: 'question marker',
      meaning: 'is it?, are you?'
    }
  ],
  
  grammar_points: [
    {
      pattern: 'お + [noun] + です',
      explanation: 'Adding お before certain words adds politeness',
      usage_notes: 'Common with greetings and set phrases',
      difficulty_level: 'beginner'
    }
  ],
  
  example_sentences: [
    {
      japanese: 'お名前は何ですか？',
      romaji: 'O-namae wa nan desu ka?',
      english: 'What is your name?'
    },
    {
      japanese: '今日はお仕事ですか？',
      romaji: 'Kyō wa o-shigoto desu ka?',
      english: 'Are you working today?'
    }
  ]
};

/**
 * Get a test phrase by name
 */
export function getTestPhrase(phraseName: string): PhraseAnalysis {
  switch (phraseName) {
    case 'complete':
      return testPhraseComplete;
    case 'minimal':
      return testPhraseMinimal;
    case 'complex':
      return testPhraseComplex;
    case 'missing':
      return testPhraseMissingOptional;
    default:
      return testPhraseComplete;
  }
}

/**
 * Get all test phrases
 */
export function getAllTestPhrases(): Record<string, PhraseAnalysis> {
  return {
    complete: testPhraseComplete,
    minimal: testPhraseMinimal,
    complex: testPhraseComplex,
    missing: testPhraseMissingOptional
  };
} 