import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../../firebase-config";
import LeaderboardItem from "../leaderboardItem/LeaderboardItem";
import Carousel from "../carousel/Carousel";
import CarouselSlide from "../carouselSlide/CarouselSlide";

function Leaderboard({ restartGame }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const difficulties = ["Easy", "Normal", "Hard"];

  useEffect(() => {
    console.log(leaderboard);
  }, [leaderboard]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const leaderboardRef = collection(db, "leaderboard");
      const q = query(leaderboardRef, orderBy("time"), limit(10));
      const querySnapshot = await getDocs(q);
      const leaderboardData = [];
      querySnapshot.forEach((doc) => {
        leaderboardData.push({ ...doc.data(), id: doc.id });
      });
      setLeaderboard(leaderboardData);
    };
    fetchLeaderboard();
  }, []);

  const slides = difficulties.map((difficulty, index) => (
    <CarouselSlide
      key={index}
      difficulty={difficulty}
      leaderboard={leaderboard}
    />
  ));

  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      <button className="restart-game-button" onClick={restartGame}>
        Start new game
      </button>

      <Carousel slides={slides} />

      {/* <ol>
        {leaderboard.map((item, index) => (
          <LeaderboardItem item={item} key={index} />
        ))}
      </ol> */}
    </div>
  );
}

export default Leaderboard;
