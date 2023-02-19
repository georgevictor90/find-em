import { useState, useEffect } from "react";

function useTimeConverter(milliseconds) {
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(
      `${("0" + Math.floor((milliseconds / 60000) % 60)).slice(-2)}:` +
        `${("0" + Math.floor((milliseconds / 1000) % 60)).slice(-2)}.` +
        `${("0" + ((milliseconds / 10) % 100)).slice(-2)}`
    );
  }, [milliseconds]);

  return time;
}

export default useTimeConverter;
