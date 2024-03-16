import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { authAPI, fileAPI, downloadAPI } from './APIs';

const initialState = {
  loading: false,
  data: [],
  error: '',
  success: '',
};

export const addEmployee = createAsyncThunk('employee/addEmployee', async (employee) => {
  const response = await authAPI('employee', 'POST', employee);
  return response;
});

export const getEmployees = createAsyncThunk('employee/getEmployees', async (dept_id) => {
  const response = await authAPI(`employee/${dept_id}`);
  return response;
});

export const getEmployee = createAsyncThunk('employee/getEmployee', async (id) => {
  const response = await authAPI(`employee/${id}`);
  return response;
});

export const updateEmployee = createAsyncThunk('employee/updateEmployee', async (employee) => {
  const response = await authAPI(`employee/${employee.id}`, 'PUT', employee);
  return response;
});

export const deleteEmployee = createAsyncThunk('employee/deleteEmployee', async (employee) => {
  const response = await authAPI(`employee/${employee.user_id || employee.id}`, 'DELETE');
  return response;
});

// export const resetPassword = createAsyncThunk('employee/resetPassword', async (id) => {
//   const response = await authAPI(`resetPassword/${id}`);
//   return response;
// });

export const downloadFile = createAsyncThunk('employee/downloadFile', async () => {
  const response = await downloadAPI('DownloadEmployeeTemplate', 'employee-Template.xlsx');
  return response;
});

export const uploadFile = createAsyncThunk('employee/uploadFile', async (file) => {
  const response = await fileAPI('importEmployee', 'POST', file);
  return response;
});

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.success = action.payload.success || 'Added Successfully !';
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
        state.success = '';
      });

    builder
      .addCase(getEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getEmployees.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.error.message || 'Something went wrong';
        state.success = '';
      });

    builder
      .addCase(getEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = '';
        state.success = '';
      })
      .addCase(getEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
        state.success = '';
      });

    builder
      .addCase(updateEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.success = action.payload.success || 'Updated Successfully !';
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
        state.success = '';
      });

    builder
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.success = action.payload.success || 'Deleted Successfully !';
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
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

export default employeeSlice.reducer;
