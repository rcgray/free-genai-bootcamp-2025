/**
 * LLMService.ts
 * 
 * This service encapsulates all interaction with LLM providers for the game.
 * It provides methods to analyze Japanese phrases and return detailed linguistic 
 * information to populate the Study Scene. The service is designed to be 
 * provider-agnostic, supporting both cloud-based and local LLM endpoints.
 * 
 * This service now uses a secure proxy server to communicate with LLM providers,
 * which protects API keys by keeping them server-side rather than exposing them
 * in client-side code.
 * 
 * TODO: Future enhancement - Implement caching for repeated phrases to reduce
 * API calls and improve performance. This would likely involve maintaining a 
 * local cache of phrase analyses keyed by the phrase text, with expiration logic
 * to refresh analyses periodically.
 */

import { PhraseAnalysis } from '../data/study/test-phrase-data';

/**
 * Interface for phrase analysis request parameters
 */
export interface PhraseAnalysisRequest {
  phrase: string;
  locationName: string;
  contextDescription: string;
  difficultyLevel: string;
}

/**
 * Service for interacting with LLM API for phrase analysis
 */
export class LLMService {
  private static instance: LLMService;
  private proxyUrl: string;
  
  /**
   * Private constructor - use getInstance() to get a singleton instance
   */
  private constructor() {
    // Initialize with the proxy URL
    this.proxyUrl = this.getEnvVar('LLM_PROXY_URL', 'http://localhost:3000/api');
  }
  
  /**
   * Get environment variable with fallback
   */
  private getEnvVar(name: string, fallback: string): string {
    // In browser environments, we can't directly access process.env
    // We'll use window.__ENV__ which should be injected at build time
    const env = (window as any).__ENV__ || {};
    return env[name] || fallback;
  }
  
  /**
   * Get singleton instance of LLMService
   */
  public static getInstance(): LLMService {
    if (!LLMService.instance) {
      LLMService.instance = new LLMService();
    }
    return LLMService.instance;
  }
  
  /**
   * Check if the proxy server is available
   * @returns Promise that resolves to true if the proxy is available
   */
  public async isProxyAvailable(): Promise<boolean> {
    try {
      const response = await fetch(`${this.proxyUrl}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      return response.ok;
    } catch (error) {
      console.error('[LLM_SERVICE] Proxy server not available:', error);
      return false;
    }
  }
  
  /**
   * Analyzes a Japanese phrase and returns detailed linguistic information
   * @param request - Analysis request parameters
   * @returns Promise containing phrase analysis
   */
  public async analyzePhraseForStudy(request: PhraseAnalysisRequest): Promise<PhraseAnalysis> {
    try {
      // 1. Create the prompt - application logic stays in our app
      const prompt = this.createPhraseAnalysisPrompt(request);
      
      // 2. Prepare a standard OpenAI-compatible request body
      const requestBody = {
        model: this.getEnvVar('LLM_MODEL', 'gpt-4'), // Client can specify model, will be overridden by server default if not set
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        response_format: { type: 'json_object' }
      };
      
      // 3. Check if proxy is available (optional - makes error messages more specific)
      const isAvailable = await this.isProxyAvailable();
      if (!isAvailable) {
        throw new Error('LLM proxy server is not available. Please ensure it is running.');
      }
      
      // 4. Send to generic proxy endpoint
      console.log('[LLM_SERVICE] Sending request to proxy server');
      const response = await fetch(`${this.proxyUrl}/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        throw new Error(`Proxy server error: ${response.status}`);
      }
      
      // 5. Process the raw response - application logic stays in our app
      const data = await response.json();
      const content = data.choices[0]?.message.content;
      
      if (!content) {
        throw new Error('Empty response from LLM');
      }
      
      // 6. Process and validate the response - application logic stays in our app
      return this.validateAndProcessLLMResponse(content);
    } catch (error) {
      console.error('[LLM_SERVICE] Error analyzing phrase:', error);
      throw error;
    }
  }
  
  /**
   * Creates the appropriate prompt based on the phrase and context
   */
  private createPhraseAnalysisPrompt(request: PhraseAnalysisRequest): string {
    const { phrase, locationName, contextDescription, difficultyLevel } = request;
    
    return `
You are a Japanese language teacher helping an English-speaking student understand a Japanese phrase from a conversation. Please analyze the following phrase and provide detailed information about it.

PHRASE: ${phrase}
CONTEXT: This phrase was used in a conversation at ${locationName}, where ${contextDescription}.
DIFFICULTY LEVEL: ${difficultyLevel} // beginner, intermediate, or advanced

Please provide the following information in JSON format:

{
  "phrase": "${phrase}",
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
`;
  }
  
  /**
   * Validates and processes the LLM response
   * 
   * Our validation approach:
   * 1. Required fields (phrase, romaji, translation, word_breakdown, grammar_points, example_sentences):
   *    - Strictly validated - will throw errors if missing or incomplete
   *    - These are essential for the Study Scene to function properly
   * 
   * 2. Optional fields (alternative_expressions, cultural_notes, pronunciation_tips, common_mistakes):
   *    - Gracefully handled - will fix or provide defaults if missing or incomplete
   *    - If arrays (like alternative_expressions) contain incomplete items, we fix them instead of rejecting
   *    - If string fields are missing, we provide sensible defaults
   * 
   * This approach ensures we get the maximum value from the LLM response while maintaining
   * a robust user experience even when the response doesn't perfectly match our expected format.
   */
  private validateAndProcessLLMResponse(responseJson: string): PhraseAnalysis {
    try {
      const parsed = JSON.parse(responseJson);
      
      // Validate required fields based on the requirements in Game-LLM-Prompts.md
      if (!parsed.phrase || !parsed.romaji || !parsed.translation || 
          !Array.isArray(parsed.word_breakdown) || !Array.isArray(parsed.grammar_points) || 
          !Array.isArray(parsed.example_sentences)) {
        throw new Error('Missing required fields in LLM response');
      }
      
      // Validate that arrays have at least one item
      if (parsed.word_breakdown.length === 0 || 
          parsed.grammar_points.length === 0 || 
          parsed.example_sentences.length === 0) {
        throw new Error('Required arrays cannot be empty');
      }
      
      // Validate word_breakdown items
      for (const word of parsed.word_breakdown) {
        if (!word.word || !word.reading || !word.romaji || 
            !word.part_of_speech || !word.meaning) {
          throw new Error('Word breakdown items missing required fields');
        }
      }
      
      // Validate grammar_points items
      for (const grammar of parsed.grammar_points) {
        if (!grammar.pattern || !grammar.explanation || 
            !grammar.usage_notes || !grammar.difficulty_level) {
          throw new Error('Grammar point items missing required fields');
        }
      }
      
      // Validate example_sentences items
      for (const example of parsed.example_sentences) {
        if (!example.japanese || !example.romaji || !example.english) {
          throw new Error('Example sentence items missing required fields');
        }
      }
      
      // Process optional fields - fix them instead of rejecting if incomplete
      
      // Handle alternative_expressions if present
      if (parsed.alternative_expressions && Array.isArray(parsed.alternative_expressions)) {
        // Filter out any invalid alternative expressions and fix incomplete ones
        parsed.alternative_expressions = parsed.alternative_expressions
          .filter((alt: any) => alt && typeof alt === 'object')
          .map((alt: any) => {
            // Ensure all required fields exist, providing defaults if missing
            return {
              japanese: alt.japanese || "N/A",
              romaji: alt.romaji || "N/A",
              english: alt.english || "N/A",
              usage_context: alt.usage_context || "General alternative expression"
            };
          });
        
        // Log if we had to fix any alternative expressions
        if (parsed.alternative_expressions.some((alt: any) => 
            alt.japanese === "N/A" || alt.romaji === "N/A" || 
            alt.english === "N/A" || alt.usage_context === "General alternative expression")) {
          console.warn('[LLM_SERVICE] Fixed incomplete alternative expressions in LLM response');
        }
      }
      
      // Ensure other optional string fields exist with defaults if needed
      parsed.cultural_notes = parsed.cultural_notes || "No cultural notes provided.";
      parsed.pronunciation_tips = parsed.pronunciation_tips || "No pronunciation tips provided.";
      parsed.common_mistakes = parsed.common_mistakes || "No common mistakes noted.";
      
      // If there are any empty arrays for optional fields, initialize them
      if (parsed.alternative_expressions === undefined) {
        parsed.alternative_expressions = [];
      }
      
      return parsed as PhraseAnalysis;
    } catch (error) {
      console.error('[LLM_SERVICE] Error parsing LLM response:', error);
      throw new Error(`Failed to parse LLM response: ${error}`);
    }
  }
} 