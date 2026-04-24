import "./About.css";

import { useSelector } from "react-redux";
import { type RootState } from "../../context/store";
import useDeviceType from "../../utility/useDeviceType";
import { Heading } from "../../components";

type AboutProps = {
  data: {
    aboutSection: { title: string; description: string };
  };
};

const About = () => {
  const aboutSection = useSelector(
    (state: RootState) => (state as any).userData.data.aboutSection,
  );
  const deviceType = useDeviceType();

  const figureArea = () => {
    return (
      <div className="section-image">
        {deviceType !== "mobile" && (
          <img
            src={aboutSection.profilePicture}
            alt="Debayan Sen"
            className="main-picture"
          />
        )}
      </div>
    );
  };

  const articleArea = () => {
    return (
      <article className="about-content">
        <div className="about-description">
          {aboutSection.description.map((desc: string, index: number) => (
            <p key={index} className="article-paragraph">
              {desc}
            </p>
          ))}
        </div>
      </article>
    );
  };

  return (
    <section
      id="about"
      className="about-wrapper container flex flex-col justify-center items-center gap-5 pt-20 md:pt-25 lg:pt-25 mx-auto"
    >
      <Heading title={aboutSection.title} />
      <br />
      <div className="flex flex-row w-full justify-between">
        {deviceType !== "mobile" && figureArea()}
        {articleArea()}
      </div>
    </section>
  );
};

export default About;
