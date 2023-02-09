import React from "react";

function Intro({ handleClick }) {
  const levels = ["Easy", "Medium", "Hard"];
  const buttons = levels.map((button) => (
    <button
      key={button}
      onClick={() => {
        handleClick(button);
      }}
    >
      {button}
    </button>
  ));
  return (
    <div className="postcard">
      <h1>
        FIND <span className="em">'EM!</span>
      </h1>
      <div className="buttons-container">{buttons}</div>
    </div>
  );
}

export default Intro;
