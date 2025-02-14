from typing import List, Optional, Dict, Tuple
from sqlalchemy import func, select, Integer
from sqlalchemy.orm import selectinload

from app.crud.base import CRUDBase
from app.models.study_session import StudySession
from app.models.word_review_item import WordReviewItem
from app.schemas.study_session import (
    StudySessionCreate,
    StudySessionUpdate,
    WordReviewCreate,
    StudySessionStats
)


class CRUDStudySession(CRUDBase[StudySession, StudySessionCreate, StudySessionUpdate]):
    async def get_multi(
        self,
        db,
        *,
        skip: int = 0,
        limit: int = 100,
        order_by: Optional[str] = None,
        order: Optional[str] = "asc"
    ) -> Tuple[List[StudySession], int]:
        """Get multiple study sessions with pagination and total count."""
        # Get total count
        count_query = select(func.count()).select_from(self.model)
        total = await db.scalar(count_query)

        # Get items with pagination
        query = select(self.model)
        if order_by and hasattr(self.model, order_by):
            order_column = getattr(self.model, order_by)
            if order == "desc":
                order_column = order_column.desc()
            query = query.order_by(order_column)
        
        query = query.offset(skip).limit(limit)
        result = await db.execute(query)
        items = result.scalars().all()
        
        return items, total

    async def get_with_reviews(
        self,
        db,
        session_id: int
    ) -> Optional[StudySession]:
        """Get a study session with its reviews."""
        query = (
            select(self.model)
            .options(selectinload(self.model.reviews))
            .filter(self.model.id == session_id)
        )
        result = await db.execute(query)
        return result.scalar_one_or_none()

    async def create_word_review(
        self,
        db,
        *,
        session_id: int,
        word_id: int,
        correct: bool
    ) -> WordReviewItem:
        """Create a new word review for a study session."""
        review = WordReviewCreate(word_id=word_id, correct=correct)
        db_review = WordReviewItem(
            study_session_id=session_id,
            word_id=review.word_id,
            correct=review.correct
        )
        db.add(db_review)
        await db.flush()
        return db_review

    async def get_session_statistics(
        self,
        db,
        session_id: int
    ) -> Optional[StudySessionStats]:
        """Get statistics for a study session."""
        # Verify session exists
        session = await self.get(db, session_id)
        if not session:
            return None

        # Get review stats
        stats_query = (
            select(
                func.count().label("total_reviews"),
                func.sum(func.cast(WordReviewItem.correct, Integer)).label("correct_reviews")
            )
            .where(WordReviewItem.study_session_id == session_id)
        )
        result = await db.execute(stats_query)
        row = result.one()
        
        total = row.total_reviews or 0
        correct = row.correct_reviews or 0
        accuracy = (correct / total) if total > 0 else 0.0

        return StudySessionStats(
            total_reviews=total,
            correct_reviews=correct,
            accuracy=accuracy
        )


study_session = CRUDStudySession(StudySession) 