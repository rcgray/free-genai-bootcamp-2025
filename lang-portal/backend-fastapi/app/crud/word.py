from typing import List, Optional, Tuple
from sqlalchemy import func, select
from sqlalchemy.orm import selectinload

from app.crud.base import CRUDBase
from app.models.word import Word
from app.schemas.word import WordCreate, WordUpdate


class CRUDWord(CRUDBase[Word, WordCreate, WordUpdate]):
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

        # Build query for words with review stats
        query = (
            select(self.model)
            .options(selectinload(self.model.review_items))
        )
        
        if order_by:
            if order_by in ["correct_count", "wrong_count"]:
                # Handle derived fields
                subq = (
                    select(
                        self.model.id,
                        func.count(Word.review_items).filter(
                            Word.review_items.correct == (order_by == "correct_count")
                        ).label(order_by)
                    )
                    .group_by(self.model.id)
                    .subquery()
                )
                query = query.join(subq, self.model.id == subq.c.id)
                column = getattr(subq.c, order_by)
            else:
                # Handle direct model fields
                column = getattr(self.model, order_by)
            
            if order == "desc":
                column = column.desc()
            query = query.order_by(column)
            
        query = query.offset(skip).limit(limit)
        
        result = await db.execute(query)
        return result.scalars().all(), total


word = CRUDWord(Word) 