from fastapi import HTTPException, Request
from fastapi.responses import JSONResponse
from typing import Any, Dict, Optional


class AppHTTPException(HTTPException):
    def __init__(
        self,
        status_code: int,
        detail: Any = None,
        headers: Optional[Dict[str, str]] = None,
    ) -> None:
        super().__init__(status_code=status_code, detail=detail, headers=headers)


async def http_exception_handler(
    request: Request, exc: AppHTTPException
) -> JSONResponse:
    return JSONResponse(
        status_code=exc.status_code,
        content={"data": None, "error": exc.detail},
    )


class DatabaseError(Exception):
    pass


async def database_exception_handler(
    request: Request, exc: DatabaseError
) -> JSONResponse:
    return JSONResponse(
        status_code=500,
        content={
            "data": None,
            "error": "Database error occurred. Please try again later.",
        },
    ) 