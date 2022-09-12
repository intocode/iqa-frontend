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

export const likeCommentById = createAsyncThunk(
  'likes/add',
  async ({ commentId, userId }, thunkAPI) => {
    try {
      const response = await axios.post(`/comments/${commentId}/like`, userId);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const unlikeCommentById = createAsyncThunk(
  'likes/remove',
  async ({ commentId, userId }, thunkAPI) => {
    try {
      const response = await axios.delete(`/comments/${commentId}/like`, userId);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const commentsAdapter = createEntityAdapter({
  selectId: (entity) => entity._id,
});

const initialState = commentsAdapter.getInitialState({
  fetching: false,
  adding: false,
  deletingCommentIds: [],
  likedCommentsIds: [],
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState,

  reducers: {
    resetComments: (state) => {
      commentsAdapter.removeAll(state);
    },
  },

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

    [likeCommentById.pending]: (state, action) => {
      state.likedCommentsIds.push(action.meta.arg.commentId);

      state.likedCommentsIds = state.likedCommentsIds.filter(
        (id) => id !== action.meta.arg.commentId
      );

      state.entities[action.meta.arg.commentId].likes.push(action.meta.arg.userId);
    },

    [unlikeCommentById.pending]: (state, action) => {
      state.likedCommentsIds.push(action.meta.arg.commentId);

      // stop preloader
      state.likedCommentsIds = state.likedCommentsIds.filter(
        (id) => id !== action.meta.arg.commentId
      );

      state.entities[action.meta.arg.commentId].likes = state.entities[
        action.meta.arg.commentId
      ].likes.filter((id) => id !== action.meta.arg.userId);
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

export const selectCommentLiked = createSelector(
  selectCommentsState,
  (state) => state.likedCommentsIds
);

export const selectCommentsSuccess = createSelector(selectCommentsState, (state) => state.success);

export const { resetComments } = commentsSlice.actions;

export default commentsSlice.reducer;
