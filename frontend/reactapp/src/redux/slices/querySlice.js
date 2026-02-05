import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import queryService from '../../services/queryService';

const initialState = {
  queries: [],
  employeeQueries: [],
  isLoading: false,
  isError: false,
  message: '',
};

export const getQueriesByManager = createAsyncThunk(
  'query/getQueriesByManager',
  async (uid, thunkAPI) => {
    try {
      return await queryService.getQueriesByManager(uid);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getQueriesByTeam = createAsyncThunk(
  'query/getQueriesByTeam',
  async (teamId, thunkAPI) => {
    try {
      return await queryService.getQueriesByTeam(teamId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createQuery = createAsyncThunk(
  'query/createQuery',
  async ({ queryData, role }, thunkAPI) => {
    try {
      return await queryService.createQuery(queryData, role);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const respondToQuery = createAsyncThunk(
  'query/respondToQuery',
  async ({ qid, response }, thunkAPI) => {
    try {
      return await queryService.respondToQuery(qid, response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getQueriesForTeamLeader = createAsyncThunk(
  'query/getQueriesForTeamLeader',
  async (tlUid, thunkAPI) => {
    try {
      return await queryService.getQueriesForTeamLeader(tlUid);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const respondToQueryTL = createAsyncThunk(
  'query/respondToQueryTL',
  async ({ qid, response, tlUid }, thunkAPI) => {
    try {
      return await queryService.respondToQueryTL(qid, response, tlUid);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createQueryTL = createAsyncThunk(
  'query/createQueryTL',
  async ({ queryData, tlUid }, thunkAPI) => {
    try {
      return await queryService.createQueryTL(queryData, tlUid);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getMyQueriesEmployee = createAsyncThunk(
  'query/getMyQueriesEmployee',
  async (uid, thunkAPI) => {
    try {
      return await queryService.getMyQueriesEmployee(uid);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const querySlice = createSlice({
  name: 'query',
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
      .addCase(getQueriesByManager.pending, (state) => { state.isLoading = true; })
      .addCase(getQueriesByManager.fulfilled, (state, action) => {
        state.isLoading = false;
        state.queries = action.payload;
      })
      .addCase(getQueriesByManager.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getQueriesByTeam.pending, (state) => { state.isLoading = true; })
      .addCase(getQueriesByTeam.fulfilled, (state, action) => {
        state.isLoading = false;
        state.queries = action.payload;
      })
      .addCase(getQueriesByTeam.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createQuery.fulfilled, (state, action) => {
        state.queries.push(action.payload);
      })
      .addCase(respondToQuery.fulfilled, (state, action) => {
        const index = state.queries.findIndex(q => q.qid === action.payload.qid);
        if (index !== -1) state.queries[index] = action.payload;
      })
      .addCase(getQueriesForTeamLeader.fulfilled, (state, action) => {
        state.queries = action.payload;
      })
      .addCase(respondToQueryTL.fulfilled, (state, action) => {
        const index = state.queries.findIndex(q => q.qid === action.payload.qid);
        if (index !== -1) state.queries[index] = action.payload;
      })
      .addCase(getMyQueriesEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employeeQueries = action.payload;
      });
  },
});

export const { reset } = querySlice.actions;
export default querySlice.reducer;
