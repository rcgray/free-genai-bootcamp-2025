from typing import List, Optional, Tuple
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.session import session
from app.crud.group import group
from app.crud.word import word
from app.models.session import Session
from app.models.activity import Activity
from app.schemas.session import SessionCreate, WordReviewCreate
from app.core.exceptions import AppHTTPException


class SessionService:
    @staticmethod
    async def get_sessions(
        db: AsyncSession,
        *,
        skip: int = 0,
        limit: int = 100,
        order_by: Optional[str] = None,
        order: Optional[str] = "asc"
    ) -> Tuple[List[Session], int]:
        """
        Get multiple sessions with pagination and sorting.
        
        Args:
            skip: Number of records to skip
            limit: Maximum number of records to return
            order_by: Field to sort by
            order: Sort order ("asc" or "desc")
            
        Returns:
            Tuple of (list of sessions, total count)
        """
        return await session.get_multi_with_reviews(
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
    ) -> Optional[Session]:
        """Get a session by ID with its reviews."""
        return await session.get_with_reviews(db, session_id)

    @staticmethod
    async def create_session(
        db: AsyncSession,
        *,
        group_id: Optional[int],
        activity_id: int
    ) -> Session:
        """
        Create a new session with validation.
        
        Args:
            group_id: Optional ID of the group to study
            activity_id: ID of the activity to use
            
        Raises:
            ValueError: If group or activity doesn't exist
        """
        # Verify group exists if provided
        if group_id is not None:
            db_group = await group.get(db, group_id)
            if not db_group:
                raise ValueError(f"Group {group_id} not found")

        # Verify activity exists
        query = select(Activity).filter(Activity.id == activity_id)
        result = await db.execute(query)
        if not result.scalar_one_or_none():
            raise ValueError(f"Activity {activity_id} not found")

        # Create session
        session_in = SessionCreate(
            group_id=group_id,
            activity_id=activity_id
        )
        return await session.create(db, obj_in=session_in)

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
            session_id: ID of the session
            word_id: ID of the word being reviewed
            correct: Whether the answer was correct
            
        Raises:
            ValueError: If session doesn't exist or word isn't in the session's group
        """
        # Verify session exists
        db_session = await session.get_with_reviews(db, session_id)
        if not db_session:
            raise ValueError(f"Session {session_id} not found")

        # Verify word exists
        db_word = await word.get_with_groups(db=db, word_id=word_id)
        if not db_word:
            raise AppHTTPException(
                status_code=404,
                detail=f"Word {word_id} not found"
            )

        # If session has a group, verify word belongs to it
        if db_session.group_id is not None:
            group_ids = {g.id for g in db_word.groups}
            if db_session.group_id not in group_ids:
                raise ValueError(f"Word {word_id} does not belong to the session's group")

        # Create review
        review_in = WordReviewCreate(
            word_id=word_id,
            correct=correct
        )
        review = await session.create_word_review(
            db,
            session_id=session_id,
            word_id=word_id,
            correct=correct
        )

        return {
            "id": review.id,
            "word_id": review.word_id,
            "session_id": review.session_id,
            "correct": review.correct,
            "created_at": review.created_at
        }

    @staticmethod
    async def get_session_stats(
        db: AsyncSession,
        session_id: int
    ) -> dict:
        """Get statistics for a session."""
        stats = await session.get_session_statistics(db, session_id)
        if not stats:
            raise ValueError(f"Session {session_id} not found")
        return stats.dict() 