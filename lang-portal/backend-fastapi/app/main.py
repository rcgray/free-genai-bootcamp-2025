from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse, Response
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import get_settings
from app.core.exceptions import AppHTTPException, DatabaseError
from app.core.exceptions import http_exception_handler, database_exception_handler
from app.api.v1.router import api_router

settings = get_settings()

app = FastAPI(
    title=settings.APP_NAME,
    openapi_url=f"{settings.API_V1_PREFIX}/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite default dev server
        "http://localhost:3000",  # Alternative dev server port
        settings.FRONTEND_URL,    # From settings
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Exception handlers
app.add_exception_handler(AppHTTPException, http_exception_handler)
app.add_exception_handler(DatabaseError, database_exception_handler)

# Add API router
app.include_router(api_router, prefix=settings.API_V1_PREFIX)


# Custom response middleware to wrap all responses in our standard format
@app.middleware("http")
async def wrap_response(request: Request, call_next):
    response = await call_next(request)
    
    # Don't modify non-JSON responses (like OpenAPI docs)
    if response.headers.get("content-type") != "application/json":
        return response
    
    # Get the response body
    body = b""
    async for chunk in response.body_iterator:
        body += chunk
    
    # If no body, return empty response
    if not body:
        return JSONResponse(
            content={"data": None, "error": None},
            status_code=response.status_code,
        )
    
    try:
        # Parse and wrap the response data
        import json
        data = json.loads(body)
        if not isinstance(data, dict) or ("data" not in data and "error" not in data):
            data = {"data": data, "error": None}
        
        # Create new response with wrapped data
        return Response(
            content=json.dumps(data),
            status_code=response.status_code,
            headers={
                "content-type": "application/json",
                **{
                    k: v for k, v in response.headers.items()
                    if k.lower() not in ("content-type", "content-length")
                }
            },
        )
    except json.JSONDecodeError:
        # If response is not valid JSON, return it as-is
        return Response(
            content=body,
            status_code=response.status_code,
            headers=response.headers
        )


# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy"} 