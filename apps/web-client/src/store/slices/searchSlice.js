import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchAPI } from '../../services/api';

const initialState = {
  results: [],
  query: '',
  isLoading: false,
  error: null,
};

export const searchProducts = createAsyncThunk('search/searchProducts', async ({ query, limit = 10 }, { rejectWithValue }) => {
  try {
    const response = await searchAPI.search(query, { limit });
    return { results: response.data.products || [], query };
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Search failed');
  }
});

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearSearch: (state) => { state.results = []; state.query = ''; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchProducts.pending, (state) => { state.isLoading = true; })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.results = action.payload.results;
        state.query = action.payload.query;
      })
      .addCase(searchProducts.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; });
  },
});

export const { clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
