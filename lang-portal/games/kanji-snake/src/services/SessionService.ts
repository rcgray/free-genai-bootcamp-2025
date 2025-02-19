import axios from 'axios';
import { wordService } from './WordService';

// Get the game name from Vite's define
declare const __GAME_NAME__: string;
const GAME_URL = __GAME_NAME__;

interface Session {
  id: number;
  group_id: number | null;
  activity_id: number;
  created_at: string;
}

interface SessionResponse {
  data: Session;
  error: string | null;
}

interface Activity {
  id: number;
  name: string;
  url: string;
  description: string;
}

interface ActivitiesResponse {
  data: {
    items: Activity[];
    total: number;
    page: number;
    per_page: number;
    total_pages: number;
  };
  error: string | null;
}

export class SessionService {
  private currentSession: Session | null = null;
  private readonly API_BASE = 'http://localhost:8000/api';
  private activityId: number | null = null;

  private async getActivityId(): Promise<number> {
    if (this.activityId !== null) {
      return this.activityId;
    }

    try {
      const response = await axios.get<ActivitiesResponse>(`${this.API_BASE}/activities`);
      const activity = response.data.data.items.find(a => a.url === GAME_URL);
      if (!activity) {
        throw new Error(`Game "${GAME_URL}" not found in the database`);
      }
      this.activityId = activity.id;
      return activity.id;
    } catch (error) {
      console.error('Error getting activity ID:', error);
      throw error;
    }
  }

  async startSession(): Promise<boolean> {
    console.log('Starting new session...');
    const groupId = wordService.getCurrentGroupId();
    if (groupId === undefined) {
      console.error('No group selected');
      return false;
    }

    try {
      const activityId = await this.getActivityId();
      const sessionData = {
        activity_id: activityId,
        group_id: groupId === -1 ? null : groupId
      };

      console.log('Creating session with:', sessionData);
      const response = await axios.post<SessionResponse>(`${this.API_BASE}/sessions`, sessionData);

      console.log('Session created:', response.data);
      this.currentSession = response.data.data;
      return true;
    } catch (error) {
      console.error('Error creating session:', error);
      if (axios.isAxiosError(error)) {
        console.error('Response:', error.response?.data);
        console.error('Status:', error.response?.status);
      }
      return false;
    }
  }

  async submitWordReview(wordId: number, correct: boolean): Promise<boolean> {
    console.log('Submitting word review:', { wordId, correct });
    if (!this.currentSession) {
      console.error('No active session');
      return false;
    }

    try {
      console.log('Sending review to API...');
      await axios.post(`${this.API_BASE}/sessions/${this.currentSession.id}/review`, {
        word_id: wordId,
        correct: correct
      });
      console.log('Review submitted successfully');
      return true;
    } catch (error) {
      console.error('Error submitting word review:', error);
      if (axios.isAxiosError(error)) {
        console.error('Response:', error.response?.data);
        console.error('Status:', error.response?.status);
      }
      return false;
    }
  }

  getCurrentSession(): Session | null {
    return this.currentSession;
  }

  endSession(): void {
    console.log('Ending session');
    this.currentSession = null;
  }
}

export const sessionService = new SessionService(); 