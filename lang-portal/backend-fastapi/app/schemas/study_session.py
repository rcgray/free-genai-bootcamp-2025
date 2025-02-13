from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field
from app.schemas.base import BaseSchema


class StudyActivityBase(BaseSchema):
    name: str
    url: str


class StudyActivity(StudyActivityBase):
    id: int


class StudySessionBase(BaseSchema):
    """Base schema for study sessions."""
    group_id: int = Field(..., description="ID of the group being studied")
    study_activity_id: int = Field(..., description="ID of the study activity being used")


class StudySessionCreate(StudySessionBase):
    """Schema for creating a new study session."""
    pass


class WordReviewBase(BaseSchema):
    """Base schema for word reviews."""
    word_id: int = Field(..., description="ID of the word being reviewed")
    correct: bool = Field(..., description="Whether the answer was correct")


class WordReviewCreate(WordReviewBase):
    """Schema for creating a new word review."""
    pass


class WordReview(WordReviewBase):
    """Schema for word review responses, includes database fields."""
    id: int
    study_session_id: int
    created_at: datetime

    class Config:
        from_attributes = True


class StudySession(StudySessionBase):
    """Schema for study session responses, includes database fields."""
    id: int
    created_at: datetime
    reviews: List[WordReview] = Field(default_factory=list)

    class Config:
        from_attributes = True


class StudySessionStats(BaseModel):
    """Schema for study session statistics."""
    total_reviews: int = Field(0, description="Total number of reviews")
    correct_reviews: int = Field(0, description="Number of correct reviews")
    accuracy: float = Field(0.0, description="Percentage of correct reviews") 