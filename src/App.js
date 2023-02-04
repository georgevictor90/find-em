import Image from "./images/img-large.jpg";
import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const imgRef = useRef();
  const [squarePos, setSquarePos] = useState({});
  const [squareSize, setSquareSize] = useState(0);
  const [showSquare, setShowSquare] = useState(false);

  useEffect(() => {
    setSquareSize(imgRef.current.offsetWidth / 10);
    const cleanup = () => {
      window.addEventListener("resize", () => {
        setShowSquare(false);
        setSquareSize(imgRef.current.offsetWidth / 10);
      });
    };
    return cleanup;
  }, []);

  return (
    <div className="App">
      <div className="container">
        <header className="App-header">
          <h1>Find 'Em</h1>

          <ul>
            <li>Waldo</li>
            <li>Wizard Whitebeard</li>
            <li>Odlaw</li>
          </ul>

          <p className="timer">
            Timer: <span id="timer">00:00:00</span>
          </p>
        </header>
        <main style={{ position: "relative" }}>
          <img
            ref={imgRef}
            src={Image}
            alt="Cartoon Characters"
            onClick={(e) => {
              e.stopPropagation();

              setSquarePos({
                x: e.nativeEvent.offsetX,
                y: e.nativeEvent.offsetY,
              });
              setShowSquare(true);
            }}
          />
          {showSquare && (
            <div
              className="square"
              style={{
                width: `${squareSize}px`,
                height: `${squareSize}px`,
                backgroundColor: "rgba(255,255,255,0.3)",
                border: "2px dashed white",
                position: "absolute",
                left: `${squarePos.x - squareSize / 2}px`,
                top: `${squarePos.y - squareSize / 2}px`,
              }}
            ></div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
