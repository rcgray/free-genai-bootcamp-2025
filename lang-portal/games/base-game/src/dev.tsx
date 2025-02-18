import React from 'react';
import ReactDOM from 'react-dom/client';
import { createApiClient } from '@lang-portal/shared/api-client';
import { Activity } from '@lang-portal/shared/types';
import BaseGame from './index';
import './dev.css';

// Create a mock API client for development
const apiClient = createApiClient('http://localhost:8000/api');

// Get the game name from Vite's define
declare const __GAME_NAME__: string;
const GAME_URL = __GAME_NAME__;

// Format URL as a title (e.g., "base-game" -> "Base Game")
const formatTitle = (url: string) => {
  return url
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Create a development wrapper
const DevWrapper = () => {
  const [sessionId, setSessionId] = React.useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [addSuccess, setAddSuccess] = React.useState(false);
  const [formData, setFormData] = React.useState({
    url: GAME_URL,
    name: formatTitle(GAME_URL),
    description: '',
  });

  const findGameId = async () => {
    try {
      // Query activities to find our game
      const response = await fetch(`http://localhost:8000/api/activities?url=${GAME_URL}`);
      const data = await response.json();
      
      // Check if we got a valid response with items
      if (!data.data?.items) {
        throw new Error('Invalid response from activities endpoint');
      }
      
      // Filter for exact URL match (in case the endpoint returns partial matches)
      const activity = data.data.items.find((item: Activity) => item.url === GAME_URL);
      if (!activity) {
        throw new Error(`Game "${GAME_URL}" not found in the database. Did you add it to activities.json and run seed_db.py?`);
      }
      
      return activity.id;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error occurred';
      throw new Error(`Failed to find game ID: ${message}`);
    }
  };

  const handleStartSession = async () => {
    setIsLoading(true);
    setError(null);
    setShowAddForm(false);
    setAddSuccess(false);
    try {
      // First find our game's ID
      const gameId = await findGameId();
      console.log(`Found game ID for "${GAME_URL}":`, gameId);
      
      // Create a session with group 1 (for testing) and our game ID
      const session = await apiClient.sessions.create(1, gameId);
      setSessionId(String(session.id));
      console.log('Created session:', session);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error occurred';
      const isConnectionError = message.includes('Failed to fetch') || message.includes('NetworkError');
      setError(isConnectionError ? 
        `${message}\n\nNote: Make sure Backend is running at http://localhost:8000` : 
        message
      );
      console.error('Session creation error:', error);
      // Show the add form if the game wasn't found
      if (message.includes('not found in the database')) {
        setShowAddForm(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/api/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          image_url: '[no longer used]',
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create activity');
      }

      setAddSuccess(true);
      setShowAddForm(false);
      console.log('Successfully added activity:', formData);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(`Failed to add activity: ${message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGameComplete = () => {
    console.log('Game completed! Session ID:', sessionId);
    // In a real environment, this would typically:
    // 1. Submit final game state/score
    // 2. Mark the session as complete
    // 3. Navigate back to the activities page
    setSessionId(undefined);
  };

  return (
    <div className="dev-wrapper">
      <div className="dev-container">
        <h1 className="dev-header">{GAME_URL} - Development Mode</h1>
        
        {/* Development Controls */}
        <div className="dev-controls">
          <div className="flex items-center gap-4">
            <button
              onClick={handleStartSession}
              disabled={isLoading || !!sessionId}
              className="dev-button-primary"
            >
              {isLoading ? 'Creating Session...' : 'Start New Session'}
            </button>
            {sessionId && (
              <span className="dev-session-id">
                Active Session: {sessionId}
              </span>
            )}
          </div>
          
          {error && !showAddForm && !addSuccess && (
            <div className="dev-error">
              {error.split('\n').map((line, i) => (
                <p key={i} style={{ marginTop: i > 0 ? '0.5rem' : 0 }}>{line}</p>
              ))}
            </div>
          )}

          {addSuccess && (
            <div className="dev-success">
              Successfully added activity! Try starting a new session now.
            </div>
          )}
          
          {showAddForm && (
            <form onSubmit={handleAddActivity} className="dev-form">
              <h2 className="dev-form-header">Add Game to Database</h2>
              <div className="dev-form-group">
                <label className="dev-label">
                  <span className="dev-label-text">URL (internal name)</span>
                  <input
                    type="text"
                    value={formData.url}
                    disabled
                    className="dev-input dev-input-disabled"
                  />
                </label>
                <label className="dev-label">
                  <span className="dev-label-text">Title (display name)</span>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="dev-input"
                  />
                </label>
                <label className="dev-label">
                  <span className="dev-label-text">Description</span>
                  <textarea
                    value={formData.description}
                    onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="A brief description..."
                    rows={3}
                    className="dev-textarea"
                  />
                </label>
              </div>
              <div className="dev-form-actions">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="dev-button-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="dev-button-primary"
                >
                  {isLoading ? 'Adding...' : 'Add Game'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Game Container */}
        <div className="dev-game-container">
          <BaseGame
            apiClient={apiClient}
            sessionId={sessionId}
            onGameComplete={handleGameComplete}
            title={formatTitle(GAME_URL)}
          />
        </div>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DevWrapper />
  </React.StrictMode>
); 