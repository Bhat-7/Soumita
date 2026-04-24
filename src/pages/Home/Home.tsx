import "./Home.css";
import { type RootState } from "../../context/store.js";
import { useSelector } from "react-redux";
import DownloadButton from "../../components/DownloadButton/DownloadButton";

const Home = () => {
  const homeSection = useSelector(
    (state: RootState) => (state as any).userData.data.homeSection,
  );

  return (
    <section
      id="home"
      className="home-wrapper container flex flex-col justify-center items-center py-32 md:pt-20 lg:pt-20 gap-5 md:flex-row lg:flex-row mx-auto"
    >
      <article className="home-content flex-1 flex flex-col gap-5 text-start">
        <p className="article-paragraph">Hi, I'm </p>
        <h1 className="home-heading">
          <span className="home-name">{homeSection.name}</span>{" "}
          <span className=" home-name wave">👋</span>
        </h1>

        <p className="article-paragraph uppercase font-bold">
          {homeSection.description[0]}
        </p>
        <p className="article-paragraph">{homeSection.description[1]}</p>

        <div className="flex flex-row gap-1 mt-5">
          <DownloadButton className="home-button" />
        </div>
      </article>
      <div className="section-image">
        <img
          src={homeSection.profilePicture}
          alt="Debayan Sen"
          className="main-picture"
          fetchPriority="high"
        />
      </div>
    </section>
  );
};

export default Home;
