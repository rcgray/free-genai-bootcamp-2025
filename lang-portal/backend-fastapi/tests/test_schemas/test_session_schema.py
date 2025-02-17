import pytest
from typing import Dict, Any
from pydantic import ValidationError
from app.schemas.session import (
    SessionBase, SessionCreate, SessionUpdate, Session,
    WordReviewBase, WordReviewCreate, WordReview,
    SessionStats
)

def test_session_base_validation():
    """Test SessionBase schema validation."""
    valid_data = {
        "group_id": 1,
        "activity_id": 1
    }
    session_base = SessionBase(**valid_data)
    assert session_base.group_id == valid_data["group_id"]
    assert session_base.activity_id == valid_data["activity_id"]

    # Test invalid data - missing required fields
    with pytest.raises(ValidationError):
        SessionBase(group_id=1)

    # Test invalid data types
    with pytest.raises(ValidationError):
        SessionBase(group_id="invalid", activity_id=1)

def test_session_create_validation():
    """Test SessionCreate schema validation."""
    valid_data = {
        "group_id": 1,
        "activity_id": 1
    }
    session_create = SessionCreate(**valid_data)
    assert isinstance(session_create, SessionBase)
    assert session_create.group_id == valid_data["group_id"]
    assert session_create.activity_id == valid_data["activity_id"]

def test_session_update_validation():
    """Test SessionUpdate schema validation."""
    # Test partial update
    partial_data = {
        "group_id": 2
    }
    session_update = SessionUpdate(**partial_data)
    assert session_update.group_id == partial_data["group_id"]
    assert session_update.activity_id is None

    # Test full update
    full_data = {
        "group_id": 2,
        "activity_id": 2
    }
    session_update = SessionUpdate(**full_data)
    assert session_update.group_id == full_data["group_id"]
    assert session_update.activity_id == full_data["activity_id"]

    # Test empty update
    empty_update = SessionUpdate()
    assert empty_update.group_id is None
    assert empty_update.activity_id is None

def test_session_response_schema(
    sample_session_data: Dict[str, Any],
    sample_word_review_data: Dict[str, Any]
):
    """Test Session response schema."""
    session = Session(**sample_session_data)
    assert session.id == sample_session_data["id"]
    assert session.group_id == sample_session_data["group_id"]
    assert session.activity_id == sample_session_data["activity_id"]
    assert len(session.reviews) == 1
    assert isinstance(session.created_at, str)

    # Test without reviews
    data_no_reviews = {**sample_session_data, "reviews": []}
    session = Session(**data_no_reviews)
    assert len(session.reviews) == 0

def test_word_review_validation(sample_word_review_data: Dict[str, Any]):
    """Test WordReview schema validation."""
    # Test base schema
    base_data = {
        "word_id": 1,
        "correct": True
    }
    review_base = WordReviewBase(**base_data)
    assert review_base.word_id == base_data["word_id"]
    assert review_base.correct == base_data["correct"]

    # Test create schema
    create_data = {
        "word_id": 1,
        "correct": True
    }
    review_create = WordReviewCreate(**create_data)
    assert isinstance(review_create, WordReviewBase)

    # Test full schema
    review = WordReview(**sample_word_review_data)
    assert review.id == sample_word_review_data["id"]
    assert review.word_id == sample_word_review_data["word_id"]
    assert review.session_id == sample_word_review_data["session_id"]
    assert review.correct == sample_word_review_data["correct"]
    assert isinstance(review.created_at, str)

    # Test invalid data
    with pytest.raises(ValidationError):
        WordReviewBase(word_id="invalid", correct=True)

def test_session_stats_validation():
    """Test SessionStats schema validation."""
    valid_data = {
        "total_reviews": 10,
        "correct_reviews": 8,
        "accuracy": 0.8
    }
    stats = SessionStats(**valid_data)
    assert stats.total_reviews == valid_data["total_reviews"]
    assert stats.correct_reviews == valid_data["correct_reviews"]
    assert stats.accuracy == valid_data["accuracy"]

    # Test default values
    empty_stats = SessionStats()
    assert empty_stats.total_reviews == 0
    assert empty_stats.correct_reviews == 0
    assert empty_stats.accuracy == 0.0

    # Test invalid data
    with pytest.raises(ValidationError):
        SessionStats(total_reviews=-1)
    
    with pytest.raises(ValidationError):
        SessionStats(accuracy=1.5)
