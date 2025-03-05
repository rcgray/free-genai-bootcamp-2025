"""
Intro scene for the visual novel game.
"""

from typing import Dict, Any, List, Optional
import logging
import streamlit as st

from app.game.scenes.base import Scene


class IntroScene(Scene):
    """Introduction scene for the game."""
    
    def __init__(self, name: str, config: Dict[str, Any]) -> None:
        """
        Initialize the intro scene.
        
        Args:
            name: Scene name
            config: Scene configuration
        """
        super().__init__(name, config)
        self.logger = logging.getLogger(__name__)
        self.dialog_index = 0
        self.background_image = config.get("background_image", "assets/images/backgrounds/classroom.jpg")
        self.character_image = config.get("character_image", "assets/images/characters/teacher/default.png")
        self.static_dialog = [
            {
                "character": "Narrator",
                "text": "日本語を学ぶ冒険へようこそ！",
                "translation": "Welcome to your Japanese learning adventure!",
                "pronunciation": "Nihongo o manabu bōken e yōkoso!"
            },
            {
                "character": "Narrator",
                "text": "この物語の中で、あなたは日本語を学びながら新しい友達を作るでしょう。",
                "translation": "In this story, you will make new friends while learning Japanese.",
                "pronunciation": "Kono monogatari no naka de, anata wa nihongo o manabinagara atarashii tomodachi o tsukuru deshou."
            },
            {
                "character": "先生",
                "text": "こんにちは！私はあなたの先生です。",
                "translation": "Hello! I am your teacher.",
                "pronunciation": "Konnichiwa! Watashi wa anata no sensei desu."
            },
            {
                "character": "先生",
                "text": "まず、あなたの名前を教えてください。",
                "translation": "First, please tell me your name.",
                "pronunciation": "Mazu, anata no namae o oshiete kudasai."
            }
        ]
    
    def enter(self) -> None:
        """Called when entering the scene."""
        self.logger.info("Entering intro scene")
        self.dialog_index = 0
        
        # Set up the scene in the game state
        game_engine = self._get_game_engine()
        if game_engine:
            # Set background and character images
            game_engine.game_state["current_background"] = self.background_image
            game_engine.game_state["current_character"] = self.character_image
            
            # Clear dialog history
            game_engine.dialog_manager.clear_current_dialog()
            
            # Add first dialog entry
            if self.static_dialog:
                game_engine.dialog_manager.add_dialog(self.static_dialog[0])
                self.dialog_index = 1
    
    def update(self, delta_time: float) -> None:
        """
        Update scene state.
        
        Args:
            delta_time: Time since last update in seconds
        """
        pass
    
    def render(self) -> None:
        """Render the scene."""
        pass
    
    def handle_input(self, event: Dict[str, Any]) -> None:
        """
        Handle input events.
        
        Args:
            event: Input event data
        """
        if event.get("type") == "next_dialog":
            self._advance_dialog()
        elif event.get("type") == "player_name":
            self._set_player_name(event.get("name", "Player"))
    
    def _advance_dialog(self) -> None:
        """Advance to the next dialog entry."""
        if self.dialog_index < len(self.static_dialog):
            # Add next dialog entry to the dialog index
            self.dialog_index += 1
        else:
            # End of intro scene, but we don't have a classroom scene yet
            # So we'll just restart the intro scene for now
            self.dialog_index = 0
            st.session_state.dialog_history = []
    
    def _generate_name_input(self) -> None:
        """Generate name input for the player."""
        game_engine = self._get_game_engine()
        if not game_engine:
            return
            
        # In a real implementation, this would show a text input
        # For now, we'll just use some predefined choices
        choices = [
            {
                "text": "タナカ",
                "translation": "Tanaka",
                "action": {"type": "player_name", "name": "Tanaka"}
            },
            {
                "text": "スズキ",
                "translation": "Suzuki",
                "action": {"type": "player_name", "name": "Suzuki"}
            },
            {
                "text": "サトウ",
                "translation": "Sato",
                "action": {"type": "player_name", "name": "Sato"}
            }
        ]
        
        game_engine.game_state["current_choices"] = choices
    
    def _set_player_name(self, name: str) -> None:
        """
        Set the player's name.
        
        Args:
            name: Player name
        """
        game_engine = self._get_game_engine()
        if not game_engine:
            return
            
        game_engine.game_state["player"]["name"] = name
        self.logger.info(f"Player name set to: {name}")
        
        # Add confirmation dialog
        confirmation_dialog = {
            "character": "先生",
            "text": f"{name}さん、よろしくお願いします！",
            "translation": f"Nice to meet you, {name}!",
            "pronunciation": f"{name}-san, yoroshiku onegaishimasu!"
        }
        game_engine.dialog_manager.add_dialog(confirmation_dialog)
        
        # Clear choices
        game_engine.game_state["current_choices"] = []
        
        # Prepare to transition to the next scene
        self.logger.info("Preparing to transition to classroom scene")
        
        # Add a final dialog before transitioning
        final_dialog = {
            "character": "先生",
            "text": "それでは、授業を始めましょう！",
            "translation": "Now, let's begin the lesson!",
            "pronunciation": "Sore dewa, jugyō o hajimemashō!"
        }
        game_engine.dialog_manager.add_dialog(final_dialog)
    
    def _get_game_engine(self):
        """Get the game engine from the scene's exit callback."""
        if not self.on_exit_callback:
            self.logger.error("No exit callback set, cannot access game engine")
            return None
            
        # This is a bit of a hack to get the game engine
        # In a real implementation, the game engine would be passed to the scene
        return self.on_exit_callback.__self__ 