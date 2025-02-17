import pytest
from datetime import datetime
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.activity import Activity
from app.models.session import Session

pytestmark = pytest.mark.asyncio

async def test_activity_session_relationship(
    db: AsyncSession,
    test_activity: Activity,
    test_session: Session
) -> None:
    """Test the relationship between Activity and Session models."""
    # Verify the session is associated with the activity
    assert test_session.activity_id == test_activity.id
    
    # Verify we can access sessions from the activity
    stmt = select(Activity).where(Activity.id == test_activity.id).options(
        selectinload(Activity.sessions)
    )
    result = await db.execute(stmt)
    activity = result.scalar_one()
    
    assert activity is not None
    assert len(activity.sessions) > 0
    assert any(s.id == test_session.id for s in activity.sessions)

async def test_activity_attributes(
    db: AsyncSession,
    test_activity: Activity
):
    """Test the Activity model attributes."""
    assert isinstance(test_activity.id, int)
    assert isinstance(test_activity.name, str)
    assert isinstance(test_activity.url, str)
    assert isinstance(test_activity.image_url, str)
    assert isinstance(test_activity.description, str)
    assert test_activity.name == "Flashcards"  # From our fixture
    assert test_activity.url == "http://localhost:5173/study/flashcards"  # From our fixture

async def test_activity_creation(db: AsyncSession) -> None:
    """Test creating an activity."""
    activity = Activity(
        name="Test Activity",
        url="http://example.com/test",
        image_url="http://example.com/images/test.png",
        description="Test description"
    )
    db.add(activity)
    await db.commit()
    await db.refresh(activity)

    assert activity.id is not None
    assert activity.name == "Test Activity"
    assert activity.url == "http://example.com/test"
    assert activity.image_url == "http://example.com/images/test.png"
    assert activity.description == "Test description"

    # Clean up
    await db.delete(activity)
    await db.commit()

    # Verify deletion
    result = await db.get(Activity, activity.id)
    assert result is None 