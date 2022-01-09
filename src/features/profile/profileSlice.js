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
      const response = await axios.post(`/user/favorites/${id}`, id);

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
    addingToFavorites: false,
    deletingFromFavorites: false,
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

    [addQuestionInFavorites.pending]: (state) => {
      state.addingToFavorites = true;
    },
    [addQuestionInFavorites.fulfilled]: (state, action) => {
      state.addingToFavorites = false;
      state.data.favorites = action.payload;
    },

    [deleteQuestionFromFavorites.pending]: (state) => {
      state.deletingFromFavorites = true;
    },
    [deleteQuestionFromFavorites.fulfilled]: (state, action) => {
      state.deletingFromFavorites = false;
      state.data.favorites = action.payload;
    },
  },
});

const selectProfileState = (state) => state.profile;

export const selectProfile = createSelector(
  selectProfileState,
  (state) => state.data
);

export default profileSlice.reducer;
