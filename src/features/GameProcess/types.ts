import { GameObject, PlayerMovingDirection } from '../../common/types';

export interface GameProcess {
  playerCharGameObject: GameObject;
  movePlayerCharacter(dir: PlayerMovingDirection): void;
  generateItem(): GameObject;
  items: GameObject[];
  moveItem(id: string): void;
}
