import pytest
from typing import Dict, Any
from pydantic import ValidationError, HttpUrl
from app.schemas.study_session import (
    StudyActivityBase, StudyActivity,
    StudySessionBase, StudySessionCreate, StudySessionUpdate, StudySession,
    WordReviewBase, WordReviewCreate, WordReview,
    StudySessionStats
)

def test_study_activity_validation(sample_study_activity_data: Dict[str, Any]):
    """Test StudyActivity schema validation."""
    # Test base schema
    base_data = {
        "name": "Flashcards",
        "url": "http://example.com/flashcards"
    }
    activity_base = StudyActivityBase(**base_data)
    assert activity_base.name == base_data["name"]
    assert str(activity_base.url) == base_data["url"]

    # Test full schema
    activity = StudyActivity(**sample_study_activity_data)
    assert activity.id == sample_study_activity_data["id"]
    assert activity.name == sample_study_activity_data["name"]
    assert str(activity.url) == sample_study_activity_data["url"]

    # Test invalid data - missing required fields
    with pytest.raises(ValidationError):
        StudyActivityBase(name="Flashcards")

    # Test invalid URL
    with pytest.raises(ValidationError):
        StudyActivityBase(name="Flashcards", url="invalid-url")

def test_study_session_base_validation():
    """Test StudySessionBase schema validation."""
    valid_data = {
        "group_id": 1,
        "study_activity_id": 1
    }
    session_base = StudySessionBase(**valid_data)
    assert session_base.group_id == valid_data["group_id"]
    assert session_base.study_activity_id == valid_data["study_activity_id"]

    # Test invalid data - missing required fields
    with pytest.raises(ValidationError):
        StudySessionBase(group_id=1)

    # Test invalid data types
    with pytest.raises(ValidationError):
        StudySessionBase(group_id="invalid", study_activity_id=1)

def test_study_session_create_validation():
    """Test StudySessionCreate schema validation."""
    valid_data = {
        "group_id": 1,
        "study_activity_id": 1
    }
    session_create = StudySessionCreate(**valid_data)
    assert isinstance(session_create, StudySessionBase)
    assert session_create.group_id == valid_data["group_id"]
    assert session_create.study_activity_id == valid_data["study_activity_id"]

def test_study_session_update_validation():
    """Test StudySessionUpdate schema validation."""
    # Test partial update
    partial_data = {
        "group_id": 2
    }
    session_update = StudySessionUpdate(**partial_data)
    assert session_update.group_id == partial_data["group_id"]
    assert session_update.study_activity_id is None

    # Test full update
    full_data = {
        "group_id": 2,
        "study_activity_id": 2
    }
    session_update = StudySessionUpdate(**full_data)
    assert session_update.group_id == full_data["group_id"]
    assert session_update.study_activity_id == full_data["study_activity_id"]

    # Test empty update
    empty_update = StudySessionUpdate()
    assert empty_update.group_id is None
    assert empty_update.study_activity_id is None

def test_study_session_response_schema(
    sample_study_session_data: Dict[str, Any],
    sample_word_review_data: Dict[str, Any]
):
    """Test StudySession response schema."""
    session = StudySession(**sample_study_session_data)
    assert session.id == sample_study_session_data["id"]
    assert session.group_id == sample_study_session_data["group_id"]
    assert session.study_activity_id == sample_study_session_data["study_activity_id"]
    assert len(session.reviews) == 1
    assert isinstance(session.created_at, str)

    # Test without reviews
    data_no_reviews = {**sample_study_session_data, "reviews": []}
    session = StudySession(**data_no_reviews)
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
    assert review.study_session_id == sample_word_review_data["study_session_id"]
    assert review.correct == sample_word_review_data["correct"]
    assert isinstance(review.created_at, str)

    # Test invalid data
    with pytest.raises(ValidationError):
        WordReviewBase(word_id="invalid", correct=True)

def test_study_session_stats_validation():
    """Test StudySessionStats schema validation."""
    valid_data = {
        "total_reviews": 10,
        "correct_reviews": 8,
        "accuracy": 0.8
    }
    stats = StudySessionStats(**valid_data)
    assert stats.total_reviews == valid_data["total_reviews"]
    assert stats.correct_reviews == valid_data["correct_reviews"]
    assert stats.accuracy == valid_data["accuracy"]

    # Test default values
    empty_stats = StudySessionStats()
    assert empty_stats.total_reviews == 0
    assert empty_stats.correct_reviews == 0
    assert empty_stats.accuracy == 0.0

    # Test invalid data
    with pytest.raises(ValidationError):
        StudySessionStats(total_reviews=-1)
    
    with pytest.raises(ValidationError):
        StudySessionStats(accuracy=1.5)
