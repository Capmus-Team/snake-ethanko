import { GameState } from '../model/GameState';

/**
 * CanvasRenderer class - handles rendering the game on a canvas
 * Part of the View in MVC architecture
 */
export class CanvasRenderer {
  private _canvas: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D | null;
  private _cellSize: number;
  private _snakeColor: string = '#10b981'; // Green color
  private _foodColor: string = '#ef4444';  // Red color
  private _gridColor: string = '#CBD5E1';  // Light gray

  constructor(canvas: HTMLCanvasElement, cellSize: number) {
    this._canvas = canvas;
    this._context = canvas.getContext('2d');
    this._cellSize = cellSize;
  }

  /**
   * Render the current game state on the canvas
   */
  render(gameState: GameState): void {
    if (!this._context) return;

    // Clear the canvas
    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);

    // Draw the grid
    this.drawGrid(gameState.width, gameState.height);

    // Draw the snake
    this.drawSnake(gameState);

    // Draw the food
    this.drawFood(gameState);
  }

  /**
   * Draw the background grid
   */
  private drawGrid(width: number, height: number): void {
    if (!this._context) return;

    this._context.strokeStyle = this._gridColor;
    this._context.lineWidth = 0.5;

    // Draw vertical lines
    for (let i = 0; i <= width; i++) {
      this._context.beginPath();
      this._context.moveTo(i * this._cellSize, 0);
      this._context.lineTo(i * this._cellSize, height * this._cellSize);
      this._context.stroke();
    }

    // Draw horizontal lines
    for (let i = 0; i <= height; i++) {
      this._context.beginPath();
      this._context.moveTo(0, i * this._cellSize);
      this._context.lineTo(width * this._cellSize, i * this._cellSize);
      this._context.stroke();
    }
  }

  /**
   * Draw the snake
   */
  private drawSnake(gameState: GameState): void {
    if (!this._context) return;

    this._context.fillStyle = this._snakeColor;
    
    // Draw each snake segment
    for (const segment of gameState.snake.segments) {
      this._context.fillRect(
        segment.x * this._cellSize,
        segment.y * this._cellSize,
        this._cellSize,
        this._cellSize
      );
    }

    // Draw the head with a slightly different color to distinguish it
    const head = gameState.snake.head;
    this._context.fillStyle = '#059669'; // Darker green
    this._context.fillRect(
      head.x * this._cellSize,
      head.y * this._cellSize,
      this._cellSize,
      this._cellSize
    );
  }

  /**
   * Draw the food
   */
  private drawFood(gameState: GameState): void {
    if (!this._context) return;

    const food = gameState.food.position;
    
    // Draw a circle for the food
    this._context.fillStyle = this._foodColor;
    this._context.beginPath();
    this._context.arc(
      food.x * this._cellSize + this._cellSize / 2,
      food.y * this._cellSize + this._cellSize / 2,
      this._cellSize / 2 * 0.8, // Slightly smaller than the cell
      0,
      Math.PI * 2
    );
    this._context.fill();
  }

  // Getters and setters
  get canvas(): HTMLCanvasElement {
    return this._canvas;
  }

  get context(): CanvasRenderingContext2D | null {
    return this._context;
  }

  set snakeColor(color: string) {
    this._snakeColor = color;
  }

  set foodColor(color: string) {
    this._foodColor = color;
  }

  set gridColor(color: string) {
    this._gridColor = color;
  }
} 