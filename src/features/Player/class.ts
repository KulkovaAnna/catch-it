import { PlayerConstructor } from './types';
import { v4 } from 'uuid';

export default class Player {
  readonly id: string;
  name: string;
  bestScore: number = 0;
  constructor(props: PlayerConstructor) {
    if ('id' in props) {
      const playerString = localStorage.getItem(props.id);
      if (playerString) {
        const player = JSON.parse(playerString);
        this.id = props.id;
        this.name = player.name;
        this.bestScore = player.bestScore || 0;
      } else {
        throw new Error('Player not found', {
          cause: 'No player with such id',
        });
      }
    } else {
      this.name = props.name;
      this.id = v4();
      this.bestScore = 0;
    }
  }
}
