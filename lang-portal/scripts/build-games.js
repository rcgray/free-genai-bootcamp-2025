const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const chokidar = require('chokidar');

// Configuration
const gamesDir = path.join(__dirname, '..', 'games');
const publicGamesDir = path.join(__dirname, '..', 'frontend-react', 'public', 'games');

// Parse command line arguments
const args = process.argv.slice(2);
const watchMode = args.includes('--watch');

/**
 * Ensures required directories exist
 */
function ensureDirectories() {
  if (!fs.existsSync(publicGamesDir)) {
    fs.mkdirSync(publicGamesDir, { recursive: true });
  }
}

/**
 * Recursively copy a directory
 * @param {string} src - Source directory
 * @param {string} dest - Destination directory
 */
function copyDir(src, dest) {
  // Create destination directory
  fs.mkdirSync(dest, { recursive: true });
  
  // Read directory contents
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * Builds a specific game
 * @param {string} game - Name of the game to build
 * @returns {boolean} - Whether the build was successful
 */
function buildGame(game) {
  const gamePath = path.join(gamesDir, game);
  if (!fs.statSync(gamePath).isDirectory()) {
    return true; // Not a directory, skip
  }

  console.log(`\nBuilding ${game}...`);
  try {
    // Build the game using yarn workspace
    execSync(`yarn workspace @lang-portal/${game} build`, {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..')  // Run from project root
    });
    console.log(`Successfully built ${game}`);
    return true;
  } catch (error) {
    console.error(`Failed to build ${game}:`, error.message);
    return false;
  }
}

/**
 * Copies built files and static assets for a game
 * @param {string} game - Name of the game to process
 * @returns {boolean} - Whether the copy was successful
 */
function copyGameFiles(game) {
  const gamePath = path.join(gamesDir, game);
  if (!fs.statSync(gamePath).isDirectory()) {
    return true; // Not a directory, skip
  }

  console.log(`\nProcessing ${game}...`);
  
  try {
    const srcDir = path.join(gamePath, 'dist');
    const destDir = path.join(publicGamesDir, game);
    const staticAssetsDir = path.join(gamePath, 'assets');
    const destAssetsDir = path.join(destDir, 'assets');
    
    // Remove existing directory if it exists
    if (fs.existsSync(destDir)) {
      fs.rmSync(destDir, { recursive: true, force: true });
    }

    // First copy the build output
    if (fs.existsSync(srcDir)) {
      copyDir(srcDir, destDir);
      console.log(`Copied ${game} build to public directory`);
    } else {
      console.error(`Build directory not found for ${game}`);
      return false;
    }

    // Then copy static assets if they exist
    if (fs.existsSync(staticAssetsDir)) {
      // Create assets directory if it doesn't exist
      if (!fs.existsSync(destAssetsDir)) {
        fs.mkdirSync(destAssetsDir, { recursive: true });
      }
      
      // Copy each asset file
      const assets = fs.readdirSync(staticAssetsDir);
      for (const asset of assets) {
        const srcAsset = path.join(staticAssetsDir, asset);
        const destAsset = path.join(destAssetsDir, asset);
        if (fs.statSync(srcAsset).isFile()) {
          fs.copyFileSync(srcAsset, destAsset);
        }
      }
      console.log(`Copied ${game} static assets to public directory`);
    }

    return true;
  } catch (error) {
    console.error(`Error copying files for ${game}:`, error.message);
    return false;
  }
}

/**
 * Processes all games (build and copy)
 * @returns {boolean} - Whether all operations were successful
 */
function processAllGames() {
  let success = true;
  const games = fs.readdirSync(gamesDir);

  // First build all games
  console.log('Building all games...');
  for (const game of games) {
    if (!buildGame(game)) {
      success = false;
    }
  }

  // Then copy all built files
  console.log('\nCopying built files...');
  for (const game of games) {
    if (!copyGameFiles(game)) {
      success = false;
    }
  }

  return success;
}

/**
 * Sets up watch mode for games development
 */
function watchGames() {
  console.log('\nStarting watch mode...');
  
  // Watch all game directories
  const watcher = chokidar.watch(gamesDir, {
    ignored: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.git/**'
    ],
    persistent: true
  });

  watcher.on('change', (filepath) => {
    // Get the game name from the path
    const gamePath = path.relative(gamesDir, filepath);
    const game = gamePath.split(path.sep)[0];
    
    console.log(`\nChange detected in ${game}`);
    if (buildGame(game)) {
      copyGameFiles(game);
    }
  });

  console.log('\nWatching for changes in games directory...');
}

// Main execution
function main() {
  ensureDirectories();
  
  if (!processAllGames()) {
    process.exit(1);
  }

  if (watchMode) {
    watchGames();
  }
}

main(); 