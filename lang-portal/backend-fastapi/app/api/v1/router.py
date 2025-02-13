from fastapi import APIRouter
from app.api.v1.endpoints import words, groups, study_sessions

api_router = APIRouter()

api_router.include_router(
    words.router,
    prefix="/words",
    tags=["words"]
)

api_router.include_router(
    groups.router,
    prefix="/groups",
    tags=["groups"]
)

api_router.include_router(
    study_sessions.router,
    prefix="/study_sessions",
    tags=["study_sessions"]
) 