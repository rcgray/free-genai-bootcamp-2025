from sqlalchemy import ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column
from app.models.base import Base


class WordGroup(Base):
    __tablename__ = "word_groups"
    __table_args__ = (UniqueConstraint("word_id", "group_id"),)

    word_id: Mapped[int] = mapped_column(ForeignKey("words.id"), primary_key=True)
    group_id: Mapped[int] = mapped_column(ForeignKey("groups.id"), primary_key=True) 