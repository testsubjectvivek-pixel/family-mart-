import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { referralAPI } from '../../services/api';

const initialState = {
  code: null,
  stats: null,
  isLoading: false,
  error: null,
};

export const getReferralCode = createAsyncThunk('referral/getCode', async (_, { rejectWithValue }) => {
  try {
    const response = await referralAPI.getCode();
    return response.data.code;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to get referral code');
  }
});

export const getReferralStats = createAsyncThunk('referral/getStats', async (_, { rejectWithValue }) => {
  try {
    const response = await referralAPI.getStats();
    return response.data.stats;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to get referral stats');
  }
});

export const applyReferralCode = createAsyncThunk('referral/applyCode', async (code, { rejectWithValue }) => {
  try {
    const response = await referralAPI.applyCode(code);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Invalid referral code');
  }
});

const referralSlice = createSlice({
  name: 'referral',
  initialState,
  reducers: {
    clearReferralState: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReferralCode.pending, (state) => { state.isLoading = true; })
      .addCase(getReferralCode.fulfilled, (state, action) => { state.isLoading = false; state.code = action.payload; })
      .addCase(getReferralCode.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })
      .addCase(getReferralStats.pending, (state) => { state.isLoading = true; })
      .addCase(getReferralStats.fulfilled, (state, action) => { state.isLoading = false; state.stats = action.payload; })
      .addCase(getReferralStats.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })
      .addCase(applyReferralCode.pending, (state) => { state.isLoading = true; })
      .addCase(applyReferralCode.fulfilled, (state, action) => { state.isLoading = false; })
      .addCase(applyReferralCode.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; });
  },
});

export const { clearReferralState } = referralSlice.actions;
export default referralSlice.reducer;
