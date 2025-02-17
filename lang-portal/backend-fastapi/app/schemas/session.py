from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field, field_validator, model_validator
from app.schemas.base import BaseSchema
from app.schemas.activity import Activity


class SessionBase(BaseSchema):
    """Base schema for sessions."""
    group_id: int = Field(..., description="ID of the group being studied")
    activity_id: int = Field(..., description="ID of the activity being used")


class SessionCreate(SessionBase):
    """Schema for creating a new session."""
    pass


class SessionUpdate(BaseSchema):
    """Schema for updating a session."""
    group_id: Optional[int] = Field(None, description="ID of the group being studied")
    activity_id: Optional[int] = Field(None, description="ID of the activity being used")


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
    session_id: int
    created_at: str

    model_config = {
        "from_attributes": True,
        "json_encoders": {
            datetime: lambda dt: dt.isoformat()
        }
    }

    @field_validator("created_at", mode="before")
    @classmethod
    def convert_datetime_to_str(cls, v):
        if isinstance(v, datetime):
            return v.isoformat()
        return v


class Session(SessionBase):
    """Schema for session responses, includes database fields."""
    id: int
    created_at: str
    reviews: List[WordReview] = Field(default_factory=list)

    model_config = {
        "from_attributes": True,
        "json_encoders": {
            datetime: lambda dt: dt.isoformat()
        }
    }

    @field_validator("created_at", mode="before")
    @classmethod
    def convert_datetime_to_str(cls, v):
        if isinstance(v, datetime):
            return v.isoformat()
        return v


class SessionStats(BaseModel):
    """Schema for session statistics."""
    total_reviews: int = Field(0, ge=0, description="Total number of reviews")
    correct_reviews: int = Field(0, ge=0, description="Number of correct reviews")
    accuracy: float = Field(0.0, ge=0.0, le=1.0, description="Percentage of correct reviews")

    @model_validator(mode="after")
    def validate_stats(self):
        if self.total_reviews < self.correct_reviews:
            raise ValueError("Total reviews cannot be less than correct reviews")
        return self 