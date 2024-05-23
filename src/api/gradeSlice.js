import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { authAPI, fileAPI, downloadAPI } from './APIs';

const initialState = {
  loading: false,
  data: [],
  error: '',
  success: '',
};

export const addGrade = createAsyncThunk('grade/addGrade', async (grade) => {
  const response = await authAPI('student-grades', 'POST', grade);
  return response;
});

export const getGrades = createAsyncThunk('grade/getGrades', async (id) => {
  const response = await authAPI(`student-grades/index/${id}`);
  return response;
});

export const getGrade = createAsyncThunk('grade/getGrade', async (data) => {
  const response = await authAPI(`student-grades/show/${data.subject_id}/${data.student_id}`);
  return response;
});

export const updateGrade = createAsyncThunk('grade/updateGrade', async (grade) => {
  const response = await authAPI(`student-grades/${grade.id}`, 'PUT', grade);
  return response;
});

export const deleteGrade = createAsyncThunk('grade/deleteGrade', async (grade) => {
  const response = await authAPI(`student-grades/${grade.id}`, 'DELETE');
  return response;
});

export const downloadFile = createAsyncThunk('grade/downloadFile', async () => {
  const response = await downloadAPI('DownloadGradeTemplate', 'grade-Template.xlsx');
  return response;
});

export const uploadFile = createAsyncThunk('grade/uploadFile', async (file) => {
  const response = await fileAPI('importGrade', 'POST', file);
  return response;
});

const gradeSlice = createSlice({
  name: 'grade',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addGrade.pending, (state) => {
        state.loading = true;
        state.message = '';
        state.error = '';
      })
      .addCase(addGrade.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.success = action.payload.success || 'Added Successfully !';
      })
      .addCase(addGrade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
        state.success = '';
      });

    builder
      .addCase(getGrades.pending, (state) => {
        state.loading = true;
        state.message = '';
        state.error = '';
      })
      .addCase(getGrades.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getGrades.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.error.message || 'Something went wrong';
        state.success = '';
      });

    builder
      .addCase(getGrade.pending, (state) => {
        state.loading = true;
        state.message = '';
        state.error = '';
      })
      .addCase(getGrade.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = '';
        state.success = '';
      })
      .addCase(getGrade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
        state.success = '';
      });

    builder
      .addCase(updateGrade.pending, (state) => {
        state.loading = true;
        state.message = '';
        state.error = '';
      })
      .addCase(updateGrade.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.success = action.payload.success || 'Updated Successfully !';
      })
      .addCase(updateGrade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
        state.success = '';
      });

    builder
      .addCase(deleteGrade.pending, (state) => {
        state.loading = true;
        state.message = '';
        state.error = '';
      })
      .addCase(deleteGrade.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.success = action.payload.success || 'Deleted Successfully !';
      })
      .addCase(deleteGrade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });

    builder
      .addCase(downloadFile.pending, (state) => {
        state.loading = true;
        state.message = '';
        state.error = '';
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

export default gradeSlice.reducer;
