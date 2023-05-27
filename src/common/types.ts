import StaticObject from '../features/StaticObject/class';

export interface Vector2d {
  x: number;
  y: number;
}

export interface GameObject {
  object: StaticObject;
  position: Vector2d;
}

export type PlayerMovingDirection = 'left' | 'right';
