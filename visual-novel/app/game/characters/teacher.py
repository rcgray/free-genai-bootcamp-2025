"""
Teacher character for the visual novel game.
"""

from typing import Dict, Any
from app.game.characters.character import Character


def create_teacher() -> Character:
    """
    Create the teacher character.
    
    Returns:
        Character: Teacher character instance
    """
    name = "teacher"
    display_name = "先生"
    description = "A friendly Japanese language teacher who guides the player through their learning journey."
    
    # Character images for different poses/expressions
    images = {
        "default": "assets/images/characters/teacher/default.png",
        "happy": "assets/images/characters/teacher/happy.png",
        "thinking": "assets/images/characters/teacher/thinking.png",
        "surprised": "assets/images/characters/teacher/surprised.png"
    }
    
    # Character personality traits and teaching style
    traits = {
        "personality": {
            "friendly": 0.9,
            "patient": 0.8,
            "encouraging": 0.9,
            "strict": 0.4
        },
        "teaching_style": {
            "interactive": 0.8,
            "structured": 0.7,
            "example_based": 0.9,
            "conversational": 0.8
        },
        "background": {
            "years_teaching": 15,
            "specialization": "Conversational Japanese",
            "hometown": "Kyoto"
        }
    }
    
    # Create and return the character
    return Character(
        name=name,
        display_name=display_name,
        description=description,
        images=images,
        traits=traits,
        language_level="intermediate"  # Teacher speaks at intermediate level
    ) 