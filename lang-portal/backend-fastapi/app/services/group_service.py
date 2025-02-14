from typing import List, Optional, Tuple
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.group import group
from app.crud.word import word
from app.models.group import Group
from app.models.word import Word
from app.schemas.group import GroupCreate, GroupUpdate


class GroupService:
    @staticmethod
    async def get_group(db: AsyncSession, group_id: int) -> Optional[Group]:
        """Get a single group by ID."""
        return await group.get(db, group_id)

    @staticmethod
    async def get_groups(
        db: AsyncSession,
        *,
        skip: int = 0,
        limit: int = 100,
        order_by: Optional[str] = None,
        order: Optional[str] = "asc"
    ) -> Tuple[List[Group], int]:
        """
        Get groups with their word counts.
        
        Args:
            skip: Number of records to skip
            limit: Maximum number of records to return
            order_by: Field to sort by
            order: Sort order ('asc' or 'desc')
        """
        return await group.get_multi(
            db,
            skip=skip,
            limit=limit,
            order_by=order_by,
            order=order
        )

    @staticmethod
    async def get_group_words(
        db: AsyncSession,
        *,
        group_id: int,
        skip: int = 0,
        limit: int = 100,
        order_by: Optional[str] = None,
        order: Optional[str] = "asc"
    ) -> Tuple[List[Word], int]:
        """Get paginated words for a specific group."""
        return await group.get_group_words(
            db,
            group_id=group_id,
            skip=skip,
            limit=limit,
            order_by=order_by,
            order=order
        )

    @staticmethod
    async def create_group(
        db: AsyncSession,
        *,
        name: str,
        word_ids: Optional[List[int]] = None
    ) -> Group:
        """
        Create a new group and optionally add words to it.
        
        Raises:
            ValueError: If any of the word_ids don't exist or if group name already exists
        """
        # Check if group with same name exists
        query = select(Group).where(Group.name == name)
        result = await db.execute(query)
        if result.scalar_one_or_none():
            raise ValueError(f"Group with name '{name}' already exists")

        # Verify all words exist if word_ids provided
        if word_ids:
            for word_id in word_ids:
                if not await word.get(db, word_id):
                    raise ValueError(f"Word with ID {word_id} not found")

        # Create group with words
        group_in = GroupCreate(name=name, word_ids=word_ids)
        db_group = await group.create(db, obj_in=group_in)

        return db_group

    @staticmethod
    async def update_group(
        db: AsyncSession,
        *,
        group_id: int,
        group_in: GroupUpdate
    ) -> Group:
        """
        Update a group and optionally update its word list.
        
        Raises:
            ValueError: If any of the word_ids don't exist
        """
        if group_in.word_ids is not None:
            # Verify all words exist
            for word_id in group_in.word_ids:
                if not await word.get(db, word_id):
                    raise ValueError(f"Word with ID {word_id} not found")

            # Update word list
            await group.set_words(
                db,
                group_id=group_id,
                word_ids=group_in.word_ids
            )

        return await group.update(db, id=group_id, obj_in=group_in)

    @staticmethod
    async def delete_group(db: AsyncSession, *, group_id: int) -> None:
        """Delete a group by ID."""
        await group.remove(db, id=group_id) 