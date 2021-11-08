import { configureStore } from '@reduxjs/toolkit';
import profile from '../features/profile/profileSlice';
import questions from '../features/questions/questionsSlice';

export const store = configureStore({
  reducer: {
    profile,
    questions,
  },
});
