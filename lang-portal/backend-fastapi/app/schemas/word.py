from typing import Dict, List, Optional
from pydantic import BaseModel, Field, ConfigDict
from app.schemas.base import BaseSchema


class WordPart(BaseModel):
    """Schema for a word part with its kanji and possible romaji readings."""
    kanji: str = Field(..., description="The kanji character or kana for this part")
    romaji: List[str] = Field(..., description="List of possible romaji readings for this part")


class WordBase(BaseSchema):
    kanji: str = Field(..., description="Word in Japanese kanji")
    romaji: str = Field(..., description="Romanized version of the word")
    english: str = Field(..., description="English translation")
    parts: List[WordPart] = Field(..., description="Word components with their readings")


class WordCreate(WordBase):
    """Schema for creating a new word."""
    pass


class WordUpdate(BaseModel):
    """Schema for updating an existing word. All fields are optional."""
    kanji: Optional[str] = Field(None, description="Word in Japanese kanji")
    romaji: Optional[str] = Field(None, description="Romanized version of the word")
    english: Optional[str] = Field(None, description="English translation")
    parts: Optional[List[WordPart]] = Field(None, description="Word components with their readings")


class Word(WordBase):
    """Schema for word responses, includes database fields."""
    id: int
    correct_count: int = Field(0, description="Number of correct reviews")
    wrong_count: int = Field(0, description="Number of incorrect reviews")

    model_config = ConfigDict(
        from_attributes=True,
        # Exclude reviews from response to prevent serialization issues
        exclude={"reviews", "word_groups"}
    )


class WordInGroup(Word):
    group_ids: List[int] 