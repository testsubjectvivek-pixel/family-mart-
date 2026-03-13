import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { walletAPI } from '../../services/api';

const initialState = {
  balance: 0,
  transactions: [],
  isLoading: false,
  error: null,
};

export const getWallet = createAsyncThunk('wallet/getWallet', async (_, { rejectWithValue }) => {
  try {
    const response = await walletAPI.getBalance();
    return response.data.balance || 0;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch wallet');
  }
});

export const getTransactions = createAsyncThunk('wallet/getTransactions', async (params = {}, { rejectWithValue }) => {
  try {
    const response = await walletAPI.getTransactions(params);
    return response.data.transactions || [];
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch transactions');
  }
});

export const addMoney = createAsyncThunk('wallet/addMoney', async (amount, { rejectWithValue }) => {
  try {
    const response = await walletAPI.addMoney({ amount });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to add money');
  }
});

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWallet.pending, (state) => { state.isLoading = true; })
      .addCase(getWallet.fulfilled, (state, action) => { state.isLoading = false; state.balance = action.payload; })
      .addCase(getWallet.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })
      .addCase(getTransactions.pending, (state) => { state.isLoading = true; })
      .addCase(getTransactions.fulfilled, (state, action) => { state.isLoading = false; state.transactions = action.payload; })
      .addCase(getTransactions.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })
      .addCase(addMoney.pending, (state) => { state.isLoading = true; })
      .addCase(addMoney.fulfilled, (state, action) => { state.isLoading = false; state.balance = action.payload.balance; state.transactions = action.payload.transactions || state.transactions; })
      .addCase(addMoney.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; });
  },
});

export default walletSlice.reducer;
