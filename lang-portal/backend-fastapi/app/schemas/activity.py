from pydantic import Field, HttpUrl
from app.schemas.base import BaseSchema


class ActivityBase(BaseSchema):
    """Base schema for Activity with common attributes."""
    name: str = Field(..., min_length=1, description="Name of the activity")
    url: HttpUrl = Field(..., description="URL for the activity")
    image_url: HttpUrl = Field(..., description="URL for the activity's image")
    description: str = Field(..., min_length=1, description="Description of the activity")


class ActivityCreate(ActivityBase):
    """Schema for creating a new activity."""
    pass


class ActivityUpdate(BaseSchema):
    """Schema for updating an existing activity. All fields are optional."""
    name: str | None = Field(None, min_length=1, description="Name of the activity")
    url: HttpUrl | None = Field(None, description="URL for the activity")
    image_url: HttpUrl | None = Field(None, description="URL for the activity's image")
    description: str | None = Field(None, min_length=1, description="Description of the activity")


class Activity(ActivityBase):
    """Schema for activity responses, includes database fields."""
    id: int

    model_config = {
        "from_attributes": True
    } 