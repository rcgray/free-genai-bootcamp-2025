from typing import Dict, List, Optional
from pydantic import BaseModel
from app.schemas.base import BaseSchema


class WordBase(BaseSchema):
    kanji: str
    romaji: str
    english: str
    parts: Dict


class WordCreate(WordBase):
    pass


class Word(WordBase):
    id: int
    correct_count: Optional[int] = 0
    wrong_count: Optional[int] = 0


class WordInGroup(Word):
    group_ids: List[int] 