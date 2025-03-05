"""
Character class for the visual novel game.
"""

from typing import Dict, Any, List, Optional


class Character:
    """Class representing a character in the game."""
    
    def __init__(
        self,
        name: str,
        display_name: str,
        description: str,
        images: Dict[str, str],
        traits: Optional[Dict[str, Any]] = None,
        language_level: str = "beginner"
    ) -> None:
        """
        Initialize a character.
        
        Args:
            name: Internal character identifier
            display_name: Name to display in the game
            description: Character description
            images: Dictionary mapping pose names to image paths
            traits: Character personality traits and attributes
            language_level: Japanese language level for this character's dialog
        """
        self.name = name
        self.display_name = display_name
        self.description = description
        self.images = images
        self.traits = traits or {}
        self.language_level = language_level
        self.dialog_history: List[Dict[str, Any]] = []
    
    def get_image(self, pose: str = "default") -> str:
        """
        Get character image for a specific pose.
        
        Args:
            pose: Pose name
            
        Returns:
            Path to the image file
        """
        return self.images.get(pose, self.images.get("default", ""))
    
    def add_dialog(self, text: str, translation: str, context: Optional[Dict[str, Any]] = None) -> None:
        """
        Add dialog to character's history.
        
        Args:
            text: Dialog text in Japanese
            translation: English translation
            context: Additional context for the dialog
        """
        dialog_entry = {
            "text": text,
            "translation": translation,
            "context": context or {}
        }
        self.dialog_history.append(dialog_entry)
    
    def to_dict(self) -> Dict[str, Any]:
        """
        Convert character to dictionary for serialization.
        
        Returns:
            Dictionary representation of the character
        """
        return {
            "name": self.name,
            "display_name": self.display_name,
            "description": self.description,
            "images": self.images,
            "traits": self.traits,
            "language_level": self.language_level
        } 