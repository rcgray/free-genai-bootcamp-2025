from typing import List, Optional, Tuple
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.study_session import study_session
from app.crud.group import group
from app.crud.word import word
from app.models.study_session import StudySession
from app.models.study_activity import StudyActivity
from app.schemas.study_session import StudySessionCreate, WordReviewCreate
from app.core.exceptions import AppHTTPException


class StudyService:
    @staticmethod
    async def get_sessions(
        db: AsyncSession,
        *,
        skip: int = 0,
        limit: int = 100,
        order_by: Optional[str] = None,
        order: Optional[str] = "asc"
    ) -> Tuple[List[StudySession], int]:
        """
        Get multiple study sessions with pagination and sorting.
        
        Args:
            skip: Number of records to skip
            limit: Maximum number of records to return
            order_by: Field to sort by
            order: Sort order ("asc" or "desc")
            
        Returns:
            Tuple of (list of sessions, total count)
        """
        return await study_session.get_multi_with_reviews(
            db,
            skip=skip,
            limit=limit,
            order_by=order_by,
            order=order
        )

    @staticmethod
    async def get_session(
        db: AsyncSession,
        session_id: int
    ) -> Optional[StudySession]:
        """Get a study session by ID with its reviews."""
        return await study_session.get_with_reviews(db, session_id)

    @staticmethod
    async def create_session(
        db: AsyncSession,
        *,
        group_id: int,
        study_activity_id: int
    ) -> StudySession:
        """
        Create a new study session with validation.
        
        Args:
            group_id: ID of the group to study
            study_activity_id: ID of the study activity to use
            
        Raises:
            ValueError: If group or study activity doesn't exist
        """
        # Verify group exists
        db_group = await group.get(db, group_id)
        if not db_group:
            raise ValueError(f"Group {group_id} not found")

        # Verify study activity exists
        query = select(StudyActivity).filter(StudyActivity.id == study_activity_id)
        result = await db.execute(query)
        if not result.scalar_one_or_none():
            raise ValueError(f"Study activity {study_activity_id} not found")

        # Create session
        session_in = StudySessionCreate(
            group_id=group_id,
            study_activity_id=study_activity_id
        )
        return await study_session.create(db, obj_in=session_in)

    @staticmethod
    async def add_review(
        db: AsyncSession,
        *,
        session_id: int,
        word_id: int,
        correct: bool
    ) -> dict:
        """
        Add a word review to a session with validation.
        
        Args:
            session_id: ID of the study session
            word_id: ID of the word being reviewed
            correct: Whether the answer was correct
            
        Raises:
            ValueError: If session doesn't exist or word isn't in the session's group
        """
        # Verify session exists
        db_session = await study_session.get_with_reviews(db, session_id)
        if not db_session:
            raise ValueError(f"Study session {session_id} not found")

        # Verify word exists and belongs to the session's group
        db_word = await word.get_with_groups(db=db, word_id=word_id)
        if not db_word:
            raise AppHTTPException(
                status_code=404,
                detail=f"Word {word_id} not found"
            )

        group_ids = {g.id for g in db_word.groups}
        if db_session.group_id not in group_ids:
            raise ValueError(f"Word {word_id} does not belong to the session's group")

        # Create review
        review_in = WordReviewCreate(
            word_id=word_id,
            correct=correct
        )
        review = await study_session.create_word_review(
            db,
            session_id=session_id,
            word_id=word_id,
            correct=correct
        )

        return {
            "id": review.id,
            "word_id": review.word_id,
            "study_session_id": review.study_session_id,
            "correct": review.correct,
            "created_at": review.created_at
        }

    @staticmethod
    async def get_session_stats(
        db: AsyncSession,
        session_id: int
    ) -> dict:
        """Get statistics for a study session."""
        stats = await study_session.get_session_statistics(db, session_id)
        if not stats:
            raise ValueError(f"Study session {session_id} not found")
        return stats.dict() 