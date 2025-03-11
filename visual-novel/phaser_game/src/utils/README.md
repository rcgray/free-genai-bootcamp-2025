# Game Utilities

This directory contains utility classes and functions used throughout the visual novel game.

## JapaneseTextWrapper

The `JapaneseTextWrapper` class provides specialized text wrapping functionality for Japanese text, following proper typographic conventions (kinsoku shori).

### Usage

```typescript
import { JapaneseTextWrapper } from '../utils';

// Simple usage - wrap text with default 43 character max line length
const wrappedText = JapaneseTextWrapper.wrap('長い日本語のテキストです。このテキストは適切に折り返されます。');

// Specify max line length
const wrappedText = JapaneseTextWrapper.wrap('日本語のテキスト', 30);

// Enable debug output
const wrappedText = JapaneseTextWrapper.wrap('日本語のテキスト', 30, true);

// Get array of wrapped lines instead of joined string
const lines = JapaneseTextWrapper.wrapText('日本語のテキスト', 30);
```

### Features

- Proper line breaking according to Japanese typographic rules (kinsoku shori)
- Avoids breaking between prohibited character pairs
- Prioritizes breaks at natural boundaries (between different character types)
- Special handling for punctuation and small kana
- Supports one-character overflow for punctuation and line-start prohibited characters
- Handles all Japanese character types (kanji, hiragana, katakana)
- Supports extended CJK character ranges

### Implementation Details

The wrapper implements the principles outlined in `docs/reference/Japanese-Text-Line-Breaking.md`, including:

1. Prohibited line-breaking rules (kinsoku shori)
2. Character type transition detection
3. Priority-based break point selection
4. One-character overflow handling for punctuation

## Other Utilities

- **Character**: Character model and position definitions
- **CharacterManager**: Manages character display and animations
- **Dialog**: Core dialog system data structures
- **DialogManager**: Manages conversation flow and dialog display
- **AssetManager**: Handles asset preloading and access
- **GameStateManager**: Manages game state persistence
- **PhaserDebug**: Debugging utilities for Phaser games 