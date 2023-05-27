import { StaticObjectConstructor } from './types';
import { v4 as uuidv4 } from 'uuid';

export default class StaticObject {
  readonly id: string;
  name: string;
  height: number | string;
  width: number | string;
  texture: string;
  constructor({ name, height, width, texture }: StaticObjectConstructor) {
    this.name = name;
    this.height = height;
    this.width = width;
    this.texture = texture;
    this.id = uuidv4();
  }
}
