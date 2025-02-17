import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.activity import activity
from app.main import app
from app.core.config import get_settings
from tests.fixtures.test_data import TEST_ACTIVITY

settings = get_settings()


async def test_create_activity(client: AsyncClient, db: AsyncSession):
    """Test creating a new activity."""
    response = await client.post(
        f"{settings.API_V1_PREFIX}/activities",
        json=TEST_ACTIVITY
    )
    assert response.status_code == 200
    data = response.json()["data"]
    assert data["name"] == TEST_ACTIVITY["name"]
    assert data["url"] == TEST_ACTIVITY["url"]
    assert data["image_url"] == TEST_ACTIVITY["image_url"]
    assert data["description"] == TEST_ACTIVITY["description"]


async def test_get_activity(client: AsyncClient, db: AsyncSession):
    """Test getting an activity by ID."""
    # Create activity
    create_response = await client.post(
        f"{settings.API_V1_PREFIX}/activities",
        json=TEST_ACTIVITY
    )
    activity_id = create_response.json()["data"]["id"]

    # Get activity
    response = await client.get(f"{settings.API_V1_PREFIX}/activities/{activity_id}")
    assert response.status_code == 200
    data = response.json()["data"]
    assert data["id"] == activity_id
    assert data["name"] == TEST_ACTIVITY["name"]
    assert data["url"] == TEST_ACTIVITY["url"]
    assert data["image_url"] == TEST_ACTIVITY["image_url"]
    assert data["description"] == TEST_ACTIVITY["description"]


async def test_get_activity_not_found(client: AsyncClient, db: AsyncSession):
    """Test getting a non-existent activity."""
    response = await client.get(f"{settings.API_V1_PREFIX}/activities/999999")
    assert response.status_code == 404


async def test_get_activities(client: AsyncClient, db: AsyncSession):
    """Test getting list of activities."""
    # Create test activities
    activity_1 = {
        "name": "Activity 1",
        "url": "http://example.com/1",
        "image_url": "http://example.com/images/1.png",
        "description": "First activity"
    }
    activity_2 = {
        "name": "Activity 2",
        "url": "http://example.com/2",
        "image_url": "http://example.com/images/2.png",
        "description": "Second activity"
    }
    
    await client.post(f"{settings.API_V1_PREFIX}/activities", json=activity_1)
    await client.post(f"{settings.API_V1_PREFIX}/activities", json=activity_2)

    # Test default listing
    response = await client.get(f"{settings.API_V1_PREFIX}/activities")
    assert response.status_code == 200
    data = response.json()["data"]
    assert "items" in data
    assert len(data["items"]) >= 2
    assert data["total"] >= 2
    assert data["page"] == 1
    assert data["per_page"] == 20

    # Test pagination
    response = await client.get(
        f"{settings.API_V1_PREFIX}/activities?page=1&per_page=1"
    )
    assert response.status_code == 200
    data = response.json()["data"]
    assert len(data["items"]) == 1

    # Test sorting
    response_asc = await client.get(
        f"{settings.API_V1_PREFIX}/activities?sort_by=name&order=asc"
    )
    response_desc = await client.get(
        f"{settings.API_V1_PREFIX}/activities?sort_by=name&order=desc"
    )
    
    items_asc = response_asc.json()["data"]["items"]
    items_desc = response_desc.json()["data"]["items"]
    
    assert items_asc[0]["name"] <= items_asc[-1]["name"]
    assert items_desc[0]["name"] >= items_desc[-1]["name"]


async def test_update_activity(client: AsyncClient, db: AsyncSession):
    """Test updating an activity."""
    # Create activity
    create_response = await client.post(
        f"{settings.API_V1_PREFIX}/activities",
        json=TEST_ACTIVITY
    )
    activity_id = create_response.json()["data"]["id"]

    # Update data
    update_data = {
        "name": "Updated Activity",
        "url": "http://example.com/updated",
        "image_url": "http://example.com/images/updated.png",
        "description": "Updated description"
    }

    # Update activity
    response = await client.put(
        f"{settings.API_V1_PREFIX}/activities/{activity_id}",
        json=update_data
    )
    assert response.status_code == 200
    data = response.json()["data"]
    assert data["name"] == update_data["name"]
    assert data["url"] == update_data["url"]
    assert data["image_url"] == update_data["image_url"]
    assert data["description"] == update_data["description"]


async def test_update_activity_not_found(client: AsyncClient, db: AsyncSession):
    """Test updating a non-existent activity."""
    update_data = {
        "name": "Updated Activity",
        "url": "http://example.com/updated",
        "image_url": "http://example.com/images/updated.png",
        "description": "Updated description"
    }
    response = await client.put(
        f"{settings.API_V1_PREFIX}/activities/999999",
        json=update_data
    )
    assert response.status_code == 404


async def test_delete_activity(client: AsyncClient, db: AsyncSession):
    """Test deleting an activity."""
    # Create activity
    create_response = await client.post(
        f"{settings.API_V1_PREFIX}/activities",
        json=TEST_ACTIVITY
    )
    activity_id = create_response.json()["data"]["id"]

    # Delete activity
    response = await client.delete(
        f"{settings.API_V1_PREFIX}/activities/{activity_id}"
    )
    assert response.status_code == 200
    assert response.json()["data"]["status"] == "success"

    # Verify it's deleted
    get_response = await client.get(
        f"{settings.API_V1_PREFIX}/activities/{activity_id}"
    )
    assert get_response.status_code == 404


async def test_delete_activity_not_found(client: AsyncClient, db: AsyncSession):
    """Test deleting a non-existent activity."""
    response = await client.delete(
        f"{settings.API_V1_PREFIX}/activities/999999"
    )
    assert response.status_code == 404 