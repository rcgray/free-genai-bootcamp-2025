"""
Dialog manager for the visual novel game.
"""

from typing import Dict, Any, List, Optional, Callable
import logging
import json
from pathlib import Path

from app.api.llm import LLMClient


class DialogManager:
    """Manages dialog for the visual novel game."""
    
    def __init__(
        self,
        llm_client: Optional[LLMClient] = None,
        static_dialog_path: Optional[Path] = None
    ) -> None:
        """
        Initialize the dialog manager.
        
        Args:
            llm_client: LLM client for generating dynamic dialog
            static_dialog_path: Path to static dialog JSON files
        """
        self.llm_client = llm_client
        self.static_dialog_path = static_dialog_path
        self.current_dialog: List[Dict[str, Any]] = []
        self.dialog_history: List[Dict[str, Any]] = []
        self.callbacks: Dict[str, Callable] = {}
        self.logger = logging.getLogger(__name__)
    
    def load_static_dialog(self, scene_id: str) -> List[Dict[str, Any]]:
        """
        Load static dialog for a scene from JSON file.
        
        Args:
            scene_id: Scene identifier
            
        Returns:
            List of dialog entries
        """
        if not self.static_dialog_path:
            self.logger.warning("No static dialog path set")
            return []
            
        dialog_file = self.static_dialog_path / f"{scene_id}.json"
        if not dialog_file.exists():
            self.logger.warning(f"Dialog file not found: {dialog_file}")
            return []
            
        try:
            with open(dialog_file, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            self.logger.error(f"Error loading dialog file: {e}")
            return []
    
    def generate_dynamic_dialog(
        self,
        character_name: str,
        context: Dict[str, Any],
        language_level: str = "beginner"
    ) -> Dict[str, Any]:
        """
        Generate dynamic dialog using LLM.
        
        Args:
            character_name: Character name
            context: Dialog context
            language_level: Japanese language level
            
        Returns:
            Dialog entry with text and translation
        """
        if not self.llm_client:
            self.logger.warning("No LLM client available for dynamic dialog")
            return {
                "character": character_name,
                "text": "...",
                "translation": "...",
                "is_dynamic": True
            }
            
        try:
            dialog_result = self.llm_client.generate_dialog(
                character_name=character_name,
                context=context,
                language_level=language_level
            )
            
            return {
                "character": character_name,
                "text": dialog_result.get("text", "..."),
                "translation": dialog_result.get("translation", "..."),
                "pronunciation": dialog_result.get("pronunciation", ""),
                "is_dynamic": True
            }
        except Exception as e:
            self.logger.error(f"Error generating dynamic dialog: {e}")
            return {
                "character": character_name,
                "text": "...",
                "translation": "...",
                "is_dynamic": True
            }
    
    def generate_choices(
        self,
        context: Dict[str, Any],
        num_choices: int = 3,
        language_level: str = "beginner"
    ) -> List[Dict[str, Any]]:
        """
        Generate player choices using LLM.
        
        Args:
            context: Dialog context
            num_choices: Number of choices to generate
            language_level: Japanese language level
            
        Returns:
            List of choice options
        """
        if not self.llm_client:
            self.logger.warning("No LLM client available for generating choices")
            return [{"text": "...", "translation": "..."} for _ in range(num_choices)]
            
        try:
            choices = self.llm_client.generate_choices(
                context=context,
                num_choices=num_choices,
                language_level=language_level
            )
            return choices
        except Exception as e:
            self.logger.error(f"Error generating choices: {e}")
            return [{"text": "...", "translation": "..."} for _ in range(num_choices)]
    
    def add_dialog(self, dialog_entry: Dict[str, Any]) -> None:
        """
        Add dialog entry to current dialog.
        
        Args:
            dialog_entry: Dialog entry to add
        """
        self.current_dialog.append(dialog_entry)
        self.dialog_history.append(dialog_entry)
        
    def clear_current_dialog(self) -> None:
        """Clear current dialog but keep history."""
        self.current_dialog = []
        
    def register_callback(self, event_type: str, callback: Callable) -> None:
        """
        Register callback for dialog events.
        
        Args:
            event_type: Event type
            callback: Callback function
        """
        self.callbacks[event_type] = callback
        
    def trigger_callback(self, event_type: str, data: Any = None) -> None:
        """
        Trigger callback for an event.
        
        Args:
            event_type: Event type
            data: Event data
        """
        if event_type in self.callbacks:
            self.callbacks[event_type](data) 