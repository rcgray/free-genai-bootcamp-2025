# Implementation Action Plan

## Phase 1: Project Setup and Basic Structure 🔴

### 1.1 Project Initialization
- [x] Set up project directory structure
- [x] Configure development tools (ruff, mypy, pytest)
  - [x] Add tool configurations to pyproject.toml
  - [x] Create VS Code settings for development tools
  - [x] Add example commands to README
- [x] Create basic README and documentation
- [x] Set up environment variables (.env file)

### 1.2 Streamlit and Web Framework Setup
- [x] Set up Streamlit application structure
- [x] Create main.py entry point
- [x] Configure Streamlit settings
- [x] Set up static file serving through Streamlit
- [x] Create API endpoints structure

### 1.3 Phaser Integration
- [x] Add Phaser library to project
- [x] Create HTML template for Phaser game
- [x] Embed Phaser game in Streamlit
- [x] Set up game configuration
- [x] Implement asset loading system
- [x] Create test scene to verify setup
- [x] Create detailed Technical Specification for game scenes

**[CHECKPOINT: Project Foundation]**
*Verification Steps:*
1. Verify Streamlit app runs without errors: `uv run streamlit run app/main.py`
2. Verify Phaser game loads in Streamlit
3. Verify development tools (ruff, mypy, pytest) are properly configured
4. Verify project structure matches the Technical Specification
5. Ensure all team members can run the project locally

## Phase 2: Core Game Engine 🔴

### 2.1 Scene Management
- [x] Implement base Scene class
- [x] Create scene transition system
- [x] Set up game state management
- [x] Implement asset preloading
- [x] Create scene registry

### 2.1.5 Phaser Implementation Rewrite
- [x] Set up modern build system with npm, TypeScript, and Vite
- [x] Implement proper asset management with Vite
- [x] Refactor code structure to use TypeScript modules
- [x] Implement direct game embedding in Streamlit
- [x] Create hot-reloading development workflow
- [x] Port existing scenes to TypeScript
- [x] Update documentation to reflect new architecture

**[CHECKPOINT: Phaser Rewrite]** ✅
*Verification Steps:*
1. ✅ Verify TypeScript compilation works correctly
2. ✅ Test the development workflow with hot reloading
3. ✅ Verify all scenes function correctly in the new implementation
4. ✅ Confirm that the Streamlit integration works correctly
5. ✅ Ensure unused code from previous implementation is removed
6. ✅ Confirm documentation is updated with new architecture

### 2.1.6 Scene-Specific Reloading
- [x] Create GameStateManager for state serialization and deserialization
- [x] Define StatefulScene interface for scene state management
- [x] Update BaseScene to implement StatefulScene interface
- [x] Integrate with Vite's HMR system to preserve state during development
- [x] Add development keyboard shortcuts for manual state saving/loading
- [x] Implement basic state persistence for the TitleScene
- [x] Test and refine the state preservation system
  - [x] Fix registry serialization error
  - [x] Fix HMR integration to properly clean up old game instances
  - [x] Improve HMR state preservation to maintain game state across reloads
  - [x] Enhance state storage with sessionStorage for better reliability
  - [x] Fix state restoration timing to ensure proper scene initialization
  - [x] Implement robust retry mechanism with comprehensive error handling
  - [x] Add self-contained retry logic in GameStateManager for better reliability
  - [x] Implement event-based scene restoration using Phaser's event system
  - [x] Add comprehensive state validation and error handling
  - [x] Implement delayed transition mechanism via TitleScene
  - [x] Enhance scene transition with Phaser's built-in transition system
  - [x] Implement manual navigation UI instead of automatic restoration
  - [x] Add Phaser debugging utilities for troubleshooting
  - [x] Complete remaining verification tests

**[CHECKPOINT: Scene-Specific Reloading]**
*Verification Steps:*
1. ✅ Verify that game state is preserved when code changes are made
2. ✅ Test that the game returns to the same scene after HMR updates
3. ✅ Confirm that scene-specific state (like dialog position) is maintained
4. ✅ Test manual state saving and loading with keyboard shortcuts
5. ✅ Verify that the implementation follows the design in docs/features/Scene-Specific-Reloading.md
6. ✅ Ensure the system is extensible for future save/load game functionality

### 2.2 Title Scene
- [x] Design and implement title screen layout
- [x] Create start game button
- [x] Add reset button
- [x] Implement scene transition to VN Scene

### 2.3 Visual Novel Scene - Core
- [x] Implement background display system
- [x] Create character sprite display system
- [x] Implement dialog box UI
- [x] Create choice selection UI
- [x] Add basic scene navigation

### 2.4 Study Scene - Core
- [x] Design and implement study screen layout
- [x] Create text display components
- [x] Implement "Back to VN" functionality
- [x] Add basic styling and layout

### 2.4.1 Study Scene - Enhanced
- [x] Create StudyScene class with proper scene handling
- [x] Implement scene transition with pause/resume approach
- [x] Design overlay background and content panel
- [x] Add back button for returning to VN Scene
- [x] Implement JapaneseText utility for furigana display
- [x] Create phrase display with proper Japanese text rendering
- [x] Add translation and context display
- [x] Create study button (emoji) component
- [x] Add study buttons to dialog in VN Scene
- [x] Add study buttons to choice options in VN Scene
- [x] Implement data passing between scenes
- [x] Update HMR handling for Study Scene
- [~] Test and debug all interactions and transitions

**[CHECKPOINT: Study Scene Implementation]**
*Verification Steps:*
1. ✅ Verify study buttons appear correctly next to dialog and choices
2. ✅ Test navigation from VN Scene to Study Scene and back
3. ✅ Verify Japanese phrases display correctly with furigana
4. ✅ Confirm translations and contextual information are displayed properly
5. ✅ Test that VN Scene state is preserved when returning from Study Scene
6. ✅ Verify HMR works properly when modifications occur during Study Scene
7. [~] Test on different screen sizes to ensure responsive layout

**[CHECKPOINT: Core Game Scenes]**
*Verification Steps:*
1. ✅ Verify all three main scenes (Title, VN, Study) load correctly
2. ✅ Test scene transitions between all scenes
3. ✅ Verify UI elements are properly positioned and styled
4. ✅ Test basic interactions (buttons, choices, navigation)
5. ✅ Verify game state is maintained between scene transitions

## Phase 3: Game Content and Flow 🟡

### 3.1 Character System
- [ ] Create character data structure
- [ ] Implement character sprite loading
- [ ] Add character emotion/expression system
- [ ] Create character positioning system
- [ ] Implement character animation basics

### 3.2 Dialog System
- [ ] Create dialog data structure
- [ ] Implement text display with Japanese support
- [ ] Add Ruby furigana support for Kanji
- [ ] Add text animation effects (typewriter)
- [~] Create dialog history system
- [ ] Implement basic choice system

**[CHECKPOINT: Character and Dialog Systems]**
*Verification Steps:*
1. Verify characters display correctly with different emotions/expressions
2. Test character positioning and transitions
3. Verify dialog text displays correctly with proper formatting
4. Test typewriter animation effect
5. Verify dialog history system works correctly
6. Test choice system with multiple options

### 3.3 Game Flow
- [ ] Create game state management
- [ ] Implement scene transitions based on choices
- [ ] Add dialog progression system
- [ ] Create basic branching narrative system
- [ ] Implement study mode entry points

### 3.4 Static Content Creation
- [ ] Create sample backgrounds
- [ ] Design basic character sprites
- [ ] Write initial dialog sequences
- [ ] Create test choices and branches
- [ ] Implement static study content

**[CHECKPOINT: Game Flow and Content]**
*Verification Steps:*
1. Test complete game flow from title to end of sample content
2. Verify branching narrative works correctly based on choices
3. Test study mode entry and exit points
4. Verify all static content (backgrounds, characters, dialog) displays correctly
5. Test game state persistence throughout the flow
6. Verify all transitions and animations work smoothly

## Phase 4: Language Learning Features 🟡

### 4.1 Japanese Text Support
- [ ] Ensure proper Japanese character rendering
- [ ] Implement furigana/ruby text support
- [ ] Add Japanese font integration
- [ ] Create text styling for different languages
- [ ] Test cross-browser compatibility

### 4.2 Study Mode Features
- [ ] Implement phrase selection mechanism
- [ ] Create translation display
- [ ] Add pronunciation guide (romaji)
- [ ] Implement contextual explanations
- [ ] Create study progress tracking

### 4.3 Language Learning UI
- [ ] Design study interface components
- [ ] Create interactive elements for learning
- [ ] Implement visual feedback for learning
- [ ] Add navigation between study elements
- [ ] Create return to game flow

**[CHECKPOINT: Language Learning Features]**
*Verification Steps:*
1. Verify Japanese text renders correctly with proper fonts
2. Test furigana/ruby text display above kanji
3. Verify phrase selection mechanism works correctly
4. Test translation and pronunciation guide display
5. Verify contextual explanations are displayed correctly
6. Test study progress tracking
7. Verify all language learning UI components work as expected
8. Test the complete learning flow from VN scene to study mode and back

## Phase 5: LLM Integration 🟡

### 5.1 LLM Client Setup
- [ ] Create LLM API client
- [ ] Implement API key management
- [ ] Add error handling for API calls
- [ ] Create response parsing utilities
- [ ] Implement request rate limiting

**[CHECKPOINT: LLM Client]**
*Verification Steps:*
1. Verify LLM API client connects successfully
2. Test API key management and security
3. Verify error handling for various failure scenarios
4. Test response parsing with sample responses
5. Verify request rate limiting works correctly

### 5.2 Dialog Generation
- [ ] Design prompt templates for dialog
- [ ] Implement context management for coherent dialog
- [ ] Create character-specific prompt engineering
- [ ] Add response validation and filtering
- [ ] Implement fallback mechanisms

### 5.3 Choice Generation
- [ ] Design prompt templates for player choices
- [ ] Implement context-aware choice generation
- [ ] Create choice validation and filtering
- [ ] Add choice diversity mechanisms
- [ ] Implement choice consequence tracking

### 5.4 Language Learning Integration
- [ ] Create translation prompt templates
- [ ] Implement pronunciation guide generation
- [ ] Add contextual explanation generation
- [ ] Create cultural note generation
- [ ] Implement content filtering for educational accuracy

**[CHECKPOINT: LLM Content Generation]**
*Verification Steps:*
1. Test dialog generation with different character contexts
2. Verify choice generation produces relevant and diverse options
3. Test translation and pronunciation guide generation
4. Verify contextual explanations and cultural notes are accurate
5. Test fallback mechanisms when LLM responses are unsuitable
6. Verify content filtering correctly handles inappropriate content
7. Test the complete flow with LLM-generated content
8. Verify performance and response times are acceptable

## Phase 6: Advanced Game Features 🟢

### 6.1 Save/Load System
- [ ] Design save data structure
- [ ] Implement game state serialization
- [ ] Create save/load UI
- [ ] Add auto-save functionality
- [ ] Implement save data validation

### 6.2 Settings and Customization
- [ ] Create settings menu
- [ ] Implement text speed options
- [ ] Add audio volume controls
- [ ] Create language preference options
- [ ] Implement UI customization options

**[CHECKPOINT: Save/Load and Settings]**
*Verification Steps:*
1. Test manual save and load functionality
2. Verify auto-save works at appropriate points
3. Test save data validation and error handling
4. Verify settings menu displays and functions correctly
5. Test each customization option (text speed, volume, language, UI)
6. Verify settings persist between sessions

### 6.3 Audio Integration
- [ ] Add background music system
- [ ] Implement sound effects
- [ ] Create audio controls
- [ ] Add voice generation placeholder
- [ ] Implement audio preloading

### 6.4 Visual Enhancements
- [ ] Add scene transitions and effects
- [ ] Implement character animations
- [ ] Create dialog special effects
- [ ] Add background animations
- [ ] Implement UI animations and feedback

**[CHECKPOINT: Audio and Visual Enhancements]**
*Verification Steps:*
1. Verify background music plays correctly and loops appropriately
2. Test sound effects for different interactions
3. Verify audio controls work correctly
4. Test scene transitions and visual effects
5. Verify character animations play smoothly
6. Test dialog and UI animations
7. Verify all visual enhancements work together without performance issues

## Phase 7: Database Integration 🟢

### 7.1 TinyDB Setup
- [ ] Set up TinyDB integration
- [ ] Create database schema
- [ ] Implement basic CRUD operations
- [ ] Add data validation
- [ ] Create database management utilities

### 7.2 Game State Persistence
- [ ] Implement game progress tracking
- [ ] Create player choice history
- [ ] Add dialog history persistence
- [ ] Implement study progress tracking
- [ ] Create statistics collection

### 7.3 Content Management
- [ ] Design content database structure
- [ ] Implement dynamic content loading
- [ ] Create content caching system
- [ ] Add content versioning
- [ ] Implement content updates

**[CHECKPOINT: Database Integration]**
*Verification Steps:*
1. Verify TinyDB integration works correctly
2. Test CRUD operations for all data types
3. Verify game state persistence across sessions
4. Test player choice and dialog history persistence
5. Verify study progress tracking and statistics collection
6. Test dynamic content loading and caching
7. Verify content versioning and updates work correctly

## Phase 8: Testing and Optimization 🔴

### 8.1 Unit Testing
- [ ] Create test framework setup
- [ ] Implement game logic tests
- [ ] Add LLM client tests
- [ ] Create UI component tests
- [ ] Implement database operation tests

### 8.2 Integration Testing
- [ ] Test scene transitions
- [ ] Verify game flow
- [ ] Test LLM integration
- [ ] Validate study mode functionality
- [ ] Test save/load system

**[CHECKPOINT: Testing Coverage]**
*Verification Steps:*
1. Verify unit tests cover all critical components
2. Run integration tests and verify all systems work together
3. Check test coverage metrics
4. Verify all critical paths are tested
5. Test edge cases and error handling

### 8.3 Performance Optimization
- [ ] Optimize asset loading
- [ ] Implement caching strategies
- [ ] Add asynchronous processing
- [ ] Optimize rendering performance
- [ ] Reduce memory usage

### 8.4 Cross-browser Testing
- [ ] Test on Chrome
- [ ] Test on Firefox
- [ ] Test on Safari
- [ ] Test on Edge
- [ ] Address browser-specific issues

**[CHECKPOINT: Performance and Compatibility]**
*Verification Steps:*
1. Measure and verify performance metrics (load time, FPS, memory usage)
2. Test on all target browsers and verify compatibility
3. Verify responsive design works on different screen sizes
4. Test on lower-end devices to ensure acceptable performance
5. Verify all optimizations work correctly without introducing bugs

## Phase 9: Documentation and Deployment 🟢

### 9.1 User Documentation
- [ ] Create user guide
- [ ] Add gameplay instructions
- [ ] Create language learning guide
- [ ] Add troubleshooting section
- [ ] Create FAQ

### 9.2 Developer Documentation
- [ ] Update technical documentation
- [ ] Create API documentation
- [ ] Add code comments and docstrings
- [ ] Create contribution guide
- [ ] Document testing procedures

### 9.3 Deployment
- [ ] Create deployment script
- [ ] Set up production environment
- [ ] Implement error logging
- [ ] Add analytics
- [ ] Create backup and recovery procedures

**[CHECKPOINT: Documentation and Deployment]**
*Verification Steps:*
1. Review all documentation for accuracy and completeness
2. Verify deployment script works correctly
3. Test production environment setup
4. Verify error logging and analytics work correctly
5. Test backup and recovery procedures
6. Perform a complete deployment and verify all features work in production

## Phase 10: Future Enhancements 🔮

### 10.1 Advanced Language Features
- [ ] Implement voice generation for dialog
- [ ] Add speech recognition for pronunciation practice
- [ ] Create vocabulary tracking system
- [ ] Implement grammar explanation system
- [ ] Add difficulty adjustment based on player progress

### 10.2 Expanded Game Content
- [ ] Create additional characters
- [ ] Add new backgrounds and scenes
- [ ] Implement more complex branching narratives
- [ ] Create themed learning modules
- [ ] Add mini-games for language practice

### 10.3 Community Features
- [ ] Implement user accounts
- [ ] Add progress sharing
- [ ] Create community content contributions
- [ ] Implement leaderboards
- [ ] Add social sharing features

**[CHECKPOINT: Future Enhancements]**
*Verification Steps:*
1. Evaluate each enhancement based on user feedback and priorities
2. Develop proof-of-concept for selected enhancements
3. Test integration with existing features
4. Verify performance impact of new features
5. Gather user feedback on enhancements

## Notes

### Priority Levels
- 🔴 Critical Path (MVP)
- 🟡 High Priority (Important but not MVP)
- 🟢 Nice to Have (Future enhancements)
- ✅ Completed

### Implementation Strategy
1. Focus on getting the core game engine working with static content first
2. Add language learning features with predefined content
3. Integrate LLM capabilities for dynamic content
4. Enhance with additional features and polish

### Testing Approach
- Create CLI scripts to test functionality before UI implementation
- Implement unit tests for core logic
- Use manual testing for UI and game flow
- Create integration tests for critical paths 

### Checkpoint Guidelines
- At each checkpoint, the team should review progress and verify all functionality
- Document any issues or bugs found during verification
- Address critical issues before proceeding to the next phase
- Update the Action Plan as needed based on findings
- Involve stakeholders in checkpoint reviews for major milestones 