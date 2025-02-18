const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const gamesDir = path.join(__dirname, '..', 'games');
const publicGamesDir = path.join(__dirname, '..', 'frontend-react', 'public', 'games');
const publicGamesImagesDir = path.join(publicGamesDir, 'images');

// Ensure the public games directories exist
if (!fs.existsSync(publicGamesDir)) {
  fs.mkdirSync(publicGamesDir, { recursive: true });
}
if (!fs.existsSync(publicGamesImagesDir)) {
  fs.mkdirSync(publicGamesImagesDir, { recursive: true });
}

// First, build all games
console.log('Building all games...');
fs.readdirSync(gamesDir).forEach(game => {
  const gamePath = path.join(gamesDir, game);
  if (fs.statSync(gamePath).isDirectory()) {
    console.log(`\nBuilding ${game}...`);
    try {
      // Build the game using yarn workspace
      execSync(`yarn workspace @lang-portal/${game} build`, {
        stdio: 'inherit',
        cwd: path.join(__dirname, '..')  // Run from project root
      });
      console.log(`Successfully built ${game}`);
    } catch (error) {
      console.error(`Failed to build ${game}:`, error.message);
      process.exit(1);
    }
  }
});

// Then copy all built files and assets
console.log('\nCopying built files and assets...');
fs.readdirSync(gamesDir).forEach(game => {
  const gamePath = path.join(gamesDir, game);
  if (fs.statSync(gamePath).isDirectory()) {
    console.log(`\nProcessing ${game}...`);
    
    // Copy the built file to public directory
    const builtFile = path.join(gamePath, 'dist', `${game}.js`);
    const targetFile = path.join(publicGamesDir, `${game}.js`);
    
    if (fs.existsSync(builtFile)) {
      fs.copyFileSync(builtFile, targetFile);
      console.log(`Copied ${game} to public directory`);
    } else {
      console.error(`Built file not found for ${game}`);
      process.exit(1);
    }

    // Copy thumbnail if it exists
    const thumbnailFile = path.join(gamePath, 'assets', 'thumbnail.jpg');
    const targetThumbnail = path.join(publicGamesImagesDir, `${game}.jpg`);
    
    if (fs.existsSync(thumbnailFile)) {
      fs.copyFileSync(thumbnailFile, targetThumbnail);
      console.log(`Copied ${game} thumbnail to public directory`);
    } else {
      console.warn(`No thumbnail found for ${game}`);
    }
  }
}); 