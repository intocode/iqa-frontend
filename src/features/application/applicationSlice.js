import { createSelector, createSlice } from '@reduxjs/toolkit';

const applicationSlice = createSlice({
  name: 'application',
  initialState: {
    isCompactMode: false,
  },
  reducers: {
    setIsCompactMode: (state) => {
      state.isCompactMode = !state.isCompactMode;
    },
  },
});
const selectIsCompactModeState = (state) => state.application;

export const selectIsCompactModeToogle = createSelector(
  selectIsCompactModeState,
  (state) => state.isCompactMode
);

export const { setIsCompactMode } = applicationSlice.actions;

export default applicationSlice.reducer;
