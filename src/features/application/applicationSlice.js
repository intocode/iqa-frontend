import { createSelector, createSlice } from '@reduxjs/toolkit';

const applicationSlice = createSlice({
  name: 'application',
  initialState: {
    isCompactMode: false,
    isToggleMobileMenu: false,
  },
  reducers: {
    toggleIsCompactMode: (state) => {
      state.isCompactMode = !state.isCompactMode;
    },
    toggleIsMobileMenu: (state) => {
      state.isToggleMobileMenu = !state.isToggleMobileMenu;
    },
  },
});
const selectIsCompactModeState = (state) => state.application;

export const selectIsCompactModeToogle = createSelector(
  selectIsCompactModeState,
  (state) => state.isCompactMode
);

export const selectIsMobileMenuToggle = createSelector(
  selectIsCompactModeState,
  (state) => state.isToggleMobileMenu
);

export const { toggleIsCompactMode, toggleIsMobileMenu } =
  applicationSlice.actions;

export default applicationSlice.reducer;
