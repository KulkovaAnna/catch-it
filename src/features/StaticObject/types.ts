import StaticObject from './class';
import { CSSProperties } from 'react';

export type StaticObjectConstructor = {
  name: string;
  height: number | string;
  width: number | string;
  texture: string;
};

export type StaticObjectProps = {
  staticObject: StaticObject;
  containerStyle?: CSSProperties;
};
