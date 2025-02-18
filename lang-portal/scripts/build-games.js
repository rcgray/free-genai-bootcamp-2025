const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const gamesDir = path.join(__dirname, '..', 'games');
const publicGamesDir = path.join(__dirname, '..', 'frontend-react', 'public', 'games');

// Ensure the public games directory exists
if (!fs.existsSync(publicGamesDir)) {
  fs.mkdirSync(publicGamesDir, { recursive: true });
}

// Build and copy each game
fs.readdirSync(gamesDir).forEach(game => {
  const gamePath = path.join(gamesDir, game);
  if (fs.statSync(gamePath).isDirectory()) {
    console.log(`Building ${game}...`);
    
    // Build the game
    execSync('yarn build', { 
      cwd: gamePath,
      stdio: 'inherit'
    });

    // Copy the built file to public directory
    const builtFile = path.join(gamePath, 'dist', `${game}.js`);
    const targetFile = path.join(publicGamesDir, `${game}.js`);
    
    if (fs.existsSync(builtFile)) {
      fs.copyFileSync(builtFile, targetFile);
      console.log(`Copied ${game} to public directory`);
    } else {
      console.error(`Built file not found for ${game}`);
    }
  }
}); 