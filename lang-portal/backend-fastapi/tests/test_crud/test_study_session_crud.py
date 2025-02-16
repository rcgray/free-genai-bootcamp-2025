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


@pytest.mark.asyncio
async def test_get_multi_with_reviews(db: AsyncSession):
    """Test getting multiple study sessions with their reviews."""
    # Create test data
    session1 = await study_session.create(
        db,
        obj_in=StudySessionCreate(group_id=1, study_activity_id=1)
    )
    session2 = await study_session.create(
        db,
        obj_in=StudySessionCreate(group_id=1, study_activity_id=1)
    )
    
    # Add reviews to sessions
    await study_session.create_word_review(
        db,
        session_id=session1.id,
        word_id=1,
        correct=True
    )
    await study_session.create_word_review(
        db,
        session_id=session1.id,
        word_id=2,
        correct=False
    )
    await study_session.create_word_review(
        db,
        session_id=session2.id,
        word_id=1,
        correct=True
    )
    
    # Test getting sessions with reviews
    sessions, total = await study_session.get_multi_with_reviews(db)
    
    assert total >= 2  # Could be more from other tests
    assert len(sessions) >= 2
    
    # Find our test sessions
    test_sessions = [s for s in sessions if s.id in {session1.id, session2.id}]
    assert len(test_sessions) == 2
    
    # Verify reviews are loaded
    session1_found = next(s for s in test_sessions if s.id == session1.id)
    session2_found = next(s for s in test_sessions if s.id == session2.id)
    
    assert len(session1_found.reviews) == 2
    assert len(session2_found.reviews) == 1
    
    # Test pagination
    sessions_page1, total = await study_session.get_multi_with_reviews(
        db,
        skip=0,
        limit=1
    )
    assert len(sessions_page1) == 1
    
    # Test sorting
    sessions_asc, _ = await study_session.get_multi_with_reviews(
        db,
        order_by="created_at",
        order="asc"
    )
    sessions_desc, _ = await study_session.get_multi_with_reviews(
        db,
        order_by="created_at",
        order="desc"
    )
    
    assert sessions_asc[0].created_at <= sessions_asc[-1].created_at
    assert sessions_desc[0].created_at >= sessions_desc[-1].created_at 