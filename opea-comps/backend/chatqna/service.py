import os
import json
import logging
from typing import List, Dict, Any, Optional, Union
import httpx
import asyncio
from pydantic import BaseModel, Field
from fastapi import FastAPI, Request, Response
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from sse_starlette.sse import EventSourceResponse

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Environment variables
LLM_SERVER_HOST_IP = os.getenv("LLM_SERVER_HOST_IP", "localhost")
LLM_SERVER_PORT = int(os.getenv("LLM_SERVER_PORT", 8080))
MEGA_SERVICE_HOST_IP = os.getenv("MEGA_SERVICE_HOST_IP", "0.0.0.0")
MEGA_SERVICE_PORT = int(os.getenv("MEGA_SERVICE_PORT", 8888))

# API models
class ChatMessage(BaseModel):
    role: str
    content: str

class Meta(BaseModel):
    auth_token: str = ""

class ChatCompletionRequest(BaseModel):
    messages: List[ChatMessage]
    stream: bool = True
    max_tokens: Optional[int] = 1024
    temperature: Optional[float] = 0.7
    top_p: Optional[float] = 0.95
    top_k: Optional[int] = 40
    presence_penalty: Optional[float] = 0.0
    frequency_penalty: Optional[float] = 0.0
    repetition_penalty: Optional[float] = 1.1
    context: List[str] = Field(default_factory=list)
    meta: Meta = Field(default_factory=Meta)

class ChatCompletionResponseChoice(BaseModel):
    index: int
    message: ChatMessage
    finish_reason: str = "stop"
    metadata: Optional[Dict[str, Any]] = None

class UsageInfo(BaseModel):
    prompt_tokens: int = 0
    completion_tokens: int = 0
    total_tokens: int = 0

class ChatCompletionResponse(BaseModel):
    id: str = "chatcmpl-default"
    object: str = "chat.completion"
    created: int = 0
    model: str = "chatqna"
    choices: List[ChatCompletionResponseChoice]
    usage: UsageInfo = Field(default_factory=UsageInfo)

# Create FastAPI app
app = FastAPI(title="ChatQnA Service")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Helper function to format messages for the LLM
def format_chat_messages(messages: List[ChatMessage]) -> str:
    """Format chat messages into a prompt string for the LLM."""
    formatted_msgs = []
    
    for msg in messages:
        if msg.role == "system":
            formatted_msgs.append(f"<|system|>\n{msg.content}</s>")
        elif msg.role == "user":
            formatted_msgs.append(f"<|user|>\n{msg.content}</s>")
        elif msg.role == "assistant":
            formatted_msgs.append(f"<|assistant|>\n{msg.content}</s>")
    
    # Add final assistant prompt to trigger the response
    if messages[-1].role != "assistant":
        formatted_msgs.append("<|assistant|>")
    
    return "\n".join(formatted_msgs)

async def stream_llm_response(prompt: str, params: Dict[str, Any]) -> StreamingResponse:
    """Stream responses from the LLM service."""
    
    llm_endpoint = f"http://{LLM_SERVER_HOST_IP}:{LLM_SERVER_PORT}/v1/chat/completions"
    
    llm_payload = {
        "messages": [{"role": "user", "content": prompt}],
        "temperature": params.get("temperature", 0.7),
        "top_p": params.get("top_p", 0.95),
        "top_k": params.get("top_k", 40),
        "max_tokens": params.get("max_tokens", 1024),
        "stream": True,
    }
    
    logger.info(f"Sending request to LLM service at {llm_endpoint}")
    
    async def event_generator():
        async with httpx.AsyncClient() as client:
            async with client.stream("POST", llm_endpoint, json=llm_payload, timeout=60.0) as response:
                if response.status_code != 200:
                    error_msg = await response.aread()
                    logger.error(f"LLM service returned error: {error_msg}")
                    yield f"data: {json.dumps({'error': f'LLM service error: {error_msg}'})}\n\n"
                    yield "data: [DONE]\n\n"
                    return
                
                async for line in response.aiter_lines():
                    if line.startswith("data: "):
                        data = line[6:]
                        if data == "[DONE]":
                            yield "data: [DONE]\n\n"
                            break
                        
                        try:
                            chunk = json.loads(data)
                            content = chunk["choices"][0]["delta"].get("content", "")
                            if content:
                                yield f"data: {json.dumps({'choices': [{'delta': {'content': content}}]})}\n\n"
                        except json.JSONDecodeError:
                            logger.error(f"Failed to parse JSON: {data}")
                        except KeyError as e:
                            logger.error(f"Key error in response: {e}, data: {data}")
    
    return EventSourceResponse(event_generator())

async def generate_llm_response(prompt: str, params: Dict[str, Any]) -> Dict[str, Any]:
    """Generate a complete response from the LLM service."""
    
    llm_endpoint = f"http://{LLM_SERVER_HOST_IP}:{LLM_SERVER_PORT}/v1/chat/completions"
    
    llm_payload = {
        "messages": [{"role": "user", "content": prompt}],
        "temperature": params.get("temperature", 0.7),
        "top_p": params.get("top_p", 0.95),
        "top_k": params.get("top_k", 40),
        "max_tokens": params.get("max_tokens", 1024),
        "stream": False,
    }
    
    logger.info(f"Sending request to LLM service at {llm_endpoint}")
    
    async with httpx.AsyncClient() as client:
        response = await client.post(llm_endpoint, json=llm_payload, timeout=60.0)
        
        if response.status_code != 200:
            error_msg = response.text
            logger.error(f"LLM service returned error: {error_msg}")
            return {"error": f"LLM service error: {error_msg}"}
        
        return response.json()

@app.post("/v1/chatqna", response_model=None)
async def chat_completion(request: Request):
    """Handle chat completion requests."""
    try:
        data = await request.json()
        chat_request = ChatCompletionRequest.model_validate(data)
        
        # Format messages for the LLM
        prompt = format_chat_messages(chat_request.messages)
        
        # Extract parameters for the LLM request
        params = {
            "max_tokens": chat_request.max_tokens,
            "temperature": chat_request.temperature,
            "top_p": chat_request.top_p,
            "top_k": chat_request.top_k,
            "presence_penalty": chat_request.presence_penalty,
            "frequency_penalty": chat_request.frequency_penalty,
            "repetition_penalty": chat_request.repetition_penalty,
        }
        
        # Check if streaming is requested
        if chat_request.stream:
            logger.info("Streaming response requested")
            return await stream_llm_response(prompt, params)
        
        # Generate a complete response
        logger.info("Generating complete response")
        llm_response = await generate_llm_response(prompt, params)
        
        if "error" in llm_response:
            return Response(content=json.dumps({"error": llm_response["error"]}), 
                           media_type="application/json", status_code=500)
        
        # Extract the response content
        content = llm_response["choices"][0]["message"]["content"]
        
        # Create the chat completion response
        response = ChatCompletionResponse(
            id=f"chatcmpl-{hash(prompt) & 0xffffffff:x}",
            created=int(asyncio.get_event_loop().time()),
            model="chatqna",
            choices=[
                ChatCompletionResponseChoice(
                    index=0,
                    message=ChatMessage(role="assistant", content=content),
                    finish_reason="stop"
                )
            ]
        )
        
        return response
    
    except Exception as e:
        logger.exception(f"Error processing request: {e}")
        return Response(content=json.dumps({"error": str(e)}), 
                       media_type="application/json", status_code=500)

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "ok"}

if __name__ == "__main__":
    logger.info(f"Starting ChatQnA service on {MEGA_SERVICE_HOST_IP}:{MEGA_SERVICE_PORT}")
    uvicorn.run("chatqna.service:app", host=MEGA_SERVICE_HOST_IP, port=MEGA_SERVICE_PORT, log_level="info") 