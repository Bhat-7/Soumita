// src/context/themeSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ThemeState = {
  theme: "light" | "dark";
};

const initialState: ThemeState = {
  theme: "light",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setLight(state) {
      state.theme = "light";
    },
    setDark(state) {
      state.theme = "dark";
    },
    toggle(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    // example of a payload action:
    setTheme(state, action: PayloadAction<ThemeState["theme"]>) {
      state.theme = action.payload;
    },
  },
});

// exported actions for components to dispatch
export const { setLight, setDark, toggle, setTheme } = themeSlice.actions;

// the slice reducer will be added to the store
export default themeSlice.reducer;
