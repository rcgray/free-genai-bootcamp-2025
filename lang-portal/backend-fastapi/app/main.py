from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
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
    allow_origins=["http://localhost:5173"],  # Frontend dev server
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
    
    body = b""
    async for chunk in response.body_iterator:
        body += chunk
    
    # Parse the response body
    if body:
        import json
        data = json.loads(body)
        # Only wrap if not already in our format
        if not isinstance(data, dict) or ("data" not in data and "error" not in data):
            data = {"data": data, "error": None}
    else:
        data = {"data": None, "error": None}
    
    return JSONResponse(
        content=data,
        status_code=response.status_code,
        headers=dict(response.headers),
    )


# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy"} 