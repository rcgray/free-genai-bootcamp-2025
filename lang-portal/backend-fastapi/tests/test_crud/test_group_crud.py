import pytest
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.group import group
from app.crud.word import word
from app.models.group import Group
from app.schemas.group import GroupCreate, GroupUpdate
from app.schemas.word import WordCreate
from tests.fixtures.test_data import TEST_GROUP, TEST_WORD, TEST_WORD_2


async def test_create_group(db: AsyncSession):
    group_in = GroupCreate(**TEST_GROUP)
    db_group = await group.create(db, obj_in=group_in)
    assert db_group.name == TEST_GROUP["name"]
    assert db_group.words_count == 0


async def test_get_group(db: AsyncSession):
    # Create group
    group_in = GroupCreate(**TEST_GROUP)
    db_group = await group.create(db, obj_in=group_in)
    
    # Get group
    stored_group = await group.get(db, id=db_group.id)
    assert stored_group
    assert stored_group.name == db_group.name
    assert stored_group.id == db_group.id


async def test_get_group_not_found(db: AsyncSession):
    stored_group = await group.get(db, id=999)
    assert stored_group is None


async def test_update_group(db: AsyncSession):
    # Create group
    group_in = GroupCreate(**TEST_GROUP)
    db_group = await group.create(db, obj_in=group_in)
    
    # Update group
    new_name = "Updated Group"
    group_update = GroupUpdate(name=new_name)
    updated_group = await group.update(db, id=db_group.id, obj_in=group_update)
    assert updated_group.name == new_name


async def test_delete_group(db: AsyncSession):
    # Create group
    group_in = GroupCreate(**TEST_GROUP)
    db_group = await group.create(db, obj_in=group_in)
    
    # Delete group
    deleted_group = await group.remove(db, id=db_group.id)
    assert deleted_group.id == db_group.id
    
    # Verify deletion
    db_group = await group.get(db, id=db_group.id)
    assert db_group is None


async def test_get_groups_pagination(db: AsyncSession):
    # Create multiple groups
    group_names = ["Group 1", "Group 2", "Group 3"]
    for name in group_names:
        group_in = GroupCreate(name=name)
        await group.create(db, obj_in=group_in)
    
    # Test pagination
    groups, total = await group.get_multi(db, skip=0, limit=2)
    assert len(groups) == 2
    assert total == 3


async def test_add_words_to_group(db: AsyncSession):
    # Create group
    group_in = GroupCreate(**TEST_GROUP)
    db_group = await group.create(db, obj_in=group_in)
    
    # Create test words
    word1_in = WordCreate(**TEST_WORD)
    word2_in = WordCreate(**TEST_WORD_2)
    db_word1 = await word.create(db, obj_in=word1_in)
    db_word2 = await word.create(db, obj_in=word2_in)
    word_ids = [db_word1.id, db_word2.id]
    
    # Add words
    updated_group = await group.add_words(db, group_id=db_group.id, word_ids=word_ids)
    assert updated_group.words_count == len(word_ids)


async def test_set_words_in_group(db: AsyncSession):
    # Create group
    group_in = GroupCreate(**TEST_GROUP)
    db_group = await group.create(db, obj_in=group_in)
    
    # Create test words
    word1_in = WordCreate(**TEST_WORD)
    word2_in = WordCreate(**TEST_WORD_2)
    db_word1 = await word.create(db, obj_in=word1_in)
    db_word2 = await word.create(db, obj_in=word2_in)
    word_ids = [db_word1.id, db_word2.id]
    
    # Set words
    await group.set_words(db, group_id=db_group.id, word_ids=word_ids)
    
    # Verify word count
    updated_group = await group.get(db, id=db_group.id)
    assert updated_group.words_count == len(word_ids) 