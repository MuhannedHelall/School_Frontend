import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { authAPI } from './APIs';

const initialState = {
  loading: false,
  data: {},
  error: '',
};

export const getSuperDashboardData = createAsyncThunk(
  'superAdminDashboard/getSuperDashboardData',
  async () => {
    const response = await authAPI('superAdmin/mainDashboard');
    return response;
  }
);

const superAdminDashboard = createSlice({
  name: 'superAdminDashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSuperDashboardData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSuperDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.error = '';
      })
      .addCase(getSuperDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default superAdminDashboard.reducer;
