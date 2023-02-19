import React, { useEffect } from "react";
import { useState } from "react";
import useTimeConverter from "../../hooks/useTimeConverter";

function Timer({ timerStarted, time, handleSetTime }) {
  const [running, setRunning] = useState(false);
  const timeString = useTimeConverter(time);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        handleSetTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [running]);

  useEffect(() => {
    timerStarted ? setRunning(true) : setRunning(false);
  }, [timerStarted]);

  return (
    <div className="timer-container">
      <span className="timer">Timer: </span>
      <span>{timeString}</span>
      <button
        onClick={() => {
          setRunning(true);
        }}
      >
        start
      </button>
      <button
        onClick={() => {
          setRunning(false);
        }}
      >
        stop
      </button>
      <button
        onClick={() => {
          handleSetTime(0);
          setRunning(false);
        }}
      >
        reset
      </button>
    </div>
  );
}

export default Timer;
