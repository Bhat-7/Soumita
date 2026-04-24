import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type ProjectExperience } from "../pages/Projects/Project.js";

export interface ProjectData {
  data: ProjectExperience | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProjectData = {
  data: null,
  loading: false,
  error: null,
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProject: (state, action: PayloadAction<ProjectExperience>) => {
      state.data = action.payload;
      state.error = null;
    },
  },
});

// exported actions for components to dispatch
export const { setProject } = projectSlice.actions;

// the slice reducer will be added to the store
export default projectSlice.reducer;
