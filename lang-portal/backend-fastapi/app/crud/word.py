from typing import List, Optional, Tuple
from sqlalchemy import func, select, case, literal_column
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.base import CRUDBase
from app.models.word import Word
from app.models.word_review_item import WordReviewItem
from app.schemas.word import WordCreate, WordUpdate


class CRUDWord(CRUDBase[Word, WordCreate, WordUpdate]):
    async def get_with_groups(self, db: AsyncSession, *, word_id: int) -> Optional[Word]:
        """Get a word with its associated groups."""
        query = (
            select(self.model)
            .options(selectinload(self.model.groups))
            .filter(self.model.id == word_id)
        )
        result = await db.execute(query)
        return result.scalar_one_or_none()

    async def get_multi_with_stats(
        self,
        db,
        *,
        skip: int = 0,
        limit: int = 100,
        order_by: Optional[str] = None,
        order: Optional[str] = "asc"
    ) -> Tuple[List[Word], int]:
        """Get multiple words with their review statistics."""
        # Get total count
        count_query = select(func.count()).select_from(self.model)
        total = await db.scalar(count_query)

        # Subquery to compute review statistics
        review_stats = (
            select(
                WordReviewItem.word_id,
                func.count(case((WordReviewItem.correct == True, 1))).label("correct_count"),
                func.count(case((WordReviewItem.correct == False, 1))).label("wrong_count")
            )
            .group_by(WordReviewItem.word_id)
            .subquery()
        )

        # Build main query with computed fields
        query = (
            select(
                self.model,
                func.coalesce(review_stats.c.correct_count, 0).label("correct_count"),
                func.coalesce(review_stats.c.wrong_count, 0).label("wrong_count")
            )
            .outerjoin(
                review_stats,
                self.model.id == review_stats.c.word_id
            )
        )
        
        if order_by:
            if order_by in ["correct_count", "wrong_count"]:
                # Use the computed stats for sorting
                column = func.coalesce(getattr(review_stats.c, order_by), 0)
                if order == "desc":
                    column = column.desc()
                query = query.order_by(column)
            else:
                # Handle direct model fields
                column = getattr(self.model, order_by)
                if order == "desc":
                    column = column.desc()
                query = query.order_by(column)
            
        query = query.offset(skip).limit(limit)
        
        result = await db.execute(query)
        rows = result.all()
        
        # Convert rows to Word objects with computed stats
        words = []
        for row in rows:
            word = row[0]  # The Word model instance
            word.correct_count = row[1]  # The computed correct_count
            word.wrong_count = row[2]  # The computed wrong_count
            words.append(word)
            
        return words, total


word = CRUDWord(Word) 