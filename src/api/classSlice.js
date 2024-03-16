import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fileAPI, authAPI, downloadAPI } from './APIs';

const initialState = {
  loading: false,
  data: [],
  error: '',
  success: '',
};

export const addClass = createAsyncThunk('class/addClass', async (item) => {
  const response = await authAPI('class-rooms', 'POST', item);
  return response;
});

export const getClasses = createAsyncThunk('class/getClasses', async () => {
  const response = await authAPI('class-rooms');
  return response;
});

export const getClass = createAsyncThunk('class/getClass', async (id) => {
  const response = await authAPI(`class-rooms/${id}`);
  return response;
});

export const updateClass = createAsyncThunk('class/updateClass', async (item) => {
  const response = await authAPI(`class-rooms/${item.id}`, 'PUT', item);
  return response;
});

export const deleteClass = createAsyncThunk('class/deleteClass', async (item) => {
  const response = await authAPI(`class-rooms/${item.id}`, 'DELETE');
  return response;
});

export const downloadFile = createAsyncThunk('class/downloadFile', async () => {
  const response = await downloadAPI('DownloadClassTemplate', 'class-Template.xlsx');
  return response;
});

export const uploadFile = createAsyncThunk('class/uploadFile', async (file) => {
  const response = await fileAPI('importClass', 'POST', file);
  return response;
});

const classSlice = createSlice({
  name: 'class',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addClass.pending, (state) => {
        state.loading = true;
      })
      .addCase(addClass.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.success = action.payload.success || 'Added Successfully !';
      })
      .addCase(addClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
        state.success = '';
      });

    builder
      .addCase(getClasses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getClasses.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.error.message || 'Something went wrong';
        state.success = '';
      });

    builder
      .addCase(getClass.pending, (state) => {
        state.loading = true;
      })
      .addCase(getClass.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = '';
        state.success = '';
      })
      .addCase(getClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
        state.success = '';
      });

    builder
      .addCase(updateClass.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateClass.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.success = action.payload.success || 'Updated Successfully !';
      })
      .addCase(updateClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
        state.success = '';
      });

    builder
      .addCase(deleteClass.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteClass.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.success = action.payload.success || 'Deleted Successfully !';
      })
      .addCase(deleteClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default classSlice.reducer;
