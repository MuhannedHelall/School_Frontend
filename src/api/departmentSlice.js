import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { authAPI, fileAPI, downloadAPI } from './APIs';

const initialState = {
  loading: false,
  data: [],
  error: '',
  message: '',
};

export const addDepartment = createAsyncThunk('department/addDepartment', async (dept) => {
  const response = await authAPI('department', 'POST', dept);
  return response;
});

export const getDepartments = createAsyncThunk('department/getDepartments', async () => {
  const response = await authAPI('department');
  return response;
});

export const getDepartment = createAsyncThunk('department/getDepartment', async (id) => {
  const response = await authAPI(`department/${id}`);
  return response;
});

export const updateDepartment = createAsyncThunk('department/updateDepartment', async (dept) => {
  const response = await authAPI(`department/${dept.id}`, 'PUT', dept);
  return response;
});

export const deleteDepartment = createAsyncThunk('department/deleteDepartment', async (dept) => {
  const response = await authAPI(`department/${dept.id}`, 'DELETE');
  return response;
});

export const downloadFile = createAsyncThunk('department/downloadFile', async () => {
  const response = await downloadAPI('DownloadDepartmentTemplate', 'department-Template.xlsx');
  return response;
});

export const uploadFile = createAsyncThunk('department/uploadFile', async (file) => {
  const response = await fileAPI('importDepartment', 'POST', file);
  return response;
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
        state.error = JSON.parse(action.error.message).error.name[0] || 'Something went wrong';
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

    builder
      .addCase(downloadFile.pending, (state) => {
        state.loading = true;
      })
      .addCase(downloadFile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.message = action.payload;
      })
      .addCase(downloadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });

    builder
      .addCase(uploadFile.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.message = action.payload;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default departmentSlice.reducer;
