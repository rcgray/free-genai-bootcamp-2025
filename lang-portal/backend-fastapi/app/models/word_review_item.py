from datetime import datetime
from sqlalchemy import Boolean, DateTime, ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base


class WordReviewItem(Base):
    """Model for tracking individual word reviews within study sessions."""
    __tablename__ = "word_review_items"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    word_id: Mapped[int] = mapped_column(Integer, ForeignKey("words.id"), nullable=False)
    study_session_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("study_sessions.id"), nullable=False
    )
    correct: Mapped[bool] = mapped_column(Boolean, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, default=datetime.utcnow
    )

    # Relationships
    word = relationship("Word", back_populates="reviews")
    study_session = relationship("StudySession", back_populates="reviews") 