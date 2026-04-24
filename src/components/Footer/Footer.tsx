import "./Footer.css";
import { SocialLinks, Navbar } from "../index";
import type { RootState } from "../../context/store";
import { useSelector } from "react-redux";

const Footer = () => {
  const themeState = useSelector((state: RootState) => state.appTheme.theme);
  return (
    <footer className="footer-wrapper container flex flex-col items-center w-full justify-center py-5 mt-1 gap-2">
      <Navbar
        extraButtons={false}
        theme={themeState}
        className={themeState === "dark" ? "--text-color" : ""}
      />
      <hr className="hr m-2 w-full" />
      <div className="flex flex-col md:flex-row lg:flex-row w-full md:justify-between lg:justify-between items-center">
        <p className="footer-text">
          &copy; 2026 Designed and Built with ❤️ by Debayan Sen. All rights
          reserved.
        </p>
        <SocialLinks showDisplayName={false} section="footer" />
      </div>
    </footer>
  );
};

export default Footer;
