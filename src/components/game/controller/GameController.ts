import { GameState } from '../model/GameState';
import { CanvasRenderer } from '../view/CanvasRenderer';
import { Direction } from '../model/Snake';

/**
 * GameController class - manages game logic and user input
 * Part of the Controller in MVC architecture
 */
export class GameController {
  private _gameState: GameState;
  private _renderer: CanvasRenderer;
  private _gameLoopInterval: number | null = null;
  private _onScoreChange: ((score: number) => void) | null = null;
  private _onGameOver: (() => void) | null = null;

  constructor(
    gameState: GameState,
    renderer: CanvasRenderer,
    onScoreChange?: (score: number) => void,
    onGameOver?: () => void
  ) {
    this._gameState = gameState;
    this._renderer = renderer;
    
    if (onScoreChange) {
      this._onScoreChange = onScoreChange;
    }
    
    if (onGameOver) {
      this._onGameOver = onGameOver;
    }

    // Set up keyboard event listeners
    this.setupEventListeners();
  }

  /**
   * Start the game loop
   */
  start(): void {
    if (this._gameLoopInterval) {
      this.stop();
    }

    this._gameState.isPaused = false;
    this._gameLoopInterval = window.setInterval(() => this.gameLoop(), this._gameState.speed);
    
    // Initial render
    this._renderer.render(this._gameState);
  }

  /**
   * Stop the game loop
   */
  stop(): void {
    if (this._gameLoopInterval) {
      clearInterval(this._gameLoopInterval);
      this._gameLoopInterval = null;
    }
  }

  /**
   * Reset the game state and start new game
   */
  restart(): void {
    this.stop();
    this._gameState.reset();
    this.start();
    
    // Notify score change
    if (this._onScoreChange) {
      this._onScoreChange(this._gameState.score);
    }
  }

  /**
   * Toggle pause state
   */
  togglePause(): void {
    if (this._gameState.isGameOver) {
      return;
    }

    this._gameState.isPaused = !this._gameState.isPaused;
    
    if (this._gameState.isPaused) {
      this.stop();
    } else {
      this.start();
    }
  }

  /**
   * The main game loop
   */
  private gameLoop(): void {
    // Store previous score for comparison
    const prevScore = this._gameState.score;
    
    // Update game state
    const continueGame = this._gameState.update();
    
    // Render the game
    this._renderer.render(this._gameState);
    
    // Check for score change
    if (prevScore !== this._gameState.score && this._onScoreChange) {
      this._onScoreChange(this._gameState.score);
    }

    // Check if game over
    if (!continueGame && this._gameState.isGameOver) {
      this.stop();
      if (this._onGameOver) {
        this._onGameOver();
      }
    }
    
    // Update game speed if needed
    if (prevScore !== this._gameState.score) {
      this.updateGameSpeed();
    }
  }

  /**
   * Update the game speed based on the current game state
   */
  private updateGameSpeed(): void {
    // Only update if game is running
    if (this._gameLoopInterval) {
      this.stop();
      this.start();
    }
  }

  /**
   * Set up keyboard event listeners
   */
  private setupEventListeners(): void {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (this._gameState.isGameOver) {
        return;
      }

      switch (e.key) {
        case 'ArrowUp':
          this._gameState.snake.setDirection(Direction.UP);
          break;
        case 'ArrowDown':
          this._gameState.snake.setDirection(Direction.DOWN);
          break;
        case 'ArrowLeft':
          this._gameState.snake.setDirection(Direction.LEFT);
          break;
        case 'ArrowRight':
          this._gameState.snake.setDirection(Direction.RIGHT);
          break;
        case ' ':
          this.togglePause();
          break;
      }
    });
  }

  // Getters
  get gameState(): GameState {
    return this._gameState;
  }

  get renderer(): CanvasRenderer {
    return this._renderer;
  }

  get isPaused(): boolean {
    return this._gameState.isPaused;
  }

  get isGameOver(): boolean {
    return this._gameState.isGameOver;
  }

  get score(): number {
    return this._gameState.score;
  }
} 