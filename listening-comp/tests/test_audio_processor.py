"""Tests for the audio processor module."""

import os
from pathlib import Path

import pytest

from backend import get_audio_duration, get_mp3_metadata

# Test file path
TEST_AUDIO_FILE = "media/sources/Reira_Warning_Audio.mp3"


def test_audio_file_exists() -> None:
    """Test that the test audio file exists."""
    assert os.path.exists(
        TEST_AUDIO_FILE
    ), f"Test file {TEST_AUDIO_FILE} does not exist"


def test_get_audio_duration() -> None:
    """Test that get_audio_duration returns the correct duration for the test file."""
    # Skip if the test file doesn't exist
    if not os.path.exists(TEST_AUDIO_FILE):
        pytest.skip(f"Test file {TEST_AUDIO_FILE} not found")

    # Get the duration
    duration = get_audio_duration(TEST_AUDIO_FILE)

    # The expected duration is 15 seconds
    expected_duration = 15

    # Assert that the duration is correct
    assert (
        duration == expected_duration
    ), f"Expected duration {expected_duration}s, got {duration}s"


def test_get_mp3_metadata() -> None:
    """Test that get_mp3_metadata returns the correct metadata for the test file."""
    # Skip if the test file doesn't exist
    if not os.path.exists(TEST_AUDIO_FILE):
        pytest.skip(f"Test file {TEST_AUDIO_FILE} not found")

    # Get the metadata
    metadata = get_mp3_metadata(TEST_AUDIO_FILE)

    # Assert that the metadata contains the expected keys
    assert "duration" in metadata, "Metadata should contain duration"
    assert "bitrate" in metadata, "Metadata should contain bitrate"
    assert "sample_rate" in metadata, "Metadata should contain sample_rate"
    assert "channels" in metadata, "Metadata should contain channels"

    # Assert that the duration matches what we expect
    assert (
        metadata["duration"] == 15
    ), f"Expected duration 15s, got {metadata['duration']}s"


def test_file_not_found() -> None:
    """Test that appropriate errors are raised when file is not found."""
    non_existent_file = "media/sources/non_existent_file.mp3"

    # Test get_audio_duration
    with pytest.raises(FileNotFoundError):
        get_audio_duration(non_existent_file)

    # Test get_mp3_metadata
    with pytest.raises(FileNotFoundError):
        get_mp3_metadata(non_existent_file)


def test_invalid_file_type() -> None:
    """Test that appropriate errors are raised for invalid file types."""
    # Create a temporary text file
    temp_file = Path("tests/data/temp.txt")
    temp_file.parent.mkdir(exist_ok=True)
    temp_file.write_text("This is not an MP3 file")

    try:
        # Test get_audio_duration with non-MP3 file
        with pytest.raises(ValueError) as excinfo:
            get_audio_duration(str(temp_file))
        assert "File must be an MP3" in str(excinfo.value)
    finally:
        # Clean up
        if temp_file.exists():
            temp_file.unlink()
