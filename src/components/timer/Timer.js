import React, { useEffect, useState, useContext } from "react";
import useTimeConverter from "../../hooks/useTimeConverter";
import { TimerContext } from "../game/Game";

function Timer() {
  const { time, setTime, timerStarted } = useContext(TimerContext);
  const [running, setRunning] = useState(false);
  const timeString = useTimeConverter(time);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  useEffect(() => {
    timerStarted ? setRunning(true) : setRunning(false);
  }, [timerStarted]);

  return (
    <div className="timer-container">
      <span className="timer">Timer: </span>
      <span>{timeString}</span>
    </div>
  );
}

export default Timer;
