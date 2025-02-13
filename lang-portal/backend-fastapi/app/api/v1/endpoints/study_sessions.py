from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.schemas.study_session import (
    StudySession,
    StudySessionCreate,
    WordReviewCreate
)
from app.services.study_service import StudyService

router = APIRouter()

@router.post("", response_model=StudySession)
async def create_study_session(
    *,
    session_in: StudySessionCreate,
    db: AsyncSession = Depends(get_db),
):
    """
    Create a new study session.
    
    Parameters:
        session_in: Study session data including group_id and study_activity_id
    
    Returns:
        The created study session
    
    Raises:
        HTTPException: If the group or study activity doesn't exist
    """
    try:
        return await StudyService.create_session(
            db,
            group_id=session_in.group_id,
            study_activity_id=session_in.study_activity_id
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/{session_id}/review", response_model=dict)
async def add_word_review(
    *,
    session_id: int,
    review_in: WordReviewCreate,
    db: AsyncSession = Depends(get_db),
):
    """
    Log a review attempt for a word during a study session.
    
    Parameters:
        session_id: ID of the study session
        review_in: Review data including word_id and correct status
    
    Returns:
        The created review item
    
    Raises:
        HTTPException: If the session doesn't exist or the word isn't in the session's group
    """
    try:
        review = await StudyService.add_review(
            db,
            session_id=session_id,
            word_id=review_in.word_id,
            correct=review_in.correct
        )
        return {
            "data": review,
            "error": None
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/{session_id}", response_model=StudySession)
async def get_study_session(
    session_id: int,
    db: AsyncSession = Depends(get_db),
):
    """
    Get details of a specific study session.
    
    Parameters:
        session_id: ID of the study session
    
    Returns:
        The study session with its reviews
    
    Raises:
        HTTPException: If the session doesn't exist
    """
    session = await StudyService.get_session(db, session_id)
    if not session:
        raise HTTPException(
            status_code=404,
            detail=f"Study session {session_id} not found"
        )
    return session 