from datetime import datetime
from pydantic import Field
from app.schemas.base import BaseSchema


class ActivityBase(BaseSchema):
    """Base schema for activities."""
    name: str = Field(..., description="Name of the activity")
    url: str = Field(..., description="URL where the activity can be launched")
    description: str = Field(..., description="Description of the activity")


class ActivityCreate(ActivityBase):
    """Schema for creating a new activity."""
    pass


class ActivityUpdate(BaseSchema):
    """Schema for updating an activity."""
    name: str | None = Field(None, description="Name of the activity")
    url: str | None = Field(None, description="URL where the activity can be launched")
    description: str | None = Field(None, description="Description of the activity")


class Activity(ActivityBase):
    """Schema for activity responses, includes database fields."""
    id: int

    model_config = {
        "from_attributes": True,
        "json_encoders": {
            datetime: lambda dt: dt.isoformat()
        }
    } 