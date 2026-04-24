import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../context/store";

const Heading = ({
  title = "",
  template = 1,
  className = "",
}: {
  template?: number;
  title: string | undefined;
  className?: string;
}) => {
  const themeState = useSelector((state: RootState) => state.appTheme.theme);
  const template1 = () => {
    return (
      <>
        <span className="grow border-t border-gray-300"></span>
        <span
          className={`shrink mx-4 text-sm md:text-sm lg:text-xl tracking-[0.2em] ${themeState === "dark" ? "text-[var(--text-color)]" : ""} ${className ? className : ""}`}
        >
          {title && title.toUpperCase()}
        </span>
        <span className="grow border-t border-gray-300"></span>
      </>
    );
  };

  const template2 = () => {
    return (
      <>
        <span
          className={`shrink mx-4 tracking-[0.2em] font-mono mb-1.5 ${themeState === "dark" ? "text-[var(--text-color)]" : ""} ${className ? className : ""}`}
        >
          {title && title.toUpperCase()}
        </span>
      </>
    );
  };

  return (
    <span className="heading-wrapper flex w-full items-center">
      {template == 1 ? template1() : template2()}
    </span>
  );
};

export default Heading;
