import pytest
from typing import Dict, Any
from pydantic import ValidationError
from app.schemas.group import GroupBase, GroupCreate, GroupUpdate, Group, GroupWithWords

def test_group_base_validation():
    """Test GroupBase schema validation."""
    # Test valid data
    valid_data = {
        "name": "Basic Verbs"
    }
    group_base = GroupBase(**valid_data)
    assert group_base.name == valid_data["name"]

    # Test invalid data - missing required field
    with pytest.raises(ValidationError):
        GroupBase()

    # Test invalid data - empty name
    with pytest.raises(ValidationError):
        GroupBase(name="")

def test_group_create_validation(sample_word_data: Dict[str, Any]):
    """Test GroupCreate schema validation."""
    # Test with word IDs
    valid_data = {
        "name": "Basic Verbs",
        "word_ids": [1, 2, 3]
    }
    group_create = GroupCreate(**valid_data)
    assert group_create.name == valid_data["name"]
    assert group_create.word_ids == valid_data["word_ids"]

    # Test without word IDs
    minimal_data = {
        "name": "Basic Verbs"
    }
    group_create = GroupCreate(**minimal_data)
    assert group_create.name == minimal_data["name"]
    assert group_create.word_ids is None

    # Test invalid word IDs
    with pytest.raises(ValidationError):
        GroupCreate(name="Basic Verbs", word_ids=["invalid"])

def test_group_update_validation():
    """Test GroupUpdate schema validation."""
    # Test partial update - all fields optional
    partial_data = {
        "name": "Updated Verbs"
    }
    group_update = GroupUpdate(**partial_data)
    assert group_update.name == partial_data["name"]
    assert group_update.word_ids is None

    # Test full update
    full_data = {
        "name": "Updated Verbs",
        "word_ids": [1, 2, 3, 4]
    }
    group_update = GroupUpdate(**full_data)
    assert group_update.name == full_data["name"]
    assert group_update.word_ids == full_data["word_ids"]

    # Test empty update
    empty_update = GroupUpdate()
    assert empty_update.name is None
    assert empty_update.word_ids is None

    # Test invalid word IDs
    with pytest.raises(ValidationError):
        GroupUpdate(word_ids=["invalid"])

def test_group_response_schema(sample_group_data: Dict[str, Any]):
    """Test Group response schema."""
    group = Group(**sample_group_data)
    assert group.id == sample_group_data["id"]
    assert group.name == sample_group_data["name"]
    assert group.words_count == sample_group_data["words_count"]

    # Test default words_count
    minimal_data = {
        "id": 1,
        "name": "Basic Verbs"
    }
    group = Group(**minimal_data)
    assert group.words_count == 0

def test_group_with_words_schema(
    sample_group_data: Dict[str, Any],
    sample_word_data: Dict[str, Any]
):
    """Test GroupWithWords schema."""
    data = {
        **sample_group_data,
        "words": [sample_word_data]
    }
    group = GroupWithWords(**data)
    assert group.id == data["id"]
    assert group.name == data["name"]
    assert len(group.words) == 1
    assert group.words[0].id == sample_word_data["id"]
    assert group.words[0].kanji == sample_word_data["kanji"]

    # Test empty words list
    data_no_words = {
        **sample_group_data,
        "words": []
    }
    group = GroupWithWords(**data_no_words)
    assert len(group.words) == 0

    # Test invalid words data
    with pytest.raises(ValidationError):
        GroupWithWords(**{
            **sample_group_data,
            "words": [{"invalid": "data"}]
        })
