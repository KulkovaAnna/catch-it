import { FC } from 'react';
import { GameProps } from './types';
import PlayerCharacterComponent from '../../features/PlayerCharacter/component';
import useGameProcess from '../GameProcess/useGameProcess';
import usePlayerMovement from './uesPlayerMovement';
import useItems from './useItems';
import Item from '../Item/component';
import './styles.css';

const Game: FC<GameProps> = ({ gameSession }) => {
  const gameProcess = useGameProcess(gameSession.rules);
  usePlayerMovement(gameProcess, gameSession.rules);
  useItems(gameProcess, gameSession.rules);

  return (
    <div className="game">
      <PlayerCharacterComponent
        containerStyle={{
          position: 'absolute',
          bottom: '18%',
          left: `min(${gameProcess.playerCharGameObject.position.x}%, calc(100% - ${gameProcess.playerCharGameObject.object.width}))`,
        }}
        staticObject={gameProcess.playerCharGameObject.object}
      />
      {gameProcess.items.map((it) => (
        <Item
          key={it.object.id}
          staticObject={it.object}
          containerStyle={{
            position: 'absolute',
            top: `${it.position.y}%`,
            left: `min(${it.position.x}%, calc(100% - ${it.object.width}))`,
          }}
        />
      ))}
    </div>
  );
};

export default Game;
