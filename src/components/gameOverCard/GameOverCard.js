import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { db } from "../../firebase-config";

function GameOverCard({ goToLeaderboard, restartGame, time }) {
  const [name, setName] = useState("");

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
        Your time is{" "}
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}.</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </p>
      <form>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <button onClick={handleNameSubmit}>Submit score</button>
      </form>
      <span> or </span>
      <button onClick={restartGame}>Choose another difficulty</button>
    </div>
  );
}

export default GameOverCard;
