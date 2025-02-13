from typing import Dict, List, Optional
from pydantic import BaseModel, Field
from app.schemas.base import BaseSchema


class WordBase(BaseSchema):
    kanji: str = Field(..., description="Word in Japanese kanji")
    romaji: str = Field(..., description="Romanized version of the word")
    english: str = Field(..., description="English translation")
    parts: Dict = Field(..., description="Word components in JSON format")


class WordCreate(WordBase):
    """Schema for creating a new word."""
    pass


class WordUpdate(BaseModel):
    """Schema for updating an existing word. All fields are optional."""
    kanji: Optional[str] = Field(None, description="Word in Japanese kanji")
    romaji: Optional[str] = Field(None, description="Romanized version of the word")
    english: Optional[str] = Field(None, description="English translation")
    parts: Optional[Dict] = Field(None, description="Word components in JSON format")


class Word(WordBase):
    """Schema for word responses, includes database fields."""
    id: int
    correct_count: int = Field(0, description="Number of correct reviews")
    wrong_count: int = Field(0, description="Number of incorrect reviews")

    class Config:
        from_attributes = True


class WordInGroup(Word):
    group_ids: List[int] 