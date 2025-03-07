import Phaser from 'phaser';

// Declaration for HMR
declare global {
  interface ImportMeta {
    hot?: {
      accept(callback?: () => void): void;
    };
  }
}

// Import scenes as they are created
// import TitleScene from './scenes/TitleScene';
// import TestScene from './scenes/TestScene';

// Temporary test scene until we implement the proper scenes
class TestScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TestScene' });
  }

  preload() {
    // Preload assets
    this.load.image('title', 'assets/images/backgrounds/title.png');
  }

  create() {
    // Add title background if loaded successfully
    if (this.textures.exists('title')) {
      const title = this.add.image(600, 400, 'title');
      // Scale the image to fit within our game size
      title.setScale(0.6);
    }
    
    // Add text
    this.add.text(600, 200, 'Japanese Visual Novel', {
      fontSize: '32px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    
    this.add.text(600, 600, 'Phaser + TypeScript + Vite Setup Working!', {
      fontSize: '20px',
      color: '#ffffff'
    }).setOrigin(0.5);
  }
}

// Game configuration
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1200,
  height: 800,
  parent: 'game-container',
  backgroundColor: '#333333',
  scene: [TestScene],
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
const game = new Phaser.Game(config);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export { game };

// Enable hot module replacement for development
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    console.log('HMR update detected - reloading game components');
  });
} 