"""
Tests for language utilities.
"""

import pytest
from pathlib import Path
from typing import Dict, Any, List

from app.utils.language import (
    extract_vocabulary,
    get_word_info,
    track_learned_vocabulary
)


def test_extract_vocabulary() -> None:
    """Test extracting vocabulary from Japanese text."""
    # Test with simple text
    text = "こんにちは、私の名前はタナカです。"
    words = extract_vocabulary(text)
    
    assert isinstance(words, list)
    assert len(words) > 0
    assert "こんにちは" in words or "私" in words or "名前" in words or "タナカ" in words
    
    # Test with empty text
    assert extract_vocabulary("") == []
    
    # Test with non-Japanese text
    english_text = "Hello, my name is Tanaka."
    english_words = extract_vocabulary(english_text)
    assert len(english_words) == 0
    
    # Test with mixed text
    mixed_text = "Hello, 私の名前はTanakaです。"
    mixed_words = extract_vocabulary(mixed_text)
    assert len(mixed_words) > 0
    assert all(word.isascii() is False for word in mixed_words)


def test_get_word_info() -> None:
    """Test getting word information."""
    # Test with no LLM client and no vocabulary database
    word = "こんにちは"
    word_info = get_word_info(word)
    
    assert isinstance(word_info, dict)
    assert word_info["word"] == word
    assert "reading" in word_info
    assert "meaning" in word_info
    assert "part_of_speech" in word_info
    assert "level" in word_info


def test_track_learned_vocabulary() -> None:
    """Test tracking learned vocabulary."""
    # Initialize player data
    player_data: Dict[str, Any] = {
        "name": "Test Player",
        "language_level": "beginner",
        "learned_words": []
    }
    
    # Test adding a new word with correct answer
    word = "こんにちは"
    updated_data = track_learned_vocabulary(word, True, player_data)
    
    assert len(updated_data["learned_words"]) == 1
    assert updated_data["learned_words"][0]["word"] == word
    assert updated_data["learned_words"][0]["correct_count"] == 1
    assert updated_data["learned_words"][0]["incorrect_count"] == 0
    
    # Test updating the same word with incorrect answer
    updated_data = track_learned_vocabulary(word, False, updated_data)
    
    assert len(updated_data["learned_words"]) == 1  # Still only one word
    assert updated_data["learned_words"][0]["correct_count"] == 1
    assert updated_data["learned_words"][0]["incorrect_count"] == 1
    
    # Test adding another word
    word2 = "さようなら"
    updated_data = track_learned_vocabulary(word2, True, updated_data)
    
    assert len(updated_data["learned_words"]) == 2
    
    # Test mastery level calculation
    # Add multiple correct answers to increase mastery level
    for _ in range(10):
        updated_data = track_learned_vocabulary(word2, True, updated_data)
        
    word2_entry = next(entry for entry in updated_data["learned_words"] if entry["word"] == word2)
    assert word2_entry["mastery_level"] > 0  # Should have increased mastery level


def test_track_learned_vocabulary_empty_player_data() -> None:
    """Test tracking learned vocabulary with empty player data."""
    # Initialize empty player data
    player_data: Dict[str, Any] = {}
    
    # Test adding a word
    word = "こんにちは"
    updated_data = track_learned_vocabulary(word, True, player_data)
    
    assert "learned_words" in updated_data
    assert len(updated_data["learned_words"]) == 1
    assert updated_data["learned_words"][0]["word"] == word 