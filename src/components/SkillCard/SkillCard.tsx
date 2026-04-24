import React from "react";
import { IconComponent, Ratings } from "..";

export interface Skill {
  skill_image: string;
  skill: string;
  rating: number;
}

export interface SkillCategory {
  categoryTitle: string;
  technologies: Skill[];
}

const SkillCard = ({
  skillDetails,
  showRatings = false,
}: {
  skillDetails: Skill;
  showRatings?: boolean;
}) => {
  const { skill_image, skill, rating } = skillDetails;

  return (
    <div className="skill-item flex flex-col items-center justify-center gap-1">
      <div className="flex flex-col md:flex-row items-center gap-2">
        <IconComponent
          imageSrc={skill_image}
          imageText={skill}
          className="skill-image"
        />
        <span className="skill-name">{skill}</span>
      </div>
      {showRatings && (
        <div className="skills-rating">
          <Ratings ratingCount={rating} />
        </div>
      )}
    </div>
  );
};

export default SkillCard;
