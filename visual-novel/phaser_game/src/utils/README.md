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

## LLMService

The `LLMService` provides integration with LLM APIs for language analysis and content generation. It supports both cloud-based OpenAI and local model instances through a consistent interface.

### Usage

```typescript
// Import the service
import { LLMService, PhraseAnalysisRequest } from '../utils';

// Get the singleton instance
const llmService = LLMService.getInstance();

// Create a request
const request: PhraseAnalysisRequest = {
  phrase: "勉強しています",
  locationName: "学校",
  contextDescription: "talking about daily activities",
  difficultyLevel: "beginner"
};

// Make an async request
try {
  const analysis = await llmService.analyzePhraseForStudy(request);
  
  // Use the analysis data
  console.log(analysis.translation);
  console.log(analysis.word_breakdown);
  // etc.
} catch (error) {
  console.error("Failed to analyze phrase:", error);
}
```

### Configuration

The service uses environment variables from the project root `.env` file injected at build time:

- `LLM_API_KEY`: Your API key for the LLM provider
- `LLM_API_BASE_URL`: Base URL for API requests (change for local models)
- `LLM_MODEL`: Model name to use (e.g., "gpt-4" or "llama-3-8b")

See the `.env.example` file in the project root for configuration examples.

## Other Utilities

- **Character**: Character model and position definitions
- **CharacterManager**: Manages character display and animations
- **Dialog**: Core dialog system data structures
- **DialogManager**: Manages conversation flow and dialog display
- **AssetManager**: Handles asset preloading and access
- **GameStateManager**: Manages game state persistence
- **PhaserDebug**: Debugging utilities for Phaser games 