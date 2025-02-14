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


async def test_update_word(db: AsyncSession):
    # Create word
    word_in = WordCreate(**TEST_WORD)
    db_word = await word.create(db, obj_in=word_in)

    # Update word
    updated_data = {
        "kanji": "食べる",
        "romaji": "taberu",
        "english": "to eat",
        "parts": [
            {"kanji": "食", "romaji": ["ta"]},
            {"kanji": "べ", "romaji": ["be"]},
            {"kanji": "る", "romaji": ["ru"]}
        ]
    }
    updated_word = await word.update(db, db_obj=db_word, obj_in=updated_data)
    assert updated_word.kanji == updated_data["kanji"]
    assert updated_word.romaji == updated_data["romaji"]
    assert updated_word.english == updated_data["english"]
    assert updated_word.parts == updated_data["parts"]


async def test_delete_word(db: AsyncSession):
    # Create word
    word_in = WordCreate(**TEST_WORD)
    db_word = await word.create(db, obj_in=word_in)
    
    # Delete word
    deleted_word = await word.remove(db, id=db_word.id)
    assert deleted_word.id == db_word.id
    
    # Verify deletion
    db_word = await word.get(db, id=db_word.id)
    assert db_word is None


async def test_get_word_not_found(db: AsyncSession):
    stored_word = await word.get(db, id=999)
    assert stored_word is None


async def test_get_words_pagination(db: AsyncSession):
    # Create multiple words
    word1_in = WordCreate(**TEST_WORD)
    word2_in = WordCreate(**{
        "kanji": "食べる",
        "romaji": "taberu",
        "english": "to eat",
        "parts": [
            {"kanji": "食", "romaji": ["ta"]},
            {"kanji": "べ", "romaji": ["be"]},
            {"kanji": "る", "romaji": ["ru"]}
        ]
    })
    await word.create(db, obj_in=word1_in)
    await word.create(db, obj_in=word2_in)
    
    # Test pagination
    words = await word.get_multi(db, skip=0, limit=1)
    assert len(words) == 1
    
    # Get all words to verify total
    all_words = await word.get_multi(db)
    assert len(all_words) == 2 