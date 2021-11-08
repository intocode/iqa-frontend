import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { find } from 'styled-components/test-utils';

export const fetchQuestions = createAsyncThunk(
  'questions/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/questions');

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const questionsSlice = createSlice({
  name: 'questions',
  initialState: {
    questions: [],
    loading: false,
    error: '',
  },
  extraReducers: {
    [fetchQuestions.pending]: (state) => {
      state.loading = true;
    },
    [fetchQuestions.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
  },
});

const selectQuestionsAll = (state) => state.questions;

export const selectQuestionById = (id) =>
  createSelector(selectQuestionsAll, ({ questions }) =>
    questions.find((question) => question._id === id)
  );

export default questionsSlice.reducer;
