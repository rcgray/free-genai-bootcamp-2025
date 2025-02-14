import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.word import word
from tests.fixtures.test_data import TEST_WORD, TEST_WORD_2


async def test_create_word(client: AsyncClient, db: AsyncSession):
    response = await client.post("/api/words", json=TEST_WORD)
    assert response.status_code == 200
    data = response.json()
    assert data["data"]["kanji"] == TEST_WORD["kanji"]
    assert data["data"]["romaji"] == TEST_WORD["romaji"]
    assert data["data"]["english"] == TEST_WORD["english"]
    assert data["data"]["parts"] == TEST_WORD["parts"]


async def test_create_duplicate_word(client: AsyncClient, db: AsyncSession):
    # Create first word
    await client.post("/api/words", json=TEST_WORD)
    
    # Try to create duplicate
    response = await client.post("/api/words", json=TEST_WORD)
    assert response.status_code == 400
    assert "already exists" in response.json()["error"]


async def test_get_words_pagination(client: AsyncClient, db: AsyncSession):
    # Create multiple words
    await client.post("/api/words", json=TEST_WORD)
    await client.post("/api/words", json=TEST_WORD_2)

    # Test pagination
    response = await client.get("/api/words?page=1&per_page=1")
    assert response.status_code == 200
    data = response.json()["data"]
    assert len(data["items"]) == 1
    assert data["total"] == 2
    assert data["total_pages"] == 2


async def test_get_word(client: AsyncClient, db: AsyncSession):
    # Create word
    create_response = await client.post("/api/words", json=TEST_WORD)
    word_id = create_response.json()["data"]["id"]

    # Get word
    response = await client.get(f"/api/words/{word_id}")
    assert response.status_code == 200
    data = response.json()["data"]
    assert data["kanji"] == TEST_WORD["kanji"]


async def test_get_words_sorting(client: AsyncClient, db: AsyncSession):
    # Create words in non-sorted order
    await client.post("/api/words", json={
        "kanji": "猫",
        "romaji": "neko",
        "english": "cat",
        "parts": [
            {"kanji": "猫", "romaji": ["ne", "ko"]}
        ]
    })
    await client.post("/api/words", json={
        "kanji": "犬",
        "romaji": "inu",
        "english": "dog",
        "parts": [
            {"kanji": "犬", "romaji": ["i", "nu"]}
        ]
    })

    # Test sorting by romaji ascending
    response = await client.get("/api/words?sort_by=romaji&order=asc")
    assert response.status_code == 200
    data = response.json()["data"]
    items = data["items"]
    assert len(items) == 2
    assert items[0]["romaji"] == "inu"  # dog should come first
    assert items[1]["romaji"] == "neko"  # cat should come second

    # Test sorting by romaji descending
    response = await client.get("/api/words?sort_by=romaji&order=desc")
    assert response.status_code == 200
    data = response.json()["data"]
    items = data["items"]
    assert len(items) == 2
    assert items[0]["romaji"] == "neko"  # cat should come first
    assert items[1]["romaji"] == "inu"  # dog should come second 