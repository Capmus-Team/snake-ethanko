import { Vector2D } from '../utils/Vector2D';

/**
 * Enum for possible snake movement directions
 */
export enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT
}

/**
 * Snake class - represents the snake in the game
 * Part of the Model in MVC architecture
 */
export class Snake {
  private _segments: Vector2D[] = [];
  private _direction: Direction = Direction.RIGHT;
  private _nextDirection: Direction = Direction.RIGHT;
  private _growNextMove: boolean = false;

  /**
   * Create a new snake with initial position
   */
  constructor(startPosition: Vector2D) {
    // Initialize with 3 segments
    this._segments.push(startPosition);
    this._segments.push(new Vector2D(startPosition.x - 1, startPosition.y));
    this._segments.push(new Vector2D(startPosition.x - 2, startPosition.y));
  }

  /**
   * Move the snake in its current direction
   */
  move(): void {
    // Update current direction to next direction
    this._direction = this._nextDirection;

    // Calculate new head position
    const head = this._segments[0].clone();
    
    switch (this._direction) {
      case Direction.UP:
        head.y -= 1;
        break;
      case Direction.DOWN:
        head.y += 1;
        break;
      case Direction.LEFT:
        head.x -= 1;
        break;
      case Direction.RIGHT:
        head.x += 1;
        break;
    }

    // Add new head as first segment
    this._segments.unshift(head);

    // If not growing, remove the tail
    if (!this._growNextMove) {
      this._segments.pop();
    } else {
      this._growNextMove = false;
    }
  }

  /**
   * Set the next direction of the snake
   * Prevents 180-degree turns
   */
  setDirection(newDirection: Direction): void {
    // Prevent 180-degree turns
    if (
      (newDirection === Direction.UP && this._direction !== Direction.DOWN) ||
      (newDirection === Direction.DOWN && this._direction !== Direction.UP) ||
      (newDirection === Direction.LEFT && this._direction !== Direction.RIGHT) ||
      (newDirection === Direction.RIGHT && this._direction !== Direction.LEFT)
    ) {
      this._nextDirection = newDirection;
    }
  }

  /**
   * Mark the snake to grow on its next move
   */
  grow(): void {
    this._growNextMove = true;
  }

  /**
   * Check if snake is colliding with itself
   */
  checkSelfCollision(): boolean {
    const head = this._segments[0];
    
    // Check if head collides with any other segment
    for (let i = 1; i < this._segments.length; i++) {
      if (head.equals(this._segments[i])) {
        return true;
      }
    }

    return false;
  }

  /**
   * Check if a position is occupied by the snake
   */
  occupies(position: Vector2D): boolean {
    return this._segments.some(segment => segment.equals(position));
  }

  // Getters
  get segments(): Vector2D[] {
    return this._segments;
  }

  get head(): Vector2D {
    return this._segments[0];
  }

  get direction(): Direction {
    return this._direction;
  }

  get length(): number {
    return this._segments.length;
  }
} 