"""
Configuration utilities for the application.
"""

import os
import json
import logging
from pathlib import Path
from typing import Dict, Any, Optional


logger = logging.getLogger(__name__)


def load_config(config_path: Optional[Path] = None) -> Dict[str, Any]:
    """
    Load application configuration.
    
    Args:
        config_path: Path to configuration file
        
    Returns:
        Configuration dictionary
    """
    # Default configuration
    config = {
        "app_name": "Japanese Language Learning Visual Novel",
        "version": "0.1.0",
        "debug": False,
        "host": "127.0.0.1",
        "port": 8000,
        "assets_path": "assets",
        "data_path": "data",
        "static_path": "static",
        "openai_model": "gpt-3.5-turbo",
        "language_levels": ["beginner", "intermediate", "advanced"],
        "default_language_level": "beginner",
        "max_choices": 3,
        "save_slots": 5
    }
    
    # Load from config file if provided
    if config_path and config_path.exists():
        try:
            with open(config_path, "r", encoding="utf-8") as f:
                file_config = json.load(f)
                config.update(file_config)
            logger.info(f"Loaded configuration from {config_path}")
        except Exception as e:
            logger.error(f"Error loading configuration file: {e}")
    
    # Override with environment variables
    env_overrides = {
        "DEBUG": ("debug", lambda x: x.lower() == "true"),
        "HOST": ("host", str),
        "PORT": ("port", int),
        "OPENAI_API_KEY": ("openai_api_key", str),
        "OPENAI_MODEL": ("openai_model", str),
        "ASSETS_PATH": ("assets_path", str),
        "DATA_PATH": ("data_path", str),
        "STATIC_PATH": ("static_path", str),
        "DEFAULT_LANGUAGE_LEVEL": ("default_language_level", str)
    }
    
    for env_var, (config_key, transform) in env_overrides.items():
        if env_var in os.environ:
            try:
                config[config_key] = transform(os.environ[env_var])
            except Exception as e:
                logger.error(f"Error processing environment variable {env_var}: {e}")
    
    return config


def save_config(config: Dict[str, Any], config_path: Path) -> bool:
    """
    Save configuration to file.
    
    Args:
        config: Configuration dictionary
        config_path: Path to save configuration
        
    Returns:
        True if successful, False otherwise
    """
    try:
        # Ensure directory exists
        config_path.parent.mkdir(parents=True, exist_ok=True)
        
        # Remove sensitive information before saving
        safe_config = config.copy()
        if "openai_api_key" in safe_config:
            del safe_config["openai_api_key"]
        
        with open(config_path, "w", encoding="utf-8") as f:
            json.dump(safe_config, f, indent=2)
            
        logger.info(f"Configuration saved to {config_path}")
        return True
    except Exception as e:
        logger.error(f"Error saving configuration: {e}")
        return False


def get_path(config: Dict[str, Any], path_type: str) -> Path:
    """
    Get a path from configuration.
    
    Args:
        config: Configuration dictionary
        path_type: Type of path (assets, data, static)
        
    Returns:
        Path object
    """
    path_key = f"{path_type}_path"
    if path_key not in config:
        logger.warning(f"Path key {path_key} not found in configuration")
        return Path(path_type)
        
    return Path(config[path_key])


def setup_logging(config: Dict[str, Any]) -> None:
    """
    Set up logging based on configuration.
    
    Args:
        config: Configuration dictionary
    """
    log_level = logging.DEBUG if config.get("debug", False) else logging.INFO
    log_format = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    
    # Configure root logger
    logging.basicConfig(
        level=log_level,
        format=log_format
    )
    
    # Optionally set up file logging
    if "log_file" in config:
        file_handler = logging.FileHandler(config["log_file"])
        file_handler.setFormatter(logging.Formatter(log_format))
        logging.getLogger().addHandler(file_handler)
        
    logger.info(f"Logging initialized at level {log_level}")
    
    # Reduce verbosity of some loggers
    logging.getLogger("urllib3").setLevel(logging.WARNING)
    logging.getLogger("PIL").setLevel(logging.WARNING) 