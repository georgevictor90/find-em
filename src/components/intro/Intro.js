import React, { useEffect, useState, useContext } from "react";

import { AppContext } from "../../App";

function Intro() {
  const { startGame, goToLeaderboard } = useContext(AppContext);
  const levels = ["Easy", "Normal", "Hard"];
  const [animateTitle, setAnimateTitle] = useState(false);

  const buttons = levels.map((level) => (
    <button
      className={`difficulty-button ${level.toLowerCase()}`}
      key={level}
      onClick={() => {
        startGame(level);
      }}
    >
      {level}
    </button>
  ));

  useEffect(() => {
    setAnimateTitle(true);
  }, []);

  return (
    <div className="intro">
      <div className="card">
        <h1 className={animateTitle ? "animate title" : "title"}>
          FIND <span>'EM!</span>
        </h1>
        <div className="buttons-container">{buttons}</div>
        <button className="leaderboard-link" onClick={goToLeaderboard}>
          to Leaderboard
        </button>
      </div>
    </div>
  );
}

export default Intro;
