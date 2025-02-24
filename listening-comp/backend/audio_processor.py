"""Audio processing utilities for the Japanese Listening Learning Tool."""

from pathlib import Path
from typing import Any, Dict

# For MP3 files, mutagen is the most lightweight option without external dependencies
try:
    from mutagen.mp3 import MP3

    HAS_MUTAGEN = True
except ImportError:
    HAS_MUTAGEN = False


def get_audio_duration(file_path: str) -> int:
    """Get the duration of an MP3 audio file in seconds.

    Args:
        file_path: Path to the MP3 audio file

    Returns:
        Duration in seconds (rounded to nearest second)
    """
    path = Path(file_path)

    if not path.exists():
        raise FileNotFoundError(f"Audio file not found: {file_path}")

    if not path.is_file():
        raise ValueError(f"Path is not a file: {file_path}")

    # Check file extension
    if path.suffix.lower() != ".mp3":
        raise ValueError(f"File must be an MP3: {file_path}")

    if not HAS_MUTAGEN:
        raise ImportError(
            "Mutagen library is required for MP3 processing. "
            "Please install it with: uv pip install mutagen"
        )

    return _get_mp3_duration(file_path)


def _get_mp3_duration(file_path: str) -> int:
    """Get MP3 audio duration using mutagen.

    Args:
        file_path: Path to the MP3 audio file

    Returns:
        Duration in seconds (rounded to nearest second)
    """
    try:
        audio = MP3(file_path)

        # Explicitly check for None to satisfy mypy
        if audio.info is None:
            raise ValueError(f"Could not extract audio info from MP3: {file_path}")

        duration = audio.info.length
        return round(duration)
    except Exception as e:
        raise ValueError(f"Error processing MP3 file: {e}") from e


def get_mp3_metadata(file_path: str) -> Dict[str, Any]:
    """Extract metadata from an MP3 file.

    Args:
        file_path: Path to the MP3 audio file

    Returns:
        Dictionary containing metadata (title, artist, etc.)
    """
    if not HAS_MUTAGEN:
        raise ImportError(
            "Mutagen library is required for MP3 processing. "
            "Please install it with: uv pip install mutagen"
        )

    path = Path(file_path)
    if not path.exists() or not path.is_file():
        raise FileNotFoundError(f"MP3 file not found: {file_path}")

    try:
        audio = MP3(file_path)

        # Explicitly check for None to satisfy mypy
        if audio.info is None:
            raise ValueError(f"Could not extract audio info from MP3: {file_path}")

        metadata: Dict[str, Any] = {
            "duration": round(audio.info.length),
            "bitrate": audio.info.bitrate,
            "sample_rate": audio.info.sample_rate,
            "channels": audio.info.channels,
        }

        # Extract ID3 tags if available
        if hasattr(audio, "tags") and audio.tags:
            for key in audio.tags.keys():
                # Skip non-text tags
                if key.startswith("T") and key != "TXXX":
                    metadata[key] = str(audio.tags[key])

        return metadata
    except Exception as e:
        raise ValueError(f"Error processing MP3 file: {e}") from e
