import pytest
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from app.crud.study_session import study_session
from app.models.study_session import StudySession
from app.schemas.study_session import StudySessionCreate, StudySessionUpdate
from tests.fixtures.test_data import TEST_GROUP, TEST_ACTIVITY, TEST_STUDY_SESSION, TEST_WORD_REVIEW


async def test_create_study_session(db: AsyncSession):
    # Create a study session
    session_in = StudySessionCreate(**TEST_STUDY_SESSION)
    db_session = await study_session.create(db, obj_in=session_in)
    assert db_session.group_id == TEST_STUDY_SESSION["group_id"]
    assert db_session.study_activity_id == TEST_STUDY_SESSION["study_activity_id"]


async def test_get_study_session(db: AsyncSession):
    # Create study session
    session_in = StudySessionCreate(**TEST_STUDY_SESSION)
    db_session = await study_session.create(db, obj_in=session_in)

    # Get study session
    stored_session = await study_session.get(db, id=db_session.id)
    assert stored_session
    assert stored_session.group_id == db_session.group_id
    assert stored_session.id == db_session.id


async def test_get_study_session_not_found(db: AsyncSession):
    stored_session = await study_session.get(db, id=999)
    assert stored_session is None


async def test_get_study_session_with_reviews(db: AsyncSession):
    # Create study session
    session_in = StudySessionCreate(**TEST_STUDY_SESSION)
    db_session = await study_session.create(db, obj_in=session_in)

    # Get session with reviews
    stored_session = await study_session.get_with_reviews(db, session_id=db_session.id)
    assert stored_session
    assert hasattr(stored_session, 'reviews')
    assert stored_session.reviews == []  # No reviews yet


async def test_get_study_sessions_pagination(db: AsyncSession):
    # Create multiple study sessions
    for _ in range(3):
        session_in = StudySessionCreate(**TEST_STUDY_SESSION)
        await study_session.create(db, obj_in=session_in)
    
    # Test pagination
    sessions, total = await study_session.get_multi(db, skip=0, limit=2)
    assert len(sessions) == 2
    assert total == 3


async def test_create_word_review(db: AsyncSession):
    # Create study session
    session_in = StudySessionCreate(**TEST_STUDY_SESSION)
    db_session = await study_session.create(db, obj_in=session_in)
    
    # Create word review
    review = await study_session.create_word_review(
        db,
        session_id=db_session.id,
        word_id=TEST_WORD_REVIEW["word_id"],
        correct=TEST_WORD_REVIEW["correct"]
    )
    assert review.study_session_id == db_session.id
    assert review.word_id == TEST_WORD_REVIEW["word_id"]
    assert review.correct == TEST_WORD_REVIEW["correct"]


async def test_get_session_statistics(db: AsyncSession):
    # Create study session
    session_in = StudySessionCreate(**TEST_STUDY_SESSION)
    db_session = await study_session.create(db, obj_in=session_in)
    
    # Create some reviews
    await study_session.create_word_review(
        db,
        session_id=db_session.id,
        word_id=TEST_WORD_REVIEW["word_id"],
        correct=True
    )
    await study_session.create_word_review(
        db,
        session_id=db_session.id,
        word_id=TEST_WORD_REVIEW["word_id"],
        correct=False
    )
    
    # Get statistics
    stats = await study_session.get_session_statistics(db, session_id=db_session.id)
    assert stats.total_reviews == 2
    assert stats.correct_reviews == 1
    assert stats.accuracy == 0.5  # 1 correct out of 2 total 