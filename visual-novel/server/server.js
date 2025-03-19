/**
 * server.js
 * 
 * A generic LLM proxy server that securely forwards client requests to LLM providers
 * while protecting API keys from exposure in client-side code.
 * 
 * This proxy is entirely application-agnostic and can be used with any client
 * that needs to communicate with OpenAI-compatible API endpoints.
 * 
 * It supports switching between different LLM providers by simply changing
 * environment variables, requiring no code changes.
 */

const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

// Create Express application
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

/**
 * Construct the full API endpoint URL based on environment variables
 * @param {string} endpointPath - The specific endpoint path to call
 * @returns {string} The complete URL
 */
function getEndpointUrl(endpointPath) {
  // Remove trailing slash from base URL if present
  const baseUrl = process.env.LLM_API_BASE_URL?.endsWith('/')
    ? process.env.LLM_API_BASE_URL.slice(0, -1)
    : process.env.LLM_API_BASE_URL;

  // Remove leading slash from endpoint path if present
  const path = endpointPath?.startsWith('/')
    ? endpointPath.slice(1)
    : endpointPath;

  return `${baseUrl}/${path}`;
}

/**
 * Adapt the request for compatibility with different LLM providers
 * @param {Object} requestBody - The original request body
 * @returns {Object} The adapted request body and metadata
 */
function adaptRequestForProvider(requestBody) {
  const baseUrl = process.env.LLM_API_BASE_URL || '';
  const isOpenAI = baseUrl.includes('openai.com');
  
  // Create a copy of the request to modify
  const adaptedRequest = { ...requestBody };
  
  // Extract response format preferences before potentially removing it
  const responseMetadata = {
    originalResponseFormat: adaptedRequest.response_format?.type || 'text',
    jsonSchema: adaptedRequest.response_format?.schema || null
  };
  
  // Check if json_schema is requested with an actual schema
  if (responseMetadata.originalResponseFormat === 'json_schema' && responseMetadata.jsonSchema) {
    // For now, we'll notify the user that full schema validation isn't implemented
    console.warn('[LLM-PROXY] Full JSON schema validation is not yet implemented. Basic object validation will be used instead.');
  }
  
  // Handle response_format compatibility
  if (!isOpenAI && adaptedRequest.response_format) {
    // For non-OpenAI providers, it's safest to remove response_format entirely
    // Most local providers don't support it or implement it differently
    delete adaptedRequest.response_format;
    console.log('[LLM-PROXY] Removed response_format for non-OpenAI provider compatibility');
  }
  
  // Also ensure we're using the model specified in the .env file for local providers
  // Local models might have different naming conventions than what the client expects
  if (!isOpenAI && process.env.LLM_MODEL) {
    // Only override if the model has been specified in .env
    adaptedRequest.model = process.env.LLM_MODEL;
    console.log(`[LLM-PROXY] Using model from .env: ${adaptedRequest.model}`);
  }
  
  return { 
    adaptedRequest, 
    responseMetadata 
  };
}

/**
 * Processes LLM response content to extract valid JSON
 * Handles cases where JSON might be embedded in markdown code blocks or mixed with other text
 * @param {Object} responseData - The raw response data from the LLM
 * @param {Object} responseMetadata - Metadata about the original request's response format expectations
 * @returns {Object} The processed response with valid JSON in content if requested
 */
function processLLMResponse(responseData, responseMetadata) {
  // Only process if the response has choices and content
  if (!responseData?.choices?.[0]?.message?.content) {
    console.log('[LLM-PROXY] No content to process in LLM response');
    return responseData;
  }
  
  const originalContent = responseData.choices[0].message.content;
  
  // Only perform JSON extraction if it was requested in the original request
  const shouldExtractJson = responseMetadata.originalResponseFormat === 'json_object' || 
                           responseMetadata.originalResponseFormat === 'json_schema';
  
  if (!shouldExtractJson) {
    console.log('[LLM-PROXY] Text response requested, no JSON extraction needed');
    return responseData;
  }
  
  console.log(`[LLM-PROXY] Processing LLM response content for ${responseMetadata.originalResponseFormat} format`);
  
  try {
    // First, check if the content is already valid JSON
    let jsonContent = originalContent;
    let isValidJson = false;
    
    try {
      JSON.parse(originalContent);
      console.log('[LLM-PROXY] Content is already valid JSON');
      isValidJson = true;
    } catch (e) {
      // Not valid JSON, continue with extraction
      isValidJson = false;
    }
    
    // If not valid JSON, attempt extraction
    if (!isValidJson) {
      // Remove any thinking/reasoning sections
      const removeThinkingPattern = /<think>[\s\S]*?<\/think>/g;
      jsonContent = jsonContent.replace(removeThinkingPattern, '');
      
      // Look for JSON inside markdown code blocks (```json ... ```)
      const jsonCodeBlockPattern = /```(?:json)?\s*([\s\S]*?)```/;
      const codeBlockMatch = jsonContent.match(jsonCodeBlockPattern);
      
      if (codeBlockMatch && codeBlockMatch[1]) {
        jsonContent = codeBlockMatch[1].trim();
        console.log('[LLM-PROXY] Extracted JSON from code block');
      }
      
      // As a last resort, try to find JSON by looking for an object pattern {..."field":...}
      // This is risky but better than nothing
      if (!jsonContent.startsWith('{')) {
        const possibleJson = jsonContent.match(/{[\s\S]*}/);
        if (possibleJson) {
          jsonContent = possibleJson[0];
          console.log('[LLM-PROXY] Found JSON object pattern in content');
        }
      }
      
      // Validate the extracted content is valid JSON
      JSON.parse(jsonContent);
    }
    
    // If json_schema type was requested, check against the schema
    let schemaValidation = null;
    if (responseMetadata.originalResponseFormat === 'json_schema' && responseMetadata.jsonSchema) {
      try {
        // Here we would do proper schema validation
        // For now, we just do basic validation that it's a JSON object
        const parsedJson = JSON.parse(jsonContent);
        if (typeof parsedJson !== 'object' || parsedJson === null) {
          schemaValidation = {
            valid: false,
            error: 'Response is not a JSON object'
          };
        } else {
          schemaValidation = {
            valid: true,
            warning: 'Full JSON schema validation is not yet implemented. Only basic object validation was performed.'
          };
        }
      } catch (e) {
        schemaValidation = {
          valid: false,
          error: e.message
        };
      }
    }
    
    // Create a modified response with the extracted JSON
    const processedResponseData = { ...responseData };
    processedResponseData.choices[0].message.content = jsonContent;
    processedResponseData.choices[0].message.proxy_metadata = {
      processed_for: responseMetadata.originalResponseFormat,
      json_extracted: !isValidJson,
      schema_validation: schemaValidation
    };
    
    console.log('[LLM-PROXY] Successfully processed response based on requested format');
    return processedResponseData;
  } catch (error) {
    console.error('[LLM-PROXY] Failed to extract valid JSON from response:', error.message);
    
    // If we failed to extract valid JSON but it was requested, return an error indication
    if (shouldExtractJson) {
      // Add an error flag to the response
      const processedResponseData = { ...responseData };
      processedResponseData.choices[0].message.proxy_metadata = {
        processed_for: responseMetadata.originalResponseFormat,
        json_extracted: false,
        error: `Failed to extract valid JSON: ${error.message}`
      };
      return processedResponseData;
    }
    
    // If extraction wasn't requested, return the original response
    return responseData;
  }
}

// Generic LLM completion endpoint - completely model and provider agnostic
app.post('/api/completions', async (req, res) => {
  try {
    // Create request body - use model from request or fall back to env variable
    let requestBody = {
      ...req.body,
      // If model isn't specified in the request, use the default from .env
      model: req.body.model || process.env.LLM_MODEL,
      // If response_format isn't specified, default to text
      response_format: req.body.response_format || { type: 'text' }
    };
    
    // Adapt the request for the specific provider
    const { adaptedRequest, responseMetadata } = adaptRequestForProvider(requestBody);
    
    // Get endpoint path from environment variable or use default
    const endpointPath = process.env.LLM_ENDPOINT_PATH || 'chat/completions';
    
    // Construct full endpoint URL
    const endpointUrl = getEndpointUrl(endpointPath);
    
    console.log(`[LLM-PROXY] Forwarding request to ${endpointUrl}`);
    console.log(`[LLM-PROXY] Using model: ${adaptedRequest.model}`);
    console.log(`[LLM-PROXY] Original response format requested: ${responseMetadata.originalResponseFormat}`);
    
    // Optionally log the full request for debugging
    if (process.env.DEBUG_MODE === 'true') {
      console.log('[LLM-PROXY] Request body:', JSON.stringify(adaptedRequest, null, 2));
    }
    
    // Forward the request body to the LLM API
    const response = await axios.post(
      endpointUrl,
      adaptedRequest,
      {
        headers: {
          'Authorization': `Bearer ${process.env.LLM_API_KEY}`,
          'Content-Type': 'application/json'
        },
        // Increase timeout for slow providers
        timeout: parseInt(process.env.REQUEST_TIMEOUT_MS || 30000)
      }
    );
    
    console.log(`[LLM-PROXY] Received response from LLM API`);
    
    // Process the response based on the original response format
    const processedResponseData = processLLMResponse(response.data, responseMetadata);
    
    // Log the first few characters of the response content for debugging
    if (process.env.DEBUG_MODE === 'true' && processedResponseData?.choices?.[0]?.message?.content) {
      const contentPreview = processedResponseData.choices[0].message.content.substring(0, 100);
      console.log(`[LLM-PROXY] Response content preview: ${contentPreview}...`);
    }
    
    // Return the processed response
    res.json(processedResponseData);
  } catch (error) {
    console.error('[LLM-PROXY] Error forwarding request to LLM API:', error.message);
    
    // Log the full error details for debugging
    if (error.response && error.response.data) {
      console.error('[LLM-PROXY] Error details:', JSON.stringify(error.response.data, null, 2));
    }
    
    // Extract useful error information depending on the error type
    let statusCode = 500;
    let errorMessage = error.message;
    let errorDetails = 'No additional details available';
    
    if (error.response) {
      // The request was made and the server responded with a non-2xx status code
      statusCode = error.response.status;
      errorDetails = error.response.data;
      console.error('[LLM-PROXY] Server responded with error:', statusCode, errorDetails);
    } else if (error.request) {
      // The request was made but no response was received
      statusCode = 503;
      errorMessage = 'LLM provider not responding';
      errorDetails = 'The request was made but no response was received';
      console.error('[LLM-PROXY] No response received from provider');
    }
    
    // Send appropriate error response
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

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[LLM-PROXY] Server running on port ${PORT}`);
  console.log(`[LLM-PROXY] LLM API URL: ${process.env.LLM_API_BASE_URL}`);
  console.log(`[LLM-PROXY] Using endpoint path: ${process.env.LLM_ENDPOINT_PATH || 'chat/completions'}`);
}); 