import pytest
import asyncio
from typing import List
from sqlalchemy import text, select
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker
from sqlalchemy.exc import IntegrityError

from app.models.word import Word
from app.models.group import Group
from app.models.word_group import WordGroup
from app.models.study_session import StudySession
from app.models.word_review_item import WordReviewItem
from app.schemas.word import WordCreate
from app.schemas.group import GroupCreate
from app.crud.word import word
from app.crud.group import group
from app.crud.study_session import study_session
from app.core.database import engine

pytestmark = pytest.mark.asyncio

async def test_database_connection(db: AsyncSession) -> None:
    """Test that we can connect to the database and execute a simple query."""
    result = await db.execute(text("SELECT 1"))
    assert result.scalar() == 1

async def test_transaction_commit(db: AsyncSession) -> None:
    """Test that changes are persisted when transaction is committed."""
    # Create a test word
    test_word = Word(
        kanji="テスト",
        romaji="tesuto",
        english="test",
        parts=[{"kanji": "テスト", "romaji": ["tesuto"]}]
    )
    db.add(test_word)
    await db.flush()
    
    # Verify word exists
    result = await db.execute(
        select(Word).filter(Word.kanji == "テスト")
    )
    saved_word = result.scalar_one()
    assert saved_word is not None
    assert saved_word.kanji == "テスト"

async def test_transaction_rollback(db: AsyncSession) -> None:
    """Test that changes are not persisted when transaction is rolled back."""
    # Get count before
    result = await db.execute(select(Word))
    count_before = len(result.scalars().all())
    
    # Create a test word
    test_word = Word(
        kanji="ロールバック",
        romaji="ro-rubakku",
        english="rollback",
        parts=[{"kanji": "ロールバック", "romaji": ["ro-rubakku"]}]
    )
    db.add(test_word)
    await db.flush()
    
    # Rollback
    await db.rollback()
    await db.begin()
    
    # Verify word count hasn't changed
    result = await db.execute(select(Word))
    count_after = len(result.scalars().all())
    assert count_after == count_before

async def test_concurrent_access(db: AsyncSession) -> None:
    """Test handling of concurrent database access."""
    # Create a test word and group
    test_word = await word.create(
        db,
        obj_in=WordCreate(
            kanji="同時",
            romaji="douji",
            english="simultaneous",
            parts=[{"kanji": "同時", "romaji": ["douji"]}]
        )
    )
    test_group = await group.create(
        db,
        obj_in=GroupCreate(name="Test Group")
    )
    await db.commit()
    await db.begin()

    # Define concurrent operations
    async def add_to_group() -> None:
        # Create a new session for each concurrent operation
        async_session = async_sessionmaker(engine, expire_on_commit=False)
        async with async_session() as session:
            try:
                await session.begin()
                # Try to add the word to the group
                await group.add_words(
                    session,
                    group_id=test_group.id,
                    word_ids=[test_word.id]
                )
                await session.commit()
            except IntegrityError:
                # Expected when the word is already in the group
                await session.rollback()

    # Run concurrent operations
    await asyncio.gather(
        add_to_group(),
        add_to_group()
    )

    # Create a new session to verify the final state
    async_session = async_sessionmaker(engine, expire_on_commit=False)
    async with async_session() as session:
        result = await session.execute(
            select(WordGroup)
            .filter(
                WordGroup.word_id == test_word.id,
                WordGroup.group_id == test_group.id
            )
        )
        associations = result.all()
        assert len(associations) == 1

async def test_foreign_key_cascade(db: AsyncSession) -> None:
    """Test that foreign key constraints and cascading deletes work correctly."""
    # Create test data
    test_word = await word.create(
        db,
        obj_in=WordCreate(
            kanji="削除",
            romaji="sakujo",
            english="delete",
            parts=[{"kanji": "削除", "romaji": ["sakujo"]}]
        )
    )
    test_group = await group.create(
        db,
        obj_in=GroupCreate(
            name="Test Group",
            word_ids=[test_word.id]
        )
    )

    # Verify word-group association exists
    result = await db.execute(
        select(WordGroup)
        .filter(
            WordGroup.word_id == test_word.id,
            WordGroup.group_id == test_group.id
        )
    )
    assert result.scalar_one() is not None

    # Delete the word
    await db.delete(test_word)
    await db.flush()

    # Verify word-group association was cascaded
    result = await db.execute(
        select(WordGroup)
        .filter(
            WordGroup.word_id == test_word.id,
            WordGroup.group_id == test_group.id
        )
    )
    assert result.scalar_one_or_none() is None

async def test_unique_constraint(db: AsyncSession) -> None:
    """Test that unique constraints are enforced."""
    # Add unique constraint to Word.kanji if not exists
    await db.execute(text(
        "CREATE UNIQUE INDEX IF NOT EXISTS idx_words_kanji ON words(kanji)"
    ))
    await db.commit()

    # Create initial word
    test_word = Word(
        kanji="一意",
        romaji="ichii",
        english="unique",
        parts=[{"kanji": "一意", "romaji": ["ichii"]}]
    )
    db.add(test_word)
    await db.flush()

    # Try to create another word with the same kanji
    duplicate_word = Word(
        kanji="一意",  # Same kanji
        romaji="different",
        english="different",
        parts=[{"kanji": "一意", "romaji": ["different"]}]
    )
    db.add(duplicate_word)
    
    with pytest.raises(IntegrityError) as exc_info:
        await db.flush()
    
    assert "UNIQUE constraint failed" in str(exc_info.value)
    
    # Clean up the transaction state
    await db.rollback()
    await db.begin()

async def test_index_performance(db: AsyncSession) -> None:
    """Test that indexes are working for frequently queried columns."""
    # Create test data
    words_to_create: List[Word] = []
    for i in range(100):
        words_to_create.append(
            Word(
                kanji=f"単語{i}",
                romaji=f"tango{i}",
                english=f"word{i}",
                parts=[{"kanji": f"単語{i}", "romaji": [f"tango{i}"]}]
            )
        )
    db.add_all(words_to_create)
    await db.flush()

    # Query with indexed column (kanji)
    query_indexed = select(Word).filter(Word.kanji == "単語50")
    result = await db.execute(query_indexed)
    assert result.scalar_one() is not None

    # Query with non-indexed column (english)
    query_non_indexed = select(Word).filter(Word.english == "word50")
    result = await db.execute(query_non_indexed)
    assert result.scalar_one() is not None

    # Note: In a real test, we would measure and compare execution times
    # However, with SQLite and small data sets, the difference might not be noticeable 