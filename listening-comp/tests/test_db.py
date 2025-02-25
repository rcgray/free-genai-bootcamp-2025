"""Tests for the database module."""

import os
from typing import Generator

import pytest

from backend.db import Database


@pytest.fixture
def test_db() -> Generator[Database, None, None]:
    """Create a test database.

    Returns:
        Database instance for testing
    """
    db_path = "tests/data/test.json"
    os.makedirs(os.path.dirname(db_path), exist_ok=True)
    db = Database(db_path)
    yield db
    # Cleanup
    if os.path.exists(db_path):
        os.remove(db_path)


def test_add_source(test_db: Database) -> None:
    """Test adding a source to the database."""
    doc_id = test_db.add_source(
        url="https://example.com/test",
        title="Test Audio",
        source_type="Podcast URL (.mp3)",
        duration_seconds=300,
        download_path="media/sources/test.mp3",
    )

    assert doc_id is not None
    source = test_db.get_source(doc_id)
    assert source is not None
    assert source["url"] == "https://example.com/test"
    assert source["title"] == "Test Audio"
    assert source["status"] == "pending"


def test_get_source_by_url(test_db: Database) -> None:
    """Test retrieving a source by URL."""
    url = "https://example.com/test2"
    test_db.add_source(
        url=url,
        title="Test Audio 2",
        source_type="Podcast URL (.mp3)",
        duration_seconds=240,
        download_path="media/sources/test2.mp3",
    )

    source = test_db.get_source_by_url(url)
    assert source is not None
    assert source["title"] == "Test Audio 2"
    assert source["source_type"] == "Podcast URL (.mp3)"


def test_update_source_status(test_db: Database) -> None:
    """Test updating source status."""
    doc_id = test_db.add_source(
        url="https://example.com/test3",
        title="Test Audio 3",
        source_type="Podcast URL (.mp3)",
        duration_seconds=180,
        download_path="media/sources/test3.mp3",
    )

    # Test updating with transcript path
    test_db.update_source_status(
        doc_id,
        status="pending",
        transcript_path="media/transcripts/test3.vtt",
    )

    source = test_db.get_source(doc_id)
    assert source is not None
    assert source["status"] == "pending"
    assert source["transcript_path"] == "media/transcripts/test3.vtt"

    # Test updating to completed status
    test_db.update_source_status(
        doc_id,
        status="completed",
        translation_path="media/translations/test3.vtt",
    )

    source = test_db.get_source(doc_id)
    assert source is not None
    assert source["status"] == "completed"
    assert source["translation_path"] == "media/translations/test3.vtt"

    # Test updating to error status
    test_db.update_source_status(
        doc_id,
        status="error",
    )

    source = test_db.get_source(doc_id)
    assert source is not None
    assert source["status"] == "error"


def test_helper_functions(test_db: Database) -> None:
    """Test the helper functions for determining processing state."""
    from backend.db import (
        get_processing_progress,
        is_in_error_state,
        is_ready_for_audio_generation,
        is_ready_for_study,
        is_ready_for_transcription,
        is_ready_for_translation,
    )

    # Create a source with just download_path
    doc_id = test_db.add_source(
        url="https://example.com/test4",
        title="Test Audio 4",
        source_type="Podcast URL (.mp3)",
        duration_seconds=180,
        download_path="media/sources/test4.mp3",
    )

    source = test_db.get_source(doc_id)
    assert source is not None

    # Test initial state
    assert is_ready_for_transcription(source)
    assert not is_ready_for_translation(source)
    assert not is_ready_for_audio_generation(source)
    assert not is_ready_for_study(source)
    assert not is_in_error_state(source)
    assert get_processing_progress(source) == 0.25  # 25% for download

    # Update with transcript path
    test_db.update_source_status(
        doc_id,
        status="pending",
        transcript_path="media/transcripts/test4.vtt",
    )

    source = test_db.get_source(doc_id)
    assert source is not None

    # Test state after transcription
    assert not is_ready_for_transcription(source)
    assert is_ready_for_translation(source)
    assert not is_ready_for_audio_generation(source)
    assert not is_ready_for_study(source)
    assert not is_in_error_state(source)
    assert get_processing_progress(source) == 0.5  # 50% for download + transcript

    # Update with translation path
    test_db.update_source_status(
        doc_id,
        status="pending",
        translation_path="media/translations/test4.vtt",
    )

    source = test_db.get_source(doc_id)
    assert source is not None

    # Test state after translation
    assert not is_ready_for_transcription(source)
    assert not is_ready_for_translation(source)
    assert is_ready_for_audio_generation(source)
    assert not is_ready_for_study(source)
    assert not is_in_error_state(source)
    assert (
        get_processing_progress(source) == 0.75
    )  # 75% for download + transcript + translation

    # Update to completed status
    test_db.update_source_status(
        doc_id,
        status="completed",
    )

    source = test_db.get_source(doc_id)
    assert source is not None

    # Test state after completion
    assert not is_ready_for_transcription(source)
    assert not is_ready_for_translation(source)
    assert not is_ready_for_audio_generation(source)
    assert is_ready_for_study(source)
    assert not is_in_error_state(source)
    assert (
        get_processing_progress(source) == 1.0
    )  # 100% for download + transcript + translation + completion

    # Update to error status
    test_db.update_source_status(
        doc_id,
        status="error",
    )

    source = test_db.get_source(doc_id)
    assert source is not None

    # Test state after error
    assert not is_ready_for_transcription(source)
    assert not is_ready_for_translation(source)
    assert not is_ready_for_audio_generation(source)
    assert not is_ready_for_study(source)
    assert is_in_error_state(source)
    # Progress remains at 75% since completion is not reached
    assert get_processing_progress(source) == 0.75
