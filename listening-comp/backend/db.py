"""Database module for managing audio sources using TinyDB."""

from datetime import datetime, timezone
from pathlib import Path
from typing import Dict, Optional, TypedDict, cast

from tinydb import Query, TinyDB


class AudioSource(TypedDict):
    """Type definition for audio source records."""

    url: str
    title: str
    source_type: str  # e.g., 'youtube', 'spotify', etc.
    duration_seconds: int
    download_path: str
    transcript_path: Optional[str]
    translation_path: Optional[str]
    created_at: str
    updated_at: str
    status: str  # ['pending', 'completed', 'error'] - simplified status model


class Database:
    """Database manager for the application."""

    def __init__(self, db_path: str = "data/app.json") -> None:
        """Initialize database connection.

        Args:
            db_path: Path to the TinyDB JSON file
        """
        # Ensure the data directory exists
        Path(db_path).parent.mkdir(parents=True, exist_ok=True)
        self.db = TinyDB(db_path)
        self.sources = self.db.table("sources")
        self.Query = Query

    def get_source_by_title(self, title: str) -> Optional[AudioSource]:
        """Find an audio source by its title.

        Args:
            title: Source title

        Returns:
            AudioSource if found, None otherwise
        """
        Source = Query()
        doc = self.sources.get(Source.title == title)
        return cast(Optional[AudioSource], doc)

    def add_source(
        self,
        url: str,
        title: str,
        source_type: str,
        duration_seconds: int,
        download_path: str,
    ) -> int:
        """Add a new audio source to the database.

        Args:
            url: Source URL
            title: Content title
            source_type: Type of source (youtube, spotify, etc.)
            duration_seconds: Duration of audio in seconds
            download_path: Path where the audio file is stored

        Returns:
            Document ID of the inserted record
        """
        now = datetime.now(timezone.utc).isoformat()
        source: AudioSource = {
            "url": url,
            "title": title,
            "source_type": source_type,
            "duration_seconds": duration_seconds,
            "download_path": download_path,
            "transcript_path": None,
            "translation_path": None,
            "created_at": now,
            "updated_at": now,
            "status": "pending",
        }
        return self.sources.insert(source)

    def get_source(self, doc_id: int) -> Optional[AudioSource]:
        """Retrieve an audio source by its document ID.

        Args:
            doc_id: Document ID

        Returns:
            AudioSource if found, None otherwise
        """
        doc = self.sources.get(doc_id=doc_id)
        return cast(Optional[AudioSource], doc)

    def get_all_sources(self) -> Dict[str, AudioSource]:
        """Retrieve all audio sources.

        Returns:
            Dictionary of audio sources with document IDs as keys
        """
        sources = {}
        all_docs = self.sources.all()
        for doc in all_docs:
            doc_id = str(doc.doc_id)
            sources[doc_id] = cast(AudioSource, doc)
        return sources

    def update_source_status(
        self,
        doc_id: int,
        status: str,
        transcript_path: Optional[str] = None,
        translation_path: Optional[str] = None,
    ) -> None:
        """Update the status and paths of an audio source.

        Args:
            doc_id: Document ID
            status: New status
            transcript_path: Path to transcript file if available
            translation_path: Path to translation file if available
        """
        update_data = {
            "status": status,
            "updated_at": datetime.now(timezone.utc).isoformat(),
        }
        if transcript_path is not None:
            update_data["transcript_path"] = transcript_path
        if translation_path is not None:
            update_data["translation_path"] = translation_path
        self.sources.update(update_data, doc_ids=[doc_id])

    def get_source_by_url(self, url: str) -> Optional[AudioSource]:
        """Find an audio source by its URL.

        Args:
            url: Source URL

        Returns:
            AudioSource if found, None otherwise
        """
        Source = Query()
        doc = self.sources.get(Source.url == url)
        return cast(Optional[AudioSource], doc)

    def update_source_duration(
        self,
        doc_id: int,
        duration_seconds: int,
    ) -> None:
        """Update the duration of an audio source.

        Args:
            doc_id: Document ID
            duration_seconds: Duration of audio in seconds
        """
        update_data = {
            "duration_seconds": duration_seconds,
            "updated_at": datetime.now(timezone.utc).isoformat(),
        }
        self.sources.update(update_data, doc_ids=[doc_id])


# Create a global database instance
_db = Database()


def get_sources() -> Dict[str, AudioSource]:
    """Get all audio sources.

    Returns:
        Dictionary of audio sources with document IDs as keys
    """
    return _db.get_all_sources()


def add_source(
    url: str,
    title: str,
    source_type: str,
    duration_seconds: int,
    download_path: str,
) -> int:
    """Add a new audio source.

    Args:
        url: Source URL
        title: Content title
        source_type: Type of source (youtube, spotify, etc.)
        duration_seconds: Duration of audio in seconds
        download_path: Path where the audio file is stored

    Returns:
        Document ID of the inserted record
    """
    return _db.add_source(url, title, source_type, duration_seconds, download_path)


def get_source(doc_id: int) -> Optional[AudioSource]:
    """Get an audio source by its document ID.

    Args:
        doc_id: Document ID

    Returns:
        AudioSource if found, None otherwise
    """
    return _db.get_source(doc_id)


def update_source_status(
    doc_id: int,
    status: str,
    transcript_path: Optional[str] = None,
    translation_path: Optional[str] = None,
) -> None:
    """Update the status and paths of an audio source.

    Args:
        doc_id: Document ID
        status: New status
        transcript_path: Path to transcript file if available
        translation_path: Path to translation file if available
    """
    _db.update_source_status(doc_id, status, transcript_path, translation_path)


def get_source_by_url(url: str) -> Optional[AudioSource]:
    """Find an audio source by its URL.

    Args:
        url: Source URL

    Returns:
        AudioSource if found, None otherwise
    """
    return _db.get_source_by_url(url)


def get_source_by_title(title: str) -> Optional[AudioSource]:
    """Find an audio source by its title.

    Args:
        title: Source title

    Returns:
        AudioSource if found, None otherwise
    """
    return _db.get_source_by_title(title)


def update_source_duration(doc_id: int, duration_seconds: int) -> None:
    """Update the duration of an audio source.

    Args:
        doc_id: Document ID
        duration_seconds: Duration of audio in seconds
    """
    _db.update_source_duration(doc_id, duration_seconds)


# Helper functions for determining processing state


def is_ready_for_transcription(source: AudioSource) -> bool:
    """Check if a source is ready for transcription.

    Args:
        source: Audio source

    Returns:
        True if the source is ready for transcription, False otherwise
    """
    # Source is ready for transcription if it has a download path but no transcript path
    # and is not in an error state
    return (
        bool(source["download_path"])
        and not source["transcript_path"]
        and source["status"] != "error"
    )


def is_ready_for_translation(source: AudioSource) -> bool:
    """Check if a source is ready for translation.

    Args:
        source: Audio source

    Returns:
        True if the source is ready for translation, False otherwise
    """
    # Source is ready for translation if it has a transcript path but no translation path
    # and is not in an error state
    return (
        bool(source["transcript_path"])
        and not source["translation_path"]
        and source["status"] != "error"
    )


def is_ready_for_audio_generation(source: AudioSource) -> bool:
    """Check if a source is ready for audio generation.

    Args:
        source: Audio source

    Returns:
        True if the source is ready for audio generation, False otherwise
    """
    # Source is ready for audio generation if it has a translation path
    # and is not in an error state or already completed
    return (
        bool(source["translation_path"])
        and source["status"] != "error"
        and source["status"] != "completed"
    )


def is_ready_for_study(source: AudioSource) -> bool:
    """Check if a source is ready for study.

    Args:
        source: Audio source

    Returns:
        True if the source is ready for study, False otherwise
    """
    # Source is ready for study if it has a transcript path and translation path
    # and is marked as completed
    return (
        bool(source["transcript_path"])
        and bool(source["translation_path"])
        and source["status"] == "completed"
    )


def is_in_error_state(source: AudioSource) -> bool:
    """Check if a source is in an error state.

    Args:
        source: Audio source

    Returns:
        True if the source is in an error state, False otherwise
    """
    return source["status"] == "error"


def get_processing_progress(source: AudioSource) -> float:
    """Calculate the processing progress of a source.

    Args:
        source: Audio source

    Returns:
        Progress as a float between 0 and 1
    """
    # Start with 25% for download
    progress = 0.25

    # Add 25% for transcript
    if source["transcript_path"]:
        progress += 0.25

    # Add 25% for translation
    if source["translation_path"]:
        progress += 0.25

    # Add 25% for completion
    if source["status"] == "completed":
        progress += 0.25

    return progress
