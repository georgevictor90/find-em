import React from "react";
import LeaderboardItem from "../leaderboardItem/LeaderboardItem";

function CarouselSlide({ difficulty, leaderboard }) {
  const listItems = leaderboard.map((item) => (
    <LeaderboardItem key={item.id} item={item} />
  ));

  return (
    <div className="slide">
      <h1>{difficulty}</h1>
      <ol>{listItems}</ol>
    </div>
  );
}

export default CarouselSlide;
