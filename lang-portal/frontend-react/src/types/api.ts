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

// Activity model
export interface Activity {
    id: number;
    name: string;
    url: string;
    image_url: string;
    description: string;
    created_at: string;
}

// Session model
export interface Session {
    id: number;
    group_id: number;
    activity_id: number;
    created_at: string;
}

// Review model
export interface WordReviewItem {
    id: number;
    word_id: number;
    session_id: number;
    correct: boolean;
    created_at: string;
}

// Word Review model
export interface WordReview {
    word_id: number;
    correct: boolean;
}
