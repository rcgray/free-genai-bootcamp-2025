"""Audio processing utilities for the Japanese Listening Learning Tool."""

import os
from pathlib import Path
from typing import Any, Dict, Optional, Tuple

# For environment variables
from dotenv import load_dotenv

# For MP3 files, mutagen is the most lightweight option without external dependencies
try:
    from mutagen.mp3 import MP3

    HAS_MUTAGEN = True
except ImportError:
    HAS_MUTAGEN = False

# For OpenAI API
try:
    import openai

    HAS_OPENAI = True
except ImportError:
    HAS_OPENAI = False

# Load environment variables
load_dotenv()

# Default settings (can be overridden by environment variables)
DEFAULT_WHISPER_MODEL = "whisper-1"
DEFAULT_GPT_MODEL = "gpt-4-turbo"
MAX_AUDIO_DURATION = int(os.getenv("MAX_AUDIO_DURATION_SECONDS", "1800"))  # 30 minutes
MAX_FILE_SIZE_MB = 50  # OpenAI API limit for audio files


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
        # audio.info is guaranteed to exist and have a length attribute
        # when the MP3 file is successfully loaded
        return round(audio.info.length)
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
        # audio.info is guaranteed to exist with these attributes
        # when the MP3 file is successfully loaded
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


def extract_text_from_vtt(vtt_content: str) -> str:
    """Extract plain text from WebVTT format.

    Args:
        vtt_content: WebVTT formatted string

    Returns:
        Plain text content without timestamps and headers
    """
    lines = vtt_content.split("\n")
    text_lines = []

    # Process each line
    for line in lines:
        line = line.strip()

        # Skip empty lines
        if not line:
            continue

        # Skip the WEBVTT header line
        if line == "WEBVTT":
            continue

        # Skip cue numbers (just digits)
        if line.isdigit():
            continue

        # Skip timestamp lines
        if "-->" in line:
            continue

        # If we get here, it's actual text content
        text_lines.append(line)

    return "\n".join(text_lines)


def transcribe_audio(
    file_path: str,
    output_path: Optional[str] = None,
    language: str = "ja",
    model: Optional[str] = None,
    format: str = "webvtt",
) -> Tuple[str, str]:
    """Transcribe audio file using OpenAI's Whisper API.

    Args:
        file_path: Path to the audio file
        output_path: Path to save the transcript (optional)
        language: Language code (default: 'ja' for Japanese)
        model: Whisper model to use (default: from env or DEFAULT_WHISPER_MODEL)
        format: Output format - "text" or "webvtt" (default: "webvtt")

    Returns:
        Tuple of (transcript text, output file path if saved)
    """
    if not HAS_OPENAI:
        raise ImportError(
            "OpenAI library is required for transcription. "
            "Please install it with: uv pip install openai"
        )

    # Check for API key
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise ValueError(
            "OpenAI API key not found. Please set the OPENAI_API_KEY environment variable."
        )

    # Initialize OpenAI client
    client = openai.OpenAI(api_key=api_key)

    # Validate file
    path = Path(file_path)
    if not path.exists() or not path.is_file():
        raise FileNotFoundError(f"Audio file not found: {file_path}")

    # Check file size (50MB limit)
    file_size_mb = path.stat().st_size / (1024 * 1024)
    if file_size_mb > MAX_FILE_SIZE_MB:
        raise ValueError(
            f"Audio file is too large ({file_size_mb:.2f}MB). "
            f"Maximum allowed size is {MAX_FILE_SIZE_MB}MB."
        )

    # Check file duration
    duration = get_audio_duration(file_path)
    if duration > MAX_AUDIO_DURATION:
        raise ValueError(
            f"Audio file is too long ({duration}s). "
            f"Maximum allowed duration is {MAX_AUDIO_DURATION}s."
        )

    # Use model from env or default
    whisper_model = model or os.getenv("WHISPER_MODEL", DEFAULT_WHISPER_MODEL)

    # Determine response format based on requested output format
    api_response_format = "text"
    file_extension = ".txt"

    if format.lower() == "webvtt":
        # Use OpenAI's native VTT format
        api_response_format = "vtt"
        file_extension = ".vtt"

    try:
        # Open the audio file
        with open(path, "rb") as audio_file:
            # Call the OpenAI API with the correct parameter types
            response = client.audio.transcriptions.create(
                model=whisper_model,
                file=audio_file,
                language=language,
                response_format=api_response_format,  # type: ignore
            )

        # The response is already a string
        transcript = response

        # Save transcript if output path is provided or generate default path
        if output_path is None:
            # Extract the title from the file path (without extension)
            title = path.stem
            # Create the default output path in media/transcripts directory
            output_path = f"media/transcripts/{title}{file_extension}"

        # Save the transcript
        output_file = Path(output_path)
        output_file.parent.mkdir(parents=True, exist_ok=True)
        output_file.write_text(transcript, encoding="utf-8")
        return transcript, output_path

    except Exception as e:
        raise ValueError(f"Error transcribing audio: {e}") from e


def translate_audio(
    file_path: str,
    output_path: Optional[str] = None,
    model: Optional[str] = None,
) -> Tuple[str, str]:
    """Translate audio directly to English using OpenAI's translations API.

    Args:
        file_path: Path to the audio file
        output_path: Path to save the translation (optional)
        model: Whisper model to use (default: from env or DEFAULT_WHISPER_MODEL)

    Returns:
        Tuple of (translation text, output file path)
    """
    if not HAS_OPENAI:
        raise ImportError(
            "OpenAI library is required for translation. "
            "Please install it with: uv pip install openai"
        )

    # Check for API key
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise ValueError(
            "OpenAI API key not found. Please set the OPENAI_API_KEY environment variable."
        )

    # Initialize OpenAI client
    client = openai.OpenAI(api_key=api_key)

    # Validate file
    path = Path(file_path)
    if not path.exists() or not path.is_file():
        raise FileNotFoundError(f"Audio file not found: {file_path}")

    # Check file size (50MB limit)
    file_size_mb = path.stat().st_size / (1024 * 1024)
    if file_size_mb > MAX_FILE_SIZE_MB:
        raise ValueError(
            f"Audio file is too large ({file_size_mb:.2f}MB). "
            f"Maximum allowed size is {MAX_FILE_SIZE_MB}MB."
        )

    # Check file duration
    duration = get_audio_duration(file_path)
    if duration > MAX_AUDIO_DURATION:
        raise ValueError(
            f"Audio file is too long ({duration}s). "
            f"Maximum allowed duration is {MAX_AUDIO_DURATION}s."
        )

    # Use model from env or default
    whisper_model = model or os.getenv("WHISPER_MODEL", DEFAULT_WHISPER_MODEL)

    try:
        # Open the audio file
        with open(path, "rb") as audio_file:
            # Call the OpenAI translations API with the correct parameter types
            response = client.audio.translations.create(
                model=whisper_model,
                file=audio_file,
                response_format="text",  # type: ignore
            )

        # The response is already a string
        translation = response

        # Save translation if output path is provided or generate default path
        if output_path is None:
            # Extract the title from the file path (without extension)
            title = path.stem
            # Create the default output path in media/translations directory
            output_path = f"media/translations/{title}.txt"

        # Save the translation
        output_file = Path(output_path)
        output_file.parent.mkdir(parents=True, exist_ok=True)
        output_file.write_text(translation, encoding="utf-8")
        return translation, output_path

    except Exception as e:
        raise ValueError(f"Error translating audio: {e}") from e
