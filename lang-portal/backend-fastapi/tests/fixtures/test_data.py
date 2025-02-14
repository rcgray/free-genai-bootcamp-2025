from typing import Dict, List

# Test word data
TEST_WORD = {
    "kanji": "開ける",
    "romaji": "akeru",
    "english": "to open",
    "parts": [
        {"kanji": "開", "romaji": ["a"]},
        {"kanji": "け", "romaji": ["ke"]},
        {"kanji": "る", "romaji": ["ru"]}
    ]
}

TEST_WORD_2 = {
    "kanji": "作る",
    "romaji": "tsukuru",
    "english": "to make",
    "parts": [
        {"kanji": "作", "romaji": ["tsu", "ku"]},
        {"kanji": "る", "romaji": ["ru"]}
    ]
}

# Test group data
TEST_GROUP = {
    "name": "Actions"
}

# Test study activity data
TEST_ACTIVITY = {
    "name": "Flashcards",
    "url": "http://localhost:5173/study/flashcards"
} 