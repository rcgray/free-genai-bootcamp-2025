"""
Base scene class for the visual novel game.
"""

from typing import Dict, Any, Optional, Callable


class Scene:
    """Base class for all game scenes."""
    
    def __init__(self, name: str, config: Dict[str, Any]) -> None:
        """
        Initialize a scene.
        
        Args:
            name: Scene name
            config: Scene configuration
        """
        self.name = name
        self.config = config
        self.next_scene: Optional[str] = None
        self.on_exit_callback: Optional[Callable] = None
    
    def enter(self) -> None:
        """Called when entering the scene."""
        pass
    
    def exit(self) -> None:
        """Called when exiting the scene."""
        if self.on_exit_callback:
            self.on_exit_callback(self.next_scene)
    
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
        pass
    
    def transition_to(self, scene_name: str) -> None:
        """
        Transition to another scene.
        
        Args:
            scene_name: Name of the scene to transition to
        """
        self.next_scene = scene_name
        self.exit()
    
    def set_exit_callback(self, callback: Callable) -> None:
        """
        Set callback for when the scene exits.
        
        Args:
            callback: Function to call on exit
        """
        self.on_exit_callback = callback 