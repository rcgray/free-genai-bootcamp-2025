"""Backend package for Japanese Listening Learning Tool."""

from backend.audio_processor import (
    get_audio_duration,
    get_mp3_metadata,
    transcribe_audio,
    translate_audio,
    format_json_transcript_for_display,
)
from backend.db import (
    get_processing_progress,
    is_in_error_state,
    is_ready_for_audio_generation,
    is_ready_for_study,
    is_ready_for_transcription,
    is_ready_for_translation,
)

# Make these functions available at the package level
__all__ = [
    "get_greeting",
    "get_audio_duration",
    "get_mp3_metadata",
    "transcribe_audio",
    "translate_audio",
    "format_json_transcript_for_display",
    "is_ready_for_transcription",
    "is_ready_for_translation",
    "is_ready_for_audio_generation",
    "is_ready_for_study",
    "is_in_error_state",
    "get_processing_progress",
]


def get_greeting(name: str = "World") -> str:
    """Return a greeting message.

    Args:
        name: Name to greet. Defaults to "World".

    Returns:
        A greeting message string.
    """
    return f"こんにちは {name}! Welcome to Japanese Listening Learning Tool!"
