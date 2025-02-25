"""Tests for the audio processor module."""

import os
from pathlib import Path

import pytest

from backend import get_audio_duration, get_mp3_metadata
from backend.audio_processor import (
    MAX_FILE_SIZE_MB,
    extract_text_from_vtt,
)

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


def test_extract_text_from_vtt() -> None:
    """Test the extract_text_from_vtt function."""
    # Create a sample WebVTT content
    vtt_content = """WEBVTT

1
00:00:00:000 --> 00:00:05:000
This is a test.

2
00:00:05:000 --> 00:00:10:000
This is another line."""

    # Extract text
    extracted_text = extract_text_from_vtt(vtt_content)

    # Check that timestamps and headers are removed
    assert "WEBVTT" not in extracted_text
    assert "00:00:00:000" not in extracted_text
    assert "-->" not in extracted_text

    # Check that text content is preserved
    assert "This is a test." in extracted_text
    assert "This is another line." in extracted_text

    # Test with empty VTT
    empty_vtt = "WEBVTT\n\n"
    assert extract_text_from_vtt(empty_vtt) == ""


@pytest.mark.api
def test_transcribe_audio() -> None:
    """Test audio transcription functionality.

    This test requires:
    1. A valid OpenAI API key in .env
    2. API credits for the transcription
    """
    # Skip if the test file doesn't exist
    if not os.path.exists(TEST_AUDIO_FILE):
        pytest.skip(f"Test file {TEST_AUDIO_FILE} not found")

    from backend import transcribe_audio

    # Create a temporary output file
    output_path = "tests/data/temp_transcript.txt"

    try:
        # Transcribe the audio with explicit output path (text format)
        transcript, path = transcribe_audio(
            file_path=TEST_AUDIO_FILE, output_path=output_path, format="text"
        )

        # Check that we got a transcript
        assert transcript, "Transcript should not be empty"
        assert os.path.exists(output_path), "Output file should exist"
        assert path == output_path, "Returned path should match provided output path"

        # Check that the file contains the transcript
        with open(output_path, encoding="utf-8") as f:
            file_content = f.read()
        assert file_content == transcript, "File content should match transcript"

        # Test with WebVTT format
        webvtt_path = "tests/data/temp_transcript.vtt"
        webvtt_transcript, webvtt_path = transcribe_audio(
            file_path=TEST_AUDIO_FILE, output_path=webvtt_path, format="webvtt"
        )

        # Check that we got a WebVTT transcript
        assert webvtt_transcript, "WebVTT transcript should not be empty"
        assert webvtt_transcript.startswith(
            "WEBVTT"
        ), "WebVTT should start with WEBVTT header"
        assert os.path.exists(webvtt_path), "WebVTT output file should exist"

        # Test with default output path
        os.remove(output_path)  # Clean up first

        # Transcribe without specifying output path (default WebVTT)
        transcript2, default_path = transcribe_audio(file_path=TEST_AUDIO_FILE)

        # Check that the default path follows the expected pattern
        expected_default_path = "media/transcripts/Reira_Warning_Audio.vtt"
        assert (
            default_path == expected_default_path
        ), f"Expected default path {expected_default_path}, got {default_path}"
        assert os.path.exists(default_path), "Default output file should exist"
        assert transcript2.startswith("WEBVTT"), "Default format should be WebVTT"

    except ImportError:
        pytest.skip("OpenAI library not installed")
    except ValueError as e:
        if "API key" in str(e):
            pytest.skip("OpenAI API key not configured")
        else:
            raise
    finally:
        # Clean up
        if os.path.exists(output_path):
            os.unlink(output_path)
        webvtt_path = "tests/data/temp_transcript.vtt"
        if os.path.exists(webvtt_path):
            os.unlink(webvtt_path)
        default_path = "media/transcripts/Reira_Warning_Audio.vtt"
        if os.path.exists(default_path):
            os.unlink(default_path)


@pytest.mark.api
def test_translate_audio() -> None:
    """Test audio translation functionality.

    This test requires:
    1. A valid OpenAI API key in .env
    2. API credits for translation
    """
    # Skip if the test file doesn't exist
    if not os.path.exists(TEST_AUDIO_FILE):
        pytest.skip(f"Test file {TEST_AUDIO_FILE} not found")

    from backend import translate_audio

    # Create temporary output files
    output_path = "tests/data/temp_translation.txt"

    try:
        # Translate the audio with explicit output path
        translation, path = translate_audio(
            file_path=TEST_AUDIO_FILE, output_path=output_path
        )

        # Check that we got a translation
        assert translation, "Translation should not be empty"
        assert os.path.exists(output_path), "Output file should exist"
        assert path == output_path, "Returned path should match provided output path"

        # Check that the file contains the translation
        with open(output_path, encoding="utf-8") as f:
            file_content = f.read()
        assert file_content == translation, "File content should match translation"

        # Test with default output path
        os.remove(output_path)  # Clean up first

        # Translate without specifying output path
        translation2, default_path = translate_audio(file_path=TEST_AUDIO_FILE)

        # Check that the default path follows the expected pattern
        expected_default_path = "media/translations/Reira_Warning_Audio.txt"
        assert (
            default_path == expected_default_path
        ), f"Expected default path {expected_default_path}, got {default_path}"
        assert os.path.exists(default_path), "Default output file should exist"

    except ImportError:
        pytest.skip("OpenAI library not installed")
    except ValueError as e:
        if "API key" in str(e):
            pytest.skip("OpenAI API key not configured")
        else:
            raise
    finally:
        # Clean up
        if os.path.exists(output_path):
            os.unlink(output_path)
        default_path = "media/translations/Reira_Warning_Audio.txt"
        if os.path.exists(default_path):
            os.unlink(default_path)


def test_file_size_limit() -> None:
    """Test that files exceeding the size limit are rejected."""

    # Create a mock file that reports a size larger than the limit
    class MockPath:
        def __init__(
            self, exists: bool = True, is_file: bool = True, size: int = 0
        ) -> None:
            self._exists = exists
            self._is_file = is_file
            self._size = size

        def exists(self) -> bool:
            return self._exists

        def is_file(self) -> bool:
            return self._is_file

        def stat(self) -> object:
            class Stat:
                def __init__(self, size: int) -> None:
                    self.st_size = size

            return Stat(self._size)

    # Import the function to test
    import backend.audio_processor
    from backend.audio_processor import transcribe_audio

    # Create a mock for Path that returns our MockPath
    def mock_path_constructor(path_str: str) -> MockPath:
        # Size in bytes: 51MB
        return MockPath(size=(MAX_FILE_SIZE_MB + 1) * 1024 * 1024)

    # Save the original Path constructor
    original_path = backend.audio_processor.Path

    try:
        # Patch the Path constructor
        backend.audio_processor.Path = mock_path_constructor  # type: ignore

        # Test that a file exceeding the size limit raises ValueError
        with pytest.raises(ValueError) as excinfo:
            transcribe_audio("mock_large_file.mp3")

        # Check the error message
        assert "too large" in str(excinfo.value)
        assert f"{MAX_FILE_SIZE_MB}MB" in str(excinfo.value)

    finally:
        # Restore the original Path constructor
        backend.audio_processor.Path = original_path  # type: ignore
