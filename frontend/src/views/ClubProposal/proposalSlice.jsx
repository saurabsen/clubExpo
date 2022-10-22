import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import proposalService from './proposalService';

const initialState = {
  proposal: []
};

// Create new proposal
export const createNewProposal = createAsyncThunk('proposal/create', async (goalData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await proposalService.createProposal(goalData, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get proposal
export const getAllProposal = createAsyncThunk('proposal/getall', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await proposalService.getProposals(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const proposalSlice = createSlice({
  name: 'proposal',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewProposal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewProposal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals.push(action.payload);
      })
      .addCase(createNewProposal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllProposal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProposal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = action.payload;
      })
      .addCase(getAllProposal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { reset } = proposalSlice.actions;
export default proposalSlice.reducer;
