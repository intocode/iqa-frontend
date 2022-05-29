import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchQuestionFavorites = createAsyncThunk(
  'favorite/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/user/favorites');

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addQuestionInFavorites = createAsyncThunk(
  'add/favorite',
  async (id, thunkAPI) => {
    try {
      const response = await axios.post(`/user/favorites/${id}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteQuestionFromFavorites = createAsyncThunk(
  'delete/favorite',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/user/favorites/${id}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: {
    loading: false,
    addingToFavorites: [],
    favorites: [],
    deletingFromFavorites: [],
    data: {},
  },

  extraReducers: {
    [fetchQuestionFavorites.pending]: (state) => {
      state.loading = true;
      state.favorites = [];
    },

    [fetchQuestionFavorites.fulfilled]: (state, action) => {
      state.loading = false;
      state.favorites = action.payload;
    },

    [addQuestionInFavorites.pending]: (state, action) => {
      state.addingToFavorites.push(action.meta.arg);
    },
    [addQuestionInFavorites.fulfilled]: (state, action) => {
      state.addingToFavorites = state.addingToFavorites.filter(
        (id) => id !== action.meta.arg
      );
    },

    [deleteQuestionFromFavorites.pending]: (state, action) => {
      state.deletingFromFavorites.push(action.meta.arg);
    },
    [deleteQuestionFromFavorites.fulfilled]: (state, action) => {
      state.deletingFromFavorites = state.deletingFromFavorites.filter(
        (id) => id !== action.meta.arg
      );
    },
  },
});

const selectFavoriteState = (state) => state.favorites;

export const selectFavorites = createSelector(
  selectFavoriteState,
  (state) => state.favorites
);

export const selectAddingToFavorites = createSelector(
  selectFavoriteState,
  (state) => state.addingToFavorites
);

export const selectDeletingFromFavorites = createSelector(
  selectFavoriteState,
  (state) => state.deletingFromFavorites
);

export default favoriteSlice.reducer;
