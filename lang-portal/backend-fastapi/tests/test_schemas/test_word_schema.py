import pytest
from pydantic import ValidationError
from app.schemas.word import WordPart, WordBase, WordCreate, WordUpdate, Word, WordInGroup

def test_word_part_validation():
    """Test WordPart schema validation."""
    # Test valid data
    valid_data = {
        "kanji": "食",
        "romaji": ["ta", "ha"]
    }
    word_part = WordPart(**valid_data)
    assert word_part.kanji == valid_data["kanji"]
    assert word_part.romaji == valid_data["romaji"]

    # Test invalid data - missing required field
    with pytest.raises(ValidationError):
        WordPart(romaji=["ta"])

    # Test invalid data - wrong type for romaji
    with pytest.raises(ValidationError):
        WordPart(kanji="食", romaji="ta")

def test_word_base_validation():
    """Test WordBase schema validation."""
    # Test valid data
    valid_data = {
        "kanji": "食べる",
        "romaji": "taberu",
        "english": "to eat",
        "parts": [
            {"kanji": "食", "romaji": ["ta"]},
            {"kanji": "べ", "romaji": ["be"]},
            {"kanji": "る", "romaji": ["ru"]}
        ]
    }
    word_base = WordBase(**valid_data)
    assert word_base.kanji == valid_data["kanji"]
    assert word_base.romaji == valid_data["romaji"]
    assert word_base.english == valid_data["english"]
    assert len(word_base.parts) == 3
    assert isinstance(word_base.parts[0], WordPart)

    # Test invalid data - missing required field
    with pytest.raises(ValidationError):
        WordBase(kanji="食べる", romaji="taberu", parts=[])

    # Test invalid data - invalid parts structure
    with pytest.raises(ValidationError):
        WordBase(
            kanji="食べる",
            romaji="taberu",
            english="to eat",
            parts=[{"invalid": "data"}]
        )

def test_word_create_validation():
    """Test WordCreate schema validation."""
    # WordCreate should behave exactly like WordBase
    valid_data = {
        "kanji": "食べる",
        "romaji": "taberu",
        "english": "to eat",
        "parts": [
            {"kanji": "食", "romaji": ["ta"]},
            {"kanji": "べ", "romaji": ["be"]},
            {"kanji": "る", "romaji": ["ru"]}
        ]
    }
    word_create = WordCreate(**valid_data)
    assert isinstance(word_create, WordBase)

def test_word_update_validation():
    """Test WordUpdate schema validation."""
    # Test partial update - all fields optional
    partial_data = {
        "kanji": "食べる"
    }
    word_update = WordUpdate(**partial_data)
    assert word_update.kanji == partial_data["kanji"]
    assert word_update.romaji is None
    assert word_update.english is None
    assert word_update.parts is None

    # Test full update
    full_data = {
        "kanji": "食べる",
        "romaji": "taberu",
        "english": "to eat",
        "parts": [
            {"kanji": "食", "romaji": ["ta"]},
            {"kanji": "べ", "romaji": ["be"]},
            {"kanji": "る", "romaji": ["ru"]}
        ]
    }
    word_update = WordUpdate(**full_data)
    assert word_update.kanji == full_data["kanji"]
    assert word_update.romaji == full_data["romaji"]
    assert word_update.english == full_data["english"]
    assert len(word_update.parts) == 3

    # Test invalid parts structure
    with pytest.raises(ValidationError):
        WordUpdate(parts=[{"invalid": "data"}])

def test_word_response_schema():
    """Test Word response schema."""
    valid_data = {
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
    word = Word(**valid_data)
    assert word.id == valid_data["id"]
    assert word.kanji == valid_data["kanji"]
    assert word.correct_count == valid_data["correct_count"]
    assert word.wrong_count == valid_data["wrong_count"]

    # Test default values for counts
    minimal_data = {
        "id": 1,
        "kanji": "食べる",
        "romaji": "taberu",
        "english": "to eat",
        "parts": [{"kanji": "食", "romaji": ["ta"]}]
    }
    word = Word(**minimal_data)
    assert word.correct_count == 0
    assert word.wrong_count == 0

def test_word_in_group_schema():
    """Test WordInGroup schema."""
    valid_data = {
        "id": 1,
        "kanji": "食べる",
        "romaji": "taberu",
        "english": "to eat",
        "parts": [{"kanji": "食", "romaji": ["ta"]}],
        "correct_count": 5,
        "wrong_count": 2,
        "group_ids": [1, 2, 3]
    }
    word = WordInGroup(**valid_data)
    assert word.id == valid_data["id"]
    assert word.group_ids == valid_data["group_ids"]

    # Test invalid group_ids
    with pytest.raises(ValidationError):
        WordInGroup(**{**valid_data, "group_ids": "invalid"})
