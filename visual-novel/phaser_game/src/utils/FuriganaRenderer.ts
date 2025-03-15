/**
 * FuriganaRenderer.ts
 * 
 * A utility for rendering furigana (ruby text) above kanji characters in Phaser.
 * This class handles the detection of kanji characters, alignment with romaji readings,
 * and rendering furigana text within a Phaser scene.
 */

import Phaser from 'phaser';

/**
 * Options for configuring furigana rendering
 */
export interface FuriganaOptions {
  /** Style for the base text (main Japanese text) */
  baseTextStyle: Phaser.Types.GameObjects.Text.TextStyle;
  
  /** Style for the ruby text (furigana), defaults to smaller version of baseTextStyle */
  rubyTextStyle?: Phaser.Types.GameObjects.Text.TextStyle;
  
  /** Vertical offset for ruby text positioning, in pixels */
  rubyOffset?: number;
  
  /** When true, render furigana only for less common kanji (for advanced difficulty) */
  onlyCommonKanji?: boolean;
}

/**
 * Represents a kanji character with its reading
 */
export interface KanjiWithReading {
  /** The kanji character(s) */
  kanji: string;
  
  /** The reading (in romaji) */
  reading: string;
  
  /** Start index in the original text */
  startIndex: number;
  
  /** End index in the original text */
  endIndex: number;
}

/**
 * Character types for Japanese text analysis
 */
enum CharType {
  Kanji,
  Hiragana,
  Katakana,
  Punctuation,
  Other
}

/**
 * Japanese character with type and position information
 */
interface CharacterInfo {
  char: string;
  type: CharType;
  index: number;
}

/**
 * Basic mapping of hiragana characters to romaji
 */
const HIRAGANA_TO_ROMAJI = new Map<string, string>([
  ['あ', 'a'], ['い', 'i'], ['う', 'u'], ['え', 'e'], ['お', 'o'],
  ['か', 'ka'], ['き', 'ki'], ['く', 'ku'], ['け', 'ke'], ['こ', 'ko'],
  ['さ', 'sa'], ['し', 'shi'], ['す', 'su'], ['せ', 'se'], ['そ', 'so'],
  ['た', 'ta'], ['ち', 'chi'], ['つ', 'tsu'], ['て', 'te'], ['と', 'to'],
  ['な', 'na'], ['に', 'ni'], ['ぬ', 'nu'], ['ね', 'ne'], ['の', 'no'],
  ['は', 'ha'], ['ひ', 'hi'], ['ふ', 'fu'], ['へ', 'he'], ['ほ', 'ho'],
  ['ま', 'ma'], ['み', 'mi'], ['む', 'mu'], ['め', 'me'], ['も', 'mo'],
  ['や', 'ya'], ['ゆ', 'yu'], ['よ', 'yo'],
  ['ら', 'ra'], ['り', 'ri'], ['る', 'ru'], ['れ', 're'], ['ろ', 'ro'],
  ['わ', 'wa'], ['を', 'wo'], ['ん', 'n'],
  ['が', 'ga'], ['ぎ', 'gi'], ['ぐ', 'gu'], ['げ', 'ge'], ['ご', 'go'],
  ['ざ', 'za'], ['じ', 'ji'], ['ず', 'zu'], ['ぜ', 'ze'], ['ぞ', 'zo'],
  ['だ', 'da'], ['ぢ', 'ji'], ['づ', 'zu'], ['で', 'de'], ['ど', 'do'],
  ['ば', 'ba'], ['び', 'bi'], ['ぶ', 'bu'], ['べ', 'be'], ['ぼ', 'bo'],
  ['ぱ', 'pa'], ['ぴ', 'pi'], ['ぷ', 'pu'], ['ぺ', 'pe'], ['ぽ', 'po'],
  ['きゃ', 'kya'], ['きゅ', 'kyu'], ['きょ', 'kyo'],
  ['しゃ', 'sha'], ['しゅ', 'shu'], ['しょ', 'sho'],
  ['ちゃ', 'cha'], ['ちゅ', 'chu'], ['ちょ', 'cho'],
  ['にゃ', 'nya'], ['にゅ', 'nyu'], ['にょ', 'nyo'],
  ['ひゃ', 'hya'], ['ひゅ', 'hyu'], ['ひょ', 'hyo'],
  ['みゃ', 'mya'], ['みゅ', 'myu'], ['みょ', 'myo'],
  ['りゃ', 'rya'], ['りゅ', 'ryu'], ['りょ', 'ryo'],
  ['ぎゃ', 'gya'], ['ぎゅ', 'gyu'], ['ぎょ', 'gyo'],
  ['じゃ', 'ja'], ['じゅ', 'ju'], ['じょ', 'jo'],
  ['びゃ', 'bya'], ['びゅ', 'byu'], ['びょ', 'byo'],
  ['ぴゃ', 'pya'], ['ぴゅ', 'pyu'], ['ぴょ', 'pyo'],
  // Special cases and common particles
  ['は', 'wa'], // The particle は is pronounced "wa"
  ['へ', 'e'],  // The particle へ is pronounced "e"
  ['を', 'o'],  // The particle を is pronounced "o"
  ['っ', ''],   // Small tsu doubles the following consonant
  ['ー', ''],   // Long vowel mark
]);

/**
 * Basic mapping of katakana characters to romaji
 */
const KATAKANA_TO_ROMAJI = new Map<string, string>([
  ['ア', 'a'], ['イ', 'i'], ['ウ', 'u'], ['エ', 'e'], ['オ', 'o'],
  ['カ', 'ka'], ['キ', 'ki'], ['ク', 'ku'], ['ケ', 'ke'], ['コ', 'ko'],
  ['サ', 'sa'], ['シ', 'shi'], ['ス', 'su'], ['セ', 'se'], ['ソ', 'so'],
  ['タ', 'ta'], ['チ', 'chi'], ['ツ', 'tsu'], ['テ', 'te'], ['ト', 'to'],
  ['ナ', 'na'], ['ニ', 'ni'], ['ヌ', 'nu'], ['ネ', 'ne'], ['ノ', 'no'],
  ['ハ', 'ha'], ['ヒ', 'hi'], ['フ', 'fu'], ['ヘ', 'he'], ['ホ', 'ho'],
  ['マ', 'ma'], ['ミ', 'mi'], ['ム', 'mu'], ['メ', 'me'], ['モ', 'mo'],
  ['ヤ', 'ya'], ['ユ', 'yu'], ['ヨ', 'yo'],
  ['ラ', 'ra'], ['リ', 'ri'], ['ル', 'ru'], ['レ', 're'], ['ロ', 'ro'],
  ['ワ', 'wa'], ['ヲ', 'wo'], ['ン', 'n'],
  ['ガ', 'ga'], ['ギ', 'gi'], ['グ', 'gu'], ['ゲ', 'ge'], ['ゴ', 'go'],
  ['ザ', 'za'], ['ジ', 'ji'], ['ズ', 'zu'], ['ゼ', 'ze'], ['ゾ', 'zo'],
  ['ダ', 'da'], ['ヂ', 'ji'], ['ヅ', 'zu'], ['デ', 'de'], ['ド', 'do'],
  ['バ', 'ba'], ['ビ', 'bi'], ['ブ', 'bu'], ['ベ', 'be'], ['ボ', 'bo'],
  ['パ', 'pa'], ['ピ', 'pi'], ['プ', 'pu'], ['ペ', 'pe'], ['ポ', 'po'],
  ['キャ', 'kya'], ['キュ', 'kyu'], ['キョ', 'kyo'],
  ['シャ', 'sha'], ['シュ', 'shu'], ['ショ', 'sho'],
  ['チャ', 'cha'], ['チュ', 'chu'], ['チョ', 'cho'],
  ['ニャ', 'nya'], ['ニュ', 'nyu'], ['ニョ', 'nyo'],
  ['ヒャ', 'hya'], ['ヒュ', 'hyu'], ['ヒョ', 'hyo'],
  ['ミャ', 'mya'], ['ミュ', 'myu'], ['ミョ', 'myo'],
  ['リャ', 'rya'], ['リュ', 'ryu'], ['リョ', 'ryo'],
  ['ギャ', 'gya'], ['ギュ', 'gyu'], ['ギョ', 'gyo'],
  ['ジャ', 'ja'], ['ジュ', 'ju'], ['ジョ', 'jo'],
  ['ビャ', 'bya'], ['ビュ', 'byu'], ['ビョ', 'byo'],
  ['ピャ', 'pya'], ['ピュ', 'pyu'], ['ピョ', 'pyo'],
  ['ッ', ''],   // Small tsu
  ['ー', ''],   // Long vowel mark
]);

/**
 * An alignment point between Japanese text and romaji
 */
interface AlignmentPoint {
  japaneseIndex: number;
  romajiIndex: number;
  length: number;
  kana: string;
  romaji: string;
}

/**
 * Utility for rendering furigana (ruby text) above kanji characters
 */
export class FuriganaRenderer {
  private scene: Phaser.Scene;
  private options: FuriganaOptions;
  
  /**
   * Create a new FuriganaRenderer
   * @param scene - The Phaser scene to render in
   * @param options - Configuration options
   */
  constructor(scene: Phaser.Scene, options: FuriganaOptions) {
    this.scene = scene;
    this.options = this.normalizeOptions(options);
  }
  
  /**
   * Fill in default values for options
   */
  private normalizeOptions(options: FuriganaOptions): FuriganaOptions {
    // Deep clone the base text style
    const baseStyle = { ...options.baseTextStyle };
    
    // Create ruby text style if not provided
    if (!options.rubyTextStyle) {
      const fontSize = typeof baseStyle.fontSize === 'string' 
        ? parseInt(baseStyle.fontSize, 10) 
        : (baseStyle.fontSize || 24);
      
      options.rubyTextStyle = {
        ...baseStyle,
        fontSize: Math.max(Math.floor(fontSize * 0.6), 10), // 60% of base font size, minimum 10px
        color: '#cccccc' // Lighter color for furigana
      };
    }
    
    // Set default ruby offset if not provided
    if (options.rubyOffset === undefined) {
      const baseFontSize = typeof baseStyle.fontSize === 'string' 
        ? parseInt(baseStyle.fontSize, 10) 
        : (baseStyle.fontSize || 24);
      
      options.rubyOffset = -Math.floor(baseFontSize * 0.8); // Default offset based on font size
    }
    
    return options;
  }
  
  /**
   * Create a text container with furigana rendered above kanji characters
   * @param x - X position of the text
   * @param y - Y position of the text
   * @param text - Japanese text to render
   * @param romaji - Romaji pronunciation of the text
   * @returns A container with the rendered text and furigana
   */
  public createFuriganaText(
    x: number, 
    y: number, 
    text: string, 
    romaji: string
  ): Phaser.GameObjects.Container {
    // Create a container to hold base text and furigana
    const container = this.scene.add.container(x, y);
    
    // Create base text
    const baseText = this.scene.add.text(0, 0, text, this.options.baseTextStyle);
    container.add(baseText);
    
    // Identify kanji characters and their readings
    const kanjiReadings = this.mapKanjiToReadings(text, romaji);
    
    // Add furigana for each kanji
    kanjiReadings.forEach(kanjiReading => {
      this.addFuriganaForKanji(container, baseText, kanjiReading);
    });
    
    return container;
  }
  
  /**
   * Determine if a character is a kanji
   * @param char - Character to check
   * @returns True if the character is a kanji
   */
  private isKanji(char: string): boolean {
    // Basic kanji Unicode range check (CJK Unified Ideographs)
    return /[\u4e00-\u9faf]/.test(char);
  }
  
  /**
   * Determine if a character is hiragana
   * @param char - Character to check
   * @returns True if the character is hiragana
   */
  private isHiragana(char: string): boolean {
    // Hiragana Unicode range
    return /[\u3040-\u309f]/.test(char);
  }
  
  /**
   * Determine if a character is katakana
   * @param char - Character to check
   * @returns True if the character is katakana
   */
  private isKatakana(char: string): boolean {
    // Katakana Unicode range
    return /[\u30a0-\u30ff]/.test(char);
  }
  
  /**
   * Determine if a character is Japanese punctuation
   * @param char - Character to check
   * @returns True if the character is Japanese punctuation
   */
  private isPunctuation(char: string): boolean {
    // Common Japanese punctuation
    return /[、。！？「」『』（）・…]/.test(char);
  }
  
  /**
   * Get the character type of a Japanese character
   * @param char - Character to check
   * @returns The character type
   */
  private getCharType(char: string): CharType {
    if (this.isKanji(char)) return CharType.Kanji;
    if (this.isHiragana(char)) return CharType.Hiragana;
    if (this.isKatakana(char)) return CharType.Katakana;
    if (this.isPunctuation(char)) return CharType.Punctuation;
    return CharType.Other;
  }
  
  /**
   * Analyze Japanese text to identify character types and positions
   * @param text - Japanese text to analyze
   * @returns Array of character info objects
   */
  private analyzeText(text: string): CharacterInfo[] {
    const result: CharacterInfo[] = [];
    
    // Analyze each character
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      result.push({
        char,
        type: this.getCharType(char),
        index: i
      });
    }
    
    return result;
  }
  
  /**
   * Add furigana text above a specific kanji
   */
  private addFuriganaForKanji(
    container: Phaser.GameObjects.Container,
    baseText: Phaser.GameObjects.Text,
    kanjiReading: KanjiWithReading
  ): void {
    // Skip if we have no reading
    if (!kanjiReading.reading) {
      return;
    }
    
    // Get the kanji bounds within the text
    const bounds = this.getKanjiBounds(baseText, kanjiReading.startIndex, kanjiReading.endIndex);
    
    // Create the furigana text
    const rubyText = this.scene.add.text(
      bounds.x + bounds.width / 2, // Center horizontally over the kanji
      this.options.rubyOffset!, // Position above the base text
      kanjiReading.reading,
      this.options.rubyTextStyle
    );
    
    // Center the furigana text horizontally
    rubyText.setOrigin(0.5, 0.5);
    
    // Add to container
    container.add(rubyText);
  }
  
  /**
   * Get the bounds of a kanji character or sequence within the text
   */
  private getKanjiBounds(
    baseText: Phaser.GameObjects.Text,
    startIndex: number,
    endIndex: number
  ): { x: number, y: number, width: number, height: number } {
    // This is a simplified approach - in a real implementation, we would
    // need to calculate the exact bounds based on character measurements
    // For now, we'll estimate based on proportional character widths
    
    const totalWidth = baseText.width;
    const totalChars = baseText.text.length;
    
    // Calculate the width of each character (approximation)
    const charWidth = totalWidth / totalChars;
    
    // Calculate the bounds of the kanji
    const x = startIndex * charWidth;
    const width = (endIndex - startIndex) * charWidth;
    const y = 0;
    const height = baseText.height;
    
    return { x, y, width, height };
  }
  
  /**
   * Map kanji characters to their hiragana readings
   * @param text - Japanese text
   * @param romaji - Romaji pronunciation (used for alignment)
   * @returns Array of kanji with their hiragana readings
   */
  public mapKanjiToReadings(text: string, romaji: string): KanjiWithReading[] {
    // Convert romaji to lowercase for consistent matching
    romaji = romaji.toLowerCase();
    
    // Analyze the text to identify character types
    const charInfo = this.analyzeText(text);
    
    // Find kanji sequences (consecutive kanji characters)
    const kanjiSequences = this.findKanjiSequences(charInfo);
    
    // Find alignment points between Japanese text and romaji
    const alignmentPoints = this.findAlignmentPoints(charInfo, text, romaji);
    
    // Add artificial alignment points at start and end if needed
    if (alignmentPoints.length === 0 || alignmentPoints[0].japaneseIndex > 0) {
      // Add start alignment point
      alignmentPoints.unshift({
        japaneseIndex: 0,
        romajiIndex: 0,
        length: 0,
        kana: '',
        romaji: ''
      });
    }
    
    // Add end alignment point if needed
    if (alignmentPoints.length === 0 || 
        alignmentPoints[alignmentPoints.length - 1].japaneseIndex < text.length) {
      alignmentPoints.push({
        japaneseIndex: text.length,
        romajiIndex: romaji.length,
        length: 0,
        kana: '',
        romaji: ''
      });
    }
    
    // Assign hiragana readings to kanji based on alignment with romaji
    this.assignHiraganaReadings(kanjiSequences, text, romaji, alignmentPoints, charInfo);
    
    return kanjiSequences;
  }

  /**
   * Find alignment points between kana characters in Japanese text and 
   * their corresponding romaji pronunciations
   */
  private findAlignmentPoints(
    charInfo: CharacterInfo[], 
    japaneseText: string, 
    romaji: string
  ): AlignmentPoint[] {
    const alignmentPoints: AlignmentPoint[] = [];
    
    // Process consecutive hiragana/katakana characters as potential anchors
    let currentKana = '';
    let startIndex = -1;
    
    for (let i = 0; i < charInfo.length; i++) {
      const info = charInfo[i];
      
      if (info.type === CharType.Hiragana || info.type === CharType.Katakana) {
        // Found kana, start or continue a sequence
        if (startIndex === -1) {
          startIndex = info.index;
        }
        currentKana += japaneseText[info.index];
      } else if (startIndex !== -1) {
        // End of kana sequence, try to find its romaji
        if (currentKana.length > 0) {
          const kanaRomaji = this.kanaToRomaji(currentKana);
          const romajiIndex = this.findRomajiMatch(romaji, kanaRomaji, alignmentPoints);
          
          if (romajiIndex >= 0) {
            alignmentPoints.push({
              japaneseIndex: startIndex,
              romajiIndex: romajiIndex,
              length: currentKana.length,
              kana: currentKana,
              romaji: kanaRomaji
            });
          }
        }
        
        // Reset for next sequence
        currentKana = '';
        startIndex = -1;
      }
    }
    
    // Handle any remaining kana at the end
    if (startIndex !== -1 && currentKana.length > 0) {
      const kanaRomaji = this.kanaToRomaji(currentKana);
      const romajiIndex = this.findRomajiMatch(romaji, kanaRomaji, alignmentPoints);
      
      if (romajiIndex >= 0) {
        alignmentPoints.push({
          japaneseIndex: startIndex,
          romajiIndex: romajiIndex,
          length: currentKana.length,
          kana: currentKana,
          romaji: kanaRomaji
        });
      }
    }
    
    // Special handling for katakana at the beginning
    const katakanaMatch = japaneseText.match(/^[\u30a0-\u30ff]+/);
    if (katakanaMatch && katakanaMatch[0].length > 0) {
      const katakanaText = katakanaMatch[0];
      const katakanaRomaji = this.kanaToRomaji(katakanaText);
      
      // Look for the katakana reading at the start of romaji
      if (romaji.toLowerCase().startsWith(katakanaRomaji.toLowerCase())) {
        // Add this as an alignment point
        alignmentPoints.push({
          japaneseIndex: 0,
          romajiIndex: 0,
          length: katakanaText.length,
          kana: katakanaText,
          romaji: katakanaRomaji
        });
      }
    }
    
    // Special handling for particles that are important delimiters
    const particlePatterns = [
      { japanese: 'は', romaji: 'wa' },
      { japanese: 'が', romaji: 'ga' },
      { japanese: 'を', romaji: 'o' },
      { japanese: 'に', romaji: 'ni' },
      { japanese: 'で', romaji: 'de' },
      { japanese: 'の', romaji: 'no' }
    ];
    
    for (const pattern of particlePatterns) {
      let index = 0;
      while ((index = japaneseText.indexOf(pattern.japanese, index)) !== -1) {
        // Only add if we don't already have an alignment point at this index
        const alreadyHasPoint = alignmentPoints.some(p => p.japaneseIndex === index);
        
        if (!alreadyHasPoint) {
          // Find the particle in the romaji
          const particleIndex = this.findWordBoundaryMatch(romaji, pattern.romaji, 0);
          
          if (particleIndex >= 0) {
            alignmentPoints.push({
              japaneseIndex: index,
              romajiIndex: particleIndex,
              length: 1,
              kana: pattern.japanese,
              romaji: pattern.romaji
            });
          }
        }
        
        index += 1;
      }
    }
    
    // Special handling for hiragana verbs and adjectives which might be mixed with kanji
    // This helps with cases like "山がある町" where "ある" is a hiragana verb
    const commonHiraganaWords = [
      { hiragana: 'ある', romaji: 'aru' },
      { hiragana: 'いる', romaji: 'iru' },
      { hiragana: 'する', romaji: 'suru' },
      { hiragana: 'なる', romaji: 'naru' },
      { hiragana: 'くる', romaji: 'kuru' },
      { hiragana: 'ない', romaji: 'nai' },
      { hiragana: 'よい', romaji: 'yoi' },
      { hiragana: 'いい', romaji: 'ii' }
    ];
    
    for (const word of commonHiraganaWords) {
      let index = 0;
      while ((index = japaneseText.indexOf(word.hiragana, index)) !== -1) {
        // Only add if we don't already have an alignment point at this index
        const alreadyHasPoint = alignmentPoints.some(p => p.japaneseIndex === index);
        
        if (!alreadyHasPoint) {
          // Find the word in the romaji
          const wordIndex = this.findWordBoundaryMatch(romaji, word.romaji, 0);
          
          if (wordIndex >= 0) {
            alignmentPoints.push({
              japaneseIndex: index,
              romajiIndex: wordIndex,
              length: word.hiragana.length,
              kana: word.hiragana,
              romaji: word.romaji
            });
          }
        }
        
        index += word.hiragana.length;
      }
    }
    
    // Sort alignment points by Japanese index
    alignmentPoints.sort((a, b) => a.japaneseIndex - b.japaneseIndex);
    
    return alignmentPoints;
  }

  /**
   * Assign hiragana readings to kanji based on alignment with romaji
   */
  private assignHiraganaReadings(
    kanjiSequences: KanjiWithReading[],
    japaneseText: string,
    romaji: string,
    alignmentPoints: AlignmentPoint[],
    charInfo: CharacterInfo[] = []
  ): void {
    // Get character info if not provided
    if (charInfo.length === 0) {
      charInfo = this.analyzeText(japaneseText);
    }
    
    // Split romaji into words for better matching
    const words = this.splitRomajiIntoWords(romaji);
    
    // Process each kanji sequence
    for (const kanjiSeq of kanjiSequences) {
      // Find the anchor points immediately before and after this kanji
      const prevPoint = this.findPreviousAnchorPoint(kanjiSeq.startIndex, alignmentPoints);
      const nextPoint = this.findNextAnchorPoint(kanjiSeq.endIndex, alignmentPoints);
      
      if (!prevPoint || !nextPoint) {
        kanjiSeq.reading = '';
        continue;
      }
      
      // Calculate the region in romaji text that corresponds to this kanji
      const romajiStartIndex = prevPoint.romajiIndex + prevPoint.romaji.length;
      const romajiEndIndex = nextPoint.romajiIndex;
      
      // Find words that fall within this region
      const relevantWords = words.filter(w => 
        (w.start >= romajiStartIndex && w.start < romajiEndIndex) || 
        (w.end > romajiStartIndex && w.end <= romajiEndIndex)
      );
      
      // Check if there are hiragana characters between this kanji and the next anchor point
      // This is important for cases like "ある町" where "ある" should not be part of the reading for "町"
      const hasHiraganaBefore = this.hasHiraganaBetween(
        japaneseText,
        prevPoint.japaneseIndex + prevPoint.length,
        kanjiSeq.startIndex
      );
      
      // Check if there are hiragana characters immediately after this kanji
      // This is important for cases like "読みます" where "みます" should not be part of the reading for "読"
      const hiraganaAfter = this.getHiraganaAfterKanji(
        japaneseText,
        kanjiSeq.endIndex
      );
      
      let romajiReading = '';
      
      // If we found relevant words
      if (relevantWords.length > 0) {
        // Filter out particles and words that correspond to hiragana before the kanji
        const particles = ['wa', 'ga', 'o', 'ni', 'no', 'e', 'to', 'mo', 'de'];
        
        let wordsToUse = relevantWords;
        
        // Handle the case where hiragana appears before this kanji but after the previous anchor
        if (hasHiraganaBefore) {
          // We need to find only the words that correspond to this specific kanji
          // Look for words that are likely to be immediately after hiragana
          const hiraganaBounds = this.findHiraganaBoundsBeforeKanji(
            japaneseText, kanjiSeq.startIndex, charInfo
          );
          
          if (hiraganaBounds) {
            // Try to find the romaji that corresponds to this hiragana
            const hiraganaRomaji = this.kanaToRomaji(
              japaneseText.substring(hiraganaBounds.start, hiraganaBounds.end)
            );
            
            // Look for this romaji in our word list
            const hiraganaWordIndex = relevantWords.findIndex(w => 
              w.text === hiraganaRomaji || 
              (hiraganaRomaji.length > 2 && w.text.startsWith(hiraganaRomaji.substring(0, 3)))
            );
            
            if (hiraganaWordIndex >= 0) {
              // Use only words after the hiragana word
              wordsToUse = relevantWords.slice(hiraganaWordIndex + 1);
            }
          }
        }
        
        // Remove particles for multi-character kanji (particles are typically not written in kanji)
        if (kanjiSeq.kanji.length > 1 && wordsToUse.length > 1) {
          wordsToUse = wordsToUse.filter(w => !particles.includes(w.text));
        }
        
        // If no words remain after filtering, use the first relevant word
        if (wordsToUse.length === 0 && relevantWords.length > 0) {
          // Just pick the last word, which is most likely to correspond to the kanji
          wordsToUse = [relevantWords[relevantWords.length - 1]];
        }
        
        // Join the words to form the romaji reading
        romajiReading = wordsToUse.map(w => w.text).join(' ');
      } else {
        // If no words found, extract a substring
        const romajiSubstring = romaji.substring(romajiStartIndex, romajiEndIndex);
        romajiReading = this.cleanupRomaji(romajiSubstring);
      }
      
      // Convert romaji reading to hiragana
      let hiraganaReading = this.romajiToHiragana(romajiReading);
      
      // Handle the case where hiragana follows the kanji in the original text
      if (hiraganaAfter && hiraganaAfter.length > 0) {
        // Check if the end of the reading contains this hiragana sequence
        if (hiraganaReading.endsWith(hiraganaAfter)) {
          // Remove the hiragana suffix from the reading
          hiraganaReading = hiraganaReading.substring(0, hiraganaReading.length - hiraganaAfter.length);
        } else {
          // If the exact sequence doesn't match, try to use a smarter approach:
          // Convert the hiragana after the kanji to romaji and look for it in the romaji reading
          const hiraganaAfterRomaji = this.kanaToRomaji(hiraganaAfter);
          const romajiClean = romajiReading.replace(/\s+/g, '');
          
          if (romajiClean.endsWith(hiraganaAfterRomaji)) {
            // Calculate how many characters to keep in the hiragana reading
            const charsToKeep = hiraganaReading.length - hiraganaAfter.length;
            if (charsToKeep > 0) {
              hiraganaReading = hiraganaReading.substring(0, charsToKeep);
            } else {
              // If we can't determine a clear split, just use the first character
              // (better than having duplicated text)
              hiraganaReading = hiraganaReading.charAt(0);
            }
          }
        }
      }
      
      kanjiSeq.reading = hiraganaReading;
      
      // Handle duplicate readings
      const duplicateKanji = kanjiSequences.filter(k => 
        k !== kanjiSeq && k.reading === kanjiSeq.reading && k.reading !== ''
      );
      
      if (duplicateKanji.length > 0) {
        // Try to resolve the duplicates
        this.resolveOverlappingReadings(
          kanjiSeq, duplicateKanji, japaneseText, charInfo
        );
      }
    }
  }
  
  /**
   * Check if there are hiragana characters between two positions in the text
   */
  private hasHiraganaBetween(text: string, start: number, end: number): boolean {
    for (let i = start; i < end && i < text.length; i++) {
      if (this.isHiragana(text[i])) {
        return true;
      }
    }
    return false;
  }
  
  /**
   * Find the bounds of hiragana characters before a kanji
   */
  private findHiraganaBoundsBeforeKanji(
    text: string, 
    kanjiIndex: number,
    charInfo: CharacterInfo[]
  ): { start: number, end: number } | null {
    let hiraganaStart = -1;
    let hiraganaEnd = -1;
    
    // Look backwards from the kanji
    for (let i = kanjiIndex - 1; i >= 0; i--) {
      if (charInfo[i].type === CharType.Hiragana) {
        if (hiraganaEnd === -1) {
          hiraganaEnd = i + 1; // End is exclusive
        }
        hiraganaStart = i;
      } else if (hiraganaEnd !== -1) {
        // We found a non-hiragana character after finding hiragana
        break;
      }
    }
    
    if (hiraganaStart !== -1 && hiraganaEnd !== -1) {
      return { start: hiraganaStart, end: hiraganaEnd };
    }
    
    return null;
  }
  
  /**
   * Resolve cases where multiple kanji have the same reading
   */
  private resolveOverlappingReadings(
    currentKanji: KanjiWithReading,
    duplicateKanji: KanjiWithReading[],
    japaneseText: string,
    charInfo: CharacterInfo[]
  ): void {
    for (const duplicate of duplicateKanji) {
      // Check if there are hiragana between the duplicate and current kanji
      const hasHiraganaBetween = this.hasHiraganaBetween(
        japaneseText, duplicate.endIndex, currentKanji.startIndex
      );
      
      if (hasHiraganaBetween) {
        // If there's hiragana between, this suggests they're different readings
        // Try to determine the correct readings based on context
        const hiraganaRomaji = duplicate.endIndex < currentKanji.startIndex ? 
          this.analyzeHiraganaBetween(japaneseText, duplicate.endIndex, currentKanji.startIndex) : '';
        
        if (hiraganaRomaji === 'no') {
          // Common pattern: [Kanji] の [Kanji] - often the first is more general, second more specific
          // Like: 日本の文化 (nihon no bunka) - country and culture
          // Leave readings as is since they are likely correct
          continue;
        }
      }
      
      // If no specific context clues, use a heuristic:
      // For kanji compounds, consider earlier kanji to be more general/basic readings
      if (duplicate.endIndex < currentKanji.startIndex) {
        // If duplicate kanji comes before current kanji in text
        // Try to split readings if possible
        const readingParts = currentKanji.reading.split('');
        const midPoint = Math.floor(readingParts.length / 2);
        
        if (readingParts.length >= 2) {
          // Assign first half to first kanji, second half to second kanji
          duplicate.reading = readingParts.slice(0, midPoint).join('');
          currentKanji.reading = readingParts.slice(midPoint).join('');
        }
      }
    }
  }
  
  /**
   * Analyze hiragana between two positions to determine context
   */
  private analyzeHiraganaBetween(text: string, start: number, end: number): string {
    const segment = text.substring(start, end);
    
    // Check for common particles
    if (segment.includes('の')) return 'no';
    if (segment.includes('は')) return 'wa';
    if (segment.includes('が')) return 'ga';
    if (segment.includes('を')) return 'o';
    if (segment.includes('に')) return 'ni';
    if (segment.includes('で')) return 'de';
    
    // Convert to romaji for further analysis
    return this.kanaToRomaji(segment);
  }

  /**
   * Convert romaji to hiragana
   * This is a basic implementation that handles common cases
   */
  private romajiToHiragana(romaji: string): string {
    // Remove spaces and punctuation
    const cleanedRomaji = romaji.toLowerCase()
      .replace(/[\s,.!?;:()[\]-]/g, '');
    
    let hiragana = '';
    let i = 0;
    
    // Process character groups that map to hiragana
    while (i < cleanedRomaji.length) {
      // Check for multi-character combinations first
      let matched = false;
      
      // Check for three-character combinations (like 'tsu')
      if (i + 2 < cleanedRomaji.length) {
        const threeChars = cleanedRomaji.substring(i, i + 3);
        const threeCharHiragana = this.getRomajiToHiraganaMapping(threeChars);
        
        if (threeCharHiragana) {
          hiragana += threeCharHiragana;
          i += 3;
          matched = true;
          continue;
        }
      }
      
      // Check for special two-character combinations (like 'ki')
      if (i + 1 < cleanedRomaji.length) {
        const twoChars = cleanedRomaji.substring(i, i + 2);
        const twoCharHiragana = this.getRomajiToHiraganaMapping(twoChars);
        
        if (twoCharHiragana) {
          hiragana += twoCharHiragana;
          i += 2;
          matched = true;
          continue;
        }
        
        // Check for consonant + y + vowel combinations (like kya, shu, etc.)
        if (i + 2 < cleanedRomaji.length && twoChars[1] === 'y') {
          const threeChars = cleanedRomaji.substring(i, i + 3);
          const specialCombo = this.getRomajiToHiraganaMapping(threeChars);
          
          if (specialCombo) {
            hiragana += specialCombo;
            i += 3;
            matched = true;
            continue;
          }
        }
        
        // Check for double consonants (like 'kk', 'pp', 'ss', etc.)
        if (twoChars[0] === twoChars[1] && this.isConsonant(twoChars[0])) {
          hiragana += 'っ'; // Small tsu for consonant doubling
          i += 1; // Only advance one, so the second consonant is processed next
          matched = true;
          continue;
        }
      }
      
      // For single characters
      if (!matched) {
        const singleChar = cleanedRomaji[i];
        const singleCharHiragana = this.getRomajiToHiraganaMapping(singleChar);
        
        if (singleCharHiragana) {
          hiragana += singleCharHiragana;
        } else {
          // If no mapping found, keep the character as is
          hiragana += singleChar;
        }
        
        i += 1;
      }
    }
    
    return hiragana;
  }
  
  /**
   * Check if a character is a consonant
   */
  private isConsonant(char: string): boolean {
    return 'bcdfghjklmnpqrstvwxyz'.includes(char.toLowerCase());
  }
  
  /**
   * Get hiragana for a romaji sequence
   */
  private getRomajiToHiraganaMapping(romaji: string): string | null {
    // Basic hiragana mapping
    const mapping: { [key: string]: string } = {
      // Single vowels
      'a': 'あ', 'i': 'い', 'u': 'う', 'e': 'え', 'o': 'お',
      
      // K-row
      'ka': 'か', 'ki': 'き', 'ku': 'く', 'ke': 'け', 'ko': 'こ',
      'kya': 'きゃ', 'kyu': 'きゅ', 'kyo': 'きょ',
      
      // S-row
      'sa': 'さ', 'shi': 'し', 'si': 'し', 'su': 'す', 'se': 'せ', 'so': 'そ',
      'sha': 'しゃ', 'shu': 'しゅ', 'sho': 'しょ',
      
      // T-row
      'ta': 'た', 'chi': 'ち', 'ti': 'ち', 'tsu': 'つ', 'tu': 'つ', 'te': 'て', 'to': 'と',
      'cha': 'ちゃ', 'chu': 'ちゅ', 'cho': 'ちょ',
      
      // N-row
      'na': 'な', 'ni': 'に', 'nu': 'ぬ', 'ne': 'ね', 'no': 'の',
      'nya': 'にゃ', 'nyu': 'にゅ', 'nyo': 'にょ',
      
      // H-row
      'ha': 'は', 'hi': 'ひ', 'fu': 'ふ', 'hu': 'ふ', 'he': 'へ', 'ho': 'ほ',
      'hya': 'ひゃ', 'hyu': 'ひゅ', 'hyo': 'ひょ',
      
      // M-row
      'ma': 'ま', 'mi': 'み', 'mu': 'む', 'me': 'め', 'mo': 'も',
      'mya': 'みゃ', 'myu': 'みゅ', 'myo': 'みょ',
      
      // Y-row
      'ya': 'や', 'yu': 'ゆ', 'yo': 'よ',
      
      // R-row
      'ra': 'ら', 'ri': 'り', 'ru': 'る', 're': 'れ', 'ro': 'ろ',
      'rya': 'りゃ', 'ryu': 'りゅ', 'ryo': 'りょ',
      
      // W-row
      'wa': 'わ', 'wo': 'を',
      
      // N
      'n': 'ん',
      
      // G-row
      'ga': 'が', 'gi': 'ぎ', 'gu': 'ぐ', 'ge': 'げ', 'go': 'ご',
      'gya': 'ぎゃ', 'gyu': 'ぎゅ', 'gyo': 'ぎょ',
      
      // Z-row
      'za': 'ざ', 'ji': 'じ', 'zi': 'じ', 'zu': 'ず', 'ze': 'ぜ', 'zo': 'ぞ',
      'ja': 'じゃ', 'ju': 'じゅ', 'jo': 'じょ',
      
      // D-row
      'da': 'だ', 'di': 'ぢ', 'du': 'づ', 'de': 'で', 'do': 'ど',
      
      // B-row
      'ba': 'ば', 'bi': 'び', 'bu': 'ぶ', 'be': 'べ', 'bo': 'ぼ',
      'bya': 'びゃ', 'byu': 'びゅ', 'byo': 'びょ',
      
      // P-row
      'pa': 'ぱ', 'pi': 'ぴ', 'pu': 'ぷ', 'pe': 'ぺ', 'po': 'ぽ',
      'pya': 'ぴゃ', 'pyu': 'ぴゅ', 'pyo': 'ぴょ',
    };
    
    return mapping[romaji] || null;
  }
  
  /**
   * Find sequences of consecutive kanji in the text
   */
  private findKanjiSequences(charInfo: CharacterInfo[]): KanjiWithReading[] {
    const kanjiSequences: KanjiWithReading[] = [];
    let currentSequence: { start: number, end: number, text: string } | null = null;
    
    for (let i = 0; i < charInfo.length; i++) {
      const info = charInfo[i];
      
      if (info.type === CharType.Kanji) {
        // Start a new sequence or extend the current one
        if (currentSequence === null) {
          currentSequence = {
            start: info.index,
            end: info.index + 1,
            text: info.char
          };
        } else {
          currentSequence.end = info.index + 1;
          currentSequence.text += info.char;
        }
      } else if (currentSequence !== null) {
        // End the current sequence
        kanjiSequences.push({
          kanji: currentSequence.text,
          reading: '', // Will be filled in later
          startIndex: currentSequence.start,
          endIndex: currentSequence.end
        });
        currentSequence = null;
      }
    }
    
    // Handle a sequence at the end of the string
    if (currentSequence !== null) {
      kanjiSequences.push({
        kanji: currentSequence.text,
        reading: '',
        startIndex: currentSequence.start,
        endIndex: currentSequence.end
      });
    }
    
    return kanjiSequences;
  }
  
  /**
   * Convert kana characters to their romaji equivalents
   */
  private kanaToRomaji(kana: string): string {
    let romaji = '';
    
    // Process two characters at a time for compound kana
    for (let i = 0; i < kana.length; i++) {
      // Try to match two characters first (for compound kana like きゃ)
      if (i + 1 < kana.length) {
        const compound = kana.substring(i, i + 2);
        const compoundRomaji = HIRAGANA_TO_ROMAJI.get(compound) || KATAKANA_TO_ROMAJI.get(compound);
        
        if (compoundRomaji) {
          romaji += compoundRomaji;
          i++; // Skip the next character as it's part of the compound
          continue;
        }
      }
      
      // If no compound match, process single character
      const char = kana[i];
      const singleRomaji = HIRAGANA_TO_ROMAJI.get(char) || KATAKANA_TO_ROMAJI.get(char) || '';
      
      // Special handling for small tsu (っ) which doubles the following consonant
      if (char === 'っ' || char === 'ッ') {
        if (i + 1 < kana.length) {
          const nextChar = kana[i + 1];
          const nextRomaji = HIRAGANA_TO_ROMAJI.get(nextChar) || KATAKANA_TO_ROMAJI.get(nextChar) || '';
          
          if (nextRomaji && nextRomaji.length > 0) {
            // Double the first consonant of next romaji
            romaji += nextRomaji[0];
          }
        }
      } else {
        romaji += singleRomaji;
      }
    }
    
    return romaji;
  }

  /**
   * Find a romaji match in the text, taking into account existing alignment points
   */
  private findRomajiMatch(romaji: string, kanaRomaji: string, existingPoints: AlignmentPoint[]): number {
    // If we already have alignment points, start looking from the last one
    let startIndex = 0;
    if (existingPoints.length > 0) {
      const lastPoint = existingPoints[existingPoints.length - 1];
      startIndex = lastPoint.romajiIndex + lastPoint.romaji.length;
      
      // Don't advance too far if we're matching particles
      // that might be part of the previous word
      const isParticle = ['wa', 'ga', 'o', 'ni', 'no', 'e', 'to', 'mo', 'de'].includes(kanaRomaji);
      if (isParticle) {
        // For particles, search from a bit before the expected position too
        // This helps with cases where particles might be placed differently in romaji
        startIndex = Math.max(0, startIndex - 10); 
      }
    }
    
    // Common transformations for particles
    if (kanaRomaji === 'ha') {
      // The particle は is pronounced "wa"
      const waIndex = this.findWordBoundaryMatch(romaji, 'wa', startIndex);
      if (waIndex >= 0) {
        return waIndex;
      }
    } else if (kanaRomaji === 'he') {
      // The particle へ is pronounced "e"
      const eIndex = this.findWordBoundaryMatch(romaji, 'e', startIndex);
      if (eIndex >= 0) {
        return eIndex;
      }
    } else if (kanaRomaji === 'wo') {
      // The particle を is pronounced "o"
      const oIndex = this.findWordBoundaryMatch(romaji, 'o', startIndex);
      if (oIndex >= 0) {
        return oIndex;
      }
    }
    
    // Try to find the exact match at word boundaries
    const exactMatch = this.findWordBoundaryMatch(romaji, kanaRomaji, startIndex);
    if (exactMatch >= 0) {
      return exactMatch;
    }
    
    // For certain kana, try alternative romanizations (Hepburn variations)
    const hepburnVariations: {[key: string]: string[]} = {
      'shi': ['si'],
      'chi': ['ti'],
      'tsu': ['tu'],
      'fu': ['hu'],
      'ji': ['zi', 'di'],
      'zu': ['du'],
      'sha': ['sya'],
      'shu': ['syu'],
      'sho': ['syo'],
      'cha': ['tya'],
      'chu': ['tyu'],
      'cho': ['tyo'],
      'ja': ['zya'],
      'ju': ['zyu'],
      'jo': ['zyo']
    };
    
    // Check for Hepburn variations
    const variations = hepburnVariations[kanaRomaji] || [];
    for (const variation of variations) {
      const variationMatch = this.findWordBoundaryMatch(romaji, variation, startIndex);
      if (variationMatch >= 0) {
        return variationMatch;
      }
    }
    
    // As a last resort, try a substring match without word boundary constraints
    return romaji.indexOf(kanaRomaji, startIndex);
  }

  /**
   * Find a match that respects word boundaries
   */
  private findWordBoundaryMatch(text: string, word: string, startIndex: number): number {
    // Word boundary characters
    const boundaries = [' ', ',', '.', '!', '?', '-', '(', ')', '[', ']', '\n', '\t'];
    
    let index = startIndex;
    while (true) {
      index = text.indexOf(word, index);
      if (index < 0) return -1;
      
      // Check if word is at the beginning of text
      const isAtStart = index === 0;
      
      // Check if previous character is a boundary
      const isPrevBoundary = !isAtStart && boundaries.includes(text[index - 1]);
      
      // Check if word is at the end of text
      const isAtEnd = index + word.length === text.length;
      
      // Check if next character is a boundary
      const isNextBoundary = !isAtEnd && boundaries.includes(text[index + word.length]);
      
      // Word is valid if it's at the boundaries or surrounded by boundaries
      if (isAtStart || isPrevBoundary) {
        if (isAtEnd || isNextBoundary) {
          return index;
        }
      }
      
      // Move to next position to continue search
      index += 1;
    }
  }

  /**
   * Find the anchor point immediately before a given position
   */
  private findPreviousAnchorPoint(position: number, alignmentPoints: AlignmentPoint[]): AlignmentPoint | null {
    let prevPoint = null;
    
    for (const point of alignmentPoints) {
      if (point.japaneseIndex + point.length <= position) {
        prevPoint = point;
      } else {
        break;
      }
    }
    
    return prevPoint;
  }

  /**
   * Find the anchor point immediately after a given position
   */
  private findNextAnchorPoint(position: number, alignmentPoints: AlignmentPoint[]): AlignmentPoint | null {
    for (const point of alignmentPoints) {
      if (point.japaneseIndex >= position) {
        return point;
      }
    }
    
    return null;
  }

  /**
   * Split romaji text into words with their positions
   */
  private splitRomajiIntoWords(romaji: string): {text: string, start: number, end: number}[] {
    const words: {text: string, start: number, end: number}[] = [];
    
    // Split by spaces and other word boundaries
    const wordRegex = /[a-z0-9]+(-[a-z0-9]+)*/g;
    let match;
    
    while ((match = wordRegex.exec(romaji)) !== null) {
      words.push({
        text: match[0],
        start: match.index,
        end: match.index + match[0].length
      });
    }
    
    return words;
  }

  /**
   * Cleanup romaji text (trim, handle spaces, etc.)
   */
  private cleanupRomaji(romaji: string): string {
    // Trim whitespace and remove punctuation
    let result = romaji.trim().replace(/[,.!?;:()\[\]]/g, '');
    
    // Remove particle words at the end
    const particles = ['wa', 'ga', 'o', 'ni', 'no', 'e', 'to', 'mo', 'de'];
    const words = result.split(/\s+/);
    
    if (words.length > 1 && particles.includes(words[words.length - 1])) {
      // Don't include the particle in the reading
      result = words.slice(0, -1).join(' ');
    }
    
    return result;
  }

  /**
   * Get hiragana characters immediately after a kanji
   */
  private getHiraganaAfterKanji(text: string, kanjiEndIndex: number): string {
    // Extract all consecutive hiragana characters after the kanji
    let hiraganaAfter = '';
    let index = kanjiEndIndex;
    
    while (index < text.length && this.isHiragana(text[index])) {
      hiraganaAfter += text[index];
      index++;
    }
    
    return hiraganaAfter;
  }
} 