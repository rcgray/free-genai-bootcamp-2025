"""
Pytest configuration and fixtures.
"""

import os
import pytest
import tempfile
import shutil
from pathlib import Path
from typing import Dict, Any, Generator

from app.game.engine import GameEngine
from app.api.llm import LLMClient


@pytest.fixture
def temp_dir() -> Generator[Path, None, None]:
    """Create a temporary directory for tests."""
    temp_dir = Path(tempfile.mkdtemp())
    yield temp_dir
    shutil.rmtree(temp_dir)


@pytest.fixture
def test_assets_dir(temp_dir: Path) -> Path:
    """Create a test assets directory."""
    assets_dir = temp_dir / "assets"
    assets_dir.mkdir(parents=True, exist_ok=True)
    
    # Create subdirectories
    (assets_dir / "images" / "backgrounds").mkdir(parents=True, exist_ok=True)
    (assets_dir / "images" / "characters").mkdir(parents=True, exist_ok=True)
    (assets_dir / "audio").mkdir(parents=True, exist_ok=True)
    (assets_dir / "fonts").mkdir(parents=True, exist_ok=True)
    
    return assets_dir


@pytest.fixture
def test_data_dir(temp_dir: Path) -> Path:
    """Create a test data directory."""
    data_dir = temp_dir / "data"
    data_dir.mkdir(parents=True, exist_ok=True)
    
    # Create subdirectories
    (data_dir / "dialog").mkdir(parents=True, exist_ok=True)
    (data_dir / "saves").mkdir(parents=True, exist_ok=True)
    
    return data_dir


@pytest.fixture
def test_config(test_assets_dir: Path, test_data_dir: Path) -> Dict[str, Any]:
    """Create a test configuration."""
    return {
        "app_name": "Test Game",
        "version": "0.1.0",
        "debug": True,
        "host": "127.0.0.1",
        "port": 8000,
        "assets_path": str(test_assets_dir),
        "data_path": str(test_data_dir),
        "static_path": "static",
        "openai_model": "gpt-3.5-turbo",
        "language_levels": ["beginner", "intermediate", "advanced"],
        "default_language_level": "beginner",
        "max_choices": 3,
        "save_slots": 5
    }


@pytest.fixture
def mock_llm_client() -> LLMClient:
    """Create a mock LLM client."""
    return LLMClient(api_key="test_key", model="test_model")


@pytest.fixture
def game_engine(test_config: Dict[str, Any]) -> GameEngine:
    """Create a game engine with test configuration."""
    return GameEngine(test_config) 