import React, { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import CarouselNavCircle from "../carouselNavCircle/CarouselNavCircle";

function Carousel({ slides }) {
  const [touchPosition, setTouchPosition] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const circles = slides.map((slide, idx) => (
    <CarouselNavCircle
      key={idx}
      handleClick={handleNavCircleClick}
      index={idx}
      currentIndex={currentIndex}
    />
  ));

  function handleTouchStart(e) {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  }

  function handleTouchMove(e) {
    const touchDown = touchPosition;
    if (touchDown === null) {
      return;
    }
    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5) {
      nextSlide();
    }

    if (diff < -5) {
      prevSlide();
    }

    setTouchPosition(null);
  }

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
      <div
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        className="scoreboards"
      >
        {currentIndex !== 0 && (
          <button onClick={prevSlide} className="slider-control prevSlider">
            <BsChevronCompactLeft />
          </button>
        )}
        <ul className="sb-container">{slides[currentIndex]}</ul>
        {currentIndex !== 2 && (
          <button onClick={nextSlide} className="slider-control nextSlider">
            <BsChevronCompactRight />
          </button>
        )}
      </div>
      <ul className="carousel-nav">{circles}</ul>
    </div>
  );
}

export default Carousel;
