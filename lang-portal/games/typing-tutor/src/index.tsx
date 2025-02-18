import React, { useEffect, useState } from 'react';
import { GameProps } from '@lang-portal/shared/types';

export function TypingTutor({ apiClient, sessionId, onGameComplete }: GameProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Initialize game
    setIsReady(true);
  }, []);

  return (
    <div className="typing-tutor">
      <h1>Typing Tutor</h1>
      <p>{isReady ? "Game is ready!" : "Initializing..."}</p>
      {sessionId && <p>Session ID: {sessionId}</p>}
    </div>
  );
}

export default TypingTutor; 