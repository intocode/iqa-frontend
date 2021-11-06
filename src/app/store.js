import { configureStore } from '@reduxjs/toolkit';
import profile from '../features/profile/profileSlice';
import questions from '../features/questions/questionSlice';

export const store = configureStore({
  reducer: {
    profile,
    questions,
  },
});
