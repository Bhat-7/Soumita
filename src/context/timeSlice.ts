// src/context/themeSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AppTimeState = {
  currentTime: string;
};

const initialState: AppTimeState = {
  currentTime: new Date().toISOString(),
};

export const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    setCurrentTime(state, action: PayloadAction<string>) {
      state.currentTime = action.payload;
    },
  },
});

// exported actions for components to dispatch
export const { setCurrentTime } = timeSlice.actions;

// the slice reducer will be added to the store
export default timeSlice.reducer;
