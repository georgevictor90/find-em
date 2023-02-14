import React, { useEffect } from "react";
import { useState } from "react";

function Timer({ timerStarted }) {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

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
  }, [running]);

  useEffect(() => {
    timerStarted ? setRunning(true) : setRunning(false);
  }, [timerStarted]);

  return (
    <div className="timer-container">
      <span className="timer">Timer: </span>
      <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
      <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}.</span>
      <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
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
          setTime(0);
          setRunning(false);
        }}
      >
        reset
      </button>
    </div>
  );
}

export default Timer;
