"""Audio processing utilities for the Japanese Listening Learning Tool."""

import os
import json
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple, Union

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
        assert(audio.info is not None)
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


def format_json_transcript_for_display(json_transcript: Union[str, Dict[str, Any]]) -> str:
    """Format a JSON transcript for display.
    
    Args:
        json_transcript: JSON transcript string or dictionary
        
    Returns:
        Formatted transcript text with timestamps
    """
    # If input is a string, parse it as JSON
    if isinstance(json_transcript, str):
        try:
            transcript_data = json.loads(json_transcript)
        except json.JSONDecodeError as e:
            return f"Error: Invalid JSON transcript format - {str(e)}"
    else:
        transcript_data = json_transcript
    
    # Format the transcript segments
    formatted_lines = []
    
    # Check if this is a verbose_json format (has words array in segments)
    is_verbose = False
    if "segments" in transcript_data and transcript_data["segments"]:
        if "words" in transcript_data["segments"][0]:
            is_verbose = True
    
    # Handle verbose_json format with word-level timestamps
    if is_verbose:
        formatted_lines.append("Verbose JSON Transcript (with word-level timestamps):")
        formatted_lines.append("=" * 50)
        
        for segment in transcript_data["segments"]:
            start_time = segment.get("start", 0)
            end_time = segment.get("end", 0)
            text = segment.get("text", "")
            
            # Format segment timestamp as [MM:SS.ms]
            start_min = int(start_time) // 60
            start_sec = int(start_time) % 60
            start_ms = int((start_time - int(start_time)) * 1000)
            
            end_min = int(end_time) // 60
            end_sec = int(end_time) % 60
            end_ms = int((end_time - int(end_time)) * 1000)
            
            segment_timestamp = f"[{start_min:02d}:{start_sec:02d}.{start_ms:03d} → {end_min:02d}:{end_sec:02d}.{end_ms:03d}]"
            formatted_lines.append(f"\nSegment {segment.get('id', 0)}: {segment_timestamp}")
            formatted_lines.append(f"Text: {text}")
            
            # Add word-level timestamps if available
            if "words" in segment and segment["words"]:
                formatted_lines.append("Words:")
                for word in segment["words"]:
                    word_start = word.get("start", 0)
                    word_end = word.get("end", 0)
                    word_text = word.get("word", "")
                    
                    # Format word timestamp
                    w_start_min = int(word_start) // 60
                    w_start_sec = int(word_start) % 60
                    w_start_ms = int((word_start - int(word_start)) * 1000)
                    
                    w_end_min = int(word_end) // 60
                    w_end_sec = int(word_end) % 60
                    w_end_ms = int((word_end - int(word_end)) * 1000)
                    
                    word_timestamp = f"[{w_start_min:02d}:{w_start_sec:02d}.{w_start_ms:03d} → {w_end_min:02d}:{w_end_sec:02d}.{w_end_ms:03d}]"
                    formatted_lines.append(f"  {word_timestamp} {word_text}")
    
    # Handle standard JSON format with segment-level timestamps
    elif "segments" in transcript_data and transcript_data["segments"]:
        for segment in transcript_data["segments"]:
            start_time = segment.get("start", 0)
            end_time = segment.get("end", 0)
            text = segment.get("text", "")
            
            # Format timestamp as [MM:SS.ms]
            start_min = int(start_time) // 60
            start_sec = int(start_time) % 60
            start_ms = int((start_time - int(start_time)) * 1000)
            
            end_min = int(end_time) // 60
            end_sec = int(end_time) % 60
            end_ms = int((end_time - int(end_time)) * 1000)
            
            timestamp = f"[{start_min:02d}:{start_sec:02d}.{start_ms:03d} → {end_min:02d}:{end_sec:02d}.{end_ms:03d}]"
            formatted_lines.append(f"{timestamp} {text}")
    elif "text" in transcript_data:
        # If there are no segments but there is text, display the full text
        formatted_lines.append("Full transcript (no timestamps):")
        formatted_lines.append(transcript_data["text"])
    else:
        # Fallback if no segments or text are found
        formatted_lines.append("No segments or text found in transcript")
        formatted_lines.append(f"Available keys: {', '.join(transcript_data.keys())}")
    
    return "\n".join(formatted_lines)


def transcribe_audio(
    file_path: str,
    output_path: Optional[str] = None,
    language: str = "ja",
    model: Optional[str] = None,
    format: str = "json",
) -> Tuple[str, str]:
    """Transcribe audio file using OpenAI's Whisper API.

    Args:
        file_path: Path to the audio file
        output_path: Path to save the transcript (optional)
        language: Language code (default: 'ja' for Japanese)
        model: Whisper model to use (default: from env or DEFAULT_WHISPER_MODEL)
        format: Output format - "text", "json", "verbose_json", "webvtt", or "srt" (default: "json")
               - "text": Plain text without timestamps
               - "json": JSON with segments and timestamps
               - "verbose_json": Detailed JSON with word-level timestamps
               - "webvtt": WebVTT format with timestamps
               - "srt": SubRip format with timestamps

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
    if format.lower() == "verbose_json":
        api_response_format = "verbose_json"
        file_extension = ".verbose.json"
    elif format.lower() == "json":
        api_response_format = "json"
        file_extension = ".json"
    elif format.lower() == "webvtt":
        api_response_format = "vtt"
        file_extension = ".vtt"
    elif format.lower() == "srt":
        api_response_format = "srt"
        file_extension = ".srt"
    else:
        api_response_format = "text"
        file_extension = ".txt"

    try:
        # Open the audio file
        with open(path, "rb") as audio_file:
            # Call the OpenAI API with the correct parameter types
            # For verbose_json, always include timestamp_granularities=["word"]
            if format.lower() == "verbose_json":
                response = client.audio.transcriptions.create(
                    model=whisper_model,
                    file=audio_file,
                    language=language,
                    response_format=api_response_format,  # type: ignore
                    timestamp_granularities=["word"],  # Use word-level timestamps for verbose_json
                )
            else:
                response = client.audio.transcriptions.create(
                    model=whisper_model,
                    file=audio_file,
                    language=language,
                    response_format=api_response_format,  # type: ignore
                )

        # Process the response based on format
        if format.lower() in ["json", "verbose_json"]:
            # For JSON formats, we need to ensure we have a proper JSON structure
            # The OpenAI API returns a Transcription object for JSON format
            if hasattr(response, 'text'):
                # It's a Transcription object
                text = response.text
                
                # For verbose_json, we want to preserve all the original data
                if format.lower() == "verbose_json" and hasattr(response, 'to_dict'):
                    # Use the to_dict method if available
                    json_data = response.to_dict()
                    transcript = json.dumps(json_data, ensure_ascii=False, indent=2)
                else:
                    # Check if it has segments
                    if hasattr(response, 'segments'):
                        segments = response.segments
                    else:
                        # Create a basic segment if none exists
                        segments = [
                            {
                                "id": 0,
                                "start": 0,
                                "end": duration,
                                "text": text
                            }
                        ]
                    
                    # Create a proper JSON structure
                    json_data = {
                        "text": text,
                        "segments": segments
                    }
                    transcript = json.dumps(json_data, ensure_ascii=False, indent=2)
            elif isinstance(response, dict):
                # It's already a dictionary, convert to JSON string
                transcript = json.dumps(response, ensure_ascii=False, indent=2)
            elif isinstance(response, str):
                try:
                    # Try to parse it as JSON first
                    json.loads(response)
                    transcript = response  # It's already valid JSON
                except json.JSONDecodeError:
                    # If it's not valid JSON, create a basic JSON structure
                    json_data = {
                        "text": response,
                        "segments": [
                            {
                                "id": 0,
                                "start": 0,
                                "end": duration,
                                "text": response
                            }
                        ]
                    }
                    transcript = json.dumps(json_data, ensure_ascii=False, indent=2)
            else:
                # Convert whatever it is to a string and create a basic JSON structure
                text = str(response)
                json_data = {
                    "text": text,
                    "segments": [
                        {
                            "id": 0,
                            "start": 0,
                            "end": duration,
                            "text": text
                        }
                    ]
                }
                transcript = json.dumps(json_data, ensure_ascii=False, indent=2)
        else:
            # For text or WebVTT, use the response as is
            # If it's an object with a text attribute, use that
            if hasattr(response, 'text'):
                transcript = response.text
            else:
                transcript = str(response)

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
            # Use WebVTT format to preserve timing information
            response = client.audio.translations.create(
                model=whisper_model,
                file=audio_file,
                response_format="vtt",  # type: ignore
            )

        # The response is already a string
        translation = response

        # Save translation if output path is provided or generate default path
        if output_path is None:
            # Extract the title from the file path (without extension)
            title = path.stem
            # Create the default output path in media/translations directory with .vtt extension
            output_path = f"media/translations/{title}.vtt"

        # Save the translation
        output_file = Path(output_path)
        output_file.parent.mkdir(parents=True, exist_ok=True)
        output_file.write_text(translation, encoding="utf-8")
        return translation, output_path

    except Exception as e:
        raise ValueError(f"Error translating audio: {e}") from e
