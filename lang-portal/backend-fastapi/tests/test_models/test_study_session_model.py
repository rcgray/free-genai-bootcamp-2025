import pytest
from datetime import datetime
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from sqlalchemy import select
from app.models.study_session import StudySession
from app.models.group import Group
from app.models.study_activity import StudyActivity
from app.models.word_review_item import WordReviewItem

pytestmark = pytest.mark.asyncio

async def test_study_session_group_relationship(
    db: AsyncSession,
    sample_study_session: StudySession,
    sample_group: Group
):
    """Test the relationship between StudySession and Group models."""
    # Refresh the objects with their relationships loaded
    stmt = select(StudySession).where(StudySession.id == sample_study_session.id).options(
        selectinload(StudySession.group)
    )
    result = await db.execute(stmt)
    session = result.scalar_one()
    
    stmt = select(Group).where(Group.id == sample_group.id).options(
        selectinload(Group.study_sessions)
    )
    result = await db.execute(stmt)
    group = result.scalar_one()
    
    # Test that the session belongs to the correct group
    assert session.group_id == sample_group.id
    assert session.group.id == sample_group.id
    
    # Test that the session is in the group's study_sessions
    assert sample_study_session.id in [s.id for s in group.study_sessions]

async def test_study_session_activity_relationship(
    db: AsyncSession,
    sample_study_session: StudySession,
    sample_study_activity: StudyActivity
):
    """Test the relationship between StudySession and StudyActivity models."""
    # Refresh the objects with their relationships loaded
    stmt = select(StudySession).where(StudySession.id == sample_study_session.id).options(
        selectinload(StudySession.study_activity)
    )
    result = await db.execute(stmt)
    session = result.scalar_one()
    
    # Test that the session belongs to the correct activity
    assert session.study_activity_id == sample_study_activity.id
    assert session.study_activity.id == sample_study_activity.id
    assert session.study_activity.name == "Flashcards"  # From our fixture

async def test_study_session_review_relationship(
    db: AsyncSession,
    sample_study_session: StudySession,
    sample_word_review: WordReviewItem
):
    """Test the relationship between StudySession and WordReviewItem models."""
    # Refresh the objects with their relationships loaded
    stmt = select(StudySession).where(StudySession.id == sample_study_session.id).options(
        selectinload(StudySession.reviews)
    )
    result = await db.execute(stmt)
    session = result.scalar_one()
    
    stmt = select(WordReviewItem).where(WordReviewItem.id == sample_word_review.id).options(
        selectinload(WordReviewItem.study_session)
    )
    result = await db.execute(stmt)
    review = result.scalar_one()
    
    # Test that the review is in the session's reviews
    assert sample_word_review.id in [r.id for r in session.reviews]
    
    # Test that the session reference in review is correct
    assert review.study_session.id == sample_study_session.id
    
    # Test cascade delete - deleting session should remove the review
    await db.delete(sample_study_session)
    await db.commit()
    
    # Verify the review is deleted
    result = await db.get(WordReviewItem, sample_word_review.id)
    assert result is None

async def test_study_session_attributes(
    sample_study_session: StudySession
):
    """Test the StudySession model attributes."""
    assert isinstance(sample_study_session.id, int)
    assert isinstance(sample_study_session.group_id, int)
    assert isinstance(sample_study_session.study_activity_id, int)
    assert isinstance(sample_study_session.created_at, datetime)  # SQLAlchemy maintains this as a datetime object 