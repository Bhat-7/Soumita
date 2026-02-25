import Avatar from "../../components/Avatar/Avatar";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-wrapper">
      <div className="home-content">
        <h1>Hi! Soumita Bhattacharya Sen</h1>{" "}
        <Avatar profileImage="https://media.licdn.com/dms/image/v2/D5603AQFYQ9zZtVOQAQ/profile-displayphoto-scale_200_200/B56ZhFj32dG0Ak-/0/1753513693047?e=1773878400&v=beta&t=07F_TWYIob1Baorud555_Un8fqCKY9q_fFR00hbfRSE" />
        <p>
          I'm a passionate data analyst with expertise in data visualization,
          statistical analysis, and machine learning.
        </p>
      </div>
    </div>
  );
};

export default Home;
