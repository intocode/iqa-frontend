import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTags = createAsyncThunk('tags/fetch', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`/tags`);

    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const fetchTagsByQuestion = createAsyncThunk(
  'tags/fetchBy',
  async (questionId, thunkAPI) => {
    try {
      const response = await axios.get(`/tags/question/${questionId}`);

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addTag = createAsyncThunk(
  'tags/add',
  async ({ data, questionId }, thunkAPI) => {
    try {
      const response = await axios.post(`/tags/question/${questionId}`, data);

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const tagsSlice = createSlice({
  name: 'tags',
  initialState: {
    tags: [],
    loading: false,
    error: '',
  },
  extraReducers: {
    [fetchTagsByQuestion.pending]: (state) => {
      state.loading = true;
    },
    [fetchTagsByQuestion.fulfilled]: (state, action) => {
      state.loading = false;
      state.tags = action.payload;
    },
    [fetchTags.pending]: (state) => {
      state.loading = true;
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.loading = false;
      state.tags = action.payload;
    },
    [addTag.pending]: (state) => {
      state.loading = true;
    },
    [addTag.fulfilled]: (state, action) => {
      state.tags.push(action.payload.tag);
      state.loading = false;
    },
    [addTag.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

const selectTagsState = (state) => state.tags;

export const selectTags = createSelector(
  selectTagsState,
  (state) => state.tags
);

export const selectTagsByQuestionId = (questionId) =>
  createSelector(selectTagsState, (state) =>
    state.tags.filter((tag) => tag.question._id === questionId)
  );

export const selectTagsError = createSelector(
  selectTagsState,
  (state) => state.error
);

export default tagsSlice.reducer;
