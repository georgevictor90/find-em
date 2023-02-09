import React from "react";

function RemainingCharactersList({ characters, handleGuess }) {
  const guessListItems = characters.map((character) => {
    return !character.found ? (
      <li
        key={character.name}
        onClick={() => {
          handleGuess(character.name);
          // console.log(character.name);
        }}
      >
        {character.name}
      </li>
    ) : null;
  });

  return <ul className="guess-list">{guessListItems}</ul>;
}

export default RemainingCharactersList;
