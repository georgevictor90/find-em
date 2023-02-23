import React, { useState, useEffect, useContext, createContext } from "react";
// IMPORT COMPONENTS
import Characters from "../characters/Characters";
import Header from "../header/Header";
import RemainingCharactersList from "../remainingCharactersList/RemainingCharactersList";
import Snackbar from "../snackbar/Snackbar";
import Square from "../square/Square";

// FIREBASE IMPORTS
import { db, storage } from "../../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import Timer from "../timer/Timer";
import GameOverCard from "../gameOverCard/GameOverCard";

//CONTEXT STUFF
import { AppContext } from "../../App";
export const SquareContext = createContext();
export const TimerContext = createContext();

function Game() {
  const { difficulty } = useContext(AppContext);

  // SQUARE CONTEXT STATE
  const [showSquare, setShowSquare] = useState(false);
  const [squarePos, setSquarePos] = useState({});
  const [squareSize, setSquareSize] = useState(null);

  // SNACKBAR CONTEXT STATE
  const [snackbar, setSnackbar] = useState({ text: "", show: false });
  const [snackbarFade, setSnackbarFade] = useState(false);

  // TIMER CONTEXT STATE
  const [timerStarted, setTimerStarted] = useState(false);
  const [time, setTime] = useState(0);

  // OTHER STATE
  const [imgSize, setImgSize] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [showRemainingCharacters, setShowRemainingCharacters] = useState(false);

  const charactersCollectionRef = collection(db, "characters");

  // SIDE EFFECTS
  useEffect(() => {
    setShowRemainingCharacters(
      (showRemainingCharacters) => !showRemainingCharacters
    );
  }, [squarePos]);

  useEffect(() => {
    const getCharacters = async () => {
      const q = query(
        charactersCollectionRef,
        where("difficulty", "==", difficulty.toLowerCase())
      );
      const querySnapshot = await getDocs(q);
      const promises = querySnapshot.docs.map((doc) =>
        getUrl(doc.data().name).then((url) => ({
          ...doc.data(),
          url,
          id: doc.id,
          found: false,
        }))
      );
      const characters = await Promise.all(promises);
      setCharacters(characters);
    };
    getCharacters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // CHECK FOR WIN (EVERY CHARACTER IN STATE HAS A FOUND FLAG == TRUE)
    if (characters.length && characters.every((character) => character.found)) {
      setTimerStarted(false);
      setGameOver(true);
      setShowSquare(false);
      setSnackbar({ show: true, text: "CONGRATULATIONS, YOU FOUND 'EM ALL!" });
    }
  }, [characters]);

  useEffect(() => {
    setSquareSize(imgSize / 12);
    setShowSquare(false);
  }, [imgSize]);

  useEffect(() => {
    if (snackbar.show) {
      setShowSquare(false);
      setTimeout(() => {
        setSnackbarFade(true);
      }, 1000);
    }
  }, [snackbar]);

  // FUNCTIONS
  async function getUrl(characterName) {
    try {
      const cardImgRef = ref(storage, `characters/${characterName}.png`);
      const url = await getDownloadURL(ref(cardImgRef));
      return url;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

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
    setSnackbarFade(false);
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

  function handleImageLoad() {
    setTimerStarted(true);
  }

  return (
    <div className="container">
      <TimerContext.Provider value={{ time, setTime, timerStarted }}>
        {gameOver && <GameOverCard />}
        <Header characters={characters}>
          <Timer />
        </Header>
      </TimerContext.Provider>

      <main style={{ position: "relative" }}>
        <Characters
          handleImageLoad={handleImageLoad}
          gameOver={gameOver}
          setInitialImgSize={setInitialImgSize}
          handleClick={handleClickOnImage}
          handleResize={handleResize}
        />

        {showSquare && (
          <SquareContext.Provider value={{ squareSize, squarePos }}>
            <Square>
              {showRemainingCharacters && (
                <RemainingCharactersList
                  imgSize={imgSize}
                  characters={characters}
                  handleGuess={handleGuess}
                />
              )}
            </Square>
          </SquareContext.Provider>
        )}
        {snackbar.show && <Snackbar fade={snackbarFade} text={snackbar.text} />}
      </main>
    </div>
  );
}

export default Game;
