# Study Scene

## Overview

The Study Scene is a core feature of our Japanese Language Learning Visual Novel game. It provides players with an interactive way to learn Japanese vocabulary and grammar by focusing on specific phrases encountered during gameplay. When players come across an interesting or educational phrase in the Visual Novel Scene, they can click on a study button (emoji) to enter the Study Scene, which presents detailed information about the phrase including pronunciation, translation, and usage examples.

This feature document outlines the design and implementation of the Study Scene, focusing on the user interaction flow, scene transitions, and content presentation.

## Goals

1. **Enhanced Learning Experience**: Provide players with a focused learning environment that breaks down Japanese phrases
2. **Seamless Integration**: Create a smooth transition between gameplay and study modes without disrupting immersion
3. **Detailed Language Breakdown**: Present comprehensive information about Japanese phrases including furigana, translation, and usage
4. **Efficient Navigation**: Allow players to quickly study phrases and return to gameplay exactly where they left off
5. **Extensible Framework**: Create a foundation that can be extended with additional learning features in the future
6. **LLM Integration Ready**: Design the UI to accommodate rich phrase data that will eventually be provided by LLM

## Technical Design

### 1. Scene Transition Approach

The Study Scene is designed as an overlay that appears on top of the paused VN Scene:

```typescript
// Transition from VN Scene to Study Scene
scene.launch('StudyScene', {
  phrase: currentPhrase,
  furigana: phraseFurigana,
  translation: phraseTranslation,
  context: phraseContext
});
scene.pause('VNScene');

// Return from Study Scene to VN Scene
scene.stop('StudyScene');
scene.resume('VNScene');
```

This approach preserves the exact state of the VN Scene, allowing players to seamlessly return to their gameplay experience after studying a phrase.

### 2. Study Scene Structure

```typescript
// src/scenes/StudyScene.ts
export class StudyScene extends BaseScene {
  private phrase: string = '';
  private furigana: string = '';
  private translation: string = '';
  private context: string = '';
  private backButton?: Phaser.GameObjects.Text;
  private phraseDisplay?: JapaneseText;
  private contentTabs?: TabPanel;
  
  // Scene lifecycle methods
  init(data: StudyPhraseData): void {
    // Initialize scene with phrase data passed from VN Scene
    this.phrase = data.phrase || '';
    this.furigana = data.furigana || '';
    this.translation = data.translation || '';
    this.context = data.context || '';
  }
  
  create(): void {
    // Create UI elements
    this.createBackground();
    this.createPhraseDisplay();
    this.createTranslationDisplay();
    this.createContentTabs();
    this.createBackButton();
  }
  
  // UI creation methods
  private createBackground(): void {
    // Semi-transparent overlay
    const overlay = this.add.rectangle(
      0, 0, 
      this.cameras.main.width, 
      this.cameras.main.height, 
      0x000000
    );
    overlay.setOrigin(0, 0);
    overlay.setAlpha(0.8);
    
    // Content panel
    const panel = this.add.rectangle(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      this.cameras.main.width * 0.8,
      this.cameras.main.height * 0.8,
      0x333333
    );
    panel.setStrokeStyle(2, 0xffffff);
  }
  
  private createPhraseDisplay(): void {
    // Display Japanese phrase with furigana using JapaneseText utility
    this.phraseDisplay = new JapaneseText(
      this,
      this.cameras.main.width / 2,
      this.cameras.main.height * 0.2,
      {
        fontSize: 48,
        furiganaSize: 24,
        align: 'center',
        wordWrap: { width: this.cameras.main.width * 0.7 }
      }
    );
    
    this.phraseDisplay.setText(this.phrase, this.furigana);
  }
  
  private createTranslationDisplay(): void {
    // Display English translation below the phrase
    const translationText = this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height * 0.3,
      this.translation,
      {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: '#ffffff',
        align: 'center',
        wordWrap: { width: this.cameras.main.width * 0.7 }
      }
    );
    translationText.setOrigin(0.5, 0);
  }
  
  private createContentTabs(): void {
    // Create tab panel for different content sections
    // This will be populated with LLM data in the future
    this.contentTabs = new TabPanel(
      this,
      this.cameras.main.width / 2,
      this.cameras.main.height * 0.4,
      this.cameras.main.width * 0.75,
      this.cameras.main.height * 0.5
    );
    
    // Add default tabs (will be expanded with LLM data later)
    this.contentTabs.addTab('Word Breakdown', this.createPlaceholderContent('Word breakdown will appear here'));
    this.contentTabs.addTab('Grammar', this.createPlaceholderContent('Grammar points will appear here'));
    this.contentTabs.addTab('Examples', this.createPlaceholderContent('Example sentences will appear here'));
    this.contentTabs.addTab('Notes', this.createPlaceholderContent('Cultural notes will appear here'));
  }
  
  private createPlaceholderContent(text: string): Phaser.GameObjects.Container {
    // Create placeholder content for tabs
    // This will be replaced with actual content in the future
    const container = this.add.container(0, 0);
    const content = this.add.text(0, 0, text, {
      fontFamily: 'Arial',
      fontSize: '18px',
      color: '#ffffff',
      wordWrap: { width: this.cameras.main.width * 0.7 }
    });
    container.add(content);
    return container;
  }
  
  private createBackButton(): void {
    // Create back button in top left
    this.backButton = this.add.text(
      20, 20,
      'Back to Game',
      {
        fontFamily: 'Arial',
        fontSize: '18px',
        color: '#ffffff',
        backgroundColor: '#5a1e1e',
        padding: { left: 10, right: 10, top: 5, bottom: 5 }
      }
    );
    this.backButton.setInteractive({ useHandCursor: true });
    
    // Handle click event
    this.backButton.on('pointerdown', () => {
      this.returnToVNScene();
    });
  }
  
  // Navigation method
  private returnToVNScene(): void {
    // Stop this scene and resume the VN Scene
    this.scene.stop('StudyScene');
    this.scene.resume('VNScene');
  }
}
```

### 3. Phrase Data Interface

```typescript
// src/types/StudyTypes.ts
export interface StudyPhraseData {
  phrase: string;         // Japanese phrase
  furigana: string;       // Furigana reading
  translation: string;    // English translation
  context?: string;       // Optional contextual information
  source?: string;        // Source of the phrase (character, dialogue, etc.)
  phraseLLMData?: PhraseLLMData; // LLM-generated data (future implementation)
}

// Interface for LLM-generated phrase data (future implementation)
export interface PhraseLLMData {
  wordBreakdown: WordBreakdown[];
  grammarPoints: GrammarPoint[];
  culturalNotes: string;
  alternativeExpressions: AlternativeExpression[];
  exampleSentences: ExampleSentence[];
  pronunciationTips: string;
  commonMistakes: string;
}

// Sub-interfaces for structured LLM data
export interface WordBreakdown {
  word: string;
  reading: string;
  romaji: string;
  partOfSpeech: string;
  meaning: string;
  notes?: string;
}

export interface GrammarPoint {
  pattern: string;
  explanation: string;
  usageNotes: string;
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
}

export interface AlternativeExpression {
  japanese: string;
  romaji: string;
  english: string;
  usageContext: string;
}

export interface ExampleSentence {
  japanese: string;
  romaji: string;
  english: string;
}
```

### 4. Study Button Integration in VN Scene

```typescript
// src/scenes/VNScene.ts

// Method to add study buttons to dialog
private addStudyButtonToDialog(text: Phaser.GameObjects.Text, phraseData: StudyPhraseData): void {
  // Create study button (emoji)
  const studyButton = this.add.text(
    text.x + text.width + 10,
    text.y,
    '📝', // Study emoji
    { fontSize: '24px' }
  );
  
  // Make interactive
  studyButton.setInteractive({ useHandCursor: true });
  
  // Handle click
  studyButton.on('pointerdown', () => {
    this.openStudyScene(phraseData);
  });
}

// Method to open study scene
private openStudyScene(phraseData: StudyPhraseData): void {
  // Launch study scene as overlay
  this.scene.launch('StudyScene', phraseData);
  
  // Pause this scene (but keep it visible in background)
  this.scene.pause();
}
```

### 5. Japanese Text with Furigana

To properly display Japanese text with furigana (ruby text), we'll implement a custom text rendering system:

```typescript
// src/utils/JapaneseText.ts
export class JapaneseText {
  private scene: Phaser.Scene;
  private container: Phaser.GameObjects.Container;
  private options: JapaneseTextOptions;
  
  constructor(scene: Phaser.Scene, x: number, y: number, options: Partial<JapaneseTextOptions> = {}) {
    this.scene = scene;
    this.options = {
      fontSize: options.fontSize || 32,
      furiganaSize: options.furiganaSize || 16,
      color: options.color || '#ffffff',
      furiganaColor: options.furiganaColor || '#ffffff',
      align: options.align || 'center',
      wordWrap: options.wordWrap || { width: 600 },
      lineSpacing: options.lineSpacing || 8
    };
    
    // Create container to hold all text elements
    this.container = scene.add.container(x, y);
  }
  
  // Set text with furigana
  setText(text: string, furigana: string): void {
    // Clear previous content
    this.container.removeAll(true);
    
    // Parse text and furigana into segments
    const segments = this.parseText(text, furigana);
    
    // Render each segment
    let xPos = 0;
    let yPos = 0;
    let lineWidth = 0;
    
    segments.forEach(segment => {
      // Create main text
      const textObj = this.scene.add.text(xPos, yPos, segment.text, {
        fontFamily: 'Noto Sans JP',
        fontSize: `${this.options.fontSize}px`,
        color: this.options.color
      });
      
      // Add to container
      this.container.add(textObj);
      
      // Add furigana if present
      if (segment.furigana) {
        const furiganaObj = this.scene.add.text(
          xPos,
          yPos - this.options.furiganaSize - 2,
          segment.furigana,
          {
            fontFamily: 'Noto Sans JP',
            fontSize: `${this.options.furiganaSize}px`,
            color: this.options.furiganaColor
          }
        );
        
        // Center furigana over text
        furiganaObj.setX(xPos + (textObj.width - furiganaObj.width) / 2);
        
        // Add to container
        this.container.add(furiganaObj);
      }
      
      // Update position for next segment
      xPos += textObj.width;
      lineWidth += textObj.width;
      
      // Handle word wrapping
      if (lineWidth > this.options.wordWrap.width) {
        xPos = 0;
        yPos += this.options.fontSize + this.options.lineSpacing;
        lineWidth = 0;
      }
    });
  }
  
  // Parse text with furigana notation into segments
  private parseText(text: string, furigana: string): TextSegment[] {
    // Implementation will depend on how furigana is formatted
    // This is a placeholder that would need to be implemented
    // based on the specific format we use for furigana
    return [];
  }
  
  // Helper methods for positioning and styling
  setPosition(x: number, y: number): void {
    this.container.setPosition(x, y);
  }
  
  setVisible(visible: boolean): void {
    this.container.setVisible(visible);
  }
  
  destroy(): void {
    this.container.destroy();
  }
}

interface JapaneseTextOptions {
  fontSize: number;
  furiganaSize: number;
  color: string;
  furiganaColor: string;
  align: 'left' | 'center' | 'right';
  wordWrap: { width: number };
  lineSpacing: number;
}

interface TextSegment {
  text: string;
  furigana?: string;
}
```

### 6. UI Components for LLM Data Display

To properly display the rich structured data that will be provided by the LLM, we need additional UI components:

```typescript
// src/utils/TabPanel.ts
export class TabPanel {
  private scene: Phaser.Scene;
  private container: Phaser.GameObjects.Container;
  private tabs: Phaser.GameObjects.Text[] = [];
  private contents: Phaser.GameObjects.Container[] = [];
  private activeTabIndex: number = 0;
  private tabBackground: Phaser.GameObjects.Rectangle;
  private contentBackground: Phaser.GameObjects.Rectangle;
  
  constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
    this.scene = scene;
    this.container = scene.add.container(x, y);
    
    // Create tab background
    this.tabBackground = scene.add.rectangle(
      0, 
      -height / 2 + 20, 
      width, 
      40, 
      0x222222
    );
    this.tabBackground.setOrigin(0.5, 0.5);
    
    // Create content background
    this.contentBackground = scene.add.rectangle(
      0,
      20,
      width,
      height - 40,
      0x333333
    );
    this.contentBackground.setOrigin(0.5, 0);
    this.contentBackground.setStrokeStyle(1, 0xaaaaaa);
    
    // Add to container
    this.container.add([this.tabBackground, this.contentBackground]);
  }
  
  // Add a tab with content
  addTab(label: string, content: Phaser.GameObjects.Container): void {
    const tabIndex = this.tabs.length;
    const tabX = -this.tabBackground.width / 2 + 100 * tabIndex + 50;
    const tabY = -this.contentBackground.height - 20;
    
    // Create tab
    const tab = this.scene.add.text(
      tabX,
      tabY,
      label,
      {
        fontFamily: 'Arial',
        fontSize: '16px',
        color: '#ffffff',
        backgroundColor: tabIndex === this.activeTabIndex ? '#555555' : '#333333',
        padding: { left: 10, right: 10, top: 5, bottom: 5 }
      }
    );
    tab.setOrigin(0.5, 0.5);
    tab.setInteractive({ useHandCursor: true });
    
    // Handle click
    tab.on('pointerdown', () => {
      this.selectTab(tabIndex);
    });
    
    // Add to arrays
    this.tabs.push(tab);
    this.contents.push(content);
    
    // Position content
    content.setPosition(
      -this.contentBackground.width / 2 + 20,
      20
    );
    
    // Show if active, hide otherwise
    content.setVisible(tabIndex === this.activeTabIndex);
    
    // Add to container
    this.container.add([tab, content]);
  }
  
  // Select a tab
  selectTab(index: number): void {
    if (index < 0 || index >= this.tabs.length) return;
    
    // Update styles
    this.tabs.forEach((tab, i) => {
      tab.setStyle({
        backgroundColor: i === index ? '#555555' : '#333333'
      });
    });
    
    // Show/hide content
    this.contents.forEach((content, i) => {
      content.setVisible(i === index);
    });
    
    // Update active index
    this.activeTabIndex = index;
  }
}

// src/utils/WordBreakdownPanel.ts
export class WordBreakdownPanel {
  private scene: Phaser.Scene;
  private container: Phaser.GameObjects.Container;
  
  constructor(scene: Phaser.Scene, x: number, y: number, width: number) {
    this.scene = scene;
    this.container = scene.add.container(x, y);
  }
  
  // Set the word breakdown data
  setWordBreakdown(wordBreakdown: WordBreakdown[]): void {
    // Clear previous content
    this.container.removeAll(true);
    
    // Create word entries
    let yPos = 0;
    
    wordBreakdown.forEach(word => {
      // Create word container
      const wordContainer = this.scene.add.container(0, yPos);
      
      // Create word entry with reading
      const wordText = new JapaneseText(
        this.scene,
        0,
        0,
        {
          fontSize: 24,
          furiganaSize: 12
        }
      );
      wordText.setText(word.word, word.reading);
      
      // Create meaning
      const meaningText = this.scene.add.text(
        200,
        0,
        `${word.partOfSpeech}: ${word.meaning}`,
        {
          fontFamily: 'Arial',
          fontSize: '18px',
          color: '#ffffff'
        }
      );
      
      // Add to container
      wordContainer.add([wordText.getContainer(), meaningText]);
      this.container.add(wordContainer);
      
      // Update yPos for next word
      yPos += 50;
    });
  }
  
  // Get the container for adding to other containers
  getContainer(): Phaser.GameObjects.Container {
    return this.container;
  }
}
```

### 7. LLM Integration (Future Implementation)

In the future, we'll integrate the Study Scene with LLM-generated phrase data:

```typescript
// src/services/LLMService.ts
export class LLMService {
  // Fetch phrase analysis from LLM API
  static async getPhraseAnalysis(phrase: string, context: string, difficultyLevel: string): Promise<PhraseLLMData | null> {
    try {
      // This is a placeholder for the actual LLM API call
      // Will be implemented in the future according to docs/Game-LLM-Prompts.md
      
      // Call the LLM API with the prompt template for Phrase Details
      const response = await fetch('/api/llm/phrase-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phrase,
          context,
          difficultyLevel
        })
      });
      
      if (!response.ok) {
        throw new Error(`LLM API error: ${response.status}`);
      }
      
      const data = await response.json();
      return data.phrase_analysis;
    } catch (error) {
      console.error('Error fetching phrase analysis:', error);
      return null;
    }
  }
}

// Updated StudyScene to handle LLM data
private async loadPhraseAnalysis(): Promise<void> {
  // Show loading indicator
  const loadingText = this.add.text(
    this.cameras.main.width / 2,
    this.cameras.main.height / 2,
    'Loading phrase analysis...',
    {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#ffffff'
    }
  );
  loadingText.setOrigin(0.5, 0.5);
  
  try {
    // Get phrase analysis from LLM
    const analysis = await LLMService.getPhraseAnalysis(
      this.phrase,
      this.context || '',
      'beginner' // This could be based on user settings
    );
    
    // Remove loading indicator
    loadingText.destroy();
    
    if (!analysis) {
      this.showError('Failed to load phrase analysis');
      return;
    }
    
    // Update UI with LLM data
    this.updateWithLLMData(analysis);
  } catch (error) {
    console.error('Error in loadPhraseAnalysis:', error);
    loadingText.destroy();
    this.showError('An error occurred while loading phrase analysis');
  }
}

private updateWithLLMData(data: PhraseLLMData): void {
  // Clear existing tabs
  this.contentTabs?.container.removeAll(true);
  
  // Create specialized panels for each data type
  const wordBreakdownPanel = new WordBreakdownPanel(
    this,
    0,
    0,
    this.cameras.main.width * 0.7
  );
  wordBreakdownPanel.setWordBreakdown(data.wordBreakdown);
  
  // Similar panels for other data types...
  
  // Add tabs with the new content
  this.contentTabs?.addTab('Words', wordBreakdownPanel.getContainer());
  this.contentTabs?.addTab('Grammar', this.createGrammarPanel(data.grammarPoints));
  this.contentTabs?.addTab('Examples', this.createExamplesPanel(data.exampleSentences));
  this.contentTabs?.addTab('Notes', this.createNotesPanel(data.culturalNotes, data.pronunciationTips, data.commonMistakes));
  this.contentTabs?.addTab('Alternatives', this.createAlternativesPanel(data.alternativeExpressions));
}
```

### 8. HMR Considerations

Since the Study Scene is designed to be ephemeral, we handle HMR specifically to ensure a good development experience. The approach is more direct and relies on the scene system itself as the source of truth:

```typescript
// In GameStateManager.ts
public saveStateBeforeHMR(): GameState {
  try {
    // Check if StudyScene is active - this is the only way to determine "study mode"
    const studySceneActive = this.game.scene.getScenes(true).some(scene => scene.scene.key === 'StudyScene');
    
    if (studySceneActive) {
      console.log('📝 Study mode detected (StudyScene active) - will preserve VNScene state');
      
      // If StudyScene is active, VNScene must exist and be paused
      const vnScene = this.game.scene.getScene('VNScene');
      if (!vnScene) {
        console.error('🛑 CRITICAL ERROR: StudyScene is active but VNScene does not exist!');
        throw new Error('StudyScene cannot exist without VNScene');
      }
      
      // Get a state object, which will correctly use VNScene as currentScene
      const state = this.saveState();
      
      // Additional safety check - state.currentScene should now be 'VNScene'
      if (state.currentScene !== 'VNScene') {
        console.error('🛑 CRITICAL ERROR: saveState did not set VNScene as current scene when StudyScene is active!');
        throw new Error('Inconsistent scene state handling');
      }
      
      // Ensure we have the VNScene state saved properly
      if (this.isStatefulScene(vnScene)) {
        state.sceneStates['VNScene'] = (vnScene as unknown as StatefulScene).serializeState();
      }
      
      return state;
    } else {
      // Regular state saving when StudyScene is not active
      return this.saveState();
    }
  } catch (e) {
    console.error('Error in saveStateBeforeHMR:', e);
    // Let the error propagate rather than masking it
    throw e;
  }
}

// When restoring after HMR
public restoreStateAfterHMR(state: GameState): void {
  // Check if we're attempting to restore to StudyScene - this should never happen
  if (state.currentScene === 'StudyScene') {
    console.error('🛑 CRITICAL ERROR: Attempting to restore to StudyScene!');
    throw new Error('Cannot restore to StudyScene - it is ephemeral by design');
  }
  
  // Proceed with normal state restoration
  this.restoreState(state);
}
```

This approach has several benefits:

1. **Direct Source of Truth**: Uses the scene system itself to determine state rather than flags
2. **Aggressive Failure Handling**: Throws errors for invalid states rather than silently fixing them
3. **Simplified State Management**: No need for additional flags or special tracking variables
4. **Better Developer Experience**: Returns to the exact state of the gameplay
5. **Centralized Logic**: All HMR handling happens in one place, making it easier to maintain

Additionally, our scene transition handling in index.ts explicitly prevents StudyScene from ever being tracked as the current scene:

```typescript
// Listen for scene transitions
game.scene.scenes.forEach(scene => {
  // Listen for scene start events
  scene.events.on('start', () => {
    const newSceneKey = scene.scene.key;
    
    // Never track StudyScene as the current scene
    if (newSceneKey === 'StudyScene') {
      console.log(`ℹ️ StudyScene started, but not tracking it as current scene`);
      return;
    }
    
    if (newSceneKey !== currentSceneKey) {
      console.log(`🔄 Scene changed from ${currentSceneKey} to ${newSceneKey}`);
      currentSceneKey = newSceneKey;
      
      // Update stored scene information...
    }
  });
});
```

By implementing these safeguards, we ensure StudyScene is truly ephemeral and never persisted during HMR.

## Implementation Plan

### Phase 1: Core Scene Structure

1. **Create StudyScene Class**: Implement the basic structure of the Study Scene
2. **Implement Scene Transitions**: Set up the pause/resume approach for seamless navigation
3. **Design Basic UI Layout**: Create the overlay background and content panel
4. **Add Back Button**: Implement the back button to return to the VN Scene
5. **Test Basic Navigation**: Verify scenes transition correctly in both directions

### Phase 2: Japanese Text Rendering

1. **Implement JapaneseText Utility**: Create a utility for rendering Japanese text with furigana
2. **Add Font Loading**: Ensure Japanese fonts are properly loaded and applied
3. **Create Phrase Display**: Implement the main phrase display with furigana
4. **Add Translation Display**: Show English translations with proper formatting
5. **Add Visual Polish**: Improve the visual presentation of text elements

### Phase 3: VN Scene Integration

1. **Create Study Button Component**: Implement the emoji button for study mode
2. **Add Study Buttons to Dialog**: Integrate study buttons with dialog text
3. **Add Study Buttons to Choices**: Add study buttons to choice options
4. **Implement Data Passing**: Ensure phrase data is correctly passed to Study Scene
5. **Test Full Integration**: Verify all components work together as expected

### Phase 4: UI Components for LLM Data

1. **Create TabPanel Component**: Implement a tabbed interface for organizing content
2. **Design Content Sections**: Create placeholders for the different types of LLM data
3. **Implement Basic Layouts**: Set up the structure to display word breakdowns, grammar, examples, etc.
4. **Add Visual Styling**: Ensure the UI is visually consistent and user-friendly
5. **Test Layout Responsiveness**: Verify the UI adapts to different screen sizes

### Phase 5: HMR and State Management

1. **Update HMR Handler**: Modify HMR handling to account for Study Scene
2. **Adjust State Persistence**: Ensure state is properly handled during development
3. **Test HMR Scenarios**: Verify different HMR scenarios work as expected
4. **Debug Edge Cases**: Handle any edge cases in scene transitions during HMR
5. **Document HMR Behavior**: Update documentation with Study Scene HMR considerations

### Phase 6: LLM Integration (Future Implementation)

1. **Design API Client**: Create a service for communicating with the LLM API
2. **Implement Prompt Templates**: Set up the phrase analysis prompt according to docs/Game-LLM-Prompts.md
3. **Add Response Handling**: Parse and validate LLM responses
4. **Create Fallback Mechanisms**: Handle API failures gracefully
5. **Update UI for LLM Data**: Enhance UI components to display the rich LLM data

## Acceptance Criteria

- [x] Players can access the Study Scene by clicking a study button (emoji) next to dialog or choices
- [x] The Study Scene displays the Japanese phrase with proper furigana
- [x] Translation and contextual information are clearly presented
- [ ] The UI has a tabbed interface ready to accommodate future LLM data
- [x] Content sections are designed to display word breakdowns, grammar points, examples, etc.
- [x] Players can return to the VN Scene exactly where they left off using the back button
- [x] Scene transitions are smooth and maintain game state
- [x] HMR works correctly when code changes occur during Study Scene
- [ ] The interface is visually consistent with the rest of the game
- [ ] All text is properly displayed with appropriate fonts and styling

## Future Enhancements

- **LLM Integration**: Connect to the LLM API for rich phrase analysis as outlined in docs/Game-LLM-Prompts.md
- **Study History**: Track which phrases the player has studied
- [ ] Spaced Repetition: Implement a review system based on learning science
- [ ] Audio Pronunciation: Add audio playback of Japanese phrases
- [ ] Interactive Exercises: Add exercises to test understanding of the studied phrase
- [ ] Vocabulary Lists: Compile studied phrases into vocabulary lists
- [ ] Export Functionality: Allow exporting studied phrases to external study apps
- [ ] Offline Mode: Implement caching strategies for LLM responses to enable offline study

## Implementation Notes

- The Study Scene is designed to be ephemeral, not retaining its own state during HMR or save/load
- When implementing Japanese text rendering, consider performance implications of complex text layouts
- Font loading should be handled carefully to avoid display issues with Japanese characters
- The pause/resume approach for scenes may need adjustments based on Phaser's behavior in different scenarios
- The UI should be designed with future LLM data in mind, making room for the rich structured data
- To avoid complexity in the initial implementation, start with static placeholders for LLM data sections
- Consider performance implications of potentially large LLM responses, especially on mobile devices
- Implement proper error handling and fallbacks for cases where LLM data is unavailable 