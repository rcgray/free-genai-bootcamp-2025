"""
Database utilities for the application.
"""

import json
import logging
from pathlib import Path
from typing import Dict, Any, List, Optional, TypedDict, Union

from tinydb import TinyDB, Query
from tinydb.table import Document


logger = logging.getLogger(__name__)


class PlayerData(TypedDict):
    """Type definition for player data."""
    name: str
    language_level: str
    progress: Dict[str, Any]
    learned_words: List[Dict[str, Any]]
    score: int


class GameSave(TypedDict):
    """Type definition for game save data."""
    save_id: int
    timestamp: str
    player: PlayerData
    current_scene: str
    flags: Dict[str, Any]
    inventory: List[Dict[str, Any]]


class DatabaseManager:
    """Manager for database operations."""
    
    def __init__(self, data_path: Union[str, Path]) -> None:
        """
        Initialize the database manager.
        
        Args:
            data_path: Path to the data directory
        """
        self.data_path = Path(data_path)
        self.data_path.mkdir(parents=True, exist_ok=True)
        
        # Create database files if they don't exist
        self.saves_db_path = self.data_path / "saves.json"
        self.vocabulary_db_path = self.data_path / "vocabulary.json"
        self.game_data_db_path = self.data_path / "game_data.json"
        
        # Initialize databases
        self.saves_db = TinyDB(self.saves_db_path)
        self.game_data_db = TinyDB(self.game_data_db_path)
        
        # Load vocabulary from JSON file
        self.vocabulary = self._load_vocabulary()
        
        logger.info("Database manager initialized")
    
    def _load_vocabulary(self) -> Dict[str, Any]:
        """
        Load vocabulary from JSON file.
        
        Returns:
            Dictionary of vocabulary words
        """
        if not self.vocabulary_db_path.exists():
            logger.warning(f"Vocabulary database not found: {self.vocabulary_db_path}")
            return {}
            
        try:
            with open(self.vocabulary_db_path, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            logger.error(f"Error loading vocabulary database: {e}")
            return {}
    
    def save_game(self, save_data: GameSave) -> bool:
        """
        Save game data.
        
        Args:
            save_data: Game save data
            
        Returns:
            True if successful, False otherwise
        """
        try:
            # Check if save already exists
            Save = Query()
            existing_save = self.saves_db.get(Save.save_id == save_data["save_id"])
            
            if existing_save:
                # Update existing save
                self.saves_db.update(save_data, Save.save_id == save_data["save_id"])
            else:
                # Insert new save
                self.saves_db.insert(save_data)
                
            logger.info(f"Game saved with ID: {save_data['save_id']}")
            return True
        except Exception as e:
            logger.error(f"Error saving game: {e}")
            return False
    
    def load_game(self, save_id: int) -> Optional[GameSave]:
        """
        Load game data.
        
        Args:
            save_id: Save ID
            
        Returns:
            Game save data or None if not found
        """
        try:
            Save = Query()
            save_data = self.saves_db.get(Save.save_id == save_id)
            
            if not save_data:
                logger.warning(f"Save not found with ID: {save_id}")
                return None
                
            logger.info(f"Game loaded with ID: {save_id}")
            return save_data
        except Exception as e:
            logger.error(f"Error loading game: {e}")
            return None
    
    def get_all_saves(self) -> List[Dict[str, Any]]:
        """
        Get all game saves.
        
        Returns:
            List of game saves
        """
        try:
            return self.saves_db.all()
        except Exception as e:
            logger.error(f"Error getting all saves: {e}")
            return []
    
    def delete_save(self, save_id: int) -> bool:
        """
        Delete a game save.
        
        Args:
            save_id: Save ID
            
        Returns:
            True if successful, False otherwise
        """
        try:
            Save = Query()
            self.saves_db.remove(Save.save_id == save_id)
            logger.info(f"Save deleted with ID: {save_id}")
            return True
        except Exception as e:
            logger.error(f"Error deleting save: {e}")
            return False
    
    def get_vocabulary_word(self, word: str) -> Optional[Dict[str, Any]]:
        """
        Get information about a vocabulary word.
        
        Args:
            word: Japanese word
            
        Returns:
            Word information or None if not found
        """
        return self.vocabulary.get(word)
    
    def get_vocabulary_by_level(self, level: str) -> List[Dict[str, Any]]:
        """
        Get vocabulary words by level.
        
        Args:
            level: Language level (beginner, intermediate, advanced)
            
        Returns:
            List of vocabulary words
        """
        return [word_data for word_data in self.vocabulary.values() 
                if word_data.get("level") == level]
    
    def update_player_data(self, player_data: PlayerData) -> bool:
        """
        Update player data.
        
        Args:
            player_data: Player data
            
        Returns:
            True if successful, False otherwise
        """
        try:
            Player = Query()
            existing_player = self.game_data_db.get(Player.name == player_data["name"])
            
            if existing_player:
                # Update existing player
                self.game_data_db.update(player_data, Player.name == player_data["name"])
            else:
                # Insert new player
                self.game_data_db.insert(player_data)
                
            logger.info(f"Player data updated for: {player_data['name']}")
            return True
        except Exception as e:
            logger.error(f"Error updating player data: {e}")
            return False
    
    def get_player_data(self, player_name: str) -> Optional[PlayerData]:
        """
        Get player data.
        
        Args:
            player_name: Player name
            
        Returns:
            Player data or None if not found
        """
        try:
            Player = Query()
            player_data = self.game_data_db.get(Player.name == player_name)
            
            if not player_data:
                logger.warning(f"Player not found: {player_name}")
                return None
                
            return player_data
        except Exception as e:
            logger.error(f"Error getting player data: {e}")
            return None
    
    def close(self) -> None:
        """Close database connections."""
        self.saves_db.close()
        self.game_data_db.close()
        logger.info("Database connections closed") 