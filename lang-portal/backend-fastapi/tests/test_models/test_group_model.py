import pytest
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from sqlalchemy import select
from app.models.group import Group
from app.models.word import Word
from app.models.word_group import WordGroup
from app.models.session import Session
from sqlalchemy.exc import IntegrityError

pytestmark = pytest.mark.asyncio

async def test_group_word_relationship(
    db: AsyncSession,
    sample_group: Group,
    sample_word: Word,
    sample_word_group
):
    """Test the relationship between Group and Word models."""
    # Refresh the objects with their relationships loaded
    stmt = select(Group).where(Group.id == sample_group.id).options(
        selectinload(Group.word_groups).selectinload(WordGroup.word)
    )
    result = await db.execute(stmt)
    group = result.scalar_one()
    
    stmt = select(Word).where(Word.id == sample_word.id).options(
        selectinload(Word.word_groups).selectinload(WordGroup.group)
    )
    result = await db.execute(stmt)
    word = result.scalar_one()
    
    # Test that the word is in the group's words through word_groups
    assert any(wg.word_id == sample_word.id for wg in group.word_groups)
    
    # Test that the group is in the word's groups through word_groups
    assert any(wg.group_id == sample_group.id for wg in word.word_groups)
    
    # Test cascade delete - deleting group should remove the word_group association
    await db.delete(sample_group)
    await db.commit()
    
    # Verify the word_group association is deleted
    stmt = select(WordGroup).where(WordGroup.group_id == sample_group.id)
    result = await db.execute(stmt)
    word_groups = result.scalars().all()
    assert len(word_groups) == 0

async def test_group_session_relationship(
    db: AsyncSession,
    test_group: Group,
    test_session: Session
):
    """Test the relationship between Group and Session models."""
    # Refresh the objects with their relationships loaded
    stmt = select(Group).where(Group.id == test_group.id).options(
        selectinload(Group.sessions)
    )
    result = await db.execute(stmt)
    group = result.scalar_one()

    stmt = select(Session).where(Session.id == test_session.id).options(
        selectinload(Session.group)
    )
    result = await db.execute(stmt)
    session = result.scalar_one()

    # Test that the session is in the group's sessions
    assert test_session.id in [s.id for s in group.sessions]

    # Test that the group is in the session's group
    assert session.group_id == test_group.id

    # Test that deleting group sets session's group_id to NULL
    await db.delete(group)
    await db.commit()

    # Verify session still exists but has no group
    stmt = select(Session).where(Session.id == test_session.id)
    result = await db.execute(stmt)
    session = result.scalar_one()
    assert session.group_id is None

async def test_group_attributes(
    sample_group: Group
):
    """Test the Group model attributes."""
    assert isinstance(sample_group.id, int)
    assert isinstance(sample_group.name, str)
    assert isinstance(sample_group.words_count, int)
    assert sample_group.name == "Animals"  # From our fixture
    assert sample_group.words_count == 0  # Initial value from our fixture 