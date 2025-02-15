import React from 'react';
import { useParams } from 'react-router-dom';

export default function StudyPage() {
  const { activityId, groupId } = useParams();
  return (
    <div className="space-y-6">
      <h1>Study Session</h1>
      <p>Study session for activity {activityId} and group {groupId} coming soon...</p>
    </div>
  );
} 