from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.schemas.activity import Activity, ActivityCreate, ActivityUpdate
from app.schemas.base import PaginatedResponse
from app.services.activity_service import ActivityService
from app.core.exceptions import AppHTTPException

router = APIRouter()

@router.get("", response_model=PaginatedResponse[Activity])
async def get_activities(
    page: int = Query(1, ge=1, description="Page number"),
    per_page: int = Query(20, ge=1, le=100, description="Items per page"),
    sort_by: str = Query("name", regex="^(name)$", description="Field to sort by"),
    order: str = Query("asc", regex="^(asc|desc)$", description="Sort order"),
    db: AsyncSession = Depends(get_db),
):
    """
    Get paginated list of activities.
    
    Parameters:
        page: Page number (starts from 1)
        per_page: Number of items per page (max 100)
        sort_by: Field to sort by (name)
        order: Sort order (asc or desc)
    """
    skip = (page - 1) * per_page
    activities, total = await ActivityService.get_activities(
        db,
        skip=skip,
        limit=per_page,
        order_by=sort_by,
        order=order
    )
    
    total_pages = (total + per_page - 1) // per_page
    
    return {
        "items": [Activity.model_validate(a) for a in activities],
        "total": total,
        "page": page,
        "per_page": per_page,
        "total_pages": total_pages
    }

@router.get("/{activity_id}", response_model=Activity)
async def get_activity(
    activity_id: int,
    db: AsyncSession = Depends(get_db),
):
    """
    Get an activity by ID.
    
    Parameters:
        activity_id: ID of the activity to retrieve
    
    Returns:
        The activity if found
    
    Raises:
        AppHTTPException: If the activity is not found
    """
    db_activity = await ActivityService.get_activity(db, activity_id)
    if not db_activity:
        raise AppHTTPException(status_code=404, detail=f"Activity {activity_id} not found")
    return Activity.model_validate(db_activity)

@router.post("", response_model=Activity)
async def create_activity(
    *,
    activity_in: ActivityCreate,
    db: AsyncSession = Depends(get_db),
):
    """
    Create a new activity.
    
    Parameters:
        activity_in: Activity data including name, url, and description
    
    Returns:
        The created activity
    
    Raises:
        AppHTTPException: If an activity with the same name already exists
    """
    try:
        db_activity = await ActivityService.create_activity(
            db,
            name=activity_in.name,
            url=str(activity_in.url),
            description=activity_in.description
        )
        return Activity.model_validate(db_activity)
    except ValueError as e:
        raise AppHTTPException(status_code=400, detail=str(e))

@router.put("/{activity_id}", response_model=Activity)
async def update_activity(
    *,
    activity_id: int,
    activity_in: ActivityUpdate,
    db: AsyncSession = Depends(get_db),
):
    """
    Update an activity.
    
    Parameters:
        activity_id: ID of the activity to update
        activity_in: Updated activity data
    
    Returns:
        The updated activity
    
    Raises:
        AppHTTPException: If the activity doesn't exist or if there's a conflict
    """
    try:
        updated_activity = await ActivityService.update_activity(
            db,
            activity_id=activity_id,
            activity_in=activity_in
        )
        return Activity.model_validate(updated_activity)
    except ValueError as e:
        if "not found" in str(e).lower():
            raise AppHTTPException(status_code=404, detail=str(e))
        raise AppHTTPException(status_code=400, detail=str(e))

@router.delete("/{activity_id}")
async def delete_activity(
    *,
    activity_id: int,
    db: AsyncSession = Depends(get_db),
):
    """
    Delete an activity.
    
    Parameters:
        activity_id: ID of the activity to delete
    
    Raises:
        AppHTTPException: If the activity doesn't exist
    """
    db_activity = await ActivityService.get_activity(db, activity_id)
    if not db_activity:
        raise AppHTTPException(status_code=404, detail=f"Activity {activity_id} not found")
    
    await ActivityService.delete_activity(db, activity_id=activity_id)
    return {
        "data": {"status": "success"},
        "error": None
    } 