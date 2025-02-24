"""Database management script for resetting and seeding the database."""

import argparse
import sys
from pathlib import Path
from typing import List, TypedDict

# Add the project root to the system path (required for in-project imports like `from backend.db import Database`)
sys.path.append(str(Path(__file__).resolve().parent.parent))

from backend.db import Database


class SampleSource(TypedDict):
    """Type definition for sample source data."""

    url: str
    title: str
    source_type: str
    duration_seconds: float
    download_path: str


# Real data from current database
SAMPLE_SOURCES: List[SampleSource] = [
    {
        "url": "https://www.buzzsprout.com/1739827/episodes/16530544-no-179-life-what-is-humanness.mp3",
        "title": "MRJ_Podcast_179",
        "source_type": "Podcast URL (.mp3)",
        "duration_seconds": 0.0,
        "download_path": "media/sources/MRJ_Podcast_179.mp3",
    },
    {
        "url": "https://www.buzzsprout.com/1739827/episodes/16347396-no-173-ask-yourself-these-questions-to-make-your-2025-a-great-year.mp3",
        "title": "MRJ_Podcast_173",
        "source_type": "Podcast URL (.mp3)",
        "duration_seconds": 0.0,
        "download_path": "media/sources/MRJ_Podcast_173.mp3",
    },
]


def reset_db(db_path: str = "data/app.json") -> None:
    """Reset the database by removing and recreating it.

    Args:
        db_path: Path to the database file
    """
    db_file = Path(db_path)
    if db_file.exists():
        db_file.unlink()
    print(f"Database at {db_path} has been reset.")


def seed_db(db_path: str = "data/app.json") -> None:
    """Seed the database with sample data.

    Args:
        db_path: Path to the database file
    """
    db = Database(db_path)
    for source in SAMPLE_SOURCES:
        doc_id = db.add_source(
            url=source["url"],
            title=source["title"],
            source_type=source["source_type"],
            duration_seconds=source["duration_seconds"],
            download_path=source["download_path"],
        )
        print(f"Added source with ID: {doc_id}")
    print(f"Database at {db_path} has been seeded with {len(SAMPLE_SOURCES)} sources.")


def main() -> None:
    """Main function to handle database management commands."""
    parser = argparse.ArgumentParser(description="Manage the TinyDB database")
    parser.add_argument(
        "action",
        choices=["reset", "seed", "reset-and-seed"],
        help="Action to perform on the database",
    )
    parser.add_argument(
        "--db-path",
        default="data/app.json",
        help="Path to the database file (default: data/app.json)",
    )

    args = parser.parse_args()

    if args.action in ["reset", "reset-and-seed"]:
        reset_db(args.db_path)

    if args.action in ["seed", "reset-and-seed"]:
        seed_db(args.db_path)


if __name__ == "__main__":
    main()
