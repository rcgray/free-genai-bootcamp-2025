# LLM Integration Usage Guide

This document provides instructions for testing and using the LLM integration feature in the Japanese Language Learning Visual Novel game.

## Setup

1. **Configure environment variables**:
   - Ensure you have a `.env` file in the project root directory (copy from `.env.example` if needed)
   - Add your OpenAI API key to `LLM_API_KEY`
   - Optionally modify `LLM_API_BASE_URL` and `LLM_MODEL` if using a different provider

   ```
   # For OpenAI
   LLM_API_KEY=your_api_key_here
   LLM_API_BASE_URL=https://api.openai.com/v1
   LLM_MODEL=gpt-4
   
   # For local models (e.g., using LM Studio or Ollama)
   # LLM_API_KEY=not-needed
   # LLM_API_BASE_URL=http://localhost:8000/v1
   # LLM_MODEL=llama-3-8b
   ```

2. **Rebuild the game**:
   - Run `npm --prefix phaser_game run build` to rebuild with new environment variables

## Testing

The LLM integration can be tested using the Test Scene:

1. Start the game in development mode: `npm --prefix phaser_game run dev`
2. Navigate to the Test Scene
3. Scroll down to the "LLM Study Scene Integration Tests" section
4. Use the provided test buttons:
   - **Test with Local Data**: Tests the Study Scene UI with pre-configured test data
   - **Test with LLM**: Tests the full LLM integration with a real API call
   - **Test Error Handling**: Tests the error handling and fallback UI

## Usage in VN Scene

The LLM integration is automatically used when a player clicks the "Study" button in the VN Scene. The system will:

1. Capture the current phrase, romaji, and translation
2. Launch the Study Scene
3. Send the phrase to the LLM for analysis
4. Display a loading indicator while waiting for the response
5. Populate the Study Scene with detailed information once received

If the LLM request fails:
- An error message will be displayed
- Basic information about the phrase will still be shown
- A "Try Again" button will appear to retry the analysis

## Implementation Details

The integration is implemented with:

- `LLMService`: A singleton service in `src/utils/LLMService.ts` that handles LLM communication
- `StudyScene`: Updated to use the LLMService for dynamic phrase analysis
- `vite.config.ts`: Configured to inject environment variables at build time

For technical details on how to use the LLMService in other parts of the code, refer to the `src/utils/README.md` file.

## Troubleshooting

If you encounter issues:

1. **API Key Problems**: 
   - Verify your API key is correct in the root `.env` file
   - Ensure you have sufficient credits/quota with your provider

2. **Network Issues**:
   - Check browser console for network errors
   - Verify your internet connection
   - If using a local model, ensure it's running and accessible

3. **Response Format Issues**:
   - The LLMService validates responses against a strict schema
   - If using a different model than GPT-4, you may need to adjust the prompt template 