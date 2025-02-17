import React from 'react';
import { GameProps } from '@shared/types';

export function TypingTutor({ apiClient, sessionId, onGameComplete }: GameProps) {
  return (
    <div className="typing-tutor">
      <h1>Typing Tutor</h1>
      <p>Game implementation coming soon...</p>
    </div>
  );
}

export default TypingTutor; 