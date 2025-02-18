// Common API response wrapper
export interface ApiResponse<T> {
    data: T;
    error: string | null;
}

// Paginated response wrapper
export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    per_page: number;
    total_pages: number;
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

// Word Review model
export interface WordReview {
    word_id: number;
    correct: boolean;
}

// Game component props interface
export interface GameProps {
    apiClient: ApiClient;
    sessionId?: string;
    onGameComplete?: () => void;
}

// API Client interface
export interface ApiClient {
    sessions: {
        create: (groupId: number, activityId: number) => Promise<Session>;
        review: (sessionId: number, data: WordReview) => Promise<void>;
    };
} 