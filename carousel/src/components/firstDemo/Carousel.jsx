import React, { useEffect, useRef, useState } from "react";

function Carousel({ children }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselBoxRef = useRef();
  const intervalRef = useRef(0);

  useEffect(() => {
    const { slides } = getSlidesInfo();
    slides[0].setAttribute("data-active", "true");

    startSlider();
  }, []);

  function startSlider() {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const { slides, count } = getSlidesInfo();

        const newIndex = prev === count - 1 ? 0 : prev + 1;

        // slides[prev].classList.remove("show");
        // slides[prev].classList.add("hide");

        // slides[newIndex].classList.remove("hide");
        // slides[newIndex].classList.add("show");
        [...slides].forEach((slide, index) => {
          slide.setAttribute("data-active", index === newIndex);
          slide.setAttribute(
            "aria-hidden",
            index === newIndex ? "false" : "true"
          );
        });

        return newIndex;
      });
    }, 3000);
  }

  function handlePrevious(event) {
    clearInterval(intervalRef.current);
    const { slides, count } = getSlidesInfo();
    const newIndex = currentIndex === 0 ? count - 1 : currentIndex - 1;

    event.target.setAttribute("aria-controls", `slideImg${newIndex}`);

    [...slides].forEach((slide, index) => {
      slide.setAttribute("data-active", index === newIndex);
      slide.setAttribute("aria-hidden", index === newIndex ? "false" : "true");
    });
    startSlider();
    setCurrentIndex(newIndex);
  }

  function handleNext(event) {
    clearInterval(intervalRef.current);
    const { slides, count } = getSlidesInfo();
    const newIndex = currentIndex === count - 1 ? 0 : currentIndex + 1;

    event.target.setAttribute("aria-controls", `slideImg${newIndex}`);

    [...slides].forEach((slide, index) => {
      slide.setAttribute("data-active", index === newIndex);
      slide.setAttribute("aria-hidden", index === newIndex ? "false" : "true");
    });
    startSlider();
    setCurrentIndex(newIndex);
  }
  function getSlidesInfo() {
    const carouselBox = carouselBoxRef.current;
    const slides = carouselBox.children;
    const count = slides.length;
    return { slides, count };
  }
  function handleStepperClick(newIndex) {
    return () => {
      clearInterval(intervalRef.current);
      const { slides } = getSlidesInfo();

      [...slides].forEach((slide, index) => {
        slide.setAttribute("data-active", index === newIndex);
        slide.setAttribute(
          "aria-hidden",
          index === newIndex ? "false" : "true"
        );
      });

      startSlider();
      setCurrentIndex(newIndex);
    };
  }
  function handleMouseEnter() {
    clearInterval(intervalRef.current);
  }
  function handleMouseLeave() {
    startSlider();
  }
  return (
    <div className="carousel">
      {currentIndex}
      <span role="status" content="polite" id="xyz"></span>
      <section
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="box"
        aria-label="Sliding Image"
        tabIndex={0}
        ref={carouselBoxRef}
      >
        {children}
      </section>
      <button className="prev" onClick={handlePrevious}>
        Prev
      </button>
      <button className="next" onClick={handleNext}>
        Next
      </button>

      <div className="stepper">
        {Array.from(children).map((_, index) => {
          return <button onClick={handleStepperClick(index)}>{index}</button>;
        })}
      </div>
    </div>
  );
}

export default Carousel;
