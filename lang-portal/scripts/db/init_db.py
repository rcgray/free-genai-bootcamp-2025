#!/usr/bin/env python3
"""Database initialization script for the Language Learning Portal.

This script creates all necessary tables and indexes in the SQLite database
according to the schema specification.
"""

import argparse
import logging
import os
import sys
from pathlib import Path

# Add the backend directory to Python path
backend_dir = Path(__file__).parents[2] / "backend-fastapi"
sys.path.append(str(backend_dir))

import asyncio
from sqlalchemy import text
from sqlalchemy.ext.asyncio import create_async_engine
from app.core.config import get_settings

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

settings = get_settings()

# SQL statements for table creation
CREATE_TABLES_SQL = """
-- Words table
CREATE TABLE words (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    kanji TEXT NOT NULL,
    romaji TEXT NOT NULL,
    english TEXT NOT NULL,
    parts TEXT NOT NULL
);

-- Groups table
CREATE TABLE groups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    words_count INTEGER DEFAULT 0
);

-- Word Groups junction table
CREATE TABLE word_groups (
    word_id INTEGER NOT NULL,
    group_id INTEGER NOT NULL,
    PRIMARY KEY (word_id, group_id),
    FOREIGN KEY (word_id) REFERENCES words (id) ON DELETE CASCADE,
    FOREIGN KEY (group_id) REFERENCES groups (id) ON DELETE CASCADE
);

-- Activities table
CREATE TABLE activities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    image_url TEXT NOT NULL,
    description TEXT NOT NULL
);

-- Sessions table
CREATE TABLE sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    group_id INTEGER NOT NULL,
    activity_id INTEGER NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (group_id) REFERENCES groups (id) ON DELETE RESTRICT,
    FOREIGN KEY (activity_id) REFERENCES activities (id) ON DELETE RESTRICT
);

-- Word Review Items table
CREATE TABLE word_review_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    word_id INTEGER NOT NULL,
    session_id INTEGER NOT NULL,
    correct INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (word_id) REFERENCES words (id) ON DELETE CASCADE,
    FOREIGN KEY (session_id) REFERENCES sessions (id) ON DELETE CASCADE
);
"""

# SQL statements for index creation
CREATE_INDEXES_SQL = """
-- Performance indexes
CREATE INDEX idx_words_kanji ON words(kanji);
CREATE INDEX idx_words_romaji ON words(romaji);
CREATE INDEX idx_groups_name ON groups(name);
CREATE INDEX idx_sessions_created_at ON sessions(created_at);
CREATE INDEX idx_word_review_items_created_at ON word_review_items(created_at);

-- Foreign key indexes
CREATE INDEX idx_word_groups_word_id ON word_groups(word_id);
CREATE INDEX idx_word_groups_group_id ON word_groups(group_id);
CREATE INDEX idx_sessions_group_id ON sessions(group_id);
CREATE INDEX idx_sessions_activity_id ON sessions(activity_id);
CREATE INDEX idx_word_review_items_word_id ON word_review_items(word_id);
CREATE INDEX idx_word_review_items_session_id ON word_review_items(session_id);
"""

async def init_db(force: bool = False) -> None:
    """Initialize the database with schema."""
    db_url = settings.DATABASE_URL
    db_file = db_url.replace("sqlite+aiosqlite:///", "")
    
    # Create database directory if it doesn't exist
    db_dir = os.path.dirname(db_file)
    if db_dir:
        os.makedirs(db_dir, exist_ok=True)
    
    # Remove existing database if force is True
    if force and os.path.exists(db_file):
        logger.info(f"Removing existing database at {db_file}")
        os.remove(db_file)
    elif os.path.exists(db_file):
        logger.error(f"Database already exists at {db_file}. Use --force to recreate.")
        sys.exit(1)
    
    # Create empty database file
    Path(db_file).touch()
    logger.info(f"Created new database file at {db_file}")
    
    # Create async engine
    engine = create_async_engine(db_url)
    
    try:
        async with engine.begin() as conn:
            # Enable foreign key support
            await conn.execute(text("PRAGMA foreign_keys = ON;"))
            
            # Create tables
            logger.info("Creating database tables...")
            for statement in CREATE_TABLES_SQL.split(';'):
                if statement.strip():
                    await conn.execute(text(statement))
            
            # Create indexes
            logger.info("Creating database indexes...")
            for statement in CREATE_INDEXES_SQL.split(';'):
                if statement.strip():
                    await conn.execute(text(statement))
            
            logger.info("Database initialization completed successfully")
            
    except Exception as e:
        logger.error(f"Database initialization failed: {e}")
        raise
    finally:
        await engine.dispose()

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
        asyncio.run(init_db(args.force))
    except Exception as e:
        logger.error(f"Failed to initialize database: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main() 