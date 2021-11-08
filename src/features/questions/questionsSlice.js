import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';

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
    [fetchQuestions.pending]: (state) => {
      state.loading = true;
    },
    [fetchQuestions.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
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

const selectQuestionsState = (state) => state.questions;

export const selectQuestionById = (id) =>
  createSelector(selectQuestionsState, (state) =>
    state.questions.find((question) => question._id === id)
  );

export const selectQuestionsLoading = createSelector(
  selectQuestionsState,
  (state) => state.loading
);

export const selectQuestionsError = createSelector(
  selectQuestionsState,
  (state) => state.error
);

export const selectQuestions = createSelector(
  selectQuestionsState,
  (state) => state.questions
);

export const { resetStatus } = questionsSlice.actions;

export default questionsSlice.reducer;
