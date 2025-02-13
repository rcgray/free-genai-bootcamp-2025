from pathlib import Path
from typing import Any
from pydantic_settings import BaseSettings
from pydantic import validator
from functools import lru_cache


class Settings(BaseSettings):
    APP_NAME: str = "Japanese Learning Portal"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    
    # API
    API_V1_PREFIX: str = "/api"
    
    # Database
    DATABASE_URL: str
    
    @validator("DATABASE_URL")
    def validate_database_url(cls, v: str) -> str:
        if v.startswith("sqlite"):
            # Ensure async driver
            return v.replace("sqlite:", "sqlite+aiosqlite:", 1)
        return v
    
    class Config:
        env_file = Path(__file__).parents[3] / ".env"  # Look for .env in project root
        case_sensitive = True


@lru_cache()
def get_settings() -> Settings:
    return Settings() 