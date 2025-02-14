import pytest
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.word import Word
from app.schemas.word import WordCreate
from tests.fixtures.test_data import TEST_WORD, TEST_WORD_2


@pytest.fixture
async def test_word(db: AsyncSession) -> Word:
    """Create a test word for testing."""
    word_in = WordCreate(**TEST_WORD)
    db_word = Word(**word_in.model_dump())
    db.add(db_word)
    await db.commit()
    await db.refresh(db_word)
    return db_word


@pytest.fixture
async def test_word_2(db: AsyncSession) -> Word:
    """Create a second test word for testing duplicates."""
    word_in = WordCreate(**TEST_WORD_2)
    db_word = Word(**word_in.model_dump())
    db.add(db_word)
    await db.commit()
    await db.refresh(db_word)
    return db_word 