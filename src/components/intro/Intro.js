import React, { useEffect, useState } from "react";

function Intro({ handleClick }) {
  const levels = ["Easy", "Normal", "Hard"];
  const buttons = levels.map((level) => (
    <button
      className={`difficulty-button ${level.toLowerCase()}`}
      key={level}
      onClick={() => {
        handleClick(level);
      }}
    >
      {level}
    </button>
  ));
  const [animateTitle, setAnimateTitle] = useState(false);
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
      </div>
    </div>
  );
}

export default Intro;
