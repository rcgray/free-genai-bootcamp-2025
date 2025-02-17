from fastapi import APIRouter
from app.api.v1.endpoints import words, groups, sessions, activities

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
    sessions.router,
    prefix="/sessions",
    tags=["sessions"]
)
api_router.include_router(
    activities.router,
    prefix="/activities",
    tags=["activities"]
) 