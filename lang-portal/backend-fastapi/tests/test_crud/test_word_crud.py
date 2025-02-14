import pytest
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from app.crud.word import word
from app.schemas.word import WordCreate
from app.models.word import Word
from tests.fixtures.test_data import TEST_WORD


async def test_create_word(db: AsyncSession):
    word_in = WordCreate(**TEST_WORD)
    db_word = await word.create(db, obj_in=word_in)
    assert db_word.kanji == TEST_WORD["kanji"]
    assert db_word.romaji == TEST_WORD["romaji"]
    assert db_word.english == TEST_WORD["english"]
    assert db_word.parts == TEST_WORD["parts"]


async def test_get_word(db: AsyncSession):
    # Create word
    word_in = WordCreate(**TEST_WORD)
    db_word = await word.create(db, obj_in=word_in)

    # Get word
    stored_word = await word.get(db, id=db_word.id)
    assert stored_word
    assert stored_word.kanji == db_word.kanji
    assert stored_word.id == db_word.id


async def test_get_word_with_groups(db: AsyncSession):
    # Create word
    word_in = WordCreate(**TEST_WORD)
    db_word = await word.create(db, obj_in=word_in)

    # Get word with groups
    stored_word = await word.get_with_groups(db, word_id=db_word.id)
    assert stored_word
    assert stored_word.groups == []  # No groups yet


async def test_get_words_with_stats(db: AsyncSession):
    # Debug: Check initial word count
    count_query = select(func.count()).select_from(Word)
    initial_count = await db.scalar(count_query)
    print(f"\nInitial word count: {initial_count}")

    # Create word
    word_in = WordCreate(**TEST_WORD)
    db_word = await word.create(db, obj_in=word_in)
    await db.commit()  # Ensure the word is committed

    # Debug: Check word count after creation
    count_query = select(func.count()).select_from(Word)
    after_create_count = await db.scalar(count_query)
    print(f"Word count after creation: {after_create_count}")

    # Get words with stats
    words, total = await word.get_multi_with_stats(db)
    print(f"Returned total from get_multi_with_stats: {total}")
    assert total == 1
    assert len(words) == 1
    assert words[0].id == db_word.id 