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
    db_path = "test_data/test.json"
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
        source_type="youtube",
        duration_seconds=300.0,
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
        source_type="spotify",
        duration_seconds=240.0,
        download_path="media/sources/test2.mp3",
    )

    source = test_db.get_source_by_url(url)
    assert source is not None
    assert source["title"] == "Test Audio 2"
    assert source["source_type"] == "spotify"


def test_update_source_status(test_db: Database) -> None:
    """Test updating source status."""
    doc_id = test_db.add_source(
        url="https://example.com/test3",
        title="Test Audio 3",
        source_type="youtube",
        duration_seconds=180.0,
        download_path="media/sources/test3.mp3",
    )

    test_db.update_source_status(
        doc_id,
        status="downloaded",
        transcript_path="media/transcripts/test3.json",
    )

    source = test_db.get_source(doc_id)
    assert source is not None
    assert source["status"] == "downloaded"
    assert source["transcript_path"] == "media/transcripts/test3.json"
