from typing import Dict, List
from sqlalchemy import JSON, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base
from app.models.word_group import WordGroup  # Import the junction table
from app.models.word_review_item import WordReviewItem  # Fixed import path


class Word(Base):
    __tablename__ = "words"

    id: Mapped[int] = mapped_column(primary_key=True)
    kanji: Mapped[str] = mapped_column(String, nullable=False)
    romaji: Mapped[str] = mapped_column(String, nullable=False)
    english: Mapped[str] = mapped_column(String, nullable=False)
    parts: Mapped[Dict] = mapped_column(JSON, nullable=False)

    # Relationships
    word_groups: Mapped[List["WordGroup"]] = relationship(
        "WordGroup",
        back_populates="word",
        cascade="all, delete-orphan"
    )
    groups: Mapped[List["Group"]] = relationship(
        "Group",
        secondary="word_groups",
        back_populates="words",
        viewonly=True
    )
    reviews: Mapped[List["WordReviewItem"]] = relationship(  # Fixed relationship name
        "WordReviewItem",  # Use string to avoid circular imports
        back_populates="word",
        cascade="all, delete-orphan"
    ) 