from typing import List, Optional, Tuple, Union, Dict, Any
from sqlalchemy import func, select
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.base import CRUDBase
from app.models.group import Group
from app.models.word import Word
from app.models.word_group import WordGroup
from app.schemas.group import GroupCreate, GroupUpdate


class CRUDGroup(CRUDBase[Group, GroupCreate, GroupUpdate]):
    async def create(self, db: AsyncSession, *, obj_in: GroupCreate) -> Group:
        """Create a new group and optionally add words to it."""
        # Create group without word_ids
        group_data = obj_in.dict(exclude={"word_ids"})
        db_obj = Group(**group_data)
        db.add(db_obj)
        await db.flush()  # Flush to get the ID

        # Add words if provided
        if obj_in.word_ids:
            await self.add_words(db, group_id=db_obj.id, word_ids=obj_in.word_ids)

        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    async def get_multi(
        self,
        db: AsyncSession,
        *,
        skip: int = 0,
        limit: int = 100,
        order_by: Optional[str] = None,
        order: Optional[str] = "asc"
    ) -> Tuple[List[Group], int]:
        """Get multiple groups with pagination and total count."""
        # Get total count
        count_query = select(func.count()).select_from(self.model)
        total = await db.scalar(count_query)

        # Build query for items
        query = select(self.model)
        
        if order_by and hasattr(self.model, order_by):
            order_column = getattr(self.model, order_by)
            if order == "desc":
                order_column = order_column.desc()
            query = query.order_by(order_column)
            
        query = query.offset(skip).limit(limit)
        result = await db.execute(query)
        return result.scalars().all(), total

    async def get_group_words(
        self,
        db,
        *,
        group_id: int,
        skip: int = 0,
        limit: int = 100,
        order_by: Optional[str] = None,
        order: Optional[str] = "asc"
    ) -> Tuple[List[Word], int]:
        """Get paginated words for a specific group."""
        # Get total count
        count_query = (
            select(func.count(Word.id))
            .join(WordGroup)
            .filter(WordGroup.group_id == group_id)
        )
        total = await db.scalar(count_query)

        # Build query for words
        query = (
            select(Word)
            .join(WordGroup)
            .filter(WordGroup.group_id == group_id)
        )
        
        if order_by:
            column = getattr(Word, order_by)
            if order == "desc":
                column = column.desc()
            query = query.order_by(column)
            
        query = query.offset(skip).limit(limit)
        
        result = await db.execute(query)
        return result.scalars().all(), total

    async def add_words(
        self,
        db,
        *,
        group_id: int,
        word_ids: List[int]
    ) -> Group:
        """Add words to a group."""
        # Create word_group relationships
        for word_id in word_ids:
            word_group = WordGroup(group_id=group_id, word_id=word_id)
            db.add(word_group)
        
        await db.flush()
        
        # Update words_count
        await self._update_words_count(db, group_id)
        
        # Return updated group
        return await self.get(db, group_id)

    async def set_words(
        self,
        db,
        *,
        group_id: int,
        word_ids: List[int]
    ) -> None:
        """Replace all words in a group with a new list."""
        # Remove existing relationships
        delete_query = (
            WordGroup.__table__.delete()
            .where(WordGroup.group_id == group_id)
        )
        await db.execute(delete_query)
        
        # Add new relationships
        for word_id in word_ids:
            word_group = WordGroup(group_id=group_id, word_id=word_id)
            db.add(word_group)
        
        await db.flush()
        
        # Update words_count
        await self._update_words_count(db, group_id)

    async def _update_words_count(self, db, group_id: int) -> None:
        """Update the words_count for a group."""
        count_query = (
            select(func.count(WordGroup.word_id))
            .filter(WordGroup.group_id == group_id)
        )
        count = await db.scalar(count_query)
        
        update_query = (
            Group.__table__.update()
            .where(Group.id == group_id)
            .values(words_count=count)
        )
        await db.execute(update_query)

    async def update(
        self,
        db: AsyncSession,
        *,
        id: int,
        obj_in: Union[GroupUpdate, Dict[str, Any]]
    ) -> Optional[Group]:
        """Update a group and optionally update its word list."""
        # Get existing group
        db_obj = await self.get(db, id)
        if not db_obj:
            return None

        if isinstance(obj_in, dict):
            update_data = obj_in
            word_ids = update_data.pop("word_ids", None)
        else:
            update_data = obj_in.dict(exclude={"word_ids"}, exclude_unset=True)
            word_ids = obj_in.word_ids if obj_in.word_ids is not None else None

        # Update basic fields
        for field, value in update_data.items():
            setattr(db_obj, field, value)

        # Update words if provided
        if word_ids is not None:
            await self.set_words(db, group_id=id, word_ids=word_ids)

        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    async def remove(
        self,
        db: AsyncSession,
        *,
        id: int
    ) -> Optional[Group]:
        """Delete a group by ID."""
        obj = await self.get(db, id)
        if not obj:
            return None
            
        await db.delete(obj)
        await db.commit()
        return obj


group = CRUDGroup(Group) 