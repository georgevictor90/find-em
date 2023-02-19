import React from "react";
import useTimeConverter from "../../hooks/useTimeConverter";

function LeaderboardItem({ item }) {
  const timeString = useTimeConverter(item.time);
  return (
    <li>
      <div className="leaderboard-entry">
        <div className="leaderboard-entry-info">{item.name}</div>
        <div className="leaderboard-entry-info">{timeString}</div>
      </div>
    </li>
  );
}

export default LeaderboardItem;
