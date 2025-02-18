import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.session import session
from app.main import app
from app.core.config import get_settings
from tests.fixtures.test_data import (
    TEST_SESSION,
    TEST_WORD_REVIEW,
    create_test_word,
    create_test_group,
    create_test_activity,
    setup_test_data
)
from app.schemas.session import SessionCreate

settings = get_settings()


@pytest.fixture(autouse=True)
async def setup_test_env(db: AsyncSession) -> dict:
    """Set up test environment with necessary data."""
    data = await setup_test_data(db)
    # Update test data with correct IDs
    TEST_SESSION["group_id"] = data["group_id"]
    TEST_SESSION["activity_id"] = data["activity_id"]
    TEST_WORD_REVIEW["word_id"] = data["word_id"]
    return data


async def test_create_session(client: AsyncClient, db: AsyncSession):
    """Test creating a session with a group."""
    response = await client.post(f"{settings.API_V1_PREFIX}/sessions", json=TEST_SESSION)
    assert response.status_code == 200
    data = response.json()["data"]
    assert data["group_id"] == TEST_SESSION["group_id"]
    assert data["activity_id"] == TEST_SESSION["activity_id"]
    assert "created_at" in data


async def test_create_session_without_group(client: AsyncClient, db: AsyncSession):
    """Test creating a session without a group."""
    session_data = {
        "activity_id": TEST_SESSION["activity_id"],
        "group_id": None
    }
    response = await client.post(f"{settings.API_V1_PREFIX}/sessions", json=session_data)
    assert response.status_code == 200
    data = response.json()["data"]
    assert data["group_id"] is None
    assert data["activity_id"] == TEST_SESSION["activity_id"]
    assert "created_at" in data


async def test_create_session_omitted_group(client: AsyncClient, db: AsyncSession):
    """Test creating a session with group_id field omitted."""
    session_data = {
        "activity_id": TEST_SESSION["activity_id"]
    }
    response = await client.post(f"{settings.API_V1_PREFIX}/sessions", json=session_data)
    assert response.status_code == 200
    data = response.json()["data"]
    assert data["group_id"] is None
    assert data["activity_id"] == TEST_SESSION["activity_id"]
    assert "created_at" in data


async def test_create_session_invalid_group(client: AsyncClient, db: AsyncSession):
    invalid_session = {**TEST_SESSION, "group_id": 999}  # Non-existent group
    response = await client.post(f"{settings.API_V1_PREFIX}/sessions", json=invalid_session)
    assert response.status_code == 404
    assert "not found" in response.json()["error"].lower()


async def test_create_session_invalid_activity(client: AsyncClient, db: AsyncSession):
    invalid_session = {**TEST_SESSION, "activity_id": 999}  # Non-existent activity
    response = await client.post(f"{settings.API_V1_PREFIX}/sessions", json=invalid_session)
    assert response.status_code == 404
    assert "not found" in response.json()["error"].lower()


async def test_get_session(client: AsyncClient, db: AsyncSession):
    # Create session
    create_response = await client.post(f"{settings.API_V1_PREFIX}/sessions", json=TEST_SESSION)
    session_id = create_response.json()["data"]["id"]

    # Get session
    response = await client.get(f"{settings.API_V1_PREFIX}/sessions/{session_id}")
    assert response.status_code == 200
    data = response.json()["data"]
    assert data["id"] == session_id
    assert data["group_id"] == TEST_SESSION["group_id"]
    assert "reviews" in data
    assert isinstance(data["reviews"], list)


async def test_get_nonexistent_session(client: AsyncClient, db: AsyncSession):
    response = await client.get(f"{settings.API_V1_PREFIX}/sessions/999")
    assert response.status_code == 404
    assert "not found" in response.json()["error"].lower()


async def test_create_word_review(client: AsyncClient, db: AsyncSession):
    # Create session
    create_response = await client.post(f"{settings.API_V1_PREFIX}/sessions", json=TEST_SESSION)
    session_id = create_response.json()["data"]["id"]

    # Create review
    response = await client.post(
        f"{settings.API_V1_PREFIX}/sessions/{session_id}/review",
        json=TEST_WORD_REVIEW
    )
    assert response.status_code == 200
    data = response.json()["data"]
    assert data["word_id"] == TEST_WORD_REVIEW["word_id"]
    assert data["correct"] == TEST_WORD_REVIEW["correct"]
    assert "created_at" in data


async def test_create_review_invalid_word(client: AsyncClient, db: AsyncSession):
    # Create session
    create_response = await client.post(f"{settings.API_V1_PREFIX}/sessions", json=TEST_SESSION)
    session_id = create_response.json()["data"]["id"]

    # Try to create review with invalid word
    invalid_review = {**TEST_WORD_REVIEW, "word_id": 999}  # Non-existent word
    response = await client.post(
        f"{settings.API_V1_PREFIX}/sessions/{session_id}/review",
        json=invalid_review
    )
    assert response.status_code == 404
    assert "not found" in response.json()["error"].lower()


async def test_create_review_invalid_session(client: AsyncClient, db: AsyncSession):
    # Try to create review for non-existent session
    response = await client.post(
        f"{settings.API_V1_PREFIX}/sessions/999/review",
        json=TEST_WORD_REVIEW
    )
    assert response.status_code == 404
    assert "not found" in response.json()["error"].lower()


async def test_create_word_review_session_without_group(client: AsyncClient, db: AsyncSession):
    """Test creating a word review for a session without a group."""
    # Create session without group
    session_data = {**TEST_SESSION, "group_id": None}
    create_response = await client.post(f"{settings.API_V1_PREFIX}/sessions", json=session_data)
    assert create_response.status_code == 200
    session_id = create_response.json()["data"]["id"]

    # Create review
    response = await client.post(
        f"{settings.API_V1_PREFIX}/sessions/{session_id}/review",
        json=TEST_WORD_REVIEW
    )
    assert response.status_code == 200
    data = response.json()["data"]
    assert data["word_id"] == TEST_WORD_REVIEW["word_id"]
    assert data["correct"] == TEST_WORD_REVIEW["correct"]
    assert "created_at" in data


@pytest.mark.asyncio
async def test_list_sessions(
    client: AsyncClient,
    db: AsyncSession
):
    """Test listing sessions with pagination and sorting."""
    # Create test data
    session1 = await session.create(
        db,
        obj_in=SessionCreate(group_id=1, activity_id=1)
    )
    session2 = await session.create(
        db,
        obj_in=SessionCreate(group_id=None, activity_id=1)  # Session without group
    )
    
    # Add reviews to session with group
    await session.create_word_review(
        db,
        session_id=session1.id,
        word_id=1,
        correct=True
    )
    
    # Test default listing
    response = await client.get("/api/sessions")
    assert response.status_code == 200
    
    data = response.json()["data"]
    assert "items" in data
    assert "total" in data
    assert "page" in data
    assert "per_page" in data
    assert "total_pages" in data
    
    assert data["page"] == 1
    assert data["per_page"] == 25
    assert data["total"] >= 2
    assert len(data["items"]) >= 2
    
    # Test pagination
    response = await client.get("/api/sessions?page=1&per_page=1")
    assert response.status_code == 200
    data = response.json()["data"]
    assert len(data["items"]) == 1
    
    # Test sorting
    response = await client.get("/api/sessions?sort_by=created_at&order=desc")
    assert response.status_code == 200
    data = response.json()["data"]
    items = data["items"]
    assert items[0]["created_at"] >= items[-1]["created_at"]
    
    # Test invalid sort field
    response = await client.get("/api/sessions?sort_by=invalid")
    assert response.status_code == 400
    assert "error" in response.json()
    
    # Test invalid sort order
    response = await client.get("/api/sessions?order=invalid")
    assert response.status_code == 400
    assert "error" in response.json()
    
    # Verify reviews are included and group_id can be null
    response = await client.get(f"/api/sessions")
    assert response.status_code == 200
    data = response.json()["data"]
    
    # Find our test sessions in the response
    test_sessions = [s for s in data["items"] if s["id"] in {session1.id, session2.id}]
    assert len(test_sessions) == 2
    
    session1_found = next(s for s in test_sessions if s["id"] == session1.id)
    session2_found = next(s for s in test_sessions if s["id"] == session2.id)
    
    assert session1_found["group_id"] is not None
    assert session2_found["group_id"] is None
    assert len(session1_found["reviews"]) == 1
    assert len(session2_found["reviews"]) == 0
    assert session1_found["reviews"][0]["correct"] is True 