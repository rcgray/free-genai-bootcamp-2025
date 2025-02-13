from typing import List, Optional, Tuple
from sqlalchemy import select, func
from sqlalchemy.orm import joinedload
from app.crud.base import CRUDBase
from app.models.word import Word
from app.schemas.word import WordCreate, WordUpdate


class CRUDWord(CRUDBase[Word, WordCreate, WordUpdate]):
    async def get_with_groups(
        self, db: AsyncSession, word_id: int
    ) -> Optional[Word]:
        """Get a word with its groups."""
        query = (
            select(Word)
            .options(joinedload(Word.groups))
            .filter(Word.id == word_id)
        )
        result = await db.execute(query)
        return result.scalar_one_or_none()

    async def get_multi_with_stats(
        self,
        db: AsyncSession,
        *,
        skip: int = 0,
        limit: int = 100,
        order_by: Optional[str] = None,
        order: Optional[str] = "asc"
    ) -> Tuple[List[Word], int]:
        """Get words with their review statistics."""
        # Get total count
        count_query = select(func.count()).select_from(Word)
        total = await db.scalar(count_query)

        # Build query with review stats
        query = (
            select(
                Word,
                func.count(WordReviewItem.id).filter(WordReviewItem.correct == True).label("correct_count"),
                func.count(WordReviewItem.id).filter(WordReviewItem.correct == False).label("wrong_count")
            )
            .outerjoin(Word.review_items)
            .group_by(Word.id)
        )

        if order_by:
            if order_by in ["correct_count", "wrong_count"]:
                column = order_by
            else:
                column = getattr(Word, order_by)
            
            if order == "desc":
                column = column.desc()
            query = query.order_by(column)

        query = query.offset(skip).limit(limit)
        result = await db.execute(query)
        
        return result.unique().all(), total


word = CRUDWord(Word) 