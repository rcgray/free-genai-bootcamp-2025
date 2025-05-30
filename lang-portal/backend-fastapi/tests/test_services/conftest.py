import pytest
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import delete, text

from app.models.word import Word
from app.models.group import Group
from app.models.word_group import WordGroup
from app.models.activity import Activity
from app.models.session import Session
from app.schemas.word import WordCreate
from app.schemas.group import GroupCreate
from tests.fixtures.test_data import (
    TEST_WORD,
    TEST_WORD_2,
    TEST_GROUP,
    TEST_ACTIVITY,
    TEST_ACTIVITY_2,
    TEST_SESSION
)


@pytest.fixture(autouse=True)
async def cleanup_sessions(db: AsyncSession) -> None:
    """Clean up sessions before each test."""
    try:
        await db.execute(delete(Session))
        await db.commit()
        # Also rollback any pending transactions to ensure clean state
        await db.rollback()
    except Exception as e:
        print(f"\nError during session cleanup: {str(e)}")
        await db.rollback()
        raise


@pytest.fixture(autouse=True)
async def cleanup_activities(db: AsyncSession) -> None:
    """Clean up activities before each test."""
    try:
        await db.execute(delete(Activity))
        await db.commit()
        # Also rollback any pending transactions to ensure clean state
        await db.rollback()
    except Exception as e:
        print(f"\nError during activity cleanup: {str(e)}")
        await db.rollback()
        raise


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
async def test_activity(db: AsyncSession) -> Activity:
    """Create a test activity for testing."""
    db_activity = Activity(**TEST_ACTIVITY)
    db.add(db_activity)
    await db.commit()
    await db.refresh(db_activity)
    return db_activity


@pytest.fixture
async def test_activity_2(db: AsyncSession) -> Activity:
    """Create a second test activity for testing duplicates."""
    db_activity = Activity(**TEST_ACTIVITY_2)
    db.add(db_activity)
    await db.commit()
    await db.refresh(db_activity)
    return db_activity


@pytest.fixture
async def test_session(db: AsyncSession, test_activity: Activity, test_group: Group) -> Session:
    """Create a test session for testing."""
    db_session = Session(
        activity_id=test_activity.id,
        group_id=test_group.id,
        **{k: v for k, v in TEST_SESSION.items() if k not in ['activity_id', 'group_id']}
    )
    db.add(db_session)
    await db.commit()
    await db.refresh(db_session)
    return db_session 