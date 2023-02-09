import React from "react";

function Header({ characters }) {
  const headerCharacterListItems = characters.map((character) => (
    <li
      className={character.found ? "found" : null}
      key={characters.indexOf(character)}
    >
      {character.name}
    </li>
  ));

  return (
    <header className="App-header">
      <h1>Find 'Em</h1>

      <ul>{headerCharacterListItems}</ul>

      <p className="timer">
        Timer: <span id="timer">00:00:00</span>
      </p>
    </header>
  );
}

export default Header;
