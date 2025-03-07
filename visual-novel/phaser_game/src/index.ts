import Phaser from 'phaser';

// Declaration for HMR
declare global {
  interface ImportMeta {
    hot?: {
      accept(callback?: () => void): void;
      dispose(callback: () => void): void;
    };
  }
}

// Import scenes
import TitleScene from './scenes/TitleScene';
import TestScene from './scenes/TestScene';

// Game configuration
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1200,
  height: 800,
  parent: 'game-container',
  backgroundColor: '#333333',
  scene: [TitleScene, TestScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false
    }
  }
};

// Create game instance
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const game = new Phaser.Game(config);

// Enable full page reload on changes instead of HMR
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    console.log('Change detected - reloading entire page for clean state');
    window.location.reload();
  });
} 