from datetime import datetime
from typing import Generic, TypeVar, Optional, List, Dict
from pydantic import BaseModel, ConfigDict, Field, model_validator


class BaseSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)


class TimestampSchema(BaseSchema):
    created_at: datetime


T = TypeVar("T")


class PaginatedResponse(BaseModel, Generic[T]):
    items: List[T]
    total: int = Field(ge=0, description="Total number of items")
    page: int = Field(ge=1, description="Current page number (1-based)")
    per_page: int = Field(ge=1, description="Number of items per page")
    total_pages: int = Field(ge=0, description="Total number of pages")

    @model_validator(mode="after")
    def validate_pagination(self):
        """Validate pagination values are consistent."""
        if self.total < 0:
            raise ValueError("Total items cannot be negative")
        if self.page < 1:
            raise ValueError("Page number must be greater than 0")
        if self.per_page < 1:
            raise ValueError("Items per page must be greater than 0")
        if self.total_pages < 0:
            raise ValueError("Total pages cannot be negative")
        if self.total > 0 and self.total_pages == 0:
            raise ValueError("Total pages must be greater than 0 when there are items")
        if len(self.items) > self.per_page:
            raise ValueError("Number of items exceeds per_page limit")
        return self 