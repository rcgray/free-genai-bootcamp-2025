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
    review: (sessionId: number, data: WordReviewData) => Promise<void>;
  };
}

// Session interface
export interface Session {
  id: number;
  groupId: number;
  activityId: number;
  createdAt: string;
}

// Word Review Data interface
export interface WordReviewData {
  wordId: number;
  correct: boolean;
} 