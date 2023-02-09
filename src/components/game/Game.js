import React, { useState, useEffect } from "react";
import Characters from "../characters/Characters";
import Header from "../header/Header";
import RemainingCharactersList from "../remainingCharactersList/RemainingCharactersList";
import Snackbar from "../snackbar/Snackbar";
import Square from "../square/Square";

function Game({ restartGame, difficulty, newGame }) {
  //When rendering and when difficulty changes, query the db for the characters for the game difficulty and save them in state
  //Here we hardcode the characters

  const [characters, setCharacters] = useState([
    { name: "Waldo", x: 28.4, y: 69.7, found: false, difficulty: "hard" },
    { name: "Plankton", x: 38.8, y: 35.8, found: false, difficulty: "hard" },
    { name: "Ash Ketchum", x: 97.7, y: 39.8, found: false, difficulty: "hard" },
  ]);

  const [showSquare, setShowSquare] = useState(false);
  const [squarePos, setSquarePos] = useState({});
  const [squareSize, setSquareSize] = useState(null);
  const [snackbar, setSnackbar] = useState({ text: "", show: false });
  const [imgSize, setImgSize] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    // CHECK FOR WIN (EVERY CHARACTER FOUND)
    characters.every((character) => character.found === true) &&
      setGameOver(true);
    setShowSquare(false);
  }, [characters]);

  // useEffect(() => {
  //   !newGame &&
  //     setSnackbar({ show: true, text: "CONGRATULATIONS, YOU FOUND 'EM ALL!" });
  // }, [newGame]);

  useEffect(() => {
    gameOver && declareWin();
  }, [gameOver]);

  useEffect(() => {
    console.log(snackbar);
  }, [snackbar]);

  useEffect(() => {
    setSquareSize(imgSize / 12);
    setShowSquare(false);
  }, [imgSize]);

  function hideSquare() {
    setShowSquare(false);
  }

  function setInitialImgSize(width) {
    setImgSize(width);
  }

  function handleResize(newWidth) {
    hideSquare();
    setImgSize(newWidth);
  }

  function handleClickOnImage(x, y) {
    setSnackbar({ text: "", show: false });
    setSquarePos({ x, y });
    setShowSquare(true);
  }

  function getCoordsOfGuess(characterName) {
    const guess = characters.find((char) => char.name === characterName);
    return { x: guess.x, y: guess.y };
  }

  function handleGuess(characterName) {
    const guessCoords = getCoordsOfGuess(characterName);
    const clickPosInPercentages = {
      x: (squarePos.x / imgSize) * 100,
      y: (squarePos.y / imgSize) * 100,
    };
    const isFound =
      Math.abs(clickPosInPercentages.x - guessCoords.x) < 3 &&
      Math.abs(clickPosInPercentages.y - guessCoords.y) < 3
        ? true
        : false;

    setSnackbar({
      text: isFound
        ? `YES! YOU FOUND ${characterName}`
        : `THAT'S NOT ${characterName}. KEEP TRYING`,
      show: true,
    });

    setCharacters(
      characters.map((character) => {
        return character.name === characterName
          ? { ...character, found: isFound }
          : character;
      })
    );
  }

  function declareWin() {
    setSnackbar({ show: true, text: "CONGRATULATIONS, YOU FOUND 'EM ALL!" });
  }

  return (
    <div className="container">
      <Header characters={characters} />
      <main style={{ position: "relative" }}>
        {gameOver && (
          <button onClick={restartGame}>Choose another difficulty</button>
        )}
        <Characters
          gameOver={gameOver}
          setInitialImgSize={setInitialImgSize}
          handleClick={handleClickOnImage}
          handleResize={handleResize}
        />
        {showSquare && (
          <Square squareSize={squareSize} squarePos={squarePos}>
            <RemainingCharactersList
              characters={characters}
              handleGuess={handleGuess}
            />
          </Square>
        )}
        {snackbar.show && <Snackbar text={snackbar.text} />}
      </main>
    </div>
  );
}

export default Game;
