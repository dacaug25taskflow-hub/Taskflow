import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import taskService from '../../services/taskService';

const initialState = {
  tasks: [],
  managerPersonalTasks: [],
  tlProjects: [],
  tlAssignedTasks: [],
  isLoading: false,
  isError: false,
  message: '',
};

export const getTasksByProject = createAsyncThunk(
  'task/getTasksByProject',
  async (pid, thunkAPI) => {
    try {
      return await taskService.getTasksByProject(pid);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getManagerPersonalTasks = createAsyncThunk(
  'task/getManagerPersonalTasks',
  async (uid, thunkAPI) => {
    try {
      return await taskService.getManagerPersonalTasks(uid);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getTasksByProjectTL = createAsyncThunk(
  'task/getTasksByProjectTL',
  async (pid, thunkAPI) => {
    try {
      return await taskService.getTasksByProjectTL(pid);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getProjectsForTL = createAsyncThunk(
  'task/getProjectsForTL',
  async (tlUid, thunkAPI) => {
    try {
      return await taskService.getProjectsForTL(tlUid);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getTasksAssignedToTL = createAsyncThunk(
  'task/getTasksAssignedToTL',
  async (tlUid, thunkAPI) => {
    try {
      return await taskService.getTasksAssignedToTL(tlUid);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getTasksByEmployee = createAsyncThunk(
  'task/getTasksByEmployee',
  async (uid, thunkAPI) => {
    try {
      return await taskService.getTasksByEmployee(uid);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createTask = createAsyncThunk(
  'task/createTask',
  async (taskData, thunkAPI) => {
    try {
      return await taskService.createTask(taskData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const assignTask = createAsyncThunk(
  'task/assignTask',
  async ({ taskId, uid }, thunkAPI) => {
    try {
      return await taskService.assignTask(taskId, uid);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateTaskStatus = createAsyncThunk(
  'task/updateTaskStatus',
  async ({ taskId, status, role, uid }, thunkAPI) => {
    try {
      return await taskService.updateTaskStatus(taskId, status, role, uid);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasksByProject.pending, (state) => { state.isLoading = true; })
      .addCase(getTasksByProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(getManagerPersonalTasks.pending, (state) => { state.isLoading = true; })
      .addCase(getManagerPersonalTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.managerPersonalTasks = action.payload;
      })
      .addCase(getManagerPersonalTasks.rejected, (state) => { state.isLoading = false; })
      .addCase(getTasksByProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTasksByProjectTL.pending, (state) => { state.isLoading = true; })
      .addCase(getTasksByProjectTL.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(getTasksByProjectTL.rejected, (state) => { state.isLoading = false; })
      .addCase(getProjectsForTL.pending, (state) => { state.isLoading = true; })
      .addCase(getProjectsForTL.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tlProjects = action.payload;
      })
      .addCase(getProjectsForTL.rejected, (state) => { state.isLoading = false; })
      .addCase(getTasksAssignedToTL.pending, (state) => { state.isLoading = true; })
      .addCase(getTasksAssignedToTL.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tlAssignedTasks = action.payload;
      })
      .addCase(getTasksAssignedToTL.rejected, (state) => { state.isLoading = false; })
      .addCase(getTasksByEmployee.pending, (state) => { state.isLoading = true; })
      .addCase(getTasksByEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
        state.managerPersonalTasks = state.managerPersonalTasks || [];
        if (action.meta?.arg?.forSelf) {
          state.managerPersonalTasks.push(action.payload);
        }
      })
      .addCase(assignTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(t => t.taskId === action.payload.taskId);
        if (index !== -1) state.tasks[index] = action.payload;
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        const payload = action.payload;
        const id = payload?.taskId ?? payload?.task_id;
        const newStatus = payload?.Status ?? payload?.status;
        const idx = state.tasks.findIndex(t => (t.taskId ?? t.task_id) === id);
        if (idx !== -1 && newStatus) state.tasks[idx] = { ...state.tasks[idx], status: newStatus };
      });
  },
});

export const { reset } = taskSlice.actions;
export default taskSlice.reducer;
