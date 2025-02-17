from typing import List, Optional, Tuple
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.activity import activity
from app.models.activity import Activity
from app.schemas.activity import ActivityCreate, ActivityUpdate


class ActivityService:
    @staticmethod
    async def get_activity(
        db: AsyncSession,
        activity_id: int
    ) -> Optional[Activity]:
        """Get a single activity by ID."""
        return await activity.get(db, activity_id)

    @staticmethod
    async def get_activities(
        db: AsyncSession,
        *,
        skip: int = 0,
        limit: int = 100,
        order_by: Optional[str] = None,
        order: Optional[str] = "asc"
    ) -> Tuple[List[Activity], int]:
        """
        Get activities with pagination and sorting.
        
        Args:
            skip: Number of records to skip
            limit: Maximum number of records to return
            order_by: Field to sort by
            order: Sort order ('asc' or 'desc')
            
        Returns:
            Tuple of (list of activities, total count)
        """
        return await activity.get_multi(
            db,
            skip=skip,
            limit=limit,
            order_by=order_by,
            order=order
        )

    @staticmethod
    async def create_activity(
        db: AsyncSession,
        *,
        name: str,
        url: str,
        image_url: str,
        description: str
    ) -> Activity:
        """
        Create a new activity with validation.
        
        Args:
            name: Name of the activity
            url: URL for the activity
            image_url: URL for the activity's image
            description: Description of the activity
        
        Raises:
            ValueError: If an activity with the same name already exists
        """
        # Check for duplicate name
        query = select(Activity).filter(Activity.name == name)
        result = await db.execute(query)
        if result.scalar_one_or_none():
            raise ValueError(f"Activity with name '{name}' already exists")

        activity_in = ActivityCreate(
            name=name,
            url=url,
            image_url=image_url,
            description=description
        )
        return await activity.create(db, obj_in=activity_in)

    @staticmethod
    async def update_activity(
        db: AsyncSession,
        *,
        activity_id: int,
        activity_in: ActivityUpdate
    ) -> Activity:
        """
        Update an existing activity.
        
        Args:
            activity_id: ID of the activity to update
            activity_in: Update data including optional name, url, image_url, and description
        
        Raises:
            ValueError: If updating to a name that already exists
        """
        if activity_in.name:
            # Check for duplicate name if it's being updated
            query = select(Activity).filter(
                Activity.name == activity_in.name,
                Activity.id != activity_id
            )
            result = await db.execute(query)
            if result.scalar_one_or_none():
                raise ValueError(
                    f"Another activity with name '{activity_in.name}' already exists"
                )

        # First get the existing activity
        db_obj = await activity.get(db, activity_id)
        if not db_obj:
            raise ValueError(f"Activity with id {activity_id} not found")

        # Then update it
        return await activity.update(db, db_obj=db_obj, obj_in=activity_in)

    @staticmethod
    async def delete_activity(
        db: AsyncSession,
        *,
        activity_id: int
    ) -> None:
        """Delete an activity by ID."""
        await activity.remove(db, id=activity_id) 