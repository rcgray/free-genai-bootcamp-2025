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

### Phase 1: Core Data Structures and State Management

- [ ] Define TypeScript interfaces for all dialog system components:
  - [ ] Conversation
  - [ ] Dialog
  - [ ] PlayerResponse
  - [ ] StudyableTerm
  - [ ] ConversationState
- [ ] Implement utility functions for dialog manipulation:
  - [ ] Function to advance to next dialog
  - [ ] Function to select player response
  - [ ] Function to identify studyable terms
- [ ] Create state serialization/deserialization functions:
  - [ ] Serialize conversation state for storage
  - [ ] Deserialize conversation state for restoration
- [ ] Implement basic state testing to verify correctness
- [ ] Create mock dialog data for development and testing

[CHECKPOINT] Verify that core data structures and state management work correctly:
- Confirm interfaces are properly defined
- Test state serialization/deserialization with sample data
- Validate utility functions with unit tests
- Review with team to ensure design aligns with requirements

### Phase 2: Dialog Box UI Component

- [ ] Create dialog box Phaser game object:
  - [ ] Semi-transparent background with border
  - [ ] Character name display area
  - [ ] Primary text display area
  - [ ] Next indicator
- [ ] Implement text display mechanics:
  - [ ] Typewriter text animation effect
  - [ ] Text speed configuration
  - [ ] Skip animation functionality
- [ ] Add basic interaction controls:
  - [ ] Click/tap to advance
  - [ ] Auto-advance option
- [ ] Set up dialog box positioning:
  - [ ] Bottom of screen fixed position
  - [ ] Responsive sizing for different screen resolutions
- [ ] Implement basic dialog progression through sample conversation

[CHECKPOINT] Verify dialog box functions correctly:
- Demo the dialog box with sample text
- Confirm typewriter effect works properly
- Test interaction controls for advancing dialog
- Check that UI is responsive and properly positioned
- Ensure dialog progression works as expected

### Phase 3: Japanese Text Support

- [ ] Research and select library for furigana/ruby text support in Phaser
- [ ] Implement text parsing system:
  - [ ] Parse Japanese text to identify kanji
  - [ ] Generate furigana for kanji characters
- [ ] Create layered text rendering:
  - [ ] Japanese text with furigana
  - [ ] Optional romaji display
  - [ ] Optional English translation display
- [ ] Implement difficulty-based display options:
  - [ ] Beginner: All kanji with furigana
  - [ ] Intermediate: Only uncommon kanji with furigana
  - [ ] Advanced: Minimal furigana
- [ ] Add studyable term highlighting

[CHECKPOINT] Verify Japanese text features:
- Test with various Japanese text samples
- Confirm furigana appears correctly above kanji
- Verify different difficulty levels display appropriately
- Test studyable term highlighting
- Review with Japanese language experts if possible

### Phase 4: Player Choice System

- [ ] Design and implement choice button components:
  - [ ] Button background and styling
  - [ ] Hover/focus states
  - [ ] Selected state
- [ ] Create choice display container:
  - [ ] Layout for 2-3 response options
  - [ ] Positioning relative to dialog box
- [ ] Implement choice selection logic:
  - [ ] Handle player input
  - [ ] Update conversation state with selection
  - [ ] Advance dialog based on selection
- [ ] Add Japanese text support to choice buttons:
  - [ ] Furigana for kanji
  - [ ] Optional romaji and English display
- [ ] Implement visual feedback for choices

[CHECKPOINT] Verify player choice system:
- Test selection of different choices
- Confirm state updates correctly based on choices
- Check that Japanese text displays properly in choices
- Verify visual feedback works as expected
- Test with mock conversation that includes multiple choice points

### Phase 5: Integration with Game System

- [ ] Connect dialog system to character system:
  - [ ] Display character sprites with correct emotion
  - [ ] Position characters based on dialog specifications
  - [ ] Animate character based on speaking state
- [ ] Implement scene transitions:
  - [ ] Start conversation when entering new location
  - [ ] End conversation appropriately
  - [ ] Handle transitions between sub-locations
- [ ] Create conversation manager:
  - [ ] Load conversations based on location
  - [ ] Handle conversation state
  - [ ] Manage multiple conversations
- [ ] Implement state persistence for HMR during development
- [ ] Add session state preservation for player progress

[CHECKPOINT] Verify integration with game system:
- Test complete conversation flow in game context
- Confirm characters appear and animate correctly
- Verify scene transitions work properly
- Test HMR state preservation during development
- Ensure session state is preserved across page reloads

### Phase 6: Study Integration (Optional Enhancement)

- [ ] Create study mode transition:
  - [ ] Button to enter study mode
  - [ ] Visual transition effect
- [ ] Implement study interface:
  - [ ] Display detailed information about selected term
  - [ ] Show grammar points and usage examples
- [ ] Add term selection functionality:
  - [ ] Highlight studyable terms
  - [ ] Handle term selection
- [ ] Implement return to dialog functionality

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