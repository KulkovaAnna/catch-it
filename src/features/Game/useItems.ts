import { useEffect, useState } from 'react';
import { GameProcess } from '../GameProcess/types';
import Rules from '../Rules/class';

let generatingTimer: NodeJS.Timer;
let fallingTimer: NodeJS.Timer;
let speedIncreaseTimer: NodeJS.Timer;

export default function useItems(gameProcess: GameProcess, rules: Rules) {
  const [fallingSpeed, setFallingSpeed] = useState(
    rules.initialItemsFallingSpeed
  );

  useEffect(() => {
    generatingTimer = setInterval(() => {
      gameProcess.generateItem();
    }, rules.itemsGeneratingFrequency);
    return () => {
      clearInterval(generatingTimer);
    };
  }, []);

  useEffect(() => {
    clearInterval(fallingTimer);
    fallingTimer = setInterval(() => {
      gameProcess.items.forEach(({ object }) =>
        gameProcess.moveItem(object.id)
      );
    }, fallingSpeed);
    return () => {
      clearInterval(fallingTimer);
    };
  }, [fallingSpeed, gameProcess.items]);

  useEffect(() => {
    speedIncreaseTimer = setInterval(() => {
      setFallingSpeed((prev) => {
        if (prev <= rules.maxIemsFallingSpeed) {
          clearInterval(speedIncreaseTimer);
          return prev;
        }
        return prev - rules.speedMultiplier;
      });
    }, rules.speadIncreaseFrequency);
    return () => clearInterval(speedIncreaseTimer);
  }, []);
}
