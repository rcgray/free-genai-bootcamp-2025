import pytest
from sqlalchemy.ext.asyncio import AsyncSession

from app.services.study_service import StudyService
from app.models.study_session import StudySession
from app.models.word import Word
from app.models.group import Group
from app.models.study_activity import StudyActivity
from app.crud.group import group
from app.core.exceptions import AppHTTPException
from app.crud.study_session import study_session
from app.schemas.study_session import StudySessionCreate

pytestmark = pytest.mark.asyncio

async def test_get_session(
    db: AsyncSession,
    test_study_session: StudySession
) -> None:
    """Test retrieving a single study session by ID."""
    session = await StudyService.get_session(db, test_study_session.id)
    assert session is not None
    assert session.id == test_study_session.id
    assert session.group_id == test_study_session.group_id
    assert session.study_activity_id == test_study_session.study_activity_id

async def test_get_nonexistent_session(db: AsyncSession) -> None:
    """Test retrieving a nonexistent session returns None."""
    session = await StudyService.get_session(db, 999999)
    assert session is None

async def test_create_session(
    db: AsyncSession,
    test_group: Group,
    test_study_activity: StudyActivity
) -> None:
    """Test creating a new study session."""
    session = await StudyService.create_session(
        db,
        group_id=test_group.id,
        study_activity_id=test_study_activity.id
    )
    assert session.id is not None
    assert session.group_id == test_group.id
    assert session.study_activity_id == test_study_activity.id

async def test_create_session_invalid_group(
    db: AsyncSession,
    test_study_activity: StudyActivity
) -> None:
    """Test creating a session with nonexistent group raises error."""
    with pytest.raises(ValueError) as exc_info:
        await StudyService.create_session(
            db,
            group_id=999999,
            study_activity_id=test_study_activity.id
        )
    assert "not found" in str(exc_info.value)

async def test_create_session_invalid_activity(
    db: AsyncSession,
    test_group: Group
) -> None:
    """Test creating a session with nonexistent study activity raises error."""
    with pytest.raises(ValueError) as exc_info:
        await StudyService.create_session(
            db,
            group_id=test_group.id,
            study_activity_id=999999
        )
    assert "not found" in str(exc_info.value)

async def test_add_review(
    db: AsyncSession,
    test_study_session: StudySession,
    test_word: Word,
    test_group: Group
) -> None:
    """Test adding a word review to a session."""
    # First ensure the word is in the group
    await group.add_words(db, group_id=test_group.id, word_ids=[test_word.id])

    review = await StudyService.add_review(
        db,
        session_id=test_study_session.id,
        word_id=test_word.id,
        correct=True
    )
    assert review["id"] is not None
    assert review["word_id"] == test_word.id
    assert review["study_session_id"] == test_study_session.id
    assert review["correct"] is True

async def test_add_review_nonexistent_session(
    db: AsyncSession,
    test_word: Word
) -> None:
    """Test adding a review to nonexistent session raises error."""
    with pytest.raises(ValueError) as exc_info:
        await StudyService.add_review(
            db,
            session_id=999999,
            word_id=test_word.id,
            correct=True
        )
    assert "not found" in str(exc_info.value)

async def test_add_review_nonexistent_word(
    db: AsyncSession,
    test_study_session: StudySession
) -> None:
    """Test adding a review for nonexistent word raises error."""
    with pytest.raises(AppHTTPException) as exc_info:
        await StudyService.add_review(
            db,
            session_id=test_study_session.id,
            word_id=999999,
            correct=True
        )
    assert exc_info.value.status_code == 404
    assert "not found" in exc_info.value.detail

async def test_add_review_word_not_in_group(
    db: AsyncSession,
    test_study_session: StudySession,
    test_word: Word
) -> None:
    """Test adding a review for word not in session's group raises error."""
    with pytest.raises(ValueError) as exc_info:
        await StudyService.add_review(
            db,
            session_id=test_study_session.id,
            word_id=test_word.id,
            correct=True
        )
    assert "does not belong to the session's group" in str(exc_info.value)

async def test_get_session_stats(
    db: AsyncSession,
    test_study_session: StudySession,
    test_word: Word,
    test_group: Group
) -> None:
    """Test retrieving statistics for a study session."""
    # First add a word to the group and create some reviews
    await group.add_words(db, group_id=test_group.id, word_ids=[test_word.id])

    await StudyService.add_review(
        db,
        session_id=test_study_session.id,
        word_id=test_word.id,
        correct=True
    )
    await StudyService.add_review(
        db,
        session_id=test_study_session.id,
        word_id=test_word.id,
        correct=False
    )

    stats = await StudyService.get_session_stats(db, test_study_session.id)
    assert stats is not None
    assert "total_reviews" in stats
    assert "correct_reviews" in stats
    assert "accuracy" in stats
    assert stats["total_reviews"] == 2
    assert stats["correct_reviews"] == 1
    assert stats["accuracy"] == 0.5

async def test_get_session_stats_nonexistent_session(db: AsyncSession) -> None:
    """Test getting stats for nonexistent session raises error."""
    with pytest.raises(ValueError) as exc_info:
        await StudyService.get_session_stats(db, 999999)
    assert "not found" in str(exc_info.value)

@pytest.mark.asyncio
async def test_get_sessions(db: AsyncSession):
    """Test getting multiple study sessions with pagination and sorting."""
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
        session_id=session2.id,
        word_id=1,
        correct=False
    )
    
    # Test default listing
    sessions, total = await StudyService.get_sessions(db)
    assert total >= 2
    assert len(sessions) >= 2
    
    # Find our test sessions
    test_sessions = [s for s in sessions if s.id in {session1.id, session2.id}]
    assert len(test_sessions) == 2
    
    # Verify reviews are loaded
    session1_found = next(s for s in test_sessions if s.id == session1.id)
    session2_found = next(s for s in test_sessions if s.id == session2.id)
    
    assert len(session1_found.reviews) == 1
    assert len(session2_found.reviews) == 1
    assert session1_found.reviews[0].correct is True
    assert session2_found.reviews[0].correct is False
    
    # Test pagination
    sessions_page1, total = await StudyService.get_sessions(
        db,
        skip=0,
        limit=1
    )
    assert len(sessions_page1) == 1
    
    # Test sorting
    sessions_asc, _ = await StudyService.get_sessions(
        db,
        order_by="created_at",
        order="asc"
    )
    sessions_desc, _ = await StudyService.get_sessions(
        db,
        order_by="created_at",
        order="desc"
    )
    
    assert sessions_asc[0].created_at <= sessions_asc[-1].created_at
    assert sessions_desc[0].created_at >= sessions_desc[-1].created_at 