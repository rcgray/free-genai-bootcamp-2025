import pytest
from datetime import datetime
from typing import List
from pydantic import ValidationError
from app.schemas.base import BaseSchema, TimestampSchema, PaginatedResponse

def test_base_schema():
    """Test BaseSchema functionality."""
    class TestSchema(BaseSchema):
        name: str
        value: int

    # Test valid data
    valid_data = {
        "name": "test",
        "value": 42
    }
    schema = TestSchema(**valid_data)
    assert schema.name == valid_data["name"]
    assert schema.value == valid_data["value"]

    # Test model_config from_attributes
    class TestModel:
        def __init__(self, name: str, value: int):
            self.name = name
            self.value = value

    model = TestModel("test", 42)
    schema = TestSchema.model_validate(model)
    assert schema.name == model.name
    assert schema.value == model.value

def test_timestamp_schema():
    """Test TimestampSchema functionality."""
    # Test with datetime object
    now = datetime.utcnow()
    schema = TimestampSchema(created_at=now)
    assert isinstance(schema.created_at, datetime)
    assert schema.created_at == now

    # Test with ISO format string
    iso_time = "2024-02-14T12:00:00"
    schema = TimestampSchema(created_at=iso_time)
    assert isinstance(schema.created_at, datetime)
    assert schema.created_at.isoformat().startswith(iso_time)

    # Test invalid datetime format
    with pytest.raises(ValidationError):
        TimestampSchema(created_at="invalid-date")

def test_paginated_response():
    """Test PaginatedResponse functionality."""
    class TestItem(BaseSchema):
        id: int
        name: str

    # Test valid data
    items = [
        TestItem(id=1, name="item1"),
        TestItem(id=2, name="item2")
    ]
    response = PaginatedResponse[TestItem](
        items=items,
        total=10,
        page=1,
        per_page=2,
        total_pages=5
    )
    assert len(response.items) == 2
    assert response.total == 10
    assert response.page == 1
    assert response.per_page == 2
    assert response.total_pages == 5
    assert all(isinstance(item, TestItem) for item in response.items)

    # Test empty items list
    empty_response = PaginatedResponse[TestItem](
        items=[],
        total=0,
        page=1,
        per_page=10,
        total_pages=0
    )
    assert len(empty_response.items) == 0
    assert empty_response.total == 0
    assert empty_response.total_pages == 0

    # Test invalid data
    with pytest.raises(ValidationError):
        PaginatedResponse[TestItem](
            items=[{"invalid": "data"}],
            total=1,
            page=1,
            per_page=10,
            total_pages=1
        )

    # Test invalid page numbers
    with pytest.raises(ValidationError):
        PaginatedResponse[TestItem](
            items=[],
            total=0,
            page=0,  # Page should be >= 1
            per_page=10,
            total_pages=0
        )

    with pytest.raises(ValidationError):
        PaginatedResponse[TestItem](
            items=[],
            total=0,
            page=1,
            per_page=0,  # per_page should be >= 1
            total_pages=0
        )
