import React from 'react';
import { useParams } from 'react-router-dom';

export default function ActivityDetailsPage() {
  const { id } = useParams();
  return (
    <div className="space-y-6">
      <h1>Activity Details</h1>
      <p>Details for activity {id} coming soon...</p>
    </div>
  );
} 