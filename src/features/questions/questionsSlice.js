import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { clearTags } from '../tags/tagsSlice';

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

export const fetchQuestionById = createAsyncThunk(
  'questions/fetchById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/questions/${id}`);

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

      thunkAPI.dispatch(clearTags());

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addRate = createAsyncThunk('rate/add', async (data, thunkAPI) => {
  try {
    const response = await axios.post(`/questions/${data.id}/rate`, data);

    return { rates: response.data, questionId: data.id };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const questionsSlice = createSlice({
  name: 'questions',
  initialState: {
    questions: [],
    openedQuestion: null,
    loading: false,
    processingRate: false,
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

    [fetchQuestionById.pending]: (state) => {
      state.loading = true;
    },
    [fetchQuestionById.fulfilled]: (state, action) => {
      state.loading = false;
      state.openedQuestion = action.payload;
    },

    [addQuestion.pending]: (state) => {
      state.loading = true;
      state.success = false;
    },
    [addQuestion.fulfilled]: (state, action) => {
      state.questions.push(action.payload.question);
      state.success = true;
      state.error = '';
      state.loading = false;
    },
    [addQuestion.rejected]: (state, action) => {
      state.error = JSON.stringify(action.payload.errors);
      state.loading = false;
    },

    [addRate.pending]: (state) => {
      state.processingRate = true;
    },
    [addRate.fulfilled]: (state, action) => {
      if (state.questions.length !== 0) {
        state.questions.forEach((item) => {
          if (item._id === action.payload.questionId) {
            // eslint-disable-next-line no-param-reassign
            item.rates = action.payload.rates;
          }
          return item;
        });
      } else {
        state.openedQuestion.rates = action.payload.rates;
      }
      state.error = '';
      state.processingRate = false;
    },
    [addRate.rejected]: (state, action) => {
      state.error = action.error;
      state.processingRate = false;
    },
  },
});

const selectQuestionsState = (state) => state.questions;
const selectOneQuestionState = (state) => state.openedQuestion;

export const selectQuestionById = (id) =>
  createSelector([selectQuestionsState, selectOneQuestionState], (state) => {
    if (state.questions.length !== 0) {
      return state.questions.find((question) => question._id === id);
    }
    return state.openedQuestion;
  });

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

export const selectOpenedQuestion = createSelector(
  selectQuestionsState,
  (state) => state.openedQuestion
);

export const { resetStatus, resetSuccess } = questionsSlice.actions;

export default questionsSlice.reducer;
