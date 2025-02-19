from datetime import datetime
from pydantic import Field, constr
from app.schemas.base import BaseSchema


class ActivityBase(BaseSchema):
    """Base schema for activities."""
    name: str = Field(..., min_length=1, description="Name of the activity")
    url: str = Field(
        ...,
        pattern=r'^[a-z0-9-]+$',
        description="Internal identifier for the activity (lowercase letters, numbers, and hyphens only)"
    )
    description: str = Field(..., description="Description of the activity")


class ActivityCreate(ActivityBase):
    """Schema for creating a new activity."""
    pass


class ActivityUpdate(BaseSchema):
    """Schema for updating an activity."""
    name: str | None = Field(None, min_length=1, description="Name of the activity")
    url: str | None = Field(
        None,
        pattern=r'^[a-z0-9-]+$',
        description="Internal identifier for the activity (lowercase letters, numbers, and hyphens only)"
    )
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