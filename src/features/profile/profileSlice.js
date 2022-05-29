import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from '@reduxjs/toolkit';
import axios from 'axios';
import {
  addQuestionInFavorites,
  deleteQuestionFromFavorites,
} from '../favorites/favoriteSlice';

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

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    loading: false,
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

    [addQuestionInFavorites.fulfilled]: (state, action) => {
      state.data.favorites = action.payload;
    },

    [deleteQuestionFromFavorites.fulfilled]: (state, action) => {
      state.data.favorites = action.payload;
    },
  },
});

const selectProfileState = (state) => {
  return state.profile;
};

export const selectProfile = createSelector(
  selectProfileState,
  (state) => state.data
);

export const selectProfileLoading = createSelector(
  selectProfileState,
  (state) => state.loading
);

export default profileSlice.reducer;
