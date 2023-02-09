import React, { useEffect, useRef, useState } from "react";
import Image from "../../images/img-large.jpg";

function Characters({
  gameOver,
  handleClick,
  handleResize,
  setInitialImgSize,
}) {
  const imgRef = useRef(null);

  useEffect(() => {
    const imgElement = imgRef.current;
    // console.log(imgElement);
    setInitialImgSize(imgElement.width, imgElement.width);
    window.addEventListener("resize", () => {
      handleResize(imgElement.width);
    });

    return () => {
      window.removeEventListener("resize", () => {
        handleResize(imgElement.current.width);
      });
    };
  }, []);

  return (
    <img
      ref={imgRef}
      src={Image}
      alt="Cartoon Characters"
      onClick={(e) => {
        e.stopPropagation();
        !gameOver && handleClick(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      }}
    />
  );
}

export default Characters;
