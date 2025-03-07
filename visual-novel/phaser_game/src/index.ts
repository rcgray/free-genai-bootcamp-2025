import Phaser from 'phaser';

// Declaration for HMR
declare global {
  interface ImportMeta {
    hot?: {
      accept(callback?: () => void): void;
    };
  }
}

// Simple scene for testing
class TestScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TestScene' });
  }

  create() {
    this.add.text(600, 400, 'Japanese Visual Novel', {
      fontSize: '32px',
      color: '#ffffff'
    }).setOrigin(0.5);
    
    this.add.text(600, 450, 'Phaser + TypeScript + Vite Setup Working!', {
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
  }
};

// Create game instance
const game = new Phaser.Game(config);

// Enable hot module replacement for development
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    console.log('HMR update detected');
  });
} 