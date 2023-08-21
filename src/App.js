import React, { useState } from "react";
import Intro from "./components/intro/Intro";
import "./App.css";
import Game from "./components/game/Game";
import Leaderboard from "./components/leaderboard/Leaderboard";
import { createContext } from "react";

export const AppContext = createContext();

function App() {
  const [newGame, setNewGame] = useState(false);
  const [difficulty, setDifficulty] = useState("Easy");
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const startGame = (difficulty) => {
    setDifficulty(difficulty);
    setNewGame(true);
  };

  const restartGame = () => {
    setNewGame(false);
    setShowLeaderboard(false);
  };

  const goToLeaderboard = () => {
    setNewGame(false);
    setShowLeaderboard(true);
  };

  return (
    <div className="App">
      <AppContext.Provider
        value={{ startGame, restartGame, difficulty, goToLeaderboard }}
      >
        {newGame ? <Game /> : showLeaderboard ? <Leaderboard /> : <Intro />}
      </AppContext.Provider>
    </div>
  );
}

export default App;
