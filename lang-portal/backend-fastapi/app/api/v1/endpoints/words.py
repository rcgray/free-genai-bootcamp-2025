from typing import Optional
from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.schemas.word import Word, WordCreate, WordUpdate
from app.schemas.base import PaginatedResponse
from app.services.word_service import WordService

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
    
    Parameters:
        page: Page number (starts from 1)
        per_page: Number of items per page (max 100)
        sort_by: Field to sort by (kanji, romaji, english, correct_count, wrong_count)
        order: Sort order (asc or desc)
    """
    skip = (page - 1) * per_page
    words, total = await WordService.get_words_with_stats(
        db,
        skip=skip,
        limit=per_page,
        order_by=sort_by,
        order=order
    )
    
    total_pages = (total + per_page - 1) // per_page
    
    return {
        "items": words,
        "total": total,
        "page": page,
        "per_page": per_page,
        "total_pages": total_pages
    }

@router.post("", response_model=Word)
async def create_word(
    *,
    word_in: WordCreate,
    db: AsyncSession = Depends(get_db),
):
    """
    Create a new word.
    
    Parameters:
        word_in: Word data including kanji, romaji, english, and parts
    
    Returns:
        The created word
    
    Raises:
        HTTPException: If a word with the same kanji already exists
    """
    try:
        return await WordService.create_word(
            db,
            kanji=word_in.kanji,
            romaji=word_in.romaji,
            english=word_in.english,
            parts=word_in.parts
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/{word_id}", response_model=Word)
async def update_word(
    *,
    word_id: int,
    word_in: WordUpdate,
    db: AsyncSession = Depends(get_db),
):
    """
    Update an existing word.
    
    Parameters:
        word_id: ID of the word to update
        word_in: Updated word data
    
    Returns:
        The updated word
    
    Raises:
        HTTPException: If the word doesn't exist or if there's a conflict
    """
    current_word = await WordService.get_word(db, word_id)
    if not current_word:
        raise HTTPException(status_code=404, detail=f"Word {word_id} not found")
    
    try:
        return await WordService.update_word(
            db,
            word_id=word_id,
            word_in=word_in
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/{word_id}")
async def delete_word(
    *,
    word_id: int,
    db: AsyncSession = Depends(get_db),
):
    """
    Delete a word.
    
    Parameters:
        word_id: ID of the word to delete
    
    Raises:
        HTTPException: If the word doesn't exist
    """
    current_word = await WordService.get_word(db, word_id)
    if not current_word:
        raise HTTPException(status_code=404, detail=f"Word {word_id} not found")
    
    await WordService.delete_word(db, word_id=word_id)
    return {"status": "success"} 