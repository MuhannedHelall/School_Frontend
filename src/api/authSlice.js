import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { authAPI } from './APIs';

const USER = JSON.parse(localStorage.getItem('user'));

const initialState = {
  loading: false,
  data: USER || {},
  error: '',
};

export const login = createAsyncThunk('auth/login', async (loginData) => {
  const response = await authAPI('login', 'POST', loginData);
  return response;
});

export const logout = createAsyncThunk('auth/logout', async () => {
  const response = await authAPI('logout', 'POST');
  return response;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = '';
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });

    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.data = {};
        state.error = '';
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default authSlice.reducer;
