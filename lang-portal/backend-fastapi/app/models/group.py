from typing import List
from sqlalchemy import String, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base
from app.models.word_group import WordGroup  # Import the junction table


class Group(Base):
    __tablename__ = "groups"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    words_count: Mapped[int] = mapped_column(Integer, default=0)

    # Relationships
    word_groups: Mapped[List["WordGroup"]] = relationship(
        "WordGroup",
        back_populates="group",
        cascade="all, delete-orphan"
    )
    words: Mapped[List["Word"]] = relationship(
        "Word",
        secondary="word_groups",
        back_populates="groups"
    )
    sessions: Mapped[List["Session"]] = relationship(
        "Session",
        back_populates="group"
    ) 