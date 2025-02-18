import React, { Suspense, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import api from '../../api/axios';
import { Activity, ApiResponse } from '../../types/api';
import { createApiClient } from '@lang-portal/shared/api-client';

export default function ActivityDetailsPage() {
  const { id: gameName } = useParams();
  const [sessionId, setSessionId] = React.useState<number | null>(null);

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

  // Create API client instance for the game
  const apiClient = React.useMemo(() => createApiClient(), []);

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

  const activity = activityData.data;
  
  // Construct game module path from the URL (game name)
  const gameModulePath = `/games/${activity.url}.js`;

  // Dynamic import of the game module
  const GameComponent = React.lazy(() => import(/* @vite-ignore */ gameModulePath));

  return (
    <div className="h-full w-full">
      <Suspense fallback={
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      }>
        <GameComponent
          apiClient={apiClient}
          sessionId={sessionId}
          onGameComplete={handleGameComplete}
        />
      </Suspense>
    </div>
  );
} 