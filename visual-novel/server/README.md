# LLM Proxy Server

A lightweight, generic proxy server for securely communicating with LLM APIs like OpenAI. This proxy protects your API keys by keeping them server-side rather than exposing them in client-side code.

## Features

- Generic, application-agnostic API endpoint
- Securely stores API keys on the server
- Compatible with OpenAI and other providers using OpenAI-compatible APIs
- **Provider-agnostic**: Switch between different LLM providers by just changing environment variables
- Simple Express server with minimal dependencies
- Configurable via environment variables
- Health check endpoint with configuration information

## Setup

1. Clone the repository (or navigate to this directory if already cloned)
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file by copying the example:
   ```
   cp .env.example .env
   ```
4. Edit the `.env` file to add your API key and other configuration options

## Configuration

Configure the proxy server using the following environment variables in your `.env` file:

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Port number for the server to listen on | 3000 |
| LLM_API_KEY | Your API key for the LLM provider | (required) |
| LLM_API_BASE_URL | Base URL for the API provider | https://api.openai.com/v1 |
| LLM_MODEL | Default LLM model to use if not specified in request | gpt-4 |
| LLM_ENDPOINT_PATH | Path to the completions endpoint (varies by provider) | chat/completions |
| REQUEST_TIMEOUT_MS | Timeout for API requests in milliseconds | 30000 |
| CORS_ORIGIN | CORS origin to allow requests from | * (all origins) |

## Provider Configuration Examples

### OpenAI

```
LLM_API_KEY=sk-your-openai-key
LLM_API_BASE_URL=https://api.openai.com/v1
LLM_ENDPOINT_PATH=chat/completions
LLM_MODEL=gpt-4
```

### Anthropic Claude (via proxy)

```
LLM_API_KEY=your-anthropic-key
LLM_API_BASE_URL=https://api.anthropic.com
LLM_ENDPOINT_PATH=v1/messages
LLM_MODEL=claude-3-opus-20240229
```

### Ollama (Local)

```
LLM_API_KEY=no-key-needed-for-ollama
LLM_API_BASE_URL=http://localhost:11434/api
LLM_ENDPOINT_PATH=chat/completions
LLM_MODEL=llama2
```

### LM Studio (Local)

```
LLM_API_KEY=no-key-needed-for-local
LLM_API_BASE_URL=http://localhost:1234/v1
LLM_ENDPOINT_PATH=chat/completions
LLM_MODEL=openhermes
```

## Running the Server

### Development Mode

For development with auto-restart on file changes:

```
npm run dev
```

### Production Mode

For production:

```
npm start
```

## Usage

Once the server is running, client applications can make requests to the proxy instead of directly to the LLM provider.

### Example Request

```javascript
// Client-side code
async function callLLM(prompt) {
  const response = await fetch('http://localhost:3000/api/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      // model is optional - will use default from server config if not provided
      model: 'gpt-3.5-turbo'
    })
  });
  
  return await response.json();
}
```

### Health Check

To check if the server is running and see configuration information:

```
GET http://localhost:3000/api/health
```

Example response:
```json
{
  "status": "ok",
  "message": "LLM proxy server is running",
  "config": {
    "provider": "https://api.openai.com/v1",
    "endpoint": "chat/completions",
    "defaultModel": "gpt-4"
  }
}
```

## Security Considerations

- For production, consider adding authentication to the proxy endpoints
- Set up CORS to only allow requests from your application domains
- Implement rate limiting for production use
- Consider containerization with Docker for easier deployment

## License

ISC 