import React from "react";
import { type CareerExperience } from "../../pages/Projects/Project.js";
import "./CareerCard.css";

interface CareerDataProps {
  careerData: CareerExperience;
}

const CareerCard = ({ careerData }: CareerDataProps) => {
  const { companyName, companyLogo, role, location, startDate, endDate } =
    careerData;

  return (
    <section className="careerCard flex flex-col">
      <figure>
        <img src={companyLogo} alt={companyName} />
      </figure>
      <p>{role}</p>
      <p>
        {startDate} - {endDate}
      </p>
      <p>{location}</p>
    </section>
  );
};

export default CareerCard;
