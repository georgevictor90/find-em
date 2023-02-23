import React from "react";

function Square({ squareSize, squarePos, children }) {
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
