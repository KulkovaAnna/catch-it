import { v4 } from 'uuid';
import Player from '../Player/class';
import Rules from '../Rules/class';

export default class GameSession {
  id: string;
  rules: Rules;
  player: Player;
  constructor(player: Player, rules: Rules) {
    this.player = player;
    this.rules = rules;
    this.id = v4();
  }
}
