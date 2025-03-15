/**
 * FuriganaRenderer.test.ts
 * 
 * Manual tests for the FuriganaRenderer class
 * These tests can be run manually by importing this file
 * and checking the console output.
 */

import { FuriganaRenderer, KanjiWithReading } from '../src/utils/FuriganaRenderer';

// Helper function to log to both console and UI
function logToUI(message: string): void {
  // Log to console
  console.log(message);
  
  // Also log to UI if the element exists
  const testResults = document.getElementById('test-results');
  if (testResults) {
    testResults.innerHTML += message + '<br>';
  }
}

// Mock a minimal Phaser scene for testing
class MockScene {
  add = {
    container: (x: number, y: number) => {
      logToUI(`Creating container at (${x}, ${y})`);
      return {
        x, y,
        add: (obj: any) => {
          logToUI(`Adding object to container`);
        },
        children: []
      };
    },
    text: (x: number, y: number, text: string, style: any) => {
      logToUI(`Creating text "${text}" at (${x}, ${y})`);
      return {
        x, y, text, style,
        setOrigin: (x: number, y: number) => {
          logToUI(`Setting origin to (${x}, ${y})`);
        },
        width: text.length * 10,
        height: 20
      };
    }
  };
}

/**
 * Run all tests for the FuriganaRenderer
 */
export function runFuriganaTests() {
  // Clear previous test results
  const testResults = document.getElementById('test-results');
  if (testResults) {
    testResults.innerHTML = '';
  }
  
  logToUI('=== Running FuriganaRenderer Tests ===');
  
  // Create the renderer with the mock scene
  const mockScene = new MockScene();
  const renderer = new FuriganaRenderer(mockScene as any, {
    baseTextStyle: {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#ffffff'
    }
  });
  
  // Test character type detection
  testCharacterTypeDetection(renderer);
  
  // Test kanji identification
  testKanjiIdentification(renderer);
  
  // Test kanji-to-readings mapping
  testKanjiToReadingsMapping(renderer);
  
  // Test furigana text creation
  testFuriganaTextCreation(renderer);
  
  logToUI('=== Tests Complete ===');
}

/**
 * Test character type detection (hiragana, katakana, kanji, etc.)
 */
function testCharacterTypeDetection(renderer: FuriganaRenderer) {
  logToUI('\n--- Testing Character Type Detection ---');
  
  // Access the private methods for testing
  const isKanji = (char: string) => (renderer as any).isKanji(char);
  const isHiragana = (char: string) => (renderer as any).isHiragana(char);
  const isKatakana = (char: string) => (renderer as any).isKatakana(char);
  const isPunctuation = (char: string) => (renderer as any).isPunctuation(char);
  
  // Test various Japanese characters
  const testChars = [
    { char: '日', expected: { kanji: true, hiragana: false, katakana: false, punctuation: false }, desc: 'kanji' },
    { char: 'あ', expected: { kanji: false, hiragana: true, katakana: false, punctuation: false }, desc: 'hiragana' },
    { char: 'ア', expected: { kanji: false, hiragana: false, katakana: true, punctuation: false }, desc: 'katakana' },
    { char: '。', expected: { kanji: false, hiragana: false, katakana: false, punctuation: true }, desc: 'punctuation' },
    { char: 'a', expected: { kanji: false, hiragana: false, katakana: false, punctuation: false }, desc: 'latin' }
  ];
  
  testChars.forEach(test => {
    const results = {
      kanji: isKanji(test.char),
      hiragana: isHiragana(test.char),
      katakana: isKatakana(test.char),
      punctuation: isPunctuation(test.char)
    };
    
    logToUI(`Character '${test.char}' (${test.desc}):`);
    logToUI(`  Kanji: ${results.kanji} (Expected: ${test.expected.kanji}) - ${results.kanji === test.expected.kanji ? 'PASS' : 'FAIL'}`);
    logToUI(`  Hiragana: ${results.hiragana} (Expected: ${test.expected.hiragana}) - ${results.hiragana === test.expected.hiragana ? 'PASS' : 'FAIL'}`);
    logToUI(`  Katakana: ${results.katakana} (Expected: ${test.expected.katakana}) - ${results.katakana === test.expected.katakana ? 'PASS' : 'FAIL'}`);
    logToUI(`  Punctuation: ${results.punctuation} (Expected: ${test.expected.punctuation}) - ${results.punctuation === test.expected.punctuation ? 'PASS' : 'FAIL'}`);
  });
}

/**
 * Test the isKanji method
 */
function testKanjiIdentification(renderer: FuriganaRenderer) {
  logToUI('\n--- Testing Kanji Identification ---');
  
  // Access the private isKanji method for testing
  const isKanji = (char: string) => {
    return (renderer as any).isKanji(char);
  };
  
  // Test kanji characters
  const kanjiChars = ['日', '本', '語', '学', '校', '先', '生'];
  kanjiChars.forEach(char => {
    const result = isKanji(char);
    logToUI(`isKanji('${char}') = ${result}, Expected: true, ${result === true ? 'PASS' : 'FAIL'}`);
  });
  
  // Test non-kanji characters
  const nonKanjiChars = ['あ', 'ア', 'a', '1', ' ', '、', '。'];
  nonKanjiChars.forEach(char => {
    const result = isKanji(char);
    logToUI(`isKanji('${char}') = ${result}, Expected: false, ${result === false ? 'PASS' : 'FAIL'}`);
  });
}

/**
 * Test the mapKanjiToReadings method
 */
function testKanjiToReadingsMapping(renderer: FuriganaRenderer) {
  logToUI('\n--- Testing Kanji-to-Readings Mapping ---');
  
  // Test cases with increasingly complex scenarios
  const testCases = [
    // Basic Japanese sentence with single kanji
    {
      text: '日本語は楽しいです',
      romaji: 'Nihongo wa tanoshii desu',
      description: 'Basic sentence with compound kanji (日本語) and single kanji (楽)'
    },
    // Mixed script with katakana and kanji
    {
      text: 'カフェで本を読みます',
      romaji: 'Kafe de hon o yomimasu',
      description: 'Mixed script with katakana (カフェ) and kanji (本, 読)'
    },
    // Sentence with multiple kanji compounds
    {
      text: '彼女は東京大学の学生です',
      romaji: 'Kanojo wa Tokyo daigaku no gakusei desu',
      description: 'Multiple kanji compounds (東京大学, 学生)'
    },
    // Complex sentence with punctuation
    {
      text: '昨日、私は新しい本を3冊買いました。',
      romaji: 'Kinou, watashi wa atarashii hon o san-satsu kaimashita.',
      description: 'Complex sentence with punctuation and numbers'
    },
    // Multiple consecutive kanji compounds
    {
      text: '日本語能力試験に合格しました',
      romaji: 'Nihongo nouryoku shiken ni goukaku shimashita',
      description: 'Multiple consecutive kanji compounds (日本語, 能力, 試験, 合格)'
    }
  ];
  
  testCases.forEach((testCase, index) => {
    logToUI(`\nTest case ${index + 1}: "${testCase.text}"`);
    logToUI(`Romaji: "${testCase.romaji}"`);
    logToUI(`Description: ${testCase.description}`);
    
    const result = renderer.mapKanjiToReadings(testCase.text, testCase.romaji);
    
    logToUI(`Found ${result.length} kanji sequences:`);
    result.forEach((kr, i) => {
      logToUI(`  ${i+1}. '${kr.kanji}' (${kr.startIndex}-${kr.endIndex}) => '${kr.reading}'`);
    });
  });
  
  // Test special cases and edge cases
  logToUI('\n--- Testing Special Cases ---');
  
  // Text with no kanji
  const noKanjiTest = {
    text: 'すべてひらがなです',
    romaji: 'Subete hiragana desu',
    description: 'Text with no kanji'
  };
  
  logToUI(`\nSpecial case: "${noKanjiTest.text}"`);
  logToUI(`Romaji: "${noKanjiTest.romaji}"`);
  logToUI(`Description: ${noKanjiTest.description}`);
  
  const noKanjiResult = renderer.mapKanjiToReadings(noKanjiTest.text, noKanjiTest.romaji);
  logToUI(`Found ${noKanjiResult.length} kanji sequences (Expected: 0)`);
  
  // Text with kanji at the beginning, middle, and end
  const positionTest = {
    text: '山がある町の川',
    romaji: 'Yama ga aru machi no kawa',
    description: 'Kanji at the beginning (山), middle (町), and end (川)'
  };
  
  logToUI(`\nSpecial case: "${positionTest.text}"`);
  logToUI(`Romaji: "${positionTest.romaji}"`);
  logToUI(`Description: ${positionTest.description}`);
  
  const positionResult = renderer.mapKanjiToReadings(positionTest.text, positionTest.romaji);
  logToUI(`Found ${positionResult.length} kanji sequences (Expected: 3)`);
  positionResult.forEach((kr, i) => {
    logToUI(`  ${i+1}. '${kr.kanji}' (${kr.startIndex}-${kr.endIndex}) => '${kr.reading}'`);
  });
}

/**
 * Test the createFuriganaText method
 */
function testFuriganaTextCreation(renderer: FuriganaRenderer) {
  logToUI('\n--- Testing Furigana Text Creation ---');
  
  // Test different text examples
  const testCases = [
    {
      text: '日本語',
      romaji: 'Nihongo',
      description: 'Simple compound kanji'
    },
    {
      text: '私は学生です',
      romaji: 'Watashi wa gakusei desu',
      description: 'Mixed script with personal pronoun'
    }
  ];
  
  testCases.forEach((testCase, index) => {
    logToUI(`\nTest case ${index + 1}: "${testCase.text}"`);
    logToUI(`Romaji: "${testCase.romaji}"`);
    logToUI(`Description: ${testCase.description}`);
    
    const container = renderer.createFuriganaText(10, 20, testCase.text, testCase.romaji);
    
    // The mock container should already have children array - we can just check
    // how many objects would be added (base text + furigana for each kanji)
    logToUI(`Container created at (${container.x}, ${container.y})`);
    logToUI(`Expected children: 1 (base text) + furigana texts for kanji`);
  });
}

// Uncomment to run tests directly
// runFuriganaTests(); 