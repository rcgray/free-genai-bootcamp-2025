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

### 5. Security Considerations

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
- [ ] Test the server functionality using a tool like Postman with standard OpenAI-compatible requests

### Phase 2: Client-Side Modifications
- [x] Update `LLMService.ts` to use the generic proxy server instead of direct API calls
- [x] Keep all application-specific logic (prompts, response processing) in our application
- [x] Add fallback behavior in case the proxy server is unavailable
- [x] Update environment variable handling to include proxy URL
- [x] Ensure all error handling is appropriate for the new architecture
- [ ] Verify validation logic still works with the proxy responses

### Phase 3: Integration Testing
- [ ] Start the proxy server
- [ ] Run the Phaser game 
- [ ] Test the Study Scene feature that uses LLM to analyze phrases
- [ ] Verify that all functionality works as expected
- [ ] Test error scenarios (proxy down, LLM API errors, etc.)

### Phase 4: Documentation and Deployment
- [x] Update project documentation to reflect the new architecture
- [x] Create a README for the proxy server with setup instructions
- [x] Add scripts for starting both the server and client
- [ ] Document deployment options for production use

## Technical Considerations

### API Design

The proxy server should be completely generic and mirror the OpenAI API structure:

1. **Endpoints**:
   - `/api/completions` - Generic endpoint for LLM completions

2. **Request Format**:
   - Should be identical to the OpenAI chat completions API format
   ```json
   {
     "model": "gpt-4",  // Optional - will use server default if not specified
     "messages": [{"role": "user", "content": "Your complete prompt here"}],
     "temperature": 0.3,
     "response_format": {"type": "json_object"}
   }
   ```

3. **Response Format**:
   - Returns the raw, unmodified OpenAI API response
   - All response processing is done client-side

### Error Handling

The proxy should handle basic errors only:

1. **Client Errors (4xx)**:
   - Invalid request format
   - Authentication issues from the LLM provider

2. **Server Errors (5xx)**:
   - LLM API connectivity issues
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

### Integration Tests
1. Test end-to-end flow from Phaser game to proxy to LLM and back
2. Test fallback behaviors
3. Test performance with and without caching

### Manual Testing
1. Verify Study Scene functionality
2. Validate error messages are user-friendly
3. Check performance under various network conditions

## Deployment Considerations

For local development:
- The proxy server can run locally on a different port than the Streamlit app
- Environment variables can be loaded from a local .env file

For production:
- Consider containerization with Docker
- Use proper environment variable management
- Consider hosting options (Heroku, Render, AWS, etc.)
- Implement rate limiting and additional security measures

## Conclusion

Implementing the generic LLM Proxy Server will significantly enhance the security of our application by protecting our API keys while maintaining all current functionality. The design is deliberately minimal and application-agnostic, allowing it to be reused across multiple projects.

By keeping all application-specific logic in our client code and using the proxy purely as a security layer, we create a clean separation of concerns that follows industry best practices for LLM integration. This approach also gives us flexibility to easily add other LLM-powered features to our application in the future without modifying the proxy server. 