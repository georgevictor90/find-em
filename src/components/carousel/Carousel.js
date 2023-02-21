import React, { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import CarouselNavCircle from "../carouselNavCircle/CarouselNavCircle";

function Carousel({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const circles = slides.map((slide, idx) => (
    <CarouselNavCircle
      key={idx}
      handleClick={handleNavCircleClick}
      index={idx}
    />
  ));

  function prevSlide() {
    if (currentIndex === 0) return;
    setCurrentIndex((currentIndex) => currentIndex - 1);
  }
  function nextSlide() {
    if (currentIndex === 2) return;
    setCurrentIndex((currentIndex) => currentIndex + 1);
  }

  function handleNavCircleClick(index) {
    setCurrentIndex(index);
  }

  return (
    <div className="carousel">
      <div className="scoreboards">
        <button onClick={prevSlide} className="slider-control prevSlider">
          <BsChevronCompactLeft />
        </button>
        <ul className="sb-container">{slides[currentIndex]}</ul>
        <button onClick={nextSlide} className="slider-control nextSlider">
          <BsChevronCompactRight />
        </button>
      </div>
      <ul className="carousel-nav">{circles}</ul>
    </div>
  );
}

export default Carousel;
