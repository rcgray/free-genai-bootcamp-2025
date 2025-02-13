from typing import List
from sqlalchemy import ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base, TimestampMixin


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
    review_items: Mapped[List["WordReviewItem"]] = relationship(
        "WordReviewItem",
        back_populates="study_session",
        cascade="all, delete-orphan"
    )


class WordReviewItem(Base, TimestampMixin):
    __tablename__ = "word_review_items"

    id: Mapped[int] = mapped_column(primary_key=True)
    word_id: Mapped[int] = mapped_column(ForeignKey("words.id"), nullable=False)
    study_session_id: Mapped[int] = mapped_column(
        ForeignKey("study_sessions.id"),
        nullable=False
    )
    correct: Mapped[bool] = mapped_column(nullable=False)

    # Relationships
    word: Mapped["Word"] = relationship("Word", back_populates="review_items")
    study_session: Mapped["StudySession"] = relationship(
        "StudySession",
        back_populates="review_items"
    ) 