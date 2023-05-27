import { useState, useEffect } from 'react';
import { PlayerMovingDirection } from '../../common/types';
import { GameProcess } from '../GameProcess/types';
import Rules from '../Rules/class';

let interval: NodeJS.Timer;

export default function usePlayerMovement(
  { movePlayerCharacter }: GameProcess,
  rules: Rules
) {
  const [playerMoveDirection, setPlayerMoveDirection] =
    useState<PlayerMovingDirection | null>(null);

  useEffect(() => {
    const keyDownListener = (ev: KeyboardEvent) => {
      if (ev.code === 'ArrowRight') {
        return setPlayerMoveDirection('right');
      }
      if (ev.code === 'ArrowLeft') {
        return setPlayerMoveDirection('left');
      }
    };
    const keyUpListener = () => {
      setPlayerMoveDirection(null);
    };
    window.addEventListener('keydown', keyDownListener);
    window.addEventListener('keyup', keyUpListener);
    return () => {
      window.removeEventListener('keydown', keyDownListener);
      window.removeEventListener('keyup', keyUpListener);
    };
  }, []);

  useEffect(() => {
    if (playerMoveDirection) {
      interval = setInterval(
        () => movePlayerCharacter(playerMoveDirection),
        rules.playerMovingSpeed * rules.playerMovingStep
      );
      return () => {
        clearInterval(interval);
      };
    } else {
      clearInterval(interval);
    }
  }, [
    movePlayerCharacter,
    playerMoveDirection,
    rules.playerMovingSpeed,
    rules.playerMovingStep,
  ]);
}
