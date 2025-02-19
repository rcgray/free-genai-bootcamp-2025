import Phaser from 'phaser';
import { wordService, Word as ApiWord } from '../services/WordService';
import { sessionService } from '../services/SessionService';

// Constants
const GRID_SIZE = 25; // Size of each cell in pixels
const GRID_WIDTH = 48; // Increased from 32 to 48 cells (50% larger)
const GRID_HEIGHT = 36; // Increased from 24 to 36 cells (50% larger)
const INITIAL_SNAKE_LENGTH = 3;
const GAME_SPEED = 150; // Milliseconds between moves
const WORDS_PER_ROUND = 6; // Number of words to show on the field at once

// Types
interface Position {
  x: number;
  y: number;
}

// Extend the API Word type with position information for the game
interface GameWord extends ApiWord, Position {}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export default class MainScene extends Phaser.Scene {
  private snake: Position[] = [];
  private direction: Direction = 'UP';
  private nextDirection: Direction = 'UP';
  private moveTimer: number = 0;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasdKeys!: {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
  };
  private isPaused: boolean = false;
  private isGameOver: boolean = false;
  private graphics!: Phaser.GameObjects.Graphics;
  private words: GameWord[] = [];  // Active words on the field
  private targetWord?: GameWord;  // Current target word
  private wordTexts: Phaser.GameObjects.Text[] = [];  // Text objects for words
  private targetDisplay?: Phaser.GameObjects.Text;  // Text object for target word
  private sessionId?: string;

  constructor() {
    super({ key: 'MainScene' });
  }

  init(data: { sessionId?: string }) {
    this.sessionId = data.sessionId;
  }

  create() {
    // Set background color (this is the game field color)
    this.cameras.main.setBackgroundColor('#1a1a1a');

    // Create a graphics object that persists
    this.graphics = this.add.graphics();
    
    // Create a container for the grid that will be rendered below everything else
    this.add.container(0, 0).setDepth(0);
    // Set the graphics to be rendered above the grid but below text
    this.graphics.setDepth(1);

    // Initialize snake
    this.snake = Array.from({ length: INITIAL_SNAKE_LENGTH }, (_, i) => ({
      x: Math.floor(GRID_WIDTH / 2),
      y: Math.floor(GRID_HEIGHT / 2) + i
    }));

    // Set up input
    this.cursors = this.input.keyboard!.createCursorKeys();
    this.wasdKeys = this.input.keyboard!.addKeys('W,A,S,D') as any;

    // Setup pause key
    this.input.keyboard!.on('keydown-ESC', () => {
      this.isPaused = !this.isPaused;
      if (this.isPaused) {
        this.showPauseMenu();
      } else {
        this.hidePauseMenu();
      }
    });

    // Initialize words
    this.initializeWords();
  }

  private async initializeWords() {
    // Clear existing words
    this.wordTexts.forEach(text => text.destroy());
    this.wordTexts = [];
    this.words = [];

    try {
      // Get random words from the current group
      const apiWords = await wordService.selectRandomWords(WORDS_PER_ROUND);
      if (apiWords.length === 0) {
        console.error('No words available');
        return;
      }

      // Select one as the target word
      this.targetWord = {
        ...apiWords[Math.floor(Math.random() * apiWords.length)],
        x: 0,  // Position will be set later
        y: 0
      };

      // Track used positions
      const usedPositions = new Set<string>();

      // Place all words on the field
      for (const apiWord of apiWords) {
        const pos = this.getRandomEmptyPositionForWord(usedPositions, apiWord.kanji.length);
        if (pos) {
          const gameWord: GameWord = { ...apiWord, ...pos };
          this.words.push(gameWord);
          // Reserve positions for all characters
          for (let i = 0; i < apiWord.kanji.length; i++) {
            usedPositions.add(`${pos.x + i},${pos.y}`);
          }
        }
      }

      // Create text objects for all words
      this.words.forEach(word => {
        const characters = word.kanji.split('');
        characters.forEach((char: string, index: number) => {
          const text = this.add.text(
            (word.x + index) * GRID_SIZE + GRID_SIZE / 2,
            word.y * GRID_SIZE + GRID_SIZE / 2 + 1,
            char,
            {
              fontSize: '20px',
              color: '#ffffff',
              fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif'
            }
          ).setOrigin(0.5).setDepth(2);
          this.wordTexts.push(text);
        });
      });

      // Display target word's romaji at the top
      if (this.targetDisplay) {
        this.targetDisplay.destroy();
      }
      if (this.targetWord) {
        this.targetDisplay = this.add.text(
          this.cameras.main.centerX,
          30,
          this.targetWord.romaji,
          {
            fontSize: '32px',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 }
          }
        ).setOrigin(0.5).setDepth(3);
      }
    } catch (error) {
      console.error('Error initializing words:', error);
    }
  }

  private getRandomEmptyPosition(usedPositions: Set<string>): Position {
    let position: Position;
    do {
      position = {
        x: Math.floor(Math.random() * (GRID_WIDTH - 2)) + 1,
        y: Math.floor(Math.random() * (GRID_HEIGHT - 2)) + 1
      };
    } while (
      usedPositions.has(`${position.x},${position.y}`) ||
      this.isPositionOccupiedBySnake(position)
    );
    return position;
  }

  private getRandomEmptyPositionForWord(usedPositions: Set<string>, wordLength: number): Position | null {
    // Try 100 times to find a valid position
    for (let attempts = 0; attempts < 100; attempts++) {
      const x = Math.floor(Math.random() * (GRID_WIDTH - wordLength));
      const y = Math.floor(Math.random() * GRID_HEIGHT);
      
      // Check if all positions needed for the word are available
      let isValid = true;
      for (let i = 0; i < wordLength; i++) {
        const pos = `${x + i},${y}`;
        if (usedPositions.has(pos) || this.isPositionOccupiedBySnake({ x: x + i, y })) {
          isValid = false;
          break;
        }
      }
      
      if (isValid) {
        return { x, y };
      }
    }
    return null;  // Could not find a valid position
  }

  private isPositionOccupiedBySnake(position: Position): boolean {
    return this.snake.some(segment => 
      segment.x === position.x && segment.y === position.y
    );
  }

  update(time: number) {
    if (this.isPaused || this.isGameOver) return;

    // Handle input - only update nextDirection
    if (this.cursors.up.isDown || this.wasdKeys.W.isDown) {
      if (this.direction !== 'DOWN') this.nextDirection = 'UP';
    } else if (this.cursors.down.isDown || this.wasdKeys.S.isDown) {
      if (this.direction !== 'UP') this.nextDirection = 'DOWN';
    } else if (this.cursors.left.isDown || this.wasdKeys.A.isDown) {
      if (this.direction !== 'RIGHT') this.nextDirection = 'LEFT';
    } else if (this.cursors.right.isDown || this.wasdKeys.D.isDown) {
      if (this.direction !== 'LEFT') this.nextDirection = 'RIGHT';
    }

    // Move snake on interval
    if (time > this.moveTimer) {
      // Apply the queued direction only when we're actually going to move
      const opposites = {
        'UP': 'DOWN',
        'DOWN': 'UP',
        'LEFT': 'RIGHT',
        'RIGHT': 'LEFT'
      };
      
      // Only change direction if the next direction isn't opposite to current direction
      if (opposites[this.direction] !== this.nextDirection) {
        this.direction = this.nextDirection;
      }
      
      this.moveSnake();
      this.moveTimer = time + GAME_SPEED;
    }

    // Draw game
    this.drawGame();
  }

  private moveSnake() {
    const newHead = { ...this.snake[0] };

    // Update head position based on current direction (not nextDirection)
    switch (this.direction) {
      case 'UP':
        newHead.y--;
        if (newHead.y < 0) newHead.y = GRID_HEIGHT - 1;
        break;
      case 'DOWN':
        newHead.y++;
        if (newHead.y >= GRID_HEIGHT) newHead.y = 0;
        break;
      case 'LEFT':
        newHead.x--;
        if (newHead.x < 0) newHead.x = GRID_WIDTH - 1;
        break;
      case 'RIGHT':
        newHead.x++;
        if (newHead.x >= GRID_WIDTH) newHead.x = 0;
        break;
    }

    // Check for collision with snake body (excluding the tail since it will move)
    for (let i = 0; i < this.snake.length - 1; i++) {
      if (this.snake[i].x === newHead.x && this.snake[i].y === newHead.y) {
        this.gameOver();
        return;
      }
    }

    // Check for word collisions
    this.checkWordCollisions(newHead);

    // Move snake
    this.snake.unshift(newHead);
    this.snake.pop();
  }

  private checkWordCollisions(head: Position) {
    // Check each word
    for (let i = this.words.length - 1; i >= 0; i--) {
      const word = this.words[i];
      // Check if the head collides with any character of the word
      for (let charIndex = 0; charIndex < word.kanji.length; charIndex++) {
        if (head.x === word.x + charIndex && head.y === word.y) {
          // Word was captured - handle it
          this.handleWordCollision(word);
          // Remove the word and its text objects
          this.words.splice(i, 1);
          // Remove corresponding text objects
          for (let j = 0; j < word.kanji.length; j++) {
            const textIndex = i * word.kanji.length + j;
            this.wordTexts[textIndex].destroy();
            this.wordTexts.splice(textIndex, 1);
          }
          // If all words are gone, generate new ones
          if (this.words.length === 0) {
            this.initializeWords();
          }
          return;
        }
      }
    }
  }

  private handleWordCollision(word: GameWord) {
    const isCorrect = word.id === this.targetWord?.id;
    
    // Submit the review to track progress
    if (this.sessionId) {
      sessionService.submitWordReview(word.id, isCorrect);
    }

    if (isCorrect) {
      // Handle correct word collection
      this.initializeWords();  // Get new words
    } else {
      // Handle incorrect word collection
      // TODO: Add strike, show feedback, etc.
    }
  }

  private drawGame() {
    // Clear all previous graphics
    this.graphics.clear();

    // Draw grid with darker lines
    this.graphics.lineStyle(1, 0x333333);  // Darker grid lines
    for (let x = 0; x <= GRID_WIDTH; x++) {
      this.graphics.moveTo(x * GRID_SIZE, 0);
      this.graphics.lineTo(x * GRID_SIZE, GRID_HEIGHT * GRID_SIZE);
    }
    for (let y = 0; y <= GRID_HEIGHT; y++) {
      this.graphics.moveTo(0, y * GRID_SIZE);
      this.graphics.lineTo(GRID_WIDTH * GRID_SIZE, y * GRID_SIZE);
    }
    this.graphics.strokePath();

    // Draw snake with brighter colors for contrast against dark background
    this.snake.forEach((segment, index) => {
      this.graphics.fillStyle(index === 0 ? 0x22c55e : 0x4ade80);  // Brighter green for contrast
      this.graphics.fillRect(
        segment.x * GRID_SIZE,
        segment.y * GRID_SIZE,
        GRID_SIZE - 1,
        GRID_SIZE - 1
      );
    });
  }

  private gameOver() {
    this.isGameOver = true;
    this.showGameOverMenu();
  }

  private showPauseMenu() {
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    const overlay = this.add.rectangle(
      0, 0, 
      this.cameras.main.width,
      this.cameras.main.height,
      0x000000, 0.5
    );
    overlay.setOrigin(0);

    const text = this.add.text(centerX, centerY, 'PAUSED', {
      fontSize: '32px',
      color: '#ffffff'
    });
    text.setOrigin(0.5);
  }

  private hidePauseMenu() {
    // Clear all UI elements
    this.children.list
      .filter(child => child instanceof Phaser.GameObjects.Text || child instanceof Phaser.GameObjects.Rectangle)
      .forEach(child => child.destroy());
  }

  private showGameOverMenu() {
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    const overlay = this.add.rectangle(
      0, 0,
      this.cameras.main.width,
      this.cameras.main.height,
      0x000000, 0.5
    );
    overlay.setOrigin(0);

    const text = this.add.text(centerX, centerY - 50, 'GAME OVER', {
      fontSize: '32px',
      color: '#ffffff'
    });
    text.setOrigin(0.5);

    const restartButton = this.add.text(centerX, centerY + 50, 'Restart', {
      fontSize: '24px',
      color: '#4ade80',
      backgroundColor: '#1a1a1a',
      padding: { x: 20, y: 10 }
    });
    restartButton.setOrigin(0.5);
    restartButton.setInteractive({ useHandCursor: true });
    restartButton.on('pointerdown', () => this.scene.restart());
  }
} 