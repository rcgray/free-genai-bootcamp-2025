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

// Define LLM proxy endpoint
app.post('/api/llm', async (req, res) => {
  try {
    // Extract text from request body
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Missing required field: text' });
    }
    
    // Call LLM API here
    // This is where you'll implement the actual LLM API call
    // Replace this with your specific LLM API integration code
    const llmResponse = await callLLM(text);
    
    // Return the LLM response to the client
    res.json({ response: llmResponse });
  } catch (error) {
    console.error('Error processing LLM request:', error);
    res.status(500).json({ 
      error: 'Failed to process request',
      message: error.message 
    });
  }
});

// LLM service function placeholder
// Replace this with your actual implementation
async function callLLM(inputText) {
  // This is a placeholder for the actual LLM API call
  // Your implementation will go here
  
  // Example implementation:
  /*
  const response = await axios.post('https://api.llm-service.com/v1/completions', {
    prompt: inputText,
    max_tokens: 100
  }, {
    headers: {
      'Authorization': `Bearer ${process.env.LLM_API_KEY}`,
      'Content-Type': 'application/json'
    }
  });
  
  return response.data.choices[0].text;
  */
  
  // For now, just return a placeholder
  console.log('LLM request received with text:', inputText);
  return "This is a placeholder response. Implement actual LLM API call here.";
}

// Define server port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`LLM proxy server running on port ${PORT}`);
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
async function askLLM(question) {
  try {
    const response = await fetch('http://localhost:3000/api/llm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: question })
    });
    
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error calling LLM proxy:', error);
    return 'Failed to get response from LLM';
  }
}
```

## Error Handling

The server handles basic error scenarios:
- Missing required fields (400 Bad Request)
- LLM API failures (500 Internal Server Error)
- Parsing errors (handled by Express middleware)

## Production Considerations

For production:
1. Add proper logging
2. Implement rate limiting
3. Add authentication if needed
4. Consider containerization with Docker
5. Set up proper environment variable management

## Advanced Features (Optional)

These can be added if needed:
- Response caching to reduce API calls
- Request validation
- More sophisticated error handling
- API key rotation