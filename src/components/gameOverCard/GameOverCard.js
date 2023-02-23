import React, { useState, useContext } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase-config";
import useTimeConverter from "../../hooks/useTimeConverter";
import { AppContext } from "../../App";
import { TimerContext } from "../game/Game";

function GameOverCard() {
  const { time } = useContext(TimerContext);
  const { restartGame, difficulty, goToLeaderboard } = useContext(AppContext);
  const [name, setName] = useState("");
  const timeString = useTimeConverter(time);

  async function handleNameSubmit(e) {
    try {
      e.preventDefault();
    } catch (error) {
      console.error("Error preventing default action: ", error);
    }

    try {
      if (name) {
        await addDoc(collection(db, "leaderboard"), {
          name: name,
          time: time,
          difficulty: difficulty,
        });
        goToLeaderboard();
        setName("");
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
  return (
    <div className="backdrop">
      <div className="game-over-card">
        <p>
          Your time is <span className="timestring">{timeString}</span>
        </p>
        <form>
          <div className="input-container">
            <label htmlFor="name" className="sr-only">
              Name:
            </label>
            <input
              id="name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Name..."
            />
            <button className="submit-score" onClick={handleNameSubmit}>
              Submit score
            </button>
          </div>
        </form>
        <span> or </span>
        <button className="restart-game-button" onClick={restartGame}>
          Choose another difficulty
        </button>
      </div>
    </div>
  );
}

export default GameOverCard;
