import React from "react";
import "./Sidebar.css";
import ThemeButton from "../ThemeButton/ThemeButton.js";
import TimeComponent from "../TimeComponent/TimeComponent.js";
import AudioPlayer from "../AudioPlayer/AudioPlayer.js";
import { useSelector } from "react-redux";
import { type NavLink } from "../../context/navSlice.js";
import { type RootState } from "../../context/store.js";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { links } = useSelector((state: RootState) => state.navData);

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      <div className={`sidebar-wrapper ${isOpen ? "open" : ""}`}>
        <div className="heading-app-wrapper text-[var(--color-black)] flex flex-row gap-0.5 justify-between items-center mx-1 border border-[#d6cfc2] rounded-[20px]">
          <TimeComponent />
          <ThemeButton />
          <AudioPlayer />
        </div>
        <nav className="sidebar-nav">
          {links.map((link: NavLink) => (
            <a
              key={link.name}
              href={link.href}
              className="sidebar-link text-[var(--navLink-color)] hover:text-[var(--navLink-hover-color)]"
              onClick={handleLinkClick}
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
