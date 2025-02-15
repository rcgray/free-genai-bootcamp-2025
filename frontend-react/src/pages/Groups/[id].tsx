import React from 'react';
import { useParams } from 'react-router-dom';

export default function GroupDetailsPage() {
  const { id } = useParams();
  return (
    <div className="space-y-6">
      <h1>Group Details</h1>
      <p>Details for group {id} coming soon...</p>
    </div>
  );
} 