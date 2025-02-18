import pytest
from datetime import datetime
from typing import Dict, Any

@pytest.fixture
def sample_word_data() -> Dict[str, Any]:
    """Sample word data for testing schemas."""
    return {
        "id": 1,
        "kanji": "食べる",
        "romaji": "taberu",
        "english": "to eat",
        "parts": [
            {"kanji": "食", "romaji": ["ta"]},
            {"kanji": "べ", "romaji": ["be"]},
            {"kanji": "る", "romaji": ["ru"]}
        ],
        "correct_count": 5,
        "wrong_count": 2
    }

@pytest.fixture
def sample_group_data() -> Dict[str, Any]:
    """Sample group data for testing schemas."""
    return {
        "id": 1,
        "name": "Basic Verbs",
        "words_count": 10
    }

@pytest.fixture
def sample_session_data() -> Dict[str, Any]:
    """Sample session data for testing."""
    return {
        "id": 1,
        "group_id": 1,
        "activity_id": 1,
        "created_at": "2025-01-01T00:00:00",
        "reviews": [
            {
                "id": 1,
                "word_id": 1,
                "session_id": 1,
                "correct": True,
                "created_at": "2025-01-01T00:00:00"
            }
        ]
    }

@pytest.fixture
def sample_activity_data() -> Dict[str, Any]:
    """Sample activity data for testing."""
    return {
        "id": 1,
        "name": "Flashcards",
        "url": "http://example.com/flashcards",
        "description": "Practice vocabulary with flashcards"
    }

@pytest.fixture
def sample_word_review_data() -> Dict[str, Any]:
    """Sample word review data for testing."""
    return {
        "id": 1,
        "word_id": 1,
        "session_id": 1,
        "correct": True,
        "created_at": "2025-01-01T00:00:00"
    }
