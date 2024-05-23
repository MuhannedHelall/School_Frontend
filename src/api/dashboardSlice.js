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

export const getTeacherDashboardData = createAsyncThunk(
  'Dashboards/getTeacherDashboardData',
  async () => {
    const response = await authAPI('teacher/dashboard');
    return response;
  }
);

export const getStudentDashboardData = createAsyncThunk(
  'Dashboards/getStudentDashboardData',
  async () => {
    const response = await authAPI('dashboard');
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

    builder
      .addCase(getTeacherDashboardData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTeacherDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = '';
      })
      .addCase(getTeacherDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });

    builder
      .addCase(getStudentDashboardData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStudentDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = '';
      })
      .addCase(getStudentDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default Dashboards.reducer;
