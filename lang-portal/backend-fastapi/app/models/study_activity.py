from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base


class StudyActivity(Base):
    __tablename__ = "study_activities"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    url: Mapped[str] = mapped_column(String, nullable=False)

    # Relationships
    study_sessions = relationship("StudySession", back_populates="study_activity") 