import React from "react";
import IconComponent from "../IconComponent/IconComponent.js";

const Ratings = ({ ratingCount = 0 }: { ratingCount: number }) => {
  const stars = () => {
    const arr = [];
    for (let i = 0; i < ratingCount; i++) {
      arr.push(
        <IconComponent
          key={i}
          imageSrc="../assets/icons/star.svg"
          imageText="rate1"
        />,
      );
    }
    return arr;
  };

  return <div className="flex flex-row">{ratingCount > 0 && stars()}</div>;
};

export default Ratings;
