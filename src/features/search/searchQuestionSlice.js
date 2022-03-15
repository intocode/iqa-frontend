import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchQuestionsSearch = createAsyncThunk(
  'question/search',
  async (question, thunkAPI) => {
    try {
      const response = await axios.get(`/questions?search=${question}`);

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const questionsSearchSlice = createSlice({
  name: 'questionsSearch',
  initialState: {
    questionsSearch: [],
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
    [fetchQuestionsSearch.pending]: (state) => {
      state.loading = true;
      state.questionsSearch = [];
    },
    [fetchQuestionsSearch.fulfilled]: (state, action) => {
      state.loading = false;
      state.questionsSearch = action.payload;
    },
  },
});

const selectQuestionsSearchState = (state) => state;

export const selectQuestionsLoading = createSelector(
  selectQuestionsSearchState,
  (state) => state.loading
);

export const selectQuestionsSuccess = createSelector(
  selectQuestionsSearchState,
  (state) => state.success
);

export const selectQuestionsError = createSelector(
  selectQuestionsSearchState,
  (state) => state.error
);

export const selectQuestionsSearch = createSelector(
  selectQuestionsSearchState,
  (state) => state.questionsSearch
);

export const { resetStatus, resetSuccess } = questionsSearchSlice.actions;

export default questionsSearchSlice.reducer;
