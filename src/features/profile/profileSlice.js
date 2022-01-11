import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProfile = createAsyncThunk(
  'profile/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/user/profile');

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

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    loading: false,
    addingToFavorites: [],
    deletingFromFavorites: [],
    data: {},
  },

  extraReducers: {
    [fetchProfile.pending]: (state) => {
      state.loading = true;
    },

    [fetchProfile.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },

    [addQuestionInFavorites.pending]: (state, action) => {
      state.addingToFavorites.push(action.meta.arg);
    },
    [addQuestionInFavorites.fulfilled]: (state, action) => {
      state.addingToFavorites = state.addingToFavorites.filter(
        (id) => id !== action.meta.arg
      );
      state.data.favorites = action.payload;
    },

    [deleteQuestionFromFavorites.pending]: (state, action) => {
      state.deletingFromFavorites.push(action.meta.arg);
    },
    [deleteQuestionFromFavorites.fulfilled]: (state, action) => {
      state.deletingFromFavorites = state.deletingFromFavorites.filter(
        (id) => id !== action.meta.arg
      );
      state.data.favorites = action.payload;
    },
  },
});

const selectProfileState = (state) => state.profile;

export const selectProfile = createSelector(
  selectProfileState,
  (state) => state.data
);

export const selectAddingToFavorites = createSelector(
  selectProfileState,
  (state) => state.addingToFavorites
);

export const selectDeletingFromFavorites = createSelector(
  selectProfileState,
  (state) => state.deletingFromFavorites
);

export default profileSlice.reducer;
