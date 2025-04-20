import { Vector2D } from '../utils/Vector2D';

/**
 * Food class - represents the food in the game
 * Part of the Model in MVC architecture
 */
export class Food {
  private _position: Vector2D;
  private _boardWidth: number;
  private _boardHeight: number;

  /**
   * Create a new food item
   */
  constructor(boardWidth: number, boardHeight: number) {
    this._boardWidth = boardWidth;
    this._boardHeight = boardHeight;
    this._position = new Vector2D(0, 0);
  }

  /**
   * Randomize the food position within the board boundaries
   */
  randomizePosition(): void {
    const x = Math.floor(Math.random() * this._boardWidth);
    const y = Math.floor(Math.random() * this._boardHeight);
    this._position = new Vector2D(x, y);
  }

  // Getters and setters
  get position(): Vector2D {
    return this._position;
  }

  set position(value: Vector2D) {
    this._position = value;
  }

  get boardWidth(): number {
    return this._boardWidth;
  }

  get boardHeight(): number {
    return this._boardHeight;
  }
} 