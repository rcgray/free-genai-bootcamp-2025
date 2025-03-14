import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.word import word
from app.main import app
from app.core.config import get_settings
from tests.fixtures.test_data import TEST_WORD, TEST_WORD_2

settings = get_settings()


async def test_create_word(client: AsyncClient, db: AsyncSession):
    response = await client.post(f"{settings.API_V1_PREFIX}/words", json=TEST_WORD)
    assert response.status_code == 200
    data = response.json()
    assert data["data"]["kanji"] == TEST_WORD["kanji"]
    assert data["data"]["romaji"] == TEST_WORD["romaji"]
    assert data["data"]["english"] == TEST_WORD["english"]
    assert data["data"]["parts"] == TEST_WORD["parts"]


async def test_create_duplicate_word(client: AsyncClient, db: AsyncSession):
    # Create first word
    await client.post(f"{settings.API_V1_PREFIX}/words", json=TEST_WORD)
    
    # Try to create duplicate
    response = await client.post(f"{settings.API_V1_PREFIX}/words", json=TEST_WORD)
    assert response.status_code == 400
    assert "already exists" in response.json()["error"]


async def test_get_words_pagination(client: AsyncClient, db: AsyncSession):
    # Create multiple words
    await client.post(f"{settings.API_V1_PREFIX}/words", json=TEST_WORD)
    await client.post(f"{settings.API_V1_PREFIX}/words", json=TEST_WORD_2)

    # Test pagination
    response = await client.get(f"{settings.API_V1_PREFIX}/words?page=1&per_page=1")
    assert response.status_code == 200
    data = response.json()["data"]
    assert len(data["items"]) == 1
    assert data["total"] == 2
    assert data["total_pages"] == 2


async def test_get_word(client: AsyncClient, db: AsyncSession):
    # Create word
    create_response = await client.post(f"{settings.API_V1_PREFIX}/words", json=TEST_WORD)
    word_id = create_response.json()["data"]["id"]

    # Get word
    response = await client.get(f"{settings.API_V1_PREFIX}/words/{word_id}")
    assert response.status_code == 200
    data = response.json()["data"]
    assert data["kanji"] == TEST_WORD["kanji"]


async def test_get_words_sorting(client: AsyncClient, db: AsyncSession):
    # Create words in non-sorted order
    await client.post(f"{settings.API_V1_PREFIX}/words", json={
        "kanji": "猫",
        "romaji": "neko",
        "english": "cat",
        "parts": [
            {"kanji": "猫", "romaji": ["ne", "ko"]}
        ]
    })
    await client.post(f"{settings.API_V1_PREFIX}/words", json={
        "kanji": "犬",
        "romaji": "inu",
        "english": "dog",
        "parts": [
            {"kanji": "犬", "romaji": ["i", "nu"]}
        ]
    })

    # Test sorting by romaji ascending
    response = await client.get(f"{settings.API_V1_PREFIX}/words?sort_by=romaji&order=asc")
    assert response.status_code == 200
    data = response.json()["data"]
    items = data["items"]
    assert len(items) == 2
    assert items[0]["romaji"] == "inu"  # dog should come first
    assert items[1]["romaji"] == "neko"  # cat should come second

    # Test sorting by romaji descending
    response = await client.get(f"{settings.API_V1_PREFIX}/words?sort_by=romaji&order=desc")
    assert response.status_code == 200
    data = response.json()["data"]
    items = data["items"]
    assert len(items) == 2
    assert items[0]["romaji"] == "neko"  # cat should come first
    assert items[1]["romaji"] == "inu"  # dog should come second


async def test_update_word(client: AsyncClient, db: AsyncSession):
    # Create word
    create_response = await client.post(f"{settings.API_V1_PREFIX}/words", json=TEST_WORD)
    word_id = create_response.json()["data"]["id"]

    # Update word
    updated_word = {
        "kanji": "食べる",
        "romaji": "taberu",
        "english": "to eat",
        "parts": [
            {"kanji": "食", "romaji": ["ta"]},
            {"kanji": "べ", "romaji": ["be"]},
            {"kanji": "る", "romaji": ["ru"]}
        ]
    }
    response = await client.put(
        f"{settings.API_V1_PREFIX}/words/{word_id}",
        json=updated_word
    )
    assert response.status_code == 200
    data = response.json()["data"]
    assert data["kanji"] == updated_word["kanji"]
    assert data["romaji"] == updated_word["romaji"]
    assert data["english"] == updated_word["english"]
    assert data["parts"] == updated_word["parts"]


async def test_update_nonexistent_word(client: AsyncClient, db: AsyncSession):
    updated_word = {
        "kanji": "食べる",
        "romaji": "taberu",
        "english": "to eat",
        "parts": [
            {"kanji": "食", "romaji": ["ta"]},
            {"kanji": "べ", "romaji": ["be"]},
            {"kanji": "る", "romaji": ["ru"]}
        ]
    }
    response = await client.put(
        f"{settings.API_V1_PREFIX}/words/999",
        json=updated_word
    )
    assert response.status_code == 404
    assert "not found" in response.json()["error"]


async def test_delete_word(client: AsyncClient, db: AsyncSession):
    # Create word
    create_response = await client.post(f"{settings.API_V1_PREFIX}/words", json=TEST_WORD)
    word_id = create_response.json()["data"]["id"]

    # Delete word
    response = await client.delete(f"{settings.API_V1_PREFIX}/words/{word_id}")
    assert response.status_code == 200

    # Verify deletion
    get_response = await client.get(f"{settings.API_V1_PREFIX}/words/{word_id}")
    assert get_response.status_code == 404


async def test_delete_nonexistent_word(client: AsyncClient, db: AsyncSession):
    response = await client.delete(f"{settings.API_V1_PREFIX}/words/999")
    assert response.status_code == 404
    assert "not found" in response.json()["error"]


async def test_get_word_with_review_stats(client: AsyncClient, db: AsyncSession):
    # Create word
    create_response = await client.post(f"{settings.API_V1_PREFIX}/words", json=TEST_WORD)
    word_id = create_response.json()["data"]["id"]

    # Get word with stats
    response = await client.get(f"{settings.API_V1_PREFIX}/words/{word_id}")
    assert response.status_code == 200
    data = response.json()["data"]
    assert "correct_count" in data
    assert "wrong_count" in data
    assert isinstance(data["correct_count"], int)
    assert isinstance(data["wrong_count"], int) 