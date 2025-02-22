import pytest
from sqlalchemy.ext.asyncio import AsyncSession

from app.services.activity_service import ActivityService
from app.models.activity import Activity
from app.schemas.activity import ActivityUpdate
from app.core.exceptions import AppHTTPException
from tests.fixtures.test_data import TEST_ACTIVITY

pytestmark = pytest.mark.asyncio

async def test_get_activity(db: AsyncSession, test_activity: Activity) -> None:
    """Test retrieving a single activity by ID."""
    activity = await ActivityService.get_activity(db, test_activity.id)
    assert activity is not None
    assert activity.id == test_activity.id
    assert activity.name == test_activity.name
    assert str(activity.url) == str(test_activity.url)
    assert activity.description == test_activity.description

async def test_get_nonexistent_activity(db: AsyncSession) -> None:
    """Test retrieving a nonexistent activity returns None."""
    activity = await ActivityService.get_activity(db, 999999)
    assert activity is None

async def test_get_activities(db: AsyncSession, test_activity: Activity) -> None:
    """Test retrieving paginated activities."""
    activities, total = await ActivityService.get_activities(
        db,
        skip=0,
        limit=10,
        order_by="name",
        order="asc"
    )
    assert len(activities) > 0
    assert total > 0
    assert any(a.id == test_activity.id for a in activities)

async def test_create_activity(db: AsyncSession) -> None:
    """Test creating a new activity."""
    activity = await ActivityService.create_activity(
        db,
        name="New Activity",
        url="http://example.com/new",
        description="A new test activity"
    )
    assert activity.id is not None
    assert activity.name == "New Activity"
    assert str(activity.url) == "http://example.com/new"
    assert activity.description == "A new test activity"

async def test_create_duplicate_activity(db: AsyncSession, test_activity: Activity) -> None:
    """Test creating an activity with duplicate name raises error."""
    with pytest.raises(ValueError) as exc_info:
        await ActivityService.create_activity(
            db,
            name=test_activity.name,
            url="http://example.com/different",
            description="Different description"
        )
    assert "already exists" in str(exc_info.value)

async def test_update_activity(db: AsyncSession, test_activity: Activity) -> None:
    """Test updating an existing activity."""
    activity_update = ActivityUpdate(
        name="Updated Activity",
        description="Updated description"
    )
    updated_activity = await ActivityService.update_activity(
        db,
        activity_id=test_activity.id,
        activity_in=activity_update
    )
    assert updated_activity.id == test_activity.id
    assert updated_activity.name == "Updated Activity"
    assert updated_activity.description == "Updated description"
    # Unchanged fields should remain the same
    assert updated_activity.url == test_activity.url

async def test_update_nonexistent_activity(db: AsyncSession) -> None:
    """Test updating a nonexistent activity raises error."""
    activity_update = ActivityUpdate(name="Updated")
    with pytest.raises(ValueError) as exc_info:
        await ActivityService.update_activity(
            db,
            activity_id=999999,
            activity_in=activity_update
        )
    assert "not found" in str(exc_info.value)

async def test_update_activity_duplicate_name(
    db: AsyncSession,
    test_activity: Activity,
    test_activity_2: Activity
) -> None:
    """Test updating an activity with duplicate name raises error."""
    activity_update = ActivityUpdate(name=test_activity_2.name)
    with pytest.raises(ValueError) as exc_info:
        await ActivityService.update_activity(
            db,
            activity_id=test_activity.id,
            activity_in=activity_update
        )
    assert "already exists" in str(exc_info.value)

async def test_delete_activity(db: AsyncSession, test_activity: Activity) -> None:
    """Test deleting an activity."""
    await ActivityService.delete_activity(db, activity_id=test_activity.id)
    deleted_activity = await ActivityService.get_activity(db, test_activity.id)
    assert deleted_activity is None 