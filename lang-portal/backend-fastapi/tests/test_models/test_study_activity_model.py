import pytest
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from sqlalchemy import select
from app.models.study_activity import StudyActivity
from app.models.study_session import StudySession

pytestmark = pytest.mark.asyncio

async def test_study_activity_session_relationship(
    db: AsyncSession,
    sample_study_activity: StudyActivity,
    sample_study_session: StudySession
):
    """Test the relationship between StudyActivity and StudySession models."""
    # Refresh the objects with their relationships loaded
    stmt = select(StudyActivity).where(StudyActivity.id == sample_study_activity.id).options(
        selectinload(StudyActivity.study_sessions)
    )
    result = await db.execute(stmt)
    activity = result.scalar_one()
    
    stmt = select(StudySession).where(StudySession.id == sample_study_session.id).options(
        selectinload(StudySession.study_activity)
    )
    result = await db.execute(stmt)
    session = result.scalar_one()
    
    # Test that the session belongs to the correct activity
    assert session.study_activity_id == sample_study_activity.id
    assert session.study_activity.id == sample_study_activity.id
    
    # Test that the session is in the activity's study_sessions
    assert sample_study_session.id in [s.id for s in activity.study_sessions]
    
    # First delete the study session since it has a NOT NULL constraint on study_activity_id
    await db.delete(sample_study_session)
    await db.commit()
    
    # Now we can safely delete the activity
    await db.delete(sample_study_activity)
    await db.commit()
    
    # Verify both are deleted
    result = await db.get(StudySession, sample_study_session.id)
    assert result is None
    
    result = await db.get(StudyActivity, sample_study_activity.id)
    assert result is None

async def test_study_activity_attributes(
    sample_study_activity: StudyActivity
):
    """Test the StudyActivity model attributes."""
    assert isinstance(sample_study_activity.id, int)
    assert isinstance(sample_study_activity.name, str)
    assert isinstance(sample_study_activity.url, str)
    assert sample_study_activity.name == "Flashcards"  # From our fixture
    assert sample_study_activity.url == "http://example.com/flashcards"  # From our fixture 