import asyncio
import pytest
from typing import AsyncGenerator, Generator
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from fastapi.testclient import TestClient

from app.core.config import get_settings
from app.core.database import Base
from app.main import app
from app.core.database import get_db

# Use a separate test database
settings = get_settings()
TEST_DATABASE_URL = settings.DATABASE_URL.replace(
    "app.db", "test.db"
)

engine = create_async_engine(
    TEST_DATABASE_URL,
    echo=False,
)
TestingSessionLocal = sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False,
)


@pytest.fixture(scope="session")
def event_loop() -> Generator:
    """Create an instance of the default event loop for each test case."""
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()


@pytest.fixture(autouse=True)
async def setup_db() -> AsyncGenerator:
    """Create tables for test."""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
    yield
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)


@pytest.fixture
async def db() -> AsyncGenerator[AsyncSession, None]:
    """Get async session for test."""
    async with TestingSessionLocal() as session:
        yield session


@pytest.fixture
async def client(db: AsyncSession) -> AsyncGenerator:
    """Get test client with overridden dependencies."""
    async def override_get_db():
        yield db

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear() 