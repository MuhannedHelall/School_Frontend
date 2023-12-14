import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { authAPI } from './APIs';

const initialState = {
  loading: false,
  data: [],
  error: '',
  message: '',
};

export const addAdmin = createAsyncThunk('admin/addAdmin', async (admin) => {
  try {
    const response = await authAPI('admin', 'POST', admin);
    return response;
  } catch (error) {
    return error.response;
  }
});

export const getAdmins = createAsyncThunk('admin/getAdmins', async () => {
  try {
    const response = await authAPI('admin');
    return response;
  } catch (error) {
    return error.response;
  }
});

export const getAdmin = createAsyncThunk('admin/getAdmin', async (id) => {
  try {
    const response = await authAPI(`admin/${id}`);
    return response;
  } catch (error) {
    return error.response;
  }
});

export const updateAdmin = createAsyncThunk('admin/updateAdmin', async (admin) => {
  try {
    const response = await authAPI(`admin/${admin.id}`, 'PUT', admin);
    return response;
  } catch (error) {
    return error.response;
  }
});

export const deleteAdmin = createAsyncThunk('admin/deleteAdmin', async (admin) => {
  try {
    const response = await authAPI(`admin/${admin.id}`, 'DELETE');
    return response;
  } catch (error) {
    return error.response;
  }
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
        state.message = action.payload || 'Added Successfully !';
      })
      .addCase(addAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
        state.message = '';
      });

    builder
      .addCase(getAdmins.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = '';
        state.message = '';
      })
      .addCase(getAdmins.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.error.message || 'Something went wrong';
        state.message = '';
      });

    builder
      .addCase(getAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = '';
        state.message = '';
      })
      .addCase(getAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
        state.message = '';
      });

    builder
      .addCase(updateAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.message = action.payload || 'Updated Successfully !';
      })
      .addCase(updateAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
        state.message = '';
      });

    builder
      .addCase(deleteAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.message = action.payload;
      })
      .addCase(deleteAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default adminSlice.reducer;
