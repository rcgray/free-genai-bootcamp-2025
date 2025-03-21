# LLM Proxy Server

A lightweight, generic proxy server for securely communicating with various LLM APIs (OpenAI, Anthropic, local models, etc.) without exposing API keys in client-side code.

## Overview

This proxy server acts as a secure intermediary between client applications and Large Language Model providers. It handles API key management, request formatting, and response processing, allowing client applications to interact with LLMs without exposing sensitive credentials. The proxy supports multiple LLM providers and offers consistent response handling regardless of the backend service used.

## Features

- Secure API key handling - keys are stored server-side only
- Provider-agnostic design - works with OpenAI, Anthropic, Ollama, LM Studio, etc.
- Intelligent response format handling based on client requests
- JSON extraction for non-OpenAI models that don't follow JSON formatting standards
- Configurable timeout and endpoint paths
- Detailed error reporting
- Health check endpoint for monitoring

## Setup

1. Clone the repository
2. Navigate to the server directory
3. Install dependencies:
```bash
npm install
```
4. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```
5. Edit the `.env` file to add your API key and configure the LLM provider

## Configuration

The server can be configured via environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Port to run the server on | 3000 |
| LLM_API_KEY | API key for your LLM provider | (Required) |
| LLM_API_BASE_URL | Base URL for your LLM provider | (Required) |
| LLM_MODEL | Default model to use if not specified in request | (Required) |
| LLM_ENDPOINT_PATH | Path to the completions endpoint | chat/completions |
| REQUEST_TIMEOUT_MS | Request timeout in milliseconds | 30000 |
| DEBUG_MODE | Enable detailed logging | true |

### Provider Configuration Examples

#### OpenAI
```
LLM_API_KEY=sk-your-api-key
LLM_API_BASE_URL=https://api.openai.com/v1
LLM_MODEL=gpt-4
LLM_ENDPOINT_PATH=chat/completions
```

#### Anthropic Claude
```
LLM_API_KEY=sk-ant-your-api-key
LLM_API_BASE_URL=https://api.anthropic.com/v1
LLM_MODEL=claude-3-opus-20240229
LLM_ENDPOINT_PATH=messages
```

#### Ollama (Local)
```
LLM_API_KEY=not-needed
LLM_API_BASE_URL=http://localhost:11434/api
LLM_MODEL=llama3
LLM_ENDPOINT_PATH=chat
```

#### LM Studio (Local)
```
LLM_API_KEY=not-needed
LLM_API_BASE_URL=http://localhost:1234/v1
LLM_MODEL=mistral-7b
LLM_ENDPOINT_PATH=chat/completions
```

## Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## API Endpoints

### POST /api/completions

Generic endpoint for getting completions from an LLM. Accepts a standard OpenAI-compatible request format.

#### Request Format

```json
{
  "model": "gpt-4",  // Optional - will use server default if not specified
  "messages": [{"role": "user", "content": "Your complete prompt here"}],
  "temperature": 0.3,
  "response_format": {"type": "json_object"}  // Controls how responses are processed
}
```

#### Response Format Handling

The proxy uses the `response_format` field to determine how to process the LLM's response:

- `{"type": "text"}` (default) - Returns the raw text response without any processing
- `{"type": "json_object"}` - Attempts to extract valid JSON from the response, even if embedded in markdown or other text
- `{"type": "json_schema", "schema": {...}}` - Attempts JSON extraction and performs basic schema validation

> **Note**: Full JSON schema validation is not yet implemented. Currently, the proxy will perform basic object validation and include a warning in the response. Full schema validation will be added in a future update.

For non-OpenAI providers that don't support the `response_format` parameter, the proxy:
1. Captures the client's format preference
2. Removes the parameter from the request to the LLM
3. Processes the response according to the original format preference

This ensures consistent behavior across different LLM providers, even those that don't natively support `response_format`.

#### Response Object

The response follows the OpenAI API format with additional metadata:

```json
{
  "id": "...",
  "object": "chat.completion",
  "created": 1234567890,
  "model": "gpt-4",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "{\"processed\": \"json content\"}",
        "proxy_metadata": {
          "processed_for": "json_object",
          "json_extracted": true,
          "schema_validation": null
        }
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 42,
    "completion_tokens": 73,
    "total_tokens": 115
  }
}
```

The `proxy_metadata` field provides information about how the response was processed:
- `processed_for`: The original response format requested
- `json_extracted`: Whether JSON extraction was performed
- `schema_validation`: Results of schema validation if requested

### GET /api/health

Health check endpoint that returns server status and configuration.

## Security Considerations

- The server is intended to be deployed within a secure network perimeter
- Add authentication if deploying to a public environment
- Consider implementing rate limiting for production use
- Review CORS settings in `server.js` for your specific needs

## Troubleshooting

- Enable `DEBUG_MODE=true` in the `.env` file for detailed logs
- Check for error responses from the LLM provider
- Verify API keys and base URLs are correct
- Ensure proper network connectivity to the LLM provider

## License

MIT 