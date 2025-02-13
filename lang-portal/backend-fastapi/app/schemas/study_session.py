from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from app.schemas.base import BaseSchema


class StudyActivityBase(BaseSchema):
    name: str
    url: str


class StudyActivity(StudyActivityBase):
    id: int


class StudySessionBase(BaseSchema):
    group_id: int
    study_activity_id: int


class StudySession(StudySessionBase):
    id: int
    created_at: datetime


class WordReviewBase(BaseSchema):
    word_id: int
    correct: bool


class WordReview(WordReviewBase):
    id: int
    study_session_id: int
    created_at: datetime 