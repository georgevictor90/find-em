import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { db } from "../../firebase-config";
import useTimeConverter from "../../hooks/useTimeConverter";

function GameOverCard({ goToLeaderboard, restartGame, time }) {
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
        });
        goToLeaderboard();
        setName("");
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
  return (
    <div className="game-over-card">
      <p>
        Your time is <span>{timeString}</span>
      </p>
      <form>
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
        <button onClick={handleNameSubmit}>Submit score</button>
      </form>
      <span> or </span>
      <button onClick={restartGame}>Choose another difficulty</button>
    </div>
  );
}

export default GameOverCard;
