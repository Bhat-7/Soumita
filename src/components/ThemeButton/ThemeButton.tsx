import { useEffect } from "react";
import "./ThemeButton.css";
import IconComponent from "../IconComponent/IconComponent.js";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../../context/store.js";
import { toggle } from "../../context/themeSlice.js";

const ThemeButton = () => {
  const themeState = useSelector((state: RootState) => state.appTheme.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    if (themeState === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "light";
    }
  }, [themeState]);

  const toggleTheme = () => {
    dispatch(toggle());
  };

  return (
    <button
      className="flex items-center justify-center rounded-full w-[35px] h-[35px] cursor-pointer border-none bg-transparent"
      onClick={toggleTheme}
    >
      {themeState === "dark" ? (
        <IconComponent
          imageSrc="../assets/icons/half-moon.svg"
          imageText="Dark Theme"
        />
      ) : (
        <IconComponent
          imageSrc="../assets/icons/sun-light.svg"
          imageText="Light Theme"
        />
      )}
    </button>
  );
};

export default ThemeButton;
