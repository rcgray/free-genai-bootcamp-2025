export interface GameScore {
  points: number;
  strikes: number;
  maxStrikes: number;
  snakeLength: number;
  speed: number;
}

export class GameState {
  private score: GameScore = {
    points: 0,
    strikes: 0,
    maxStrikes: 3,
    snakeLength: 3,
    speed: 150, // Initial speed in ms
  };

  private basePoints = 100;
  private speedMultiplier = 1;
  private lengthMultiplier = 1;

  constructor() {
    this.resetScore();
  }

  resetScore(): void {
    this.score = {
      points: 0,
      strikes: 0,
      maxStrikes: 3,
      snakeLength: 3,
      speed: 150,
    };
    this.speedMultiplier = 1;
    this.lengthMultiplier = 1;
  }

  addPoints(correct: boolean): void {
    if (correct) {
      // Calculate points based on current speed and snake length
      const points = Math.floor(
        this.basePoints * this.speedMultiplier * this.lengthMultiplier
      );
      this.score.points += points;

      // Remove one strike if we have any
      if (this.score.strikes > 0) {
        this.score.strikes--;
      }

      // Increase snake length
      this.score.snakeLength++;

      // Update multipliers
      this.updateMultipliers();

      // Increase speed (decrease interval)
      this.updateSpeed();
    } else {
      this.score.strikes++;
    }
  }

  private updateMultipliers(): void {
    // Speed multiplier increases as the game gets faster
    this.speedMultiplier = Math.max(1, (150 / this.score.speed) * 1.5);

    // Length multiplier increases with snake length
    this.lengthMultiplier = Math.max(1, this.score.snakeLength / 3);
  }

  private updateSpeed(): void {
    // Decrease interval (increase speed) by 1ms for each correct answer
    // but don't go faster than 50ms
    this.score.speed = Math.max(50, this.score.speed - 1);
  }

  getScore(): GameScore {
    return { ...this.score };
  }

  isGameOver(): boolean {
    return this.score.strikes >= this.score.maxStrikes;
  }
}

export const gameState = new GameState(); 