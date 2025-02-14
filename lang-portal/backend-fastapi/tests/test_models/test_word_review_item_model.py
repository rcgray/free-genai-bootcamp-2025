import pytest
from datetime import datetime
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from sqlalchemy import select
from app.models.word_review_item import WordReviewItem
from app.models.word import Word
from app.models.study_session import StudySession

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
    sample_study_session: StudySession
):
    """Test the relationship between WordReviewItem and StudySession models."""
    # Refresh the objects with their relationships loaded
    stmt = select(WordReviewItem).where(WordReviewItem.id == sample_word_review.id).options(
        selectinload(WordReviewItem.study_session)
    )
    result = await db.execute(stmt)
    review = result.scalar_one()
    
    stmt = select(StudySession).where(StudySession.id == sample_study_session.id).options(
        selectinload(StudySession.reviews)
    )
    result = await db.execute(stmt)
    session = result.scalar_one()
    
    # Test that the review belongs to the correct session
    assert review.study_session_id == sample_study_session.id
    assert review.study_session.id == sample_study_session.id
    
    # Test that the review is in the session's reviews
    assert sample_word_review.id in [r.id for r in session.reviews]

async def test_word_review_attributes(
    sample_word_review: WordReviewItem
):
    """Test the WordReviewItem model attributes."""
    assert isinstance(sample_word_review.id, int)
    assert isinstance(sample_word_review.word_id, int)
    assert isinstance(sample_word_review.study_session_id, int)
    assert isinstance(sample_word_review.correct, bool)
    assert isinstance(sample_word_review.created_at, datetime)
    assert sample_word_review.correct is True  # From our fixture 