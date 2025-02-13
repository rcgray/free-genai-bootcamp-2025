from typing import List, Optional, Tuple
from sqlalchemy import select, func
from sqlalchemy.orm import joinedload
from app.crud.base import CRUDBase
from app.models.study_session import StudySession, WordReviewItem
from app.models.study_activity import StudyActivity
from app.schemas.study_session import StudySessionCreate, StudySessionUpdate, WordReviewCreate


class CRUDStudySession(CRUDBase[StudySession, StudySessionCreate, StudySessionUpdate]):
    async def get_with_reviews(
        self, db: AsyncSession, session_id: int
    ) -> Optional[StudySession]:
        """Get a study session with its reviews."""
        query = (
            select(StudySession)
            .options(joinedload(StudySession.review_items))
            .filter(StudySession.id == session_id)
        )
        result = await db.execute(query)
        return result.scalar_one_or_none()

    async def add_review(
        self, db: AsyncSession, *, session_id: int, review: WordReviewCreate
    ) -> WordReviewItem:
        """Add a word review to a session."""
        db_review = WordReviewItem(
            study_session_id=session_id,
            word_id=review.word_id,
            correct=review.correct
        )
        db.add(db_review)
        await db.commit()
        await db.refresh(db_review)
        return db_review

    async def get_activities(
        self, db: AsyncSession
    ) -> List[StudyActivity]:
        """Get all study activities."""
        query = select(StudyActivity)
        result = await db.execute(query)
        return result.scalars().all()


study_session = CRUDStudySession(StudySession) 