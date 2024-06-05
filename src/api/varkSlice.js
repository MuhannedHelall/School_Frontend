import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { authAPI } from './APIs';

const initialState = {
  loading: false,
  data: [],
  error: '',
  success: '',
};

export const addResult = createAsyncThunk('vark/addResult', async (res) => {
  const response = await authAPI('vark', 'POST', res);
  return response;
});

export const getVarkResultsForTeacher = createAsyncThunk('vark/getTableData', async (teacherId) => {
  const response = await authAPI(`vark/getCountedVarkResults/${teacherId}`);
  return response;
});

const varkSlice = createSlice({
  name: 'vark',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addResult.pending, (state) => {
        state.loading = true;
      })
      .addCase(addResult.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.success = action.payload.success || 'Added Successfully !';
      })
      .addCase(addResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
        state.success = '';
      });

    builder
      .addCase(getVarkResultsForTeacher.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVarkResultsForTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getVarkResultsForTeacher.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.error.message || 'Something went wrong';
        state.success = '';
      });
  },
});

export default varkSlice.reducer;
