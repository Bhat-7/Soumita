import { createSlice } from '@reduxjs/toolkit';
import portfolioData from '../assets/portfolioData.json';

const initialState = {
    // Defaulting to false so the light theme is the first display
    isDarkMode: false,
    isAudioPlaying: false,
    portfolioData: portfolioData,
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.isDarkMode = !state.isDarkMode;
            // We will handle applying the 'dark' class to the HTML root in a wrapper component or hook
        },
        toggleAudio: (state) => {
            state.isAudioPlaying = !state.isAudioPlaying;
        },
        setAudioState: (state, action) => {
            // Fallback explicitly to set audio state if needed programmatically
            state.isAudioPlaying = action.payload;
        }
    },
});

// Action creators are generated for each case reducer function
export const { toggleTheme, toggleAudio, setAudioState } = uiSlice.actions;

export default uiSlice.reducer;