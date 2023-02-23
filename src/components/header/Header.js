import React from "react";

function Header({ characters, children }) {
  const headerCharacterListItems = characters.map((character) => (
    <li key={characters.indexOf(character)}>
      <div className="character-card">
        <div
          className="character-card-image"
          style={{ backgroundImage: `url(${character.url})` }}
        ></div>
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
      {children}
    </header>
  );
}

export default Header;
