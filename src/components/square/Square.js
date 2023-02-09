import React from "react";

function Square({ squareSize, squarePos, children }) {
  return (
    <div
      className="square"
      style={{
        width: `${squareSize}px`,
        height: `${squareSize}px`,
        backgroundColor: "rgba(255,255,255,0.1)",
        border: "3px dashed #333",
        outline: "8px ridge rgba(255, 61, 0, .6)",
        borderRadius: "50%",
        position: "absolute",
        left: `${squarePos.x - squareSize / 2}px`,
        top: `${squarePos.y - squareSize / 2}px`,
      }}
    >
      {children}
    </div>
  );
}

export default Square;
