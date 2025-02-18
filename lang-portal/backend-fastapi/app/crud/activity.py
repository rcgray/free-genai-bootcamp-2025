from typing import List, Optional, Tuple
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.base import CRUDBase
from app.models.activity import Activity
from app.schemas.activity import ActivityCreate, ActivityUpdate


class CRUDActivity(CRUDBase[Activity, ActivityCreate, ActivityUpdate]):
    async def get_multi(
        self,
        db: AsyncSession,
        *,
        skip: int = 0,
        limit: int = 100,
        order_by: Optional[str] = None,
        order: Optional[str] = "asc"
    ) -> Tuple[List[Activity], int]:
        """Get multiple activities with pagination and total count."""
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

    async def create(
        self,
        db: AsyncSession,
        *,
        obj_in: ActivityCreate
    ) -> Activity:
        """Create a new activity, converting HttpUrl to string."""
        db_obj = Activity(
            name=obj_in.name,
            url=str(obj_in.url),
            description=obj_in.description
        )
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    async def update(
        self,
        db: AsyncSession,
        *,
        db_obj: Activity,
        obj_in: ActivityUpdate
    ) -> Activity:
        """Update an activity, converting HttpUrl to string if provided."""
        update_data = obj_in.model_dump(exclude_unset=True)
        if "url" in update_data and update_data["url"] is not None:
            update_data["url"] = str(update_data["url"])
        
        for field in update_data:
            setattr(db_obj, field, update_data[field])
        
        await db.commit()
        await db.refresh(db_obj)
        return db_obj


activity = CRUDActivity(Activity) 