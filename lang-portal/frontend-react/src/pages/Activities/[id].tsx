import React, { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import api from '../../api/axios';
import { Activity, ApiResponse, PaginatedResponse } from '../../types/api';

export default function ActivityDetailsPage() {
  const { id: gameName } = useParams();
  const [sessionId, setSessionId] = useState<number | null>(null);

  // Fetch activity details
  const { data: activityResponse, isLoading, error } = useQuery<ApiResponse<PaginatedResponse<Activity>>>({
    queryKey: ['activity', gameName],
    queryFn: async () => {
      const response = await api.get<ApiResponse<PaginatedResponse<Activity>>>('/api/activities', {
        params: {
          url: gameName,
          per_page: 1
        }
      });
      return response.data;
    },
  });

  // Get the activity from the paginated response
  const activity = activityResponse?.data?.items?.[0];

  // Create session mutation
  const createSession = useMutation({
    mutationFn: async ({ groupId, activityId }: { groupId: number; activityId: number }) => {
      const response = await api.post('/api/sessions', {
        group_id: groupId,
        activity_id: activityId,
      });
      return response.data.data;
    },
  });

  // Handle game completion
  const handleGameComplete = useCallback(() => {
    // Clean up session if needed
    setSessionId(null);
  }, []);

  // Handle messages from the game iframe
  const handleMessage = useCallback((event: MessageEvent) => {
    if (event.data.type === 'gameComplete') {
      handleGameComplete();
    }
  }, [handleGameComplete]);

  // Add message listener
  React.useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [handleMessage]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !activity) {
    return (
      <div className="text-red-500 text-center p-4">
        Error loading activity. Please try again later.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
          Activities - {activity.name}
        </h1>
      </div>
      <div className="h-[calc(100vh-theme(spacing.48))] w-full overflow-hidden">
        <iframe
          src={`/games/${gameName}/index.html${sessionId ? `?sessionId=${sessionId}` : ''}`}
          className="w-full h-full border-0"
          title={activity.name}
          allow="fullscreen"
        />
      </div>
    </div>
  );
} 