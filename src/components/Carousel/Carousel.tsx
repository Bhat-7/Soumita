import "./Carousel.css";
import { useState } from "react";
import IconComponent from "../IconComponent/IconComponent.js";

const Carousel = ({
  className,
  imageSet = [],
}: {
  className: string;
  imageSet: string[];
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imageSet.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageSet.length - 1 : prevIndex - 1,
    );
  };

  return (
    <div
      className={`${className} carousel-container p-1 flex flex-row items-center justify-center md:p-3 lg:p-3`}
    >
      {imageSet.length > 1 && (
        <button onClick={prevSlide} className="left-arrow">
          <IconComponent
            imageSrc="../assets/icons/prev-arrow.svg"
            imageText="Previous Arow"
          />
        </button>
      )}

      <div className="carousel-wrapper">
        <div
          className="carousel-content"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {imageSet.map((item, index) => (
            <div className="carousel-item" key={index}>
              <img key={index} src={item} alt="" />
              {/* {item} */}
            </div>
          ))}
        </div>
      </div>

      {imageSet.length > 1 && (
        <button onClick={nextSlide} className="right-arrow">
          <IconComponent
            imageSrc="../assets/icons/next-arrow.svg"
            imageText="Next Arow"
          />
        </button>
      )}
    </div>
  );
};

export default Carousel;
