import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { authAPI } from './APIs';

const initialState = {
  loading: false,
  data: [],
  error: '',
  success: '',
};

export const addPeriod = createAsyncThunk('timeTable/addPeriod', async (period) => {
  const response = await authAPI('timetable/addNewPeriod', 'POST', period);
  return response;
});

export const getTableData = createAsyncThunk('timeTable/getTableData', async () => {
  const response = await authAPI(`timetable/getDataForMakeTable`);
  return response;
});

export const getTeacherTable = createAsyncThunk('timeTable/getTeacherTable', async (id) => {
  const response = await authAPI(`timetable/getTeacherTable/${id}`);
  return response;
});

export const getClassTable = createAsyncThunk('timeTable/getClassTable', async (id) => {
  const response = await authAPI(`timetable/getClassTable/${id}`);
  return response;
});

export const updatePeriod = createAsyncThunk('timeTable/updatePeriod', async (grade) => {
  const response = await authAPI(`timetable/editPeriod/${grade.id}`, 'PUT', grade);
  return response;
});

export const deletePeriod = createAsyncThunk('timeTable/deletePeriod', async (grade) => {
  const response = await authAPI(`timetable/deletePeriod/${grade.id}`, 'DELETE');
  return response;
});

const timeTableSlice = createSlice({
  name: 'timeTable',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPeriod.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPeriod.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.success = action.payload.success || 'Added Successfully !';
      })
      .addCase(addPeriod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
        state.success = '';
      });

    builder
      .addCase(getTableData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTableData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getTableData.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.error.message || 'Something went wrong';
        state.success = '';
      });

    builder
      .addCase(getClassTable.pending, (state) => {
        state.loading = true;
      })
      .addCase(getClassTable.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getClassTable.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.error.message || 'Something went wrong';
        state.success = '';
      });

    builder
      .addCase(getTeacherTable.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTeacherTable.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getTeacherTable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
        state.success = '';
      });

    builder
      .addCase(updatePeriod.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePeriod.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.success = action.payload.success || 'Updated Successfully !';
      })
      .addCase(updatePeriod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
        state.success = '';
      });

    builder
      .addCase(deletePeriod.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePeriod.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.success = action.payload.success || 'Deleted Successfully !';
      })
      .addCase(deletePeriod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default timeTableSlice.reducer;
