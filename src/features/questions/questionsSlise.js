import axios from 'axios';
import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';

export const addQuestion = createAsyncThunk(
  'questions/add',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post('/questions', data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
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
  reducers: {
    resetStatus: (state) => {
      state.error = '';
    },
  },
  extraReducers: {
    [addQuestion.pending]: (state) => {
      state.loading = true;
    },
    [addQuestion.fulfilled]: (state, action) => {
      state.questions.push(action.payload);
      state.error = '';
      state.loading = false;
    },
    [addQuestion.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

const selectQuestionsAll = (state) => state.questions;

export const selectQuestionsLoading = createSelector(
  selectQuestionsAll,
  ({ loading }) => loading
);

export const selectQuestionsError = createSelector(
  selectQuestionsAll,
  ({ error }) => error
);

export const selectQuestions = createSelector(
  selectQuestionsAll,
  ({ questions }) => questions
);

export const { resetStatus } = questionsSlice.actions;

export default questionsSlice.reducer;
