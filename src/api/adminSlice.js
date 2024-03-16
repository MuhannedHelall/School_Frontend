import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { authAPI, fileAPI, downloadAPI } from './APIs';

const initialState = {
  loading: false,
  data: [],
  error: '',
  success: '',
};

export const addAdmin = createAsyncThunk('admin/addAdmin', async (admin) => {
  const response = await authAPI('admin', 'POST', admin);
  return response;
});

export const getAdmins = createAsyncThunk('admin/getAdmins', async () => {
  const response = await authAPI('admin');
  return response;
});

export const getAdmin = createAsyncThunk('admin/getAdmin', async (id) => {
  const response = await authAPI(`admin/${id}`);
  return response;
});

export const updateAdmin = createAsyncThunk('admin/updateAdmin', async (admin) => {
  const response = await authAPI(`admin/${admin.id}`, 'PUT', admin);
  return response;
});

export const deleteAdmin = createAsyncThunk('admin/deleteAdmin', async (admin) => {
  const response = await authAPI(`admin/${admin.id}`, 'DELETE');
  return response;
});

export const resetPassword = createAsyncThunk('admin/resetPassword', async (id) => {
  const response = await authAPI(`resetPassword/${id}`);
  return response;
});

export const downloadFile = createAsyncThunk('admin/downloadFile', async () => {
  const response = await downloadAPI('DownloadAdminTemplate', 'admin-Template.xlsx');
  return response;
});

export const uploadFile = createAsyncThunk('admin/uploadFile', async (file) => {
  const response = await fileAPI('importAdmin', 'POST', file);
  return response;
});

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.success = action.payload.success || 'Added Successfully !';
      })
      .addCase(addAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
        state.success = '';
      });

    builder
      .addCase(getAdmins.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAdmins.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.error.message || 'Something went wrong';
        state.success = '';
      });

    builder
      .addCase(getAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = '';
        state.success = '';
      })
      .addCase(getAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
        state.success = '';
      });

    builder
      .addCase(updateAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.success = action.payload.success || 'Updated Successfully !';
      })
      .addCase(updateAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
        state.success = '';
      });

    builder
      .addCase(deleteAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.success = action.payload.success || 'Deleted Successfully !';
      })
      .addCase(deleteAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });

    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.success = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
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

export default adminSlice.reducer;
