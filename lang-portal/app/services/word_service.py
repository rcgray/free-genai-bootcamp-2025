from typing import Dict, List, Optional, Tuple
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.word import word
from app.models.word import Word
from app.schemas.word import WordCreate, WordUpdate
from app.core.exceptions import AppHTTPException


class WordService:
    @staticmethod
    async def create_word(
        db: AsyncSession,
        *,
        kanji: str,
        romaji: str,
        english: str,
        parts: Dict
    ) -> Word:
        """
        Create a new word with validation.
        """
        # Check for duplicate kanji
        query = select(Word).filter(Word.kanji == kanji)
        result = await db.execute(query)
        if result.scalar_one_or_none():
            raise AppHTTPException(
                status_code=400,
                detail=f"Word with kanji '{kanji}' already exists"
            )

        word_in = WordCreate(
            kanji=kanji,
            romaji=romaji,
            english=english,
            parts=parts
        )
        return await word.create(db, obj_in=word_in)

    @staticmethod
    async def get_words_with_stats(
        db: AsyncSession,
        *,
        skip: int = 0,
        limit: int = 100,
        order_by: Optional[str] = None,
        order: Optional[str] = "asc"
    ) -> Tuple[List[Word], int]:
        """
        Get words with their review statistics.
        """
        return await word.get_multi_with_stats(
            db,
            skip=skip,
            limit=limit,
            order_by=order_by,
            order=order
        )


word_service = WordService() 