import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from '@reduxjs/toolkit';
import axios from 'axios';
import {
  addQuestionToFavorites,
  deleteQuestionFromFavorites,
} from '../questions/questionsSlice';

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
    _id: null,
    name: null,
    avatar: {},
    questionIdsThatUserFavorite: [],
    isAdmin: false,
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
      state.avatar = payload.avatar;
      state.questionIdsThatUserFavorite = payload.questionIdsThatUserFavorite;
      state.isAdmin = payload.isAdmin;
    },

    [addQuestionToFavorites.pending]: (state, action) => {
      state.questionIdsThatUserFavorite.push(action.meta.arg.questionId);
    },

    [deleteQuestionFromFavorites.pending]: (state, action) => {
      state.questionIdsThatUserFavorite =
        state.questionIdsThatUserFavorite.filter(
          (id) => id !== action.meta.arg.questionId
        );
    },
  },
});

const selectProfileState = (state) => state.profile;

export const selectProfile = createSelector(
  selectProfileState,
  (state) => state
);

export const selectProfileLoading = createSelector(
  selectProfileState,
  (state) => state.loading
);

export const selectQuestionIdsThatUserFavorite = createSelector(
  selectProfile,
  (state) => state.questionIdsThatUserFavorite
);

export default profileSlice.reducer;
