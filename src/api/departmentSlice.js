import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { authAPI } from './APIs';

const initialState = {
  loading: false,
  data: [],
  error: '',
  message: '',
};

export const addDepartment = createAsyncThunk('department/addDepartment', async (dept) => {
  try {
    const response = await authAPI('department', 'POST', dept);
    return response;
  } catch (error) {
    return error.response;
  }
});

export const getDepartments = createAsyncThunk('department/getDepartments', async () => {
  try {
    const response = await authAPI('department');
    return response;
  } catch (error) {
    return error.response;
  }
});

export const getDepartment = createAsyncThunk('department/getDepartment', async (id) => {
  try {
    const response = await authAPI(`department/${id}`);
    return response;
  } catch (error) {
    return error.response;
  }
});

export const updateDepartment = createAsyncThunk('department/updateDepartment', async (dept) => {
  try {
    const response = await authAPI(`department/${dept.id}`, 'PUT', dept);
    return response;
  } catch (error) {
    return error.response;
  }
});

export const deleteDepartment = createAsyncThunk('department/deleteDepartment', async (dept) => {
  try {
    const response = await authAPI(`department/${dept.id}`, 'DELETE');
    return response;
  } catch (error) {
    return error.response;
  }
});

const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addDepartment.pending, (state) => {
        state.loading = true;
      })
      .addCase(addDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.message = action.payload || 'Added Successfully !';
      })
      .addCase(addDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
        state.message = '';
      });

    builder
      .addCase(getDepartments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDepartments.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getDepartments.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.error.message || 'Something went wrong';
        state.message = '';
      });

    builder
      .addCase(getDepartment.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = '';
        state.message = '';
      })
      .addCase(getDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
        state.message = '';
      });

    builder
      .addCase(updateDepartment.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.message = action.payload || 'Updated Successfully !';
      })
      .addCase(updateDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
        state.message = '';
      });

    builder
      .addCase(deleteDepartment.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.message = action.payload;
      })
      .addCase(deleteDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default departmentSlice.reducer;
