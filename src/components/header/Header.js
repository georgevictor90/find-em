import React from "react";

function Header({ characters }) {
  const headerCharacterListItems = characters.map((character) => (
    <li key={characters.indexOf(character)}>
      <div className="character-card">
        <div className="character-card-image"></div>
        <p className={character.found ? "found" : null}>{character.name}</p>
      </div>
    </li>
  ));

  return (
    <header className="App-header">
      <h1 className="title without-rotate">
        FIND <span>'EM!</span>
      </h1>
      <ul>{headerCharacterListItems}</ul>
      <span className="timer">
        Timer: <span id="timer">00:00:00</span>
      </span>
    </header>
  );
}

export default Header;
