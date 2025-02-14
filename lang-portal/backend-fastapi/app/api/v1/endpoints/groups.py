from typing import Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.schemas.group import Group, GroupCreate, GroupUpdate, GroupWithWords
from app.schemas.word import Word
from app.schemas.base import PaginatedResponse
from app.services.group_service import GroupService
from app.core.exceptions import AppHTTPException

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
    
    Parameters:
        page: Page number (starts from 1)
        per_page: Number of items per page (max 100)
        sort_by: Field to sort by (name, words_count)
        order: Sort order (asc or desc)
    """
    skip = (page - 1) * per_page
    groups, total = await GroupService.get_groups(
        db,
        skip=skip,
        limit=per_page,
        order_by=sort_by,
        order=order
    )
    
    total_pages = (total + per_page - 1) // per_page
    
    return {
        "items": [Group.model_validate(g) for g in groups],
        "total": total,
        "page": page,
        "per_page": per_page,
        "total_pages": total_pages
    }

@router.get("/{group_id}", response_model=GroupWithWords)
async def get_group_words(
    group_id: int,
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    sort_by: str = Query("romaji", regex="^(kanji|romaji|english)$"),
    order: str = Query("asc", regex="^(asc|desc)$"),
    db: AsyncSession = Depends(get_db),
):
    """
    Get words from a specific group.
    
    Parameters:
        group_id: ID of the group
        page: Page number (starts from 1)
        per_page: Number of items per page (max 100)
        sort_by: Field to sort by (kanji, romaji, english)
        order: Sort order (asc or desc)
    """
    group = await GroupService.get_group(db, group_id)
    if not group:
        raise AppHTTPException(status_code=404, detail=f"Group {group_id} not found")
    
    skip = (page - 1) * per_page
    words, total = await GroupService.get_group_words(
        db,
        group_id=group_id,
        skip=skip,
        limit=per_page,
        order_by=sort_by,
        order=order
    )
    
    group_dict = Group.model_validate(group).model_dump()
    group_dict["words"] = [Word.model_validate(w) for w in words]
    return GroupWithWords(**group_dict)

@router.post("", response_model=Group)
async def create_group(
    *,
    group_in: GroupCreate,
    db: AsyncSession = Depends(get_db),
):
    """
    Create a new group.
    
    Parameters:
        group_in: Group data including name and optional word_ids
    
    Returns:
        The created group
    
    Raises:
        AppHTTPException: If a group with the same name already exists
    """
    try:
        group = await GroupService.create_group(
            db,
            name=group_in.name,
            word_ids=group_in.word_ids
        )
        return Group.model_validate(group)
    except ValueError as e:
        raise AppHTTPException(status_code=400, detail=str(e))

@router.put("/{group_id}", response_model=Group)
async def update_group(
    *,
    group_id: int,
    group_in: GroupUpdate,
    db: AsyncSession = Depends(get_db),
):
    """
    Update a group.
    
    Parameters:
        group_id: ID of the group to update
        group_in: Updated group data
    
    Returns:
        The updated group
    
    Raises:
        AppHTTPException: If the group doesn't exist or if there's a conflict
    """
    current_group = await GroupService.get_group(db, group_id)
    if not current_group:
        raise AppHTTPException(status_code=404, detail=f"Group {group_id} not found")
    
    try:
        group = await GroupService.update_group(
            db,
            group_id=group_id,
            group_in=group_in
        )
        return Group.model_validate(group)
    except ValueError as e:
        raise AppHTTPException(status_code=400, detail=str(e))

@router.delete("/{group_id}", response_model=dict)
async def delete_group(
    *,
    group_id: int,
    db: AsyncSession = Depends(get_db),
):
    """
    Delete a group.
    
    Parameters:
        group_id: ID of the group to delete
    
    Raises:
        AppHTTPException: If the group doesn't exist
    """
    current_group = await GroupService.get_group(db, group_id)
    if not current_group:
        raise AppHTTPException(status_code=404, detail=f"Group {group_id} not found")
    
    await GroupService.delete_group(db, group_id=group_id)
    return {"status": "success"} 