import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchComments = createAsyncThunk('comments/fetch', async (questionId, thunkAPI) => {
  try {
    const response = await axios.get(`/questions/${questionId}/comments`);

    return response.data.items;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const addComment = createAsyncThunk('comments/add', async ({ id, text }, thunkAPI) => {
  try {
    const response = await axios.post(`/questions/${id}/comments`, { text });

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const commentsAdapter = createEntityAdapter({
  selectId: (entity) => entity._id,
});

const initialState = commentsAdapter.getInitialState({
  fetching: false,
  adding: false,
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState,

  extraReducers: {
    [fetchComments.pending]: (state) => {
      state.fetching = true;
    },

    [fetchComments.fulfilled]: (state, action) => {
      commentsAdapter.upsertMany(state, action.payload);
      state.fetching = false;
    },

    [addComment.pending]: (state) => {
      state.adding = true;
    },

    [addComment.fulfilled]: (state, action) => {
      commentsAdapter.addOne(state, action.payload);

      state.adding = false;
    },
  },
});

const selectCommentsState = (state) => state.comments;

export const commentsSelectors = commentsAdapter.getSelectors(selectCommentsState);

export const selectComments = createSelector(selectCommentsState, (state) => state.comments);

export const selectCommentsAdding = createSelector(selectCommentsState, (state) => state.adding);

export const selectCommentsError = createSelector(selectCommentsState, (state) => state.error);

export const selectCommentsLoading = createSelector(selectCommentsState, (state) => state.loading);

export const selectCommentsSuccess = createSelector(selectCommentsState, (state) => state.success);

export const { resetCommentSuccess, resetCommentStatus } = commentsSlice.actions;

export default commentsSlice.reducer;
