# Backend Server Technical Specs

## Project Goal

A language learning school wants to build a learning portal website which will act as three things:
1. Inventory of possible vocabulary that can be learned
2. Act as a Learning record store (LRS), providing correct and wrong score on practice vocabulary
3. A unified launchpad to launch different learning apps

## Project General Specifications

- Single-Page Application (SPA) web application
- FastAPI (Python 3.12) for the backend
- React.js (TypeScript) for the frontend
- Use SQLite3 (SQL) as the database
- The API will always return JSON (API spec below)
- No authentication/authorization, assume there is only a single user
- Developed with the aid of AI-coding assistants, particularly Cursor

## Backend API Specification

### General Guidelines
- All routes are prefixed with `/api`, e.g. `/api/words`
- All routes return JSON, including errors
- Standard response format:
```json
{
    "data": {},
    "error": null
}
```

### API Routes

#### Words

##### GET /api/words
Get paginated list of words with review statistics

Query Parameters:
- `page`: Integer, Page number (default: 1)
- `per_page`: Integer, Items per page (default: 20, max: 100)
- `sort_by`: String, Sort field ('kanji', 'romaji', 'english', 'correct_count', 'wrong_count') (default: 'romaji')
- `order`: String, Sort order ('asc' or 'desc') (default: 'asc')

Response:
```json
{
    "data": {
        "items": [{
            "id": 0,
            "kanji": "新しい",
            "romaji": "atarashii",
            "english": "new",
            "parts": [
                { "kanji": "新", "romaji": ["a","ta","ra"] },
                { "kanji": "し", "romaji": ["shi"] },
                { "kanji": "い", "romaji": ["i"] }
            ],
            "correct_count": 0,
            "wrong_count": 0
        }],
        "total": 1,
        "page": 1,
        "per_page": 20,
        "total_pages": 1
    },
    "error": null
}
```

##### GET /api/words/{word_id}
Get a specific word by ID.

Response:
```json
{
    "data": {
        "id": 0,
        "kanji": "新しい",
        "romaji": "atarashii",
        "english": "new",
        "parts": [
            { "kanji": "新", "romaji": ["a","ta","ra"] },
            { "kanji": "し", "romaji": ["shi"] },
            { "kanji": "い", "romaji": ["i"] }
        ],
        "correct_count": 0,
        "wrong_count": 0
    },
    "error": null
}
```

##### POST /api/words
Create a new word

Request Body:
```json
{
    "kanji": "新しい",
    "romaji": "atarashii",
    "english": "new",
    "parts": [
        { "kanji": "新", "romaji": ["a","ta","ra"] },
        { "kanji": "し", "romaji": ["shi"] },
        { "kanji": "い", "romaji": ["i"] }
    ]
}
```

##### PUT /api/words/{word_id}
Update an existing word

Request Body:
```json
{
    "kanji": "悪い",
    "romaji": "warui",
    "english": "bad",
    "parts": [
        { "kanji": "悪", "romaji": ["wa","ru"] },
        { "kanji": "い", "romaji": ["i"] }
    ]
}
```

##### DELETE /api/words/{word_id}
Delete a word

#### Groups

##### GET /api/groups
Get paginated list of word groups

Query Parameters:
- `page`: Integer, Page number (default: 1)
- `per_page`: Integer, Items per page (default: 20, max: 100)
- `sort_by`: String, Sort field ('name', 'words_count') (default: 'name')
- `order`: String, Sort order ('asc' or 'desc') (default: 'asc')

Response:
```json
{
    "data": {
        "items": [{
            "id": 1,
            "name": "Animals",
            "words_count": 10
        }],
        "total": 1,
        "page": 1,
        "per_page": 20,
        "total_pages": 1
    },
    "error": null
}
```

##### GET /api/groups/{group_id}
Get words from a specific group

Query Parameters:
- `page`: Integer, Page number (default: 1)
- `per_page`: Integer, Items per page (default: 20, max: 100)
- `sort_by`: String, Sort field ('kanji', 'romaji', 'english') (default: 'romaji')
- `order`: String, Sort order ('asc' or 'desc') (default: 'asc')

Response:
```json
{
    "data": {
        "group": {
            "id": 1,
            "name": "Animals",
            "words_count": 2
        },
        "words": {
            "items": [{
                "id": 1,
                "kanji": "猫",
                "romaji": "neko",
                "english": "cat",
                "parts": [
                    { "kanji": "猫", "romaji": ["ne","ko"] },
                ],
                "correct_count": 5,
                "wrong_count": 1
            }, {
                "id": 2,
                "kanji": "犬",
                "romaji": "inu",
                "english": "dog",
                "parts": [
                    { "kanji": "犬", "romaji": ["in","u"] },
                ],
                "correct_count": 3,
                "wrong_count": 0
            }],
            "total": 2,
            "page": 1,
            "per_page": 20,
            "total_pages": 1
        }
    },
    "error": null
}
```

##### POST /api/groups
Create a new group

Request Body:
```json
{
    "name": "Animals",
    "word_ids": [1, 2, 3]
}
```

Response:
```json
{
    "data": {
        "id": 1,
        "name": "Animals",
        "words_count": 3
    },
    "error": null
}
```

##### PUT /api/groups/{group_id}
Update a group

Request Body:
```json
{
    "name": "Animals",
    "word_ids": [1, 2, 3, 4]
}
```

Response:
```json
{
    "data": {
        "id": 1,
        "name": "Animals",
        "words_count": 4
    },
    "error": null
}
```

##### DELETE /api/groups/{group_id}
Delete a group

#### Activities

##### GET /api/activities
Get paginated list of activities.

Query Parameters:
- `page`: Integer, Page number (default: 1)
- `per_page`: Integer, Items per page (default: 20, max: 100)
- `sort_by`: String, Sort field ('name') (default: 'name')
- `order`: String, Sort order ('asc' or 'desc') (default: 'asc')

Response:
```json
{
    "data": {
        "items": [{
            "id": 1,
            "name": "Flashcards",
            "url": "https://example.com/flashcards",
            "description": "Practice vocabulary with flashcards"
        }],
        "total": 1,
        "page": 1,
        "per_page": 20,
        "total_pages": 1
    },
    "error": null
}
```

##### GET /api/activities/{activity_id}
Get a specific activity by ID.

Response:
```json
{
    "data": {
        "id": 1,
        "name": "Flashcards",
        "url": "https://example.com/flashcards",
        "description": "Practice vocabulary with flashcards"
    },
    "error": null
}
```

##### POST /api/activities
Create a new activity.

Request Body:
```json
{
    "name": "Flashcards",
    "url": "https://example.com/flashcards",
    "description": "Practice vocabulary with flashcards"
}
```

##### PUT /api/activities/{activity_id}
Update an activity.

Request Body:
```json
{
    "name": "Flashcards",
    "url": "https://example.com/flashcards",
    "description": "Practice vocabulary with flashcards"
}
```

##### DELETE /api/activities/{activity_id}
Delete an activity.

#### Sessions

##### GET /api/sessions
Get paginated list of sessions with their reviews

Query Parameters:
- `page`: Integer, Page number (default: 1)
- `per_page`: Integer, Items per page (default: 25, max: 100)
- `sort_by`: String, Sort field ('created_at', 'group_id', 'activity_id') (default: 'created_at')
- `order`: String, Sort order ('asc' or 'desc') (default: 'asc')

Response:
```json
{
    "data": {
        "items": [{
            "id": 1,
            "group_id": 1,
            "activity_id": 1,
            "created_at": "2024-03-20T12:00:00Z",
            "reviews": [{
                "id": 1,
                "word_id": 1,
                "correct": true,
                "created_at": "2024-03-20T12:01:00Z"
            }]
        }],
        "total": 1,
        "page": 1,
        "per_page": 25,
        "total_pages": 1
    },
    "error": null
}
```

##### POST /api/sessions
Create a new session

Request Body:
```json
{
    "group_id": 1,  // Optional - if omitted or null, session includes all words
    "activity_id": 1
}
```

Response:
```json
{
    "data": {
        "id": 1,
        "group_id": 1,  // Can be null if no group was specified
        "activity_id": 1,
        "created_at": "2024-03-20T12:00:00Z"
    },
    "error": null
}
```

##### GET /api/sessions/{session_id}
Get details of a specific session

Response:
```json
{
    "data": {
        "id": 1,
        "group_id": 1,  // Can be null if no group was specified
        "activity_id": 1,
        "created_at": "2024-03-20T12:00:00Z",
        "reviews": [{
            "id": 1,
            "word_id": 1,
            "correct": true,
            "created_at": "2024-03-20T12:01:00Z"
        }]
    },
    "error": null
}
```

##### POST /api/sessions/{session_id}/review
Log a review attempt for a word. Note: This endpoint will return a 400 error if the session has no associated group.

Request Body:
```json
{
    "word_id": 1,
    "correct": true
}
```

Response:
```json
{
    "data": {
        "id": 1,
        "word_id": 1,
        "session_id": 1,
        "correct": true,
        "created_at": "2024-03-20T12:01:00Z"
    },
    "error": null
}
```

## Project Structure

See ./Project-File-Structure.md for the file structure of the project. The backend-fastapi directory contains the FastAPI project, including the API routes, models, schemas, and CRUD operations.
