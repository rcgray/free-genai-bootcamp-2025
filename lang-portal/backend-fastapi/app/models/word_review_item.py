from datetime import datetime
from typing import TYPE_CHECKING
from sqlalchemy import Boolean, DateTime, ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base
from app.models.session import Session

if TYPE_CHECKING:
    from app.models.word import Word


class WordReviewItem(Base):
    """Model for tracking individual word reviews within study sessions."""
    __tablename__ = "word_review_items"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    word_id: Mapped[int] = mapped_column(Integer, ForeignKey("words.id"), nullable=False)
    session_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("sessions.id"), nullable=False
    )
    correct: Mapped[bool] = mapped_column(Boolean, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, default=datetime.utcnow
    )

    # Relationships
    word: Mapped["Word"] = relationship("Word", back_populates="reviews")
    session: Mapped["Session"] = relationship(
        "Session", back_populates="reviews"
    ) 