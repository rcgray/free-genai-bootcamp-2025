from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.group import group
from app.crud.word import word
from app.models.group import Group
from app.schemas.group import GroupCreate
from app.core.exceptions import AppHTTPException


class GroupService:
    @staticmethod
    async def create_group(
        db: AsyncSession,
        *,
        name: str,
        word_ids: Optional[List[int]] = None
    ) -> Group:
        """
        Create a new group and optionally add words to it.
        """
        # Create group
        group_in = GroupCreate(name=name)
        db_group = await group.create(db, obj_in=group_in)

        # Add words if provided
        if word_ids:
            try:
                db_group = await group.add_words(
                    db,
                    group_id=db_group.id,
                    word_ids=word_ids
                )
            except ValueError as e:
                # Clean up the created group if word addition fails
                await group.remove(db, id=db_group.id)
                raise AppHTTPException(
                    status_code=400,
                    detail=str(e)
                )

        return db_group

    @staticmethod
    async def update_group_words(
        db: AsyncSession,
        *,
        group_id: int,
        add_word_ids: Optional[List[int]] = None,
        remove_word_ids: Optional[List[int]] = None
    ) -> Group:
        """
        Update a group's word list by adding and/or removing words.
        """
        db_group = await group.get_with_words(db, group_id)
        if not db_group:
            raise AppHTTPException(
                status_code=404,
                detail=f"Group {group_id} not found"
            )

        if add_word_ids:
            db_group = await group.add_words(
                db,
                group_id=group_id,
                word_ids=add_word_ids
            )

        if remove_word_ids:
            db_group = await group.remove_words(
                db,
                group_id=group_id,
                word_ids=remove_word_ids
            )

        return db_group


group_service = GroupService() 