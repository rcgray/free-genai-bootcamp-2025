from typing import Dict
from sqlalchemy import JSON, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base


class Word(Base):
    __tablename__ = "words"

    id: Mapped[int] = mapped_column(primary_key=True)
    kanji: Mapped[str] = mapped_column(String, nullable=False)
    romaji: Mapped[str] = mapped_column(String, nullable=False)
    english: Mapped[str] = mapped_column(String, nullable=False)
    parts: Mapped[Dict] = mapped_column(JSON, nullable=False)

    # Relationships
    groups = relationship(
        "Group",
        secondary="word_groups",
        back_populates="words"
    )
    review_items = relationship("WordReviewItem", back_populates="word") 