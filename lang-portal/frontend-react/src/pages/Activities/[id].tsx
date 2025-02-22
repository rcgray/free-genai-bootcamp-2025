import React, { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import api from '../../api/axios';
import { Activity, ApiResponse } from '../../types/api';

export default function ActivityDetailsPage() {
  const { id: gameName } = useParams();
  const [sessionId, setSessionId] = useState<number | null>(null);

  // Fetch activity details
  const { data: activityData, isLoading, error } = useQuery<ApiResponse<Activity>>({
    queryKey: ['activity', gameName],
    queryFn: async () => {
      // Find activity by URL (which is just the game name)
      const response = await api.get(`/api/activities?url=${gameName}`);
      return response.data;
    },
  });

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

  if (error || !activityData?.data) {
    return (
      <div className="text-red-500 text-center p-4">
        Error loading activity. Please try again later.
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <iframe
        src={`/games/${gameName}/index.html${sessionId ? `?sessionId=${sessionId}` : ''}`}
        className="w-full h-full border-0"
        title={activityData.data.name}
        allow="fullscreen"
      />
    </div>
  );
} 