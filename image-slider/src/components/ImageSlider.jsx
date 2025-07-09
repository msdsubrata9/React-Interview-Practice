import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function ImageSlider() {
  const images = [
    "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
    "https://piktochart.com/wp-content/uploads/2023/04/large-29.jpg",
    "https://i.pinimg.com/originals/2b/66/01/2b66016d5a1e2d230ecce59f8e673382.png",
    "https://i.pinimg.com/736x/5f/09/47/5f0947219a7f446e804e7e0055089fad.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoKMpEfmuwzKmwyl4reX0NW7-Ixgn1DCz6IvxSYpq_CQ&s",
  ];

  const [active, setActive] = useState(0);

  useEffect(() => {
    const i = setInterval(() => {
      loadNextImage();
    }, 2000);
    return () => {
      clearInterval(i);
    };
  }, []);

  const loadNextImage = () => {
    setActive((active) => (active + 1) % images.length);
  };

  const loadPrevImage = () => {
    setActive((active) => (active - 1 < 0 ? images.length - 1 : active - 1));
  };

  return (
    <div>
      <div className="imageContainer">
        <img
          src="https://cdn-icons-png.flaticon.com/512/54/54321.png"
          alt="left arrow"
          className="leftArrow"
          onClick={loadPrevImage}
        />
        <img src={images[active]} alt="wallpaper" className="image" />
        <img
          src="https://cdn-icons-png.flaticon.com/512/271/271228.png"
          alt="right arrow"
          className="rightArrow"
          onClick={loadNextImage}
        />
      </div>
    </div>
  );
}

export default ImageSlider;
