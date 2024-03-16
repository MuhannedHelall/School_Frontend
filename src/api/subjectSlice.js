import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { authAPI, fileAPI, downloadAPI } from './APIs';

const initialState = {
  loading: false,
  data: [],
  error: '',
  success: '',
};

export const addSubject = createAsyncThunk('subject/addSubject', async (subject) => {
  const response = await authAPI('subject', 'POST', subject);
  return response;
});

export const getSubjects = createAsyncThunk('subject/getSubjects', async () => {
  const response = await authAPI('subject');
  return response;
});

export const getSubject = createAsyncThunk('subject/getSubject', async (id) => {
  const response = await authAPI(`subject/${id}`);
  return response;
});

export const updateSubject = createAsyncThunk('subject/updateSubject', async (subject) => {
  const response = await authAPI(`subject/${subject.id}`, 'PUT', subject);
  return response;
});

export const deleteSubject = createAsyncThunk('subject/deleteSubject', async (subject) => {
  const response = await authAPI(`subject/${subject.id}`, 'DELETE');
  return response;
});

export const downloadFile = createAsyncThunk('subject/downloadFile', async () => {
  const response = await downloadAPI('DownloadSubjectTemplate', 'subject-Template.xlsx');
  return response;
});

export const uploadFile = createAsyncThunk('subject/uploadFile', async (file) => {
  const response = await fileAPI('importSubject', 'POST', file);
  return response;
});

const subjectSlice = createSlice({
  name: 'subject',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addSubject.pending, (state) => {
        state.loading = true;
      })
      .addCase(addSubject.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.success = action.payload.success || 'Added Successfully !';
      })
      .addCase(addSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
        state.success = '';
      });

    builder
      .addCase(getSubjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getSubjects.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.error.message || 'Something went wrong';
        state.success = '';
      });

    builder
      .addCase(getSubject.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSubject.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = '';
        state.success = '';
      })
      .addCase(getSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
        state.success = '';
      });

    builder
      .addCase(updateSubject.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSubject.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.success = action.payload.success || 'Updated Successfully !';
      })
      .addCase(updateSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
        state.success = '';
      });

    builder
      .addCase(deleteSubject.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSubject.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.success = action.payload.success || 'Deleted Successfully !';
      })
      .addCase(deleteSubject.rejected, (state, action) => {
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

export default subjectSlice.reducer;
