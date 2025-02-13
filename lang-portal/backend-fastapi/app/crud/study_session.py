from typing import List, Optional, Dict
from sqlalchemy import func, select
from sqlalchemy.orm import selectinload

from app.crud.base import CRUDBase
from app.models.study_session import StudySession
from app.models.word_review_item import WordReviewItem
from app.schemas.study_session import StudySessionCreate, WordReviewCreate


class CRUDStudySession(CRUDBase[StudySession, StudySessionCreate, StudySessionCreate]):
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

    async def add_review(
        self,
        db,
        *,
        session_id: int,
        review: WordReviewCreate
    ) -> WordReviewItem:
        """Add a review to a study session."""
        db_review = WordReviewItem(
            study_session_id=session_id,
            word_id=review.word_id,
            correct=review.correct
        )
        db.add(db_review)
        await db.flush()
        return db_review

    async def get_stats(
        self,
        db,
        session_id: int
    ) -> Optional[Dict]:
        """Get statistics for a study session."""
        # Verify session exists
        session = await self.get(db, session_id)
        if not session:
            return None

        # Get review stats
        stats_query = (
            select(
                func.count().label("total_reviews"),
                func.sum(
                    func.cast(WordReviewItem.correct, func.Integer())
                ).label("correct_reviews")
            )
            .filter(WordReviewItem.study_session_id == session_id)
        )
        result = await db.execute(stats_query)
        row = result.one()
        
        total = row.total_reviews or 0
        correct = row.correct_reviews or 0
        accuracy = (correct / total * 100) if total > 0 else 0.0

        return {
            "total_reviews": total,
            "correct_reviews": correct,
            "accuracy": round(accuracy, 2)
        }


study_session = CRUDStudySession(StudySession) 