import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../../firebase-config";
import LeaderboardItem from "../leaderboardItem/LeaderboardItem";

function Leaderboard({ restartGame }) {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const leaderboardRef = collection(db, "leaderboard");
      const q = query(leaderboardRef, orderBy("time"), limit(10));
      const querySnapshot = await getDocs(q);
      const leaderboardData = [];
      querySnapshot.forEach((doc) => {
        leaderboardData.push(doc.data());
      });
      setLeaderboard(leaderboardData);
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      <button className="restart-game-button" onClick={restartGame}>
        Start new game
      </button>{" "}
      <ol>
        {leaderboard.map((item, index) => (
          <LeaderboardItem item={item} key={index} />
        ))}
      </ol>
    </div>
  );
}

export default Leaderboard;
