import pytest
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text

from app.services.group_service import GroupService
from app.models.group import Group
from app.models.word import Word
from app.schemas.group import GroupUpdate

pytestmark = pytest.mark.asyncio

async def test_get_group(db: AsyncSession, test_group: Group) -> None:
    """Test retrieving a single group by ID."""
    group = await GroupService.get_group(db, test_group.id)
    assert group is not None
    assert group.id == test_group.id
    assert group.name == test_group.name
    assert group.words_count == 0  # Initially no words

async def test_get_nonexistent_group(db: AsyncSession) -> None:
    """Test retrieving a nonexistent group returns None."""
    group = await GroupService.get_group(db, 999999)
    assert group is None

async def test_get_groups(db: AsyncSession, test_group: Group) -> None:
    """Test retrieving paginated groups."""
    groups, total = await GroupService.get_groups(
        db,
        skip=0,
        limit=10,
        order_by="name",
        order="asc"
    )
    assert len(groups) > 0
    assert total > 0
    assert any(g.id == test_group.id for g in groups)

async def test_get_group_words(
    db: AsyncSession,
    test_group: Group,
    test_word: Word
) -> None:
    """Test retrieving words from a group."""
    # Add word to group first
    await GroupService.update_group(
        db,
        group_id=test_group.id,
        group_in=GroupUpdate(word_ids=[test_word.id])
    )
    
    # Get words from group
    words, total = await GroupService.get_group_words(
        db,
        group_id=test_group.id,
        skip=0,
        limit=10,
        order_by="romaji",
        order="asc"
    )
    assert len(words) == 1
    assert total == 1
    assert words[0].id == test_word.id

async def test_create_group(db: AsyncSession) -> None:
    """Test creating a new group."""
    group = await GroupService.create_group(
        db,
        name="Test Group"
    )
    assert group.id is not None
    assert group.name == "Test Group"
    assert group.words_count == 0

async def test_create_group_with_words(
    db: AsyncSession,
    test_word: Word
) -> None:
    """Test creating a group with words."""
    try:
        # First verify no existing word-group associations
        result = await db.execute(
            text("SELECT COUNT(*) FROM word_groups WHERE word_id = :word_id"),
            {"word_id": test_word.id}
        )
        count = result.scalar_one_or_none() or 0
        print(f"\nInitial word-group count for word {test_word.id}: {count}")
        assert count == 0, f"Found {count} existing word-group associations for word {test_word.id}"

        # Create group with word
        group = await GroupService.create_group(
            db,
            name="Test Group With Words",
            word_ids=[test_word.id]
        )
        
        # Verify group was created
        assert group is not None
        assert group.id is not None
        assert group.name == "Test Group With Words"
        assert group.words_count == 1
        print(f"\nCreated group {group.id} with word {test_word.id}")

        # Verify word association
        result = await db.execute(
            text("""
                SELECT COUNT(*) 
                FROM word_groups 
                WHERE word_id = :word_id AND group_id = :group_id
            """),
            {"word_id": test_word.id, "group_id": group.id}
        )
        count = result.scalar_one_or_none() or 0
        print(f"\nFinal word-group count for word {test_word.id} and group {group.id}: {count}")
        assert count == 1, f"Expected 1 word-group association, found {count}"

    except Exception as e:
        print(f"\nError in test: {str(e)}")
        await db.rollback()
        raise
    finally:
        # Clean up the test data
        await db.execute(text("DELETE FROM word_groups"))
        await db.execute(text("DELETE FROM groups"))
        await db.commit()
        print("\nTest cleanup completed")

async def test_create_duplicate_group(db: AsyncSession, test_group: Group) -> None:
    """Test creating a group with duplicate name raises error."""
    with pytest.raises(ValueError) as exc_info:
        await GroupService.create_group(
            db,
            name=test_group.name
        )
    assert "already exists" in str(exc_info.value)

async def test_create_group_invalid_word(db: AsyncSession) -> None:
    """Test creating a group with nonexistent word raises error."""
    with pytest.raises(ValueError) as exc_info:
        await GroupService.create_group(
            db,
            name="Test Group",
            word_ids=[999999]
        )
    assert "not found" in str(exc_info.value)

async def test_update_group(db: AsyncSession, test_group: Group) -> None:
    """Test updating a group's name."""
    group_update = GroupUpdate(name="Updated Group")
    updated_group = await GroupService.update_group(
        db,
        group_id=test_group.id,
        group_in=group_update
    )
    assert updated_group.id == test_group.id
    assert updated_group.name == "Updated Group"

async def test_update_group_words(
    db: AsyncSession,
    test_group: Group,
    test_word: Word,
    test_word_2: Word
) -> None:
    """Test updating a group's word list."""
    # First add one word
    group_update = GroupUpdate(word_ids=[test_word.id])
    updated_group = await GroupService.update_group(
        db,
        group_id=test_group.id,
        group_in=group_update
    )
    assert updated_group.words_count == 1

    # Verify words
    words, total = await GroupService.get_group_words(
        db,
        group_id=test_group.id,
        skip=0,
        limit=10
    )
    assert len(words) == 1
    assert words[0].id == test_word.id

    # Then update to two words
    group_update = GroupUpdate(word_ids=[test_word.id, test_word_2.id])
    updated_group = await GroupService.update_group(
        db,
        group_id=test_group.id,
        group_in=group_update
    )
    assert updated_group.words_count == 2

    # Verify words again
    words, total = await GroupService.get_group_words(
        db,
        group_id=test_group.id,
        skip=0,
        limit=10
    )
    assert len(words) == 2
    word_ids = {w.id for w in words}
    assert test_word.id in word_ids
    assert test_word_2.id in word_ids

    # Finally remove all words
    group_update = GroupUpdate(word_ids=[])
    updated_group = await GroupService.update_group(
        db,
        group_id=test_group.id,
        group_in=group_update
    )
    assert updated_group.words_count == 0

    # Verify no words
    words, total = await GroupService.get_group_words(
        db,
        group_id=test_group.id,
        skip=0,
        limit=10
    )
    assert len(words) == 0
    assert total == 0

async def test_update_group_invalid_word(
    db: AsyncSession,
    test_group: Group
) -> None:
    """Test updating a group with nonexistent word raises error."""
    group_update = GroupUpdate(word_ids=[999999])
    with pytest.raises(ValueError) as exc_info:
        await GroupService.update_group(
            db,
            group_id=test_group.id,
            group_in=group_update
        )
    assert "not found" in str(exc_info.value)

async def test_delete_group(db: AsyncSession, test_group: Group) -> None:
    """Test deleting a group."""
    await GroupService.delete_group(db, group_id=test_group.id)
    deleted_group = await GroupService.get_group(db, test_group.id)
    assert deleted_group is None 