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

export const removeCommentById = createAsyncThunk(
  'comments/remove/byId',
  async ({ questionId, commentId }, thunkAPI) => {
    try {
      await axios.delete(`/questions/${questionId}/comments/${commentId}`);

      return { comment: commentId };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addLike = createAsyncThunk('likes/add', async ({ commentId, userId }, thunkAPI) => {
  try {
    const response = await axios.post(`/comments/${commentId}/like`, userId);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const unLike = createAsyncThunk('likes/remove', async ({ commentId, userId }, thunkAPI) => {
  try {
    const response = await axios.delete(`/comments/${commentId}/like`, userId);

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
  deletingCommentIds: [],
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

    [removeCommentById.pending]: (state, action) => {
      state.deletingCommentIds.push(action.meta.arg);
    },

    [removeCommentById.fulfilled]: (state, action) => {
      state.deletingCommentIds = state.deletingCommentIds.filter(
        (id) => id.commentId !== action.payload.comment
      );

      commentsAdapter.removeOne(state, action.payload.comment);
    },

    [addLike.pending]: (state) => {
      state.adding = true;
    },

    [addLike.fulfilled]: (state, action) => {
      commentsAdapter.updateOne(state, {
        id: action.payload.commentId,
        changes: { liked: true },
      });
    },

    [unLike.pending]: (state) => {
      state.adding = true;
    },

    [unLike.fulfilled]: (state, action) => {
      commentsAdapter.updateOne(state, {
        id: action.payload.commentId,
        changes: { liked: false },
      });
    },
  },
});

const selectCommentsState = (state) => state.comments;

export const commentsSelectors = commentsAdapter.getSelectors(selectCommentsState);

export const selectComments = createSelector(selectCommentsState, (state) => state.comments);

export const selectCommentsAdding = createSelector(selectCommentsState, (state) => state.adding);

export const selectCommentsError = createSelector(selectCommentsState, (state) => state.error);

export const selectCommentsLoading = createSelector(selectCommentsState, (state) => state.loading);

export const selectCommentDeliting = createSelector(
  selectCommentsState,
  (state) => state.deletingCommentIds
);

export const selectCommentsSuccess = createSelector(selectCommentsState, (state) => state.success);

export const { resetCommentSuccess, resetCommentStatus } = commentsSlice.actions;

export default commentsSlice.reducer;
