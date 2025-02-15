// Common API response wrapper
export interface ApiResponse<T> {
    data: T;
    error: string | null;
}

// Pagination metadata
export interface PaginationMeta {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
}

// Paginated response
export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    per_page: number;
    total_pages: number;
}

// Word model
export interface Word {
    id: number;
    kanji: string;
    romaji: string;
    english: string;
    parts: string[];
    correct_count: number;
    wrong_count: number;
}

// Group model
export interface Group {
    id: number;
    name: string;
    words_count: number;
}

// Study Activity model
export interface StudyActivity {
    id: number;
    name: string;
    url: string;
}

// Study Session model
export interface StudySession {
    id: number;
    group_id: number;
    study_activity_id: number;
    created_at: string;
}

// Review model
export interface WordReview {
    id: number;
    word_id: number;
    study_session_id: number;
    correct: boolean;
    created_at: string;
}
