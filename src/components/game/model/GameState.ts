import { Snake } from './Snake';
import { Food } from './Food';
import { Vector2D } from '../utils/Vector2D';

/**
 * GameState class - maintains the state of the entire game
 * Part of the Model in MVC architecture
 */
export class GameState {
  private _width: number;
  private _height: number;
  private _snake: Snake;
  private _food: Food;
  private _score: number = 0;
  private _isPaused: boolean = true;
  private _isGameOver: boolean = false;
  private _speed: number;
  private _initialSpeed: number;

  constructor(width: number, height: number, initialSpeed: number = 100) {
    this._width = width;
    this._height = height;
    this._initialSpeed = initialSpeed;
    this._speed = initialSpeed;
    
    // Initialize snake in the middle of the grid
    const startX = Math.floor(width / 2);
    const startY = Math.floor(height / 2);
    this._snake = new Snake(new Vector2D(startX, startY));
    
    // Initialize food at a random position
    this._food = new Food(width, height);
    this.placeFood();
  }

  /**
   * Update game state for the next frame
   * @returns whether the game should continue
   */
  update(): boolean {
    if (this._isPaused || this._isGameOver) {
      return false;
    }

    // Move the snake
    this._snake.move();

    // Check for wall collision
    const head = this._snake.head;
    if (
      head.x < 0 || 
      head.x >= this._width || 
      head.y < 0 || 
      head.y >= this._height
    ) {
      this._isGameOver = true;
      return false;
    }

    // Check for self collision
    if (this._snake.checkSelfCollision()) {
      this._isGameOver = true;
      return false;
    }

    // Check for food collision
    if (head.equals(this._food.position)) {
      this._snake.grow();
      this.placeFood();
      this._score += 10;
      
      // Increase speed every 5 food items
      if (this._score % 50 === 0) {
        this._speed = Math.max(this._speed - 10, 50); // Minimum speed of 50ms
      }
    }

    return true;
  }

  /**
   * Place food at a random position not occupied by the snake
   */
  placeFood(): void {
    let position: Vector2D;
    do {
      position = new Vector2D(
        Math.floor(Math.random() * this._width),
        Math.floor(Math.random() * this._height)
      );
    } while (this._snake.occupies(position));

    this._food.position = position;
  }

  /**
   * Reset the game state to start a new game
   */
  reset(): void {
    const startX = Math.floor(this._width / 2);
    const startY = Math.floor(this._height / 2);
    this._snake = new Snake(new Vector2D(startX, startY));
    this.placeFood();
    this._score = 0;
    this._isGameOver = false;
    this._isPaused = false;
    this._speed = this._initialSpeed;
  }

  // Getters and setters
  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  get snake(): Snake {
    return this._snake;
  }

  get food(): Food {
    return this._food;
  }

  get score(): number {
    return this._score;
  }

  get isPaused(): boolean {
    return this._isPaused;
  }

  set isPaused(value: boolean) {
    this._isPaused = value;
  }

  get isGameOver(): boolean {
    return this._isGameOver;
  }

  get speed(): number {
    return this._speed;
  }
} 