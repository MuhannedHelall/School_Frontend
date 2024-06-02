import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('lang')) || {
  value: 'en',
  label: 'English',
  icon: '/assets/icons/ic_flag_en.svg',
  direction: 'ltr',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changeLanguage: (state, action) => {
      state.value = action.payload.value;
      state.label = action.payload.label;
      state.icon = action.payload.icon;
      state.direction = action.payload.direction;
      localStorage.setItem('lang', JSON.stringify(state));
    },
  },
});

export const { changeLanguage } = languageSlice.actions;
export default languageSlice.reducer;
