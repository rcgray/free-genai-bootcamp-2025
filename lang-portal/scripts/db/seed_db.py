#!/usr/bin/env python3
"""Database seeding script for the Language Learning Portal.

This script seeds the database with initial data from JSON files.
"""

import asyncio
import json
import logging
from pathlib import Path
from typing import List, Dict, Any

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

# Add backend to Python path
backend_dir = Path(__file__).parents[2] / "backend-fastapi"
import sys
sys.path.append(str(backend_dir))

from app.core.database import AsyncSessionLocal
from app.models.word import Word
from app.models.group import Group
from app.models.activity import Activity
from app.models.session import Session
from app.models.word_group import WordGroup
from app.models.word_review_item import WordReviewItem

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

async def load_json(file_path: Path) -> List[Dict[str, Any]]:
    """Load data from a JSON file."""
    try:
        with open(file_path) as f:
            return json.load(f)
    except FileNotFoundError:
        logger.error(f"Could not find seed file: {file_path}")
        raise
    except json.JSONDecodeError:
        logger.error(f"Invalid JSON in seed file: {file_path}")
        raise

async def seed_words(session: AsyncSession, words_data: List[Dict[str, Any]]) -> None:
    """Seed words table with data."""
    for word_data in words_data:
        # Ensure parts is a JSON string
        if isinstance(word_data["parts"], dict):
            word_data["parts"] = json.dumps(word_data["parts"])
            
        word = Word(
            kanji=word_data["kanji"],
            romaji=word_data["romaji"],
            english=word_data["english"],
            parts=word_data["parts"]
        )
        session.add(word)
    
    await session.commit()
    logger.info(f"Seeded {len(words_data)} words")

async def seed_groups(session: AsyncSession, groups_data: List[Dict[str, Any]]) -> None:
    """Seed groups table with data."""
    for group_data in groups_data:
        group = Group(
            name=group_data["name"],
            words_count=0  # Will be updated when word_groups are added
        )
        session.add(group)
    
    await session.commit()
    logger.info(f"Seeded {len(groups_data)} groups")

async def seed_word_groups(session: AsyncSession, word_groups_data: List[Dict[str, Any]]) -> None:
    """Seed word_groups table with data and update group word counts."""
    # Track word counts per group
    group_word_counts: Dict[int, int] = {}
    
    # Create word_group associations
    for assoc in word_groups_data:
        word_id = assoc["word_id"]
        group_id = assoc["group_id"]
        
        # Verify the word and group exist
        word = await session.get(Word, word_id)
        group = await session.get(Group, group_id)
        
        if word is None:
            logger.warning(f"Word with ID {word_id} not found")
            continue
        if group is None:
            logger.warning(f"Group with ID {group_id} not found")
            continue
            
        word_group = WordGroup(
            word_id=word_id,
            group_id=group_id
        )
        session.add(word_group)
        
        # Update word count for this group
        group_word_counts[group_id] = group_word_counts.get(group_id, 0) + 1
    
    await session.commit()
    
    # Update word counts for each group
    for group_id, count in group_word_counts.items():
        group = await session.get(Group, group_id)
        if group:
            group.words_count = count
    
    await session.commit()
    logger.info(f"Seeded word-group associations and updated group word counts")

async def seed_activities(
    session: AsyncSession,
    activities_data: List[Dict[str, Any]]
) -> None:
    """Seed activities table with data."""
    for activity_data in activities_data:
        activity = Activity(
            name=activity_data["name"],
            url=activity_data["url"],
            image_url=activity_data.get("image_url", ""),  # Handle missing image_url in seed data
            description=activity_data.get("description", "")  # Handle missing description in seed data
        )
        session.add(activity)
    
    await session.commit()
    logger.info(f"Seeded {len(activities_data)} activities")

async def seed_db() -> None:
    """Main function to seed the database."""
    # Use the correct seed directory from backend-fastapi
    seed_dir = backend_dir / "seed"
    logger.info(f"Loading seed data from: {seed_dir}")
    
    # Load all seed data
    words_data = []
    for word_file in seed_dir.glob("words.*.json"):
        logger.info(f"Loading words from: {word_file.name}")
        words_data.extend(await load_json(word_file))
    
    groups_data = await load_json(seed_dir / "groups.json")
    word_groups_data = await load_json(seed_dir / "word_groups.json")
    activities_data = await load_json(seed_dir / "activities.json")
    
    async with AsyncSessionLocal() as session:
        try:
            # Seed in order: words -> groups -> word_groups -> activities
            await seed_words(session, words_data)
            await seed_groups(session, groups_data)
            await seed_word_groups(session, word_groups_data)
            await seed_activities(session, activities_data)
            
            logger.info("Database seeding completed successfully")
            
        except Exception as e:
            logger.error(f"Error seeding database: {e}")
            await session.rollback()
            raise
        else:
            await session.commit()

def main() -> None:
    """Entry point for the seeding script."""
    try:
        asyncio.run(seed_db())
    except Exception as e:
        logger.error(f"Failed to seed database: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main() 