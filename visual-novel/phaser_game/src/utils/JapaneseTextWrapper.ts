/**
 * JapaneseTextWrapper.ts
 * A utility class for handling proper line-breaking of Japanese text.
 * Implements the rules and approaches described in Japanese-Text-Line-Breaking.md
 */

/**
 * A class that handles wrapping Japanese text with proper line-breaking rules.
 * Respects Japanese typographic conventions (kinsoku shori) and character type transitions.
 */
export class JapaneseTextWrapper {
  // Characters prohibited at line end
  private static LINE_END_PROHIBITED = [
    '「', '『', '(', '［', '｛', '〈', '《', '【', '〔', '〖',
    '・', ':', '…', '—'
  ];

  // Characters prohibited at line start
  private static LINE_START_PROHIBITED = [
    '」', '』', ')', '］', '｝', '〉', '》', '】', '〕', '〗',
    '。', '、', '.', ',', '!', '?', '！', '？', '・', ':', ';', '…',
    'っ', 'ゃ', 'ゅ', 'ょ', 'ッ', 'ャ', 'ュ', 'ョ',
    'ー', 'ゝ', 'ゞ', 'ヽ', 'ヾ', '々', '〻'
  ];

  /**
   * Wrap Japanese text to a specified maximum line length.
   * @param text The Japanese text to wrap
   * @param maxLineLength The maximum length of each line (defaults to 43)
   * @param debug Whether to output debug information
   * @returns An array of wrapped text lines
   */
  public static wrapText(text: string, maxLineLength: number = 43, debug: boolean = false): string[] {
    if (!text || text.length <= maxLineLength) {
      return [text];
    }
    
    if (debug) {
      console.log(`Wrapping Japanese text (${text.length} characters): ${text.substring(0, 20)}...`);
    }
    
    const lines: string[] = [];
    let remainingText = text;
    
    while (remainingText.length > 0) {
      if (remainingText.length <= maxLineLength) {
        // If the remaining text fits in one line, add it and we're done
        lines.push(remainingText);
        break;
      }
      
      // Find the best break position within or just after maxLineLength
      const breakPosition = this.findBestBreakPosition(remainingText, maxLineLength, debug);
      
      // Add the line up to the break position
      lines.push(remainingText.substring(0, breakPosition));
      
      // Update the remaining text
      remainingText = remainingText.substring(breakPosition);
      
      if (debug) {
        console.log(`Line break at position: ${breakPosition}`);
      }
    }
    
    if (debug) {
      console.log(`Wrapped into ${lines.length} lines`);
    }
    
    return lines;
  }
  
  /**
   * Find the best position to break a line of Japanese text.
   * @param text The text to analyze
   * @param maxLineLength The maximum line length
   * @param debug Whether to output debug information
   * @returns The position at which to break the line
   */
  private static findBestBreakPosition(text: string, maxLineLength: number, debug: boolean): number {
    // Case 1: Exact fit or can break right at maxLineLength
    if (text.length === maxLineLength || 
        (text.length > maxLineLength && this.canBreakBetween(text.charAt(maxLineLength-1), text.charAt(maxLineLength)))) {
      return maxLineLength;
    }
    
    // Case 2: Allow one-character overflow for punctuation or prohibited line-start characters
    if (text.length > maxLineLength && 
        (this.isPunctuation(text.charAt(maxLineLength)) || 
         (text.length > maxLineLength + 1 && this.isLineStartProhibited(text.charAt(maxLineLength + 1))))) {
      if (debug) {
        console.log(`Allowing one character overflow for punctuation or prohibited line-start: ${text.charAt(maxLineLength)}`);
      }
      return maxLineLength + 1;
    }
    
    // Case 3: Look backward from maxLineLength to find a good breaking point
    for (let i = maxLineLength - 1; i >= Math.max(0, maxLineLength - 10); i--) {
      if (this.canBreakBetween(text.charAt(i), text.charAt(i + 1))) {
        const breakPriority = this.getBreakPriority(text.charAt(i), text.charAt(i + 1));
        if (breakPriority > 10) { // Only break at higher priority positions
          if (debug) {
            console.log(`Found good break position at ${i+1} with priority ${breakPriority}`);
          }
          return i + 1;
        }
      }
    }
    
    // Case 4: Special case for two consecutive kanji at the break point
    if (maxLineLength >= 1 && 
        this.getCharacterType(text.charAt(maxLineLength - 1)) === 'kanji' && 
        this.getCharacterType(text.charAt(maxLineLength)) === 'kanji') {
      
      // Look for previous non-kanji character
      for (let i = maxLineLength - 2; i >= Math.max(0, maxLineLength - 10); i--) {
        if (this.getCharacterType(text.charAt(i)) !== 'kanji') {
          if (debug) {
            console.log(`Breaking after non-kanji character at position ${i+1}`);
          }
          return i + 1;
        }
      }
    }
    
    // Case 5: If we can't find a good breaking point, use maxLineLength as fallback
    if (debug) {
      console.log(`No good break point found, using max length: ${maxLineLength}`);
    }
    return maxLineLength;
  }
  
  /**
   * Determine if a break can occur between two characters.
   * @param char1 The character before the potential break
   * @param char2 The character after the potential break
   * @returns True if breaking is allowed, false otherwise
   */
  private static canBreakBetween(char1: string, char2: string): boolean {
    // Cannot break if char1 is prohibited at line end
    if (this.isLineEndProhibited(char1)) {
      return false;
    }
    
    // Cannot break if char2 is prohibited at line start
    if (this.isLineStartProhibited(char2)) {
      return false;
    }
    
    return true;
  }
  
  /**
   * Get the priority of breaking between two characters.
   * Higher values indicate better breaking positions.
   * @param char1 The character before the potential break
   * @param char2 The character after the potential break
   * @returns A priority score (higher is better)
   */
  private static getBreakPriority(char1: string, char2: string): number {
    // Highest priority: Breaking after sentence-ending punctuation
    if (['。', '！', '？', '.', '!', '?'].includes(char1)) {
      return 100;
    }
    
    // Very high priority: Breaking after commas and other punctuation
    if (['、', ',', '；', ';'].includes(char1)) {
      return 90;
    }
    
    // High priority: Breaking between different character types
    const type1 = this.getCharacterType(char1);
    const type2 = this.getCharacterType(char2);
    
    if (type1 !== type2) {
      // Transitions between different character types
      if (type1 === 'kanji' && type2 === 'hiragana') return 80; // Very common word boundary
      if (type1 === 'hiragana' && type2 === 'kanji') return 75; // Also common
      if (type1 === 'katakana' && type2 !== 'katakana') return 70;
      if (type1 !== 'katakana' && type2 === 'katakana') return 65;
      if (type1 === 'latin' && type2 !== 'latin') return 60;
      if (type1 !== 'latin' && type2 === 'latin') return 60;
      
      // General different type transitions
      return 60;
    }
    
    // Medium priority: Any other position that's allowed
    return 10;
  }
  
  /**
   * Identify the type of a Japanese character.
   * @param char The character to identify
   * @returns The character type
   */
  private static getCharacterType(char: string): 'kanji' | 'hiragana' | 'katakana' | 'latin' | 'numeric' | 'punctuation' | 'other' {
    const code = char.charCodeAt(0);
    
    // Hiragana range
    if (code >= 0x3040 && code <= 0x309F) {
      return 'hiragana';
    }
    
    // Katakana range (including half-width katakana)
    if ((code >= 0x30A0 && code <= 0x30FF) || (code >= 0xFF66 && code <= 0xFF9D)) {
      return 'katakana';
    }
    
    // Kanji ranges (CJK Unified Ideographs)
    if ((code >= 0x4E00 && code <= 0x9FFF) ||   // CJK Unified Ideographs
        (code >= 0x3400 && code <= 0x4DBF) ||   // CJK Unified Ideographs Extension A
        (code >= 0x20000 && code <= 0x2A6DF) || // CJK Unified Ideographs Extension B
        (code >= 0x2A700 && code <= 0x2B73F) || // CJK Unified Ideographs Extension C
        (code >= 0x2B740 && code <= 0x2B81F) || // CJK Unified Ideographs Extension D
        (code >= 0x2B820 && code <= 0x2CEAF)) { // CJK Unified Ideographs Extension E
      return 'kanji';
    }
    
    // Latin alphabet (full-width and half-width)
    if ((code >= 0x0041 && code <= 0x005A) || // A-Z
        (code >= 0x0061 && code <= 0x007A) || // a-z
        (code >= 0xFF21 && code <= 0xFF3A) || // Full-width A-Z
        (code >= 0xFF41 && code <= 0xFF5A)) { // Full-width a-z
      return 'latin';
    }
    
    // Numeric characters (full-width and half-width)
    if ((code >= 0x0030 && code <= 0x0039) || // 0-9
        (code >= 0xFF10 && code <= 0xFF19)) { // Full-width 0-9
      return 'numeric';
    }
    
    // Punctuation
    if (this.isPunctuation(char)) {
      return 'punctuation';
    }
    
    return 'other';
  }
  
  /**
   * Check if a character is prohibited from appearing at the end of a line.
   * @param char The character to check
   * @returns True if prohibited, false otherwise
   */
  private static isLineEndProhibited(char: string): boolean {
    return this.LINE_END_PROHIBITED.includes(char);
  }
  
  /**
   * Check if a character is prohibited from appearing at the start of a line.
   * @param char The character to check
   * @returns True if prohibited, false otherwise
   */
  private static isLineStartProhibited(char: string): boolean {
    return this.LINE_START_PROHIBITED.includes(char);
  }
  
  /**
   * Check if a character is a punctuation mark.
   * @param char The character to check
   * @returns True if it's punctuation, false otherwise
   */
  private static isPunctuation(char: string): boolean {
    const punctuation = '。、,.!?！？「」『』()（）""\'…—–';
    return punctuation.includes(char);
  }
  
  /**
   * Simple helper method to wrap text and join with newlines for direct use in text fields.
   * @param text The text to wrap
   * @param maxLineLength The maximum length of each line
   * @param debug Whether to output debug information
   * @returns The wrapped text with newlines
   */
  public static wrap(text: string, maxLineLength: number = 43, debug: boolean = false): string {
    return this.wrapText(text, maxLineLength, debug).join('\n');
  }
} 