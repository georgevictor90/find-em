import React from "react";
import useTimeConverter from "../../hooks/useTimeConverter";

function LeaderboardItem({ item }) {
  const timeString = useTimeConverter(item.time);
  return (
    <li style={{ width: "fit-content" }}>
      {item.name}: {timeString}
    </li>
  );
}

export default LeaderboardItem;
