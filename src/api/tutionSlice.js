import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { authAPI } from './APIs';

const initialState = {
  loading: false,
  data: [],
  error: '',
  success: '',
};

export const getGradesTutionFees = createAsyncThunk('tution/getGradesTutionFees', async () => {
  const response = await authAPI('grade-fees');
  return response;
});

export const createPaymentCodeForGrade = createAsyncThunk('tution/CodeForGrade', async (data) => {
  const response = await authAPI('generatePaymentCodePerGrade', 'POST', data);
  return response;
});

export const createPaymentCodeForStudent = createAsyncThunk(
  'tution/CodeForStudent',
  async (data) => {
    const response = await authAPI('generatePaymentCodeForStudent', 'POST', data);
    return response;
  }
);

const tutionSlice = createSlice({
  name: 'tution',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGradesTutionFees.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGradesTutionFees.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = '';
        state.success = '';
      })
      .addCase(getGradesTutionFees.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.error.message || 'Something went wrong';
        state.success = '';
      });

    builder
      .addCase(createPaymentCodeForGrade.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPaymentCodeForGrade.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.success = action.payload.success || 'Added Successfully !';
      })
      .addCase(createPaymentCodeForGrade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
        state.success = '';
      });

    builder
      .addCase(createPaymentCodeForStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPaymentCodeForStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.success = action.payload.success || 'Added Successfully !';
      })
      .addCase(createPaymentCodeForStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
        state.success = '';
      });
  },
});

export default tutionSlice.reducer;
