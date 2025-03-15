# Furigana Integration Plan

This document outlines the plan for integrating the `FuriganaRenderer` utility into the VNScene dialog system, enabling furigana display above kanji characters in character dialog and player choices.

## Integration Steps

### 1. Update VNScene.ts

#### Import FuriganaRenderer
```typescript
import { FuriganaRenderer } from '../utils/FuriganaRenderer';
```

#### Add class property
```typescript
private furiganaRenderer: FuriganaRenderer;
```

#### Initialize in constructor
```typescript
constructor() {
  super({ key: 'VNScene' });
    
  // Initialize the character manager
  this.characterManager = new CharacterManager();
    
  // Initialize the dialog manager
  this.dialogManager = new DialogManager();
  
  // Initialize the furigana renderer
  // We'll initialize with proper options in the create() method
}
```

#### Initialize with proper options in create()
```typescript
create(): void {
  // Existing code...
  
  // Initialize furigana renderer with proper text styles
  this.furiganaRenderer = new FuriganaRenderer(this, {
    baseTextStyle: {
      fontFamily: '"Hiragino Sans", "Meiryo", "Yu Gothic", "MS Gothic", sans-serif',
      fontSize: '24px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 1
    },
    onlyCommonKanji: this.difficultyLevel === 'advanced'
  });
  
  // Rest of existing code...
}
```

### 2. Modify displayDialog() Method

Replace the current direct text display with a furigana container:

```typescript
private displayDialog(dialog: Dialog, speaker: string): void {
  // Existing cleanup code...
  
  // Create dialog with furigana
  const dialogContainer = this.furiganaRenderer.createFuriganaText(
    this.dialogText.x,
    this.dialogText.y,
    dialog.japaneseText,
    dialog.romaji
  );
  
  // Add to scene and set depth
  dialogContainer.setDepth(this.DEPTH_UI);
  
  // Store reference to container for cleanup
  this.dialogContainer = dialogContainer;
  
  // Start typewriter effect
  this.dialogTimer = this.time.addEvent({
    delay: this.dialogSpeed,
    callback: this.updateDialogTextWithFurigana,
    callbackScope: this,
    repeat: dialog.japaneseText.length - 1
  });
  
  // Rest of existing code for romaji and English text...
}
```

### 3. Add updateDialogTextWithFurigana() Method

```typescript
private updateDialogTextWithFurigana(): void {
  this.displayedTextLength++;
  
  // Update visibility of furigana elements
  // This will need to show characters one by one
  
  // Check if dialog is complete
  if (this.displayedTextLength >= this.currentDialog.length) {
    this.completeDialog();
  }
}
```

### 4. Update showChoices() Method

Modify the choice display to use FuriganaRenderer:

```typescript
private showChoices(choices: PlayerResponse[]): void {
  // Existing cleanup code...
  
  choices.forEach((choice, index) => {
    // Create button background, etc.
    
    // Replace direct text display with furigana container
    const choiceTextContainer = this.furiganaRenderer.createFuriganaText(
      0,
      -buttonHeight/2 + 25,
      choice.japaneseText,
      choice.romaji
    );
    
    // Adjust positioning as needed
    choiceTextContainer.setOrigin(0.5, 0);
    
    // Add to the choice group
    textContainer.add(choiceTextContainer);
    
    // Rest of existing code...
  });
}
```

### 5. Update Difficulty Level Handling

```typescript
private cycleDifficultyLevel(): void {
  // Existing code to cycle difficulty...
  
  // Update furigana renderer options based on difficulty
  if (this.furiganaRenderer) {
    this.furiganaRenderer = new FuriganaRenderer(this, {
      baseTextStyle: {
        fontFamily: '"Hiragino Sans", "Meiryo", "Yu Gothic", "MS Gothic", sans-serif',
        fontSize: '24px',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 1
      },
      onlyCommonKanji: this.difficultyLevel === 'advanced'
    });
  }
}
```

## Challenges and Considerations

1. **Typewriter Animation**: The current typewriter effect reveals text character by character. We need to adapt this to work with the furigana container structure.

2. **Positioning**: Furigana text needs proper vertical spacing to prevent overlap with other UI elements.

3. **Cleanup**: Ensure proper cleanup of furigana containers to prevent memory leaks.

4. **Performance**: Monitor performance with multiple furigana elements on screen.

5. **Text Wrapping**: Ensure furigana works correctly with the existing text wrapping system.

## Testing Plan

1. Test furigana display with various Japanese text samples
2. Verify furigana renders correctly in character dialog
3. Verify furigana renders correctly in player choices
4. Test compatibility with typewriter animation
5. Test across different difficulty levels
6. Test text wrapping with furigana

## Implementation Schedule

1. Basic integration with character dialog (2 days)
2. Adapt typewriter effect for furigana (1 day)
3. Integrate with player choices (1 day)
4. Testing and refinement (2 days)

Total estimated implementation time: 1 week 