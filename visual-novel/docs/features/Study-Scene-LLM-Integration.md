# Study Scene LLM Integration

## Overview

The Study Scene LLM Integration is a critical feature of our Japanese Language Learning Visual Novel that enhances the educational value of the game. This feature connects our Study Scene to an LLM API to dynamically generate detailed linguistic information about Japanese phrases encountered during gameplay. When players click the "Study" button on dialog text, the system sends the phrase to an LLM, which analyses it and returns comprehensive data to populate the Study Scene with educational content.

This document outlines the approach to integrating the LLM into our Study Scene, including necessary prompt refinements, API integration, and the front-end implementation for displaying the generated content.

## Goals

1. **Enhanced Learning Experience**: Provide players with detailed linguistic analysis of Japanese phrases
2. **Dynamic Content Generation**: Leverage LLM capabilities to create rich, contextual language learning content
3. **Seamless User Experience**: Ensure smooth transitions between gameplay and study mode with appropriate loading states
4. **Robust Error Handling**: Implement fallback mechanisms for cases where LLM responses fail or are delayed
5. **Efficient Resource Usage**: Optimize API calls to balance quality of educational content with cost considerations
6. **Provider Flexibility**: Support multiple LLM providers through a standardized interface

## Prompt Design Updates

After comparing our existing LLM prompt template in `Game-LLM-Prompts.md` with the actual data structure used in `test-phrase-data.ts`, we need to make the following updates to align the prompt with our implementation:

### Current vs. Required Structure

| Current LLM Response Structure | Implemented Test Data Structure |
|--------------------------------|--------------------------------|
| `phrase_analysis.word_breakdown` | `word_breakdown` |
| `phrase_analysis.grammar_points` | `grammar_points` |
| `phrase_analysis.cultural_notes` | `cultural_notes` |
| `phrase_analysis.alternative_expressions` | `alternative_expressions` |
| `phrase_analysis.example_sentences` | `example_sentences` |
| `phrase_analysis.pronunciation_tips` | `pronunciation_tips` |
| `phrase_analysis.common_mistakes` | `common_mistakes` |

The main difference is that our implemented structure has these properties at the top level, while the current prompt wraps them in a `phrase_analysis` object. Additionally, our test data structure includes properties for the original `phrase`, `romaji`, and `translation` at the top level.

### Updated Prompt Template

```
You are a Japanese language teacher helping an English-speaking student understand a Japanese phrase from a conversation. Please analyze the following phrase and provide detailed information about it.

PHRASE: {japanese_phrase}
CONTEXT: This phrase was used in a conversation at {location_name}, where {brief_context_description}.
DIFFICULTY LEVEL: {difficulty_level} // beginner, intermediate, or advanced

Please provide the following information in JSON format:

{
  "phrase": "{japanese_phrase}",
  "romaji": "ROMAJI_PRONUNCIATION",
  "translation": "ENGLISH_TRANSLATION",
  
  "word_breakdown": [
    {
      "word": "JAPANESE_WORD",
      "reading": "READING_IN_HIRAGANA",
      "romaji": "ROMAJI",
      "part_of_speech": "PART_OF_SPEECH",
      "meaning": "MEANING",
      "notes": "USAGE_NOTES" // optional
    },
    // Additional words...
  ],
  "grammar_points": [
    {
      "pattern": "GRAMMAR_PATTERN",
      "explanation": "EXPLANATION",
      "usage_notes": "USAGE_NOTES",
      "difficulty_level": "DIFFICULTY_LEVEL" // beginner, intermediate, advanced
    },
    // Additional grammar points...
  ],
  "cultural_notes": "CULTURAL_CONTEXT_AND_NOTES", // optional
  "alternative_expressions": [ // optional
    {
      "japanese": "ALTERNATIVE_PHRASE",
      "romaji": "ROMAJI",
      "english": "ENGLISH",
      "usage_context": "WHEN_TO_USE_THIS_ALTERNATIVE"
    },
    // Additional alternatives...
  ],
  "example_sentences": [
    {
      "japanese": "EXAMPLE_SENTENCE",
      "romaji": "ROMAJI",
      "english": "ENGLISH"
    },
    // Additional examples...
  ],
  "pronunciation_tips": "TIPS_FOR_PRONUNCIATION", // optional
  "common_mistakes": "COMMON_MISTAKES_TO_AVOID" // optional
}

IMPORTANT GUIDELINES:
- Ensure the response strictly follows the JSON format provided
- The phrase, romaji, translation, word_breakdown, grammar_points, and example_sentences fields are required
- Other fields (cultural_notes, alternative_expressions, pronunciation_tips, common_mistakes) are optional
- Tailor the explanation to the specified difficulty level
- For beginner level, focus on basic grammar and vocabulary with simple explanations
- For intermediate level, provide more nuanced explanations and cultural context
- For advanced level, include detailed linguistic analysis and subtle usage distinctions
- Include practical examples that reinforce the learning points
- Highlight any cultural nuances or context-specific usage
- Provide helpful pronunciation tips, especially for sounds that might be difficult for English speakers
- Mention common mistakes that English speakers make with this phrase or grammar pattern
- Use Hepburn romanization standard for all romaji
```

## Technical Design

### 1. LLM Service

We will implement a dedicated LLM service class that encapsulates all interaction with LLM providers. This approach keeps the Study Scene code clean and focuses on UI concerns while delegating LLM communication to a specialized service:

```typescript
// src/utils/LLMService.ts
import OpenAI from 'openai';

export interface PhraseAnalysisRequest {
  phrase: string;
  locationName: string;
  contextDescription: string;
  difficultyLevel: string;
}

export class LLMService {
  private static instance: LLMService;
  private client: OpenAI;
  
  private constructor() {
    // Create the OpenAI client with configuration from environment variables
    this.client = new OpenAI({
      apiKey: process.env.LLM_API_KEY || '',
      baseURL: process.env.LLM_API_BASE_URL || 'https://api.openai.com/v1',
      timeout: 15000, // 15 second timeout
      maxRetries: 2
    });
  }
  
  public static getInstance(): LLMService {
    if (!LLMService.instance) {
      LLMService.instance = new LLMService();
    }
    return LLMService.instance;
  }
  
  /**
   * Analyzes a Japanese phrase and returns detailed linguistic information
   */
  public async analyzePhraseForStudy(request: PhraseAnalysisRequest): Promise<PhraseAnalysis> {
    try {
      const prompt = this.createPhraseAnalysisPrompt(request);
      
      const response = await this.client.chat.completions.create({
        model: process.env.LLM_MODEL || 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        response_format: { type: 'json_object' }
      });
      
      const content = response.choices[0]?.message.content;
      if (!content) {
        throw new Error('Empty response from LLM');
      }
      
      return this.validateAndProcessLLMResponse(content);
    } catch (error) {
      console.error('Error analyzing phrase:', error);
      throw error;
    }
  }
  
  /**
   * Creates the appropriate prompt based on the phrase and context
   */
  private createPhraseAnalysisPrompt(request: PhraseAnalysisRequest): string {
    const { phrase, locationName, contextDescription, difficultyLevel } = request;
    
    // Constructs a detailed prompt using the template from the "Updated Prompt Template" 
    // section above, with the request parameters (phrase, location, context, difficulty)
    // inserted in the appropriate places. The prompt instructs the LLM to analyze the
    // Japanese phrase and return a structured JSON response matching our PhraseAnalysis
    // interface format with all required and optional fields.
    return "Detailed prompt template with request parameters inserted";
  }
  
  /**
   * Validates and processes the LLM response
   */
  private validateAndProcessLLMResponse(responseJson: string): PhraseAnalysis {
    try {
      const parsed = JSON.parse(responseJson);
      
      // Validate required fields
      if (!parsed.phrase || !parsed.romaji || !parsed.translation || 
          !Array.isArray(parsed.word_breakdown) || !Array.isArray(parsed.grammar_points) || 
          !Array.isArray(parsed.example_sentences)) {
        throw new Error('Missing required fields in LLM response');
      }
      
      return parsed as PhraseAnalysis;
    } catch (error) {
      console.error('Error parsing LLM response:', error);
      throw new Error('Failed to parse LLM response');
    }
  }
}
```

### 2. Study Scene Integration

We will update the Study Scene to use the LLM service for dynamic content generation, keeping the code focused on UI concerns:

```typescript
// Additions to src/scenes/StudyScene.ts

init(data: StudyPhraseData): void {
  this.phrase = data.phrase || '';
  this.romaji = data.romaji || '';
  this.translation = data.translation || '';
  this.context = data.context || '';
  this.source = data.source || '';
  
  // If we have a test phrase name, load it immediately
  if (data.testPhraseName) {
    this.phraseAnalysis = getTestPhrase(data.testPhraseName);
  } else {
    // Otherwise, we'll fetch from the LLM in create()
    this.phraseAnalysis = undefined;
  }
}

create(): void {
  console.log('Creating StudyScene');
  
  // Create the background overlay and content panel
  this.createBackground();
  
  // Create the header section with phrase information
  this.createHeaderSection();
  
  // Create the scrollable content area
  this.createScrollableContentArea();
  
  // Create the back button
  this.createBackButton();
  
  // If we already have phrase analysis (from test data), add content
  if (this.phraseAnalysis) {
    this.addPhraseAnalysisContent(this.phraseAnalysis);
  } else {
    // Add placeholder loading content
    this.addLoadingContent();
    
    // Fetch phrase analysis from LLM
    this.fetchPhraseAnalysisFromLLM();
  }
  
  // Set up input handlers for scrolling
  this.setupScrollHandlers();
}

private async fetchPhraseAnalysisFromLLM(): Promise<void> {
  try {
    // Get the LLM service
    const llmService = LLMService.getInstance();
    
    // Fetch phrase analysis by delegating to the service
    this.phraseAnalysis = await llmService.analyzePhraseForStudy({
      phrase: this.phrase,
      locationName: this.source || 'unknown location',
      contextDescription: this.context || 'general conversation',
      difficultyLevel: 'beginner' // We'll hardcode for now, but this could come from game settings
    });
    
    // Clear the loading content
    this.clearContentContainer();
    
    // Add the actual content
    this.addPhraseAnalysisContent(this.phraseAnalysis);
  } catch (error) {
    console.error('Error fetching phrase analysis:', error);
    
    // Clear the loading content
    this.clearContentContainer();
    
    // Add error content
    this.addErrorContent(error);
  }
}

private addLoadingContent(): void {
  if (!this.contentContainer) return;
  
  const loadingText = this.add.text(
    0, 0,
    'Analyzing phrase...\nPlease wait a moment.',
    {
      fontSize: '24px',
      color: '#ffffff',
      align: 'center'
    }
  );
  
  loadingText.setOrigin(0.5);
  loadingText.setPosition(0, 100);
  
  this.contentContainer.add(loadingText);
  
  // Add a simple animation to indicate loading
  const loadingDots = this.add.text(
    0, 150,
    '...',
    {
      fontSize: '32px',
      color: '#ffffff'
    }
  );
  
  loadingDots.setOrigin(0.5);
  
  this.contentContainer.add(loadingDots);
  
  // Animate the dots
  this.tweens.add({
    targets: loadingDots,
    alpha: 0.2,
    duration: 500,
    yoyo: true,
    repeat: -1
  });
}

private clearContentContainer(): void {
  if (!this.contentContainer) return;
  
  // Remove all children
  this.contentContainer.removeAll(true);
}

private addErrorContent(error: any): void {
  if (!this.contentContainer) return;
  
  const errorText = this.add.text(
    0, 0,
    'Sorry, there was an error analyzing this phrase.\n\nPlease try again later.',
    {
      fontSize: '24px',
      color: '#ff5555',
      align: 'center'
    }
  );
  
  errorText.setOrigin(0.5);
  errorText.setPosition(0, 100);
  
  this.contentContainer.add(errorText);
  
  // Add a fallback content section with basic information
  this.addSectionHeader("Basic Information", 200);
  
  const basicInfoText = this.add.text(
    0, 250,
    `Phrase: ${this.phrase}\n\nRomaji: ${this.romaji}\n\nTranslation: ${this.translation}`,
    {
      fontSize: '20px',
      color: '#ffffff',
      align: 'left'
    }
  );
  
  basicInfoText.setOrigin(0.5, 0);
  
  this.contentContainer.add(basicInfoText);
}
```

### 3. Environment Configuration

We'll need to set up environment variables to support switching between different LLM providers:

```
# .env file
# LLM Configuration
LLM_API_KEY=your_api_key_here
LLM_API_BASE_URL=https://api.openai.com/v1 # Change for local models, e.g., http://localhost:8000/v1
LLM_MODEL=gpt-4  # Model name recognized by the provider
```

These environment variables provide flexibility to use different LLM providers, including running local models like Llama or Mistral on a personal machine or local network, by simply changing the base URL.

## Error Handling and Fallbacks

### Error Scenarios and Handling

1. **API Connection Failures**:
   - Display error message in Study Scene
   - Provide basic information about the phrase that's available locally
   - Offer a "Try Again" button

2. **Malformed or Incomplete Responses**:
   - Validate all required fields
   - Fall back to available data (phrase, romaji, translation)
   - Log specific validation errors for debugging

3. **Timeout Issues**:
   - Implement reasonable timeout (10-15 seconds)
   - Provide loading feedback with animation
   - Cancel request and show fallback content if timeout occurs

### Fallback Content

In case of API failures, the Study Scene should display:
- The original phrase
- Available romaji and translation
- A message explaining that detailed analysis is unavailable
- Basic word breakdown if possible (using local utilities)

## UX Considerations

### Loading States

- Display a clear "Analyzing phrase..." message to inform the user
- Show a simple animation (pulsing dots, spinner, etc.) to indicate processing
- Ensure the user understands that content is being generated

### User Feedback

1. **Error Communication**:
   - Clear error messages that explain the issue without technical details
   - Suggestions for alternative actions

2. **Success Indicators**:
   - Smooth transition from loading to content display
   - Visual indication that analysis is complete

## Feature Implementation Plan (FIP)

### Phase 1: Prompt and Response Structure Alignment
- [x] Compare existing LLM prompts with test-phrase-data structure
- [x] Update prompt template to match the implemented data structure
- [x] Define validation rules for LLM responses
- [x] Create updated documentation in Game-LLM-Prompts.md

### Phase 2: LLM Service Implementation
- [ ] Create LLMService class with provider-agnostic OpenAI client
- [ ] Implement the phrase analysis prompt formatting
- [ ] Add response validation and error handling
- [ ] Test with both OpenAI API and local model endpoints
- [ ] Set up environment variables for flexible configuration

### Phase 3: Study Scene Integration
- [ ] Modify StudyScene to use LLMService
- [ ] Implement loading state UI components
- [ ] Create error state UI components
- [ ] Add fallback content display logic
- [ ] Test with various scenarios (success, error, timeout)

### Phase 4: Testing and Refinement
- [ ] Test end-to-end flow from VN Scene to Study Scene
- [ ] Verify error handling and fallbacks
- [ ] Optimize loading experience
- [ ] Implement caching for repeated phrases if needed
- [ ] Review and refine the complete implementation

### Phase 5: Documentation
- [ ] Update Game-LLM-Prompts.md to reflect the new structure and prompt format
- [ ] Document the LLMService API for future expansion
- [ ] Create usage examples for other parts of the game that may use the LLM
- [ ] Document environment configuration options for different LLM endpoints

## Conclusion

The integration of LLM capabilities into our Study Scene represents a significant enhancement to the educational value of our Japanese Language Learning Visual Novel. By dynamically generating detailed linguistic analyses of phrases encountered during gameplay, we provide players with rich, contextual learning materials that adapt to their needs.

This feature leverages the power of modern language models while maintaining a responsive, user-friendly experience through careful attention to loading states, error handling, and fallback mechanisms. The implementation plan outlined above provides a clear path to delivering this functionality while ensuring code quality and user experience are maintained. 