# Using the OpenAI Node.js Library with Alternative LLM Providers

This guide explains how to create a simple, flexible LLM client in Node.js that can easily switch between OpenAI's services and alternative providers (local or cloud-based) that implement the OpenAI-compatible API.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
- [Creating a Flexible LLM Client](#creating-a-flexible-llm-client)
- [Environment Configuration](#environment-configuration)
- [Usage Examples](#usage-examples)
- [Common Alternative Providers](#common-alternative-providers)
- [Troubleshooting](#troubleshooting)
- [Conclusion](#conclusion)

## Overview

Many LLM providers and local deployments have adopted OpenAI's API specification as a standard interface. This compatibility allows developers to use the official OpenAI Node.js library while pointing it to different endpoints.

The approach outlined in this guide creates a truly minimal configuration that lets you switch between providers by simply changing your API endpoint in the `.env` file. This is particularly useful for:

- Development environments (using local models)
- Production environments (using OpenAI or other cloud providers)
- Testing different model providers without code changes
- Reducing costs by using local models for development

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Basic understanding of async/await and ES modules
- For local models: a running LLM server (e.g., Ollama, LM Studio, etc.)

## Project Setup

1. Create a new project directory or use an existing one:

```bash
mkdir flexible-llm-client
cd flexible-llm-client
npm init -y
```

2. Install the required dependencies:

```bash
npm install openai dotenv
```

3. Create the basic project structure:

```
flexible-llm-client/
├── .env
├── .env.example
├── src/
│   ├── config.js
│   ├── llmClient.js
│   └── index.js
├── package.json
└── README.md
```

## Creating a Flexible LLM Client

First, let's create our configuration file that will load the environment variables:

### `src/config.js`

```javascript
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Default configuration values
const config = {
  // API configuration with OpenAI defaults
  LLM_API_KEY: process.env.LLM_API_KEY || '',
  LLM_BASE_URL: process.env.LLM_BASE_URL || 'https://api.openai.com/v1',
  LLM_DEFAULT_MODEL: process.env.LLM_DEFAULT_MODEL || 'gpt-3.5-turbo',
  
  // Timeout settings
  REQUEST_TIMEOUT_MS: process.env.REQUEST_TIMEOUT_MS || 30000,
};

// Validate required configuration
function validateConfig() {
  // For the default OpenAI endpoint, we need an API key
  if (config.LLM_BASE_URL === 'https://api.openai.com/v1' && !config.LLM_API_KEY) {
    throw new Error('LLM_API_KEY is required when using the OpenAI API');
  }
}

// Call validation (comment this out if you want to defer validation)
validateConfig();

export default config;
```

Now, let's create our flexible LLM client:

### `src/llmClient.js`

```javascript
import { OpenAI } from 'openai';
import config from './config.js';

class LLMClient {
  constructor() {
    this.client = this._initializeClient();
    this.defaultModel = config.LLM_DEFAULT_MODEL;
  }
  
  _initializeClient() {
    // Create a client with the configured settings
    return new OpenAI({
      apiKey: config.LLM_API_KEY,
      baseURL: config.LLM_BASE_URL,
      timeout: parseInt(config.REQUEST_TIMEOUT_MS),
      maxRetries: 3,
    });
  }
  
  /**
   * Generate a completion from the LLM
   * @param {Object} options - Configuration options for the completion
   * @param {string} [options.model] - The model to use (falls back to default if not provided)
   * @param {Array} options.messages - The messages to generate a completion for
   * @param {number} [options.temperature=0.7] - The sampling temperature
   * @param {number} [options.maxTokens] - The maximum number of tokens to generate
   * @returns {Promise<Object>} - The completion response
   */
  async createChatCompletion(options) {
    const model = options.model || this.defaultModel;
    
    try {
      const completion = await this.client.chat.completions.create({
        model,
        messages: options.messages,
        temperature: options.temperature ?? 0.7,
        max_tokens: options.maxTokens,
        // Pass through any additional options
        ...options,
      });
      
      return completion;
    } catch (error) {
      // Add model info to the error
      error.model = model;
      throw error;
    }
  }
  
  /**
   * Generate an embedding for the given text
   * @param {Object} options - Configuration options for the embedding
   * @param {string} [options.model] - The model to use for embeddings
   * @param {string|Array<string>} options.input - The text to embed
   * @returns {Promise<Object>} - The embedding response
   */
  async createEmbedding(options) {
    // Default embedding model - use provided or fall back to Ada
    const embeddingModel = options.model || 'text-embedding-ada-002';
    
    try {
      const embedding = await this.client.embeddings.create({
        model: embeddingModel,
        input: options.input,
        // Pass through any additional options
        ...options,
      });
      
      return embedding;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Get information about available models
   * Note: Not all providers implement this endpoint
   * @returns {Promise<Object>} - The models response
   */
  async listModels() {
    try {
      const models = await this.client.models.list();
      return models;
    } catch (error) {
      // Some providers don't implement the models endpoint
      if (error.status === 404) {
        return { data: [], note: "This provider does not implement the models list endpoint" };
      }
      throw error;
    }
  }
  
  /**
   * Helper method to extract just the text from a chat completion
   * @param {Object} options - Same options as createChatCompletion
   * @returns {Promise<string>} - Just the response text
   */
  async generateText(options) {
    const completion = await this.createChatCompletion(options);
    return completion.choices[0].message.content;
  }
}

// Export a singleton instance
export default new LLMClient();
```

## Environment Configuration

Let's create our simplified environment configuration files:

### `.env.example`

```
# LLM Configuration
# -- Default OpenAI settings
LLM_API_KEY=sk-your-openai-key
LLM_BASE_URL=https://api.openai.com/v1
LLM_DEFAULT_MODEL=gpt-3.5-turbo

# General settings
REQUEST_TIMEOUT_MS=30000
```

Create a `.env` file with your actual configuration:

### `.env`

```
# For OpenAI
LLM_API_KEY=sk-your-openai-key
LLM_DEFAULT_MODEL=gpt-3.5-turbo

# For a local LLM, use something like:
# LLM_BASE_URL=http://localhost:1234/v1
# LLM_DEFAULT_MODEL=llama2
```

## Usage Examples

Let's create a simple example that demonstrates how to use our client:

### `src/index.js`

```javascript
import llmClient from './llmClient.js';
import config from './config.js';

async function main() {
  try {
    console.log(`Using LLM endpoint: ${config.LLM_BASE_URL}`);
    console.log(`Default model: ${llmClient.defaultModel}`);
    
    // Simple chat completion example
    const completion = await llmClient.createChatCompletion({
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'What is the capital of France?' }
      ],
      temperature: 0.7,
    });
    
    console.log('Response:');
    console.log(completion.choices[0].message.content);
    
    // Using the convenience method
    const answer = await llmClient.generateText({
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Summarize the benefits of clean code in one sentence.' }
      ],
    });
    
    console.log('\nSummary:');
    console.log(answer);
    
    // Try to list available models (may not work with all providers)
    try {
      const models = await llmClient.listModels();
      console.log('\nAvailable models:');
      console.log(models.data.slice(0, 5).map(m => m.id).join(', ') + '...');
    } catch (error) {
      console.log('\nCould not list models:', error.message);
    }
    
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
```

To run the example:

```bash
node src/index.js
```

## Common Alternative Providers

Here are some common alternative LLM providers and how to configure them by simply updating your `.env` file:

### 1. Ollama (Local)

```
LLM_BASE_URL=http://localhost:11434/api
LLM_DEFAULT_MODEL=llama2
```

### 2. LM Studio (Local)

```
LLM_BASE_URL=http://localhost:1234/v1
LLM_DEFAULT_MODEL=openhermes
```

### 3. Self-hosted Llama.cpp Server

```
LLM_BASE_URL=http://localhost:8080/v1
LLM_DEFAULT_MODEL=llama-2-7b-chat
```

### 4. Together.ai (Cloud Alternative)

```
LLM_BASE_URL=https://api.together.xyz/v1
LLM_API_KEY=your-together-ai-key
LLM_DEFAULT_MODEL=togethercomputer/llama-2-70b-chat
```

### 5. Anthropic (Claude via proxy)

Anthropic's Claude API doesn't natively implement the OpenAI API spec, so you would need a proxy server that translates between the APIs.

## Troubleshooting

### Common Issues and Solutions

1. **Error: connect ECONNREFUSED**
   - Check if your local LLM server is running
   - Verify the port in `LLM_BASE_URL` is correct

2. **Error: Authentication failed**
   - For OpenAI: Verify your API key is correct
   - For local providers: Some require no API key - try setting it to an empty string or removing it

3. **Error: Model not found**
   - Verify the model name is correct for your provider
   - Some providers use different model naming conventions

4. **Streaming not working**
   - Not all providers support streaming responses
   - Check provider documentation for compatibility

### Provider-Specific Notes

1. **OpenAI**
   - Rate limits apply based on your subscription
   - Some models are only available to specific subscription tiers

2. **Ollama**
   - May require model to be downloaded first via `ollama pull modelname`

3. **Local Servers**
   - Performance depends on your hardware
   - Large models require more RAM and GPU memory

## Advanced Usage

### Implementing Streaming for Chat Completions

```javascript
async streamChatCompletion(options) {
  const model = options.model || this.defaultModel;
  
  try {
    const stream = await this.client.chat.completions.create({
      model,
      messages: options.messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens,
      stream: true,
      ...options,
    });
    
    return stream;
  } catch (error) {
    error.model = model;
    throw error;
  }
}
```

Using the stream:

```javascript
const stream = await llmClient.streamChatCompletion({
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Write a short story about a robot.' }
  ]
});

// Process the stream
for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content || '');
}
```

## Conclusion

This streamlined approach allows you to easily switch between OpenAI and alternative LLM providers by simply updating a single environment variable: `LLM_BASE_URL`. 

The beauty of this design is its simplicity:
- No provider detection or classification
- No provider-specific configuration blocks
- No conditional logic
- Just point to a different endpoint and go

The OpenAI client library doesn't need to know or care whether it's talking to OpenAI's servers, a local model, or a third-party provider. As long as the endpoint implements the OpenAI-compatible API, everything just works.

Remember that while many providers implement the OpenAI-compatible API, there might be slight differences in available models, parameters, and other capabilities. Always refer to your specific provider's documentation for details.

Happy coding!