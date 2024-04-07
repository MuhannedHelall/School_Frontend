import { configureStore } from '@reduxjs/toolkit';

import authSlice from './authSlice';
import classSlice from './classSlice';
import adminSlice from './adminSlice';
import studentSlice from './studentSlice';
import subjectSlice from './subjectSlice';
import languageSlice from './languageSlice';
import lecturesSlice from './lecturesSlice';
import employeeSlice from './employeeSlice';
import dashboardSlice from './dashboardSlice';
import departmentSlice from './departmentSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    admin: adminSlice,
    class: classSlice,
    student: studentSlice,
    subject: subjectSlice,
    lectures: lecturesSlice,
    language: languageSlice,
    employee: employeeSlice,
    dashboard: dashboardSlice,
    department: departmentSlice,
  },
});

export default store;
