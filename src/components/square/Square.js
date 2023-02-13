import React from "react";

function Square({ squareSize, squarePos, children }) {
  return (
    <div
      className="square"
      style={{
        boxShadow: "5px 5px 5px 5px rgb(0 0 0 / 40%)",
        width: `${squareSize}px`,
        height: `${squareSize}px`,
        backgroundColor: "rgba(255,255,255,0.1)",
        border: "3px dashed #333",
        outline: "1vmin ridge rgba(255, 61, 0, .8)",
        borderRadius: "50%",
        position: "absolute",
        left: `${squarePos.x - squareSize / 2}px`,
        top: `${squarePos.y - squareSize / 2}px`,
        transition:
          "top 0.5s cubic-bezier(0.165, 0.84, 0.44, 1), left 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)",
      }}
    >
      {children}
    </div>
  );
}

export default Square;
