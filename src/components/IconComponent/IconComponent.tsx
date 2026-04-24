import React from "react";

type IconComponentProps = {
  imageSrc: string;
  imageText: string;
  className?: string;
};

const IconComponent = ({
  imageSrc,
  imageText,
  className,
}: IconComponentProps) => {
  return (
    <img
      className={`${className ? className : ""} w-6 h-6`}
      src={imageSrc}
      alt={imageText}
    />
  );
};

export default IconComponent;
