/**
 * HMR Test File
 * This file exists purely to test if HMR (Hot Module Replacement) is working.
 * Edit the VERSION number and save the file - you should see a console log and HMR reload.
 */

// Edit this value to test HMR
export const VERSION = 1;
export const TIMESTAMP = new Date().toISOString();

// Log the test values to verify they change
console.log(`[HMR Test] Version: ${VERSION}`);
console.log(`[HMR Test] Time: ${TIMESTAMP}`);

// Enable HMR for this module
if (import.meta.hot) {
  // Log when HMR is connected
  console.log('[HMR] Connected and waiting for updates...');
  
  // Handle updates
  import.meta.hot.accept();
} 