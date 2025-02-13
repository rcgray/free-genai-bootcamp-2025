from typing import Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.schemas.word import Word
from app.schemas.base import PaginatedResponse

router = APIRouter()

@router.get("", response_model=PaginatedResponse[Word])
async def get_words(
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    sort_by: str = Query("romaji", regex="^(kanji|romaji|english|correct_count|wrong_count)$"),
    order: str = Query("asc", regex="^(asc|desc)$"),
    db: AsyncSession = Depends(get_db),
):
    """
    Get paginated list of words with review statistics.
    """
    # Implementation will come later
    return {
        "items": [],
        "total": 0,
        "page": page,
        "per_page": per_page,
        "total_pages": 0
    } 