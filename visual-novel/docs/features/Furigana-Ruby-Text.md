# Furigana Ruby Text Specification

## Overview

The Furigana Ruby Text system is a key component of our Japanese Language Learning Visual Novel. It provides proper rendering of furigana (pronunciation guides) above kanji characters in both character dialog and player response choices. This feature enhances the language learning experience by making Japanese text more accessible to beginners and intermediate learners.

This document outlines the design, functionality, and implementation details of the Furigana Ruby Text system, focusing on its integration with our existing Dialog System and text rendering components.

## Furigana Rendering Requirements

### Core Requirements

1. **Kanji Identification**: The system must accurately identify kanji characters that require furigana annotations.
2. **Rendering Position**: Furigana text must be rendered directly above the corresponding kanji characters.
3. **Font Size and Style**: Furigana text should be rendered in a smaller font size (approximately 50-60% of the main text size) while maintaining readability.
4. **Multi-Character Support**: The system must handle both single kanji characters and compound kanji words with shared readings.
5. **Animation Compatibility**: Furigana must work with our existing typewriter text animation effects.
6. **Difficulty Level Integration**: The display of furigana should respect the player's chosen difficulty level:
   - Beginner: Show furigana for all kanji
   - Intermediate: Show furigana for all kanji
   - Advanced: Show furigana for less common kanji only

### Technical Requirements

1. **Browser Compatibility**: The implementation must work across all modern browsers without requiring specialized libraries with Node.js dependencies.
2. **Performance**: The rendering system must maintain good performance, even with multiple dialog entries on screen.
3. **Canvas Integration**: Furigana must be rendered within the Phaser canvas, not as DOM overlays or HTML elements.
4. **Text Wrapping**: Furigana must integrate with our existing Japanese text wrapping system.

## Design Considerations

### HTML Ruby vs. Custom Canvas Rendering

There are two primary approaches to implementing furigana:

1. **HTML Ruby Tags**: Modern browsers have excellent support for the `<ruby>` HTML element, which is designed specifically for displaying furigana.
   - Pros: Native browser support, proper text layout, accessibility
   - Cons: Requires DOM elements which may not integrate well with Phaser canvas, potential layering issues, may not work with our typewriter animation

2. **Custom Canvas Rendering**: Implementing furigana rendering directly in the Phaser canvas.
   - Pros: Full control over rendering, integration with existing Phaser text objects, animation support
   - Cons: More complex implementation, may require additional positioning calculations

For our implementation, we will use **Custom Canvas Rendering** to ensure full compatibility with our existing Phaser infrastructure and animation effects.

### Kanji Detection and Reading Determination

A key challenge in implementing furigana is determining which characters are kanji and what their readings should be. We'll implement a staged approach:

1. **Initial Release**: 
   - Basic kanji character detection using Unicode ranges
   - Rely on dialog data to provide readings for kanji (through our existing romaji field)
   - Simple character-by-character mapping for furigana

2. **Future Enhancement**:
   - Implement dictionary-based kanji lookup for context-aware readings
   - Support compound kanji words with shared readings
   - Add support for custom/non-standard readings

### Romaji Parsing Approach

Since our dialog data already includes romaji pronunciation for the entire text, we'll use this to determine readings for kanji characters:

1. **Character-type identification**: Identify which characters in the Japanese text are kanji using Unicode ranges
2. **Character-to-romaji alignment**: Create an alignment algorithm that matches each character in the Japanese text with its corresponding section in the romaji string
3. **Extraction of kanji readings**: For each identified kanji character, extract its corresponding romaji segment
4. **Furigana generation**: Use these extracted readings to generate furigana text

This approach leverages our existing dialog data structure and removes the immediate need for external kanji dictionaries, as we already have the correct readings provided in the dialog data. The alignment between Japanese text and romaji will need to account for:

- Different character counts (multiple romaji characters often represent a single Japanese character)
- Multiple kanji compounds (where a sequence of kanji shares a single reading)
- Mixed script text (combinations of kanji, hiragana, and katakana)

For initial implementation, we will use a simplified alignment based on character types, with refinements as needed to handle edge cases.

## Implementation Approach

### FuriganaRenderer Utility

We will create a dedicated `FuriganaRenderer` class that:

1. Takes Japanese text as input
2. Identifies kanji characters that require furigana
3. Creates a composite text display with main text and properly positioned furigana
4. Supports our existing text animation system

```typescript
interface FuriganaOptions {
  baseTextStyle: Phaser.Types.GameObjects.Text.TextStyle;
  rubyTextStyle?: Phaser.Types.GameObjects.Text.TextStyle;
  rubyOffset?: number;
  onlyCommonKanji?: boolean; // For different difficulty levels
}

interface KanjiWithReading {
  kanji: string;
  reading: string;
  startIndex: number;
  endIndex: number;
}
```

### Text Rendering Pipeline

The rendering pipeline will work as follows:

1. **Text Analysis**: Parse the input text to identify kanji characters
2. **Reading Mapping**: Match kanji characters with their readings from the dialog's romaji field
3. **Positioning Calculation**: Calculate the position for each furigana annotation
4. **Composite Rendering**: Create a container with the main text and positioned furigana text objects
5. **Animation Integration**: Ensure the furigana appears synchronously with the typewriter effect

### Integration with Dialog System

The FuriganaRenderer will be integrated with our Dialog System by:

1. Modifying the `displayDialog` method in `VNScene.ts` to use FuriganaRenderer
2. Updating the `showChoices` method to display furigana in player responses
3. Ensuring all text animations and formatting work with the new furigana rendering

## Future Enhancements

1. **Dynamic Kanji Dictionary**: Implement a runtime kanji dictionary that provides accurate readings based on context.
2. **Interactive Furigana**: Allow players to click on kanji with furigana for additional information or study options.
3. **Custom Furigana**: Support for custom furigana annotations specified in dialog data for special terms or non-standard readings.

## Implementation Plan

### Phase 1: Core FuriganaRenderer Implementation

1. Create the base `FuriganaRenderer` class in `/phaser_game/src/utils/`
   - Implement kanji detection using Unicode ranges
   - Implement basic reading mapping
   - Create container-based rendering system

2. Create unit tests for the renderer
   - Test with various Japanese text samples
   - Verify correct kanji detection
   - Verify proper reading mapping

3. Implement difficulty level filtering
   - For beginner: All kanji get furigana
   - For intermediate: Only uncommon kanji get furigana
   - For advanced: No furigana

### Phase 2: Dialog System Integration

1. Modify `VNScene.ts` to use the FuriganaRenderer for:
   - Character dialog display
   - Player response choices

2. Ensure compatibility with existing features:
   - Text wrapping with `JapaneseTextWrapper`
   - Typewriter text animation
   - Difficulty level switching

3. Update the formatting of secondary text elements (romaji and English translation)
   - Ensure proper vertical spacing with furigana
   - Adjust positioning of all text elements

### Phase 3: Testing and Refinement

1. Test across different dialog scenarios:
   - Text with no kanji
   - Text with mixed scripts (kanji, hiragana, katakana)
   - Long text with line breaks
   - Player response options

2. Optimize performance:
   - Implement caching for furigana text objects
   - Minimize render updates during animations

3. Polish visual appearance:
   - Fine-tune furigana positioning
   - Adjust font sizes and styles for optimal readability

### Phase 4: Documentation and Future Planning

1. Update the Dialog System specification
2. Create API documentation for the FuriganaRenderer
3. Outline future enhancements for the kanji dictionary approach

## FIP (Feature Implementation Plan)

The current implementation status of the Furigana Ruby Text feature is:

- [x] Phase 1: Core FuriganaRenderer Implementation
  - [x] Create FuriganaRenderer class
  - [x] Implement kanji detection
  - [x] Implement reading mapping
  - [x] Create rendering system
  - [x] Implement difficulty filtering

- [ ] Phase 2: Dialog System Integration  
  - [ ] Modify character dialog display
  - [ ] Update player response choices
  - [ ] Ensure compatibility with existing features

- [ ] Phase 3: Testing and Refinement
  - [ ] Test across dialog scenarios
  - [ ] Optimize performance
  - [ ] Polish visual appearance

- [ ] Phase 4: Documentation and Future Planning
  - [ ] Update Dialog System specification
  - [ ] Create API documentation
  - [ ] Outline future enhancements

## [CHECKPOINT]
Review this specification document before proceeding with implementation.
