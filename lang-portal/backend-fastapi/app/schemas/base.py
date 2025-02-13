from datetime import datetime
from typing import Generic, TypeVar, Optional, List, Dict
from pydantic import BaseModel, ConfigDict


class BaseSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)


class TimestampSchema(BaseSchema):
    created_at: datetime


T = TypeVar("T")


class PaginatedResponse(BaseModel, Generic[T]):
    items: List[T]
    total: int
    page: int
    per_page: int
    total_pages: int 