import Phaser from 'phaser';
import { wordService } from '../services/WordService';
import { sessionService } from '../services/SessionService';
import { gameState } from '../services/GameState';
import type { Word } from '../services/WordService';

interface SnakeSegment {
  x: number;
  y: number;
}

export class GameScene extends Phaser.Scene {
  private snake: SnakeSegment[] = [];
  private direction: { x: number; y: number } = { x: 1, y: 0 };
  private nextDirection: { x: number; y: number } = { x: 1, y: 0 };
  private moveTimer: number = 0;
  private gridSize: number = 25;
  private words: Word[] = [];
  private currentTarget: Word | null = null;
  private wordTexts: Phaser.GameObjects.Text[] = [];
  private targetText!: Phaser.GameObjects.Text;
  private scoreText!: Phaser.GameObjects.Text;
  private strikesText!: Phaser.GameObjects.Text;
  private gameOverText!: Phaser.GameObjects.Text;
  private restartText!: Phaser.GameObjects.Text;
  private isPaused: boolean = false;
  private graphics!: Phaser.GameObjects.Graphics;
  private pauseOverlay!: Phaser.GameObjects.Container;

  constructor() {
    super({ key: 'GameScene' });
  }

  create(): void {
    console.log('Creating GameScene...');
    this.cameras.main.setBackgroundColor('#1a1a1a');
    
    // Create graphics object for drawing
    this.graphics = this.add.graphics();
    
    this.initializeGame();
    this.setupControls();
    
    // Draw initial state
    this.drawGame();
  }

  private async initializeGame(): Promise<void> {
    console.log('Initializing game...');
    // Initialize snake in the middle of the screen
    const gridWidth = Math.floor(this.cameras.main.width / this.gridSize);
    const gridHeight = Math.floor(this.cameras.main.height / this.gridSize);
    const startX = Math.floor(gridWidth / 2);
    const startY = Math.floor(gridHeight / 2);
    
    this.snake = [
      { x: startX, y: startY },
      { x: startX - 1, y: startY },
      { x: startX - 2, y: startY }
    ];

    // Reset game state
    gameState.resetScore();

    // Setup UI
    this.setupUI();

    // Load initial words and place them
    await this.loadNewWords();

    // Start game loop
    this.moveTimer = 0;
    
    console.log('Game initialized');
  }

  private drawGame(): void {
    // Clear previous graphics
    this.graphics.clear();

    // Draw grid
    this.graphics.lineStyle(1, 0x333333);
    
    // Draw vertical lines
    const gridWidth = Math.floor(this.cameras.main.width / this.gridSize);
    const gridHeight = Math.floor(this.cameras.main.height / this.gridSize);
    
    for (let x = 0; x <= gridWidth; x++) {
      this.graphics.beginPath();
      this.graphics.moveTo(x * this.gridSize, 0);
      this.graphics.lineTo(x * this.gridSize, gridHeight * this.gridSize);
      this.graphics.strokePath();
    }
    
    // Draw horizontal lines
    for (let y = 0; y <= gridHeight; y++) {
      this.graphics.beginPath();
      this.graphics.moveTo(0, y * this.gridSize);
      this.graphics.lineTo(gridWidth * this.gridSize, y * this.gridSize);
      this.graphics.strokePath();
    }

    // Draw snake
    this.snake.forEach((segment, index) => {
      // Head is darker green, body is lighter green
      const color = index === 0 ? 0x22c55e : 0x4ade80;
      this.graphics.fillStyle(color);
      this.graphics.fillRect(
        segment.x * this.gridSize + 1,
        segment.y * this.gridSize + 1,
        this.gridSize - 2,
        this.gridSize - 2
      );
    });
  }

  private setupUI(): void {
    // Target word display
    this.targetText = this.add.text(
      this.cameras.main.centerX,
      30,
      '',
      {
        fontSize: '32px',
        color: '#ffffff'
      }
    ).setOrigin(0.5);

    // Score display
    this.scoreText = this.add.text(
      20,
      20,
      'Score: 0',
      {
        fontSize: '24px',
        color: '#ffffff'
      }
    );

    // Strikes display
    this.strikesText = this.add.text(
      this.cameras.main.width - 20,
      20,
      'Strikes: 0/3',
      {
        fontSize: '24px',
        color: '#ffffff'
      }
    ).setOrigin(1, 0);

    // Game over text (hidden initially)
    this.gameOverText = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      'Game Over!',
      {
        fontSize: '64px',
        color: '#ff0000'
      }
    )
      .setOrigin(0.5)
      .setVisible(false);

    // Restart text (hidden initially)
    this.restartText = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY + 80,
      'Press SPACE to restart',
      {
        fontSize: '32px',
        color: '#ffffff'
      }
    )
      .setOrigin(0.5)
      .setVisible(false);
  }

  private setupControls(): void {
    console.log('Setting up controls...');
    
    // Arrow keys
    this.input.keyboard?.on('keydown-UP', () => {
      if (this.direction.y !== 1) this.nextDirection = { x: 0, y: -1 };
    });
    this.input.keyboard?.on('keydown-DOWN', () => {
      if (this.direction.y !== -1) this.nextDirection = { x: 0, y: 1 };
    });
    this.input.keyboard?.on('keydown-LEFT', () => {
      if (this.direction.x !== 1) this.nextDirection = { x: -1, y: 0 };
    });
    this.input.keyboard?.on('keydown-RIGHT', () => {
      if (this.direction.x !== -1) this.nextDirection = { x: 1, y: 0 };
    });

    // WASD keys
    this.input.keyboard?.on('keydown-W', () => {
      if (this.direction.y !== 1) this.nextDirection = { x: 0, y: -1 };
    });
    this.input.keyboard?.on('keydown-S', () => {
      if (this.direction.y !== -1) this.nextDirection = { x: 0, y: 1 };
    });
    this.input.keyboard?.on('keydown-A', () => {
      if (this.direction.x !== 1) this.nextDirection = { x: -1, y: 0 };
    });
    this.input.keyboard?.on('keydown-D', () => {
      if (this.direction.x !== -1) this.nextDirection = { x: 1, y: 0 };
    });

    // Pause and restart
    this.input.keyboard?.on('keydown-ESC', () => {
      this.togglePause();
    });
    this.input.keyboard?.on('keydown-SPACE', () => {
      if (gameState.isGameOver()) {
        this.scene.start('GroupSelectScene');
      }
    });
    console.log('Controls set up');
  }

  private async loadNewWords(): Promise<void> {
    console.log('Loading new words...');
    // Clear existing words
    this.wordTexts.forEach(text => text.destroy());
    this.wordTexts = [];

    // Get 6 new words
    this.words = await wordService.selectRandomWords(6);
    console.log('Selected words:', this.words);
    
    if (!this.words || this.words.length === 0) {
      console.error('No words returned from WordService');
      return;
    }

    // Select target word
    const targetIndex = Math.floor(Math.random() * this.words.length);
    this.currentTarget = this.words[targetIndex];
    
    if (!this.currentTarget) {
      console.error('Failed to select target word');
      return;
    }

    console.log('Target word:', this.currentTarget);
    // Update target display with larger font and padding
    this.targetText.setText(this.currentTarget.romaji.toUpperCase())
      .setStyle({ 
        fontSize: '48px',
        color: '#ffffff',
        backgroundColor: '#22c55e',
        padding: { x: 20, y: 10 }
      });
    console.log('Target text updated:', this.targetText.text);

    // Place words on grid
    const gridWidth = Math.floor(this.cameras.main.width / this.gridSize);
    const gridHeight = Math.floor(this.cameras.main.height / this.gridSize);
    console.log('Grid dimensions:', { width: gridWidth, height: gridHeight });
    
    const usedPositions: Set<string> = new Set();

    this.words.forEach((word, index) => {
      let position: { x: number; y: number };
      let attempts = 0;
      const maxAttempts = 100;
      
      // Keep trying until we find an empty position
      do {
        position = {
          x: Math.floor(Math.random() * (gridWidth - 2)) + 1,
          y: Math.floor(Math.random() * (gridHeight - 4)) + 3
        };
        attempts++;
        if (attempts >= maxAttempts) {
          console.error(`Failed to find empty position for word ${word.kanji} after ${maxAttempts} attempts`);
          return;
        }
      } while (
        this.isPositionOccupied(position) || 
        usedPositions.has(`${position.x},${position.y}`)
      );

      // Mark position as used
      usedPositions.add(`${position.x},${position.y}`);

      console.log(`Placing word ${word.kanji} at position:`, position);
      const text = this.add.text(
        position.x * this.gridSize + this.gridSize / 2,
        position.y * this.gridSize + this.gridSize / 2,
        word.kanji,
        {
          fontSize: '24px',
          color: '#ffffff',
          backgroundColor: '#1f2937',
          padding: { x: 6, y: 4 }
        }
      ).setOrigin(0.5);
      
      console.log(`Word ${index + 1}/${this.words.length} placed:`, {
        kanji: word.kanji,
        position: position,
        screenX: text.x,
        screenY: text.y
      });
      
      this.wordTexts.push(text);
    });
    
    console.log(`Placed ${this.wordTexts.length} words on the grid`);
  }

  private getRandomEmptyPosition(): { x: number; y: number } {
    const gridWidth = Math.floor(this.cameras.main.width / this.gridSize);
    const gridHeight = Math.floor(this.cameras.main.height / this.gridSize);
    let position: { x: number; y: number };
    
    do {
      position = {
        x: Math.floor(Math.random() * gridWidth),
        y: Math.floor(Math.random() * gridHeight)
      };
    } while (this.isPositionOccupied(position));

    return position;
  }

  private isPositionOccupied(position: { x: number; y: number }): boolean {
    // Check if position is occupied by snake
    return this.snake.some(segment => 
      segment.x === position.x && segment.y === position.y
    );
  }

  update(time: number, delta: number): void {
    if (this.isPaused || gameState.isGameOver()) return;

    this.moveTimer += delta;
    const score = gameState.getScore();

    if (this.moveTimer >= score.speed) {
      this.moveTimer = 0;
      this.moveSnake();
      this.checkCollision();
      this.updateUI();
      this.drawGame(); // Redraw the game state
    }
  }

  private moveSnake(): void {
    // Update direction
    this.direction = { ...this.nextDirection };

    // Calculate new head position
    const head = this.snake[0];
    const gridWidth = Math.floor(this.cameras.main.width / this.gridSize);
    const gridHeight = Math.floor(this.cameras.main.height / this.gridSize);
    
    const newHead = {
      x: (head.x + this.direction.x + gridWidth) % gridWidth,
      y: (head.y + this.direction.y + gridHeight) % gridHeight
    };

    // Add new head
    this.snake.unshift(newHead);

    // Remove tail unless we're growing
    const score = gameState.getScore();
    if (this.snake.length > score.snakeLength) {
      this.snake.pop();
    }
  }

  private async checkCollision(): Promise<void> {
    const head = this.snake[0];

    // Check self-collision
    for (let i = 1; i < this.snake.length; i++) {
      if (this.snake[i].x === head.x && this.snake[i].y === head.y) {
        this.handleGameOver();
        return;
      }
    }

    // Check word collision
    this.wordTexts.forEach(async (text, index) => {
      const wordX = Math.floor(text.x / this.gridSize);
      const wordY = Math.floor(text.y / this.gridSize);

      if (head.x === wordX && head.y === wordY) {
        const word = this.words[index];
        const isCorrect = this.currentTarget ? word.id === this.currentTarget.id : false;

        // Update game state and session
        gameState.addPoints(isCorrect);
        await sessionService.submitWordReview(word.id, isCorrect);

        // Load new words if correct
        if (isCorrect) {
          await this.loadNewWords();
        } else {
          // Remove the incorrect word
          text.destroy();
          this.wordTexts.splice(index, 1);
          this.words.splice(index, 1);
        }

        // Check if game over
        if (gameState.isGameOver()) {
          this.handleGameOver();
        }
      }
    });
  }

  private updateUI(): void {
    const score = gameState.getScore();
    this.scoreText.setText(`Score: ${score.points}`);
    this.strikesText.setText(`Strikes: ${score.strikes}/${score.maxStrikes}`);
  }

  private handleGameOver(): void {
    this.gameOverText.setVisible(true);
    this.restartText.setVisible(true);
    sessionService.endSession();
  }

  private togglePause(): void {
    this.isPaused = !this.isPaused;
    
    if (this.isPaused) {
      this.showPauseMenu();
    } else {
      this.hidePauseMenu();
    }
  }

  private showPauseMenu(): void {
    // Create a container for pause menu elements
    this.pauseOverlay = this.add.container(0, 0);

    // Add semi-transparent background
    const overlay = this.add.rectangle(
      0, 0,
      this.cameras.main.width,
      this.cameras.main.height,
      0x000000, 0.5
    );
    overlay.setOrigin(0);
    this.pauseOverlay.add(overlay);

    // Add pause text
    const pauseText = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      'PAUSED',
      {
        fontSize: '64px',
        color: '#ffffff'
      }
    ).setOrigin(0.5);
    this.pauseOverlay.add(pauseText);

    // Add resume instructions
    const resumeText = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY + 80,
      'Press ESC to resume',
      {
        fontSize: '32px',
        color: '#4ade80'
      }
    ).setOrigin(0.5);
    this.pauseOverlay.add(resumeText);
  }

  private hidePauseMenu(): void {
    if (this.pauseOverlay) {
      this.pauseOverlay.destroy();
    }
  }
} 