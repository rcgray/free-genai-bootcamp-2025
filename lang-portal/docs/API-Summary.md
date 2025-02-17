# API Endpoints Summary

All routes are prefixed with `/api` and return JSON responses in the format:
```json
{
    "data": {},
    "error": null
}
```

## Words

### GET /api/words
Get paginated list of words with review statistics.
- **Query Parameters**:
  - `page`: Integer, Page number (default: 1)
  - `per_page`: Integer, Items per page (default: 20, max: 100)
  - `sort_by`: String, Sort field ('kanji', 'romaji', 'english', 'correct_count', 'wrong_count') (default: 'romaji')
  - `order`: String, Sort order ('asc' or 'desc') (default: 'asc')

### GET /api/words/{word_id}
Get a specific word by ID.

### POST /api/words
Create a new word.
- **Request Body**: WordCreate schema with kanji, romaji, english, and parts

### PUT /api/words/{word_id}
Update an existing word.
- **Request Body**: WordUpdate schema

### DELETE /api/words/{word_id}
Delete a word.

## Groups

### GET /api/groups
Get paginated list of word groups.
- **Query Parameters**:
  - `page`: Integer, Page number (default: 1)
  - `per_page`: Integer, Items per page (default: 20, max: 100)
  - `sort_by`: String, Sort field ('name', 'words_count') (default: 'name')
  - `order`: String, Sort order ('asc' or 'desc') (default: 'asc')

### GET /api/groups/{group_id}
Get words from a specific group.
- **Query Parameters**:
  - `page`: Integer, Page number (default: 1)
  - `per_page`: Integer, Items per page (default: 20, max: 100)
  - `sort_by`: String, Sort field ('kanji', 'romaji', 'english') (default: 'romaji')
  - `order`: String, Sort order ('asc' or 'desc') (default: 'asc')

### POST /api/groups
Create a new group.
- **Request Body**: GroupCreate schema with name and word_ids

### PUT /api/groups/{group_id}
Update a group.
- **Request Body**: GroupUpdate schema

### DELETE /api/groups/{group_id}
Delete a group.

## Activities

### GET /api/activities
Get paginated list of activities.
- **Query Parameters**:
  - `page`: Integer, Page number (default: 1)
  - `per_page`: Integer, Items per page (default: 20, max: 100)
  - `sort_by`: String, Sort field ('name') (default: 'name')
  - `order`: String, Sort order ('asc' or 'desc') (default: 'asc')

### GET /api/activities/{activity_id}
Get a specific activity by ID.

### POST /api/activities
Create a new activity.
- **Request Body**: ActivityCreate schema with name, url, image_url, and description

### PUT /api/activities/{activity_id}
Update an activity.
- **Request Body**: ActivityUpdate schema

### DELETE /api/activities/{activity_id}
Delete an activity.

## Sessions

### GET /api/sessions
Get paginated list of sessions with their reviews.
- **Query Parameters**:
  - `page`: Integer, Page number (default: 1)
  - `per_page`: Integer, Items per page (default: 25, max: 100)
  - `sort_by`: String, Sort field ('created_at', 'group_id', 'activity_id') (default: 'created_at')
  - `order`: String, Sort order ('asc' or 'desc') (default: 'asc')

### GET /api/sessions/{session_id}
Get details of a specific session.

### POST /api/sessions
Create a new session.
- **Request Body**: SessionCreate schema with group_id and activity_id

### POST /api/sessions/{session_id}/review
Log a review attempt for a word.
- **Request Body**: WordReviewCreate schema with word_id and correct status
