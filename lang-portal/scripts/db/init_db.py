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
import subprocess
from sqlalchemy.ext.asyncio import create_async_engine
from app.core.config import get_settings

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

settings = get_settings()

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
    
    # Create async engine to test connection
    engine = create_async_engine(db_url)
    
    try:
        # Test connection
        async with engine.begin() as conn:
            from sqlalchemy import text
            await conn.execute(text("SELECT 1"))
            logger.info("Database connection test successful")
        
        # Run Alembic migrations
        alembic_ini = backend_dir / "alembic.ini"
        logger.info(f"Running migrations using config at: {alembic_ini}")
        
        result = subprocess.run(
            ["alembic", "-c", str(alembic_ini), "upgrade", "head"],
            check=True,
            cwd=str(backend_dir),  # Set working directory to backend
            capture_output=True,
            text=True
        )
        logger.info("Applied database migrations successfully")
        logger.debug(result.stdout)
        
    except subprocess.CalledProcessError as e:
        logger.error(f"Migration failed: {e.stderr}")
        raise
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