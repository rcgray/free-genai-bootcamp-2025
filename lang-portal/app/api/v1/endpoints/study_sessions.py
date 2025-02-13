from typing import List, Optional
from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.schemas.study_session import (
    StudySession,
    StudySessionBase,
    WordReview,
    WordReviewBase,
    StudyActivity
)
from app.schemas.base import PaginatedResponse

router = APIRouter()

@router.get("/activities", response_model=List[StudyActivity])
async def get_study_activities(
    db: AsyncSession = Depends(get_db),
):
    """
    Get list of available study activities.
    """
    # Implementation will come later
    return []

@router.get("", response_model=PaginatedResponse[StudySession])
async def get_study_sessions(
    group_id: Optional[int] = None,
    activity_id: Optional[int] = None,
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    """
    Get paginated list of study sessions.
    Optional filtering by group or activity.
    """
    # Implementation will come later
    return {
        "items": [],
        "total": 0,
        "page": page,
        "per_page": per_page,
        "total_pages": 0
    }

@router.post("", response_model=StudySession)
async def create_study_session(
    session: StudySessionBase,
    db: AsyncSession = Depends(get_db),
):
    """
    Create a new study session.
    """
    # Implementation will come later
    pass

@router.get("/{session_id}", response_model=StudySession)
async def get_study_session(
    session_id: int,
    db: AsyncSession = Depends(get_db),
):
    """
    Get details of a specific study session.
    """
    # Implementation will come later
    pass

@router.post("/{session_id}/reviews", response_model=WordReview)
async def add_word_review(
    session_id: int,
    review: WordReviewBase,
    db: AsyncSession = Depends(get_db),
):
    """
    Add a word review to a study session.
    """
    # Implementation will come later
    pass

@router.get("/{session_id}/reviews", response_model=List[WordReview])
async def get_session_reviews(
    session_id: int,
    db: AsyncSession = Depends(get_db),
):
    """
    Get all word reviews for a study session.
    """
    # Implementation will come later
    return [] 