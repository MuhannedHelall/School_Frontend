import { configureStore } from '@reduxjs/toolkit';

import authSlice from './authSlice';
import LangSlice from './LangSlice';
import adminSlice from './adminSlice';
import departmentSlice from './departmentSlice';

const store = configureStore({
  reducer: {
    language: LangSlice,
    auth: authSlice,
    admin: adminSlice,
    department: departmentSlice,
  },
});

export default store;
