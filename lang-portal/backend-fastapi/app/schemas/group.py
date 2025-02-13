from typing import List, Optional
from app.schemas.base import BaseSchema
from app.schemas.word import Word


class GroupBase(BaseSchema):
    name: str


class GroupCreate(GroupBase):
    pass


class Group(GroupBase):
    id: int
    words_count: int


class GroupWithWords(Group):
    words: List[Word] 