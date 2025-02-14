from typing import Dict, List, Optional, Tuple
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.word import word
from app.models.word import Word
from app.schemas.word import WordCreate, WordUpdate, WordPart
from app.core.exceptions import AppHTTPException


class WordService:
    @staticmethod
    async def get_word(db: AsyncSession, word_id: int) -> Optional[Word]:
        """Get a single word by ID."""
        return await word.get(db, word_id)

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
        
        Args:
            skip: Number of records to skip
            limit: Maximum number of records to return
            order_by: Field to sort by
            order: Sort order ('asc' or 'desc')
            
        Returns:
            Tuple of (list of words, total count)
        """
        return await word.get_multi_with_stats(
            db,
            skip=skip,
            limit=limit,
            order_by=order_by,
            order=order
        )

    @staticmethod
    async def create_word(
        db: AsyncSession,
        *,
        kanji: str,
        romaji: str,
        english: str,
        parts: List[Dict[str, str | List[str]]]
    ) -> Word:
        """
        Create a new word with validation.
        
        Args:
            kanji: The word in Japanese kanji
            romaji: Romanized version of the word
            english: English translation
            parts: List of word components, each with kanji and possible romaji readings
        
        Raises:
            ValueError: If a word with the same kanji already exists
        """
        # Check for duplicate kanji
        query = select(Word).filter(Word.kanji == kanji)
        result = await db.execute(query)
        if result.scalar_one_or_none():
            raise ValueError(f"Word with kanji '{kanji}' already exists")

        word_in = WordCreate(
            kanji=kanji,
            romaji=romaji,
            english=english,
            parts=parts
        )
        return await word.create(db, obj_in=word_in)

    @staticmethod
    async def update_word(
        db: AsyncSession,
        *,
        word_id: int,
        word_in: WordUpdate
    ) -> Word:
        """
        Update an existing word.
        
        Args:
            word_id: ID of the word to update
            word_in: Update data including optional kanji, romaji, english, and parts
        
        Raises:
            ValueError: If updating to a kanji that already exists
        """
        if word_in.kanji:
            # Check for duplicate kanji if it's being updated
            query = select(Word).filter(
                Word.kanji == word_in.kanji,
                Word.id != word_id
            )
            result = await db.execute(query)
            if result.scalar_one_or_none():
                raise ValueError(
                    f"Another word with kanji '{word_in.kanji}' already exists"
                )

        return await word.update(db, id=word_id, obj_in=word_in)

    @staticmethod
    async def delete_word(db: AsyncSession, *, word_id: int) -> None:
        """Delete a word by ID."""
        await word.remove(db, id=word_id) 