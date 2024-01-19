import { configureStore } from '@reduxjs/toolkit';

import authSlice from './authSlice';
import LangSlice from './LangSlice';
import adminSlice from './adminSlice';
import departmentSlice from './departmentSlice';
import superAdminDashboardSlice from './superAdminDashboardSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    admin: adminSlice,
    language: LangSlice,
    department: departmentSlice,
    superAdminDashboard: superAdminDashboardSlice,
  },
});

export default store;
