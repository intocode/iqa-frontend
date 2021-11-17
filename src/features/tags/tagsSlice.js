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

export const fetchTagsByQuery = createAsyncThunk(
  'tags/fetchByQuery',
  async (query, thunkAPI) => {
    try {
      const response = await axios.get(`/tags?q=${query}`);

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addTag = createAsyncThunk('tags/add', async (data, thunkAPI) => {
  try {
    const response = await axios.post(`/tags`, data);

    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

const tagsSlice = createSlice({
  name: 'tags',
  initialState: {
    tags: [],
    loading: false,
    error: '',
  },
  reducers: {
    removeTag: (state, action) => {
      state.tags = state.tags.filter((tag) => tag._id !== action.payload);
    },
  },
  extraReducers: {
    [fetchTags.pending]: (state) => {
      state.loading = true;
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.loading = false;
      state.tags = action.payload;
    },
    [fetchTagsByQuery.pending]: (state) => {
      state.loading = true;
    },
    [fetchTagsByQuery.fulfilled]: (state, action) => {
      state.loading = false;
      state.tags = action.payload;
    },
    [addTag.pending]: (state) => {
      state.loading = true;
    },
    [addTag.fulfilled]: (state) => {
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

export const selectTagsError = createSelector(
  selectTagsState,
  (state) => state.error
);

export const { removeTag } = tagsSlice.actions;

export default tagsSlice.reducer;
