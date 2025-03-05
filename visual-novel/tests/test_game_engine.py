"""
Tests for the game engine.
"""

import pytest
from pathlib import Path
from typing import Dict, Any

from app.game.engine import GameEngine
from app.game.scenes.base import Scene
from app.game.characters.character import Character


class MockScene(Scene):
    """Mock scene for testing."""
    
    def __init__(self, name: str, config: Dict[str, Any]) -> None:
        super().__init__(name, config)
        self.entered = False
        self.exited = False
        self.updated = False
        self.rendered = False
        self.input_handled = False
        
    def enter(self) -> None:
        self.entered = True
        
    def exit(self) -> None:
        self.exited = True
        super().exit()
        
    def update(self, delta_time: float) -> None:
        self.updated = True
        
    def render(self) -> None:
        self.rendered = True
        
    def handle_input(self, event: Dict[str, Any]) -> None:
        self.input_handled = True


@pytest.fixture
def game_config() -> Dict[str, Any]:
    """Fixture for game configuration."""
    return {
        "app_name": "Test Game",
        "version": "0.1.0",
        "debug": True,
        "assets_path": "tests/assets",
        "data_path": "tests/data",
        "static_path": "tests/static"
    }


@pytest.fixture
def game_engine(game_config: Dict[str, Any]) -> GameEngine:
    """Fixture for game engine."""
    return GameEngine(game_config)


def test_game_engine_initialization(game_engine: GameEngine, game_config: Dict[str, Any]) -> None:
    """Test game engine initialization."""
    assert game_engine.config == game_config
    assert game_engine.scenes == {}
    assert game_engine.characters == {}
    assert game_engine.current_scene is None
    assert "player" in game_engine.game_state
    assert "flags" in game_engine.game_state
    assert "inventory" in game_engine.game_state


def test_register_scene(game_engine: GameEngine) -> None:
    """Test registering a scene."""
    scene_id = "test_scene"
    scene_config = {"test": True}
    
    game_engine.register_scene(scene_id, MockScene, scene_config)
    
    assert scene_id in game_engine.scenes
    assert isinstance(game_engine.scenes[scene_id], MockScene)
    assert game_engine.scenes[scene_id].config == scene_config


def test_register_character(game_engine: GameEngine) -> None:
    """Test registering a character."""
    character = Character(
        name="test_character",
        display_name="Test Character",
        description="A test character",
        images={"default": "test.png"}
    )
    
    game_engine.register_character(character)
    
    assert "test_character" in game_engine.characters
    assert game_engine.characters["test_character"] == character


def test_start_game(game_engine: GameEngine) -> None:
    """Test starting the game."""
    scene_id = "test_scene"
    scene_config = {"test": True}
    
    game_engine.register_scene(scene_id, MockScene, scene_config)
    game_engine.start_game(scene_id)
    
    assert game_engine.current_scene == game_engine.scenes[scene_id]
    assert game_engine.current_scene.entered


def test_transition_to_scene(game_engine: GameEngine) -> None:
    """Test transitioning between scenes."""
    scene1_id = "scene1"
    scene2_id = "scene2"
    
    game_engine.register_scene(scene1_id, MockScene, {})
    game_engine.register_scene(scene2_id, MockScene, {})
    
    game_engine.start_game(scene1_id)
    assert game_engine.current_scene == game_engine.scenes[scene1_id]
    
    game_engine.transition_to_scene(scene2_id)
    assert game_engine.current_scene == game_engine.scenes[scene2_id]
    assert game_engine.scenes[scene1_id].exited
    assert game_engine.scenes[scene2_id].entered


def test_update(game_engine: GameEngine) -> None:
    """Test updating the game."""
    scene_id = "test_scene"
    
    game_engine.register_scene(scene_id, MockScene, {})
    game_engine.start_game(scene_id)
    
    game_engine.update(0.1)
    assert game_engine.current_scene.updated


def test_render(game_engine: GameEngine) -> None:
    """Test rendering the game."""
    scene_id = "test_scene"
    
    game_engine.register_scene(scene_id, MockScene, {})
    game_engine.start_game(scene_id)
    
    game_engine.render()
    assert game_engine.current_scene.rendered


def test_handle_input(game_engine: GameEngine) -> None:
    """Test handling input."""
    scene_id = "test_scene"
    
    game_engine.register_scene(scene_id, MockScene, {})
    game_engine.start_game(scene_id)
    
    game_engine.handle_input({"type": "test"})
    assert game_engine.current_scene.input_handled


def test_scene_exit_callback(game_engine: GameEngine) -> None:
    """Test scene exit callback."""
    scene1_id = "scene1"
    scene2_id = "scene2"
    
    game_engine.register_scene(scene1_id, MockScene, {})
    game_engine.register_scene(scene2_id, MockScene, {})
    
    game_engine.start_game(scene1_id)
    
    # Trigger transition through the scene itself
    game_engine.current_scene.transition_to(scene2_id)
    
    assert game_engine.current_scene == game_engine.scenes[scene2_id]
    assert game_engine.scenes[scene1_id].exited
    assert game_engine.scenes[scene2_id].entered 