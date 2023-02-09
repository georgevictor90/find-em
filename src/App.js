import React, { useState } from "react";
import Intro from "./components/intro/Intro";
import "./App.css";
import Game from "./components/game/Game";

function App() {
  const [newGame, setNewGame] = useState(false);
  const [difficulty, setDifficulty] = useState("");

  function startGame(difficulty) {
    setDifficulty(difficulty);
    setNewGame(true);
  }
  function restartGame() {
    setNewGame(false);
  }

  return (
    <div className="App">
      {newGame ? (
        <Game restartGame={restartGame} difficulty={difficulty} />
      ) : (
        <Intro handleClick={startGame} />
      )}
    </div>
  );
}

export default App;
