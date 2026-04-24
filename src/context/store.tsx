import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice.js";
import timeReducer from "./timeSlice.js";
import userReducer from "./userSlice.js";
import navReducer from "./navSlice.js";
import projectReducer from "./projectSlice.js";
import soumita from "../assets/soumita.json" with { type: "json" };

const userData = soumita;
const preloadedState = {
  appTheme: { theme: "light" as const },
  appTime: { currentTime: "..." },
  userData: userData,
};
const Store = configureStore({
  reducer: {
    appTheme: themeReducer,
    appTime: timeReducer,
    userData: userReducer,
    navData: navReducer,
    projectData: projectReducer,
  },
  preloadedState,
});
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
export default Store;
