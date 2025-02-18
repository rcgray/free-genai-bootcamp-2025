import pytest
from sqlalchemy.ext.asyncio import AsyncSession

from app.services.session_service import SessionService
from app.models.session import Session
from app.models.word import Word
from app.models.group import Group
from app.models.activity import Activity
from app.crud.group import group
from app.core.exceptions import AppHTTPException
from app.crud.session import session
from app.schemas.session import SessionCreate

pytestmark = pytest.mark.asyncio

async def test_get_session(
    db: AsyncSession,
    test_session: Session
) -> None:
    """Test retrieving a single session by ID."""
    session = await SessionService.get_session(db, test_session.id)
    assert session is not None
    assert session.id == test_session.id
    assert session.group_id == test_session.group_id
    assert session.activity_id == test_session.activity_id

async def test_get_nonexistent_session(db: AsyncSession) -> None:
    """Test retrieving a nonexistent session returns None."""
    session = await SessionService.get_session(db, 999999)
    assert session is None

async def test_create_session(
    db: AsyncSession,
    test_group: Group,
    test_activity: Activity
) -> None:
    """Test creating a new session with a group."""
    session = await SessionService.create_session(
        db,
        group_id=test_group.id,
        activity_id=test_activity.id
    )
    assert session.id is not None
    assert session.group_id == test_group.id
    assert session.activity_id == test_activity.id

async def test_create_session_without_group(
    db: AsyncSession,
    test_activity: Activity
) -> None:
    """Test creating a new session without a group."""
    session = await SessionService.create_session(
        db,
        group_id=None,
        activity_id=test_activity.id
    )
    assert session.id is not None
    assert session.group_id is None
    assert session.activity_id == test_activity.id

async def test_create_session_invalid_group(
    db: AsyncSession,
    test_activity: Activity
) -> None:
    """Test creating a session with nonexistent group raises error."""
    with pytest.raises(ValueError) as exc_info:
        await SessionService.create_session(
            db,
            group_id=999999,
            activity_id=test_activity.id
        )
    assert "not found" in str(exc_info.value)

async def test_create_session_invalid_activity(
    db: AsyncSession,
    test_group: Group
) -> None:
    """Test creating a session with nonexistent activity raises error."""
    with pytest.raises(ValueError) as exc_info:
        await SessionService.create_session(
            db,
            group_id=test_group.id,
            activity_id=999999
        )
    assert "not found" in str(exc_info.value)

async def test_add_review(
    db: AsyncSession,
    test_session: Session,
    test_word: Word,
    test_group: Group
) -> None:
    """Test adding a word review to a session."""
    # First ensure the word is in the group
    await group.add_words(db, group_id=test_group.id, word_ids=[test_word.id])

    review = await SessionService.add_review(
        db,
        session_id=test_session.id,
        word_id=test_word.id,
        correct=True
    )
    assert review["id"] is not None
    assert review["word_id"] == test_word.id
    assert review["session_id"] == test_session.id
    assert review["correct"] is True

async def test_add_review_nonexistent_session(
    db: AsyncSession,
    test_word: Word
) -> None:
    """Test adding a review to nonexistent session raises error."""
    with pytest.raises(ValueError) as exc_info:
        await SessionService.add_review(
            db,
            session_id=999999,
            word_id=test_word.id,
            correct=True
        )
    assert "not found" in str(exc_info.value)

async def test_add_review_nonexistent_word(
    db: AsyncSession,
    test_session: Session
) -> None:
    """Test adding a review for nonexistent word raises error."""
    with pytest.raises(AppHTTPException) as exc_info:
        await SessionService.add_review(
            db,
            session_id=test_session.id,
            word_id=999999,
            correct=True
        )
    assert exc_info.value.status_code == 404
    assert "not found" in exc_info.value.detail

async def test_add_review_word_not_in_group(
    db: AsyncSession,
    test_session: Session,
    test_word: Word
) -> None:
    """Test adding a review for word not in session's group raises error."""
    with pytest.raises(ValueError) as exc_info:
        await SessionService.add_review(
            db,
            session_id=test_session.id,
            word_id=test_word.id,
            correct=True
        )
    assert "does not belong to the session's group" in str(exc_info.value)

async def test_add_review_session_without_group(
    db: AsyncSession,
    test_activity: Activity,
    test_word: Word
) -> None:
    """Test adding a review to a session without a group."""
    # Create a session without a group
    session = await SessionService.create_session(
        db,
        group_id=None,
        activity_id=test_activity.id
    )

    # Add a review to the session without a group (should succeed)
    review = await SessionService.add_review(
        db,
        session_id=session.id,
        word_id=test_word.id,
        correct=True
    )
    
    assert review["id"] is not None
    assert review["word_id"] == test_word.id
    assert review["session_id"] == session.id
    assert review["correct"] is True

async def test_get_session_stats(
    db: AsyncSession,
    test_session: Session,
    test_word: Word,
    test_group: Group
) -> None:
    """Test retrieving statistics for a session."""
    # First add a word to the group and create some reviews
    await group.add_words(db, group_id=test_group.id, word_ids=[test_word.id])

    await SessionService.add_review(
        db,
        session_id=test_session.id,
        word_id=test_word.id,
        correct=True
    )
    await SessionService.add_review(
        db,
        session_id=test_session.id,
        word_id=test_word.id,
        correct=False
    )

    stats = await SessionService.get_session_stats(db, test_session.id)
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
        await SessionService.get_session_stats(db, 999999)
    assert "not found" in str(exc_info.value)

@pytest.mark.asyncio
async def test_get_sessions(db: AsyncSession):
    """Test getting multiple sessions with pagination and sorting."""
    # Create test data
    session1 = await session.create(
        db,
        obj_in=SessionCreate(group_id=1, activity_id=1)
    )
    session2 = await session.create(
        db,
        obj_in=SessionCreate(group_id=None, activity_id=1)  # Session without group
    )
    
    # Add reviews to session with group
    await session.create_word_review(
        db,
        session_id=session1.id,
        word_id=1,
        correct=True
    )
    
    # Test default listing
    sessions, total = await SessionService.get_sessions(db)
    assert total >= 2
    assert len(sessions) >= 2
    
    # Find our test sessions
    test_sessions = [s for s in sessions if s.id in {session1.id, session2.id}]
    assert len(test_sessions) == 2
    
    # Verify session properties
    session1_found = next(s for s in test_sessions if s.id == session1.id)
    session2_found = next(s for s in test_sessions if s.id == session2.id)
    
    assert session1_found.group_id is not None
    assert session2_found.group_id is None
    assert len(session1_found.reviews) == 1
    assert len(session2_found.reviews) == 0
    
    # Test pagination
    sessions_page1, total = await SessionService.get_sessions(
        db,
        skip=0,
        limit=1
    )
    assert len(sessions_page1) == 1
    
    # Test sorting
    sessions_asc, _ = await SessionService.get_sessions(
        db,
        order_by="created_at",
        order="asc"
    )
    sessions_desc, _ = await SessionService.get_sessions(
        db,
        order_by="created_at",
        order="desc"
    )
    
    assert sessions_asc[0].created_at <= sessions_asc[-1].created_at
    assert sessions_desc[0].created_at >= sessions_desc[-1].created_at 