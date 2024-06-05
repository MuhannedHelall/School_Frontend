import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { authAPI, fileAPI } from './APIs';

const USER = JSON.parse(localStorage.getItem('user'));

const initialState = {
  loading: false,
  data: USER || {},
  error: null,
  message: null,
};

export const login = createAsyncThunk('auth/login', async (loginData) => {
  const response = await authAPI('login', 'POST', loginData);
  return response;
});

export const logout = createAsyncThunk('auth/logout', async () => {
  const response = await authAPI('logout', 'POST');
  return response;
});

export const editProfile = createAsyncThunk('auth/editProfile', async (userData) => {
  const response = await authAPI(`user/update/${userData.id}`, 'POST', userData);
  return response;
});

export const changePassword = createAsyncThunk('auth/changePassword', async (userData) => {
  const response = await authAPI(`setPassword/${userData.id}`, 'POST', userData);
  return response;
});

export const uploadAvatar = createAsyncThunk('auth/uploadAvatar', async (userData) => {
  const response = await fileAPI(`uploadAvatar/${userData.id}`, 'POST', userData.form);
  return response;
});

export const trainModel = createAsyncThunk('auth/trainModel', async () => {
  const response = await authAPI(`trainUsersWithAvatars`);
  return response;
});

export const detect = createAsyncThunk('auth/detect', async (data) => {
  const response = await fileAPI('loginUsingFaceRecogintion', 'POST', data);
  return response;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.user;
        state.error = null;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('role', action.payload.user.role);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = JSON.parse(action.error.message).error;
      });

    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.data = {};
        state.error = null;
        state.message = 'logged out successfully';
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });

    builder
      .addCase(editProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(editProfile.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.message = 'Profile Updated Successfully';
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });

    builder
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.message = 'Password Changed Successfully';
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });

    builder
      .addCase(uploadAvatar.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = 'Avatar Changed Successfully !';
        state.data.user.avatar_url = action.payload.image;
        localStorage.setItem('user', JSON.stringify(state.data));
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });

    builder
      .addCase(trainModel.pending, (state) => {
        state.loading = true;
      })
      .addCase(trainModel.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload;
      })
      .addCase(trainModel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });

    builder
      .addCase(detect.pending, (state) => {
        state.loading = true;
      })
      .addCase(detect.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.user;
        state.error = null;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('role', action.payload.user.role);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(detect.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default authSlice.reducer;
