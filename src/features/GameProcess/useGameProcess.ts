import { useState } from 'react';
import { GameObject, PlayerMovingDirection } from '../../common/types';
import PlayerCharacter from '../PlayerCharacter/class';
import char from '../../common/assets/waiting-dog.png';
import { GameProcess } from './types';
import Rules from '../Rules/class';
import { badItems, goodItems } from '../../common/data/items';
import GoodItem from '../GoodItem/class';
import BadItem from '../BadItem/class';

const playerCharacter = new PlayerCharacter({
  name: 'dog',
  height: '10vw',
  width: '10vw',
  texture: char,
});

const defaultPosition = { x: 0, y: 0 };

export default function useGameProcess(rules: Rules): GameProcess {
  const [playerCharGameObject, setPlayerChar] = useState<GameObject>({
    object: playerCharacter,
    position: defaultPosition,
  });
  const [items, setItems] = useState<GameObject[]>([
    {
      object: new GoodItem(goodItems[0]),
      position: { y: 0, x: Math.random() * 100 },
    },
  ]);

  const movePlayerCharacter = (direction: PlayerMovingDirection) => {
    const directionCorrection =
      direction === 'left' ? -rules.playerMovingStep : rules.playerMovingStep;
    setPlayerChar((char) => {
      const initMovingPosition = char.position.x + directionCorrection;
      let finMovingPosition: number;
      if (direction === 'left') {
        if (initMovingPosition >= 0) finMovingPosition = initMovingPosition;
        else finMovingPosition = 0;
      } else {
        if (initMovingPosition <= 100) finMovingPosition = initMovingPosition;
        else finMovingPosition = 100;
      }
      return {
        ...char,
        position: {
          ...char.position,
          x: finMovingPosition,
        },
      };
    });
  };

  const generateItem = (): GameObject => {
    const isGoodItem = Math.random() >= rules.goodItemChance;
    const position = { y: 0, x: Math.random() * 100 };
    const items = isGoodItem ? goodItems : badItems;
    const randomIndex = Math.trunc(Math.random() * items.length);
    const item = items[randomIndex];
    const newItem = {
      object: isGoodItem ? new GoodItem(item) : new BadItem(item),
      position,
    };
    setItems((arr) => [...arr, newItem]);
    return newItem;
  };

  const destroyItem = (id: string) => {
    setItems((arr) => arr.filter((it) => it.object.id !== id));
  };

  const moveItem = (id: string) => {
    const copyItems = [...items];
    const item = copyItems.find((it) => it.object.id === id);
    if (!item) return;
    const initMovingPosition = item.position.y + 0.1;
    if (initMovingPosition > 100) {
      return destroyItem(id);
    }
    item.position.y = initMovingPosition;
    setItems(copyItems);
  };

  return {
    playerCharGameObject,
    movePlayerCharacter,
    generateItem,
    items,
    moveItem,
  };
}
