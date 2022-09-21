import {
  createAction,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { QUESTIONS_PER_PAGE } from 'app/constants';

const incrementPaginationOffset = createAction('questions/pagination/next');
export const resetQuestionsList = createAction('questions/reset');

export const fetchQuestions = createAsyncThunk(
  'questions/fetch',
  async ({ deletedOnly, favoritesOnly }, thunkAPI) => {
    const { questions } = thunkAPI.getState();
    const { pagination } = questions;

    let queryString = `limit=${pagination.limit}&offset=${pagination.offset}`;

    if (deletedOnly) {
      queryString += '&deletedOnly=true';
    }

    if (favoritesOnly) {
      queryString += '&favoritesOnly=true';
    }

    try {
      const response = await axios.get(`/questions?${queryString}`);

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
  {
    condition: (_, { getState }) => {
      const { questions } = getState();

      if (questions.fetching) {
        // уже идет загрузка, отменяем санк..
        return false;
      }

      return true;
    },
  }
);

export const fetchNextPartOfQuestions = createAsyncThunk(
  'questions/fetch/nextPart',
  async ({ deletedOnly, favoritesOnly }, { dispatch }) => {
    dispatch(incrementPaginationOffset());
    dispatch(fetchQuestions({ favoritesOnly, deletedOnly }));
  },
  {
    condition: (_, { getState }) => {
      const { questions } = getState();

      // отменяем санк если уже идет загрузка
      if (questions.fetching) {
        return false;
      }

      // отменяем санк, если данных для загрузки больше нет

      const { limit, offset, totalQuestions } = questions.pagination;

      const nextOffset = limit + offset;

      if (nextOffset >= totalQuestions) {
        return false;
      }

      return true;
    },
  }
);

export const fetchQuestionById = createAsyncThunk('questions/fetch/byId', async (id, thunkAPI) => {
  try {
    const response = await axios.get(`/questions/${id}`);

    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

// todo: добработать, исправить
export const addQuestion = createAsyncThunk('add', async (data, thunkAPI) => {
  try {
    const response = await axios.post('/questions', data);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const removeQuestionById = createAsyncThunk(
  'questions/remove/byId',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`/questions/${id}`);

      return { questionId: id };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const restoreQuestionById = createAsyncThunk(
  'questions/restore/byId',
  async (id, thunkAPI) => {
    try {
      await axios.patch(`/questions/${id}/restore`);

      return { questionId: id };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addQuestionToFavorites = createAsyncThunk(
  'questions/favorites/add',
  async ({ questionId, userId }, { rejectWithValue }) => {
    try {
      await axios.post(`/questions/${questionId}/favorites`);
      return { questionId, userId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteQuestionFromFavorites = createAsyncThunk(
  'questions/favorite/delete',
  async ({ questionId, userId }, thunkAPI) => {
    try {
      await axios.delete(`/questions/${questionId}/favorites`);

      return { questionId, userId };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const questionsAdapter = createEntityAdapter({
  selectId: (entity) => entity._id,
});

const initialState = questionsAdapter.getInitialState({
  pagination: {
    limit: QUESTIONS_PER_PAGE,
    offset: 0,
    totalQuestions: 0,
  },
  openedQuestion: null,
  fetching: false,
  error: null,
  deletingQuestionIds: [],
  restoringQuestionIds: [],
  favoritingQuestionIds: [],
});

const questionsSlice = createSlice({
  name: 'questions',
  initialState,

  extraReducers: {
    [incrementPaginationOffset]: (state) => {
      state.pagination.offset += state.pagination.limit;
    },

    [resetQuestionsList]: (state) => {
      questionsAdapter.removeAll(state);

      state.pagination.offset = 0;
      state.pagination.totalQuestions = 0;
    },

    [fetchQuestions.pending]: (state) => {
      state.fetching = true;
    },

    [fetchQuestions.fulfilled]: (state, action) => {
      state.fetching = false;
      state.pagination.totalQuestions = action.payload.total;
      questionsAdapter.upsertMany(state, action.payload.items);
    },

    [fetchQuestionById.pending]: (state) => {
      state.fetching = true;
    },

    [fetchQuestionById.fulfilled]: (state, action) => {
      state.fetching = false;
      state.openedQuestion = action.payload;
    },

    [removeQuestionById.pending]: (state, action) => {
      state.deletingQuestionIds.push(action.meta.arg);
    },

    [removeQuestionById.fulfilled]: (state, action) => {
      // stop preloader
      state.deletingQuestionIds = state.deletingQuestionIds.filter(
        (id) => id !== action.payload.questionId
      );

      questionsAdapter.updateOne(state, {
        id: action.payload.questionId,
        changes: { deleted: true },
      });
    },

    [restoreQuestionById.pending]: (state, action) => {
      state.restoringQuestionIds.push(action.meta.arg);
    },

    [restoreQuestionById.fulfilled]: (state, action) => {
      // stop preloader
      state.restoringQuestionIds = state.restoringQuestionIds.filter(
        (id) => id !== action.payload.questionId
      );

      questionsAdapter.updateOne(state, {
        id: action.payload.questionId,
        changes: { deleted: false },
      });
    },

    [addQuestion.pending]: (state) => {
      state.fetching = true;
    },

    [addQuestion.fulfilled]: (state, action) => {
      state.questions.push(action.payload.question);
      state.error = null;
      state.fetching = false;
    },

    [addQuestion.rejected]: (state, action) => {
      state.error = JSON.stringify(action.payload.errors);
      state.fetching = false;
    },

    [addQuestionToFavorites.pending]: (state, action) => {
      state.favoritingQuestionIds.push(action.meta.arg.questionId);

      // код ниже обычно бывает в fulfilled, однако он здесь из-за
      // эффекта анимации при клике на звезду, она сразу должна становиться выделенной

      // stop preloader
      state.favoritingQuestionIds = state.favoritingQuestionIds.filter(
        (id) => id !== action.meta.arg.questionId
      );

      state.entities[action.meta.arg.questionId].usersThatFavoriteIt.push(action.meta.arg.userId);
    },

    [deleteQuestionFromFavorites.pending]: (state, action) => {
      state.favoritingQuestionIds.push(action.meta.arg.questionId);

      // читай коммент к кейсу выше

      // stop preloader
      state.favoritingQuestionIds = state.favoritingQuestionIds.filter(
        (id) => id !== action.meta.arg.questionId
      );

      state.entities[action.meta.arg.questionId].usersThatFavoriteIt = state.entities[
        action.meta.arg.questionId
      ].usersThatFavoriteIt.filter((id) => id !== action.meta.arg.userId);
    },
  },
});

const selectQuestionsState = (state) => state.questions;

export const questionSelectors = questionsAdapter.getSelectors((state) => state.questions);

// todo refactor
export const selectQuestionById = (id) =>
  createSelector([selectQuestionsState], (state) => {
    if (state.questions.length !== 0) {
      return state.questions.find((question) => question._id === id);
    }
    return state.openedQuestion;
  });

export const selectQuestionsFetching = createSelector(
  selectQuestionsState,
  (state) => state.fetching
);

export const selectAllQuestionsList = createSelector(
  selectQuestionsState,
  (state) => state.questions
);

export const selectQuestionsPagination = createSelector(
  selectQuestionsState,
  (state) => state.pagination
);

export const selectOpenedQuestion = createSelector(
  selectQuestionsState,
  (state) => state.openedQuestion
);

export const selectDeletingQuestions = createSelector(
  selectQuestionsState,
  (state) => state.deletingQuestionIds
);

export const selectRestoringQuestions = createSelector(
  selectQuestionsState,
  (state) => state.restoringQuestionIds
);

export const selectIsFavoritingQuestion = (questionId) =>
  createSelector(selectQuestionsState, (state) =>
    state.favoritingQuestionIds.find((id) => id === questionId)
  );

export default questionsSlice.reducer;
