import { useSelector } from "react-redux";
import { Heading, SkillCard } from "../../components";
import "./Skills.css";
import { type RootState } from "../../context/store.js";
interface Skill {
  skill_image: string;
  skill: string;
  rating: number;
}

interface SkillCategory {
  categoryTitle: string;
  technologies: Skill[];
}

interface SkillsSection {
  title: string;
  description: string;
  catergories: SkillCategory[];
}

interface SkillsProps {
  skillsSections: SkillsSection;
}

const Skills = () => {
  const skillsSections: SkillsSection = useSelector(
    (state: RootState) => (state as any).userData.data.skillsSections,
  );
  const { title, catergories, description } = skillsSections;

  const renderSkills = (catergories: SkillCategory[]) => {
    if (catergories.length < 1) {
      return <p>No skills available.</p>;
    }

    return catergories.map((category, index) => (
      <div key={index} className="skill-categories p-1">
        <Heading title={category.categoryTitle} template={2} />
        <div className="skills-category-list grid grid-cols-2 md:flex md:flex-row md:flex-wrap gap-4">
          {category.technologies.map((item, skillIndex) => (
            <SkillCard
              key={skillIndex}
              skillDetails={item}
              showRatings={true}
            />
          ))}
        </div>
      </div>
    ));
  };

  return (
    <section
      id="skills"
      className="skills-wrapper container flex flex-col justify-start items-start pt-20 md:pt-25 lg:pt-25 gap-5 mx-auto"
    >
      <Heading title={title} />
      <br />
      <p className="article-paragraph">{description}</p>
      {renderSkills(catergories)}
    </section>
  );
};

export default Skills;
