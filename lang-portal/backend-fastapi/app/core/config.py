from pathlib import Path
from typing import Any
from pydantic_settings import BaseSettings
from pydantic import validator
from functools import lru_cache


class Settings(BaseSettings):
    # Application
    APP_NAME: str = "Japanese Learning Portal"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    
    # API
    API_V1_PREFIX: str = "/api"
    
    # Database
    DATABASE_URL: str
    
    # Frontend
    FRONTEND_URL: str = "http://localhost:5173"
    
    # Logging
    LOG_LEVEL: str = "INFO"
    
    @validator("DATABASE_URL")
    def validate_database_url(cls, v: str, values: dict[str, Any]) -> str:
        """Validate and transform database URL.
        
        - Ensures async driver is used
        - Converts relative paths to absolute paths within project directory
        """
        if v.startswith("sqlite"):
            # Get the project root directory (3 levels up from config.py)
            project_root = Path(__file__).parents[3].resolve()
            
            # Extract the path part from the URL
            prefix = "sqlite://"
            if v.startswith(prefix + "////"):  # Absolute path
                return v.replace("sqlite:", "sqlite+aiosqlite:", 1)
            
            # Handle relative path - make it relative to project root
            rel_path = v[len(prefix + "//"):]  # Remove sqlite:// prefix
            
            # Remove leading ./ if present
            rel_path = rel_path.lstrip("./")
            
            # Create path relative to project root
            db_path = project_root / rel_path
            
            # Verify the path is within project directory
            try:
                # Use relative_to to verify path is within project root
                db_path.resolve().relative_to(project_root)
            except ValueError:
                raise ValueError(f"Database path must be within project directory: {project_root}")
            
            return f"sqlite+aiosqlite:///{db_path}"
            
        return v
    
    class Config:
        env_file = Path(__file__).parents[3] / ".env"  # Look for .env in project root
        case_sensitive = True


@lru_cache()
def get_settings() -> Settings:
    return Settings() 