# Dialog System Specification

## Overview

The Dialog System is a core component of our Japanese Language Learning Visual Novel. It handles the display and progression of text-based conversations between characters and the player's response choices. The system integrates directly with our Character System to provide a cohesive narrative experience while supporting language learning features like furigana for kanji and romaji pronunciation guides.

This document outlines the design, functionality, and implementation details of the Dialog System, with specific attention to how it will work with LLM-generated content as described in `docs/Game-LLM-Prompts.md`.

## Dialog Data Structure

### Conversation Structure

A **Conversation** represents the complete dialog for a specific location or sub-location in the game. It consists of a series of **Dialog** entries that occur sequentially.

```typescript
interface Conversation {
  id: string;                   // Unique identifier for the conversation
  locationId: string;           // Location where this conversation occurs
  subLocationId?: string;       // Optional sub-location identifier
  dialogs: Dialog[];            // Series of dialog entries
  background: string;           // Background image for this conversation
  characters: string[];         // Characters present in this conversation
  currentDialogIndex: number;   // Current position in the dialog sequence
}
```

### Dialog Entry Structure

A **Dialog** represents a single text entry by a character, possibly with player response options.

```typescript
interface Dialog {
  id: string;                   // Unique identifier for this dialog entry
  characterId: string;          // ID of the speaking character (empty string for narration)
  emotion: string;              // Character's emotion/expression (if applicable)
  position?: CharacterPosition; // Character's position on screen (if applicable)
  japaneseText: string;         // Text in Japanese
  romaji: string;               // Romaji pronunciation
  englishText: string;          // English translation
  playerResponses?: PlayerResponse[]; // Optional player choices
  studyableTerms?: StudyableTerm[]; // Terms that can be studied from this dialog
}
```

### Player Response Structure

**PlayerResponse** represents a choice the player can make in response to a dialog.

```typescript
interface PlayerResponse {
  id: string;                   // Unique identifier for this response
  japaneseText: string;         // Text in Japanese
  romaji: string;               // Romaji pronunciation
  englishText: string;          // English translation
  studyableTerms?: StudyableTerm[]; // Terms that can be studied from this response
}
```

**Important Note**: In our current design, player responses do not create branching narratives. All choices are narratively neutral and will lead to the same next dialog in the conversation. This design simplifies both the dialog system implementation and the LLM prompt design while still providing players with expressive choices.

### Studyable Term Structure

**StudyableTerm** represents a phrase or word that can be selected for study.

```typescript
interface StudyableTerm {
  id: string;                   // Unique identifier for this term
  japaneseText: string;         // Text in Japanese
  startIndex: number;           // Start index in the original text
  endIndex: number;             // End index in the original text
  romaji: string;               // Romaji pronunciation
  englishText: string;          // English translation
  grammarPoints?: string[];     // Grammar points associated with this term
}
```

### Dialog Structure Considerations

1. **Narration vs Character Dialog**:
   - Our system supports both character dialog and narration
   - Narration is indicated by an empty string for `characterId` - this is the source of truth
   - For simplicity and consistent scene structure, the first dialog in each conversation should be narration that sets up the scene context
   - Character-to-character dialog (where no player response is expected) is supported by making `playerResponses` optional

2. **Design Consideration: Narration Handling**:
   - We've chosen to represent narration as a special case of Dialog (with empty characterId) rather than as a separate structure
   - Benefits of this approach:
     - Simpler, unified data structure
     - Reuse of dialog display and progression code
     - Consistent handling in state management and serialization
     - Flexibility to mix narration and character dialog in a conversation
   - Potential drawbacks to monitor:
     - Some fields (emotion, position) aren't applicable to narration
     - Special case handling may be needed in rendering code
   - We will revisit this design decision if implementation reveals significant complexity

3. **Conversation State and Dialog History**:
   - We track the complete state of a conversation, including dialog progression and player choices
   - This state serves as our source of truth for the player's experience and can be used for multiple purposes:
   ```typescript
   interface ConversationState {
     currentDialogIndex: number;
     playerChoices: Record<string, string>; // Maps dialogId to selected responseId
   }
   ```
   - Primary uses for this state include:
     - **State Preservation**: Ensuring exact recreation of player experience after reload/HMR
     - **Dialog History**: Supporting future features like dialog replay or history browsing
     - **Study Summaries**: Enabling generation of personalized study materials based on player choices
   - By maintaining this state separate from the core dialog content, we create a clean separation between content and player interaction

4. **Furigana Handling**:
   - Furigana (ruby text above kanji) will be derived at runtime rather than stored in the dialog data
   - We will use a parsing library or algorithm to determine which characters need furigana
   - This approach applies consistently to both Dialog and PlayerResponse objects
   - For beginning difficulty level, all kanji will have furigana; for intermediate, only uncommon kanji will have furigana

### State Preservation

- The dialog system will serialize all necessary conversation state for proper restoration
- This ensures that developers can modify the game during active testing without losing context
- Players can resume their experience without disruption after reloading or HMR
- The separation between content (Conversation/Dialog) and state (ConversationState) provides flexibility for future enhancements

## Dialog Display and Rendering

### Dialog Box Component

The Dialog Box is responsible for displaying text and managing text animation effects.

**Features:**
- Semi-transparent background with border
- Character name display area
- Primary text display area for Japanese text
- Optional display of romaji and/or English translation based on difficulty setting
- Next indicator when there is more dialog
- Typewriter text animation effect
- Support for furigana/ruby text over kanji characters

### Japanese Text Rendering

Japanese text will require special handling to support language learning features:

**Requirements:**
- Display kanji with furigana/ruby text annotations
- Support for romaji pronunciation display
- English translation display
- Text highlighting for studyable terms
- Support for variable text speed based on user settings

### Text Processing Pipeline

1. **Text Parsing**: Parse Japanese text to identify kanji and determine furigana
2. **Studyable Term Identification**: Identify and mark up terms that can be studied
3. **Text Rendering**: Render text with appropriate formatting and annotations
4. **Animation Control**: Manage text reveal animation and timing

## Player Choice System

The choice system allows players to select from multiple response options.

**Features:**
- Display of 2-3 response options
- Japanese text with furigana, romaji, and English translation
- Visual feedback on hover/selection
- Support for branching narrative based on choices
- Study buttons for learning specific phrases from choices

### Choice Presentation

Choices will be presented in a visually distinct format:
- Buttons with borders and background
- Clear visual indication of the selectable area
- Visual feedback on hover/focus
- Japanese text as primary display, with options to see romaji/English

## Dialog Progression

### Interaction Model

1. **Automatic Text Display**: Dialog text appears with typewriter animation
2. **Manual Advancement**: Player clicks/taps to advance to next dialog
3. **Choice Selection**: If choices are present, player selects a response
4. **Study Opportunity**: Player can click on highlighted terms to study them
5. **Scene Transition**: After dialog completes, transition to next scene if applicable

### Navigation Controls

- **Click/Tap**: Advance dialog, select choice
- **Study Button**: Enter Study mode for current dialog

### State Preservation

The Dialog System is designed to preserve state during:

1. **Hot Module Replacement (HMR)**: During development, the current dialog position, choices, and character states will be preserved when code is modified
2. **Session Persistence**: If the game is refreshed or temporarily closed, the dialog state can be saved and restored
3. **Game Save/Load**: Future implementation will allow saving at any point in a conversation and loading back to that exact state

This approach ensures that developers can modify the game during active testing and players can resume their experience without disruption.

## Integration with LLM Content Generation

The Dialog System is designed to work with LLM-generated content as described in `docs/Game-LLM-Prompts.md`.

### Content Loading and Parsing

1. **Request Formation**: Create a structured request for the LLM based on location and context
2. **Response Parsing**: Parse the LLM response into our Dialog data structure
3. **Validation**: Validate the structure and content of the parsed response
4. **Fallback Handling**: Provide fallback content if LLM response is invalid or unavailable

### Dynamic Content Integration

The Dialog System will support:
- Dynamic loading of conversations based on game state
- Linear dialog progression as designed in the game narrative
- Graceful fallback to static content when needed

## Implementation Plan

### Phase 1: Core Dialog Data Structure
- Implement Conversation, Dialog, and PlayerResponse interfaces
- Create utility functions for dialog manipulation
- Implement state serialization for HMR support

### Phase 2: Core Dialog Box
- Implement basic dialog box UI component
- Create dialog text display with typewriter effect
- Add character name display
- Implement basic dialog progression

### Phase 3: Japanese Text Support
- Add support for runtime furigana/ruby text generation
- Implement romaji pronunciation display
- Add English translation display
- Implement text highlighting for studyable terms

### Phase 4: Player Choice System
- Create choice button components
- Implement choice selection logic
- Add visual feedback for choices
- Support linear dialog continuation after choice

### Phase 5: Study Integration
- Add study button integration
- Implement studyable term identification
- Create connections to Study Scene
- Support for returning to dialog after study

### Phase 6: LLM Integration (Future Enhancement)
- Create LLM request formation
- Implement response parsing
- Add validation and error handling

## Technical Considerations

### Performance Optimization
- Efficient text rendering for typewriter effect
- Throttling of text animation for performance

### Memory Management
- Efficient storage of dialog data
- Cleanup of unused resources

### Error Handling
- Graceful fallback for missing or corrupt dialog data
- Validation of dialog data before display
- Logging of errors for debugging and improvement

### State Management
- Serialization of dialog state for HMR and save/load functionality
- Integration with game state management
- Persistence across scene transitions

## User Experience Considerations

### Accessibility
- Configurable text speed
- Option to disable animations
- Support for larger text sizes
- Color contrast considerations

### Language Learning Focus
- Clear distinction between Japanese, romaji, and English
- Visual highlighting of studyable terms
- Intuitive study mode integration
- Progressive difficulty levels

### Gameplay Flow
- Smooth transitions between dialog and choices
- Natural progression between scenes
- Visual feedback for all interactions
- Consistency in UI layout and behavior

## Future Enhancements

### Dialog History
- Scrollable history of previous dialog
- Jump back to previous points in conversation

### Voice Integration
- Support for character voice playback
- Voice synthesis integration
- Voice speed control

### Advanced Text Effects
- Text emphasis (color, size, animation)
- Character-specific text styling
- Emotional text effects (shaking, pulsing)

### Adaptive Difficulty
- Dynamic adjustment of language complexity
- Personalized study suggestions
- Progress tracking and review suggestions 

## Feature Implementation Plan (FIP)

This implementation plan outlines the step-by-step process for building the Dialog System. Each section represents a logical phase of development with specific tasks to complete. After each phase, there is a checkpoint to evaluate progress before continuing.

### Phase 1: Core Data Structures and State Management ✅

- [x] Define TypeScript interfaces for all dialog system components:
  - [x] Conversation
  - [x] Dialog
  - [x] PlayerResponse
  - [x] StudyableTerm
  - [x] ConversationState
- [x] Implement utility functions for dialog manipulation:
  - [x] Function to advance to next dialog
  - [x] Function to select player response
  - [x] Function to identify studyable terms
- [x] Create state serialization/deserialization functions:
  - [x] Serialize conversation state for storage
  - [x] Deserialize conversation state for restoration
- [x] Implement basic state testing to verify correctness
- [x] Create mock dialog data for development and testing

[CHECKPOINT: COMPLETED] ✅ Verify that core data structures and state management work correctly:
- ✅ Confirmed interfaces are properly defined
- ✅ Tested state serialization/deserialization with sample data
- ✅ Validated utility functions with extensive tests
- ✅ Implemented test UI in TestScene for interactive verification
- ✅ Created mock conversation data for the Train Station location

### Phase 2: Dialog Box UI Component ✅

The VNScene already has extensive implementation of dialog box UI components. We will build upon and enhance this existing implementation rather than starting from scratch.

- [x] Enhance existing dialog box Phaser game object:
  - [x] Semi-transparent background with border (already implemented)
  - [x] Character name display area (already implemented)
  - [x] Primary text display area (already implemented)
  - [x] Next indicator (already implemented)
  - [~] Improve styling and visual design consistency
- [x] Improve text display mechanics:
  - [x] Typewriter text animation effect (already implemented)
  - [x] Text speed configuration (already implemented)
  - [x] Skip animation functionality (already implemented)
  - [~] Add support for text pauses and variable speed
- [x] Enhance interaction controls:
  - [x] Click/tap to advance (already implemented)
  - [~] Keyboard shortcuts for all dialog actions
  - [~] Auto-advance option
- [x] Update dialog box positioning:
  - [x] Bottom of screen fixed position (already implemented)
  - [~] More responsive sizing for different screen resolutions
- [x] Implement formal dialog progression through structured conversation data

[CHECKPOINT: COMPLETED] ✅ Verify dialog box functions correctly:
- ✅ Demo the dialog box with sample text
- ✅ Confirm typewriter effect works properly
- ✅ Test interaction controls for advancing dialog
- ✅ Check that UI is responsive and properly positioned
- ✅ Ensure dialog progression works with structured conversation data

### Phase 3: Japanese Text Support

The VNScene already has basic support for Japanese text, furigana, and translations, but we'll enhance it with more robust implementation.

- [ ] Enhance text parsing system:
  - [x] Basic text extraction system (already implemented)
  - [ ] Implement proper parsing for Japanese text structure
  - [ ] Improve furigana generation for kanji characters
- [ ] Create layered text rendering:
  - [x] Basic Japanese text with extracted furigana (already implemented)
  - [x] Basic translation display (already implemented)
  - [ ] Implement true ruby text for furigana display
  - [ ] Add configurable display options for romaji and translations
- [ ] Implement difficulty-based display options:
  - [ ] Beginner: All kanji with furigana
  - [ ] Intermediate: Only uncommon kanji with furigana
  - [ ] Advanced: Minimal furigana
- [ ] Add studyable term highlighting:
  - [x] Basic study button for entire phrases (already implemented)
  - [ ] Support for individual term selection and study

[CHECKPOINT] Verify Japanese text features:
- Test with various Japanese text samples
- Confirm furigana appears correctly above kanji
- Verify different difficulty levels display appropriately
- Test studyable term highlighting
- Review with Japanese language experts if possible

### Phase 4: Player Choice System

The VNScene already has a choice system implemented, but we'll enhance it to work with structured dialog data.

- [ ] Enhance choice button components:
  - [x] Button background and styling (already implemented)
  - [x] Hover/focus states (already implemented)
  - [x] Selected state (already implemented)
  - [ ] Improve visual design and feedback
- [ ] Improve choice display container:
  - [x] Layout for multiple response options (already implemented)
  - [x] Positioning relative to dialog box (already implemented)
  - [ ] Better handling of choices with variable text length
- [x] Enhance choice selection logic:
  - [x] Handle player input (already implemented)
  - [x] Update conversation state with selection
  - [x] Advance dialog based on selection using structured data
- [ ] Improve Japanese text support in choice buttons:
  - [x] Basic text extraction (already implemented)
  - [ ] Implement true ruby text for furigana in choices
  - [ ] More configurable display options
- [ ] Add enhanced visual feedback for choices

[CHECKPOINT] Verify player choice system:
- Test selection of different choices
- Confirm state updates correctly based on choices
- Check that Japanese text displays properly in choices
- Verify visual feedback works as expected
- Test with mock conversation that includes multiple choice points

### Phase 5: Integration with Game System

The VNScene already has integration with the character system, but we'll enhance it to work with structured dialog data.

- [x] Enhance dialog-character system integration:
  - [x] Display character sprites with correct emotion (already implemented via CharacterManager)
  - [x] Position characters based on dialog specifications (already implemented)
  - [x] Basic character animations (already implemented)
  - [~] Add more nuanced character animations and expressions
- [ ] Implement structured scene transitions:
  - [x] Basic scene transition functionality (already implemented)
  - [~] Transitions based on dialog data and conversation structure
  - [ ] Better handling of sub-locations within scenes
- [x] Create formal conversation manager:
  - [x] Load conversations from structured data
  - [x] Manage multiple conversations
  - [x] Track conversation state properly
- [x] Improve state persistence:
  - [x] Basic state serialization (already implemented)
  - [x] Complete dialog history preservation
  - [x] More robust error handling for state restoration

[CHECKPOINT] Verify integration with game system:
- Test complete conversation flow in game context
- Confirm characters appear and animate correctly
- Verify scene transitions work properly
- Test HMR state preservation during development
- Ensure session state is preserved across page reloads

### Phase 6: Study Integration (Optional Enhancement)

The VNScene already has basic study integration, but we'll enhance it with more robust functionality.

- [x] Enhance study mode transition:
  - [x] Study button functionality (already implemented)
  - [x] Improved visual transition effects
- [ ] Improve study interface:
  - [x] Basic study mode for phrases (already implemented)
  - [ ] More detailed information about selected terms
  - [ ] Add grammar points and usage examples
- [ ] Add individual term selection:
  - [ ] Highlight individual studyable terms
  - [ ] Allow selection of specific terms within dialog
- [x] Enhance return to dialog functionality:
  - [x] Basic return from study mode (already implemented)
  - [x] Better state preservation when returning

[CHECKPOINT] Verify study integration:
- Test study mode transition
- Confirm studyable terms can be selected
- Verify study interface displays correct information
- Test return to dialog functionality
- Ensure state is preserved when returning from study mode

### Phase 7: Testing and Refinement

- [ ] Implement comprehensive unit tests:
  - [ ] Data structure tests
  - [ ] State management tests
  - [ ] UI component tests
- [ ] Perform end-to-end testing:
  - [ ] Complete conversation flows
  - [ ] Edge cases and error handling
- [ ] Optimize performance:
  - [ ] Text rendering
  - [ ] Animation efficiency
  - [ ] State management
- [ ] Refine user experience:
  - [ ] Text timing and pacing
  - [ ] Visual polish
  - [ ] Interaction feedback
- [ ] Document final implementation

[CHECKPOINT] Final review:
- Complete feature demo
- Review test coverage and results
- Verify performance meets requirements
- Collect user feedback
- Ensure documentation is complete and accurate 

## Current Implementation Status

Based on a thorough examination of the VNScene.ts and related files, the dialog system has already been partially implemented with the following capabilities:

### Existing Dialog System Features

1. **Dialog Display:**
   - Text display with typewriter effect
   - Speaker name display in a dedicated name box
   - "Next" indicator (triangle) to show when text is complete
   - Dialog progression on click/tap or space key

2. **Choice System:**
   - Multiple-choice dialog options
   - Choice display and handling
   - Choice history (through serialization)
   - Study button for each choice

3. **Character Integration:**
   - Character display managed by CharacterManager
   - Character expressions/emotions
   - Character positioning (left, center, right)
   - Proper depth management for UI, characters, and backgrounds

4. **Language Learning Features:**
   - Basic Japanese text extraction
   - Simple furigana support via formatting: "Japanese (Romaji) [Translation]"
   - Translation display
   - Study mode integration via a Study button

5. **State Management:**
   - Serialization/deserialization of dialog state
   - Persistence of dialog history, character positions, etc.

### Areas for Enhancement

1. **Dialog Data Structure:**
   - The dialog system currently uses hardcoded dialog sequences
   - Need to implement a structured dialog script or conversation tree system

2. **Dialog Progression Logic:**
   - Limited branching narrative support
   - Need formal dialog tree implementation

3. **Text Effects:**
   - Basic typewriter effect exists, but no additional text animations
   - No support for varying text speeds or pauses

4. **Ruby Text Support:**
   - Current implementation uses a basic format: "Japanese (Romaji) [Translation]"
   - Need proper Ruby text rendering for furigana above kanji

5. **Dialog History System:**
   - No comprehensive way to review past dialog
   - Need scrollable history feature

### Technical Approach for Enhancement

The implementation strategy will focus on:

1. Creating a formal DialogManager class to work alongside the CharacterManager
2. Implementing a structured dialog data format with proper branching support
3. Enhancing the text display with proper Ruby text for furigana
4. Adding a history system for reviewing past dialog
5. Improving the integration between dialog and character systems

These enhancements will build upon the solid foundation that already exists in the VNScene.ts implementation, improving and extending its capabilities rather than replacing it entirely. 