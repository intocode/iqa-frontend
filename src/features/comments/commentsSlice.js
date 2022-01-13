import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/questions/${id}/comments`);

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addCommentToPost = createAsyncThunk(
  'comments/add',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`/questions/${data.id}/comments`, {
        text: data.text,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    loading: false,
    adding: false,
    error: '',
    success: [],
  },
  reducers: {
    resetCommentStatus: (state) => {
      state.error = '';
    },
    resetCommentSuccess: (state) => {
      state.success = [];
    },
  },
  extraReducers: {
    [fetchComments.pending]: (state) => {
      state.loading = true;
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    },
    [addCommentToPost.pending]: (state) => {
      state.adding = true;
    },
    [addCommentToPost.fulfilled]: (state, action) => {
      state.adding = false;
      state.comments.push(action.payload);
      state.success = action.payload;
    },
  },
});

const selectCommentsState = (state) => state.comments;

export const selectComments = createSelector(
  selectCommentsState,
  (state) => state.comments
);

export const selectCommentsAdding = createSelector(
  selectCommentsState,
  (state) => state.adding
);

export const selectCommentsError = createSelector(
  selectCommentsState,
  (state) => state.error
);
export const selectCommentsSuccess = createSelector(
  selectCommentsState,
  (state) => state.success
);

export const { resetCommentSuccess, resetCommentStatus } =
  commentsSlice.actions;

export default commentsSlice.reducer;
