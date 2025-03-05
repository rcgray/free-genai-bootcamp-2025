"""
Game engine for the visual novel game.
"""

from typing import Dict, Any, List, Optional, Type
import logging
from pathlib import Path

from app.game.scenes.base import Scene
from app.game.characters.character import Character
from app.game.dialog.manager import DialogManager
from app.api.llm import LLMClient


class GameEngine:
    """Main game engine for the visual novel."""
    
    def __init__(self, config: Dict[str, Any]) -> None:
        """
        Initialize the game engine.
        
        Args:
            config: Game configuration
        """
        self.config = config
        self.scenes: Dict[str, Scene] = {}
        self.characters: Dict[str, Character] = {}
        self.current_scene: Optional[Scene] = None
        self.game_state: Dict[str, Any] = {
            "player": {
                "name": "Player",
                "language_level": "beginner",
                "progress": {},
                "learned_words": [],
                "score": 0
            },
            "flags": {},
            "inventory": []
        }
        
        # Set up paths
        self.assets_path = Path(config.get("assets_path", "assets"))
        self.data_path = Path(config.get("data_path", "data"))
        
        # Set up LLM client if API key is provided
        api_key = config.get("openai_api_key")
        model = config.get("openai_model", "gpt-3.5-turbo")
        self.llm_client = LLMClient(api_key=api_key, model=model) if api_key else None
        
        # Set up dialog manager
        static_dialog_path = self.data_path / "dialog" if self.data_path else None
        self.dialog_manager = DialogManager(
            llm_client=self.llm_client,
            static_dialog_path=static_dialog_path
        )
        
        self.logger = logging.getLogger(__name__)
        self.logger.info("Game engine initialized")
    
    def register_scene(self, scene_id: str, scene_class: Type[Scene], scene_config: Dict[str, Any]) -> None:
        """
        Register a scene with the game engine.
        
        Args:
            scene_id: Scene identifier
            scene_class: Scene class
            scene_config: Scene configuration
        """
        scene = scene_class(scene_id, scene_config)
        scene.set_exit_callback(self._handle_scene_exit)
        self.scenes[scene_id] = scene
        self.logger.debug(f"Registered scene: {scene_id}")
    
    def register_character(self, character: Character) -> None:
        """
        Register a character with the game engine.
        
        Args:
            character: Character instance
        """
        self.characters[character.name] = character
        self.logger.debug(f"Registered character: {character.name}")
    
    def start_game(self, initial_scene: str) -> None:
        """
        Start the game with the specified initial scene.
        
        Args:
            initial_scene: Initial scene identifier
        """
        if initial_scene not in self.scenes:
            self.logger.error(f"Initial scene not found: {initial_scene}")
            return
            
        self.transition_to_scene(initial_scene)
        self.logger.info(f"Game started with scene: {initial_scene}")
    
    def transition_to_scene(self, scene_id: str) -> None:
        """
        Transition to a new scene.
        
        Args:
            scene_id: Scene identifier
        """
        if scene_id not in self.scenes:
            self.logger.error(f"Scene not found: {scene_id}")
            return
            
        # Store the current scene before transitioning
        old_scene = self.current_scene
        
        # Set current_scene to None to prevent recursion during exit callbacks
        self.current_scene = None
        
        # Exit the old scene if it exists
        if old_scene:
            # Remove the exit callback temporarily to prevent recursion
            original_callback = old_scene.on_exit_callback
            old_scene.on_exit_callback = None
            old_scene.exit()
            # Restore the callback in case the scene is reused
            old_scene.on_exit_callback = original_callback
            
        # Set and enter the new scene
        self.current_scene = self.scenes[scene_id]
        self.current_scene.enter()
        self.logger.debug(f"Transitioned to scene: {scene_id}")
    
    def update(self, delta_time: float) -> None:
        """
        Update game state.
        
        Args:
            delta_time: Time since last update in seconds
        """
        if self.current_scene:
            self.current_scene.update(delta_time)
    
    def render(self) -> None:
        """Render the current scene."""
        if self.current_scene:
            self.current_scene.render()
    
    def handle_input(self, event: Dict[str, Any]) -> None:
        """
        Handle input events.
        
        Args:
            event: Input event data
        """
        if self.current_scene:
            self.current_scene.handle_input(event)
    
    def _handle_scene_exit(self, next_scene: Optional[str]) -> None:
        """
        Handle scene exit callback.
        
        Args:
            next_scene: Next scene to transition to
        """
        if next_scene:
            self.transition_to_scene(next_scene)
    
    def save_game(self, save_slot: int = 0) -> bool:
        """
        Save the current game state.
        
        Args:
            save_slot: Save slot number
            
        Returns:
            True if save was successful, False otherwise
        """
        save_data = {
            "player": self.game_state["player"],
            "flags": self.game_state["flags"],
            "inventory": self.game_state["inventory"],
            "current_scene": self.current_scene.name if self.current_scene else None
        }
        
        save_file = self.data_path / "saves" / f"save_{save_slot}.json"
        save_file.parent.mkdir(parents=True, exist_ok=True)
        
        try:
            import json
            with open(save_file, "w", encoding="utf-8") as f:
                json.dump(save_data, f, indent=2)
            self.logger.info(f"Game saved to slot {save_slot}")
            return True
        except Exception as e:
            self.logger.error(f"Error saving game: {e}")
            return False
    
    def load_game(self, save_slot: int = 0) -> bool:
        """
        Load a saved game state.
        
        Args:
            save_slot: Save slot number
            
        Returns:
            True if load was successful, False otherwise
        """
        save_file = self.data_path / "saves" / f"save_{save_slot}.json"
        if not save_file.exists():
            self.logger.warning(f"Save file not found: {save_file}")
            return False
            
        try:
            import json
            with open(save_file, "r", encoding="utf-8") as f:
                save_data = json.load(f)
                
            self.game_state["player"] = save_data.get("player", self.game_state["player"])
            self.game_state["flags"] = save_data.get("flags", {})
            self.game_state["inventory"] = save_data.get("inventory", [])
            
            current_scene = save_data.get("current_scene")
            if current_scene and current_scene in self.scenes:
                self.transition_to_scene(current_scene)
                
            self.logger.info(f"Game loaded from slot {save_slot}")
            return True
        except Exception as e:
            self.logger.error(f"Error loading game: {e}")
            return False 