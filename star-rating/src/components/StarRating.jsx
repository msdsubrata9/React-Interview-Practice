import React, { useState } from "react";
import Start from "../assets/star.png";

const NUMBER_OF_STARS = 5;

function StarRating({ value = 0, onChange, numberOfStars = NUMBER_OF_STARS }) {
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [clickedIndex, setClickedIndex] = useState(value - 1);

  function handleClick(index) {
    return () => {
      setClickedIndex(index);
      onChange(index + 1);
    };
  }

  function handleMouseEnter(index) {
    return () => {
      setHoveredIndex(index);
    };
  }

  function handleMouseLeave() {
    setHoveredIndex(-1);
  }

  return (
    <div className="star_rating">
      {[...new Array(numberOfStars)].map((_, index) => {
        let className = "";
        if (index <= clickedIndex) {
          className = "active";
        }
        if (index <= hoveredIndex) {
          className += " hovered";
        }
        return (
          <button
            className={className}
            key={index}
            onClick={handleClick(index)}
            onMouseEnter={handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <img src={Start} alt="Start Image" />
          </button>
        );
      })}
    </div>
  );
}

export default StarRating;
