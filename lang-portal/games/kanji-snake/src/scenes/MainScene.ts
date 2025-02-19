import Phaser from 'phaser';
import { wordService, Word as ApiWord } from '../services/WordService';
import { sessionService } from '../services/SessionService';
import { gameState } from '../services/GameState';

// Constants
const GRID_SIZE = 25; // Size of each cell in pixels
const GRID_WIDTH = 48; // Increased from 32 to 48 cells (50% larger)
const GRID_HEIGHT = 36; // Increased from 24 to 36 cells (50% larger)
const INITIAL_SNAKE_LENGTH = 3;
const WORDS_PER_ROUND = 12; // Number of words to show on the field at once

// Types
interface Position {
  x: number;
  y: number;
}

// Extend the API Word type with position information for the game
interface GameWord extends ApiWord, Position {
  textObjects: Phaser.GameObjects.Text[];  // Store text objects with each word
}

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
  private scoreText?: Phaser.GameObjects.Text;
  private strikesText?: Phaser.GameObjects.Text;
  private isGrowing: boolean = false;
  private cueType: 'romaji' | 'english' = 'romaji';  // Default to romaji
  private pauseElements: Phaser.GameObjects.GameObject[] = [];  // Track pause menu elements
  private scoreGraphics?: Phaser.GameObjects.Graphics;
  private strikesGraphics?: Phaser.GameObjects.Graphics;
  private cueGraphics?: Phaser.GameObjects.Graphics;

  constructor() {
    super({ key: 'MainScene' });
  }

  init(data: { sessionId?: string; cueType?: 'romaji' | 'english' }) {
    // Set cue type from scene data
    this.cueType = data.cueType || 'romaji';
    
    // Reset session ID
    this.sessionId = data.sessionId;
    
    // Reset game state
    gameState.resetScore();
    
    // Reset snake state
    this.snake = Array.from({ length: INITIAL_SNAKE_LENGTH }, (_, i) => ({
      x: Math.floor(GRID_WIDTH / 2),
      y: Math.floor(GRID_HEIGHT / 2) + i
    }));
    this.direction = 'UP';
    this.nextDirection = 'UP';
    this.moveTimer = 0;
    this.isGrowing = false;
    
    // Reset game flags
    this.isPaused = false;
    this.isGameOver = false;
    
    // Reset word-related state
    this.words = [];
    this.wordTexts = [];
    this.targetWord = undefined;
    
    // Clear any existing UI elements
    if (this.targetDisplay) this.targetDisplay.destroy();
    if (this.scoreText) this.scoreText.destroy();
    if (this.strikesText) this.strikesText.destroy();
    if (this.scoreGraphics) this.scoreGraphics.destroy();
    if (this.strikesGraphics) this.strikesGraphics.destroy();
    if (this.cueGraphics) this.cueGraphics.destroy();
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

    // Initialize UI
    this.createUI();

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

  private createUI() {
    const score = gameState.getScore();
    
    // Create backgrounds and text for score and strikes
    const padding = { x: 20, y: 10 };
    const textStyle = {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    };

    // Create score background and text
    const scoreText = `Score: ${score.points}`;
    const tempScoreText = this.add.text(0, 0, scoreText, textStyle);
    const scoreWidth = tempScoreText.width + padding.x * 2;
    const scoreHeight = tempScoreText.height + padding.y * 2;
    tempScoreText.destroy();

    this.scoreGraphics = this.add.graphics();
    this.scoreGraphics.fillStyle(0x000000, 0.8);
    this.scoreGraphics.lineStyle(2, 0x4b5563);
    this.scoreGraphics.fillRoundedRect(
      28 - padding.x,
      15 - padding.y,
      scoreWidth,
      scoreHeight,
      10
    );
    this.scoreGraphics.strokeRoundedRect(
      28 - padding.x,
      15 - padding.y,
      scoreWidth,
      scoreHeight,
      10
    );
    this.scoreGraphics.setDepth(2);

    // Create score text
    this.scoreText = this.add.text(28, 15, scoreText, textStyle).setDepth(3);

    // Create strikes background and text
    const getStrikesText = (strikes: number, maxStrikes: number) => {
      const greyX = '✖️';  // Grey X for remaining strikes
      const redX = '❌';   // Red X for earned strikes
      const remaining = Array(maxStrikes - strikes).fill(greyX).join(' ');
      const earned = Array(strikes).fill(redX).join(' ');
      return `Strikes: ${remaining}${earned ? ' ' + earned : ''}`;
    };

    const strikesText = getStrikesText(score.strikes, score.maxStrikes);
    const tempStrikesText = this.add.text(0, 0, strikesText, textStyle);
    const strikesWidth = tempStrikesText.width + padding.x * 2;
    const strikesHeight = tempStrikesText.height + padding.y * 2;
    tempStrikesText.destroy();

    this.strikesGraphics = this.add.graphics();
    this.strikesGraphics.fillStyle(0x000000, 0.8);
    this.strikesGraphics.lineStyle(2, 0x4b5563);
    this.strikesGraphics.fillRoundedRect(
      this.cameras.main.width - 28 - strikesWidth + padding.x,
      15 - padding.y,
      strikesWidth,
      strikesHeight,
      10
    );
    this.strikesGraphics.strokeRoundedRect(
      this.cameras.main.width - 28 - strikesWidth + padding.x,
      15 - padding.y,
      strikesWidth,
      strikesHeight,
      10
    );
    this.strikesGraphics.setDepth(2);

    // Create strikes text
    this.strikesText = this.add.text(
      this.cameras.main.width - 28,
      15,
      strikesText,
      textStyle
    ).setOrigin(1, 0).setDepth(3);
  }

  private updateScore() {
    if (this.scoreText) {
      const score = gameState.getScore();
      const newText = `Score: ${score.points}`;
      this.scoreText.setText(newText);

      // Update background size
      if (this.scoreGraphics) {
        const padding = { x: 20, y: 10 };
        const tempText = this.add.text(0, 0, newText, this.scoreText.style);
        const width = tempText.width + padding.x * 2;
        const height = tempText.height + padding.y * 2;
        tempText.destroy();

        this.scoreGraphics.clear();
        this.scoreGraphics.fillStyle(0x000000, 0.8);
        this.scoreGraphics.lineStyle(2, 0x4b5563);
        this.scoreGraphics.fillRoundedRect(
          28 - padding.x,
          15 - padding.y,
          width,
          height,
          10
        );
        this.scoreGraphics.strokeRoundedRect(
          28 - padding.x,
          15 - padding.y,
          width,
          height,
          10
        );
      }
    }
  }

  private updateStrikes() {
    if (this.strikesText) {
      const score = gameState.getScore();
      const prevStrikes = parseInt(this.strikesText.text.match(/❌/g)?.length.toString() || '0');
      
      // Get the new strikes text
      const greyX = '✖️';  // Grey X for remaining strikes
      const redX = '❌';   // Red X for earned strikes
      const remaining = Array(score.maxStrikes - score.strikes).fill(greyX).join(' ');
      const earned = Array(score.strikes).fill(redX).join(' ');
      const newText = `Strikes: ${remaining}${earned ? ' ' + earned : ''}`;
      
      // Update the UI text
      this.strikesText.setText(newText);

      // Animate strike changes
      if (score.strikes > prevStrikes) {
        // Strike added
        this.animateStrikeAdded(score.strikes);
      } else if (score.strikes < prevStrikes) {
        // Strike removed
        this.animateStrikeRemoved(score.strikes + 1);
      }
    }
  }

  private animateStrikeAdded(strikeNumber: number) {
    // Calculate position for the new strike
    const padding = { x: 20, y: 10 };
    const textStyle = {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    };

    // Calculate X position for the new strike (from right to left)
    const strikeWidth = 30; // Approximate width of one strike emoji
    const baseX = this.cameras.main.width - 28; // Right alignment point
    const xPos = baseX - (strikeNumber * strikeWidth);

    // Apply x-offset based on strike number (right to left)
    let xOffset = 0;
    if (strikeNumber === 1) xOffset = -10;      // First strike (rightmost)
    else if (strikeNumber === 2) xOffset = -20; // Second strike
    // Third strike doesn't need an offset
    
    // Create the bouncing strike animation
    const bounceStrike = this.add.text(xPos + xOffset, 34, '❌', textStyle)
      .setOrigin(0, 0)
      .setDepth(10)
      .setAlpha(0.8);

    // Create the bounce and fade animation
    this.tweens.add({
      targets: bounceStrike,
      y: { from: 5, to: 15 },
      scaleX: { from: 1.5, to: 1 },
      scaleY: { from: 1.5, to: 1 },
      alpha: { from: 1, to: 0 },
      duration: 1000,
      ease: 'Bounce.easeOut',
      onComplete: () => {
        bounceStrike.destroy();
      }
    });
  }

  private animateStrikeRemoved(strikeNumber: number) {
    // Calculate position for the strike being removed
    const padding = { x: 20, y: 10 };
    const textStyle = {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    };

    // Calculate X position for the strike being removed
    const strikeWidth = 30; // Approximate width of one strike emoji
    const baseX = this.cameras.main.width - 28; // Right alignment point
    const xPos = baseX - (strikeNumber * strikeWidth);

    // Apply x-offset based on strike number (right to left)
    let xOffset = 0;
    if (strikeNumber === 1) xOffset = -2;      // First strike (rightmost)
    else if (strikeNumber === 2) xOffset = -13; // Second strike
    // Third strike doesn't need an offset
    
    // Create the falling strike animation
    const fallingStrike = this.add.text(xPos + xOffset, 15, '❌', textStyle)
      .setOrigin(0, 0)
      .setDepth(10)
      .setAlpha(0.8);

    // Create the falling and fade animation
    this.tweens.add({
      targets: fallingStrike,
      y: '+=60', // Increased from 40 to 60 pixels
      alpha: 0,
      duration: 2000,
      ease: 'Cubic.easeOut',
      onComplete: () => {
        fallingStrike.destroy();
      }
    });
  }

  private async initializeWords() {
    // Clear existing words and UI elements
    this.words.forEach(word => {
      word.textObjects.forEach(text => text.destroy());
    });
    this.words = [];
    this.wordTexts = [];
    if (this.targetDisplay) this.targetDisplay.destroy();
    if (this.cueGraphics) this.cueGraphics.destroy();

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
        y: 0,
        textObjects: []
      };

      // Track used positions
      const usedPositions = new Set<string>();

      // Place all words on the field
      for (const apiWord of apiWords) {
        const pos = this.getRandomEmptyPositionForWord(usedPositions, apiWord.kanji.length);
        if (pos) {
          const gameWord: GameWord = { 
            ...apiWord, 
            ...pos,
            textObjects: []
          };
          
          // Create text objects for each character
          const characters = gameWord.kanji.split('');
          characters.forEach((char: string, index: number) => {
            const text = this.add.text(
              (gameWord.x + index) * GRID_SIZE + GRID_SIZE / 2,
              gameWord.y * GRID_SIZE + GRID_SIZE / 2 + 1,
              char,
              {
                fontSize: '20px',
                color: '#ffffff',  // Always white, removed target word coloring
                fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif'
              }
            ).setOrigin(0.5).setDepth(2);
            
            gameWord.textObjects.push(text);
            this.wordTexts.push(text);
          });

          this.words.push(gameWord);
          // Reserve positions for all characters
          for (let i = 0; i < apiWord.kanji.length; i++) {
            usedPositions.add(`${pos.x + i},${pos.y}`);
          }
        }
      }

      // Display target word's cue at the top
      const cueText = this.cueType === 'romaji' ? this.targetWord.romaji : this.targetWord.english;
      
      // Create a rounded rectangle background for the cue word
      const padding = { x: 20, y: 10 };
      const cueTextStyle = {
        fontSize: '32px',
        color: '#ffffff',
        fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      };
      
      // Create temporary text to measure its width
      const tempText = this.add.text(0, 0, cueText, cueTextStyle);
      const textWidth = tempText.width + padding.x * 2;
      const textHeight = tempText.height + padding.y * 2;
      tempText.destroy();
      
      // Create the rounded rectangle background
      this.cueGraphics = this.add.graphics();
      this.cueGraphics.fillStyle(0x000000, 0.8);
      this.cueGraphics.lineStyle(2, 0x4b5563);
      this.cueGraphics.fillRoundedRect(
        this.cameras.main.centerX - textWidth / 2,
        15 - padding.y,
        textWidth,
        textHeight,
        10
      );
      this.cueGraphics.strokeRoundedRect(
        this.cameras.main.centerX - textWidth / 2,
        15 - padding.y,
        textWidth,
        textHeight,
        10
      );
      this.cueGraphics.setDepth(2);
      
      // Create the cue text on top of the background, but moved down by ~half grid height
      this.targetDisplay = this.add.text(
        this.cameras.main.centerX,
        33, // 15 (background y)
        cueText,
        cueTextStyle
      ).setOrigin(0.5).setDepth(3);
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
    // Get snake head position
    const head = this.snake[0];

    // Define safe zone boundaries around snake head
    const safeZone = {
      left: Math.max(0, head.x - 5),
      right: Math.min(GRID_WIDTH - 1, head.x + 5),
      top: Math.max(0, head.y - 5),
      bottom: Math.min(GRID_HEIGHT - 1, head.y + 5)
    };

    // Define cue area at top center
    const cueArea = {
      left: Math.floor((GRID_WIDTH - 10) / 2),  // Center a width of 10
      right: Math.floor((GRID_WIDTH + 10) / 2),
      top: 0,
      bottom: 2  // Height of 3 (0 to 2)
    };

    // Define score area at top left
    const scoreArea = {
      left: 0,  // Start from left edge
      right: 10,  // 10 grid squares wide
      top: 0,
      bottom: 1  // Height of 2 (0 and 1)
    };

    // Define strikes area at top right
    const strikesArea = {
      left: GRID_WIDTH - 10,  // 10 grid squares from right edge
      right: GRID_WIDTH,
      top: 0,
      bottom: 1  // Height of 2 (0 and 1)
    };

    // Helper function to check if any part of a word would be adjacent to used positions
    const hasAdjacentWords = (startX: number, startY: number): boolean => {
      // Check a rectangle around the word (including diagonals)
      for (let y = startY - 1; y <= startY + 1; y++) {
        for (let x = startX - 1; x <= startX + wordLength; x++) {
          // Skip if checking outside the grid
          if (x < 0 || x >= GRID_WIDTH || y < 0 || y >= GRID_HEIGHT) {
            continue;
          }
          
          // Skip positions that would be part of our word
          if (y === startY && x >= startX && x < startX + wordLength) {
            continue;
          }
          
          // If any adjacent position is used, the word can't go here
          if (usedPositions.has(`${x},${y}`)) {
            return true;
          }
        }
      }
      return false;
    };

    // Try 100 times to find a valid position
    for (let attempts = 0; attempts < 100; attempts++) {
      const x = Math.floor(Math.random() * (GRID_WIDTH - wordLength));
      const y = Math.floor(Math.random() * GRID_HEIGHT);
      
      // Check if any part of the word would be in the same row or column as the snake's head
      const wouldIntersectSnakeHeadLines = (
        y === head.y || // Same row as head
        (x <= head.x && x + wordLength > head.x) // Any part of word in head's column
      );

      // Check if any part of the word would intersect with the safe zone square
      const wouldIntersectSafeZone = (
        // Check if word's start or end x position is within safe zone x range
        (x <= safeZone.right && x + wordLength - 1 >= safeZone.left) &&
        // Check if y position is within safe zone y range
        (y >= safeZone.top && y <= safeZone.bottom)
      );

      // Check if any part of the word would intersect with the romaji cue area
      const wouldIntersectCueArea = (
        // Check if word's start or end x position is within cue area x range
        (x <= cueArea.right && x + wordLength - 1 >= cueArea.left) &&
        // Check if y position is within cue area y range
        (y >= cueArea.top && y <= cueArea.bottom)
      );

      // Check if any part of the word would intersect with the score area
      const wouldIntersectScoreArea = (
        // Check if word's start or end x position is within score area x range
        (x <= scoreArea.right && x + wordLength - 1 >= scoreArea.left) &&
        // Check if y position is within score area y range
        (y >= scoreArea.top && y <= scoreArea.bottom)
      );

      // Check if any part of the word would intersect with the strikes area
      const wouldIntersectStrikesArea = (
        // Check if word's start or end x position is within strikes area x range
        (x <= strikesArea.right && x + wordLength - 1 >= strikesArea.left) &&
        // Check if y position is within strikes area y range
        (y >= strikesArea.top && y <= strikesArea.bottom)
      );
      
      if (wouldIntersectSnakeHeadLines || wouldIntersectSafeZone || 
          wouldIntersectCueArea || wouldIntersectScoreArea || wouldIntersectStrikesArea) {
        continue; // Try another position
      }
      
      // Check if all positions needed for the word are available
      let isValid = true;
      for (let i = 0; i < wordLength; i++) {
        const pos = `${x + i},${y}`;
        if (usedPositions.has(pos) || this.isPositionOccupiedBySnake({ x: x + i, y })) {
          isValid = false;
          break;
        }
      }

      // If the word positions are free, check if it would be adjacent to any other words
      if (isValid && !hasAdjacentWords(x, y)) {
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

    // Move snake on interval using dynamic speed from GameState
    const { speed } = gameState.getScore();
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
      this.moveTimer = time + speed;  // Use dynamic speed
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

    // Move snake by adding new head
    this.snake.unshift(newHead);
    
    // Only remove tail if we're not growing
    if (!this.isGrowing) {
      this.snake.pop();
    } else {
      this.isGrowing = false;  // Reset growth flag after growing
    }
  }

  private checkWordCollisions(head: Position) {
    // Check each word
    for (let i = this.words.length - 1; i >= 0; i--) {
      const word = this.words[i];
      
      // Check if the head collides with any character of the word
      const isCollision = Array.from({ length: word.kanji.length }).some((_, charIndex) => 
        head.x === word.x + charIndex && head.y === word.y
      );

      if (isCollision) {
        const isCorrect = word.id === this.targetWord?.id;
        
        console.log('Word collision detected:', {
          word: word.kanji,
          isCorrect,
          gridPosition: { x: word.x, y: word.y },
          targetWord: this.targetWord?.kanji
        });
        
        // Calculate exact pixel positions for both the captured word and target word
        const capturedWordPixelPos = {
          x: word.x * GRID_SIZE + (word.kanji.length * GRID_SIZE) / 2,
          y: word.y * GRID_SIZE + GRID_SIZE / 2
        };
        
        // Find the actual target word in the words array to get its correct position
        const actualTargetWord = this.words.find(w => w.id === this.targetWord?.id);
        const targetWordPixelPos = actualTargetWord ? {
          x: actualTargetWord.x * GRID_SIZE + (actualTargetWord.kanji.length * GRID_SIZE) / 2,
          y: actualTargetWord.y * GRID_SIZE + GRID_SIZE / 2
        } : null;
        
        console.log('Calculated pixel positions:', {
          capturedWord: {
            text: word.kanji,
            pixelPos: capturedWordPixelPos,
            gridPos: { x: word.x, y: word.y }
          },
          targetWord: actualTargetWord ? {
            text: actualTargetWord.kanji,
            pixelPos: targetWordPixelPos,
            gridPos: { x: actualTargetWord.x, y: actualTargetWord.y }
          } : null
        });

        // Store the words and their positions before any state changes
        const capturedWordInfo = {
          kanji: word.kanji,
          ...capturedWordPixelPos
        };
        
        const targetWordInfo = actualTargetWord ? {
          kanji: actualTargetWord.kanji,
          ...targetWordPixelPos!
        } : null;

        // Remove the word and update game state
        this.removeWord(i);
        this.handleWordCapture(word, isCorrect);
        
        // Trigger celebrations with the stored positions
        if (isCorrect) {
          console.log('Triggering correct word celebration at:', {
            text: capturedWordInfo.kanji,
            x: capturedWordInfo.x,
            y: capturedWordInfo.y
          });
          this.celebrateWord(capturedWordInfo.kanji, capturedWordInfo.x, capturedWordInfo.y);
        } else if (targetWordInfo) {
          console.log('Triggering target word celebration at:', {
            text: targetWordInfo.kanji,
            x: targetWordInfo.x,
            y: targetWordInfo.y
          });
          this.celebrateWord(targetWordInfo.kanji, targetWordInfo.x, targetWordInfo.y);
        }
        
        // Schedule board reset after celebrations
        this.time.delayedCall(100, () => {
          this.initializeWords();
        });
        
        return;
      }
    }
  }

  private removeWord(wordIndex: number) {
    const word = this.words[wordIndex];
    
    // Remove all text objects for this word
    word.textObjects.forEach(text => text.destroy());
    
    // Remove the word from the array
    this.words.splice(wordIndex, 1);
    
    // Update wordTexts array to remove the destroyed text objects
    this.wordTexts = this.wordTexts.filter(text => text.active);
  }

  private handleWordCapture(word: GameWord, isCorrect: boolean) {
    console.log(`Word captured: ${word.kanji} (${isCorrect ? 'correct' : 'incorrect'})`);
    
    // Submit the review to track progress
    if (this.sessionId) {
      sessionService.submitWordReview(word.id, isCorrect);
    }

    // Update game state and handle capture
    gameState.addPoints(isCorrect);
    
    if (isCorrect) {
      this.updateScore();
      this.updateStrikes();
      this.isGrowing = true;  // Snake will grow on next move
    } else {
      this.updateStrikes();
    }

    // Check for game over after updating strikes
    if (gameState.isGameOver()) {
      this.gameOver();
    }
  }

  private celebrateWord(text: string, x: number, y: number) {
    console.log('Creating celebration at:', { text, x, y });
    
    // Create a new text object for the animation
    const celebratoryText = this.add.text(
      x,
      y,
      text,
      {
        fontSize: '20px',
        color: '#4ade80', // Green color
        fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif'
      }
    ).setOrigin(0.5).setDepth(20);  // Highest depth to be on top of everything

    console.log('Created celebratory text at:', {
      text: celebratoryText.text,
      position: { x: celebratoryText.x, y: celebratoryText.y },
      scale: { x: celebratoryText.scaleX, y: celebratoryText.scaleY }
    });

    // Create the scale up and fade out animation
    this.tweens.add({
      targets: celebratoryText,
      scaleX: 3,
      scaleY: 3,
      alpha: 0,
      duration: 4000,  // 4 seconds
      ease: 'Expo.out',  // Expo.out for longer visibility
      onComplete: () => {
        celebratoryText.destroy();
      }
    });

    // Add a particle burst effect
    const particles = this.add.particles(0, 0, 'particle', {
      x: x,
      y: y,
      quantity: 5,  // 5 particles
      speed: { min: 50, max: 150 },
      scale: { start: 0.4, end: 0 },
      alpha: { start: 0.5, end: 0 },  // Start at 50% opacity
      lifespan: 400,  // 400ms
      blendMode: 'ADD',
      tint: 0xffd700  // Yellow color
    }).setDepth(15);  // Above game elements but below celebratory text

    // Stop and destroy the particle emitter after half a second
    this.time.delayedCall(500, () => {  // 500ms
      particles.destroy();
    });
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
    overlay.setDepth(10);  // Set high depth to appear above game elements

    const text = this.add.text(centerX, centerY, 'PAUSED', {
      fontSize: '32px',
      color: '#ffffff',
      fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    });
    text.setOrigin(0.5);
    text.setDepth(11);  // Set even higher depth to appear above overlay

    // Track pause menu elements
    this.pauseElements = [overlay, text];
  }

  private hidePauseMenu() {
    // Only destroy pause menu elements
    this.pauseElements.forEach(element => element.destroy());
    this.pauseElements = [];
  }

  private showGameOverMenu() {
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;
    const score = gameState.getScore();

    // Create semi-transparent overlay
    const overlay = this.add.rectangle(
      0, 0,
      this.cameras.main.width,
      this.cameras.main.height,
      0x000000, 0.7
    );
    overlay.setOrigin(0);
    overlay.setDepth(10);

    // Show final score with higher depth
    this.add.text(centerX, centerY - 75, 'GAME OVER', {
      fontSize: '32px',
      color: '#ffffff',
      fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    })
    .setOrigin(0.5)
    .setDepth(11);

    // Show final score
    this.add.text(centerX, centerY, `Final Score: ${score.points}`, {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    })
    .setOrigin(0.5)
    .setDepth(11);

    // Create container for buttons
    const buttonSpacing = 25;
    const firstButtonY = centerY + 75;
    const secondButtonY = firstButtonY + buttonSpacing + 40;

    // Restart button (on top)
    const restartButton = this.add.text(centerX, firstButtonY, 'Restart', {
      fontSize: '24px',
      color: '#4ade80',
      backgroundColor: '#064e3b',
      padding: { x: 32, y: 16 },  // Increased padding
      fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    })
    .setOrigin(0.5)
    .setDepth(11);

    // Add a border/background for the Restart button
    const restartBg = this.add.graphics();
    restartBg.lineStyle(2, 0x4ade80);  // Green border
    const restartBounds = restartButton.getBounds();
    restartBg.strokeRoundedRect(
      restartBounds.x,
      restartBounds.y,
      restartBounds.width,
      restartBounds.height,
      8  // Rounded corners
    );
    restartBg.setDepth(11);

    restartButton.setInteractive({ useHandCursor: true })
      .on('pointerover', () => {
        restartButton.setStyle({ backgroundColor: '#065f46' });  // Lighter green on hover
        restartBg.clear().lineStyle(2, 0x6ee7b7).strokeRoundedRect(  // Lighter border on hover
          restartBounds.x,
          restartBounds.y,
          restartBounds.width,
          restartBounds.height,
          8
        );
      })
      .on('pointerout', () => {
        restartButton.setStyle({ backgroundColor: '#064e3b' });  // Reset color
        restartBg.clear().lineStyle(2, 0x4ade80).strokeRoundedRect(  // Reset border
          restartBounds.x,
          restartBounds.y,
          restartBounds.width,
          restartBounds.height,
          8
        );
      })
      .on('pointerdown', () => this.scene.restart());

    // Return to Title button (below)
    const titleButton = this.add.text(centerX, secondButtonY, 'Return to Title', {
      fontSize: '24px',
      color: '#4ade80',
      backgroundColor: '#064e3b',
      padding: { x: 32, y: 16 },  // Increased padding
      fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    })
    .setOrigin(0.5)
    .setDepth(11);

    // Add a border/background for the Return to Title button
    const titleBg = this.add.graphics();
    titleBg.lineStyle(2, 0x4ade80);  // Green border
    const titleBounds = titleButton.getBounds();
    titleBg.strokeRoundedRect(
      titleBounds.x,
      titleBounds.y,
      titleBounds.width,
      titleBounds.height,
      8  // Rounded corners
    );
    titleBg.setDepth(11);

    titleButton.setInteractive({ useHandCursor: true })
      .on('pointerover', () => {
        titleButton.setStyle({ backgroundColor: '#065f46' });  // Lighter green on hover
        titleBg.clear().lineStyle(2, 0x6ee7b7).strokeRoundedRect(  // Lighter border on hover
          titleBounds.x,
          titleBounds.y,
          titleBounds.width,
          titleBounds.height,
          8
        );
      })
      .on('pointerout', () => {
        titleButton.setStyle({ backgroundColor: '#064e3b' });  // Reset color
        titleBg.clear().lineStyle(2, 0x4ade80).strokeRoundedRect(  // Reset border
          titleBounds.x,
          titleBounds.y,
          titleBounds.width,
          titleBounds.height,
          8
        );
      })
      .on('pointerdown', () => {
        sessionService.endSession();
        this.scene.stop();
        this.scene.start('TitleScene');
      });
  }

  shutdown() {
    // Clean up resources when scene is shut down
    this.words.forEach(word => {
      word.textObjects.forEach(text => text.destroy());
    });
    this.words = [];
    this.wordTexts = [];
    if (this.targetDisplay) {
      this.targetDisplay.destroy();
    }
    if (this.scoreText) {
      this.scoreText.destroy();
    }
    if (this.strikesText) {
      this.strikesText.destroy();
    }
    if (this.scoreGraphics) this.scoreGraphics.destroy();
    if (this.strikesGraphics) this.strikesGraphics.destroy();
    if (this.cueGraphics) this.cueGraphics.destroy();
    this.graphics.clear();
    this.graphics.destroy();
  }

  preload() {
    // Create a small particle texture
    const graphics = this.add.graphics();
    graphics.fillStyle(0xffffff);
    graphics.fillCircle(4, 4, 4);
    graphics.generateTexture('particle', 8, 8);
    graphics.destroy();
  }
} 