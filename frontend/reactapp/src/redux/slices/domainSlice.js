import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import domainService from '../../services/domainService';

const initialState = {
  domains: [],
  isLoading: false,
};

export const getAllDomains = createAsyncThunk(
  'domain/getAllDomains',
  async (_, thunkAPI) => {
    try {
      return await domainService.getAllDomains();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createDomain = createAsyncThunk(
  'domain/createDomain',
  async (domainData, thunkAPI) => {
    try {
      return await domainService.createDomain(domainData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const domainSlice = createSlice({
  name: 'domain',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllDomains.fulfilled, (state, action) => {
        state.domains = action.payload;
      })
      .addCase(createDomain.fulfilled, (state, action) => {
        state.domains.push(action.payload);
      });
  },
});

export default domainSlice.reducer;
