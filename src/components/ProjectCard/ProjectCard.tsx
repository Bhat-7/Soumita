import React from "react";
import "../ProjectCard/ProjectCard.css";
import { type ProjectExperience } from "../../pages/Projects/Project.js";

interface ProjectCardProps {
  projectData: ProjectExperience;
  navigateToProjectDetails?: (e: any) => void;
}

const ProjectCard = ({
  projectData,
  navigateToProjectDetails,
}: ProjectCardProps) => {
  const { title, projectThumbnail } = projectData;
  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    navigateToProjectDetails?.(projectData);
  };
  return (
    <section
      className="projectCard flex flex-col justify-center items-center"
      onClick={(e) => handleClick(e)}
    >
      <figure className="projectFigure flex flex-col justify-center items-start">
        <img className="projectThumbnail" src={projectThumbnail} alt="" />
        <figcaption>{title}</figcaption>
      </figure>
    </section>
  );
};

export default ProjectCard;
