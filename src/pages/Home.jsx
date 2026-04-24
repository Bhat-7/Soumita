import React from "react";
import portfolioData from "../assets/portfolioData.json";
import Hero from "../components/Hero";
import ExperienceTimeline from "../components/ExperienceTimeline";
import SkillsGrid from "../components/SkillsGrid";
import ReviewCarousel from "../components/ReviewCarousel";
import ContactForm from "../components/ContactForm";
import PersonalInterests from "../components/PersonalInterests";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen space-y-16 relative">
      {/* Landing Space Backdrops (Full bleed, masked to fade out) */}
      <div className="absolute -top-24 left-1/2 w-screen -translate-x-1/2 h-[90vh] pointer-events-none z-0 overflow-hidden [mask-image:linear-gradient(to_bottom,black_30%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_30%,transparent_100%)]">
        {/* Light Mode: Cherry Blossoms GIF */}
        <img
          src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzE1Y2lmbWYzbXQyeDV4NzAzZWVyMWtnNjJpYjFtZnZueTltdGY5ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ovWn8N8TVg8hi/giphy.gif"
          alt="Cherry Blossoms"
          className="w-full h-full object-cover opacity-75 dark:hidden mix-blend-multiply"
        />
        {/* Dark Mode: Starry Night GIF */}
        <img
          src="https://media.giphy.com/media/U3qYN8S0j3bpK/giphy.gif"
          alt="Starry Night"
          className="w-full h-full object-cover opacity-[0.15] hidden dark:block mix-blend-screen"
        />
      </div>

      {/* Main Content Wrapper (z-10 ensures it stays above the backdrop) */}
      <div className="relative z-10 flex flex-col space-y-16">
        <Hero personal={portfolioData.personal} />
        <ExperienceTimeline experiences={portfolioData.experience} />
        <SkillsGrid skills={portfolioData.skills} />
        <ReviewCarousel recommendations={portfolioData.recommendations} />
        <ContactForm />
        <PersonalInterests interests={portfolioData.personal_interests} />
      </div>
    </div>
  );
};

export default Home;
