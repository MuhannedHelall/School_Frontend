import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { authAPI, fileAPI, downloadAPI } from './APIs';

const initialState = {
  loading: false,
  data: [],
  show: {},
  error: '',
  success: '',
};

export const addStudent = createAsyncThunk('student/addStudent', async (student) => {
  const response = await authAPI('createStudent', 'POST', student);
  return response;
});

export const getStudents = createAsyncThunk('student/getStudents', async () => {
  const response = await authAPI(`student`);
  return response;
});

export const getStudentsInClass = createAsyncThunk('student/getStudentsInClass', async (id) => {
  const response = await authAPI(`studentsInClass/${id}`);
  return response;
});

export const getStudentsWithNoGrades = createAsyncThunk(
  'student/getStudentsWithNoGrades',
  async (id) => {
    const response = await authAPI(`studentsWithNoGrades/${id}`);
    return response;
  }
);

export const getStudent = createAsyncThunk('student/getStudent', async (id) => {
  const response = await authAPI(`student/${id}`);
  return response;
});

export const updateStudent = createAsyncThunk('student/updateStudent', async (student) => {
  const response = await authAPI(`student/${student.student_id}`, 'PUT', student);
  return response;
});

export const deleteStudent = createAsyncThunk('student/deleteStudent', async (student) => {
  const response = await authAPI(`student/${student.id}`, 'DELETE');
  return response;
});

export const downloadFile = createAsyncThunk('student/downloadFile', async () => {
  const response = await downloadAPI('DownloadStudentTemplate', 'student-Template.xlsx');
  return response;
});

export const uploadFile = createAsyncThunk('student/uploadFile', async (file) => {
  const response = await fileAPI('importStudent', 'POST', file);
  return response;
});

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.success = action.payload.success || 'Added Successfully !';
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
        state.success = '';
      });

    builder
      .addCase(getStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.error.message || 'Something went wrong';
        state.success = '';
      });

    builder
      .addCase(getStudentsInClass.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStudentsInClass.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getStudentsInClass.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.error.message || 'Something went wrong';
        state.success = '';
      });

    builder
      .addCase(getStudentsWithNoGrades.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStudentsWithNoGrades.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getStudentsWithNoGrades.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.error.message || 'Something went wrong';
        state.success = '';
      });

    builder
      .addCase(getStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.show = action.payload;
        state.error = '';
        state.success = '';
      })
      .addCase(getStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
        state.success = '';
      });

    builder
      .addCase(updateStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.success = action.payload.success || 'Updated Successfully !';
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
        state.success = '';
      });

    builder
      .addCase(deleteStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.success = action.payload.success || 'Deleted Successfully !';
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });

    // builder
    //   .addCase(resetPassword.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(resetPassword.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.error = '';
    //     state.success = action.payload.message;
    //   })
    //   .addCase(resetPassword.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.error.message || 'Something went wrong';
    //   });

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

export default studentSlice.reducer;
