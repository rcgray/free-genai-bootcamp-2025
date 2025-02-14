import pytest
from sqlalchemy.ext.asyncio import AsyncSession

from app.services.word_service import WordService
from app.models.word import Word
from app.schemas.word import WordUpdate
from app.core.exceptions import AppHTTPException

pytestmark = pytest.mark.asyncio

async def test_get_word(db: AsyncSession, test_word: Word) -> None:
    """Test retrieving a single word by ID."""
    word = await WordService.get_word(db, test_word.id)
    assert word is not None
    assert word.id == test_word.id
    assert word.kanji == test_word.kanji
    assert word.romaji == test_word.romaji
    assert word.english == test_word.english
    assert word.parts == test_word.parts

async def test_get_nonexistent_word(db: AsyncSession) -> None:
    """Test retrieving a nonexistent word returns None."""
    word = await WordService.get_word(db, 999999)
    assert word is None

async def test_get_words_with_stats(db: AsyncSession, test_word: Word) -> None:
    """Test retrieving paginated words with review statistics."""
    words, total = await WordService.get_words_with_stats(
        db,
        skip=0,
        limit=10,
        order_by="romaji",
        order="asc"
    )
    assert len(words) > 0
    assert total > 0
    assert any(w.id == test_word.id for w in words)

async def test_create_word(db: AsyncSession) -> None:
    """Test creating a new word."""
    word = await WordService.create_word(
        db,
        kanji="新しい",
        romaji="atarashii",
        english="new",
        parts=[
            {"kanji": "新", "romaji": ["atara"]},
            {"kanji": "しい", "romaji": ["shii"]}
        ]
    )
    assert word.id is not None
    assert word.kanji == "新しい"
    assert word.romaji == "atarashii"
    assert word.english == "new"
    assert len(word.parts) == 2

async def test_create_duplicate_word(db: AsyncSession, test_word: Word) -> None:
    """Test creating a word with duplicate kanji raises error."""
    with pytest.raises(ValueError) as exc_info:
        await WordService.create_word(
            db,
            kanji=test_word.kanji,
            romaji="different",
            english="different",
            parts=[{"kanji": test_word.kanji, "romaji": ["different"]}]
        )
    assert "already exists" in str(exc_info.value)

async def test_update_word(db: AsyncSession, test_word: Word) -> None:
    """Test updating an existing word."""
    word_update = WordUpdate(
        english="updated english",
        parts=[{"kanji": test_word.kanji, "romaji": ["updated"]}]
    )
    updated_word = await WordService.update_word(
        db,
        word_id=test_word.id,
        word_in=word_update
    )
    assert updated_word.id == test_word.id
    assert updated_word.english == "updated english"
    assert len(updated_word.parts) == 1

async def test_update_nonexistent_word(db: AsyncSession) -> None:
    """Test updating a nonexistent word raises error."""
    word_update = WordUpdate(english="updated")
    with pytest.raises(ValueError) as exc_info:
        await WordService.update_word(
            db,
            word_id=999999,
            word_in=word_update
        )
    assert "not found" in str(exc_info.value)

async def test_update_word_duplicate_kanji(
    db: AsyncSession,
    test_word: Word,
    test_word_2: Word
) -> None:
    """Test updating a word with duplicate kanji raises error."""
    word_update = WordUpdate(kanji=test_word_2.kanji)
    with pytest.raises(ValueError) as exc_info:
        await WordService.update_word(
            db,
            word_id=test_word.id,
            word_in=word_update
        )
    assert "already exists" in str(exc_info.value)

async def test_delete_word(db: AsyncSession, test_word: Word) -> None:
    """Test deleting a word."""
    await WordService.delete_word(db, word_id=test_word.id)
    deleted_word = await WordService.get_word(db, test_word.id)
    assert deleted_word is None 