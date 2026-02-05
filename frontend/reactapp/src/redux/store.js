import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import projectReducer from './slices/projectSlice';
import domainReducer from './slices/domainSlice';
import taskReducer from './slices/taskSlice';
import queryReducer from './slices/querySlice'; // ADD THIS

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    project: projectReducer,
    domain: domainReducer,
    task: taskReducer,
    query: queryReducer, // ADD THIS
  },
});

export default store;