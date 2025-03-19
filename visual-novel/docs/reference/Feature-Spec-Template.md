# Study Scene Layout Specification

## Overview

The Study Scene is a crucial component of our Japanese Language Learning Visual Novel. It serves as an educational overlay that appears when players click the "Study" button on dialog text. This scene provides detailed information about Japanese phrases and their linguistic elements, helping English speakers better understand and learn the language.

This document outlines our approach to the Study Scene layout, focusing on what information would be most valuable to an English-speaking learner encountering Japanese phrases in our game.

Note that this file serves as both a brainstorming collection and an implementation plan. Items marked with (NOTYET) are not yet planned for implementation, but we will keep these in mind for future iterations.

## Core Learning Needs for English Speakers

As an English speaker learning Japanese, several key challenges need to be addressed:

1. **Pronunciation and Reading**: Understanding how to read and pronounce Japanese characters
2. **Word Identification**: Recognizing individual words within phrases/sentences
3. **Grammar Structure**: Understanding how Japanese grammar differs from English
4. **Cultural Context**: Learning cultural nuances that affect language usage
5. **Usage Examples**: Seeing practical applications of phrases in different contexts
6. **Common Pitfalls**: Avoiding typical mistakes made by English speakers

## Information Categories

Based on the above learning needs and our review of the LLM prompt in `Game-LLM-Prompts.md`, we've identified these potential information categories for the Study Scene:

### Essential Information
- Original Japanese phrase
- Romaji pronunciation 
- English translation

### Word Breakdown
- Individual words identified
- Reading in hiragana
- Part of speech
- English meaning
- Usage notes

### Grammar Points
- Key grammar patterns in the phrase
- Simple explanation of each pattern
- Usage examples
- Difficulty level indication

### Cultural Context
- Cultural background relevant to the phrase
- Situational usage notes
- Formality level explanation
- Historical or social context

### Usage Examples
- Additional example sentences using similar patterns
- Alternative expressions with similar meanings
- Context for when to use alternatives
- Register variations (casual, polite, formal)

### Learning Support
- Pronunciation tips
- Common mistakes to avoid
- Memory aids for challenging aspects
- Related vocabulary

## Visual Design

The Study Scene should take up the large majority of the screen while allowing the VN Scene to remain visible in the background. This creates a sense of continuity while providing ample space for educational content.

### Layout Design

After considering our target audience and technical constraints, we recommend a simplified hybrid approach:

1. **Top Section (Always Visible)**
   - Original Japanese phrase
   - Romaji pronunciation
   - English translation
   - "Back to Game" button

2. **Main Content Area (Vertically Scrollable)**
   - Word Breakdown section
   - 1-2 Key Grammar Points section
   - Brief Cultural Note (if applicable)
   - 1-2 Example Sentences
   - Simple Learning Tips

The top section remains fixed while the main content area can be scrolled vertically if the content exceeds the available space. This approach places the most critical information at the top and presents supporting details in a clear, scrollable format.

### Visual Elements

- **Background**: Semi-transparent dark overlay (approximately 80% opacity) allowing some visibility of the paused VN Scene behind it
- **Content Area**: Centered panel with thin borders, taking approximately 85-90% of the screen space
- **Typography**: Clear, readable fonts with proper sizing hierarchy:
  - Japanese text: Larger size for focus
  - Section headers: Bold, clearly distinct
  - Content text: Standard size with good readability
- **Color Scheme**: Dark background with light text for readability, accent colors for section headings
- **Scrollbar/Indicators**: Subtle but visible scrolling indicators when content exceeds the visible area

## Visual Mockup

```
+---------------------------------------------------+
|                                                   |
|  +---------------------------Back--------------+  |
|  |                                             |  |
|  |  日本では電車がとても便利です。             |  |
|  |                                             |  |
|  |  Nihon dewa densha ga totemo benri desu.    |  |
|  |                                             |  |
|  |  Trains are very convenient in Japan.       |  |
|  |                                             |  |
|  +---------------------------------------------+  |
|                                                   |
|  +---------Word Breakdown----------------------+  |
|  |                                             |  |
|  | 日本 (にほん) - nihon - noun - Japan        |  |
|  | では - dewa - particle - in, at             |  |
|  | 電車 (でんしゃ) - densha - noun - train     |  |
|  | が - ga - particle - subject marker         |  |
|  | とても - totemo - adverb - very             |  |
|  | 便利 (べんり) - benri - na-adj - convenient |  |
|  | です - desu - copula - is                   |  |
|  |                                             |  |
|  +---------------------------------------------+  |
|                                                   |
|  +---------Grammar Points----------------------+  |
|  |                                             |  |
|  | ～では (dewa)                               |  |
|  | - Shows location where something occurs     |  |
|  | - Similar to で but with slight emphasis    |  |
|  | - BEGINNER LEVEL                            |  |
|  |                                             |  |
|  +---------------------------------------------+  |
|                                                   |
|  +---------Example Sentence--------------------+  |
|  |                                             |  |
|  | 東京では電車が便利です。                    |  |
|  | Tōkyō dewa densha ga benri desu.            |  |
|  | Trains are convenient in Tokyo.             |  |
|  |                                             |  |
|  +---------------------------------------------+  |
|                                                   |
|  +---------Learning Tips-----------------------+  |
|  |                                             |  |
|  | • は is pronounced "wa" when used as topic  |  |
|  | • Don't confuse が (ga) and は (wa)         |  |
|  | • "benri" has stress on first syllable      |  |
|  |                                             |  |
|  +---------------------------------------------+  |
|                                                   |
+---------------------------------------------------+
```

## Content Prioritization

For each phrase, we'll need to generate appropriate information through our LLM. Since we have limited space, we'll prioritize information as follows:

1. **Must-Have Information** (always included):
   - Word breakdown (at least for key words)
   - One primary grammar point
   - At least one example sentence
   - 1-2 learning tips

2. **Include When Relevant**:
   - Cultural context (when phrase has cultural significance)
   - Alternative expressions (when there are common variations)
   - Pronunciation tips (for challenging sounds)
   - Formality notes (when register is important)

3. **Optional Enhancements** (space permitting):
   - Related vocabulary
   - Extended grammar explanations
   - Additional example sentences
   - Visual aids or diagrams

This tiered approach to information categories provides important flexibility when working with LLMs, which may not always return consistent data. By clearly separating must-have content from optional elements, we can gracefully handle cases where the LLM provides incomplete or unexpected responses. Our UI will be designed to adapt to available data, maintaining a coherent learning experience even when certain information types aren't available.

## Scrolling Implementation

For the scrollable Main Content Area, we have two implementation options:

1. **Native Phaser Scrolling**: Implementing scrolling using Phaser's container with masks and input handling for dragging. This approach keeps all implementation within Phaser but requires custom handling of scrolling logic.

2. **Community Plugin**: Using a UI plugin like `rex-ui` that provides pre-built scrollable panels. This may simplify implementation but adds a dependency.

Given that our needs are focused on simple vertical scrolling for UI elements (rather than game world scrolling), we recommend implementing a basic masked container with drag handling if a plugin is not already in use. This approach will be sufficient for our straightforward scrolling needs.

## Additional Features (NOTYET)

The following features should be considered for future enhancements but are not part of the current scope:

1. **Audio Playback**: Adding pronunciation audio for phrases and examples 
2. **Interactive Elements**: Allowing players to click on words for more details
3. **Progress Tracking**: Marking phrases as "studied" or "mastered"
4. **Related Phrases**: Suggesting similar phrases from previous encounters
5. **Spaced Repetition**: Integrating learning science principles for review
6. **Quiz Features**: Adding simple recall or translation exercises
7. **Favorites**: Letting players bookmark phrases for later review
8. **Custom Notes**: Allowing players to add their own notes to phrases

## Feature Implementation Plan (FIP)

### Phase 1: Basic Study Scene Structure
- [x] Update StudyScene.ts with the new design approach
- [x] Create the semi-transparent background overlay with proper sizing (85-90% of screen)
- [x] Implement the "Back" button with proper functionality
- [x] Set up the basic layout structure for fixed header and scrollable content area
- [x] Ensure proper scene transition and state preservation between VN Scene and Study Scene

### Phase 2: Test Data Creation
- [x] Create comprehensive test data object representing LLM analysis of a Japanese phrase
- [x] Include realistic content for all sections (word breakdown, grammar points, etc.)
- [x] Develop multiple variations of test data with different lengths/complexities
- [x] Create edge cases (missing optional data, long content sections, etc.)
- [x] Document the test data structure for reference

### Phase 3: Fixed Header Implementation
- [x] Implement the display of the original Japanese phrase with proper formatting
- [x] Create the romaji pronunciation display
- [x] Implement the English translation display
- [x] Ensure proper text wrapping and positioning for all text elements

### Phase 4: Scrollable Content Area
- [x] Implement the vertical scrolling container for the Main Content Area
- [x] Create section headers with consistent styling
- [x] Implement basic scroll indicators or scrollbar
- [x] Ensure proper touch/mouse input handling for scrolling
- [x] Test scrolling with varying content lengths

### Phase 5: Content Sections Implementation
- [x] Create the Word Breakdown section with proper formatting
- [x] Implement the Grammar Points section with appropriate styling
- [x] Add the Example Sentences section with proper Japanese/romaji/English display
- [x] Create the Learning Tips section with clear, readable formatting
- [x] Ensure consistent spacing and visual hierarchy between sections

### Phase 6: Integration and Testing
- [x] Connect the Study Scene to receive data from the dialog system
- [x] Test the scene with various phrases of different lengths
- [x] Verify proper display of Japanese text and romaji
- [x] Ensure scrolling works correctly with different content lengths
- [x] Confirm that returning to the VN Scene works as expected
- [x] Verify that the scene handles window resizing appropriately

### Phase 7: Visual Polish
- [x] Refine typography and text sizing for optimal readability
- [x] Add subtle animations for scene transitions
- [x] Improve visual feedback for the scrolling interaction
- [x] Ensure consistent visual styling with the rest of the game
- [x] Add final visual touches for a polished look and feel

## Conclusion

The Study Scene represents a critical educational component of our Japanese Language Learning Visual Novel. By focusing on the specific needs of English speakers learning Japanese and presenting information in a clear, accessible format, we can create an effective learning tool that enhances the overall game experience while achieving our educational goals.

Our simplified approach prioritizes the most valuable information for learners while maintaining an uncluttered, approachable design that can be implemented efficiently and expanded upon in future iterations. 