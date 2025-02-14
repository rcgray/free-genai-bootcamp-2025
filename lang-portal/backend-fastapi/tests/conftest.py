import asyncio
import pytest
from typing import AsyncGenerator, Generator
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

from fastapi.testclient import TestClient
from httpx import AsyncClient, ASGITransport
from app.main import app
from app.core.database import get_db
from app.core.config import get_settings

# Create a separate Base class for tests
class TestBase(DeclarativeBase):
    pass

# Use an in-memory SQLite database for testing
TEST_DATABASE_URL = "sqlite+aiosqlite:///:memory:"

# Create a new engine for tests
test_engine = create_async_engine(
    TEST_DATABASE_URL,
    echo=False,
    # Required for SQLite in-memory database to work with multiple connections
    connect_args={"check_same_thread": False},
    # Ensure we don't share connections with main app
    poolclass=None
)

TestingSessionLocal = sessionmaker(
    test_engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False,
)

# Import models after TestBase is defined
from app.models.word import Word
from app.models.group import Group
from app.models.word_group import WordGroup
from app.models.study_activity import StudyActivity
from app.models.study_session import StudySession
from app.models.word_review_item import WordReviewItem

# Register models with TestBase
for model in [Word, Group, WordGroup, StudyActivity, StudySession, WordReviewItem]:
    model.__table__.to_metadata(TestBase.metadata)


@pytest.fixture(scope="session")
def event_loop() -> Generator:
    """Create an instance of the default event loop for each test case."""
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()


@pytest.fixture(autouse=True, scope="function")
async def setup_db() -> AsyncGenerator:
    """Create tables for test."""
    async with test_engine.begin() as conn:
        await conn.run_sync(TestBase.metadata.drop_all)
        await conn.run_sync(TestBase.metadata.create_all)
    yield
    async with test_engine.begin() as conn:
        await conn.run_sync(TestBase.metadata.drop_all)


@pytest.fixture
async def db() -> AsyncGenerator[AsyncSession, None]:
    """Get async session for test."""
    async with TestingSessionLocal() as session:
        await session.begin()
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()


@pytest.fixture
async def client(db: AsyncSession) -> AsyncGenerator[AsyncClient, None]:
    """Get async test client with overridden dependencies."""
    async def override_get_db():
        yield db

    app.dependency_overrides[get_db] = override_get_db
    
    transport = ASGITransport(app=app)
    async with AsyncClient(
        transport=transport,
        base_url="http://test",
        follow_redirects=True
    ) as ac:
        yield ac
        
    app.dependency_overrides.clear()