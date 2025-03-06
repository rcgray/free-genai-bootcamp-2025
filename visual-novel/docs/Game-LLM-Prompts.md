# Game LLM Prompts
Our game will be supported by a Large Language Model (LLM) that will be used to generate the dialog for the game and provide dynamic content for the study objectives such as pronunciation and translation. This document contains the prompts used to generate the dialog and the study objectives, and it coincides with game details explained in the `Game-Design.md` file.

Note that this file also works toward a primary goal of this project, specified in the `PRD.md` file: "**Research Goal**: To explore the potential and limitations of LLMs as a design material for game development."

We currently have two needs for querying the LLM API:

    - **Location Conversation Data**: When a new Location or Sub-Location is loaded and we need to generate the conversation data for that location 
    - **Phrase Details**: When the player decides to study a new word or phrase and we need to generate detailed information about that word or phrase

Not that in Implementation Considerations, items marked with (NOTYET) are not yet planned for implementation, but we will keep these in mind for future iterations.

## Location Conversation Data

In our current plan for integrating the LLM into the game, we will query the LLM API anytime that new location or sub-location is loaded. For each Location in the `Game-Design.md` file, we have the following information:

    - Location Name and Overview (description)
    - Events that will take place in the Location, divided by sub-location
    - Characters present in each sub-location
    - Conversational Objectives for the player
    - Transition to the next Location

With this information, we want to generate a prompt that will be used to query the LLM API for the conversation data that will take place in the location.  The conversation data should consist of a series of "Dialogs", where a single "Dialog" consists of the following data:

    - Character speaking
    - Character emotion (["default", "worried", "surprised", "thinking"])
    - Phrase said by the character (1-3 sentences, in Japanese)
    - Romaji pronunciation of the phrase
    - English translation of the phrase
    - 2-3 Player "Response Options", consisting of the following data:
        - Phrase that would be said by the player (1 sentence or phrase, in Japanese)
        - Romaji pronunciation of the phrase
        - English translation of the phrase

The "Dialogs" should all be of this format, and over the course of the conversation (full set of Dialogs), should carry through the events of the Location and include some or all of the Conversational Objectives for that Location. Player "Response Options" should be narratively neutral and not disrupt the flow of the conversation.

Here we will design a prompt template that will be used to generate the conversation data for a given location.

### Prompt Template for Location Conversation Data

```
You are a Japanese language teacher and dialog writer for a visual novel game designed to teach Japanese to English speakers. Your task is to create a conversation that takes place in the following location:

LOCATION: {location_name}
DESCRIPTION: {location_description}
SUB-LOCATION: {sub_location_name}
EVENTS: {events_description}
CHARACTERS PRESENT: {characters_list}
CONVERSATIONAL OBJECTIVES: {objectives_list}

Please generate a series of dialog exchanges that occur in this location. The dialog should:
1. Include the events described for this location
2. Incorporate the conversational objectives
3. Be appropriate for a {difficulty_level} Japanese language learner
4. Be culturally authentic and natural

For each dialog exchange, provide the following information in JSON format:

{
  "dialogs": [
    {
      "character": "CHARACTER_NAME",
      "emotion": "EMOTION", // one of: default, worried, surprised, thinking
      "japanese_text": "JAPANESE_TEXT", // 1-3 sentences in Japanese
      "romaji": "ROMAJI", // pronunciation in romaji
      "english": "ENGLISH_TRANSLATION",
      "player_responses": [
        {
          "japanese_text": "RESPONSE_1", // player's response in Japanese
          "romaji": "ROMAJI_1",
          "english": "ENGLISH_1"
        },
        {
          "japanese_text": "RESPONSE_2",
          "romaji": "ROMAJI_2",
          "english": "ENGLISH_2"
        },
        {
          "japanese_text": "RESPONSE_3", // optional third response
          "romaji": "ROMAJI_3",
          "english": "ENGLISH_3"
        }
      ]
    },
    // Additional dialog exchanges...
  ]
}

IMPORTANT GUIDELINES:
- Use natural, conversational Japanese appropriate for the context
- For beginner level, use simple grammar and vocabulary with full furigana
- For intermediate level, use moderate complexity with some kanji
- For advanced level, use natural Japanese with appropriate keigo (politeness levels)
- Ensure player response options are narratively neutral and all lead appropriately to the next dialog
- Ensure player response options are meaningfully different but all maintain narrative flow
- Include culturally relevant expressions and phrases
- Incorporate the conversational objectives naturally into the dialog
- Make sure the conversation flows logically from one exchange to the next
- The conversation should have a clear beginning, middle, and end
- Ensure that every character in the conversation has at least one dialog in which they are speaking
```

### Implementation Considerations for Location Conversation

1. **Caching Strategy** (NOTYET):
   - Cache generated conversations to avoid repeated API calls
   - Store conversations by location ID and difficulty level
   - Implement a TTL (time-to-live) for cached conversations to refresh content periodically

2. **Fallback Mechanism**:
   - Prepare static fallback conversations for each location in case of API failures
   - Implement retry logic with exponential backoff for API calls
   - Log failed prompts for later analysis and improvement

3. **Response Validation**:
   - Validate that the returned JSON is properly formatted
   - Check that all required fields are present
   - Verify that Japanese text, romaji, and English translations are provided
   - Ensure character emotions are from the allowed list


## Phrase Details Generation

For any "Dialog" that is generated, the user will have the option to select that "Dialog" to study.  This will open to a new scene that discusses the Japanese phrase in detail, including the romaji pronunciation and English translation, and a discussion of the grammar and cultural context of the phrase (if applicable).  We will already have information regarding romaji and English translation, but we will want to query the LLM with the phrase and the context of this game in order to have it generate an appropriate description.

### Prompt Template for Phrase Details

```
You are a Japanese language teacher helping an English-speaking student understand a Japanese phrase from a conversation. Please analyze the following phrase and provide detailed information about it.

PHRASE: {japanese_phrase}
CONTEXT: This phrase was used in a conversation at {location_name}, where {brief_context_description}.
DIFFICULTY LEVEL: {difficulty_level} // beginner, intermediate, or advanced

Please provide the following information in JSON format:

{
  "phrase_analysis": {
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
    "cultural_notes": "CULTURAL_CONTEXT_AND_NOTES",
    "alternative_expressions": [
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
    "pronunciation_tips": "TIPS_FOR_PRONUNCIATION",
    "common_mistakes": "COMMON_MISTAKES_TO_AVOID"
  }
}

IMPORTANT GUIDELINES:
- Tailor the explanation to the specified difficulty level
- For beginner level, focus on basic grammar and vocabulary with simple explanations
- For intermediate level, provide more nuanced explanations and cultural context
- For advanced level, include detailed linguistic analysis and subtle usage distinctions
- Include practical examples that reinforce the learning points
- Highlight any cultural nuances or context-specific usage
- Provide helpful pronunciation tips, especially for sounds that might be difficult for English speakers
- Mention common mistakes that English speakers make with this phrase or grammar pattern
```

### Implementation Considerations for Phrase Details

1. **Study Progress Tracking** (NOTYET):
   - Track which phrases the user has studied
   - Record study frequency and last review date for spaced repetition
   - Categorize phrases by grammar point, vocabulary, or theme for organized learning

2. **Difficulty Adaptation** (NOTYET):
   - Adjust explanation complexity based on user's selected difficulty level
   - Provide more furigana and simpler explanations for beginners
   - Include more kanji and nuanced explanations for advanced learners

3. **Caching and Performance** (NOTYET):
   - Cache phrase analyses to reduce API calls
   - Implement batch processing for frequently studied phrases
   - Consider pre-generating analyses for key phrases

4. **Error Handling** (NOTYET):
   - Provide graceful fallbacks if the LLM fails to generate a proper analysis
   - Include basic information (translation and romaji) even if detailed analysis fails
   - Log problematic phrases for manual review

## Response Format and Parsing

For both conversation generation and phrase analysis, we'll need robust parsing logic to handle the LLM responses. Here's a suggested approach:

1. **Request JSON Format**:
   - Explicitly request JSON format in the prompt
   - Use temperature settings appropriate for structured output (lower temperature)
   - Consider using function calling or structured output features if available in the LLM API

2. **Response Parsing**:
   - Implement a JSON parser with error handling
   - Extract the relevant sections from the response
   - Validate that all required fields are present
   - Transform the parsed data into application-specific objects

3. **Error Recovery** (NOTYET):
   - Implement regex-based extraction as a fallback if JSON parsing fails
   - Define clear default values for missing fields
   - Log parsing errors for prompt improvement

## Prompt Versioning and Improvement

As we develop the game, we'll likely need to refine our prompts based on the quality of responses. To manage this process:

1. **Version Control** (NOTYET):
   - Maintain version numbers for prompts
   - Document changes between versions
   - Track performance metrics for each version

2. **A/B Testing** (NOTYET):
   - Test multiple prompt variations to identify the most effective approach
   - Measure response quality, consistency, and relevance
   - Gradually refine prompts based on testing results

3. **Feedback Loop** (NOTYET):
   - Collect examples of particularly good or problematic responses
   - Analyze patterns in successful and unsuccessful prompts
   - Incorporate specific examples or constraints based on observed issues

## API Considerations

When implementing the LLM integration, consider the following API-related factors:

1. **Rate Limiting and Costs** (NOTYET):
   - Implement rate limiting to avoid excessive API calls
   - Monitor token usage and associated costs
   - Consider batching requests where appropriate

2. **Latency Management** (NOTYET):
   - Implement asynchronous processing for LLM requests
   - Show appropriate loading indicators during generation
   - Consider pre-generating content for common scenarios

3. **API Fallbacks** (NOTYET):
   - Design the system to work with multiple LLM providers
   - Implement provider-specific prompt adaptations if necessary
   - Create a provider-agnostic abstraction layer for LLM interactions

4. **Security and Privacy** (NOTYET):
   - Avoid sending sensitive user data to the LLM
   - Implement content filtering for generated responses
   - Consider local LLM options for privacy-sensitive deployments

