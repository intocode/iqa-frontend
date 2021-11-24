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
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addRate = createAsyncThunk('rate/add', async (data, thunkAPI) => {
  try {
    const response = await axios.post(`/questions/${data.id}/rate`, data);

    return { data: response.data, questionId: data.id };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const questionsSlice = createSlice({
  name: 'questions',
  initialState: {
    questions: [],
    loading: false,
    error: '',
    success: false,
  },
  reducers: {
    resetStatus: (state) => {
      state.error = '';
    },
    resetSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: {
    [fetchQuestions.pending]: (state) => {
      state.loading = true;
    },
    [fetchQuestions.fulfilled]: (state, action) => {
      state.loading = false;
      state.questions = action.payload;
    },

    [addQuestion.pending]: (state) => {
      state.loading = true;
      state.success = false;
    },
    [addQuestion.fulfilled]: (state, action) => {
      state.questions.push(action.payload);
      state.success = true;
      state.error = '';
      state.loading = false;
    },
    [addQuestion.rejected]: (state, action) => {
      state.error = JSON.stringify(action.payload.errors);
      state.loading = false;
    },

    [addRate.pending]: (state) => {
      state.loading = true;
    },
    [addRate.fulfilled]: (state, action) => {
      state.questions.map((item) => {
        if (item._id === action.payload.questionId) {
          // eslint-disable-next-line no-param-reassign
          item.rates = action.payload.data;
        }
        return item;
      });
      state.error = '';
      state.loading = false;
    },
    [addRate.rejected]: (state, action) => {
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

export const selectQuestionsSuccess = createSelector(
  selectQuestionsState,
  (state) => state.success
);

export const selectQuestionsError = createSelector(
  selectQuestionsState,
  (state) => state.error
);

export const selectQuestions = createSelector(
  selectQuestionsState,
  (state) => state.questions
);

export const { resetStatus, resetSuccess } = questionsSlice.actions;

export default questionsSlice.reducer;
