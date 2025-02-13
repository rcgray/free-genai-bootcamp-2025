from sqlalchemy import String, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base


class Group(Base):
    __tablename__ = "groups"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    words_count: Mapped[int] = mapped_column(Integer, default=0)

    # Relationships
    words = relationship(
        "Word",
        secondary="word_groups",
        back_populates="groups"
    )
    study_sessions = relationship("StudySession", back_populates="group") 