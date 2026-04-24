import React from "react";
import IconComponent from "../IconComponent/IconComponent.js";

const Breadcrumb = ({
  className = "",
  path = "",
  route = "",
}: {
  className: string;
  path: string | undefined;
  route: string;
}) => {
  return (
    <div className={`breadcrumb flex flex-row items-start ${className}`}>
      <a href={route}>
        <IconComponent imageSrc="../assets/icons/home.svg" imageText="Home" />
      </a>
      &nbsp;/&nbsp;{path}
    </div>
  );
};

export default Breadcrumb;
