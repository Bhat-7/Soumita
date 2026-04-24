import { createSlice } from "@reduxjs/toolkit";

export interface NavLink {
  name: string;
  href: string;
}

export interface NavState {
  links: NavLink[];
  loading: boolean;
  error: string | null;
}

const initialState: NavState = {
  links: [
    { name: "Home", href: "/#home" },
    { name: "About", href: "/#about" },
    { name: "Skills", href: "/#skills" },
    { name: "Experience", href: "/#experience" },
    { name: "Projects", href: "/#projects" },
    { name: "WIP", href: "/#wip" },
    // { name: "Creativity", href: "/creativity" },
    { name: "Contact", href: "/#contact" },
  ],
  loading: false,
  error: null,
};

const navSlice = createSlice({
  name: "navData",
  initialState,
  reducers: {},
});

export const {} = navSlice.actions;
export default navSlice.reducer;
