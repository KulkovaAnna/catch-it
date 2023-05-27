import { RulesConstructor } from './types';

export default class Rules {
  gameDuration: number = 0;
  initialCharacterHealth: number = 3;

  initialItemsFallingSpeed: number = 2000;
  maxIemsFallingSpeed: number = 100;
  itemsGeneratingFrequency: number = 1000;
  speedMultiplier: number = 100;
  speadIncreaseFrequency: number = 5000;

  penaltyCost: number = 1;
  pointCost: number = 10;
  playerMovingSpeed: number = 10;
  playerMovingStep: number = 0.1;
  goodItemChance: number = 0.5;
  constructor(args?: RulesConstructor) {
    if (args) {
      for (let field in args) {
        const property = field as keyof RulesConstructor;
        const value = args[property];
        if (typeof value === 'number') {
          this[property] = value;
        }
      }
    }
  }
}
