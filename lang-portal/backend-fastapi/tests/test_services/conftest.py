import pytest
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import delete, text

from app.models.word import Word
from app.models.group import Group
from app.models.word_group import WordGroup
from app.models.study_activity import StudyActivity
from app.models.study_session import StudySession
from app.schemas.word import WordCreate
from app.schemas.group import GroupCreate
from tests.fixtures.test_data import (
    TEST_WORD,
    TEST_WORD_2,
    TEST_GROUP,
    TEST_ACTIVITY,
    TEST_STUDY_SESSION
)


@pytest.fixture(autouse=True)
async def cleanup_word_groups(db: AsyncSession) -> None:
    """Clean up word-group associations before each test."""
    try:
        # First check if there are any existing associations
        result = await db.execute(text("SELECT COUNT(*) FROM word_groups"))
        count = result.scalar_one_or_none() or 0
        if count > 0:
            print(f"\nFound {count} existing word-group associations before cleanup")
            
            # Get details of existing associations
            result = await db.execute(
                text("SELECT word_id, group_id FROM word_groups")
            )
            associations = await result.fetchall()
            for word_id, group_id in associations:
                print(f"  - Word {word_id} -> Group {group_id}")

        # Delete all associations
        await db.execute(delete(WordGroup))
        await db.commit()

        # Verify cleanup
        result = await db.execute(text("SELECT COUNT(*) FROM word_groups"))
        count = result.scalar_one_or_none() or 0
        assert count == 0, f"Failed to clean up word-group associations, {count} remaining"

        # Also rollback any pending transactions to ensure clean state
        await db.rollback()
        
        print("\nCleanup completed successfully")
    except Exception as e:
        print(f"\nError during cleanup: {str(e)}")
        # Ensure we rollback on error
        await db.rollback()
        raise


@pytest.fixture
async def test_word(db: AsyncSession) -> Word:
    """Create a test word for testing."""
    word_in = WordCreate(**TEST_WORD)
    db_word = Word(**word_in.model_dump())
    db.add(db_word)
    await db.commit()
    await db.refresh(db_word)
    return db_word


@pytest.fixture
async def test_word_2(db: AsyncSession) -> Word:
    """Create a second test word for testing duplicates."""
    word_in = WordCreate(**TEST_WORD_2)
    db_word = Word(**word_in.model_dump())
    db.add(db_word)
    await db.commit()
    await db.refresh(db_word)
    return db_word


@pytest.fixture
async def test_group(db: AsyncSession) -> Group:
    """Create a test group for testing."""
    db_group = Group(name=TEST_GROUP["name"])
    db.add(db_group)
    await db.commit()
    await db.refresh(db_group)
    return db_group


@pytest.fixture
async def test_study_activity(db: AsyncSession) -> StudyActivity:
    """Create a test study activity for testing."""
    db_activity = StudyActivity(**TEST_ACTIVITY)
    db.add(db_activity)
    await db.commit()
    await db.refresh(db_activity)
    return db_activity


@pytest.fixture
async def test_study_session(
    db: AsyncSession,
    test_group: Group,
    test_study_activity: StudyActivity
) -> StudySession:
    """Create a test study session for testing."""
    db_session = StudySession(
        group_id=test_group.id,
        study_activity_id=test_study_activity.id
    )
    db.add(db_session)
    await db.commit()
    await db.refresh(db_session)
    return db_session 