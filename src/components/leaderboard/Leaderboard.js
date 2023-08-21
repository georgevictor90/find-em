import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useState, useEffect, useContext } from "react";
import { db } from "../../firebase-config";
import Carousel from "../carousel/Carousel";
import CarouselSlide from "../carouselSlide/CarouselSlide";
import { AppContext } from "../../App";

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const difficulties = ["Easy", "Normal", "Hard"];

  const { restartGame } = useContext(AppContext);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const leaderboardData = [];
      const leaderboardRef = collection(db, "leaderboard");

      for (const difficulty of difficulties) {
        const q = query(
          leaderboardRef,
          where("difficulty", "==", difficulty),
          orderBy("time"),
          limit(10)
        );
        const querySnapshot = await getDocs(q);
        const difficultyLeaderboard = [];

        querySnapshot.forEach((doc) => {
          difficultyLeaderboard.push({ ...doc.data(), id: doc.id });
        });

        leaderboardData.push({
          difficulty,
          leaderboard: difficultyLeaderboard,
        });
      }

      setLeaderboard(leaderboardData);
    };

    fetchLeaderboard();
  }, []);

  const slides = difficulties.map((difficulty, index) => (
    <CarouselSlide
      key={index}
      difficulty={difficulty}
      leaderboard={
        leaderboard.find((entry) => entry.difficulty === difficulty)
          ?.leaderboard || []
      }
    />
  ));

  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      <button className="restart-game-button" onClick={restartGame}>
        Start new game
      </button>
      <Carousel slides={slides} />
    </div>
  );
}

export default Leaderboard;
