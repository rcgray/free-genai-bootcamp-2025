from typing import Optional
from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.schemas.group import Group, GroupCreate, GroupWithWords
from app.schemas.base import PaginatedResponse

router = APIRouter()

@router.get("", response_model=PaginatedResponse[Group])
async def get_groups(
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    sort_by: str = Query("name", regex="^(name|words_count)$"),
    order: str = Query("asc", regex="^(asc|desc)$"),
    db: AsyncSession = Depends(get_db),
):
    """
    Get paginated list of word groups.
    """
    # Implementation will come later
    return {
        "items": [],
        "total": 0,
        "page": page,
        "per_page": per_page,
        "total_pages": 0
    }

@router.post("", response_model=Group)
async def create_group(
    group: GroupCreate,
    db: AsyncSession = Depends(get_db),
):
    """
    Create a new word group.
    """
    # Implementation will come later
    pass

@router.get("/{group_id}", response_model=GroupWithWords)
async def get_group(
    group_id: int,
    db: AsyncSession = Depends(get_db),
):
    """
    Get a specific group with its words.
    """
    # Implementation will come later
    pass

@router.put("/{group_id}", response_model=Group)
async def update_group(
    group_id: int,
    group: GroupCreate,
    db: AsyncSession = Depends(get_db),
):
    """
    Update a group's information.
    """
    # Implementation will come later
    pass

@router.delete("/{group_id}")
async def delete_group(
    group_id: int,
    db: AsyncSession = Depends(get_db),
):
    """
    Delete a group.
    """
    # Implementation will come later
    pass 