import pytest
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from sqlalchemy import select
from app.models.word import Word
from app.models.group import Group
from app.models.word_review_item import WordReviewItem
from app.models.word_group import WordGroup

pytestmark = pytest.mark.asyncio

async def test_word_group_relationship(
    db: AsyncSession,
    sample_word: Word,
    sample_group: Group,
    sample_word_group
):
    """Test the relationship between Word and Group models."""
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
    
    # Test cascade delete - deleting word should remove the word_group association
    await db.delete(sample_word)
    await db.commit()
    
    # Verify the word_group association is deleted
    stmt = select(WordGroup).where(WordGroup.word_id == sample_word.id)
    result = await db.execute(stmt)
    word_groups = result.scalars().all()
    assert len(word_groups) == 0

async def test_word_review_relationship(
    db: AsyncSession,
    sample_word: Word,
    sample_word_review: WordReviewItem
):
    """Test the relationship between Word and WordReviewItem models."""
    # Refresh the objects with their relationships loaded
    stmt = select(Word).where(Word.id == sample_word.id).options(selectinload(Word.reviews))
    result = await db.execute(stmt)
    word = result.scalar_one()
    
    stmt = select(WordReviewItem).where(WordReviewItem.id == sample_word_review.id).options(selectinload(WordReviewItem.word))
    result = await db.execute(stmt)
    review = result.scalar_one()
    
    # Test that the review is in the word's reviews
    assert sample_word_review.id in [r.id for r in word.reviews]
    
    # Test that the word reference in review is correct
    assert review.word.id == sample_word.id
    
    # Test cascade delete - deleting word should remove the review
    await db.delete(sample_word)
    await db.commit()
    
    # Verify the review is deleted
    result = await db.get(WordReviewItem, sample_word_review.id)
    assert result is None

async def test_word_attributes(
    sample_word: Word
):
    """Test the Word model attributes."""
    assert isinstance(sample_word.id, int)
    assert isinstance(sample_word.kanji, str)
    assert isinstance(sample_word.romaji, str)
    assert isinstance(sample_word.english, str)
    assert isinstance(sample_word.parts, list)
    assert len(sample_word.parts) > 0
    assert isinstance(sample_word.parts[0], dict)
    assert "kanji" in sample_word.parts[0]
    assert "romaji" in sample_word.parts[0]
    assert isinstance(sample_word.parts[0]["romaji"], list) 