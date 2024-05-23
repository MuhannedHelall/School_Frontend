import { configureStore } from '@reduxjs/toolkit';

import authSlice from './authSlice';
import timeSlice from './timeSlice';
import adminSlice from './adminSlice';
import classSlice from './classSlice';
import gradeSlice from './gradeSlice';
import studentSlice from './studentSlice';
import subjectSlice from './subjectSlice';
import lecturesSlice from './lecturesSlice';
import languageSlice from './languageSlice';
import employeeSlice from './employeeSlice';
import dashboardSlice from './dashboardSlice';
import departmentSlice from './departmentSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    time: timeSlice,
    admin: adminSlice,
    class: classSlice,
    grade: gradeSlice,
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
