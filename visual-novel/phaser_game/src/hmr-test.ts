/**
 * HMR Test File
 * This file exists to test if HMR (Hot Module Replacement) is working,
 * and also serves as a test runner for the FuriganaRenderer.
 * 
 * To run the FuriganaRenderer test explicitly, use the URL parameter:
 * ?test=furigana
 */

// HMR test values
export const VERSION = 11; // Incremented to trigger HMR
export const TIMESTAMP = new Date().toISOString();

// Log the test values to verify they change
console.log(`[HMR Test] Version: ${VERSION}`);
console.log(`[HMR Test] Time: ${TIMESTAMP}`);

// Parse URL parameters to check if we should run specific tests
const urlParams = new URLSearchParams(window.location.search);
const testParam = urlParams.get('test');
const isFuriganaTest = testParam === 'furigana';

// Import the FuriganaRenderer tests
import { runFuriganaTests } from '../tests/FuriganaRenderer.test';

// Run the tests automatically when this file is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Display instructions in the DOM
  if (isFuriganaTest) {
    console.log('[Test Runner] Running FuriganaRenderer tests...');
    
    // Make sure we have a container for our test UI
    let container = document.getElementById('game-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'game-container';
      document.body.appendChild(container);
    }
    
    // Display FuriganaRenderer test UI
    container.innerHTML = `
      <div style="padding: 20px; font-family: sans-serif; background-color: #1e1e1e; color: #ffffff; height: 100vh;">
        <h1>FuriganaRenderer Test</h1>
        <p>Check the browser console (F12) to see test results.</p>
        <p>HMR Version: ${VERSION}</p>
        <p>Timestamp: ${TIMESTAMP}</p>
        <hr>
        <div id="test-results" style="background-color: #2a2a2a; padding: 15px; border-radius: 5px; font-family: monospace; white-space: pre-wrap;"></div>
      </div>
    `;
    
    // Run the tests
    runFuriganaTests();
  } else if (document.getElementById('app')) {
    // Only show HMR test UI in the app element if it exists and we're not running furigana tests
    const appElement = document.getElementById('app');
    // Display regular HMR test UI
    if (appElement) {
      appElement.innerHTML = `
        <div style="padding: 20px; font-family: sans-serif;">
          <h1>HMR Test</h1>
          <p>HMR Version: ${VERSION}</p>
          <p>Timestamp: ${TIMESTAMP}</p>
          <p><a href="?test=furigana">Run FuriganaRenderer Test</a></p>
        </div>
      `;
    }
  }
});

// Enable HMR for this module
if (import.meta.hot) {
  // Log when HMR is connected
  console.log('[HMR] Connected and waiting for updates...');
  
  // Handle updates
  import.meta.hot.accept(() => {
    console.log('[HMR] Module updated');
    
    // Re-run the furigana tests if that's what we're testing
    if (isFuriganaTest) {
      console.log('[HMR] Re-running furigana tests...');
      runFuriganaTests();
    }
  });
} 