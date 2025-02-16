import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.study_session import study_session
from app.main import app
from app.core.config import get_settings
from tests.fixtures.test_data import (
    TEST_STUDY_SESSION,
    TEST_WORD_REVIEW,
    create_test_word,
    create_test_group,
    create_test_activity,
    setup_test_data
)
from app.schemas.study_session import StudySessionCreate

settings = get_settings()


@pytest.fixture(autouse=True)
async def setup_test_env(db: AsyncSession) -> dict:
    """Set up test environment with necessary data."""
    data = await setup_test_data(db)
    # Update test data with correct IDs
    TEST_STUDY_SESSION["group_id"] = data["group_id"]
    TEST_STUDY_SESSION["study_activity_id"] = data["activity_id"]
    TEST_WORD_REVIEW["word_id"] = data["word_id"]
    return data


async def test_create_study_session(client: AsyncClient, db: AsyncSession):
    response = await client.post(f"{settings.API_V1_PREFIX}/study_sessions", json=TEST_STUDY_SESSION)
    print(f"Response status: {response.status_code}")
    print(f"Response content: {response.content}")
    print(f"Response json: {response.json()}")
    assert response.status_code == 200
    data = response.json()["data"]
    assert data["group_id"] == TEST_STUDY_SESSION["group_id"]
    assert data["study_activity_id"] == TEST_STUDY_SESSION["study_activity_id"]
    assert "created_at" in data


async def test_create_session_invalid_group(client: AsyncClient, db: AsyncSession):
    invalid_session = {**TEST_STUDY_SESSION, "group_id": 999}  # Non-existent group
    response = await client.post(f"{settings.API_V1_PREFIX}/study_sessions", json=invalid_session)
    assert response.status_code == 404
    assert "not found" in response.json()["error"].lower()


async def test_create_session_invalid_activity(client: AsyncClient, db: AsyncSession):
    invalid_session = {**TEST_STUDY_SESSION, "study_activity_id": 999}  # Non-existent activity
    response = await client.post(f"{settings.API_V1_PREFIX}/study_sessions", json=invalid_session)
    assert response.status_code == 404
    assert "not found" in response.json()["error"].lower()


async def test_get_study_session(client: AsyncClient, db: AsyncSession):
    # Create session
    create_response = await client.post(f"{settings.API_V1_PREFIX}/study_sessions", json=TEST_STUDY_SESSION)
    session_id = create_response.json()["data"]["id"]

    # Get session
    response = await client.get(f"{settings.API_V1_PREFIX}/study_sessions/{session_id}")
    assert response.status_code == 200
    data = response.json()["data"]
    assert data["id"] == session_id
    assert data["group_id"] == TEST_STUDY_SESSION["group_id"]
    assert "reviews" in data
    assert isinstance(data["reviews"], list)


async def test_get_nonexistent_session(client: AsyncClient, db: AsyncSession):
    response = await client.get(f"{settings.API_V1_PREFIX}/study_sessions/999")
    assert response.status_code == 404
    assert "not found" in response.json()["error"].lower()


async def test_create_word_review(client: AsyncClient, db: AsyncSession):
    # Create session
    create_response = await client.post(f"{settings.API_V1_PREFIX}/study_sessions", json=TEST_STUDY_SESSION)
    session_id = create_response.json()["data"]["id"]

    # Create review
    response = await client.post(
        f"{settings.API_V1_PREFIX}/study_sessions/{session_id}/review",
        json=TEST_WORD_REVIEW
    )
    assert response.status_code == 200
    data = response.json()["data"]
    assert data["word_id"] == TEST_WORD_REVIEW["word_id"]
    assert data["correct"] == TEST_WORD_REVIEW["correct"]
    assert "created_at" in data


async def test_create_review_invalid_word(client: AsyncClient, db: AsyncSession):
    # Create session
    create_response = await client.post(f"{settings.API_V1_PREFIX}/study_sessions", json=TEST_STUDY_SESSION)
    session_id = create_response.json()["data"]["id"]

    # Try to create review with invalid word
    invalid_review = {**TEST_WORD_REVIEW, "word_id": 999}  # Non-existent word
    response = await client.post(
        f"{settings.API_V1_PREFIX}/study_sessions/{session_id}/review",
        json=invalid_review
    )
    assert response.status_code == 404
    assert "not found" in response.json()["error"].lower()


async def test_create_review_invalid_session(client: AsyncClient, db: AsyncSession):
    # Try to create review for non-existent session
    response = await client.post(
        f"{settings.API_V1_PREFIX}/study_sessions/999/review",
        json=TEST_WORD_REVIEW
    )
    assert response.status_code == 404
    assert "not found" in response.json()["error"].lower()


@pytest.mark.asyncio
async def test_list_study_sessions(
    client: AsyncClient,
    db: AsyncSession
):
    """Test listing study sessions with pagination and sorting."""
    # Create test data
    session1 = await study_session.create(
        db,
        obj_in=StudySessionCreate(group_id=1, study_activity_id=1)
    )
    session2 = await study_session.create(
        db,
        obj_in=StudySessionCreate(group_id=1, study_activity_id=1)
    )
    
    # Add reviews to sessions
    await study_session.create_word_review(
        db,
        session_id=session1.id,
        word_id=1,
        correct=True
    )
    await study_session.create_word_review(
        db,
        session_id=session2.id,
        word_id=1,
        correct=False
    )
    
    # Test default listing
    response = await client.get("/api/study_sessions")
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
    response = await client.get("/api/study_sessions?page=1&per_page=1")
    assert response.status_code == 200
    data = response.json()["data"]
    assert len(data["items"]) == 1
    
    # Test sorting
    response = await client.get("/api/study_sessions?sort_by=created_at&order=desc")
    assert response.status_code == 200
    data = response.json()["data"]
    items = data["items"]
    assert items[0]["created_at"] >= items[-1]["created_at"]
    
    # Test invalid sort field
    response = await client.get("/api/study_sessions?sort_by=invalid")
    assert response.status_code == 400
    assert "error" in response.json()
    
    # Test invalid sort order
    response = await client.get("/api/study_sessions?order=invalid")
    assert response.status_code == 400
    assert "error" in response.json()
    
    # Verify reviews are included
    response = await client.get(f"/api/study_sessions")
    assert response.status_code == 200
    data = response.json()["data"]
    
    # Find our test sessions in the response
    test_sessions = [s for s in data["items"] if s["id"] in {session1.id, session2.id}]
    assert len(test_sessions) == 2
    
    session1_found = next(s for s in test_sessions if s["id"] == session1.id)
    session2_found = next(s for s in test_sessions if s["id"] == session2.id)
    
    assert len(session1_found["reviews"]) == 1
    assert len(session2_found["reviews"]) == 1
    assert session1_found["reviews"][0]["correct"] is True
    assert session2_found["reviews"][0]["correct"] is False 