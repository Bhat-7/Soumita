import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router";
import { ThemeButton, TimeComponent, AudioPlayer } from "../index.js";
import type { RootState } from "../../context/store";
import type { NavLink as Navlinks } from "../../context/navSlice";
import "./Navbar.css";

const Navbar = ({
  extraButtons = true,
  className,
  theme = "light",
}: {
  extraButtons?: boolean;
  className?: string;
  theme?: string;
}) => {
  const { links } = useSelector((state: RootState) => state.navData);
  const location = useLocation();

  // Handle smooth scrolling when navigating from a different route
  useEffect(() => {
    if (location.hash) {
      // A small timeout ensures the new page's DOM is fully rendered before scrolling
      setTimeout(() => {
        const id = location.hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

  return (
    <div className="hidden md:flex flex-wrap justify-center items-end gap-2 md:gap-3 lg:gap-4 mx-2.5 my-px">
      {links.map((link: Navlinks) => {
        const hashIndex = link.href.indexOf("#");
        const isHashLink = hashIndex !== -1;

        // Check if the current URL hash matches the link's hash.
        // We also fall back to making 'Home' active if there is no hash and we're at the root.
        const isActive = isHashLink
          ? location.hash === link.href.substring(hashIndex) ||
            (link.name === "Home" &&
              location.hash === "" &&
              location.pathname === "/")
          : location.pathname === link.href;

        const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
          if (isHashLink) {
            const id = link.href.substring(hashIndex + 1);
            const element = document.getElementById(id);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }
        };

        const classValues = className
          ? `text-[var(${className})] hover:text-[var(${className})]`
          : "text-[var(--navLink-color)] hover:text-[var(--navLink-hover-color)]";

        return (
          <NavLink
            key={link.name}
            to={link.href}
            onClick={handleSmoothScroll}
            className={`${classValues} hover:font-bold font-medium whitespace-nowrap text-[0.85em] md:text-[1em] lg:text-[1.2em] p-2 md:p-0 ${isActive ? "active-link font-bold text-[var(--navLink-hover-color)" : ""}`}
          >
            {link.name.toUpperCase()}
          </NavLink>
        );
      })}
      {extraButtons && (
        <div
          className={
            "text-[var(--color-black)] flex flex-row gap-0.5 items-center mx-1 border border-[#d6cfc2] rounded-[20px]"
          }
        >
          <TimeComponent />
          <ThemeButton />
          <AudioPlayer />
        </div>
      )}
    </div>
  );
};

export default Navbar;
