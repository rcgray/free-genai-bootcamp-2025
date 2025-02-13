from typing import List
from sqlalchemy import ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base, TimestampMixin
from app.models.word_review_item import WordReviewItem


class StudySession(Base, TimestampMixin):
    __tablename__ = "study_sessions"

    id: Mapped[int] = mapped_column(primary_key=True)
    group_id: Mapped[int] = mapped_column(ForeignKey("groups.id"), nullable=False)
    study_activity_id: Mapped[int] = mapped_column(
        ForeignKey("study_activities.id"),
        nullable=False
    )

    # Relationships
    group: Mapped["Group"] = relationship("Group", back_populates="study_sessions")
    study_activity: Mapped["StudyActivity"] = relationship(
        "StudyActivity",
        back_populates="study_sessions"
    )
    reviews: Mapped[List["WordReviewItem"]] = relationship(
        "WordReviewItem",
        back_populates="study_session",
        cascade="all, delete-orphan"
    ) 