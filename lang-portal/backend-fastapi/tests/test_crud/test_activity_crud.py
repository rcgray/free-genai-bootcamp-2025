import pytest
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.activity import activity
from app.models.activity import Activity
from app.schemas.activity import ActivityCreate, ActivityUpdate
from tests.fixtures.test_data import TEST_ACTIVITY


async def test_create_activity(db: AsyncSession):
    """Test creating a new activity."""
    activity_in = ActivityCreate(**TEST_ACTIVITY)
    db_activity = await activity.create(db, obj_in=activity_in)
    assert db_activity.name == TEST_ACTIVITY["name"]
    assert db_activity.url == TEST_ACTIVITY["url"]
    assert db_activity.description == TEST_ACTIVITY["description"]


async def test_get_activity(db: AsyncSession):
    """Test getting an activity by ID."""
    # Create activity
    activity_in = ActivityCreate(**TEST_ACTIVITY)
    db_activity = await activity.create(db, obj_in=activity_in)
    
    # Get activity
    stored_activity = await activity.get(db, id=db_activity.id)
    assert stored_activity
    assert stored_activity.name == TEST_ACTIVITY["name"]
    assert stored_activity.url == TEST_ACTIVITY["url"]
    assert stored_activity.description == TEST_ACTIVITY["description"]


async def test_get_multi_activities(db: AsyncSession):
    """Test getting multiple activities with pagination and sorting."""
    # Create test activities
    activity_1 = ActivityCreate(
        name="Activity 1",
        url="http://example.com/1",
        description="First activity"
    )
    activity_2 = ActivityCreate(
        name="Activity 2",
        url="http://example.com/2",
        description="Second activity"
    )
    
    await activity.create(db, obj_in=activity_1)
    await activity.create(db, obj_in=activity_2)
    
    # Test default listing
    activities, total = await activity.get_multi(db)
    assert total >= 2  # Could be more from other tests
    assert len(activities) >= 2
    
    # Test pagination
    activities_page1, total = await activity.get_multi(
        db,
        skip=0,
        limit=1
    )
    assert len(activities_page1) == 1
    
    # Test sorting
    activities_asc, _ = await activity.get_multi(
        db,
        order_by="name",
        order="asc"
    )
    activities_desc, _ = await activity.get_multi(
        db,
        order_by="name",
        order="desc"
    )
    
    # Verify sorting
    assert activities_asc[0].name <= activities_asc[-1].name
    assert activities_desc[0].name >= activities_desc[-1].name


async def test_update_activity(db: AsyncSession):
    """Test updating an activity."""
    # Create activity
    activity_in = ActivityCreate(**TEST_ACTIVITY)
    db_activity = await activity.create(db, obj_in=activity_in)
    
    # Update data
    update_data = {
        "name": "Updated Activity",
        "url": "http://example.com/updated",
        "description": "Updated description"
    }
    activity_update = ActivityUpdate(**update_data)
    
    # Update activity
    updated_activity = await activity.update(
        db,
        db_obj=db_activity,
        obj_in=activity_update
    )
    
    assert updated_activity.name == update_data["name"]
    assert updated_activity.url == update_data["url"]
    assert updated_activity.description == update_data["description"]


async def test_delete_activity(db: AsyncSession):
    """Test deleting an activity."""
    # Create activity
    activity_in = ActivityCreate(**TEST_ACTIVITY)
    db_activity = await activity.create(db, obj_in=activity_in)
    
    # Delete activity
    deleted_activity = await activity.remove(db, id=db_activity.id)
    assert deleted_activity.id == db_activity.id
    
    # Verify it's deleted
    stored_activity = await activity.get(db, id=db_activity.id)
    assert stored_activity is None 