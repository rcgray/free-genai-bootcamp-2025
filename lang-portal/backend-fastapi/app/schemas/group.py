from typing import List, Optional
from pydantic import BaseModel, Field

from app.schemas.base import BaseSchema
from app.schemas.word import Word


class GroupBase(BaseSchema):
    """Base schema for Group with common attributes."""
    name: str = Field(..., description="Name of the group")


class GroupCreate(GroupBase):
    """Schema for creating a new group."""
    word_ids: Optional[List[int]] = Field(
        None,
        description="Optional list of word IDs to add to the group"
    )


class GroupUpdate(BaseModel):
    """Schema for updating an existing group. All fields are optional."""
    name: Optional[str] = Field(None, description="Name of the group")
    word_ids: Optional[List[int]] = Field(
        None,
        description="List of word IDs to set for the group (replaces existing)"
    )


class Group(GroupBase):
    """Schema for group responses, includes database fields."""
    id: int
    words_count: int = Field(0, description="Number of words in the group")

    class Config:
        from_attributes = True


class GroupWithWords(Group):
    words: List[Word] 