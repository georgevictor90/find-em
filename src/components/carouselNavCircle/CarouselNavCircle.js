import React from "react";

function CarouselNavCircle({ handleClick, index }) {
  return (
    <button
      onClick={() => handleClick(index)}
      className="carousel-nav-circle"
    ></button>
  );
}

export default CarouselNavCircle;
