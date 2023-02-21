import React, { useEffect } from "react";

function CarouselNavCircle({ handleClick, index, currentIndex }) {
  return (
    <button
      onClick={() => handleClick(index)}
      className={
        index === currentIndex
          ? "carousel-nav-circle current"
          : "carousel-nav-circle"
      }
    ></button>
  );
}

export default CarouselNavCircle;
