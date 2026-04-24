import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        // We can add more reducers here later if needed
    },
});