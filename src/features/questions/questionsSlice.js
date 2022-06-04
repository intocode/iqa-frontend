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

export const fetchQuestionsByTag = createAsyncThunk(
  'questions/fetchByTag',
  async (tagId, thunkAPI) => {
    try {
      const response = await axios.get(`tags/${tagId}/questions`);

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

export const removeQuestionById = createAsyncThunk(
  'questions/removeById',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`/questions/${id}/delete`);

      return { questionId: id };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const restoreQuestionById = createAsyncThunk(
  'questions/restoreById',
  async (id, thunkAPI) => {
    try {
      await axios.patch(`/questions/${id}/restore`);

      return { questionId: id };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchDeletedQuestions = createAsyncThunk(
  'questions/fetchDeleted',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/questions/deleted');

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
    deletedQuestions: [],
    openedQuestion: null,
    loading: false,
    processingRate: false,
    error: '',
    success: false,
    deletingQuestions: [],
    restoringQuestions: [],
  },
  reducers: {
    resetStatus: (state) => {
      state.error = '';
    },
    resetSuccess: (state) => {
      state.success = false;
    },
    resetQuestions: (state) => {
      state.questions = [];
    },
    resetDeletedQuestions: (state) => {
      state.deletedQuestions = [];
    },
  },
  extraReducers: {
    [fetchQuestions.pending]: (state) => {
      state.loading = true;
      state.questions = [];
    },
    [fetchQuestions.fulfilled]: (state, action) => {
      state.loading = false;
      state.questions = action.payload;
    },

    [fetchQuestionsByTag.pending]: (state) => {
      state.loading = true;
      state.questions = [];
    },
    [fetchQuestionsByTag.fulfilled]: (state, action) => {
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

    [removeQuestionById.pending]: (state, action) => {
      state.deletingQuestions.push(action.meta.arg);
    },
    [removeQuestionById.fulfilled]: (state, action) => {
      state.deletedQuestions = state.deletedQuestions.filter(
        (question) => question._id !== action.payload.questionId
      );
      state.deletingQuestions = state.deletingQuestions.filter(
        (id) => id !== action.meta.arg
      );
      state.questions = state.questions.map((item) => {
        if (item._id === action.payload.questionId) {
          // eslint-disable-next-line no-param-reassign
          item.deleted = true;
        }
        return item;
      });
      state.deletedQuestions = state.deletedQuestions.map((item) => {
        if (item._id === action.payload.questionId) {
          // eslint-disable-next-line no-param-reassign
          item.deleted = true;
        }
        return item;
      });
    },

    [restoreQuestionById.pending]: (state, action) => {
      state.restoringQuestions.push(action.meta.arg);
    },
    [restoreQuestionById.fulfilled]: (state, action) => {
      state.deletedQuestions = state.deletedQuestions.filter(
        (question) => question._id !== action.payload.questionId
      );
      state.restoringQuestions = state.restoringQuestions.filter(
        (id) => id !== action.meta.arg
      );
      state.questions = state.questions.map((item) => {
        if (item._id === action.payload.questionId) {
          // eslint-disable-next-line no-param-reassign
          item.deleted = false;
        }
        return item;
      });
      state.deletedQuestions = state.deletedQuestions.map((item) => {
        if (item._id === action.payload.questionId) {
          // eslint-disable-next-line no-param-reassign
          item.deleted = false;
        }
        return item;
      });
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

    [fetchDeletedQuestions.pending]: (state) => {
      state.loading = true;
      state.deletedQuestions = [];
    },
    [fetchDeletedQuestions.fulfilled]: (state, action) => {
      state.loading = false;
      state.deletedQuestions = action.payload;
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

export const selectDeletingQuestions = createSelector(
  selectQuestionsState,
  (state) => state.deletingQuestions
);

export const selectRestoringQuestions = createSelector(
  selectQuestionsState,
  (state) => state.restoringQuestions
);

export const selectDeletedQuestions = createSelector(
  selectQuestionsState,
  (state) => state.deletedQuestions
);

export const {
  resetStatus,
  resetSuccess,
  resetQuestions,
  resetDeletedQuestions,
} = questionsSlice.actions;

export default questionsSlice.reducer;
