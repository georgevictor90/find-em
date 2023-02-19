import React, { useState } from "react";
import Intro from "./components/intro/Intro";
import "./App.css";
import Game from "./components/game/Game";
import Leaderboard from "./components/leaderboard/Leaderboard";

function App() {
  const [newGame, setNewGame] = useState(false);
  const [difficulty, setDifficulty] = useState("");
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  function startGame(difficulty) {
    setDifficulty(difficulty);
    setNewGame(true);
  }
  function restartGame() {
    setNewGame(false);
    setShowLeaderboard(false);
  }

  function goToLeaderboard() {
    setNewGame(false);
    setShowLeaderboard(true);
  }

  return (
    <div className="App">
      {newGame ? (
        // Game component starts a new game based on difficulty
        <Game
          restartGame={restartGame}
          difficulty={difficulty}
          goToLeaderboard={goToLeaderboard}
        />
      ) : showLeaderboard ? (
        <Leaderboard restartGame={restartGame} />
      ) : (
        // Intro component asks the user to choose a difficulty
        <Intro handleClick={startGame} goToLeaderboard={goToLeaderboard} />
      )}
    </div>
  );
}

export default App;
