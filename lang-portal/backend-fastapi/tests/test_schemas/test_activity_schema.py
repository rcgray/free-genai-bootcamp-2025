import pytest
from typing import Dict, Any
from pydantic import ValidationError
from app.schemas.activity import Activity, ActivityCreate, ActivityUpdate


@pytest.fixture
def sample_activity_data() -> Dict[str, Any]:
    """Sample activity data for testing."""
    return {
        "id": 1,
        "name": "Flashcards",
        "url": "flashcards",
        "description": "Practice vocabulary with flashcards"
    }


def test_activity_create_validation():
    """Test ActivityCreate schema validation."""
    # Test valid data
    valid_data = {
        "name": "Flashcards",
        "url": "flashcards",
        "description": "Practice vocabulary with flashcards"
    }
    activity_create = ActivityCreate(**valid_data)
    assert activity_create.name == valid_data["name"]
    assert activity_create.url == valid_data["url"]
    assert activity_create.description == valid_data["description"]

    # Test invalid data
    with pytest.raises(ValidationError):
        ActivityCreate(
            name="",  # Empty name
            url="flashcards",
            description="Description"
        )
    
    with pytest.raises(ValidationError):
        ActivityCreate(
            name="Activity",
            url="Invalid URL!",  # Invalid identifier format
            description="Description"
        )


def test_activity_update_validation():
    """Test ActivityUpdate schema validation."""
    # Test with all fields
    valid_data = {
        "name": "Updated Flashcards",
        "url": "updated-flashcards",
        "description": "Updated description"
    }
    activity_update = ActivityUpdate(**valid_data)
    assert activity_update.name == valid_data["name"]
    assert activity_update.url == valid_data["url"]
    assert activity_update.description == valid_data["description"]

    # Test with partial data
    partial_data = {
        "name": "Updated Flashcards"
    }
    activity_update = ActivityUpdate(**partial_data)
    assert activity_update.name == partial_data["name"]
    assert activity_update.url is None
    assert activity_update.description is None

    # Test invalid data
    with pytest.raises(ValidationError):
        ActivityUpdate(
            name="",  # Empty name
            url="flashcards"
        )
    
    with pytest.raises(ValidationError):
        ActivityUpdate(
            name="Activity",
            url="Invalid URL!"  # Invalid identifier format
        )


def test_activity_response_schema(sample_activity_data: Dict[str, Any]):
    """Test Activity response schema."""
    activity = Activity(**sample_activity_data)
    assert activity.id == sample_activity_data["id"]
    assert activity.name == sample_activity_data["name"]
    assert activity.url == sample_activity_data["url"]
    assert activity.description == sample_activity_data["description"]

    # Test invalid data
    with pytest.raises(ValidationError):
        Activity(
            id="invalid",  # Invalid ID type
            name="Activity",
            url="flashcards",
            description="Description"
        ) 