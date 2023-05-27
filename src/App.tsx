import './App.css';
import GameSession from './features/GameSession/class';
import Player from './features/Player/class';
import Rules from './features/Rules/class';
import Game from './features/Game/component';

const player = new Player({ name: 'Anna' });
const rules = new Rules({
  playerMovingSpeed: 10,
  playerMovingStep: 0.1,
  itemsGeneratingFrequency: 2000,
  initialItemsFallingSpeed: 10,
  maxIemsFallingSpeed: 1,
  speedMultiplier: 1,
});
const game = new GameSession(player, rules);

function App() {
  return (
    <div className="App">
      <Game gameSession={game} />
    </div>
  );
}

export default App;
