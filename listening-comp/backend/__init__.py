"""Backend package for Japanese Listening Learning Tool."""

from backend.audio_processor import get_audio_duration, get_mp3_metadata

# Make these functions available at the package level
__all__ = ["get_greeting", "get_audio_duration", "get_mp3_metadata"]


def get_greeting(name: str = "World") -> str:
    """Return a greeting message.

    Args:
        name: Name to greet. Defaults to "World".

    Returns:
        A greeting message string.
    """
    return f"こんにちは {name}! Welcome to Japanese Listening Learning Tool!"
