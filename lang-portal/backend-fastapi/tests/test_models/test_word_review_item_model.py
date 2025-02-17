import pytest
from datetime import datetime
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from sqlalchemy import select
from app.models.word_review_item import WordReviewItem
from app.models.word import Word
from app.models.session import Session

pytestmark = pytest.mark.asyncio

async def test_word_review_word_relationship(
    db: AsyncSession,
    sample_word_review: WordReviewItem,
    sample_word: Word
):
    """Test the relationship between WordReviewItem and Word models."""
    # Refresh the objects with their relationships loaded
    stmt = select(WordReviewItem).where(WordReviewItem.id == sample_word_review.id).options(
        selectinload(WordReviewItem.word)
    )
    result = await db.execute(stmt)
    review = result.scalar_one()
    
    stmt = select(Word).where(Word.id == sample_word.id).options(
        selectinload(Word.reviews)
    )
    result = await db.execute(stmt)
    word = result.scalar_one()
    
    # Test that the review belongs to the correct word
    assert review.word_id == sample_word.id
    assert review.word.id == sample_word.id
    
    # Test that the review is in the word's reviews
    assert sample_word_review.id in [r.id for r in word.reviews]

async def test_word_review_session_relationship(
    db: AsyncSession,
    sample_word_review: WordReviewItem,
    sample_session: Session
):
    """Test the relationship between WordReviewItem and Session models."""
    # Refresh the objects with their relationships loaded
    stmt = select(WordReviewItem).where(WordReviewItem.id == sample_word_review.id).options(
        selectinload(WordReviewItem.session)
    )
    result = await db.execute(stmt)
    review = result.scalar_one()
    
    stmt = select(Session).where(Session.id == sample_session.id).options(
        selectinload(Session.reviews)
    )
    result = await db.execute(stmt)
    session = result.scalar_one()
    
    # Test that the review belongs to the correct session
    assert review.session_id == sample_session.id
    assert review.session.id == sample_session.id
    
    # Test that the review is in the session's reviews
    assert sample_word_review.id in [r.id for r in session.reviews]
    
    # Test cascade delete - deleting session should remove the review
    await db.delete(sample_session)
    await db.commit()
    
    # Verify the review is deleted
    result = await db.get(WordReviewItem, sample_word_review.id)
    assert result is None

async def test_word_review_attributes(
    sample_word_review: WordReviewItem
):
    """Test the WordReviewItem model attributes."""
    assert isinstance(sample_word_review.id, int)
    assert isinstance(sample_word_review.word_id, int)
    assert isinstance(sample_word_review.session_id, int)
    assert isinstance(sample_word_review.correct, bool)
    assert isinstance(sample_word_review.created_at, datetime)
    assert sample_word_review.correct is True  # From our fixture 