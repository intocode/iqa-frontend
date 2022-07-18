import { createSelector, createSlice } from '@reduxjs/toolkit';

const applicationSlice = createSlice({
  name: 'application',
  initialState: {
    isCompactMode: false,
    errors: [],
  },
  reducers: {
    toggleIsCompactMode: (state) => {
      state.isCompactMode = !state.isCompactMode;
    },
    setSnackbar: (state, action) => {
      state.errors.push(action.payload.message);
    },
    closeSnackbar: (state, action) => {
      state.errors = state.errors.filter((_, index) => index !== action.payload);
    },
  },
});
const selectIsCompactModeState = (state) => state.application;

export const selectIsCompactModeToogle = createSelector(
  selectIsCompactModeState,
  (state) => state.isCompactMode
);

export const selectSnackbarState = createSelector(
  (state) => {
    return state.application;
  },
  (state) => {
    return state.errors;
  }
);

export const { toggleIsCompactMode, setSnackbar, closeSnackbar } = applicationSlice.actions;

export default applicationSlice.reducer;
