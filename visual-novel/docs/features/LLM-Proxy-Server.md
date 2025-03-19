# LLM Proxy Server

## Overview

The LLM Proxy Server is a critical security enhancement for our Japanese Language Learning Visual Novel. Currently, our game directly calls LLM APIs from the client-side Phaser code, which exposes our API keys and creates security vulnerabilities. This feature will implement a generic server-side proxy that will securely handle all LLM interactions, keeping API keys and sensitive data secure while maintaining all current functionality.

The proxy will be designed to be completely application-agnostic, serving as a simple secure relay between our client and LLM providers, with no application-specific logic. This approach ensures the proxy can be reused across different projects without modification.

## Goals

1. **Enhance Security**: Protect our LLM API keys by moving them from client-side code to a secure server
2. **Maintain Functionality**: Ensure all current LLM features continue to work seamlessly
3. **Minimize Client Changes**: Design the proxy to require minimal changes to existing client code
4. **Follow Best Practices**: Implement proper error handling, logging, and request validation
5. **Enable Flexibility**: Support different LLM providers through configuration rather than code changes
6. **Performance Optimization**: Consider caching options to reduce API calls and latency
7. **Application Agnostic**: Create a generic proxy that contains no application-specific logic
8. **Reusability**: Design for use across multiple projects without modification
9. **Provider Compatibility**: Ensure compatibility with various LLM providers including local models

## Technical Design

### 1. Architecture Overview

We will create a lightweight Express server that acts as a generic secure proxy between any client application and LLM API services. This follows the best practice architecture for LLM integration:

```
┌─────────────┐      ┌────────────────┐      ┌─────────────┐
│ Client App  │─────►│ Generic LLM    │─────►│  LLM API    │
│ (Phaser)    │◄─────│  Proxy Server  │◄─────│ (OpenAI)    │
└─────────────┘      └────────────────┘      └─────────────┘
```

The Express server will:
1. Expose a generic endpoint that any client can call
2. Store LLM API keys securely in environment variables
3. Forward requests to the appropriate LLM provider without modification
4. Return raw LLM responses to the client
5. Handle errors appropriately

### 2. Express Proxy Server

We will create a minimal Express server with the following components:

```javascript
// server.js structure
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Generic LLM completion endpoint - completely model agnostic
app.post('/api/completions', async (req, res) => {
  try {
    // Create request body - use model from request or fall back to env variable
    const requestBody = {
      ...req.body,
      // If model isn't specified in the request, use the default from .env
      model: req.body.model || process.env.LLM_MODEL
    };
    
    // Forward the request body to the LLM API
    const response = await axios.post(
      `${process.env.LLM_API_BASE_URL}/chat/completions`,
      requestBody,
      {
        headers: {
          'Authorization': `Bearer ${process.env.LLM_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    // Return the raw response from the LLM API
    res.json(response.data);
  } catch (error) {
    console.error('Error forwarding request to LLM API:', error);
    res.status(error.response?.status || 500).json({
      error: error.message,
      details: error.response?.data
    });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`LLM proxy server running on port ${PORT}`));
```

### 3. Client-Side Integration

We will modify our existing `LLMService.ts` to use the generic proxy server instead of making direct API calls, while keeping all application-specific logic (prompt creation, response processing, etc.) in our app:

```typescript
// Modified LLMService.ts structure
export class LLMService {
  private static instance: LLMService;
  private proxyUrl: string;
  
  private constructor() {
    this.proxyUrl = this.getEnvVar('LLM_PROXY_URL', 'http://localhost:3000/api');
  }
  
  // Application-specific method that remains unchanged
  private createPhraseAnalysisPrompt(request: PhraseAnalysisRequest): string {
    // Existing prompt creation logic remains here
    // This keeps all application-specific logic in our app
    // ...
  }
  
  // Modified to use generic proxy instead of direct API call
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
      
      // 3. Send to generic proxy endpoint
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
      
      // 4. Process the raw response - application logic stays in our app
      const data = await response.json();
      const content = data.choices[0]?.message.content;
      
      if (!content) {
        throw new Error('Empty response from LLM');
      }
      
      // 5. Process and validate the response - application logic stays in our app
      return this.validateAndProcessLLMResponse(content);
    } catch (error) {
      console.error('[LLM_SERVICE] Error analyzing phrase:', error);
      throw error;
    }
  }
  
  // Other application-specific methods remain unchanged
}
```

### 4. Environment Configuration

The proxy server will use environment variables for configuration:

```
# .env for proxy server
PORT=3000
LLM_API_KEY=your_api_key_here
LLM_API_BASE_URL=https://api.openai.com/v1
LLM_MODEL=gpt-4  # Default model to use if not specified in request
LLM_ENDPOINT_PATH=chat/completions  # Configurable endpoint path
REQUEST_TIMEOUT_MS=30000  # Request timeout in milliseconds
DEBUG_MODE=true  # Enable detailed logging for debugging
```

The client will need a single variable pointing to the proxy:

```
# Client-side environment variable
LLM_PROXY_URL=http://localhost:3000/api
LLM_MODEL=gpt-4  # Can be overridden by server's default
```

This configuration provides flexibility:
- Server admin can set a default model in the server's .env file
- Client can optionally specify a different model in the request
- If client doesn't specify a model, server uses its default
- Different LLM providers can be configured with appropriate endpoint paths
- Request timeout can be adjusted for slower LLM providers

### 5. Provider Compatibility

One of the key insights from implementation is the need for enhanced provider compatibility. The proxy should handle differences between various LLM providers:

- **OpenAI**: Uses standard OpenAI-compatible format
- **Local Models** (Ollama, LM Studio): May have different expectations for `response_format`
- **Anthropic**: Uses different API structure and parameters

Our proxy will detect the provider based on the base URL and adapt requests accordingly. Some specific adaptations include:

- Removing `response_format` for non-OpenAI providers that don't support it
- Ensuring the model name is appropriate for the provider
- Constructing the correct endpoint URL based on the provider

### 6. Response Processing and JSON Extraction

During implementation, we discovered that different LLM providers format their responses in various ways, especially when generating JSON. To maintain compatibility and ensure client code receives valid JSON, we have implemented response processing features.

Our solution leverages the standard OpenAI `response_format` field that's already part of the client request. This approach provides a clean, standards-compliant way to handle JSON extraction without introducing custom parameters:

1. When clients request `"response_format": {"type": "json_object"}`, the proxy automatically extracts valid JSON from the response, even if embedded in markdown code blocks or mixed with reasoning/thinking
2. When clients request `"response_format": {"type": "text"}` (or don't specify a format), the proxy returns the raw text without processing
3. For `"response_format": {"type": "json_schema", "schema": {...}}`, the proxy extracts JSON and performs basic schema validation (with a note that full schema validation will be implemented in a future update)

This approach has several advantages:
- No new parameters or headers needed - clients already use `response_format` for OpenAI
- Clear separation of concerns - client specifies the desired format, proxy ensures it's delivered
- Provider-agnostic - handles differences between OpenAI and other LLMs transparently

For non-OpenAI providers that don't support the `response_format` parameter, the proxy:
1. Captures the client's format preference before forwarding the request
2. Removes the parameter when sending to providers that don't support it
3. Processes the response according to the client's original preference

This ensures consistent behavior regardless of the LLM provider's capabilities.

#### 6.1 Implementation of Response Processing

The JSON extraction logic implements several strategies to handle various response formats:

1. **Thinking Tags Removal**: Removes any content between `<think>` and `</think>` tags, which some models use for reasoning
2. **Markdown Code Block Extraction**: Identifies and extracts JSON inside markdown code blocks (```json ... ```)
3. **Object Pattern Recognition**: As a fallback, looks for content matching a JSON object pattern ({...})
4. **Validation**: Always validates that extracted content is valid JSON before returning

The response includes metadata about processing performed:

```json
{
  "choices": [{
    "message": {
      "content": "{...extracted json...}",
      "proxy_metadata": {
        "processed_for": "json_object",
        "json_extracted": true,
        "schema_validation": null
      }
    }
  }]
}
```

For schema validation, the current implementation provides basic object validation with a warning that full JSON Schema validation will be implemented in a future update.

#### 6.2 Future Enhancements

For future development, we've identified several opportunities to enhance response processing:

1. **Full Schema Validation**: Implement complete JSON Schema validation for `json_schema` format type
2. **Content Type Negotiation**: Support HTTP content negotiation through `Accept` headers
3. **Transformation Plugins**: Support pluggable response transformers for more advanced use cases
4. **Caching**: Add caching of processed responses to improve performance for repeated requests
5. **Custom Error Messages**: Enhanced error reporting for schema validation failures

The current implementation focuses on the most essential use case - extracting JSON from responses - while providing a foundation for these future enhancements.

### 7. Security Considerations

- The proxy server should validate basic request format but not be concerned with application logic
- CORS should be configured appropriately for production
- Rate limiting should be considered for production use
- Error handling should not expose sensitive information
- Consider authentication for the proxy if used across multiple applications

## Feature Implementation Plan (FIP)

### Phase 1: Generic Express Proxy Server Setup
- [x] Create a new directory for the proxy server (`server`)
- [x] Initialize a new Node.js project with `npm init` 
- [x] Install required dependencies (express, cors, axios, dotenv)
- [x] Create basic server structure with a generic completions endpoint
- [x] Add error handling and basic request validation
- [x] Create a `.env.example` file with required variables
- [x] Test the server functionality using a tool like Postman with standard OpenAI-compatible requests

### Phase 2: Client-Side Modifications
- [x] Update `LLMService.ts` to use the generic proxy server instead of direct API calls
- [x] Keep all application-specific logic (prompts, response processing) in our application
- [x] Add fallback behavior in case the proxy server is unavailable
- [x] Update environment variable handling to include proxy URL
- [x] Ensure all error handling is appropriate for the new architecture
- [x] Verify validation logic still works with the proxy responses

### Phase 3: Provider Compatibility
- [x] Add provider-agnostic request adaptation
- [x] Implement response processing for JSON extraction
- [x] Add configurable endpoint paths for different providers
- [x] Add request timeout configuration
- [x] Improve error handling with better categorization
- [x] Add DEBUG_MODE for detailed logging
- [x] Implement intelligent response handling based on request's `response_format` field
- [x] Add metadata about response processing in the response payload

### Phase 4: Integration Testing
- [x] Start the proxy server
- [x] Run the Phaser game 
- [x] Test the Study Scene feature that uses LLM to analyze phrases
- [x] Verify that all functionality works as expected
- [x] Test error scenarios (proxy down, LLM API errors, etc.)
- [x] Test with different LLM providers (OpenAI, local models)

### Phase 5: Documentation and Deployment
- [x] Update project documentation to reflect the new architecture
- [x] Create a README for the proxy server with setup instructions
- [x] Add scripts for starting both the server and client
- [x] Document deployment options for production use
- [x] Add examples for different LLM provider configurations

## Technical Considerations

### API Design

The proxy server should be completely generic and mirror the OpenAI API structure:

1. **Endpoints**:
   - `/api/completions` - Generic endpoint for LLM completions
   - `/api/health` - Health check endpoint that reports server status and configuration

2. **Request Format**:
   - Should be identical to the OpenAI chat completions API format
   ```json
   {
     "model": "gpt-4",  // Optional - will use server default if not specified
     "messages": [{"role": "user", "content": "Your complete prompt here"}],
     "temperature": 0.3,
     "response_format": {"type": "json_object"}  // Controls how responses are processed
   }
   ```

   Supported `response_format` values:
   - `{"type": "text"}` - (Default) Returns raw response without processing
   - `{"type": "json_object"}` - Ensures valid JSON is extracted from the response
   - `{"type": "json_schema", "schema": {...}}` - Extracts JSON and performs basic schema validation

3. **Response Format**:
   - Returns the processed LLM API response with valid JSON extraction if needed
   - Adds metadata about response processing in the `proxy_metadata` field:
   ```json
   {
     "choices": [{
       "message": {
         "content": "...",
         "proxy_metadata": {
           "processed_for": "json_object",
           "json_extracted": true,
           "schema_validation": null
         }
       }
     }]
   }
   ```

### Error Handling

The proxy should handle errors with appropriate categorization:

1. **Client Errors (4xx)**:
   - Invalid request format
   - Authentication issues from the LLM provider
   - Validation errors from the LLM provider

2. **Server Errors (5xx)**:
   - LLM API connectivity issues
   - Timeout errors
   - Unexpected errors

### Caching Considerations

For performance optimization, we might consider:

1. **Optional Response Caching**:
   - Cache responses using request hash as key
   - Set appropriate TTL (time to live)
   - Keep this as an optional feature

2. **Implementation Options**:
   - In-memory cache for development
   - Redis for production (if needed)

## Testing Strategy

### Unit Tests
1. Test proxy server endpoint behavior with standard OpenAI requests
2. Test error handling scenarios
3. Test modified LLMService methods
4. Test provider compatibility adaptations
5. Test JSON extraction from various response formats

### Integration Tests
1. Test end-to-end flow from Phaser game to proxy to LLM and back
2. Test fallback behaviors
3. Test performance with and without caching
4. Test with different LLM providers

### Manual Testing
1. Verify Study Scene functionality
2. Validate error messages are user-friendly
3. Check performance under various network conditions
4. Test response processing with different LLM outputs

## Deployment Considerations

For local development:
- The proxy server can run locally on a different port than the Streamlit app
- Environment variables can be loaded from a local .env file

For production:
- Consider containerization with Docker
- Use proper environment variable management
- Consider hosting options (Heroku, Render, AWS, etc.)
- Implement rate limiting and additional security measures

## Implementation Insights

During the implementation of the LLM Proxy Server, we gained several valuable insights that shaped our approach:

1. **Provider Differences**: We discovered significant differences in how various LLM providers handle requests and responses. OpenAI, Anthropic, and local models like LM Studio have different expectations for parameters like `response_format`.

2. **JSON Extraction Challenges**: Many LLM providers, especially local models, may include non-JSON content in their responses, such as thinking tags, explanatory text, or markdown formatting. Our proxy now includes robust JSON extraction capabilities to handle these cases.

3. **Elegant Response Format Handling**: We found that leveraging the existing OpenAI `response_format` field provides an elegant solution for controlling JSON extraction behavior. This lets us maintain compatibility with the OpenAI API specification while adding value for clients using any LLM provider.

4. **Error Handling Complexity**: The range of potential errors from LLM providers is broader than initially anticipated, requiring more sophisticated error handling and categorization.

5. **Configuration Flexibility**: The need for configuration flexibility became apparent when supporting different LLM providers, leading to additional environment variables like `LLM_ENDPOINT_PATH` and `REQUEST_TIMEOUT_MS`.

6. **Debugging Importance**: Detailed logging has proven essential for troubleshooting issues with LLM integrations, leading to the addition of a `DEBUG_MODE` option.

7. **Client-side Robustness**: While the proxy can ensure valid JSON is extracted from LLM responses, client-side code should still be designed to handle imperfect responses gracefully, particularly for optional fields that might be missing or incomplete.

## Conclusion

Implementing the generic LLM Proxy Server has significantly enhanced the security of our application by protecting our API keys while maintaining all current functionality. The design is deliberately minimal and application-agnostic, allowing it to be reused across multiple projects.

By keeping all application-specific logic in our client code and using the proxy purely as a security layer, we create a clean separation of concerns that follows industry best practices for LLM integration. This approach also gives us flexibility to easily add other LLM-powered features to our application in the future without modifying the proxy server.

The addition of provider compatibility adaptations and response processing features has made the proxy more robust and versatile, capable of working with a wide range of LLM providers beyond just OpenAI. This enables our application to leverage different LLM services as needed without changing client code. 