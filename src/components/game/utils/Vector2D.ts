/**
 * Vector2D - A utility class for handling 2D coordinates
 */
export class Vector2D {
  private _x: number;
  private _y: number;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  get x(): number {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
  }

  get y(): number {
    return this._y;
  }

  set y(value: number) {
    this._y = value;
  }

  /**
   * Creates a copy of this vector
   */
  clone(): Vector2D {
    return new Vector2D(this._x, this._y);
  }

  /**
   * Checks if this vector is equal to another vector
   */
  equals(other: Vector2D): boolean {
    return this._x === other.x && this._y === other.y;
  }

  /**
   * Adds another vector to this one
   */
  add(other: Vector2D): Vector2D {
    return new Vector2D(this._x + other.x, this._y + other.y);
  }

  /**
   * Returns a string representation of this vector
   */
  toString(): string {
    return `(${this._x}, ${this._y})`;
  }
} 