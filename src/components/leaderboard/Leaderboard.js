import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../../firebase-config";

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // async function getScores() {
    //   try {
    //     const querySnapshot = await getDocs(collection(db, "leaderboard"));
    //     querySnapshot.forEach((doc) => {
    //       console.log(doc.id, " => ", doc.data());
    //     });
    //   } catch (error) {
    //     console.log("Error getting scores: ", error);
    //   }
    // }
    // getScores();

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
      <ol>
        {leaderboard.map((item, index) => (
          <li style={{ width: "fit-content" }} key={index}>
            {item.name}: {item.time}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Leaderboard;
