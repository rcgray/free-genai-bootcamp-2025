from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.study_session import study_session
from app.crud.group import group
from app.crud.word import word
from app.models.study_session import StudySession, WordReviewItem
from app.schemas.study_session import (
    StudySessionCreate,
    WordReviewCreate,
    StudySessionStats
)
from app.core.exceptions import AppHTTPException


class StudyService:
    @staticmethod
    async def create_session(
        db: AsyncSession,
        *,
        group_id: int,
        activity_id: int
    ) -> StudySession:
        """
        Create a new study session for a group with validation.
        """
        # Verify group exists and has words
        db_group = await group.get_with_words(db, group_id)
        if not db_group:
            raise AppHTTPException(
                status_code=404,
                detail=f"Group {group_id} not found"
            )
        if not db_group.words:
            raise AppHTTPException(
                status_code=400,
                detail="Cannot start study session with empty group"
            )

        # Create session
        session_in = StudySessionCreate(
            group_id=group_id,
            study_activity_id=activity_id
        )
        return await study_session.create(db, obj_in=session_in)

    @staticmethod
    async def add_review(
        db: AsyncSession,
        *,
        session_id: int,
        word_id: int,
        correct: bool
    ) -> WordReviewItem:
        """
        Add a word review to a session with validation.
        """
        # Verify session exists
        db_session = await study_session.get_with_reviews(db, session_id)
        if not db_session:
            raise AppHTTPException(
                status_code=404,
                detail=f"Study session {session_id} not found"
            )

        # Verify word exists and belongs to the session's group
        db_word = await word.get_with_groups(db, word_id)
        if not db_word:
            raise AppHTTPException(
                status_code=404,
                detail=f"Word {word_id} not found"
            )

        group_ids = {g.id for g in db_word.groups}
        if db_session.group_id not in group_ids:
            raise AppHTTPException(
                status_code=400,
                detail=f"Word {word_id} does not belong to the session's group"
            )

        # Create review
        review_in = WordReviewCreate(
            word_id=word_id,
            correct=correct
        )
        return await study_session.add_review(
            db,
            session_id=session_id,
            review=review_in
        )

    @staticmethod
    async def get_session_stats(
        db: AsyncSession,
        session_id: int
    ) -> StudySessionStats:
        """
        Get statistics for a study session.
        """
        db_session = await study_session.get_with_reviews(db, session_id)
        if not db_session:
            raise AppHTTPException(
                status_code=404,
                detail=f"Study session {session_id} not found"
            )

        total_reviews = len(db_session.review_items)
        correct_reviews = sum(1 for r in db_session.review_items if r.correct)

        return StudySessionStats(
            total_reviews=total_reviews,
            correct_reviews=correct_reviews,
            accuracy=correct_reviews / total_reviews if total_reviews > 0 else 0.0
        )


study_service = StudyService() 