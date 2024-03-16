import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { authAPI } from './APIs';

const initialState = {
  loading: false,
  data: {},
  error: '',
};

export const getSuperDashboardData = createAsyncThunk(
  'Dashboards/getSuperDashboardData',
  async () => {
    const response = await authAPI('superAdmin/mainDashboard');
    return response;
  }
);

export const getAdminDashboardData = createAsyncThunk(
  'Dashboards/getAdminDashboardData',
  async () => {
    const response = await authAPI('adminDashboard');
    return response;
  }
);

const Dashboards = createSlice({
  name: 'Dashboards',
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

    builder
      .addCase(getAdminDashboardData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAdminDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = '';
      })
      .addCase(getAdminDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default Dashboards.reducer;
