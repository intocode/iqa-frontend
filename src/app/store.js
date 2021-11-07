import { configureStore } from '@reduxjs/toolkit';
import profile from '../features/profile/profileSlice';
import questions from '../features/questions/questionsSlise';

export const store = configureStore({
  reducer: {
    profile,
    questions,
  },
});
