import React, { useContext } from "react";
import { SquareContext } from "../game/Game";

function Square({ children }) {
  const { squareSize, squarePos } = useContext(SquareContext);
  return (
    <div
      className="square"
      style={{
        width: `${squareSize}px`,
        height: `${squareSize}px`,
        left: `${squarePos.x - squareSize / 2}px`,
        top: `${squarePos.y - squareSize / 2}px`,
      }}
    >
      {children}
    </div>
  );
}

export default Square;
