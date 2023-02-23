import React, { useEffect, useState, useContext } from "react";
import { SquareContext } from "../game/Game";

function RemainingCharactersList({ imgSize, characters, handleGuess }) {
  const { squareSize, squarePos } = useContext(SquareContext);

  const [right, setRight] = useState("");
  const [left, setLeft] = useState(null);
  const [top, setTop] = useState(null);
  const [bottom, setBottom] = useState(null);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    setShowList(true);
  }, []);

  useEffect(() => {
    //Check the square position in percentage relative to the image

    // left half or right half on the X axis
    const xPercentage = (squarePos.x / imgSize) * 100;

    // top half or bottom half on the Y axis
    const yPercentage = (squarePos.y / imgSize) * 100;

    // if left half, place on right side of square
    if (xPercentage < 50) {
      setRight(`-${squareSize * 2}px`);
      setLeft("");

      // if right half, place on left side of square
    } else {
      setLeft(`-${squareSize * 2}px`);
      setRight("");
    }

    // if top half, place on bottom side of square
    if (yPercentage < 50) {
      setTop("50%");
      setBottom("");

      // if bottom half, place on top side of square
    } else {
      setBottom("50%");
      setTop("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [squarePos]);

  const styles = {
    position: "absolute",
    listStyle: "none",
    right: `${right}`,
    left: `${left}`,
    top: `${top}`,
    bottom: `${bottom}`,
  };

  const guessListItems = characters.map((character) => {
    return !character.found ? (
      <li
        key={character.name}
        onClick={() => {
          handleGuess(character.name);
        }}
      >
        {character.name}
      </li>
    ) : null;
  });

  return (
    <ul
      style={styles}
      className={showList ? "guess-list visible" : "guess-list"}
    >
      {guessListItems}
    </ul>
  );
}

export default RemainingCharactersList;
