/**
 * loader.js
 * Loads all scene-related scripts and initializes the scene registry.
 * This script should be included before the main game.js file.
 */

// Make the scene classes and managers available globally
window.BaseScene = BaseScene;
window.sceneRegistry = sceneRegistry;
window.assetManager = assetManager;

// Initialize the scene registry with default scenes
function initScenes() {
    console.log('Initializing scene registry...');
    
    // Register scenes here when they are created
    if (window.TestScene) {
        sceneRegistry.register('TestScene', TestScene);
    }
    
    console.log('Scene registry initialized');
}

// Initialize the asset manager with default assets
function initAssets() {
    console.log('Initializing asset manager...');
    
    // Register default assets here
    // Example: assetManager.registerBackground('title', 'title.jpg');
    
    console.log('Asset manager initialized');
}

// Initialize everything when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing scene management system...');
    
    // Initialize scenes and assets
    initScenes();
    initAssets();
    
    console.log('Scene management system initialized');
}); 