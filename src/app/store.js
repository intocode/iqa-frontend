import { configureStore } from '@reduxjs/toolkit';
import profile from '../features/profile/profileSlice';

export const store = configureStore({
  reducer: {
    profile,
  },
});
