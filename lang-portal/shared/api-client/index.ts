import { ApiClient, Session, WordReview, ApiResponse } from '../types';

class ApiClientImpl implements ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:8000/api') {
    this.baseUrl = baseUrl;
  }

  sessions = {
    create: async (groupId: number, activityId: number): Promise<Session> => {
      const response = await fetch(`${this.baseUrl}/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          group_id: groupId,
          activity_id: activityId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create session');
      }

      const data: ApiResponse<Session> = await response.json();
      return data.data;
    },

    review: async (sessionId: number, data: WordReview): Promise<void> => {
      const response = await fetch(`${this.baseUrl}/sessions/${sessionId}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          word_id: data.word_id,
          correct: data.correct,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }
    },
  };
}

export const createApiClient = (baseUrl?: string): ApiClient => {
  return new ApiClientImpl(baseUrl);
}; 