from typing import Dict, List

from app.crud.word import word
from app.crud.group import group
from app.schemas.word import WordCreate
from app.schemas.group import GroupCreate

# Test word data
TEST_WORD = {
    "kanji": "開ける",
    "romaji": "akeru",
    "english": "to open",
    "parts": [
        {"kanji": "開", "romaji": ["a"]},
        {"kanji": "け", "romaji": ["ke"]},
        {"kanji": "る", "romaji": ["ru"]}
    ]
}

TEST_WORD_2 = {
    "kanji": "作る",
    "romaji": "tsukuru",
    "english": "to make",
    "parts": [
        {"kanji": "作", "romaji": ["tsu", "ku"]},
        {"kanji": "る", "romaji": ["ru"]}
    ]
}

# Test group data
TEST_GROUP = {
    "name": "Actions"
}

# Test activity data
TEST_ACTIVITY = {
    "name": "Flashcards",
    "url": "http://localhost:5173/study/flashcards",
    "description": "Practice vocabulary with flashcards"
}

TEST_ACTIVITY_2 = {
    "name": "Matching Game",
    "url": "http://localhost:5173/study/matching",
    "description": "Practice vocabulary by matching words"
}

# Test session data
TEST_SESSION = {
    "group_id": 1,
    "activity_id": 1
}

# Test word review data
TEST_WORD_REVIEW = {
    "word_id": 1,
    "correct": True
}

# Test data setup functions
async def create_test_word(db, word_data: Dict = TEST_WORD) -> Dict:
    """Create a test word and return its data."""
    word_in = WordCreate(**word_data)
    db_word = await word.create(db, obj_in=word_in)
    return {
        "id": db_word.id,
        "kanji": db_word.kanji,
        "romaji": db_word.romaji,
        "english": db_word.english,
        "parts": db_word.parts
    }

async def create_test_group(db, group_data: Dict = TEST_GROUP) -> Dict:
    """Create a test group and return its data."""
    group_in = GroupCreate(**group_data)
    db_group = await group.create(db, obj_in=group_in)
    return {
        "id": db_group.id,
        "name": db_group.name,
        "words_count": db_group.words_count
    }

async def create_test_activity(db, activity_data: Dict = TEST_ACTIVITY) -> Dict:
    """Create a test activity and return its data."""
    from app.models.activity import Activity
    activity = Activity(**activity_data)
    db.add(activity)
    await db.commit()
    await db.refresh(activity)
    return {
        "id": activity.id,
        "name": activity.name,
        "url": activity.url,
        "description": activity.description
    }

async def setup_test_data(db) -> Dict:
    """Set up all necessary test data and return their IDs."""
    # Create word
    word_data = await create_test_word(db)
    
    # Create group
    group_data = await create_test_group(db)
    
    # Add word to group
    await group.add_words(db, group_id=group_data["id"], word_ids=[word_data["id"]])
    
    # Create activity
    activity_data = await create_test_activity(db)
    
    return {
        "word_id": word_data["id"],
        "group_id": group_data["id"],
        "activity_id": activity_data["id"]
    } 