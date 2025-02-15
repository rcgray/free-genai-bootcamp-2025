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
def sample_study_session_data() -> Dict[str, Any]:
    """Sample study session data for testing schemas."""
    return {
        "id": 1,
        "group_id": 1,
        "study_activity_id": 1,
        "created_at": datetime.utcnow(),
        "reviews": [
            {
                "id": 1,
                "word_id": 1,
                "study_session_id": 1,
                "correct": True,
                "created_at": datetime.utcnow()
            }
        ]
    }

@pytest.fixture
def sample_study_activity_data() -> Dict[str, Any]:
    """Sample study activity data for testing schemas."""
    return {
        "id": 1,
        "name": "Flashcards",
        "url": "http://example.com/flashcards"
    }

@pytest.fixture
def sample_word_review_data() -> Dict[str, Any]:
    """Sample word review data for testing schemas."""
    return {
        "id": 1,
        "word_id": 1,
        "study_session_id": 1,
        "correct": True,
        "created_at": datetime.utcnow()
    }
