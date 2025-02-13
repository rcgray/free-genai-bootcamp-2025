from sqlalchemy import ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base


class WordGroup(Base):
    __tablename__ = "word_groups"
    __table_args__ = (UniqueConstraint("word_id", "group_id"),)

    word_id: Mapped[int] = mapped_column(ForeignKey("words.id", ondelete="CASCADE"), primary_key=True)
    group_id: Mapped[int] = mapped_column(ForeignKey("groups.id", ondelete="CASCADE"), primary_key=True)

    # Define relationships for easier access
    word: Mapped["Word"] = relationship("Word", back_populates="word_groups")
    group: Mapped["Group"] = relationship("Group", back_populates="word_groups") 