import React from 'react';
import { GameProps } from '@lang-portal/shared/types';

/**
 * Base Game Component
 * 
 * This is a template for creating new games. Your game should:
 * 1. Accept and implement the GameProps interface
 * 2. Use the apiClient for backend communication
 * 3. Handle the sessionId for tracking progress
 * 4. Call onGameComplete when the game ends
 */
export function BaseGame({ apiClient, sessionId, onGameComplete }: GameProps) {
  return (
    <div className="base-game">
      <h1>Base Game Template</h1>
      <p>Replace this component with your game implementation.</p>
      <p>Current session: {sessionId || 'No session'}</p>
      <button 
        onClick={() => onGameComplete?.()} 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        End Game
      </button>
    </div>
  );
}

export default BaseGame; 