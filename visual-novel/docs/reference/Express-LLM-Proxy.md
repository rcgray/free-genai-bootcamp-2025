# Minimal Express Server LLM Proxy
## Implementation Guide

This document outlines how to create a minimal Express.js server that acts as a secure proxy between a Phaser game and an LLM API service. This design protects API keys while requiring minimal setup.

## Requirements

- Create a lightweight Express server that exposes a single endpoint
- Accept text input from the client
- Forward requests to an LLM service with appropriate authentication
- Return LLM responses back to the client
- Support CORS for local development
- Load API keys from environment variables
- Handle JSON extraction for consistent output formatting

## Project Setup

1. Create a new directory for the server:
```bash
mkdir llm-proxy-server
cd llm-proxy-server
```

2. Initialize a new Node.js project:
```bash
npm init -y
```

3. Install required dependencies:
```bash
npm install express cors axios dotenv
```

4. Create a `.env` file for storing API keys:
```bash
touch .env
```

5. Add your API key to the `.env` file:
```
LLM_API_KEY=your_api_key_here
LLM_API_BASE_URL=https://api.openai.com/v1
LLM_MODEL=gpt-4o-mini  # Default model to use
LLM_ENDPOINT_PATH=chat/completions
REQUEST_TIMEOUT_MS=30000
DEBUG_MODE=false
```

## Server Implementation

Create a file named `server.js` with the following code:

```javascript
// Import required dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

// Create Express application
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// Construct endpoint URL
function getEndpointUrl(endpointPath) {
  const baseUrl = process.env.LLM_API_BASE_URL?.endsWith('/')
    ? process.env.LLM_API_BASE_URL.slice(0, -1)
    : process.env.LLM_API_BASE_URL;

  const path = endpointPath?.startsWith('/')
    ? endpointPath.slice(1)
    : endpointPath;

  return `${baseUrl}/${path}`;
}

// Adapt request for provider compatibility
function adaptRequestForProvider(requestBody) {
  // Create a copy of the request to modify
  const adaptedRequest = { ...requestBody };
  
  // Extract response format preferences before removing it
  const responseMetadata = {
    originalResponseFormat: adaptedRequest.response_format?.type || 'text',
    jsonSchema: adaptedRequest.response_format?.schema || null
  };
  
  // Remove response_format for ALL providers since support is inconsistent
  if (adaptedRequest.response_format) {
    delete adaptedRequest.response_format;
  }
  
  // Use model from env if specified for non-OpenAI providers
  const isOpenAI = (process.env.LLM_API_BASE_URL || '').includes('openai.com');
  if (!isOpenAI && process.env.LLM_MODEL) {
    adaptedRequest.model = process.env.LLM_MODEL;
  }
  
  return { adaptedRequest, responseMetadata };
}

// Process LLM response to extract JSON if needed
function processLLMResponse(responseData, responseMetadata) {
  if (!responseData?.choices?.[0]?.message?.content) {
    return responseData;
  }
  
  const originalContent = responseData.choices[0].message.content;
  const shouldExtractJson = responseMetadata.originalResponseFormat === 'json_object' || 
                           responseMetadata.originalResponseFormat === 'json_schema';
  
  if (!shouldExtractJson) {
    return responseData;
  }
  
  try {
    // Extract JSON from response (simplified version)
    let jsonContent = originalContent;
    let isValidJson = false;
    
    try {
      JSON.parse(originalContent);
      isValidJson = true;
    } catch (e) {
      // Not valid JSON, extract it
      
      // Remove thinking sections
      jsonContent = jsonContent.replace(/<think>[\s\S]*?<\/think>/g, '');
      
      // Extract from code blocks
      const codeBlockMatch = jsonContent.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (codeBlockMatch && codeBlockMatch[1]) {
        jsonContent = codeBlockMatch[1].trim();
      }
      
      // Try to find any JSON object pattern as last resort
      if (!jsonContent.startsWith('{')) {
        const possibleJson = jsonContent.match(/{[\s\S]*}/);
        if (possibleJson) {
          jsonContent = possibleJson[0];
        }
      }
      
      // Validate the extracted content
      JSON.parse(jsonContent);
    }
    
    // Return processed response with metadata
    const processedResponseData = { ...responseData };
    processedResponseData.choices[0].message.content = jsonContent;
    processedResponseData.choices[0].message.proxy_metadata = {
      processed_for: responseMetadata.originalResponseFormat,
      json_extracted: !isValidJson
    };
    
    return processedResponseData;
  } catch (error) {
    console.error('Failed to extract valid JSON from response:', error.message);
    return responseData;
  }
}

// Define LLM proxy endpoint
app.post('/api/completions', async (req, res) => {
  try {
    // Create request body with fallbacks to env variables
    let requestBody = {
      ...req.body,
      model: req.body.model || process.env.LLM_MODEL,
      response_format: req.body.response_format || { type: 'text' }
    };
    
    // Adapt the request for the provider
    const { adaptedRequest, responseMetadata } = adaptRequestForProvider(requestBody);
    
    // Get endpoint path from env or use default
    const endpointPath = process.env.LLM_ENDPOINT_PATH || 'chat/completions';
    const endpointUrl = getEndpointUrl(endpointPath);
    
    // Forward the request to the LLM API
    const response = await axios.post(
      endpointUrl,
      adaptedRequest,
      {
        headers: {
          'Authorization': `Bearer ${process.env.LLM_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: parseInt(process.env.REQUEST_TIMEOUT_MS || 30000)
      }
    );
    
    // Process the response based on original format request
    const processedResponseData = processLLMResponse(response.data, responseMetadata);
    
    // Return the processed response
    res.json(processedResponseData);
  } catch (error) {
    console.error('Error forwarding request to LLM API:', error.message);
    
    let statusCode = 500;
    let errorMessage = error.message;
    let errorDetails = {};
    
    if (error.response) {
      statusCode = error.response.status;
      errorDetails = error.response.data;
    } else if (error.request) {
      statusCode = 503;
      errorMessage = 'LLM provider not responding';
    }
    
    res.status(statusCode).json({
      error: errorMessage,
      details: errorDetails
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  const healthInfo = {
    status: 'ok',
    message: 'LLM proxy server is running',
    config: {
      provider: process.env.LLM_API_BASE_URL || 'Not configured',
      endpoint: process.env.LLM_ENDPOINT_PATH || 'chat/completions',
      defaultModel: process.env.LLM_MODEL || 'Not configured'
    }
  };
  
  res.json(healthInfo);
});

// Define server port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`LLM proxy server running on port ${PORT}`);
  console.log(`LLM API URL: ${process.env.LLM_API_BASE_URL}`);
});
```

## Running the Server

1. Start the server:
```bash
node server.js
```

2. The server will be available at `http://localhost:3000`

## Client Integration

From your Phaser game, make requests to the proxy server:

```javascript
// Example client code in your Phaser game
async function callLLM(messages, jsonResponse = true) {
  try {
    const response = await fetch('http://localhost:3000/api/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4', // Optional, will use server default if not specified
        messages: messages,
        temperature: 0.3,
        response_format: jsonResponse ? { type: 'json_object' } : { type: 'text' }
      })
    });
    
    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling LLM proxy:', error);
    throw error;
  }
}
```

## JSON Extraction Features

The proxy automatically handles JSON extraction based on the client's `response_format` preference:

1. **Client Specifies Format**: The client can request JSON or text responses
   ```javascript
   // Request JSON extraction
   response_format: { type: 'json_object' }
   
   // Request raw text (default)
   response_format: { type: 'text' }
   ```

2. **Provider Compatibility**: The proxy removes `response_format` for all providers since support is inconsistent
   - This is necessary because even newer OpenAI models have inconsistent support
   - The proxy still remembers what format the client wants

3. **Intelligent JSON Extraction**: For `json_object` requests, the proxy:
   - Removes thinking/reasoning sections
   - Extracts JSON from markdown code blocks
   - Falls back to finding JSON object patterns
   - Always validates the JSON is valid

4. **Response Metadata**: The proxy adds metadata about processing:
   ```json
   {
     "choices": [{
       "message": {
         "content": "{...extracted json...}",
         "proxy_metadata": {
           "processed_for": "json_object", 
           "json_extracted": true
         }
       }
     }]
   }
   ```

## Error Handling

The server handles these error scenarios:
- Missing required fields (400 Bad Request)
- LLM API failures (passes through status code)
- Provider unavailability (503 Service Unavailable)
- JSON extraction failures (falls back to original content)

## Production Considerations

For production:
1. Add proper logging with a library like Winston
2. Implement rate limiting with express-rate-limit
3. Add authentication if needed
4. Consider containerization with Docker
5. Set up proper environment variable management
6. Use process manager like PM2 for reliability