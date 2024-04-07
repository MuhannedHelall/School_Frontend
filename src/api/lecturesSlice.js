import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { authAPI } from './APIs';
//  fileAPI, downloadAPI

const initialState = {
  loading: false,
  data: [],
  error: '',
  success: '',
};

export const addLecture = createAsyncThunk('lectures/addLecture', async (lecture) => {
  const response = await authAPI('lectures', 'POST', lecture);
  return response;
});

export const getLectures = createAsyncThunk('lectures/getLectures', async (id) => {
  const response = await authAPI(`getSubjectLectures/${id}`);
  return response;
});

export const getLecture = createAsyncThunk('lectures/getLecture', async (id) => {
  const response = await authAPI(`lectures/${id}`);
  return response;
});

export const updateLecture = createAsyncThunk('lectures/updateLecture', async (lecture) => {
  const response = await authAPI(`lectures/${lecture.id}`, 'PUT', lecture);
  return response;
});

export const deleteLecture = createAsyncThunk('lectures/deleteLecture', async (lecture) => {
  const response = await authAPI(`lectures/${lecture.id}`, 'DELETE');
  return response;
});

// export const downloadFile = createAsyncThunk('lectures/downloadFile', async () => {
//   const response = await downloadAPI('DownloadLectureTemplate', 'Lecture-Template.xlsx');
//   return response;
// });

// export const uploadFile = createAsyncThunk('lectures/uploadFile', async (file) => {
//   const response = await fileAPI('importLectures', 'POST', file);
//   return response;
// });

const lecturesSlice = createSlice({
  name: 'lectures',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addLecture.pending, (state) => {
        state.loading = true;
      })
      .addCase(addLecture.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.success = action.payload.success || 'Added Successfully !';
      })
      .addCase(addLecture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
        state.success = '';
      });

    builder
      .addCase(getLectures.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLectures.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getLectures.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.error.message || 'Something went wrong';
        state.success = '';
      });

    builder
      .addCase(getLecture.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLecture.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = '';
        state.success = '';
      })
      .addCase(getLecture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
        state.success = '';
      });

    builder
      .addCase(updateLecture.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateLecture.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.success = action.payload.success || 'Updated Successfully !';
      })
      .addCase(updateLecture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
        state.success = '';
      });

    builder
      .addCase(deleteLecture.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteLecture.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.success = action.payload.success || 'Deleted Successfully !';
      })
      .addCase(deleteLecture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });

    // builder
    //   .addCase(downloadFile.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(downloadFile.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.error = '';
    //     state.message = action.payload;
    //   })
    //   .addCase(downloadFile.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.error.message || 'Something went wrong';
    //   });

    // builder
    //   .addCase(uploadFile.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(uploadFile.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.error = '';
    //     state.message = action.payload;
    //   })
    //   .addCase(uploadFile.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.error.message || 'Something went wrong';
    //   });
  },
});

export default lecturesSlice.reducer;
