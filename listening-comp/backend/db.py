"""Database module for managing audio sources using TinyDB."""

from datetime import datetime, timezone
from pathlib import Path
from typing import Optional, TypedDict, cast

from tinydb import Query, TinyDB


class AudioSource(TypedDict):
    """Type definition for audio source records."""

    url: str
    title: str
    source_type: str  # e.g., 'youtube', 'spotify', etc.
    duration_seconds: float
    download_path: str
    transcript_path: Optional[str]
    translation_path: Optional[str]
    created_at: str
    updated_at: str
    status: str  # e.g., 'pending', 'downloaded', 'transcribed', 'translated'


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

    def add_source(
        self,
        url: str,
        title: str,
        source_type: str,
        duration_seconds: float,
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
