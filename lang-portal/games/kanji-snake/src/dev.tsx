import React from 'react';
import ReactDOM from 'react-dom/client';
import { createApiClient } from '@lang-portal/shared/api-client';
import { Activity } from '@lang-portal/shared/types';
import BaseGame from './index';
import './dev.css';

// Intercept fetch calls for logging
type ApiLogEntry = {
  timestamp: Date;
  method: string;
  url: string;
  requestBody?: any;
  responseStatus?: number;
  responseBody?: any;
  error?: string;
};

// Store the original fetch function
const originalFetch = window.fetch;

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
  const [apiLogs, setApiLogs] = React.useState<ApiLogEntry[]>([]);
  const logsEndRef = React.useRef<HTMLDivElement>(null);
  const [formData, setFormData] = React.useState({
    url: GAME_URL,
    name: formatTitle(GAME_URL),
    description: '',
  });

  // Set up fetch interceptor
  React.useEffect(() => {
    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      const method = init?.method || 'GET';
      const url = typeof input === 'string' ? input : input.toString();
      const requestBody = init?.body ? JSON.parse(init.body as string) : undefined;
      
      const logEntry: ApiLogEntry = {
        timestamp: new Date(),
        method,
        url,
        requestBody,
      };

      try {
        const response = await originalFetch(input, init);
        const clonedResponse = response.clone();
        
        try {
          logEntry.responseStatus = response.status;
          logEntry.responseBody = await clonedResponse.json();
        } catch (e) {
          logEntry.responseBody = '[Not JSON]';
        }

        setApiLogs(logs => [...logs, logEntry]);
        return response;
      } catch (error) {
        logEntry.error = error instanceof Error ? error.message : 'Unknown error';
        setApiLogs(logs => [...logs, logEntry]);
        throw error;
      }
    };

    // Cleanup
    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  // Auto-scroll logs to bottom
  React.useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [apiLogs]);

  const findGameId = async () => {
    try {
      // Query all activities
      const response = await fetch(`http://localhost:8000/api/activities`);
      const data = await response.json();
      
      // Check if we got a valid response with items
      if (!data.data?.items) {
        throw new Error('Invalid response from activities endpoint');
      }
      
      // Find our activity by URL identifier
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
        body: JSON.stringify(formData),
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

  const handleSaveLogs = () => {
    // Convert logs to markdown
    const markdown = apiLogs.map(log => {
      const timestamp = log.timestamp.toLocaleTimeString();
      const parts = [
        `### ${log.method} ${log.url}`,
        `**Time:** ${timestamp}`,
        '',
      ];

      if (log.requestBody) {
        parts.push('**Request Body:**');
        parts.push('```json');
        parts.push(JSON.stringify(log.requestBody, null, 2));
        parts.push('```');
        parts.push('');
      }

      if (log.responseStatus) {
        parts.push(`**Status:** ${log.responseStatus}`);
        parts.push('');
      }

      if (log.responseBody) {
        parts.push('**Response Body:**');
        parts.push('```json');
        parts.push(JSON.stringify(log.responseBody, null, 2));
        parts.push('```');
        parts.push('');
      }

      if (log.error) {
        parts.push('**Error:**');
        parts.push('```');
        parts.push(log.error);
        parts.push('```');
        parts.push('');
      }

      parts.push('---');
      parts.push('');
      return parts.join('\n');
    }).join('\n');

    // Create and download the file
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `api-logs-${GAME_URL}-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
                    onKeyDown={e => e.stopPropagation()}
                    className="dev-input"
                  />
                </label>
                <label className="dev-label">
                  <span className="dev-label-text">Description</span>
                  <textarea
                    value={formData.description}
                    onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    onKeyDown={e => e.stopPropagation()}
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

        {/* API Logs */}
        <div className="dev-api-logs">
          <h2 className="dev-section-header">
            API Logs
            <button onClick={handleSaveLogs} className="dev-save-logs">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
                <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
              </svg>
              Save Logs
            </button>
          </h2>
          <div className="dev-logs-container">
            {apiLogs.map((log, index) => (
              <div key={index} className="dev-log-entry">
                <div className="dev-log-timestamp">
                  {log.timestamp.toLocaleTimeString()}
                </div>
                <div className="dev-log-method">
                  {log.method} {log.url}
                </div>
                {log.requestBody && (
                  <pre className="dev-log-request">
                    Request: {JSON.stringify(log.requestBody, null, 2)}
                  </pre>
                )}
                {log.responseStatus && (
                  <div className="dev-log-status">
                    Status: {log.responseStatus}
                  </div>
                )}
                {log.responseBody && (
                  <pre className="dev-log-response">
                    Response: {JSON.stringify(log.responseBody, null, 2)}
                  </pre>
                )}
                {log.error && (
                  <div className="dev-log-error">
                    Error: {log.error}
                  </div>
                )}
              </div>
            ))}
            <div ref={logsEndRef} />
          </div>
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
