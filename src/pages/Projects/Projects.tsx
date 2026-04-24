import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "../../context/store";
import { CareerExperience, ProjectExperience } from "./Project";
import {
  Heading,
  PlaceholderCard,
  ProjectCard,
  CareerCard,
  Spinner,
} from "../../components";
import { setProject } from "../../context/projectSlice";

interface PortfolioSectionProps<T> {
  id: string;
  title: string;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

const PortfolioSection = <T,>({
  id,
  title,
  items,
  renderItem,
}: PortfolioSectionProps<T>) => {
  if (!items || items.length === 0) return null;

  return (
    <section
      id={id}
      className="project-wrapper container flex flex-col justify-start items-start pt-20 md:pt-25 lg:pt-25 gap-5 mx-auto"
    >
      <Heading title={title} />
      <br />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center mx-auto">
        {items.map(renderItem)}
      </div>
    </section>
  );
};

const Projects = () => {
  const { data, status } = useSelector(
    (state: RootState) => (state as any).userData,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (status === "loading" || status === "idle" || !data) {
    return <Spinner />;
  }

  if (status === "failed") {
    return (
      <div className="container mx-auto flex justify-center items-center h-screen text-red-500">
        Error: Failed to load project data.
      </div>
    );
  }

  const workSection = data.workSection;
  const experiences: CareerExperience[] = workSection.experiences;
  const projects: ProjectExperience[] = workSection.projects;
  const wip: ProjectExperience[] = workSection.workinprogress;

  const navigateTo = (project: ProjectExperience) => {
    // console.log("Path: ", `/projectdetails/${project.title}`);
    dispatch(setProject(project));
    navigate(`/projectdetails/${project.title}`);
  };

  return (
    <>
      <PortfolioSection
        id="experience"
        title={workSection.title}
        items={experiences}
        renderItem={(experience) =>
          experience.companyName && (
            <CareerCard key={experience.id} careerData={experience} />
          )
        }
      />
      <PortfolioSection
        id="projects"
        title="Projects"
        items={projects}
        renderItem={(project) =>
          project.projectThumbnail && (
            <ProjectCard
              key={project.title}
              projectData={project}
              navigateToProjectDetails={navigateTo}
            />
          )
        }
      />
      <PortfolioSection
        id="wip"
        title="Work-In-Progress"
        items={wip}
        renderItem={(project) =>
          project.projectThumbnail ? (
            <ProjectCard
              key={project.title}
              projectData={project}
              navigateToProjectDetails={navigateTo}
            />
          ) : (
            <PlaceholderCard key={project.title} title={project.title} />
          )
        }
      />
    </>
  );
};

export default Projects;
