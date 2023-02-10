import React, { useState, useEffect } from "react";
import Characters from "../characters/Characters";
import Header from "../header/Header";
import RemainingCharactersList from "../remainingCharactersList/RemainingCharactersList";
import Snackbar from "../snackbar/Snackbar";
import Square from "../square/Square";
import { db, storage } from "../../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

function Game({ restartGame, difficulty }) {
  const [showSquare, setShowSquare] = useState(false);
  const [squarePos, setSquarePos] = useState({});
  const [squareSize, setSquareSize] = useState(null);
  const [snackbar, setSnackbar] = useState({ text: "", show: false });
  const [imgSize, setImgSize] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [showRemainingCharacters, setShowRemainingCharacters] = useState(false);

  const charactersCollectionRef = collection(db, "characters");

  async function getUrl(characterName) {
    try {
      const cardImgRef = ref(storage, `characters/${characterName}.png`);
      const url = await getDownloadURL(ref(cardImgRef));
      return url;
    } catch (error) {
      console.log(error);
    }
  }

  // useEffect(() => {
  //   console.log(showRemainingCharacters);
  // }, [showRemainingCharacters]);

  useEffect(() => {
    setShowRemainingCharacters(!showRemainingCharacters);
  }, [squarePos]);

  useEffect(() => {
    const getCharacters = async () => {
      const q = query(
        charactersCollectionRef,
        where("difficulty", "==", difficulty.toLowerCase())
      );
      const querySnapshot = await getDocs(q);
      let characters = [];
      const promises = [];
      querySnapshot.forEach((doc) => {
        promises.push(
          getUrl(doc.data().name).then((url) => {
            characters.push({
              ...doc.data(),
              url: url,
              id: doc.id,
              found: false,
            });
          })
        );
      });
      await Promise.all(promises);
      setCharacters(characters);
    };
    getCharacters();
  }, []);

  useEffect(() => {
    // CHECK FOR WIN (EVERY CHARACTER IN STATE HAS A FOUND FLAG == TRUE)
    if (
      characters.length &&
      characters.every((character) => character.found === true)
    ) {
      setGameOver(true);
      setShowSquare(false);
    }
  }, [characters]);

  useEffect(() => {
    if (gameOver === true) declareWin();
  }, [gameOver]);

  useEffect(() => {
    setSquareSize(imgSize / 12);
    setShowSquare(false);
  }, [imgSize]);

  useEffect(() => {
    if (snackbar.show) setShowSquare(false);
  }, [snackbar]);

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
    if (showRemainingCharacters === true) {
      setShowRemainingCharacters(false);
    }
    setSnackbar({ text: "", show: false });
    setSquarePos({ x, y });
    setShowSquare(true);
    // setShowRemainingCharacters(true);
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
            {showRemainingCharacters && (
              <RemainingCharactersList
                showRemainingCharacters={showRemainingCharacters}
                imgSize={imgSize}
                squarePos={squarePos}
                characters={characters}
                handleGuess={handleGuess}
              />
            )}
          </Square>
        )}
        {snackbar.show && <Snackbar text={snackbar.text} />}
      </main>
    </div>
  );
}

export default Game;
