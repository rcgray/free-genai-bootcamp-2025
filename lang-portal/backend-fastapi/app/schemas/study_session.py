from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field, HttpUrl, field_validator, model_validator
from app.schemas.base import BaseSchema


class StudyActivityBase(BaseSchema):
    name: str = Field(..., min_length=1)
    url: HttpUrl


class StudyActivity(StudyActivityBase):
    id: int


class StudySessionBase(BaseSchema):
    """Base schema for study sessions."""
    group_id: int = Field(..., description="ID of the group being studied")
    study_activity_id: int = Field(..., description="ID of the study activity being used")


class StudySessionCreate(StudySessionBase):
    """Schema for creating a new study session."""
    pass


class StudySessionUpdate(BaseSchema):
    """Schema for updating a study session."""
    group_id: Optional[int] = Field(None, description="ID of the group being studied")
    study_activity_id: Optional[int] = Field(None, description="ID of the study activity being used")


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


class StudySession(StudySessionBase):
    """Schema for study session responses, includes database fields."""
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


class StudySessionStats(BaseModel):
    """Schema for study session statistics."""
    total_reviews: int = Field(0, ge=0, description="Total number of reviews")
    correct_reviews: int = Field(0, ge=0, description="Number of correct reviews")
    accuracy: float = Field(0.0, ge=0.0, le=1.0, description="Percentage of correct reviews")

    @model_validator(mode="after")
    def validate_stats(self):
        if self.total_reviews < self.correct_reviews:
            raise ValueError("Total reviews cannot be less than correct reviews")
        return self 