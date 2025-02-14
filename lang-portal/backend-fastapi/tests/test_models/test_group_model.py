import pytest
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from sqlalchemy import select
from app.models.group import Group
from app.models.word import Word
from app.models.word_group import WordGroup
from app.models.study_session import StudySession

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

async def test_group_study_session_relationship(
    db: AsyncSession,
    sample_group: Group,
    sample_study_session: StudySession
):
    """Test the relationship between Group and StudySession models."""
    # Refresh the objects with their relationships loaded
    stmt = select(Group).where(Group.id == sample_group.id).options(
        selectinload(Group.study_sessions)
    )
    result = await db.execute(stmt)
    group = result.scalar_one()
    
    stmt = select(StudySession).where(StudySession.id == sample_study_session.id).options(
        selectinload(StudySession.group)
    )
    result = await db.execute(stmt)
    session = result.scalar_one()
    
    # Test that the session is in the group's study_sessions
    assert sample_study_session.id in [s.id for s in group.study_sessions]
    
    # Test that the group reference in session is correct
    assert session.group.id == sample_group.id
    
    # Test cascade delete - deleting group should remove the study session
    await db.delete(sample_group)
    await db.commit()
    
    # Verify the study session is deleted
    result = await db.get(StudySession, sample_study_session.id)
    assert result is None

async def test_group_attributes(
    sample_group: Group
):
    """Test the Group model attributes."""
    assert isinstance(sample_group.id, int)
    assert isinstance(sample_group.name, str)
    assert isinstance(sample_group.words_count, int)
    assert sample_group.name == "Animals"  # From our fixture
    assert sample_group.words_count == 0  # Initial value from our fixture 