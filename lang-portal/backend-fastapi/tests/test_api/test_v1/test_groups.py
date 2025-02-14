import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.group import group
from app.main import app
from app.core.config import get_settings
from tests.fixtures.test_data import TEST_GROUP, TEST_WORD, TEST_WORD_2

settings = get_settings()


async def test_create_group(client: AsyncClient, db: AsyncSession):
    response = await client.post(f"{settings.API_V1_PREFIX}/groups", json=TEST_GROUP)
    assert response.status_code == 200
    data = response.json()
    assert data["data"]["name"] == TEST_GROUP["name"]
    assert data["data"]["words_count"] == 0


async def test_create_duplicate_group(client: AsyncClient, db: AsyncSession):
    # Create first group
    await client.post(f"{settings.API_V1_PREFIX}/groups", json=TEST_GROUP)
    
    # Try to create duplicate
    response = await client.post(f"{settings.API_V1_PREFIX}/groups", json=TEST_GROUP)
    assert response.status_code == 400
    assert "already exists" in response.json()["error"]


async def test_get_groups_pagination(client: AsyncClient, db: AsyncSession):
    # Create multiple groups
    await client.post(f"{settings.API_V1_PREFIX}/groups", json=TEST_GROUP)
    await client.post(f"{settings.API_V1_PREFIX}/groups", json={
        "name": "Verbs"
    })

    # Test pagination
    response = await client.get(f"{settings.API_V1_PREFIX}/groups?page=1&per_page=1")
    assert response.status_code == 200
    data = response.json()["data"]
    assert len(data["items"]) == 1
    assert data["total"] == 2
    assert data["total_pages"] == 2


async def test_get_groups_sorting(client: AsyncClient, db: AsyncSession):
    # Create groups in non-sorted order
    await client.post(f"{settings.API_V1_PREFIX}/groups", json={
        "name": "Verbs"
    })
    await client.post(f"{settings.API_V1_PREFIX}/groups", json={
        "name": "Animals"
    })

    # Test sorting by name ascending
    response = await client.get(f"{settings.API_V1_PREFIX}/groups?sort_by=name&order=asc")
    assert response.status_code == 200
    data = response.json()["data"]
    items = data["items"]
    assert len(items) == 2
    assert items[0]["name"] == "Animals"  # Animals should come first
    assert items[1]["name"] == "Verbs"  # Verbs should come second

    # Test sorting by name descending
    response = await client.get(f"{settings.API_V1_PREFIX}/groups?sort_by=name&order=desc")
    assert response.status_code == 200
    data = response.json()["data"]
    items = data["items"]
    assert len(items) == 2
    assert items[0]["name"] == "Verbs"  # Verbs should come first
    assert items[1]["name"] == "Animals"  # Animals should come second


async def test_get_group_details(client: AsyncClient, db: AsyncSession):
    # Create group
    create_response = await client.post(f"{settings.API_V1_PREFIX}/groups", json=TEST_GROUP)
    group_id = create_response.json()["id"]

    # Create words
    word1_response = await client.post(f"{settings.API_V1_PREFIX}/words", json=TEST_WORD)
    word2_response = await client.post(f"{settings.API_V1_PREFIX}/words", json=TEST_WORD_2)
    word_ids = [
        word1_response.json()["id"],
        word2_response.json()["id"]
    ]

    # Update group with words
    await client.put(
        f"{settings.API_V1_PREFIX}/groups/{group_id}",
        json={"name": TEST_GROUP["name"], "word_ids": word_ids}
    )

    # Get group details
    response = await client.get(f"{settings.API_V1_PREFIX}/groups/{group_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == TEST_GROUP["name"]
    assert data["words_count"] == 2
    assert len(data["words"]) == 2
    assert {w["id"] for w in data["words"]} == set(word_ids)


async def test_update_group(client: AsyncClient, db: AsyncSession):
    # Create group
    create_response = await client.post(f"{settings.API_V1_PREFIX}/groups", json=TEST_GROUP)
    group_id = create_response.json()["data"]["id"]

    # Update group
    new_name = "Updated Group"
    response = await client.put(
        f"{settings.API_V1_PREFIX}/groups/{group_id}",
        json={"name": new_name, "word_ids": []}
    )
    assert response.status_code == 200
    data = response.json()["data"]
    assert data["name"] == new_name


async def test_update_nonexistent_group(client: AsyncClient, db: AsyncSession):
    response = await client.put(
        f"{settings.API_V1_PREFIX}/groups/999",
        json={"name": "New Name", "word_ids": []}
    )
    assert response.status_code == 404
    assert "not found" in response.json()["error"]


async def test_delete_group(client: AsyncClient, db: AsyncSession):
    # Create group
    create_response = await client.post(f"{settings.API_V1_PREFIX}/groups", json=TEST_GROUP)
    group_id = create_response.json()["data"]["id"]

    # Delete group
    response = await client.delete(f"{settings.API_V1_PREFIX}/groups/{group_id}")
    assert response.status_code == 200

    # Verify deletion
    get_response = await client.get(f"{settings.API_V1_PREFIX}/groups/{group_id}")
    assert get_response.status_code == 404


async def test_delete_nonexistent_group(client: AsyncClient, db: AsyncSession):
    response = await client.delete(f"{settings.API_V1_PREFIX}/groups/999")
    assert response.status_code == 404
    assert "not found" in response.json()["error"] 