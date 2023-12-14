import { configureStore } from '@reduxjs/toolkit';

import adminSlice from './adminSlice';
import departmentSlice from './departmentSlice';

const store = configureStore({
  reducer: {
    department: departmentSlice,
    admin: adminSlice,
  },
});

export default store;
