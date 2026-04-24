import { useEffect } from "react";
import "./Projects.css";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { Heading, Carousel, Breadcrumb, IconComponent } from "../../components";

const ProjectDetails = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const params = useParams();
  const { data, loading, error } = useSelector(
    (state: any) => state.projectData,
  );
  const {
    type,
    client,
    designation,
    companyName,
    description,
    technologies,
    projectImages,
    startDate,
    endDate,
    projectUrl,
    githubUrl,
    location,
  } = data;

  const locationDetails = () => (
    <>
      <IconComponent
        imageSrc="../assets/icons/location.svg"
        imageText="Location Icon"
      />
      {location}
    </>
  );

  const durationDetails = () => (
    <>
      <IconComponent
        imageSrc="../assets/icons/calender.svg"
        imageText="Calender Icon"
      />
      {startDate} - {endDate}
    </>
  );

  const infoArea = () => (
    <div className="info-area p-5 text-start w-full">
      <Heading title={params.project} template={2} className="project-title" />
      <br />

      {client && (
        <p className="project-data flex flex-row">
          <i>Client:</i>
          <Heading title={client} template={2} className="project-client" />
        </p>
      )}
      {designation && (
        <p className="project-data flex flex-row">
          <i>Designation:</i> &nbsp;{designation}
        </p>
      )}

      {companyName && (
        <p className="project-data flex flex-row">
          <i>Working with:</i> &nbsp;{companyName}
        </p>
      )}

      <p className="project-data flex flex-row">
        {location && locationDetails()}
      </p>

      {type === "cp" && (
        <p className="project-data flex flex-row">{durationDetails()}</p>
      )}

      {projectUrl && (
        <p className="project-data flex flex-row">
          <i>URL:</i> &nbsp;
          <a
            className="tracking-widest"
            href={projectUrl}
            target="_blank"
            rel="noreferrer"
          >
            {projectUrl}
          </a>
        </p>
      )}

      {githubUrl && (
        <p className="project-data flex flex-row">
          <i>URL:</i> &nbsp;
          <a
            className="tracking-widest"
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
          >
            {githubUrl}
          </a>
        </p>
      )}

      <p className="project-data">
        <i>Description:</i>
      </p>

      <ul className="description-list">
        {description.map((des: string, i: number) => (
          <li key={i}>{des}</li>
        ))}
      </ul>

      <br />

      <p className="project-data">
        <i>Technologies used:</i>
      </p>

      <ul className="flex flex-wrap gap-2">
        {technologies.map((tech: string, i: number) => (
          <li className="tech-item" key={i}>
            {tech}
          </li>
        ))}
      </ul>
    </div>
  );

  const imagesArea = () => (
    <div className="w-full">
      <Carousel className={""} imageSet={projectImages} />
    </div>
  );

  const breadCrumbPath = () => {
    return `${type === "wip" ? "/#wip" : "/#projects"}`;
  };

  return (
    <article
      id="productDetails"
      className="projectdetails-wrapper container flex flex-col pt-20 md:pt-25 lg:pt-25 gap-5 mx-auto"
    >
      <Breadcrumb
        className="w-full"
        route={breadCrumbPath()}
        path={`${type === "wip" ? "WIP" : "Projects"} / ${params.project}`}
      />
      <div className="w-full flex flex-col md:flex-row gap-6">
        {infoArea()}
        {imagesArea()}
      </div>
    </article>
  );
};

export default ProjectDetails;
