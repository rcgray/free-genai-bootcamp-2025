#!/usr/bin/env python3
"""Database initialization script for the Language Learning Portal.

This script creates all necessary tables and indexes in the SQLite database
according to the schema specification.
"""

import argparse
import logging
import os
import sqlite3
from pathlib import Path
from typing import List

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Default database path - can be overridden by environment variable
DEFAULT_DB_PATH = "data/lang_portal.db"
DB_PATH = os.getenv("LANG_PORTAL_DB_PATH", DEFAULT_DB_PATH)

# SQL statements to create tables
CREATE_TABLES = [
    """
    CREATE TABLE IF NOT EXISTS words (
        id INTEGER PRIMARY KEY,
        kanji TEXT NOT NULL,
        romaji TEXT NOT NULL,
        english TEXT NOT NULL,
        parts TEXT NOT NULL CHECK(json_valid(parts))
    )
    """,
    
    """
    CREATE TABLE IF NOT EXISTS groups (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        words_count INTEGER DEFAULT 0
    )
    """,
    
    """
    CREATE TABLE IF NOT EXISTS word_groups (
        word_id INTEGER NOT NULL,
        group_id INTEGER NOT NULL,
        PRIMARY KEY (word_id, group_id),
        FOREIGN KEY (word_id) REFERENCES words(id) ON DELETE CASCADE,
        FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE
    )
    """,
    
    """
    CREATE TABLE IF NOT EXISTS study_activities (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        url TEXT NOT NULL
    )
    """,
    
    """
    CREATE TABLE IF NOT EXISTS study_sessions (
        id INTEGER PRIMARY KEY,
        group_id INTEGER NOT NULL,
        study_activity_id INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE,
        FOREIGN KEY (study_activity_id) REFERENCES study_activities(id) ON DELETE CASCADE
    )
    """,
    
    """
    CREATE TABLE IF NOT EXISTS word_review_items (
        id INTEGER PRIMARY KEY,
        word_id INTEGER NOT NULL,
        study_session_id INTEGER NOT NULL,
        correct INTEGER NOT NULL CHECK(correct IN (0, 1)),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (word_id) REFERENCES words(id) ON DELETE CASCADE,
        FOREIGN KEY (study_session_id) REFERENCES study_sessions(id) ON DELETE CASCADE
    )
    """
]

# SQL statements to create indexes
CREATE_INDEXES = [
    "CREATE INDEX IF NOT EXISTS idx_word_groups_word_id ON word_groups(word_id)",
    "CREATE INDEX IF NOT EXISTS idx_word_groups_group_id ON word_groups(group_id)",
    "CREATE INDEX IF NOT EXISTS idx_word_review_items_word_id ON word_review_items(word_id)",
    "CREATE INDEX IF NOT EXISTS idx_word_review_items_session_id ON word_review_items(study_session_id)",
    "CREATE INDEX IF NOT EXISTS idx_study_sessions_group_id ON study_sessions(group_id)",
    "CREATE INDEX IF NOT EXISTS idx_study_sessions_activity_id ON study_sessions(study_activity_id)"
]

def init_db(force: bool = False) -> None:
    """Initialize the database with tables and indexes.
    
    Args:
        force: If True, drops existing tables before creating new ones
    """
    db_path = Path(DB_PATH)
    
    # Create data directory if it doesn't exist
    db_path.parent.mkdir(parents=True, exist_ok=True)
    
    # If force is True and database exists, delete it
    if force and db_path.exists():
        logger.warning("Forcing new database creation - deleting existing database")
        db_path.unlink()
    
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        # Enable foreign key support
        cursor.execute("PRAGMA foreign_keys = ON")
        
        # Create tables
        logger.info("Creating tables...")
        for create_table in CREATE_TABLES:
            cursor.execute(create_table)
        
        # Create indexes
        logger.info("Creating indexes...")
        for create_index in CREATE_INDEXES:
            cursor.execute(create_index)
        
        conn.commit()
        logger.info("Database initialization completed successfully")
        
    except sqlite3.Error as e:
        logger.error(f"Database initialization failed: {e}")
        raise
    finally:
        if conn:
            conn.close()

def main() -> None:
    """Main function to run the database initialization script."""
    parser = argparse.ArgumentParser(
        description="Initialize the Language Learning Portal database"
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Force new database creation by deleting existing database"
    )
    
    args = parser.parse_args()
    
    try:
        init_db(args.force)
    except Exception as e:
        logger.error(f"Failed to initialize database: {e}")
        exit(1)

if __name__ == "__main__":
    main() 