import pytest
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.word import Word
from app.models.group import Group
from app.models.study_activity import StudyActivity
from app.models.study_session import StudySession
from app.models.word_review_item import WordReviewItem
from app.models.word_group import WordGroup

@pytest.fixture
async def sample_word(db: AsyncSession) -> Word:
    """Create a sample word for testing relationships."""
    word = Word(
        kanji="猫",
        romaji="neko",
        english="cat",
        parts=[{"kanji": "猫", "romaji": ["neko"]}]
    )
    db.add(word)
    await db.commit()
    await db.refresh(word)
    return word

@pytest.fixture
async def sample_group(db: AsyncSession) -> Group:
    """Create a sample group for testing relationships."""
    group = Group(
        name="Animals",
        words_count=0
    )
    db.add(group)
    await db.commit()
    await db.refresh(group)
    return group

@pytest.fixture
async def sample_study_activity(db: AsyncSession) -> StudyActivity:
    """Create a sample study activity for testing relationships."""
    activity = StudyActivity(
        name="Flashcards",
        url="http://example.com/flashcards"
    )
    db.add(activity)
    await db.commit()
    await db.refresh(activity)
    return activity

@pytest.fixture
async def sample_study_session(
    db: AsyncSession,
    sample_group: Group,
    sample_study_activity: StudyActivity
) -> StudySession:
    """Create a sample study session for testing relationships."""
    session = StudySession(
        group_id=sample_group.id,
        study_activity_id=sample_study_activity.id
    )
    db.add(session)
    await db.commit()
    await db.refresh(session)
    return session

@pytest.fixture
async def sample_word_review(
    db: AsyncSession,
    sample_word: Word,
    sample_study_session: StudySession
) -> WordReviewItem:
    """Create a sample word review for testing relationships."""
    review = WordReviewItem(
        word_id=sample_word.id,
        study_session_id=sample_study_session.id,
        correct=True
    )
    db.add(review)
    await db.commit()
    await db.refresh(review)
    return review

@pytest.fixture
async def sample_word_group(
    db: AsyncSession,
    sample_word: Word,
    sample_group: Group
) -> WordGroup:
    """Create a sample word group association for testing relationships."""
    word_group = WordGroup(
        word_id=sample_word.id,
        group_id=sample_group.id
    )
    db.add(word_group)
    await db.commit()
    await db.refresh(word_group)
    return word_group 