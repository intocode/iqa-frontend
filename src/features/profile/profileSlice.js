import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  addQuestionToFavorites,
  deleteQuestionFromFavorites,
} from 'features/questions/questionsSlice';

export const fetchProfile = createAsyncThunk('profile/fetch', async (_, thunkAPI) => {
  try {
    const response = await axios.get('/user/profile');

    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    loading: false,
    _id: null,
    name: null,
    fullName: null,
    avatar: {},
    questionIdsThatUserFavorite: [],
    isAdmin: false,
    createdAt: null,
    // добавить остальные поля по мере необходимости
  },

  extraReducers: {
    [fetchProfile.pending]: (state) => {
      state.loading = true;
    },

    [fetchProfile.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state._id = payload._id;
      state.name = payload.name;
      state.fullName = payload.fullName;
      state.avatar = payload.avatar;
      state.questionIdsThatUserFavorite = payload.questionIdsThatUserFavorite;
      state.isAdmin = payload.isAdmin;
      state.createdAt = payload.createdAt;
    },

    [addQuestionToFavorites.pending]: (state, action) => {
      state.questionIdsThatUserFavorite.push(action.meta.arg.questionId);
    },

    [deleteQuestionFromFavorites.pending]: (state, action) => {
      state.questionIdsThatUserFavorite = state.questionIdsThatUserFavorite.filter(
        (id) => id !== action.meta.arg.questionId
      );
    },
  },
  reducers: {
    resetProfile: (state) => {
      state.loading = false;
      state._id = null;
      state.name = null;
      state.fullName = null;
      state.avatar = {};
      state.questionIdsThatUserFavorite = [];
      state.isAdmin = false;
      state.createdAt = null;
    },
  },
});

const selectProfileState = (state) => state.profile;

export const { resetProfile } = profileSlice.actions;

export const selectProfile = createSelector(selectProfileState, (state) => state);

export const selectProfileLoading = createSelector(selectProfileState, (state) => state.loading);

export const selectQuestionIdsThatUserFavorite = createSelector(
  selectProfile,
  (state) => state.questionIdsThatUserFavorite
);

export default profileSlice.reducer;
