import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import projectService from '../../services/projectService';

const initialState = {
  projects: [],
  isLoading: false,
  isError: false,
  message: '',
};

export const getAllProjects = createAsyncThunk(
  'project/getAllProjects',
  async (_, thunkAPI) => {
    try {
      return await projectService.getAllProjects();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// NEW: Get projects by manager
export const getProjectsByManager = createAsyncThunk(
  'project/getProjectsByManager',
  async (managerId, thunkAPI) => {
    try {
      return await projectService.getProjectsByManager(managerId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createProject = createAsyncThunk(
  'project/createProject',
  async (projectData, thunkAPI) => {
    try {
      return await projectService.createProject(projectData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteProject = createAsyncThunk(
  'project/deleteProject',
  async (pid, thunkAPI) => {
    try {
      await projectService.deleteProject(pid);
      return pid;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateProject = createAsyncThunk(
  'project/updateProject',
  async ({ pid, projectData }, thunkAPI) => {
    try {
      return await projectService.updateProject(pid, projectData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProjects.pending, (state) => { state.isLoading = true; })
      .addCase(getAllProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = action.payload;
      })
      .addCase(getAllProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // NEW: Get projects by manager cases
      .addCase(getProjectsByManager.pending, (state) => { state.isLoading = true; })
      .addCase(getProjectsByManager.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = action.payload;
      })
      .addCase(getProjectsByManager.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(p => p.pid !== action.payload);
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        const index = state.projects.findIndex(p => p.pid === action.payload.pid);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      });
  },
});

export default projectSlice.reducer;
