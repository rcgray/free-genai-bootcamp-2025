from typing import List, Optional, TYPE_CHECKING
from sqlalchemy import ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base, TimestampMixin

if TYPE_CHECKING:
    from app.models.group import Group
    from app.models.activity import Activity
    from app.models.word_review_item import WordReviewItem


class Session(Base, TimestampMixin):
    __tablename__ = "sessions"

    id: Mapped[int] = mapped_column(primary_key=True)
    group_id: Mapped[Optional[int]] = mapped_column(ForeignKey("groups.id"), nullable=True)
    activity_id: Mapped[int] = mapped_column(
        ForeignKey("activities.id"),
        nullable=False
    )

    # Relationships
    group: Mapped[Optional["Group"]] = relationship("Group", back_populates="sessions")
    activity: Mapped["Activity"] = relationship(
        "Activity",
        back_populates="sessions"
    )
    reviews: Mapped[List["WordReviewItem"]] = relationship(
        "WordReviewItem",
        back_populates="session",
        cascade="all, delete-orphan"
    ) 