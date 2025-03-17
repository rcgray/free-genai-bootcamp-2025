# Study Scene Layout Specification

## Overview

The Study Scene Layout is a critical component of our Japanese Language Learning Visual Novel. It provides an immersive, educational interface where players can study Japanese phrases encountered during gameplay. When players click the "Study" button on dialog text, they're transitioned to this overlay scene where they can learn detailed information about Japanese vocabulary, grammar, and cultural context.

This document outlines the design, functionality, and implementation details of the Study Scene Layout, with specific attention to information organization and visual presentation that maximizes learning effectiveness.

## Study Data Structure

The Study Scene will display detailed information about Japanese phrases. Based on the LLM prompt template in `Game-LLM-Prompts.md`, we'll organize the following information:

```typescript
interface PhraseAnalysis {
  word_breakdown: WordBreakdown[];
  grammar_points: GrammarPoint[];
  cultural_notes: string;
  alternative_expressions: AlternativeExpression[];
  example_sentences: ExampleSentence[];
  pronunciation_tips: string;
  common_mistakes: string;
}

interface WordBreakdown {
  word: string;              // Japanese word
  reading: string;           // Reading in hiragana
  romaji: string;            // Romaji pronunciation
  part_of_speech: string;    // Noun, verb, adjective, etc.
  meaning: string;           // English meaning
  notes?: string;            // Optional usage notes
}

interface GrammarPoint {
  pattern: string;           // Grammar pattern
  explanation: string;       // Explanation of the grammar
  usage_notes: string;       // Notes on usage
  difficulty_level: string;  // beginner, intermediate, advanced
}

interface AlternativeExpression {
  japanese: string;          // Alternative phrase in Japanese
  romaji: string;            // Romaji pronunciation
  english: string;           // English translation
  usage_context: string;     // When to use this alternative
}

interface ExampleSentence {
  japanese: string;          // Example sentence in Japanese
  romaji: string;            // Romaji pronunciation
  english: string;           // English translation
}
```

## Layout Design

The Study Scene layout will be organized into clear, visually distinct sections to help players focus on specific aspects of language learning.

### Main Components

1. **Header Section**
   - Original phrase (large, centered text with furigana)
   - Source context (who said it, where, when)
   - Button to return to Visual Novel Scene

2. **Tabbed Information Panel**
   - Tab navigation for different categories of information
   - Content area that changes based on selected tab
   - Scroll functionality for overflow content

3. **Word Breakdown Tab**
   - Table-like layout showing each word in the phrase
   - Japanese, reading, romaji, part of speech, meaning columns
   - Visual emphasis on the selected word

4. **Grammar Points Tab**
   - Expandable sections for each grammar point
   - Pattern, explanation, usage notes, difficulty level
   - Visual color-coding by difficulty level

5. **Examples & Alternatives Tab**
   - Example sentences with Japanese, romaji, English
   - Alternative expressions with when to use them
   - Audio playback buttons (future enhancement)

6. **Cultural Notes Tab**
   - Cultural context explanation
   - Pronunciation tips
   - Common mistakes to avoid

### Visual Design Elements

1. **Color Scheme**
   - Background: Semi-transparent dark overlay (#000000, 80% opacity)
   - Content Panel: Dark gray (#333333)
   - Highlights: Accent color for active tabs and important text (#4A90E2)
   - Text: White for readability (#FFFFFF)
   - Secondary Text: Light gray for less important information (#CCCCCC)
   - Difficulty Levels: Beginner (Green), Intermediate (Yellow), Advanced (Red)

2. **Typography**
   - Japanese Text: Clear, readable font with good support for Japanese characters
   - Romaji: Slightly smaller than Japanese text
   - English: Same size as Romaji but different style
   - Headings: Bold, slightly larger for section titles
   - Tab Labels: Bold, centered

3. **Interactive Elements**
   - Tabs: Clear visual feedback for hover and selected states
   - Scroll Controls: Subtle arrows or scrollbar
   - Back Button: Prominent positioning for easy return to game
   - Word Selection: Highlight effect when clicking words

## Visual Mockup

```
+-------------------------------------------------+
|                                                 |
|  +-------------------------------------------+  |
|  |              Original Phrase              |  |
|  |          (with furigana if needed)        |  |
|  +-------------------------------------------+  |
|                                                 |
|  +-------------------------------------------+  |
|  | Words | Grammar | Examples | Cultural Notes |  |
|  +-------------------------------------------+  |
|                                                 |
|  +-------------------------------------------+  |
|  |                                           |  |
|  |                                           |  |
|  |                                           |  |
|  |        Selected Tab Content Area          |  |
|  |             (scrollable)                  |  |
|  |                                           |  |
|  |                                           |  |
|  |                                           |  |
|  +-------------------------------------------+  |
|                                                 |
|  +-------------------------------------------+  |
|  |            Return to Game Button          |  |
|  +-------------------------------------------+  |
|                                                 |
+-------------------------------------------------+
```

## Example Phrase Analysis

To illustrate the content that will appear in the Study Scene, let's analyze a sample phrase from our dialog:

**Original Phrase:** 日本では電車がとても便利です。地下鉄や山手線を使うと、どこでも行けますよ。
**Romaji:** Tokyo dewa densha ga totemo benri desu. Chikatetsu ya Yamanote-sen wo tsukau to, doko demo ikemasu yo.
**English:** Trains are very convenient in Tokyo. If you use the subway or Yamanote Line, you can go anywhere.

### Word Breakdown

| Word | Reading | Romaji | Part of Speech | Meaning |
|------|---------|--------|----------------|---------|
| 日本 | にほん | nihon | noun | Japan |
| では | では | dewa | particle | in, at |
| 電車 | でんしゃ | densha | noun | train |
| が | が | ga | particle | subject marker |
| とても | とても | totemo | adverb | very |
| 便利 | べんり | benri | na-adjective | convenient |
| です | です | desu | copula | is |
| 地下鉄 | ちかてつ | chikatetsu | noun | subway |
| や | や | ya | particle | and, or |
| 山手線 | やまのてせん | yamanote-sen | noun | Yamanote Line (Tokyo train line) |
| を | を | wo | particle | object marker |
| 使う | つかう | tsukau | verb | to use |
| と | と | to | particle | if, when |
| どこ | どこ | doko | pronoun | where, anywhere |
| でも | でも | demo | particle | even, also |
| 行けます | いけます | ikemasu | verb | can go |
| よ | よ | yo | particle | emphasis |

### Grammar Points

1. **Pattern:** 〜では
   **Explanation:** Indicates location where something takes place
   **Usage Notes:** Similar to 〜で but adds slight emphasis
   **Difficulty Level:** Beginner

2. **Pattern:** 〜と、〜
   **Explanation:** "If/when A, then B" conditional pattern
   **Usage Notes:** Expresses natural result or consequence
   **Difficulty Level:** Beginner

3. **Pattern:** どこでも
   **Explanation:** "Anywhere" - combination of どこ (where) and でも (even)
   **Usage Notes:** Part of the ~でも grammar pattern for expressing "anywhere," "anytime," etc.
   **Difficulty Level:** Intermediate

### Cultural Notes

The Tokyo train system is famous worldwide for its efficiency and punctuality. The Yamanote Line is one of Tokyo's most famous train lines, forming a loop around central Tokyo and connecting many major stations. Japanese people rely heavily on public transportation, especially in urban areas where owning a car can be expensive and impractical.

### Example Sentences

1. **Japanese:** 山手線は東京の主要駅をつなぐ環状線です。
   **Romaji:** Yamanote-sen wa Tokyo no shuyō eki o tsunagu kanjō-sen desu.
   **English:** The Yamanote Line is a loop line connecting Tokyo's major stations.

2. **Japanese:** どこに行きたいですか？地下鉄を使えば、簡単に行けますよ。
   **Romaji:** Doko ni ikitai desu ka? Chikatetsu o tsukaeba, kantan ni ikemasu yo.
   **English:** Where do you want to go? If you use the subway, you can easily get there.

### Alternative Expressions

1. **Japanese:** 東京の交通機関はとても発達しています。
   **Romaji:** Tokyo no kōtsū kikan wa totemo hattatsu shite imasu.
   **English:** Tokyo's public transportation is very well-developed.
   **Usage Context:** More formal expression, suitable for written descriptions

2. **Japanese:** 電車に乗れば、簡単に移動できます。
   **Romaji:** Densha ni noreba, kantan ni idō dekimasu.
   **English:** If you take the train, you can move around easily.
   **Usage Context:** Slightly more casual than using 使う (to use)

### Pronunciation Tips

- Pay attention to the particle は which is pronounced "wa" when used as a topic marker
- In 山手線 (Yamanote-sen), the "no" in やまのて is often spoken quickly and may sound like やまんて
- The sentence-ending particle よ (yo) should be pronounced with a slight rising intonation to express helpfulness

### Common Mistakes

- Non-native speakers often confuse the particles は (wa) and が (ga)
- The word 便利 (benri) is often mispronounced with incorrect stress
- Many learners struggle with the conditional と (to) pattern, mistaking it for the quotation particle
- Forgetting to use the particle を (wo) before the verb 使う (tsukau)

## Implementation Plan

### Phase 1: Basic Layout and Structure
- [ ] Create TabPanel component for organizing content
- [ ] Implement basic layout with header, tabs, and content area
- [ ] Set up navigation between tabs
- [ ] Create transition animations for tab switching

### Phase 2: Content Display Components
- [ ] Implement WordBreakdownTable component for displaying word analysis
- [ ] Create GrammarPointCard component for grammar explanations
- [ ] Build ExampleSentenceList for displaying example sentences
- [ ] Develop AlternativeExpressionList component
- [ ] Create CulturalNotes component with sections for different note types

### Phase 3: Data Integration
- [ ] Create sample data structure with phrase analysis
- [ ] Connect components to data model
- [ ] Implement scrolling for overflow content
- [ ] Add highlighting and selection features for interactive elements

### Phase 4: Visual Styling and Polish
- [ ] Apply consistent color scheme
- [ ] Implement typography standards
- [ ] Add visual feedback for interactive elements
- [ ] Create smooth transitions and animations
- [ ] Ensure responsive layout for different screen sizes

### Phase 5: Integration with VN Scene
- [ ] Refine transition between VN Scene and Study Scene
- [ ] Ensure state preservation when returning to VN Scene
- [ ] Add HMR support for development workflow
- [ ] Test with various phrases and dialog contexts

### Phase 6: Future Enhancements (For Later)
- [ ] Add audio playback for pronunciation
- [ ] Implement vocabulary tracking
- [ ] Create quiz functionality for self-testing
- [ ] Build history feature to review previously studied phrases

## Technical Considerations

### Performance Optimization
- Lazy load tabs to improve initial render time
- Efficiently render Japanese text with furigana
- Optimize scrolling performance for mobile devices

### Memory Management
- Clean up resources when leaving the Study Scene
- Properly handle scene transitions to prevent memory leaks

### Error Handling
- Graceful fallback for missing phrase data
- Handle incomplete analysis gracefully
- Provide useful error messages for development

## User Experience Considerations

### Accessibility
- Ensure sufficient color contrast
- Support keyboard navigation
- Allow text size adjustment

### Language Learning Focus
- Clear distinction between Japanese, romaji, and English
- Consistent presentation of language elements
- Progressive disclosure of complex grammar points

### Gameplay Flow
- Smooth transition between game and study mode
- Quick return to gameplay
- Preserving game state during study sessions

## Conclusion

The Study Scene Layout is designed to provide an immersive, educational interface for learning Japanese. By organizing information into clear, visually distinct sections and providing a rich set of language learning tools, we aim to enhance the player's understanding of Japanese vocabulary, grammar, and cultural context encountered during gameplay.

The implementation will follow a phased approach, starting with the basic layout and structure, then adding content display components, data integration, visual styling, and finally integration with the Visual Novel Scene. Future enhancements will include audio playback, vocabulary tracking, and quiz functionality to further enhance the learning experience. 