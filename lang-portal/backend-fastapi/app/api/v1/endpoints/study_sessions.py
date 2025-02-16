from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.responses import JSONResponse
from typing import Optional

from app.core.database import get_db
from app.schemas.study_session import (
    StudySession,
    StudySessionCreate,
    WordReview,
    WordReviewCreate
)
from app.services.study_service import StudyService

router = APIRouter()

@router.get("", response_model=dict)
async def list_study_sessions(
    db: AsyncSession = Depends(get_db),
    page: int = Query(1, ge=1, description="Page number"),
    per_page: int = Query(25, ge=1, le=100, description="Items per page"),
    sort_by: Optional[str] = Query(None, description="Field to sort by"),
    order: Optional[str] = Query("asc", description="Sort order (asc or desc)"),
):
    """
    List study sessions with pagination and sorting.
    
    Parameters:
        page: Page number (1-indexed)
        per_page: Number of items per page
        sort_by: Field to sort by (created_at, group_id, study_activity_id)
        order: Sort order (asc or desc)
    
    Returns:
        Paginated list of study sessions with their reviews
    """
    skip = (page - 1) * per_page
    
    # Validate sort field if provided
    valid_sort_fields = {"created_at", "group_id", "study_activity_id"}
    if sort_by and sort_by not in valid_sort_fields:
        return JSONResponse(
            status_code=400,
            content={
                "data": None,
                "error": f"Invalid sort field. Must be one of: {', '.join(valid_sort_fields)}"
            }
        )
    
    # Validate sort order
    if order not in {"asc", "desc"}:
        return JSONResponse(
            status_code=400,
            content={
                "data": None,
                "error": "Invalid sort order. Must be 'asc' or 'desc'"
            }
        )
    
    try:
        sessions, total = await StudyService.get_sessions(
            db,
            skip=skip,
            limit=per_page,
            order_by=sort_by,
            order=order
        )
        
        # Calculate pagination info
        total_pages = (total + per_page - 1) // per_page
        
        # Convert SQLAlchemy models to Pydantic models
        session_list = [StudySession.model_validate(session) for session in sessions]
        
        return {
            "data": {
                "items": [session.model_dump() for session in session_list],
                "total": total,
                "page": page,
                "per_page": per_page,
                "total_pages": total_pages
            },
            "error": None
        }
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"data": None, "error": str(e)}
        )

@router.post("", response_model=dict)
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
        db_session = await StudyService.create_session(
            db,
            group_id=session_in.group_id,
            study_activity_id=session_in.study_activity_id
        )
        # Convert SQLAlchemy model to dict first, then validate with Pydantic
        session_dict = {
            "id": db_session.id,
            "group_id": db_session.group_id,
            "study_activity_id": db_session.study_activity_id,
            "created_at": db_session.created_at,
            "reviews": []  # Initialize with empty reviews for new session
        }
        session = StudySession.model_validate(session_dict)
        return {
            "data": session.model_dump(),
            "error": None
        }
    except ValueError as e:
        error_msg = str(e)
        error_lower = error_msg.lower()
        # Check for specific "not found" errors first
        if "not found" in error_lower:
            if "group" in error_lower or "activity" in error_lower:
                return JSONResponse(
                    status_code=404,
                    content={"data": None, "error": error_msg}
                )
        # For any other ValueError, return 400
        return JSONResponse(
            status_code=400,
            content={"data": None, "error": error_msg}
        )

@router.get("/{session_id}", response_model=dict)
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
    db_session = await StudyService.get_session(db, session_id)
    if not db_session:
        return JSONResponse(
            status_code=404,
            content={"data": None, "error": f"Study session {session_id} not found"}
        )
    # Convert SQLAlchemy model to Pydantic model and return with proper format
    session = StudySession.model_validate(db_session)
    return {
        "data": session.model_dump(),
        "error": None
    }

@router.post("/{session_id}/review", response_model=dict)
async def create_word_review(
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
        db_review = await StudyService.add_review(
            db,
            session_id=session_id,
            word_id=review_in.word_id,
            correct=review_in.correct
        )
        # Convert SQLAlchemy model to Pydantic model and return with proper format
        review = WordReview.model_validate(db_review)
        return {
            "data": review.model_dump(),
            "error": None
        }
    except ValueError as e:
        error_msg = str(e)
        error_lower = error_msg.lower()
        # Check for specific "not found" errors first
        if "not found" in error_lower:
            if "session" in error_lower or "word" in error_lower:
                return JSONResponse(
                    status_code=404,
                    content={"data": None, "error": error_msg}
                )
        # For any other ValueError, return 400
        return JSONResponse(
            status_code=400,
            content={"data": None, "error": error_msg}
        ) 