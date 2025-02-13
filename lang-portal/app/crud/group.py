from typing import List, Optional, Tuple
from sqlalchemy import select, func
from sqlalchemy.orm import joinedload
from app.crud.base import CRUDBase
from app.models.group import Group
from app.schemas.group import GroupCreate, GroupUpdate


class CRUDGroup(CRUDBase[Group, GroupCreate, GroupUpdate]):
    async def get_with_words(
        self, db: AsyncSession, group_id: int
    ) -> Optional[Group]:
        """Get a group with its words."""
        query = (
            select(Group)
            .options(joinedload(Group.words))
            .filter(Group.id == group_id)
        )
        result = await db.execute(query)
        return result.scalar_one_or_none()

    async def add_words(
        self, db: AsyncSession, *, group_id: int, word_ids: List[int]
    ) -> Group:
        """Add words to a group."""
        group = await self.get(db, group_id)
        if not group:
            raise ValueError("Group not found")

        # Get words that aren't already in the group
        existing_word_ids = {word.id for word in group.words}
        new_word_ids = set(word_ids) - existing_word_ids

        if new_word_ids:
            query = select(Word).filter(Word.id.in_(new_word_ids))
            result = await db.execute(query)
            new_words = result.scalars().all()
            
            group.words.extend(new_words)
            group.words_count = len(group.words)
            
            await db.commit()
            await db.refresh(group)

        return group

    async def remove_words(
        self, db: AsyncSession, *, group_id: int, word_ids: List[int]
    ) -> Group:
        """Remove words from a group."""
        group = await self.get_with_words(db, group_id)
        if not group:
            raise ValueError("Group not found")

        group.words = [w for w in group.words if w.id not in word_ids]
        group.words_count = len(group.words)
        
        await db.commit()
        await db.refresh(group)
        return group


group = CRUDGroup(Group) 