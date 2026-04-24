import React from "react";
import { useSelector } from "react-redux";
import SocialLinksVariants from "./SocialLinks.variants";

import "./SocialLinks.css";
import IconComponent from "../IconComponent/IconComponent.js";

interface SocialLinksProps {
  showDisplayName?: boolean;
  section?: "footer" | "contact";
}

const SocialLinks = ({
  showDisplayName = false,
  section,
}: SocialLinksProps) => {
  const socialLinks = useSelector(
    (state: any) =>
      state.userData.data.contactSection.contactDetails.socialLinks,
  );

  const iconsLinks = () => {
    return (
      <>
        {socialLinks.map((link: any, index: number) => (
          <a
            className="social-links flex flex-row gap-3 lg:mx-8 lg:{my-3} items-center justify-center align-middle"
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconComponent
              imageSrc={link.icon}
              imageText={link.name}
              className={""}
            />
            {showDisplayName && link.displayName}
          </a>
        ))}
      </>
    );
  };

  return (
    <div className={SocialLinksVariants({ for: section })}>{iconsLinks()}</div>
  );
};

export default SocialLinks;
