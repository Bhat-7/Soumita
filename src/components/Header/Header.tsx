import React, { useState } from "react";
import "./Header.css";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { useSelector } from "react-redux";
import type { RootState } from "../../context/store";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const themeState = useSelector((state: RootState) => state.appTheme.theme);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const spanClass =
    "w-full h-[3px] bg-[var(--primary-color)] group-hover:bg-[var(--primary-color-hover)] rounded-[2px] transition-all duration-300 ease-in-out block";

  return (
    <header
      className={`flex flex-row items-center md:items-baseline justify-between flex-1 gap-4 md:gap-2 fixed inset-x-0 top-0 z-[1000] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.1)] h-auto ${themeState}`}
    >
      <h2
        className={`hero-title text-[1.3em] sm:text-[2.4em] md:text-[3.2em] leading-[1.1] m-4 text-center sm:text-left ${themeState === "dark" ? "text-[var(--navLink-color)]" : "text-black"}`}
      >
        Debayan Sen
      </h2>
      <div className="flex flex-row flex-nowrap items-center">
        <div className="flex flex-row gap-6">
          <Navbar />
          <button
            className="group flex md:hidden flex-col bg-transparent border-none cursor-pointer p-0 w-[30px] h-[24px] gap-[5px] absolute right-2.5 top-1/2 -translate-y-1/2 sm:static sm:translate-y-0"
            onClick={toggleSidebar}
            aria-label="Toggle navigation menu"
          >
            <span
              className={`${spanClass} ${sidebarOpen ? "rotate-45 translate-x-[10px] translate-y-[10px]" : ""}`}
            ></span>
            <span
              className={`${spanClass} ${sidebarOpen ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`${spanClass} ${sidebarOpen ? "-rotate-45 translate-x-[8px] -translate-y-[8px]" : ""}`}
            ></span>
          </button>
          <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        </div>
      </div>
    </header>
  );
};

export default Header;
