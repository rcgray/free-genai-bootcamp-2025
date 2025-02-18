import pytest
from datetime import datetime
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from sqlalchemy import select
from app.models.session import Session
from app.models.group import Group
from app.models.activity import Activity
from app.models.word_review_item import WordReviewItem

pytestmark = pytest.mark.asyncio

async def test_session_group_relationship(
    db: AsyncSession,
    sample_session: Session,
    sample_group: Group
):
    """Test the relationship between Session and Group models."""
    # Refresh the objects with their relationships loaded
    stmt = select(Session).where(Session.id == sample_session.id).options(
        selectinload(Session.group)
    )
    result = await db.execute(stmt)
    session = result.scalar_one()
    
    stmt = select(Group).where(Group.id == sample_group.id).options(
        selectinload(Group.sessions)
    )
    result = await db.execute(stmt)
    group = result.scalar_one()
    
    # Test that the session belongs to the correct group
    assert session.group_id == sample_group.id
    assert session.group.id == sample_group.id
    
    # Test that the session is in the group's sessions
    assert sample_session.id in [s.id for s in group.sessions]

async def test_session_activity_relationship(
    db: AsyncSession,
    sample_session: Session,
    sample_activity: Activity
):
    """Test the relationship between Session and Activity models."""
    # Refresh the objects with their relationships loaded
    stmt = select(Session).where(Session.id == sample_session.id).options(
        selectinload(Session.activity)
    )
    result = await db.execute(stmt)
    session = result.scalar_one()
    
    # Test that the session belongs to the correct activity
    assert session.activity_id == sample_activity.id
    assert session.activity.id == sample_activity.id
    assert session.activity.name == "Flashcards"  # From our fixture

async def test_session_review_relationship(
    db: AsyncSession,
    sample_session: Session,
    sample_word_review: WordReviewItem
):
    """Test the relationship between Session and WordReviewItem models."""
    # Refresh the objects with their relationships loaded
    stmt = select(Session).where(Session.id == sample_session.id).options(
        selectinload(Session.reviews)
    )
    result = await db.execute(stmt)
    session = result.scalar_one()
    
    stmt = select(WordReviewItem).where(WordReviewItem.id == sample_word_review.id).options(
        selectinload(WordReviewItem.session)
    )
    result = await db.execute(stmt)
    review = result.scalar_one()
    
    # Test that the review is in the session's reviews
    assert sample_word_review.id in [r.id for r in session.reviews]
    
    # Test that the session reference in review is correct
    assert review.session.id == sample_session.id
    
    # Test cascade delete - deleting session should remove the review
    await db.delete(sample_session)
    await db.commit()
    
    # Verify the review is deleted
    result = await db.get(WordReviewItem, sample_word_review.id)
    assert result is None

async def test_session_attributes(
    sample_session: Session
):
    """Test the Session model attributes."""
    assert isinstance(sample_session.id, int)
    assert isinstance(sample_session.group_id, (int, type(None)))  # group_id can be None
    assert isinstance(sample_session.activity_id, int)
    assert isinstance(sample_session.created_at, datetime)  # SQLAlchemy maintains this as a datetime object

async def test_session_without_group(
    db: AsyncSession,
    sample_activity: Activity
):
    """Test creating and using a session without a group."""
    # Create a session without a group
    session = Session(
        activity_id=sample_activity.id
    )
    db.add(session)
    await db.commit()
    await db.refresh(session)

    # Verify the session was created correctly
    assert session.id is not None
    assert session.group_id is None
    assert session.activity_id == sample_activity.id
    assert isinstance(session.created_at, datetime)

    # Load the session with its activity relationship
    stmt = select(Session).where(Session.id == session.id).options(
        selectinload(Session.activity)
    )
    result = await db.execute(stmt)
    loaded_session = result.scalar_one()

    # Verify relationships
    assert loaded_session.group is None
    assert loaded_session.activity.id == sample_activity.id

    # Clean up
    await db.delete(session)
    await db.commit()

    # Verify deletion
    result = await db.get(Session, session.id)
    assert result is None 